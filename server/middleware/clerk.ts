import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';
import { prisma } from '../../src/lib/prisma.js';

export const clerkMiddleware = ClerkExpressWithAuth();

// Middleware to record logins/activity in Neon
export const recordActivityMiddleware = async (req: any, _res: any, next: any) => {
    if (req.auth?.userId) {
        try {
            // Update lastLogin in Neon
            // This ensures every active session is recorded
            await prisma.user.update({
                where: { clerkId: req.auth.userId },
                data: { lastLogin: new Date() }
            });
        } catch (error) {
            console.error('Failed to record activity:', error);
            // Don't block the request if this fails
        }
    }
    next();
};

export const adminMiddleware = (req: any, res: any, next: any) => {
    if (!req.auth?.userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    // Final check for admin role would go here
    next();
};
