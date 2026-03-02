import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { createEvent, updateEvent, getAllEvents } from '../../lib/api';

export function AdminEventEditor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getToken } = useAuth();
    const [loading, setLoading] = useState(id ? true : false);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        eventDate: '',
        eventType: 'Meeting',
        published: false
    });

    useEffect(() => {
        if (id) {
            loadEvent();
        }
    }, [id]);

    const loadEvent = async () => {
        try {
            const token = await getToken();
            const events = await getAllEvents(token);
            const event = events.find((e: any) => e.id === id);
            if (event) {
                setFormData({
                    title: event.title,
                    description: event.description,
                    location: event.location,
                    eventDate: new Date(event.eventDate).toISOString().slice(0, 16),
                    eventType: event.eventType,
                    published: event.published
                });
            }
        } catch (error) {
            console.error('Failed to load event:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const token = await getToken();
            if (id) {
                await updateEvent(id, formData, token);
            } else {
                await createEvent(formData, token);
            }
            navigate('/admin/events');
        } catch (error) {
            console.error('Failed to save event:', error);
            alert('Failed to save event');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="p-8 font-hand text-2xl text-brand-brown">Loading event details...</div>;
    }

    return (
        <div className="pb-20">
            <h1 className="font-marker text-3xl md:text-5xl text-brand-brown mb-8">
                {id ? '✏️ Edit Event' : '📅 Create New Event'}
            </h1>

            <form onSubmit={handleSubmit} className="bg-brand-cream p-6 md:p-10 rounded-xl border-2 border-brand-brown/20 shadow-xl max-w-4xl">
                <div className="space-y-6">
                    <div>
                        <label className="block font-marker text-xl text-brand-brown mb-2">Event Title</label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full font-hand text-xl p-3 border-2 border-brand-brown/10 rounded-lg focus:border-brand-orange focus:ring-0 outline-none"
                            placeholder="e.g. Community Trunk Delivery"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block font-marker text-xl text-brand-brown mb-2">Date & Time</label>
                            <input
                                type="datetime-local"
                                required
                                value={formData.eventDate}
                                onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                                className="w-full font-hand text-xl p-3 border-2 border-brand-brown/10 rounded-lg focus:border-brand-orange outline-none"
                            />
                        </div>
                        <div>
                            <label className="block font-marker text-xl text-brand-brown mb-2">Event Type</label>
                            <select
                                value={formData.eventType}
                                onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                                className="w-full font-hand text-xl p-3 border-2 border-brand-brown/10 rounded-lg focus:border-brand-orange outline-none"
                            >
                                <option>Meeting</option>
                                <option>Trunk Delivery</option>
                                <option>Workshop</option>
                                <option>Fundraiser</option>
                                <option>Community Outreach</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block font-marker text-xl text-brand-brown mb-2">Location</label>
                        <input
                            type="text"
                            required
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="w-full font-hand text-xl p-3 border-2 border-brand-brown/10 rounded-lg focus:border-brand-orange outline-none"
                            placeholder="e.g. Kangemi Primary School"
                        />
                    </div>

                    <div>
                        <label className="block font-marker text-xl text-brand-brown mb-2">Description</label>
                        <textarea
                            required
                            rows={4}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full font-hand text-xl p-3 border-2 border-brand-brown/10 rounded-lg focus:border-brand-orange outline-none resize-none"
                            placeholder="Short summary of what happens..."
                        />
                    </div>

                    <div className="flex items-center gap-4 py-4 border-y border-brand-brown/10">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.published}
                                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                className="w-6 h-6 rounded border-2 border-brand-brown/20 text-brand-orange focus:ring-brand-orange cursor-pointer"
                            />
                            <span className="font-marker text-xl text-brand-brown">Publish to Public Site</span>
                        </label>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex-1 font-marker text-2xl bg-brand-burgundy text-brand-cream py-4 rounded-xl shadow-[6px_6px_0px_#4A3728] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all disabled:opacity-50"
                        >
                            {saving ? 'Saving...' : id ? 'Update Event' : 'Schedule Event'}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/admin/events')}
                            className="px-8 font-marker text-2xl border-2 border-brand-brown/20 text-brand-brown py-4 rounded-xl hover:bg-brand-brown/5 transition-all"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
