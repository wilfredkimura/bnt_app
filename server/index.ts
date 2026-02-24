import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import storiesRouter from './routes/stories.js';
import galleryRouter from './routes/gallery.js';
import statsRouter from './routes/stats.js';
import authRouter from './routes/auth.js';
import requestsRouter from './routes/requests.js';
import communityRouter from './routes/community.js';

import { clerkMiddleware, recordActivityMiddleware } from './middleware/clerk.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware as any);
app.use(recordActivityMiddleware as any);

// Routes
app.use('/api/auth', authRouter);
app.use('/api/stories', storiesRouter);
app.use('/api/gallery', galleryRouter);
app.use('/api/stats', statsRouter);
app.use('/api/requests', requestsRouter);
app.use('/api/community', communityRouter);

// Health check
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', message: 'API server is running' });
});

// Start server
// Export app for Vercel
export default app;

// Start server if not running in Vercel (Vercel sets a specific environment, but checking for direct execution is safer or just export)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🚀 API server running on http://localhost:${PORT}`);
    });
}
