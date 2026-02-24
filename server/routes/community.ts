import { Router } from 'express';
import { prisma } from '../../src/lib/prisma.js';

const router = Router();

// GET /api/community/me - Get current user's profile
router.get('/me', async (req, res) => {
    try {
        const email = req.headers['x-user-email'] as string;
        if (!email) return res.status(401).json({ error: 'Unauthorized' });

        const member = await prisma.communityMember.findFirst({
            where: { email: { equals: email, mode: 'insensitive' } },
        });

        if (!member) return res.status(404).json({ error: 'Profile not found' });
        res.json(member);
    } catch (error) {
        console.error('Error fetching own profile:', error);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

// GET /api/community - Get all community members
router.get('/', async (_req, res) => {
    try {
        const members = await prisma.communityMember.findMany({
            where: { isActive: true },
            orderBy: { joinedDate: 'desc' },
        });
        res.json(members);
    } catch (error) {
        console.error('Error fetching community members:', error);
        res.status(500).json({ error: 'Failed to fetch community members' });
    }
});

// PATCH /api/community/me - Update own profile (bio, photoUrl, etc)
router.patch('/me', async (req: any, res) => {
    try {
        const clerkId = req.auth?.userId;
        if (!clerkId) return res.status(401).json({ error: 'Unauthorized' });

        const user = await prisma.user.findUnique({
            where: { clerkId },
        });

        if (!user) return res.status(404).json({ error: 'User not found' });

        const { bio, photoUrl, name, phone, location } = req.body;

        await prisma.communityMember.updateMany({
            where: { email: { equals: user.email, mode: 'insensitive' } },
            data: {
                bio,
                photoUrl,
                name,
                phone,
                location
            },
        });

        const updated = await prisma.communityMember.findFirst({
            where: { email: { equals: user.email, mode: 'insensitive' } }
        });

        res.json(updated);
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Failed to update profile' });
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
