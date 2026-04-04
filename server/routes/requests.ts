import { Router } from 'express';
import { prisma } from '../../src/lib/prisma.js';
import { adminMiddleware } from '../middleware/clerk.js';

const router = Router();

// POST /api/requests - Submit a new request
router.post('/', async (req: any, res) => {
    try {
        const { type, subject, message } = req.body;
        const clerkId = req.auth?.userId;

        if (!clerkId) {
            return res.status(401).json({ error: 'Unauthorized - Login required' });
        }

        if (!type || !subject || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Find user by clerkId to get their numeric Neon ID
        const userRec = await prisma.user.findUnique({
            where: { clerkId }
        });

        if (!userRec) {
            return res.status(404).json({ error: 'User record not found in database' });
        }

        const request = await prisma.userRequest.create({
            data: {
                userId: userRec.id,
                type,
                subject,
                message,
                status: 'Pending',
            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });

        res.status(201).json(request);
    } catch (error) {
        console.error('Error creating request:', error);
        res.status(500).json({ error: 'Failed to submit request' });
    }
});

// GET /api/requests - Get all requests (Admin only)
router.get('/', adminMiddleware as any, async (_req: any, res) => {
    try {
        const requests = await prisma.userRequest.findMany({
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        res.json(requests);
    } catch (error) {
        console.error('Error fetching requests:', error);
        res.status(500).json({ error: 'Failed to fetch requests' });
    }
});

// GET /api/requests/user/:userId - Get requests for a specific user (Ownership or Admin check)
router.get('/user/:userId', async (req: any, res) => {
    try {
        const { userId } = req.params;
        const clerkId = req.auth?.userId;

        if (!clerkId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // 1. Get the requester's info from DB
        const requester = await prisma.user.findUnique({
            where: { clerkId },
            select: { id: true, role: true }
        });

        if (!requester) {
            return res.status(404).json({ error: 'User not found' });
        }

        // 2. IDOR check: Is the requester the owner OR an admin?
        const isOwner = requester.id === parseInt(userId);
        const isAdmin = requester.role === 'Admin';

        if (!isOwner && !isAdmin) {
            console.warn(`[Security Alert] IDOR attempt by ${clerkId} on user ${userId}`);
            return res.status(403).json({ error: 'Forbidden - You can only view your own requests' });
        }

        const requests = await prisma.userRequest.findMany({
            where: { userId: parseInt(userId) },
            orderBy: { createdAt: 'desc' },
        });

        res.json(requests);
    } catch (error) {
        console.error('Error fetching user requests:', error);
        res.status(500).json({ error: 'Failed to fetch requests' });
    }
});

// PATCH /api/requests/:id - Update request status/notes (Admin only)
router.patch('/:id', adminMiddleware as any, async (req, res) => {
    try {
        const { id } = req.params;
        const { status, adminNote } = req.body;

        const request = await prisma.userRequest.update({
            where: { id },
            data: {
                status,
                adminNote,
            },
        });

        res.json(request);
    } catch (error) {
        console.error('Error updating request:', error);
        res.status(500).json({ error: 'Failed to update request' });
    }
});

export default router;
