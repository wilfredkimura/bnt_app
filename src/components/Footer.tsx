

import { Doodle } from './ui/Doodle';

export function Footer() {
    return (
        <footer className="bg-brand-burgundy text-brand-cream py-16 relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    <div>
                        <h3 className="font-marker text-2xl mb-4">
                            Books & Trunks Society
                        </h3>
                        <p className="font-hand text-xl opacity-80">
                            Fostering literacy across Kenya, one trunk at a time.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-marker text-xl mb-4">Contact</h4>
                        <p className="font-hand text-lg opacity-80">
                            P.O. Box 20380-00200
                            <br />
                            Nairobi, Kenya
                            <br />
                            +254 705 956 111
                            <br />
                            thebooksandtrunkssociety@gmail.com
                        </p>
                    </div>
                    <div>
                        <h4 className="font-marker text-xl mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                             <a href="https://instagram.com/books_n_trunks_/" target="_blank" rel="noopener noreferrer" className="font-hand text-lg hover:text-brand-orange transition-colors">
                                Instagram
                            </a>
                            <a href="https://tiktok.com/@books_n_trunks_" target="_blank" rel="noopener noreferrer" className="font-hand text-lg hover:text-brand-orange transition-colors">
                                TikTok
                            </a>
                        </div>
                    </div>
                </div>

                <Doodle type="heart" className="w-12 h-12 mx-auto mb-6 text-brand-orange" />

                <div className="text-center font-sans text-sm opacity-60">
                    <p>© {new Date().getFullYear()} Books and Trunks Society. Established October 2024.</p>
                </div>
            </div>

            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
        </footer>
    );
}
