import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Doodle } from './Doodle';
import type { GalleryItem } from '@prisma/client';

interface ImageViewerProps {
    items: GalleryItem[];
    currentIndex: number;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
}

export function ImageViewer({ items, currentIndex, onClose, onNext, onPrev }: ImageViewerProps) {
    const item = items[currentIndex];
    const [direction, setDirection] = useState(0);

    // Lock body scroll when open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') {
                setDirection(1);
                onNext();
            }
            if (e.key === 'ArrowLeft') {
                setDirection(-1);
                onPrev();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose, onNext, onPrev]);

    if (!item) return null;

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-brand-brown/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-[110] text-brand-cream hover:text-brand-orange transition-colors"
                >
                    <div className="relative p-2">
                        <span className="font-marker text-4xl">✕</span>
                        <Doodle type="circle" className="absolute inset-0 text-brand-orange/30 w-full h-full -rotate-12" />
                    </div>
                </button>

                {/* Navigation Buttons (Desktop) */}
                <div className="absolute inset-x-4 md:inset-x-8 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-[110]">
                    <button
                        onClick={() => { setDirection(-1); onPrev(); }}
                        className="pointer-events-auto group p-4 text-brand-cream hover:text-brand-orange transition-all transform hover:scale-110"
                    >
                        <div className="relative">
                            <span className="font-marker text-6xl">←</span>
                            <Doodle type="squiggle" className="absolute -bottom-2 left-0 w-full text-brand-orange/40 h-4" />
                        </div>
                    </button>
                    <button
                        onClick={() => { setDirection(1); onNext(); }}
                        className="pointer-events-auto group p-4 text-brand-cream hover:text-brand-orange transition-all transform hover:scale-110"
                    >
                        <div className="relative">
                            <span className="font-marker text-6xl">→</span>
                            <Doodle type="squiggle" className="absolute -bottom-2 left-0 w-full text-brand-orange/40 h-4" />
                        </div>
                    </button>
                </div>

                {/* Main Content Area */}
                <div className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center gap-6">
                    <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden">
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.div
                                key={item.id}
                                custom={direction}
                                variants={{
                                    enter: (direction: number) => ({
                                        x: direction > 0 ? 1000 : -1000,
                                        opacity: 0,
                                        rotate: direction > 0 ? 5 : -5
                                    }),
                                    center: {
                                        zIndex: 1,
                                        x: 0,
                                        opacity: 1,
                                        rotate: 0
                                    },
                                    exit: (direction: number) => ({
                                        zIndex: 0,
                                        x: direction < 0 ? 1000 : -1000,
                                        opacity: 0,
                                        rotate: direction < 0 ? 5 : -5
                                    })
                                }}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 }
                                }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={1}
                                onDragEnd={(_e, { offset, velocity }) => {
                                    const swipe = swipePower(offset.x, velocity.x);

                                    if (swipe < -swipeConfidenceThreshold) {
                                        setDirection(1);
                                        onNext();
                                    } else if (swipe > swipeConfidenceThreshold) {
                                        setDirection(-1);
                                        onPrev();
                                    }
                                }}
                                className="absolute w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
                            >
                                <div className="bg-brand-cream p-4 md:p-6 rounded-lg shadow-2xl border-8 border-brand-brown max-h-[80vh] relative group">
                                    <div className="relative overflow-hidden rounded-sm">
                                        <img
                                            src={item.imageUrl}
                                            alt={item.caption || ''}
                                            className="max-h-[70vh] w-auto block object-contain"
                                            draggable={false}
                                        />
                                        <div className="absolute inset-0 pointer-events-none border-[1px] border-black/5"></div>
                                    </div>

                                    {/* Doodles on the frame */}
                                    <Doodle type="star" className="absolute -top-6 -right-6 w-12 h-12 text-brand-orange rotate-12" />
                                    <Doodle type="heart" className="absolute -bottom-6 -left-6 w-10 h-10 text-brand-burgundy -rotate-12" />
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Caption Card */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="w-full max-w-2xl bg-brand-cream p-6 rounded-xl border-4 border-brand-brown shadow-xl transform rotate-1 relative z-[110]"
                    >
                        <Doodle type="squiggle" className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-6 text-brand-orange opacity-40" />

                        <div className="text-center space-y-2">
                            <h3 className="font-marker text-2xl md:text-3xl text-brand-brown underline decoration-brand-orange/40">
                                {item.caption || 'Books & Trunks Journey'}
                            </h3>
                            {item.location && (
                                <p className="font-hand text-xl text-brand-brown/70 italic">
                                    📍 {item.location}
                                </p>
                            )}
                            {item.eventDate && (
                                <p className="font-hand text-lg text-brand-burgundy/60">
                                    {new Date(item.eventDate).toLocaleDateString('en-US', {
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </p>
                            )}
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
