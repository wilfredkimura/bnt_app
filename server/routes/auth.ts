import { Router } from 'express';
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

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        // Create user (in production, hash the password with bcrypt)
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password, // TODO: Hash with bcrypt in production
                role: role || 'Volunteer', // Default to Volunteer
            },
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

        // Validate password (in production, use bcrypt.compare)
        if (password !== user.password) {
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

export default router;
