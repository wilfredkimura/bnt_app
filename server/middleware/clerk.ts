import { ClerkExpressWithAuth, createClerkClient } from '@clerk/clerk-sdk-node';
import { prisma } from '../../src/lib/prisma.js';

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

export const clerkMiddleware = ClerkExpressWithAuth();

// Middleware to record logins/activity in Neon AND sync user data on-demand
export const recordActivityMiddleware = async (req: any, _res: any, next: any) => {
    if (req.auth?.userId) {
        try {
            const clerkId = req.auth.userId;

            // 1. Fetch user data from Clerk directly
            const clerkUser = await clerkClient.users.getUser(clerkId);
            const email = clerkUser.emailAddresses[0]?.emailAddress;
            const name = `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || email?.split('@')[0];
            const photoUrl = clerkUser.imageUrl;

            if (email) {
                await prisma.$transaction(async (tx) => {
                    // 2. Upsert User in Neon
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

                    // 3. Upsert CommunityMember in Neon
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
            }
        } catch (error) {
            console.error('Failed to sync user or record activity:', error);
            // Don't block the request if this sync fails
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
