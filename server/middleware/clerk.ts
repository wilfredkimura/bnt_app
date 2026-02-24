import { ClerkExpressWithAuth, createClerkClient } from '@clerk/clerk-sdk-node';
import { prisma } from '../../src/lib/prisma.js';

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

export const clerkMiddleware = ClerkExpressWithAuth();

// Middleware to record logins/activity in Neon AND sync user data on-demand
export const recordActivityMiddleware = async (req: any, _res: any, next: any) => {
    // 🔍 Trace logging
    const hasAuthHeader = !!req.headers.authorization;
    const authType = req.headers.authorization?.split(' ')[0];

    if (hasAuthHeader) {
        console.log(`[Auth Trace] Token received. Type: ${authType}. Path: ${req.url}`);
    }

    if (req.auth?.userId) {
        console.log(`[Auth Trace] Valid User Session: ${req.auth.userId}`);
        try {
            const clerkId = req.auth.userId;

            // 1. Check if we already have this user and their community profile
            const existingUser = await prisma.user.findUnique({
                where: { clerkId },
                select: { lastLogin: true, email: true }
            });

            let communityMemberExists = false;
            if (existingUser?.email) {
                const member = await prisma.communityMember.findUnique({
                    where: { email: existingUser.email }
                });
                communityMemberExists = !!member;
            }

            // 2. Only sync from Clerk if user or member is missing OR it's been > 5 mins since last sync
            const FIVE_MINS = 5 * 60 * 1000;
            const needsSync = !existingUser || !communityMemberExists || !existingUser.lastLogin || (new Date().getTime() - new Date(existingUser.lastLogin).getTime() > FIVE_MINS);

            if (needsSync) {
                console.log(`[Auth Sync] Syncing user data for ${clerkId}...`);
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
                // Just update activity timestamp AND ensure role is in sync
                await prisma.$transaction(async (tx) => {
                    await tx.user.update({
                        where: { clerkId },
                        data: { lastLogin: new Date() }
                    });

                    // Explicitly sync the role to CommunityMember if User exists
                    const user = await tx.user.findUnique({
                        where: { clerkId },
                        select: { email: true, role: true }
                    });

                    if (user) {
                        await tx.communityMember.updateMany({
                            where: { email: { equals: user.email, mode: 'insensitive' } },
                            data: { role: user.role }
                        });
                    }
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
