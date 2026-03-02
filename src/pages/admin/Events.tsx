import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllEvents, deleteEvent, updateEvent } from '../../lib/api';
import { useAuth } from '@clerk/clerk-react';

interface Event {
    id: string;
    title: string;
    description: string;
    location: string;
    eventDate: string;
    published: boolean;
    eventType: string;
}

export function AdminEvents() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const { getToken } = useAuth();

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {
        try {
            const token = await getToken();
            const data = await getAllEvents(token);
            setEvents(data);
        } catch (error) {
            console.error('Failed to load events:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this event?')) return;

        try {
            const token = await getToken();
            await deleteEvent(id, token);
            setEvents(events.filter(e => e.id !== id));
        } catch (error) {
            console.error('Failed to delete event:', error);
            alert('Failed to delete event');
        }
    };

    const togglePublish = async (event: Event) => {
        try {
            const token = await getToken();
            const updated = await updateEvent(event.id, { published: !event.published }, token);
            setEvents(events.map(e => e.id === event.id ? updated : e));
        } catch (error) {
            console.error('Failed to toggle publish status:', error);
            alert('Failed to update event');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="font-hand text-2xl text-brand-brown">Loading events...</p>
            </div>
        );
    }

    return (
        <div className="pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="font-marker text-3xl md:text-5xl text-brand-brown mb-2">
                        Manage Events
                    </h1>
                    <p className="font-hand text-lg md:text-xl text-brand-brown/70">
                        Schedule and manage society meetings and events
                    </p>
                </div>
                <Link
                    to="/admin/events/new"
                    className="font-hand text-xl bg-brand-burgundy text-brand-cream px-6 py-3 rounded-lg shadow-lg hover:shadow-xl hover:bg-brand-brown transition-all text-center"
                >
                    📅 Create New Event
                </Link>
            </div>

            {events.length === 0 ? (
                <div className="bg-brand-cream p-12 rounded-lg shadow-lg border-2 border-brand-brown/20 text-center">
                    <p className="font-hand text-2xl text-brand-brown mb-4">
                        No events scheduled yet.
                    </p>
                    <Link
                        to="/admin/events/new"
                        className="inline-block font-hand text-xl bg-brand-burgundy text-brand-cream px-6 py-3 rounded-lg shadow-lg hover:shadow-xl hover:bg-brand-brown transition-all"
                    >
                        📅 Create First Event
                    </Link>
                </div>
            ) : (
                <div className="bg-brand-cream rounded-lg shadow-lg border-2 border-brand-brown/20 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-brand-burgundy text-brand-cream">
                                <tr>
                                    <th className="font-marker text-xl text-left px-6 py-4">Event</th>
                                    <th className="font-marker text-xl text-left px-6 py-4">Date</th>
                                    <th className="font-marker text-xl text-left px-6 py-4">Status</th>
                                    <th className="font-marker text-xl text-left px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.map((event) => (
                                    <tr key={event.id} className="border-b border-brand-brown/10 hover:bg-brand-orange/10">
                                        <td className="px-6 py-4">
                                            <div className="font-hand text-lg text-brand-brown font-bold">
                                                {event.title}
                                            </div>
                                            <div className="font-hand text-sm text-brand-brown/60">
                                                {event.eventType} • {event.location}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-hand text-lg text-brand-brown">
                                            {new Date(event.eventDate).toLocaleDateString()}
                                            <br />
                                            <span className="text-sm opacity-60">
                                                {new Date(event.eventDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => togglePublish(event)}
                                                className={`px-3 py-1 rounded-full font-hand text-sm transition-all ${event.published
                                                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {event.published ? '✅ Published' : '📝 Draft'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <Link
                                                    to={`/admin/events/edit/${event.id}`}
                                                    className="font-hand text-sm bg-brand-brown text-brand-cream px-3 py-2 rounded hover:bg-brand-burgundy transition-all"
                                                >
                                                    ✏️ Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(event.id)}
                                                    className="font-hand text-sm bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition-all"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
