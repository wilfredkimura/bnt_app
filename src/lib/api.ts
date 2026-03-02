// Frontend API client - calls Express backend
// Replace direct Prisma calls with HTTP requests

export const API_URL = '/api';

// ==================
// STORIES
// ==================

export async function getAllStories() {
    const res = await fetch(`${API_URL}/stories`);
    if (!res.ok) throw new Error('Failed to fetch stories');
    return res.json();
}

export async function getPublishedStories() {
    const res = await fetch(`${API_URL}/stories?published=true`);
    if (!res.ok) throw new Error('Failed to fetch published stories');
    return res.json();
}

export async function getStoryBySlug(slug: string) {
    const res = await fetch(`${API_URL}/stories/slug/${slug}`);
    if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error('Failed to fetch story');
    }
    return res.json();
}

export async function getStoryById(id: string) {
    const res = await fetch(`${API_URL}/stories/${id}`);
    if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error('Failed to fetch story');
    }
    return res.json();
}

export async function createStory(data: any) {
    const res = await fetch(`${API_URL}/stories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create story');
    return res.json();
}

export async function updateStory(id: string, data: any) {
    const res = await fetch(`${API_URL}/stories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update story');
    return res.json();
}

export async function deleteStory(id: string, token?: string | null) {
    const res = await fetch(`${API_URL}/stories/${id}`, {
        method: 'DELETE',
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    });
    if (!res.ok) throw new Error('Failed to delete story');
}

// ==================
// GALLERY
// ==================

export async function getAllGalleryItems() {
    const res = await fetch(`${API_URL}/gallery`);
    if (!res.ok) throw new Error('Failed to fetch gallery items');
    return res.json();
}

export async function createGalleryItem(data: any) {
    const res = await fetch(`${API_URL}/gallery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create gallery item');
    return res.json();
}

export async function updateGalleryItem(id: string, data: any) {
    const res = await fetch(`${API_URL}/gallery/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update gallery item');
    return res.json();
}

export async function deleteGalleryItem(id: string) {
    const res = await fetch(`${API_URL}/gallery/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete gallery item');
}

// ==================
// STATS
// ==================

export async function getDashboardStats(token?: string | null) {
    const res = await fetch(`${API_URL}/stats`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    });
    if (!res.ok) throw new Error('Failed to fetch stats');
    return res.json();
}

// ==================
// USERS
// ==================

export async function getAllUsers() {
    const res = await fetch(`${API_URL}/auth/users`);
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
}

// ==================
// EVENTS
// ==================

export async function getPublishedEvents() {
    const res = await fetch(`${API_URL}/events?published=true`);
    if (!res.ok) throw new Error('Failed to fetch published events');
    return res.json();
}

export async function getAllEvents(token?: string | null) {
    const res = await fetch(`${API_URL}/events`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    });
    if (!res.ok) throw new Error('Failed to fetch all events');
    return res.json();
}

export async function createEvent(data: any, token?: string | null) {
    const res = await fetch(`${API_URL}/events`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create event');
    return res.json();
}

export async function updateEvent(id: string, data: any, token?: string | null) {
    const res = await fetch(`${API_URL}/events/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update event');
    return res.json();
}

export async function deleteEvent(id: string, token?: string | null) {
    const res = await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE',
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    });
    if (!res.ok) throw new Error('Failed to delete event');
}
