import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllStories, deleteStory } from '../../lib/api';
import type { Story } from '@prisma/client';

export function AdminStories() {
    const [stories, setStories] = useState<Story[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStories();
    }, []);

    const loadStories = async () => {
        try {
            const data = await getAllStories();
            setStories(data);
        } catch (error) {
            console.error('Failed to load stories:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this story?')) return;

        try {
            await deleteStory(id);
            setStories(stories.filter(s => s.id !== id));
        } catch (error) {
            console.error('Failed to delete story:', error);
            alert('Failed to delete story');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="font-hand text-2xl text-brand-brown">Loading stories...</p>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-marker text-5xl text-brand-brown mb-2">
                        Manage Stories
                    </h1>
                    <p className="font-hand text-xl text-brand-brown/70">
                        Create, edit, and publish blog posts
                    </p>
                </div>
                <Link
                    to="/admin/stories/new"
                    className="font-hand text-xl bg-brand-burgundy text-brand-cream px-6 py-3 rounded-lg shadow-lg hover:shadow-xl hover:bg-brand-brown transition-all"
                >
                    ✍️ Create New Story
                </Link>
            </div>

            {stories.length === 0 ? (
                <div className="bg-brand-cream p-12 rounded-lg shadow-lg border-2 border-brand-brown/20 text-center">
                    <p className="font-hand text-2xl text-brand-brown mb-4">
                        No stories yet. Create your first one!
                    </p>
                    <Link
                        to="/admin/stories/new"
                        className="inline-block font-hand text-xl bg-brand-burgundy text-brand-cream px-6 py-3 rounded-lg shadow-lg hover:shadow-xl hover:bg-brand-brown transition-all"
                    >
                        ✍️ Create New Story
                    </Link>
                </div>
            ) : (
                <div className="bg-brand-cream rounded-lg shadow-lg border-2 border-brand-brown/20 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-brand-burgundy text-brand-cream">
                            <tr>
                                <th className="font-marker text-xl text-left px-6 py-4">Title</th>
                                <th className="font-marker text-xl text-left px-6 py-4">Author</th>
                                <th className="font-marker text-xl text-left px-6 py-4">Status</th>
                                <th className="font-marker text-xl text-left px-6 py-4">Date</th>
                                <th className="font-marker text-xl text-left px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stories.map((story) => (
                                <tr key={story.id} className="border-b border-brand-brown/10 hover:bg-brand-orange/10">
                                    <td className="px-6 py-4">
                                        <div className="font-hand text-lg text-brand-brown font-bold">
                                            {story.title}
                                        </div>
                                        {story.featured && (
                                            <span className="inline-block bg-brand-orange text-brand-brown px-2 py-1 rounded text-sm font-hand mt-1">
                                                ⭐ Featured
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 font-hand text-lg text-brand-brown">
                                        {story.author}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-block px-3 py-1 rounded-full font-hand text-sm ${story.published
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                                }`}
                                        >
                                            {story.published ? '✅ Published' : '📝 Draft'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-hand text-lg text-brand-brown/70">
                                        {new Date(story.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <Link
                                                to={`/admin/stories/edit/${story.id}`}
                                                className="font-hand text-sm bg-brand-brown text-brand-cream px-3 py-2 rounded hover:bg-brand-burgundy transition-all"
                                            >
                                                ✏️ Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(story.id)}
                                                className="font-hand text-sm bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition-all"
                                            >
                                                🗑️ Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
