import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Polaroid } from '../components/ui/Polaroid';
import { Doodle } from '../components/ui/Doodle';

export function Gallery() {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    const tags = ['All', 'Book Distribution', 'Reading Sessions', 'Community Events', 'School Visits'];

    const galleryItems = [
        {
            id: 1,
            imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop',
            caption: 'First book distribution at ShedALight Institute',
            location: 'Nairobi',
            tags: ['Book Distribution', 'School Visits'],
        },
        {
            id: 2,
            imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop',
            caption: 'Children discovering new stories',
            location: 'Kisumu',
            tags: ['Reading Sessions', 'School Visits'],
        },
        {
            id: 3,
            imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop',
            caption: 'Community reading program launch',
            location: 'Mombasa',
            tags: ['Community Events', 'Reading Sessions'],
        },
        {
            id: 4,
            imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&auto=format&fit=crop',
            caption: 'Volunteers organizing book trunks',
            location: 'Nakuru',
            tags: ['Book Distribution', 'Community Events'],
        },
        {
            id: 5,
            imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&auto=format&fit=crop',
            caption: 'Students enjoying their new library',
            location: 'Nairobi',
            tags: ['School Visits', 'Reading Sessions'],
        },
        {
            id: 6,
            imageUrl: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&auto=format&fit=crop',
            caption: 'Parent-child reading time',
            location: 'Eldoret',
            tags: ['Community Events', 'Reading Sessions'],
        },
    ];

    const filteredItems = selectedTag && selectedTag !== 'All'
        ? galleryItems.filter(item => item.tags.includes(selectedTag))
        : galleryItems;

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
                        {tags.map((tag) => (
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {filteredItems.map((item, index) => (
                            <div
                                key={item.id}
                                className="transform hover:scale-105 transition-transform duration-300"
                            >
                                <Polaroid
                                    src={item.imageUrl}
                                    alt={item.caption}
                                    caption={item.caption}
                                    rotation={index % 3 === 0 ? 2 : index % 3 === 1 ? -2 : 1}
                                />
                                <div className="mt-4 text-center">
                                    <p className="font-hand text-lg text-brand-brown/70">
                                        📍 {item.location}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

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
