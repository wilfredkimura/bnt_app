import { Router } from 'express';
import { prisma } from '../../src/lib/prisma.js';

const router = Router();

// GET /api/community - Get all community members
router.get('/', async (_req, res) => {
    try {
        const members = await prisma.communityMember.findMany({
            orderBy: { joinedDate: 'desc' },
        });
        res.json(members);
    } catch (error) {
        console.error('Error fetching community members:', error);
        res.status(500).json({ error: 'Failed to fetch community members' });
    }
});

// PATCH /api/community/:id - Update member details
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, role, tags, bio, photoUrl, email, phone, location, isActive, featured } = req.body;

        const member = await prisma.communityMember.update({
            where: { id },
            data: {
                name,
                role,
                tags,
                bio,
                photoUrl,
                email,
                phone,
                location,
                isActive,
                featured,
            },
        });

        res.json(member);
    } catch (error) {
        console.error('Error updating community member:', error);
        res.status(500).json({ error: 'Failed to update community member' });
    }
});

// DELETE /api/community/:id - Delete a member
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.communityMember.delete({
            where: { id },
        });
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting community member:', error);
        res.status(500).json({ error: 'Failed to delete community member' });
    }
});

export default router;
