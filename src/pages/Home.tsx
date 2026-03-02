import { HeroSection } from '../components/HeroSection';
import { GallerySection } from '../components/GallerySection';
import { ImpactSection } from '../components/ImpactSection';
import { CommunitySection } from '../components/CommunitySection';
import { EventsSection } from '../components/EventsSection';

export function Home() {
    return (
        <main className="min-h-screen w-full bg-texture-paper overflow-x-hidden selection:bg-brand-orange/30 p-0">
            <HeroSection />

            <div className="relative">
                <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-transparent to-brand-brown/5 z-20 pointer-events-none"></div>
                <GallerySection />
                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-transparent to-brand-brown/5 z-20 pointer-events-none"></div>
            </div>

            <ImpactSection />
            <EventsSection />
            <CommunitySection />
        </main>
    );
}
