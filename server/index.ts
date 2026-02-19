import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import storiesRouter from './routes/stories';
import galleryRouter from './routes/gallery';
import statsRouter from './routes/stats';
import authRouter from './routes/auth';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/stories', storiesRouter);
app.use('/api/gallery', galleryRouter);
app.use('/api/stats', statsRouter);

// Health check
app.get('/api/health', (req, res) => {
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
