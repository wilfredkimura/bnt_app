import { useState, useEffect } from 'react';
import { Doodle } from '../components/ui/Doodle';
import { Tape } from '../components/ui/Tape';

interface CommunityMember {
    id: string;
    name: string;
    role: string;
    bio: string | null;
    photoUrl: string | null;
    location: string | null;
    tags: string[];
}

export function Members() {
    const [members, setMembers] = useState<CommunityMember[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const response = await fetch('/api/community');
            if (response.ok) {
                const data = await response.json();
                setMembers(data);
            }
        } catch (err) {
            console.error('Error fetching members:', err);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <div className="p-8 text-center font-hand text-2xl text-brand-brown">Gently opening our community book...</div>;

    return (
        <div className="max-w-7xl mx-auto py-16 px-4">
            <div className="text-center mb-20">
                <div className="relative inline-block mb-6">
                    <h1 className="font-marker text-6xl text-brand-brown transform -rotate-1">Our Community</h1>
                    <Doodle type="underline" className="absolute -bottom-4 left-0 w-full text-brand-orange h-6" />
                </div>
                <p className="font-hand text-2xl text-brand-brown/70 max-w-2xl mx-auto">
                    Meet the amazing people who make Books & Trunks possible. Volunteers, donors, and visionaries working together.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {members.map((member, index) => (
                    <div
                        key={member.id}
                        className="group relative bg-white p-8 rounded-2xl shadow-xl transition-all hover:-translate-y-2 hover:rotate-1"
                        style={{ transform: `rotate(${(index % 2 === 0 ? 1 : -1) * (Math.random() * 2)}deg)` }}
                    >
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 w-24">
                            <Tape className="text-brand-orange/40" />
                        </div>

                        <div className="flex flex-col items-center text-center">
                            <div className="w-32 h-32 rounded-full border-4 border-brand-orange mb-6 overflow-hidden bg-brand-cream shadow-inner group-hover:scale-110 transition-transform duration-300">
                                {member.photoUrl ? (
                                    <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-4xl bg-brand-brown/5 text-brand-brown/20 italic">
                                        {member.name.charAt(0)}
                                    </div>
                                )}
                            </div>

                            <h3 className="font-marker text-2xl text-brand-brown mb-1">{member.name}</h3>
                            <div className="px-3 py-1 bg-brand-brown text-brand-cream rounded-full font-marker text-xs mb-4">
                                {member.role}
                            </div>

                            {member.location && (
                                <div className="flex items-center gap-1 font-hand text-brand-brown/60 mb-4">
                                    <span>📍</span> {member.location}
                                </div>
                            )}

                            <p className="font-hand text-lg text-brand-brown/80 line-clamp-4 italic mb-6">
                                "{member.bio || "Just joined the society! Ready to make an impact."}"
                            </p>

                            <div className="mt-auto flex flex-wrap justify-center gap-2">
                                {member.tags.slice(0, 3).map(tag => (
                                    <span key={tag} className="text-xs font-marker text-brand-orange uppercase tracking-wider">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="absolute -bottom-3 -right-3 w-12 h-12 text-brand-brown/10 pointer-events-none transform -rotate-12 group-hover:rotate-0 transition-all">
                            <Doodle type="star" />
                        </div>
                    </div>
                ))}
            </div>

            {members.length === 0 && (
                <div className="text-center py-20 bg-brand-cream/50 rounded-3xl border-4 border-dashed border-brand-brown/10">
                    <p className="font-hand text-3xl text-brand-brown/40 italic">
                        The community book is currently empty. Be the first to join!
                    </p>
                </div>
            )}
        </div>
    );
}
