import { Router } from 'express';
import { prisma } from '../../src/lib/prisma.js';

const router = Router();

// GET /api/stats - Get dashboard statistics
router.get('/', async (_req, res) => {
    try {
        const [totalStories, publishedStories, galleryCount] = await Promise.all([
            prisma.story.count(),
            prisma.story.count({ where: { published: true } }),
            prisma.galleryItem.count(),
        ]);

        res.json({
            totalStories,
            publishedStories,
            galleryCount,
            activeUsers: 0, // TODO: Implement when user auth is added
        });
    } catch (error: any) {
        console.error('Error fetching stats:', error);
        res.status(500).json({
            error: 'Failed to fetch stats',
            details: error.message
        });
    }
});

export default router;
