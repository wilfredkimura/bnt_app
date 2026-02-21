import { Router } from 'express';
import { prisma } from '../../src/lib/prisma.js';

const router = Router();

// GET /api/gallery - Get all gallery items
router.get('/', async (_req, res) => {
    try {
        const items = await prisma.galleryItem.findMany({
            orderBy: { createdAt: 'desc' },
            include: { event: true },
        });
        res.json(items);
    } catch (error) {
        console.error('Error fetching gallery items:', error);
        res.status(500).json({ error: 'Failed to fetch gallery items' });
    }
});

// POST /api/gallery - Create new gallery item
router.post('/', async (req, res) => {
    try {
        const item = await prisma.galleryItem.create({
            data: req.body,
        });
        res.status(201).json(item);
    } catch (error) {
        console.error('Error creating gallery item:', error);
        res.status(500).json({ error: 'Failed to create gallery item' });
    }
});

// PUT /api/gallery/:id - Update gallery item
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const item = await prisma.galleryItem.update({
            where: { id },
            data: req.body,
        });
        res.json(item);
    } catch (error) {
        console.error('Error updating gallery item:', error);
        res.status(500).json({ error: 'Failed to update gallery item' });
    }
});

// DELETE /api/gallery/:id - Delete gallery item
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.galleryItem.delete({
            where: { id },
        });
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting gallery item:', error);
        res.status(500).json({ error: 'Failed to delete gallery item' });
    }
});

export default router;
