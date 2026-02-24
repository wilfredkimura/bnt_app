import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Doodle } from '../components/ui/Doodle';

interface CommunityMember {
    id: string;
    name: string;
    role: string;
    email: string | null;
    bio: string | null;
    photoUrl: string | null;
    location: string | null;
    tags: string[];
}

export function Profile() {
    const { user } = useUser();
    const [profile, setProfile] = useState<CommunityMember | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Form states
    const [bio, setBio] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');

    useEffect(() => {
        if (user) {
            fetchProfile();
        }
    }, [user]);

    const fetchProfile = async () => {
        try {
            const response = await fetch('/api/community/me');
            if (response.ok) {
                const data = await response.json();
                setProfile(data);
                setBio(data.bio || '');
                setPhotoUrl(data.photoUrl || '');
                setName(data.name || '');
                setLocation(data.location || '');
            }
        } catch (err) {
            console.error('Error fetching profile:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage(null);

        try {
            const response = await fetch('/api/community/me', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ bio, photoUrl, name, location }),
            });

            if (response.ok) {
                const updated = await response.json();
                setProfile(updated);
                setMessage({ type: 'success', text: 'Profile updated successfully!' });
            } else {
                setMessage({ type: 'error', text: 'Failed to update profile.' });
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'Network error. Please try again.' });
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) return <div className="p-8 text-center font-hand text-2xl text-brand-brown">Loading profile...</div>;

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <div className="relative inline-block mb-12">
                <h1 className="font-marker text-5xl text-brand-brown transform -rotate-1">My Profile</h1>
                <Doodle type="underline" className="absolute -bottom-2 left-0 w-full text-brand-orange h-4" />
            </div>

            <div className="bg-white border-4 border-brand-brown/10 rounded-3xl p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 transform rotate-12 -mr-16 -mt-16 rounded-full" />

                <form onSubmit={handleSave} className="relative z-10 space-y-8">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="w-full md:w-1/3 flex flex-col items-center gap-4">
                            <div className="w-48 h-48 rounded-full border-4 border-brand-orange overflow-hidden bg-brand-cream shadow-lg transform hover:scale-105 transition-transform">
                                {photoUrl ? (
                                    <img src={photoUrl} alt={name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-6xl text-brand-brown/20 bg-brand-brown/5 font-hand">
                                        {name?.charAt(0) || '👤'}
                                    </div>
                                )}
                            </div>
                            <div className="w-full">
                                <label className="block font-marker text-lg text-brand-brown mb-2 text-center md:text-left">Photo URL</label>
                                <input
                                    type="text"
                                    value={photoUrl}
                                    onChange={(e) => setPhotoUrl(e.target.value)}
                                    placeholder="https://example.com/photo.jpg"
                                    className="w-full px-4 py-2 rounded-xl border-2 border-brand-brown/20 focus:border-brand-burgundy outline-none font-hand text-lg bg-white/50"
                                />
                            </div>
                        </div>

                        <div className="flex-1 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block font-marker text-lg text-brand-brown mb-2">Display Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-4 py-2 rounded-xl border-2 border-brand-brown/20 focus:border-brand-burgundy outline-none font-hand text-lg"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block font-marker text-lg text-brand-brown mb-2">Location</label>
                                    <input
                                        type="text"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        placeholder="City, Country"
                                        className="w-full px-4 py-2 rounded-xl border-2 border-brand-brown/20 focus:border-brand-burgundy outline-none font-hand text-lg"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block font-marker text-lg text-brand-brown mb-2">Bio / Story</label>
                                <textarea
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    placeholder="Tell us a bit about your journey with Books & Trunks..."
                                    className="w-full px-4 py-2 h-40 rounded-xl border-2 border-brand-brown/20 focus:border-brand-burgundy outline-none font-hand text-lg resize-none"
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="px-4 py-2 bg-brand-brown text-brand-cream rounded-full font-marker text-sm">
                                    Role: {profile?.role}
                                </div>
                                {profile?.tags && profile.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {profile.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-brand-orange/10 border-2 border-brand-orange/20 rounded-full font-hand text-sm text-brand-brown">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {message && (
                        <div className={`p-4 rounded-xl font-hand text-lg text-center ${message.type === 'success' ? 'bg-green-100 text-green-800 border-2 border-green-500' : 'bg-red-100 text-red-800 border-2 border-red-500'}`}>
                            {message.text}
                        </div>
                    )}

                    <div className="flex justify-center pt-4">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className={`px-12 py-4 bg-brand-orange text-white rounded-2xl font-marker text-2xl shadow-[4px_4px_0px_#4A3728] active:translate-y-1 active:shadow-none transition-all disabled:opacity-50`}
                        >
                            {isSaving ? 'Saving...' : '✨ Save My Profile'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
