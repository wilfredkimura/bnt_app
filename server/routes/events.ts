import { Router } from 'express';
import { prisma } from '../../src/lib/prisma.js';
import ical, { ICalCalendarMethod } from 'ical-generator';

const router = Router();

// GET /api/events - Get all events
router.get('/', async (req, res) => {
    try {
        const { published } = req.query;
        const events = await prisma.event.findMany({
            where: published === 'true' ? { published: true } : undefined,
            orderBy: { eventDate: 'asc' },
        });
        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});

// GET /api/events/feed - Get iCal feed
router.get('/feed', async (_req, res) => {
    try {
        const events = await prisma.event.findMany({
            where: { published: true },
        });

        const calendar = ical({
            name: 'Books & Trunks Society Events',
            method: ICalCalendarMethod.PUBLISH,
        });

        events.forEach(event => {
            calendar.createEvent({
                id: event.id,
                start: event.eventDate,
                end: event.endDate || new Date(event.eventDate.getTime() + 3600000), // Default 1 hour
                summary: event.title,
                description: event.description,
                location: event.location,
                url: `${process.env.VITE_APP_URL || 'https://bnt-society.org'}/events`,
            });
        });

        res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
        res.setHeader('Content-Disposition', 'attachment; filename="bnt-events.ics"');
        res.send(calendar.toString());
    } catch (error) {
        console.error('Error generating iCal feed:', error);
        res.status(500).send('Error generating calendar feed');
    }
});

// POST /api/events - Create new event (Admin only)
router.post('/', async (req: any, res) => {
    try {
        // Simple auth check for now, can be improved with role check
        if (!req.auth?.userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const event = await prisma.event.create({
            data: {
                ...req.body,
                eventDate: new Date(req.body.eventDate),
                endDate: req.body.endDate ? new Date(req.body.endDate) : null,
            },
        });
        res.status(201).json(event);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'Failed to create event' });
    }
});

// PUT /api/events/:id - Update event
router.put('/:id', async (req: any, res) => {
    try {
        if (!req.auth?.userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const { id } = req.params;
        const event = await prisma.event.update({
            where: { id },
            data: {
                ...req.body,
                eventDate: req.body.eventDate ? new Date(req.body.eventDate) : undefined,
                endDate: req.body.endDate ? new Date(req.body.endDate) : (req.body.endDate === null ? null : undefined),
            },
        });
        res.json(event);
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ error: 'Failed to update event' });
    }
});

// DELETE /api/events/:id - Delete event
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.event.delete({
            where: { id },
        });
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ error: 'Failed to delete event' });
    }
});

export default router;
