import { ClerkExpressWithAuth, createClerkClient } from '@clerk/clerk-sdk-node';
import { prisma } from '../../src/lib/prisma.js';

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

export const clerkMiddleware = ClerkExpressWithAuth();

// Middleware to record logins/activity in Neon AND sync user data on-demand
export const recordActivityMiddleware = async (req: any, _res: any, next: any) => {
    if (req.auth?.userId) {
        try {
            const clerkId = req.auth.userId;

            // 1. Check if we already have this user and when they last synced
            const existingUser = await prisma.user.findUnique({
                where: { clerkId },
                select: { lastLogin: true, email: true }
            });

            // 2. Only sync from Clerk if user is new OR it's been > 1 hour since last login update
            const ONE_HOUR = 60 * 60 * 1000;
            const needsSync = !existingUser || !existingUser.lastLogin || (new Date().getTime() - new Date(existingUser.lastLogin).getTime() > ONE_HOUR);

            if (needsSync) {
                // Fetch user data from Clerk directly
                const clerkUser = await clerkClient.users.getUser(clerkId);
                const email = clerkUser.emailAddresses[0]?.emailAddress;
                const name = `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || email?.split('@')[0];
                const photoUrl = clerkUser.imageUrl;

                if (email) {
                    await prisma.$transaction(async (tx) => {
                        // Upsert User in Neon
                        const user = await tx.user.upsert({
                            where: { email },
                            update: {
                                clerkId,
                                name,
                                lastLogin: new Date()
                            },
                            create: {
                                clerkId,
                                email,
                                name,
                                password: '', // Clerk handles auth
                                role: 'Volunteer',
                                lastLogin: new Date()
                            },
                        });

                        // Upsert CommunityMember in Neon
                        await tx.communityMember.upsert({
                            where: { email },
                            update: {
                                name,
                                photoUrl,
                            },
                            create: {
                                name,
                                email,
                                photoUrl,
                                role: user.role,
                                isActive: true,
                            },
                        });
                    });
                    console.log(`Synced user ${email} from Clerk to Neon`);
                }
            } else {
                // Just update activity timestamp without fetching from Clerk
                await prisma.user.update({
                    where: { clerkId },
                    data: { lastLogin: new Date() }
                });
            }
        } catch (error) {
            console.error('Failed to sync user or record activity:', error);
        }
    }
    next();
};

export const adminMiddleware = (req: any, res: any, next: any) => {
    if (!req.auth?.userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};
