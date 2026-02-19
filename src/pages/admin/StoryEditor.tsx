import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getStoryById, createStory, updateStory } from '../../lib/api';


export function StoryEditor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const [loading, setLoading] = useState(isEdit);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        author: '',
        location: '',
        imageUrl: '',
        published: false,
        featured: false,
        readTime: 5,
    });

    useEffect(() => {
        if (isEdit && id) {
            loadStory(id);
        }
    }, [id, isEdit]);

    const loadStory = async (storyId: string) => {
        try {
            const story = await getStoryById(storyId);
            if (story) {
                setFormData({
                    title: story.title,
                    slug: story.slug,
                    excerpt: story.excerpt || '',
                    content: story.content,
                    author: story.author,
                    location: story.location || '',
                    imageUrl: story.imageUrl || '',
                    published: story.published,
                    featured: story.featured,
                    readTime: story.readTime,
                });
            }
        } catch (error) {
            console.error('Failed to load story:', error);
            alert('Failed to load story');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });

        // Auto-generate slug from title
        if (name === 'title') {
            const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            setFormData(prev => ({ ...prev, slug }));
        }

        // Estimate read time from content
        if (name === 'content') {
            const words = value.trim().split(/\s+/).length;
            const readTime = Math.max(1, Math.ceil(words / 200)); // 200 words per minute
            setFormData(prev => ({ ...prev, readTime }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            if (isEdit && id) {
                await updateStory(id, formData);
            } else {
                await createStory(formData);
            }
            navigate('/admin/stories');
        } catch (error) {
            console.error('Failed to save story:', error);
            alert('Failed to save story. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="font-hand text-2xl text-brand-brown">Loading story...</p>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="font-marker text-5xl text-brand-brown mb-2">
                    {isEdit ? 'Edit Story' : 'Create New Story'}
                </h1>
                <p className="font-hand text-xl text-brand-brown/70">
                    Write and publish your blog post
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-brand-cream p-6 rounded-lg shadow-lg border-2 border-brand-brown/20">
                    {/* Title */}
                    <div className="mb-6">
                        <label className="font-hand text-xl text-brand-brown block mb-2">
                            Title *
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border-2 border-brand-brown/30 focus:border-brand-burgundy focus:outline-none font-hand text-lg"
                            placeholder="Enter story title"
                            required
                        />
                    </div>

                    {/* Slug */}
                    <div className="mb-6">
                        <label className="font-hand text-xl text-brand-brown block mb-2">
                            URL Slug *
                        </label>
                        <input
                            type="text"
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border-2 border-brand-brown/30 focus:border-brand-burgundy focus:outline-none font-hand text-lg"
                            placeholder="url-friendly-title"
                            required
                        />
                        <p className="font-hand text-sm text-brand-brown/60 mt-1">
                            URL: /stories/{formData.slug || 'your-story-slug'}
                        </p>
                    </div>

                    {/* Excerpt */}
                    <div className="mb-6">
                        <label className="font-hand text-xl text-brand-brown block mb-2">
                            Excerpt
                        </label>
                        <textarea
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-3 rounded-lg border-2 border-brand-brown/30 focus:border-brand-burgundy focus:outline-none font-hand text-lg resize-none"
                            placeholder="Short preview for blog list (optional)"
                        ></textarea>
                    </div>

                    {/* Content */}
                    <div className="mb-6">
                        <label className="font-hand text-xl text-brand-brown block mb-2">
                            Content * ({formData.readTime} min read)
                        </label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            rows={15}
                            className="w-full px-4 py-3 rounded-lg border-2 border-brand-brown/30 focus:border-brand-burgundy focus:outline-none font-hand text-lg resize-none"
                            placeholder="Write your full blog post here..."
                            required
                        ></textarea>
                    </div>

                    {/* Author & Location */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="font-hand text-xl text-brand-brown block mb-2">
                                Author *
                            </label>
                            <input
                                type="text"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border-2 border-brand-brown/30 focus:border-brand-burgundy focus:outline-none font-hand text-lg"
                                placeholder="Author name"
                                required
                            />
                        </div>
                        <div>
                            <label className="font-hand text-xl text-brand-brown block mb-2">
                                Location
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border-2 border-brand-brown/30 focus:border-brand-burgundy focus:outline-none font-hand text-lg"
                                placeholder="e.g., Nairobi"
                            />
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="mb-6">
                        <label className="font-hand text-xl text-brand-brown block mb-2">
                            Featured Image URL
                        </label>
                        <input
                            type="url"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border-2 border-brand-brown/30 focus:border-brand-burgundy focus:outline-none font-hand text-lg"
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>

                    {/* Toggles */}
                    <div className="flex gap-6">
                        <label className="flex items-center gap-2 font-hand text-lg text-brand-brown cursor-pointer">
                            <input
                                type="checkbox"
                                name="published"
                                checked={formData.published}
                                onChange={handleChange}
                                className="w-5 h-5"
                            />
                            <span>Publish immediately</span>
                        </label>
                        <label className="flex items-center gap-2 font-hand text-lg text-brand-brown cursor-pointer">
                            <input
                                type="checkbox"
                                name="featured"
                                checked={formData.featured}
                                onChange={handleChange}
                                className="w-5 h-5"
                            />
                            <span>⭐ Featured story</span>
                        </label>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={saving}
                        className="font-hand text-xl bg-brand-burgundy text-brand-cream px-8 py-4 rounded-lg shadow-lg hover:shadow-xl hover:bg-brand-brown transition-all disabled:opacity-50"
                    >
                        {saving ? 'Saving...' : isEdit ? '💾 Update Story' : '✍️ Create Story'}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/admin/stories')}
                        disabled={saving}
                        className="font-hand text-xl bg-gray-500 text-white px-8 py-4 rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-600 transition-all disabled:opacity-50"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
