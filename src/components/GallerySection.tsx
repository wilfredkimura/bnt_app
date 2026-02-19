import React from 'react';
import { Polaroid } from './ui/Polaroid';
import { Doodle } from './ui/Doodle';
const photos = [{
  src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  caption: 'Read Aloud Sessions',
  rotation: -2,
  attachment: 'tape' as const
}, {
  src: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  caption: 'Library Transformation',
  rotation: 3,
  attachment: 'pin' as const
}, {
  src: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  caption: 'Book Club Days Out',
  rotation: -4,
  attachment: 'tape' as const
}, {
  src: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  caption: 'Paint Their Dreams',
  rotation: 2,
  attachment: 'pin' as const
}, {
  src: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  caption: 'Toto Kreatives Festival',
  rotation: -3,
  attachment: 'tape' as const
}, {
  src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  caption: 'PCEA Upendo Church',
  rotation: 4,
  attachment: 'pin' as const
}];
export function GallerySection() {
  return <section className="py-24 px-4 bg-texture-cork relative overflow-hidden">
      {/* Section Title */}
      <div className="text-center mb-16 relative z-10">
        <div className="inline-block relative">
          <h2 className="font-marker text-4xl md:text-6xl text-brand-brown transform -rotate-1">
            Our Story in Pictures
          </h2>
          <Doodle type="squiggle" className="absolute -bottom-6 left-0 w-full text-brand-burgundy h-8" />
        </div>
        <p className="font-hand text-2xl text-brand-brown/80 mt-6 max-w-2xl mx-auto">
          From read-aloud sessions to library transformations. Every photo
          captures a moment of literacy in action across Kenya.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-4 relative z-10">
        {photos.map((photo, index) => <div key={index} className="flex justify-center p-4">
            <Polaroid {...photo} delay={index * 0.1} />
          </div>)}
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rotate-12 backdrop-blur-sm rounded-lg pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-brand-orange/10 -rotate-6 rounded-full pointer-events-none"></div>
    </section>;
}