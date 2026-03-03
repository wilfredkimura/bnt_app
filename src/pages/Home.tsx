import { Link } from 'react-router-dom';
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

            {/* Mobile-only Registration CTA */}
            <div className="md:hidden px-4 py-12 bg-brand-orange/10 border-y-2 border-brand-orange/20">
                <div className="text-center space-y-4">
                    <h2 className="font-marker text-3xl text-brand-brown">Join the Society</h2>
                    <p className="font-hand text-lg text-brand-brown/80 italic">
                        Become a part of our mission to spread literacy across Kenya. Register today to volunteer or support our trunks.
                    </p>
                    <div className="pt-4">
                        <Link to="/signup" className="group relative inline-block w-full max-w-xs">
                            <div className="absolute inset-0 bg-brand-brown rounded-lg transform rotate-1 group-hover:rotate-0 transition-transform"></div>
                            <div className="relative bg-brand-orange text-white font-marker text-xl px-8 py-4 rounded-lg transform -rotate-1 group-hover:rotate-0 transition-transform border-2 border-brand-brown text-center">
                                Create Your Account
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            <ImpactSection />
            <EventsSection />
            <CommunitySection />
        </main>
    );
}
