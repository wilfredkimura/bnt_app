// Frontend API client - calls Express backend
// Replace direct Prisma calls with HTTP requests

const API_URL = 'http://localhost:3001/api';

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

export async function deleteStory(id: string) {
    const res = await fetch(`${API_URL}/stories/${id}`, {
        method: 'DELETE',
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

export async function getDashboardStats() {
    const res = await fetch(`${API_URL}/stats`);
    if (!res.ok) throw new Error('Failed to fetch stats');
    return res.json();
}
