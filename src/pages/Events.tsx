import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getPublishedEvents } from '../lib/api.js';
import { Doodle } from '../components/ui/Doodle';
import { Tape } from '../components/ui/Tape';

interface Event {
    id: string;
    title: string;
    description: string;
    location: string;
    eventDate: string;
    endDate?: string;
    eventType: string;
    imageUrl?: string;
}

export function Events() {
    const [events, setEvents] = useState<Event[]>([]);
    const [, setLoading] = useState(true);

    useEffect(() => {
        async function loadEvents() {
            try {
                const data = await getPublishedEvents();
                // Sort by date (descending for history, ascending for upcoming)
                setEvents(data.sort((a: Event, b: Event) =>
                    new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
                ));
            } catch (err) {
                console.error('Failed to load events:', err);
            } finally {
                setLoading(false);
            }
        }
        loadEvents();
    }, []);

    const upcomingEvents = events.filter(e => new Date(e.eventDate) >= new Date());
    const pastEvents = events.filter(e => new Date(e.eventDate) < new Date()).reverse();

    return (
        <main className="min-h-screen bg-brand-cream pt-24 pb-20 px-4">
            <div className="max-w-6xl mx-auto">
                <header className="text-center mb-20 relative">
                    <h1 className="font-marker text-5xl md:text-7xl text-brand-brown mb-6">
                        Society Calendar
                    </h1>
                    <p className="font-hand text-2xl text-brand-brown/70 max-w-2xl mx-auto italic">
                        "Turning the page, one community at a time."
                    </p>
                    <Doodle type="underline" className="w-64 h-8 mx-auto text-brand-orange/40" />

                    <div className="mt-8 flex justify-center gap-4">
                        <button
                            onClick={() => window.open('/api/events/feed', '_blank')}
                            className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md font-marker text-brand-brown hover:bg-brand-orange hover:text-white transition-all border-2 border-brand-brown/10"
                        >
                            <Doodle type="star" className="w-5 h-5" />
                            Sync to My Calendar
                        </button>
                    </div>
                </header>

                <section className="mb-20">
                    <h2 className="font-marker text-3xl text-brand-brown mb-10 flex items-center gap-4">
                        <span className="bg-brand-orange w-12 h-1 px-4"></span>
                        Upcoming Events
                    </h2>

                    {upcomingEvents.length > 0 ? (
                        <div className="space-y-12">
                            {upcomingEvents.map((event, index) => (
                                <EventCard key={event.id} event={event} index={index} isPast={false} />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white/50 border-2 border-dashed border-brand-brown/20 p-12 text-center rounded-3xl">
                            <p className="font-hand text-2xl text-brand-brown/50">
                                No upcoming events scheduled just yet. Check back soon!
                            </p>
                        </div>
                    )}
                </section>

                {pastEvents.length > 0 && (
                    <section>
                        <h2 className="font-marker text-3xl text-brand-brown/50 mb-10 flex items-center gap-4">
                            <span className="bg-brand-brown/20 w-12 h-1 px-4"></span>
                            Recent History
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {pastEvents.map((event, index) => (
                                <EventCard key={event.id} event={event} index={index} isPast={true} />
                            ))}
                        </div>
                    </section>
                )}
            </div>

            <Doodle type="squiggle" className="fixed bottom-10 right-10 w-32 h-32 opacity-10 pointer-events-none" />
            <Doodle type="heart" className="fixed top-40 left-10 w-24 h-24 text-brand-burgundy/10 pointer-events-none -rotate-12" />
        </main>
    );
}

function EventCard({ event, index, isPast }: { event: Event; index: number; isPast: boolean }) {
    const date = new Date(event.eventDate);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`relative flex flex-col md:flex-row gap-8 bg-white p-8 rounded-2xl shadow-lg border-2 border-brand-brown/5 ${isPast ? 'opacity-70 grayscale-[0.5]' : ''}`}
            id={event.id}
        >
            <div className="md:w-1/4 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r-2 border-dashed border-brand-brown/10 pb-6 md:pb-0 md:pr-8">
                <span className="font-marker text-6xl text-brand-orange leading-none">{day}</span>
                <span className="font-marker text-2xl text-brand-brown uppercase">{month}</span>
                <span className="font-hand text-xl text-brand-brown/50">{year}</span>
                <div className="mt-4 bg-brand-peach/20 px-3 py-1 rounded-full flex items-center gap-2">
                    <span className="font-hand font-bold text-brand-brown/70">{time}</span>
                </div>
            </div>

            <div className="flex-1 relative">
                {!isPast && <Tape variant="corner-tr" className="-top-4 -right-4" />}
                <div className="mb-4">
                    <span className="inline-block bg-brand-brown text-white font-hand px-3 py-1 text-sm rounded-md mb-2 rotate-1">
                        {event.eventType}
                    </span>
                    <h3 className="font-marker text-3xl text-brand-brown leading-tight">
                        {event.title}
                    </h3>
                    <p className="font-hand text-xl text-brand-orange flex items-center gap-2 mt-1">
                        📍 {event.location}
                    </p>
                </div>
                <p className="font-hand text-xl text-brand-brown/80 leading-relaxed mb-6">
                    {event.description}
                </p>

                {isPast && event.imageUrl && (
                    <div className="mt-4 opacity-80 hover:opacity-100 transition-opacity">
                        <img src={event.imageUrl} alt={event.title} className="w-full h-48 object-cover rounded-xl border-4 border-white shadow-md inline-block transform -rotate-1" />
                    </div>
                )}
            </div>
        </motion.div>
    );
}
