import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Polaroid } from '../components/ui/Polaroid';
import { Doodle } from '../components/ui/Doodle';
import { ImageViewer } from '../components/ui/ImageViewer';
import { getAllGalleryItems } from '../lib/api';
import type { GalleryItem } from '@prisma/client';

export function Gallery() {
    const [images, setImages] = useState<GalleryItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const data = await getAllGalleryItems();
                setImages(data);
            } catch (err) {
                console.error('Failed to fetch gallery:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchGallery();
    }, []);

    // Extract unique tags from images
    const availableTags = ['All', ...new Set(images.flatMap(item => item.tags))];

    const filteredItems = selectedTag && selectedTag !== 'All'
        ? images.filter(item => item.tags.includes(selectedTag))
        : images;

    const handleNext = () => {
        if (selectedIndex !== null) {
            setSelectedIndex((selectedIndex + 1) % filteredItems.length);
        }
    };

    const handlePrev = () => {
        if (selectedIndex !== null) {
            setSelectedIndex((selectedIndex - 1 + filteredItems.length) % filteredItems.length);
        }
    };

    return (
        <main className="min-h-screen w-full bg-texture-paper overflow-x-hidden selection:bg-brand-orange/30">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-16 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="relative inline-block mb-6">
                        <h1 className="font-marker text-5xl md:text-7xl text-brand-brown relative z-10">
                            Photo Gallery
                        </h1>
                        <div className="absolute -bottom-2 left-0 w-full h-6 bg-brand-orange/40 -rotate-1 z-0"></div>
                    </div>
                    <p className="font-hand text-2xl md:text-3xl text-brand-brown max-w-3xl mx-auto">
                        Moments captured from our journey across Kenya
                    </p>
                    <Doodle type="heart" className="w-16 h-16 mx-auto mt-6 text-brand-burgundy" />
                </div>
            </section>

            {/* Filter Tags */}
            <section className="py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-wrap justify-center gap-4">
                        {availableTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(tag === 'All' ? null : tag)}
                                className={`font-hand text-xl px-6 py-3 rounded-lg border-2 transition-all transform hover:-rotate-1 ${(tag === 'All' && !selectedTag) || selectedTag === tag
                                    ? 'bg-brand-burgundy text-brand-cream border-brand-burgundy shadow-lg'
                                    : 'bg-brand-cream text-brand-brown border-brand-brown hover:border-brand-burgundy'
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    {isLoading ? (
                        <div className="text-center py-20">
                            <div className="w-12 h-12 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="font-hand text-2xl text-brand-brown">Developing the film...</p>
                        </div>
                    ) : filteredItems.length === 0 ? (
                        <div className="text-center py-20 bg-white/50 border-4 border-dashed border-brand-brown/10 rounded-3xl">
                            <p className="font-hand text-2xl text-brand-brown">No photos in this collection yet!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {filteredItems.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                                    onClick={() => setSelectedIndex(index)}
                                >
                                    <Polaroid
                                        src={item.imageUrl}
                                        alt={item.caption || 'Gallery image'}
                                        caption={item.caption || ''}
                                        rotation={index % 3 === 0 ? 2 : index % 3 === 1 ? -2 : 1}
                                    />
                                    {item.location && (
                                        <div className="mt-4 text-center">
                                            <p className="font-hand text-lg text-brand-brown/70">
                                                📍 {item.location}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Image Viewer Overlay */}
            {selectedIndex !== null && (
                <ImageViewer
                    items={filteredItems}
                    currentIndex={selectedIndex}
                    onClose={() => setSelectedIndex(null)}
                    onNext={handleNext}
                    onPrev={handlePrev}
                />
            )}

            {/* Call to Action */}
            <section className="py-16 px-4 bg-brand-orange/10">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-marker text-4xl md:text-5xl text-brand-brown mb-6">
                        Want to See More?
                    </h2>
                    <p className="font-hand text-2xl text-brand-brown mb-8">
                        Follow us on social media for daily updates and behind-the-scenes moments!
                    </p>
                    <div className="flex justify-center gap-4">
                        <a
                            href="#"
                            className="font-hand text-2xl bg-brand-burgundy text-brand-cream px-8 py-4 rounded-lg shadow-lg hover:shadow-xl hover:bg-brand-brown transition-all transform hover:-rotate-1"
                        >
                            Instagram
                        </a>
                        <a
                            href="#"
                            className="font-hand text-2xl bg-brand-brown text-brand-cream px-8 py-4 rounded-lg shadow-lg hover:shadow-xl hover:bg-brand-burgundy transition-all transform hover:rotate-1"
                        >
                            TikTok
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
