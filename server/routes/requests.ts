import { Router } from 'express';
import { prisma } from '../../src/lib/prisma.js';

const router = Router();

// POST /api/requests - Submit a new request
router.post('/', async (req, res) => {
    try {
        const { userId, type, subject, message } = req.body;

        if (!userId || !type || !subject || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const request = await prisma.userRequest.create({
            data: {
                userId: parseInt(userId.toString()),
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
router.get('/', async (_req, res) => {
    try {
        // In a real app, we would verify admin role here
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

// GET /api/requests/user/:userId - Get requests for a specific user
router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
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
router.patch('/:id', async (req, res) => {
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
