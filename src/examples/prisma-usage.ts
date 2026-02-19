import { prisma } from '../lib/prisma';
import {
    getPublishedStories,
    getActiveImpactMetrics,
    getFeaturedGalleryItems,
    getUpcomingEvents,
} from '../lib/db';

/**
 * Example: Fetching data from the database
 * 
 * This file demonstrates how to use Prisma in your React application.
 * You can use these patterns in your components with React hooks.
 */

// Example 1: Using the Prisma client directly
export async function fetchStoriesExample() {
    try {
        const stories = await prisma.story.findMany({
            where: { published: true },
            orderBy: { createdAt: 'desc' },
            take: 10,
        });

        console.log('Stories:', stories);
        return stories;
    } catch (error) {
        console.error('Error fetching stories:', error);
        throw error;
    }
}

// Example 2: Using utility functions
export async function fetchDashboardData() {
    try {
        const [stories, metrics, gallery, events] = await Promise.all([
            getPublishedStories(),
            getActiveImpactMetrics(),
            getFeaturedGalleryItems(),
            getUpcomingEvents(),
        ]);

        return {
            stories,
            metrics,
            gallery,
            events,
        };
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        throw error;
    }
}

// Example 3: Creating a new story
export async function createStoryExample(data: {
    title: string;
    content: string;
    author: string;
    location?: string;
    imageUrl?: string;
}) {
    try {
        const story = await prisma.story.create({
            data: {
                ...data,
                slug: data.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
                published: false, // Default to unpublished
            },
        });

        console.log('Created story:', story);
        return story;
    } catch (error) {
        console.error('Error creating story:', error);
        throw error;
    }
}

// Example 4: Updating an impact metric
export async function updateImpactMetricExample(id: string, value: number) {
    try {
        const metric = await prisma.impactMetric.update({
            where: { id },
            data: { value },
        });

        console.log('Updated metric:', metric);
        return metric;
    } catch (error) {
        console.error('Error updating metric:', error);
        throw error;
    }
}

// Example 5: Complex query with relations
export async function fetchEventWithGalleryExample(eventId: string) {
    try {
        const event = await prisma.event.findUnique({
            where: { id: eventId },
            include: {
                galleryItems: {
                    orderBy: { displayOrder: 'asc' },
                },
            },
        });

        console.log('Event with gallery:', event);
        return event;
    } catch (error) {
        console.error('Error fetching event:', error);
        throw error;
    }
}

/**
 * React Hook Example
 * 
 * Here's how you might use these functions in a React component:
 * 
 * ```typescript
 * import { useEffect, useState } from 'react';
 * import { getPublishedStories } from './lib/db';
 * 
 * function StoriesComponent() {
 *   const [stories, setStories] = useState([]);
 *   const [loading, setLoading] = useState(true);
 * 
 *   useEffect(() => {
 *     async function loadStories() {
 *       try {
 *         const data = await getPublishedStories();
 *         setStories(data);
 *       } catch (error) {
 *         console.error('Failed to load stories:', error);
 *       } finally {
 *         setLoading(false);
 *       }
 *     }
 * 
 *     loadStories();
 *   }, []);
 * 
 *   if (loading) return <div>Loading...</div>;
 * 
 *   return (
 *     <div>
 *       {stories.map(story => (
 *         <div key={story.id}>
 *           <h2>{story.title}</h2>
 *           <p>{story.content}</p>
 *         </div>
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
