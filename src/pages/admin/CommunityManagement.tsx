import { useState, useEffect } from 'react';
import { Doodle } from '../../components/ui/Doodle';

interface CommunityMember {
    id: string;
    name: string;
    role: string;
    email: string | null;
    tags: string[];
    isActive: boolean;
    joinedDate: string;
}

export function CommunityManagement() {
    const [members, setMembers] = useState<CommunityMember[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [newTag, setNewTag] = useState('');
    const [editingRoleIds, setEditingRoleIds] = useState<Set<string>>(new Set());
    const [customRoles, setCustomRoles] = useState<Record<string, string>>({});

    const fetchMembers = async () => {
        try {
            const response = await fetch('/api/community?all=true');
            if (response.ok) {
                const data = await response.json();
                setMembers(data);
            } else {
                setError('Failed to load community members');
            }
        } catch (err) {
            setError('Network error');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const handleUpdateMember = async (id: string, updates: Partial<CommunityMember>) => {
        try {
            const response = await fetch(`/api/community/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates),
            });

            if (response.ok) {
                await fetchMembers();
            } else {
                alert('Update failed');
            }
        } catch (err) {
            alert('Error updating member');
        }
    };

    const addTag = (id: string, currentTags: string[]) => {
        if (!newTag.trim()) return;
        if (currentTags.includes(newTag.trim())) {
            setNewTag('');
            return;
        }
        handleUpdateMember(id, { tags: [...currentTags, newTag.trim()] });
        setNewTag('');
    };

    const removeTag = (id: string, currentTags: string[], tagToRemove: string) => {
        handleUpdateMember(id, { tags: currentTags.filter(t => t !== tagToRemove) });
    };

    const toggleCustomRole = (id: string, initialRole: string) => {
        setEditingRoleIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
                setCustomRoles(prevRoles => ({ ...prevRoles, [id]: initialRole }));
            }
            return next;
        });
    };

    const handleCustomRoleChange = (id: string, value: string) => {
        setCustomRoles(prev => ({ ...prev, [id]: value }));
    };

    const saveCustomRole = (id: string) => {
        const role = customRoles[id];
        if (role && role.trim()) {
            handleUpdateMember(id, { role: role.trim() });
        }
        setEditingRoleIds(prev => {
            const next = new Set(prev);
            next.delete(id);
            return next;
        });
    };

    if (isLoading) return <div className="p-8 text-center font-hand text-2xl text-brand-brown">Loading community...</div>;
    if (error) return <div className="p-8 text-center text-red-500 font-hand text-2xl">{error}</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center mb-6">
                <div className="relative inline-block">
                    <h1 className="font-marker text-3xl md:text-4xl text-brand-brown transform -rotate-1">Community Management</h1>
                    <div className="absolute -bottom-1 left-0 w-full">
                        <Doodle type="underline" className="w-full text-brand-orange h-3" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {members.map((member) => (
                    <div key={member.id} className="bg-white p-6 rounded-xl shadow-lg border-2 border-brand-brown/10 hover:border-brand-orange transition-all transform hover:-rotate-1">
                        <div className="flex flex-wrap justify-between items-start gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="font-marker text-2xl text-brand-brown">{member.name}</h3>
                                    <span className={`px-3 py-1 rounded-full text-sm font-marker bg-brand-brown text-brand-cream`}>
                                        {member.role}
                                    </span>
                                    {!member.isActive && (
                                        <span className="px-2 py-0.5 rounded bg-red-100 text-red-600 text-xs font-bold uppercase">Inactive</span>
                                    )}
                                </div>
                                <p className="font-hand text-lg text-brand-brown/70 mb-4">{member.email}</p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {member.tags.map((tag) => (
                                        <span key={tag} className="flex items-center gap-1 bg-brand-orange/10 text-brand-brown px-3 py-1 rounded-full border-2 border-brand-orange/20 font-hand text-lg">
                                            {tag}
                                            <button
                                                onClick={() => removeTag(member.id, member.tags, tag)}
                                                className="hover:text-red-500 transition-colors"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                    {editingId === member.id ? (
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                value={newTag}
                                                onChange={(e) => setNewTag(e.target.value)}
                                                onKeyDown={(e) => e.key === 'Enter' && addTag(member.id, member.tags)}
                                                placeholder="New tag..."
                                                className="px-3 py-1 rounded-full border-2 border-brand-orange outline-none font-hand text-lg w-32"
                                                autoFocus
                                            />
                                            <button onClick={() => addTag(member.id, member.tags)} className="text-brand-orange font-bold text-xl">+</button>
                                            <button onClick={() => { setEditingId(null); setNewTag(''); }} className="text-brand-brown/50 font-bold text-xl">×</button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setEditingId(member.id)}
                                            className="px-3 py-1 rounded-full border-2 border-dashed border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white transition-all font-hand text-lg"
                                        >
                                            + Add Tag
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 min-w-[200px]">
                                <button
                                    onClick={() => handleUpdateMember(member.id, { isActive: !member.isActive })}
                                    className={`px-4 py-2 rounded-lg font-marker text-sm border-2 transition-all ${member.isActive
                                        ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-600 hover:text-white'
                                        : 'bg-green-50 text-green-600 border-green-200 hover:bg-green-600 hover:text-white'
                                        }`}
                                >
                                    {member.isActive ? 'Deactivate' : 'Activate'}
                                </button>

                                {editingRoleIds.has(member.id) ? (
                                    <div className="flex flex-col gap-1">
                                        <input
                                            type="text"
                                            value={customRoles[member.id] || ''}
                                            onChange={(e) => handleCustomRoleChange(member.id, e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && saveCustomRole(member.id)}
                                            placeholder="Enter custom role..."
                                            className="px-3 py-2 rounded-lg border-2 border-brand-orange outline-none font-hand text-lg"
                                            autoFocus
                                        />
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => saveCustomRole(member.id)}
                                                className="flex-1 bg-brand-orange text-white rounded-lg font-marker text-xs py-1 hover:bg-brand-brown transition-colors"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={() => toggleCustomRole(member.id, '')}
                                                className="flex-1 bg-gray-100 text-gray-600 rounded-lg font-marker text-xs py-1 hover:bg-gray-200"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-1">
                                        <select
                                            className="w-full px-4 py-2 rounded-lg font-marker text-sm border-2 border-brand-brown/10 bg-white"
                                            value={['Volunteer', 'Donor', 'OrganisationLeader', 'Admin'].includes(member.role) ? member.role : 'custom'}
                                            onChange={(e) => {
                                                if (e.target.value === 'custom') {
                                                    toggleCustomRole(member.id, member.role);
                                                } else {
                                                    handleUpdateMember(member.id, { role: e.target.value });
                                                }
                                            }}
                                        >
                                            <option value="Volunteer">Volunteer</option>
                                            <option value="Donor">Donor</option>
                                            <option value="OrganisationLeader">Organisation Leader</option>
                                            <option value="Admin">Admin</option>
                                            <option value="custom">Custom Role...</option>
                                        </select>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
