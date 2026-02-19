import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Doodle } from '../components/ui/Doodle';
import { getStoryBySlug } from '../lib/api';
import type { Story } from '@prisma/client';

export function StoryDetail() {
    const { slug } = useParams<{ slug: string }>();
    const [story, setStory] = useState<Story | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug) {
            loadStory(slug);
        }
    }, [slug]);

    const loadStory = async (storySlug: string) => {
        try {
            const data = await getStoryBySlug(storySlug);
            setStory(data);
        } catch (error) {
            console.error('Failed to load story:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <main className="min-h-screen w-full bg-texture-paper flex items-center justify-center">
                <p className="font-hand text-2xl text-brand-brown">Loading story...</p>
            </main>
        );
    }

    if (!story) {
        return (
            <main className="min-h-screen w-full bg-texture-paper flex items-center justify-center">
                <div className="text-center">
                    <p className="font-hand text-2xl text-brand-brown mb-4">Story not found</p>
                    <Link to="/stories" className="font-hand text-lg text-brand-burgundy hover:underline">
                        ← Back to Stories
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen w-full bg-texture-paper overflow-x-hidden selection:bg-brand-orange/30">
            <Navbar />

            {/* Hero Section with Featured Image */}
            <section className="pt-32 pb-16 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Breadcrumb */}
                    <div className="mb-6">
                        <Link to="/stories" className="font-hand text-lg text-brand-burgundy hover:underline">
                            ← Back to Stories
                        </Link>
                    </div>

                    {/* Featured Image */}
                    {story.imageUrl && (
                        <div className="mb-8 rounded-lg overflow-hidden shadow-2xl border-4 border-brand-brown">
                            <img
                                src={story.imageUrl}
                                alt={story.title}
                                className="w-full h-96 object-cover"
                            />
                        </div>
                    )}

                    {/* Title */}
                    <div className="relative inline-block mb-6">
                        <h1 className="font-marker text-4xl md:text-6xl text-brand-brown relative z-10">
                            {story.title}
                        </h1>
                        <div className="absolute -bottom-2 left-0 w-full h-6 bg-brand-orange/40 -rotate-1 z-0"></div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b-2 border-brand-brown/20">
                        <div className="flex items-center gap-2">
                            <Doodle type="heart" className="w-6 h-6 text-brand-burgundy" />
                            <span className="font-hand text-lg text-brand-brown">
                                By <strong>{story.author}</strong>
                            </span>
                        </div>
                        {story.location && (
                            <span className="font-hand text-lg text-brand-brown/70">
                                📍 {story.location}
                            </span>
                        )}
                        <span className="font-hand text-lg text-brand-brown/70">
                            📅 {new Date(story.createdAt).toLocaleDateString()}
                        </span>
                        <span className="font-hand text-lg text-brand-brown/70">
                            ⏱️ {story.readTime} min read
                        </span>
                    </div>

                    {/* Content */}
                    <div className="prose prose-lg max-w-none">
                        {story.content.split('\n\n').map((paragraph, index) => (
                            <p key={index} className="font-hand text-xl text-brand-brown leading-relaxed mb-6">
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    {/* Share & Actions */}
                    <div className="mt-12 pt-8 border-t-2 border-brand-brown/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-hand text-lg text-brand-brown mb-2">
                                    Enjoyed this story?
                                </p>
                                <div className="flex gap-3">
                                    <button className="font-hand text-sm bg-brand-burgundy text-brand-cream px-4 py-2 rounded-lg hover:bg-brand-brown transition-all">
                                        Share on Facebook
                                    </button>
                                    <button className="font-hand text-sm bg-brand-orange text-brand-brown px-4 py-2 rounded-lg hover:bg-brand-burgundy hover:text-brand-cream transition-all">
                                        Share on Twitter
                                    </button>
                                </div>
                            </div>
                            <Doodle type="star" className="w-16 h-16 text-brand-orange" />
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
