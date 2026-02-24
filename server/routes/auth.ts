import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../../src/lib/prisma.js';

const router = Router();

// POST /api/auth/register - Register new user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }

        // Prevent registering as Admin through API
        if (role === 'Admin') {
            return res.status(403).json({ error: 'Cannot register as Admin' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters long' });
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await prisma.$transaction(async (tx) => {
            const newUser = await tx.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    role: role || 'Volunteer', // Default to Volunteer
                },
            });

            // Automatically create CommunityMember
            await tx.communityMember.create({
                data: {
                    name: newUser.name,
                    role: newUser.role,
                    email: newUser.email,
                    isActive: true,
                },
            });

            return newUser;
        });

        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// POST /api/auth/login - Login with email and password
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Return user data
        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// GET /api/auth/users - Get all users
router.get('/users', async (_req, res) => {
    try {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                name: true,
                email: true,
                clerkId: true,
                role: true,
                subscriptionStatus: true,
                createdAt: true,
            }
        });
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// PUT /api/auth/users/:id/role - Update user role (Admin only)
router.put('/users/:id/role', async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        if (!['Admin', 'Volunteer', 'Donor', 'OrganisationLeader'].includes(role)) {
            return res.status(400).json({ error: 'Invalid role' });
        }

        const user = await prisma.user.update({
            where: { id: parseInt(id) },
            data: { role },
        });

        // Also update the community member role to keep them in sync
        await prisma.communityMember.updateMany({
            where: { email: user.email },
            data: { role },
        });

        res.json(user);
    } catch (error) {
        console.error('Error updating user role:', error);
        res.status(500).json({ error: 'Failed to update user role' });
    }
});

export default router;
