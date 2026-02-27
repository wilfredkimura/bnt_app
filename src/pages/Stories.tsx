import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Doodle } from '../components/ui/Doodle';
import { getPublishedStories } from '../lib/api';
import type { Story } from '@prisma/client';

export function Stories() {
    const [stories, setStories] = useState<Story[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStories();
    }, []);

    const loadStories = async () => {
        try {
            const data = await getPublishedStories();
            setStories(data);
        } catch (error) {
            console.error('Failed to load stories:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen w-full bg-texture-paper overflow-x-hidden selection:bg-brand-orange/30">
            {/* Hero Section */}
            <section className="pb-16 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="relative inline-block mb-6">
                        <h1 className="font-marker text-5xl md:text-7xl text-brand-brown relative z-10">
                            Community Stories
                        </h1>
                        <div className="absolute -bottom-2 left-0 w-full h-6 bg-brand-orange/40 -rotate-1 z-0"></div>
                    </div>
                    <p className="font-hand text-2xl md:text-3xl text-brand-brown max-w-3xl mx-auto">
                        Read inspiring stories from the communities we serve
                    </p>
                    <Doodle type="star" className="w-16 h-16 mx-auto mt-6 text-brand-burgundy" />
                </div>
            </section>

            {/* Blog Posts Grid */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    {loading ? (
                        <div className="flex items-center justify-center h-64">
                            <p className="font-hand text-2xl text-brand-brown">Loading stories...</p>
                        </div>
                    ) : stories.length === 0 ? (
                        <div className="bg-brand-cream p-12 rounded-lg shadow-lg border-2 border-brand-brown/20 text-center">
                            <p className="font-hand text-2xl text-brand-brown">
                                No stories published yet. Check back soon!
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {stories.map((story) => (
                                <article
                                    key={story.id}
                                    className="bg-brand-cream rounded-lg shadow-lg border-2 border-brand-brown/20 overflow-hidden hover:shadow-xl transition-all transform hover:-rotate-1"
                                >
                                    {/* Featured Image */}
                                    {story.imageUrl && (
                                        <Link to={`/stories/${story.slug}`}>
                                            <img
                                                src={story.imageUrl}
                                                alt={story.title}
                                                className="w-full h-64 object-cover hover:scale-105 transition-transform"
                                            />
                                        </Link>
                                    )}

                                    {/* Content */}
                                    <div className="p-6">
                                        {/* Meta Info */}
                                        <div className="flex items-center gap-3 mb-3 text-sm">
                                            <span className="font-hand text-brand-brown/70">
                                                📅 {new Date(story.createdAt).toLocaleDateString()}
                                            </span>
                                            <span className="font-hand text-brand-brown/70">
                                                ⏱️ {story.readTime} min read
                                            </span>
                                            {story.featured && (
                                                <span className="bg-brand-orange text-brand-brown px-2 py-1 rounded font-hand text-xs">
                                                    ⭐ Featured
                                                </span>
                                            )}
                                        </div>

                                        {/* Title */}
                                        <Link to={`/stories/${story.slug}`}>
                                            <h2 className="font-marker text-3xl text-brand-brown mb-3 hover:text-brand-burgundy transition-colors">
                                                {story.title}
                                            </h2>
                                        </Link>

                                        {/* Author & Location */}
                                        <p className="font-hand text-lg text-brand-brown/70 mb-4">
                                            By {story.author} {story.location && `• ${story.location}`}
                                        </p>

                                        {/* Excerpt */}
                                        <p className="font-hand text-xl text-brand-brown leading-relaxed mb-4">
                                            {story.excerpt || story.content.substring(0, 150) + '...'}
                                        </p>

                                        {/* Read More */}
                                        <Link
                                            to={`/stories/${story.slug}`}
                                            className="inline-flex items-center gap-2 font-hand text-lg text-brand-burgundy hover:text-brand-brown transition-colors"
                                        >
                                            Read full story →
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>


        </main>
    );
}
