import { Router } from 'express';
import { prisma } from '../../src/lib/prisma.js';

const router = Router();

// GET /api/stories - Get all stories (or published only)
router.get('/', async (req, res) => {
    try {
        const { published } = req.query;
        const stories = await prisma.story.findMany({
            where: published === 'true' ? { published: true } : undefined,
            orderBy: { createdAt: 'desc' },
        });
        res.json(stories);
    } catch (error) {
        console.error('Error fetching stories:', error);
        res.status(500).json({ error: 'Failed to fetch stories' });
    }
});

// GET /api/stories/:slug - Get story by slug
router.get('/slug/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        const story = await prisma.story.findUnique({
            where: { slug },
        });
        if (!story) {
            return res.status(404).json({ error: 'Story not found' });
        }
        res.json(story);
    } catch (error) {
        console.error('Error fetching story:', error);
        res.status(500).json({ error: 'Failed to fetch story' });
    }
});

// GET /api/stories/:id - Get story by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const story = await prisma.story.findUnique({
            where: { id },
        });
        if (!story) {
            return res.status(404).json({ error: 'Story not found' });
        }
        res.json(story);
    } catch (error) {
        console.error('Error fetching story:', error);
        res.status(500).json({ error: 'Failed to fetch story' });
    }
});

// POST /api/stories - Create new story
router.post('/', async (req, res) => {
    try {
        const story = await prisma.story.create({
            data: req.body,
        });
        res.status(201).json(story);
    } catch (error) {
        console.error('Error creating story:', error);
        res.status(500).json({ error: 'Failed to create story' });
    }
});

// PUT /api/stories/:id - Update story
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const story = await prisma.story.update({
            where: { id },
            data: req.body,
        });
        res.json(story);
    } catch (error) {
        console.error('Error updating story:', error);
        res.status(500).json({ error: 'Failed to update story' });
    }
});

// DELETE /api/stories/:id - Delete story
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.story.delete({
            where: { id },
        });
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting story:', error);
        res.status(500).json({ error: 'Failed to delete story' });
    }
});

export default router;
