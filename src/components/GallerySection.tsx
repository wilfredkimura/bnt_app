import { useState, useEffect } from 'react';
import { Polaroid } from './ui/Polaroid';
import { Doodle } from './ui/Doodle';
import { getAllGalleryItems } from '../lib/api';
import type { GalleryItem } from '@prisma/client';

export function GallerySection() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await getAllGalleryItems();
        // Take only the latest 6 items for the homepage
        setImages(data.slice(0, 6));
      } catch (err) {
        console.error('Failed to fetch gallery for homepage:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGallery();
  }, []);

  return <section className="py-24 px-4 bg-texture-cork relative overflow-hidden">
    {/* Section Title */}
    <div className="text-center mb-16 relative z-10">
      <div className="inline-block relative">
        <h2 className="font-marker text-4xl md:text-6xl text-brand-brown transform -rotate-1">
          Our Story in Pictures
        </h2>
        <Doodle type="squiggle" className="absolute -bottom-1 left-0 w-full text-brand-burgundy h-6" />
      </div>
      <p className="font-hand text-2xl text-brand-brown/80 mt-16 max-w-2xl mx-auto">
        From read-aloud sessions to library transformations. Every photo
        captures a moment of literacy in action across Kenya.
      </p>
    </div>

    {/* Gallery Grid */}
    <div className="max-w-7xl mx-auto relative z-10">
      {isLoading ? (
        <div className="text-center py-20">
          <div className="w-12 h-12 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-hand text-2xl text-brand-brown">Developing the film...</p>
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-20 bg-white/20 backdrop-blur-sm border-4 border-dashed border-brand-brown/20 rounded-3xl">
          <p className="font-hand text-2xl text-brand-brown">No photos in our story yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-4">
          {images.map((item, index) => (
            <div key={item.id} className="flex justify-center p-4">
              <Polaroid
                src={item.imageUrl}
                alt={item.caption || 'Gallery image'}
                caption={item.caption || ''}
                rotation={index % 3 === 0 ? 2 : index % 3 === 1 ? -2 : 1}
                delay={index * 0.1}
              />
            </div>
          ))}
        </div>
      )}
    </div>

    {/* Decorative elements */}
    <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rotate-12 backdrop-blur-sm rounded-lg pointer-events-none"></div>
    <div className="absolute bottom-10 right-10 w-40 h-40 bg-brand-orange/10 -rotate-6 rounded-full pointer-events-none"></div>
  </section>;
}