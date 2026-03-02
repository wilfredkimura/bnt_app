import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getPublishedEvents } from '../lib/api.js';
import { Doodle } from './ui/Doodle';
import { Tape } from './ui/Tape';

interface Event {
    id: string;
    title: string;
    description: string;
    location: string;
    eventDate: string;
    imageUrl?: string;
}

export function EventsSection() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadEvents() {
            try {
                const data = await getPublishedEvents();
                // Filter for upcoming events and take the first 3
                const now = new Date();
                const upcoming = data
                    .filter((e: Event) => new Date(e.eventDate) >= now)
                    .slice(0, 3);
                setEvents(upcoming);
            } catch (err) {
                console.error('Failed to load events:', err);
            } finally {
                setLoading(false);
            }
        }
        loadEvents();
    }, []);

    if (loading || events.length === 0) return null;

    return (
        <section className="py-20 px-4 bg-texture-paper relative overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16 relative">
                    <h2 className="font-marker text-4xl md:text-5xl text-brand-brown mb-4">
                        Mark Your Calendars!
                    </h2>
                    <p className="font-hand text-2xl text-brand-brown/70">
                        Upcoming meetings and society events
                    </p>
                    <Doodle type="arrow" className="absolute -right-8 top-0 w-16 h-16 rotate-45 opacity-30 hidden md:block" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {events.map((event, index) => {
                        const date = new Date(event.eventDate);
                        const day = date.getDate();
                        const month = date.toLocaleString('default', { month: 'short' });

                        return (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="relative group"
                            >
                                <div className={`bg-white p-6 shadow-xl border-2 border-brand-brown/10 transform ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'} transition-transform group-hover:rotate-0`}>
                                    <Tape variant="top" className="left-1/2 -translate-x-1/2 -top-4 opacity-80" />

                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="bg-brand-orange text-white p-3 rotate-3 shadow-md min-w-[60px] text-center">
                                            <span className="block font-marker text-2xl leading-none">{day}</span>
                                            <span className="block font-hand text-sm uppercase font-bold">{month}</span>
                                        </div>
                                        <div>
                                            <h3 className="font-marker text-xl text-brand-brown leading-tight mb-1">
                                                {event.title}
                                            </h3>
                                            <p className="font-hand text-brand-brown/60 text-sm flex items-center gap-1">
                                                <Doodle type="star" className="w-3 h-3" />
                                                {event.location}
                                            </p>
                                        </div>
                                    </div>

                                    <p className="font-hand text-lg text-brand-brown/80 mb-6 line-clamp-3">
                                        {event.description}
                                    </p>

                                    <div className="flex justify-between items-center">
                                        <a
                                            href={`/events#${event.id}`}
                                            className="font-marker text-brand-orange hover:underline transition-all"
                                        >
                                            Details →
                                        </a>
                                        <button
                                            onClick={() => window.open('/api/events/feed', '_blank')}
                                            className="font-hand text-sm text-brand-brown/50 hover:text-brand-orange transition-colors flex items-center gap-1 bg-brand-peach/20 px-2 py-1 rounded"
                                            title="Sync all events to your calendar"
                                        >
                                            <Doodle type="star" className="w-3 h-3" />
                                            Sync All
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="mt-16 text-center">
                    <button
                        onClick={() => window.location.href = '/events'}
                        className="bg-brand-brown text-white font-marker px-8 py-4 text-xl shadow-lg border-b-4 border-black/30 hover:transform hover:-translate-y-1 transition-all active:border-b-0 active:translate-y-1"
                    >
                        View Full Calendar
                    </button>
                    <p className="mt-4 font-hand text-brand-brown/50 italic">
                        Never miss a trunk delivery or volunteer meeting.
                    </p>
                </div>
            </div>

            <Doodle type="squiggle" className="absolute -left-10 bottom-10 w-40 h-40 opacity-10 -rotate-12" />
            <Doodle type="star" className="absolute right-10 top-20 w-12 h-12 text-brand-orange/20 rotate-12" />
        </section>
    );
}
