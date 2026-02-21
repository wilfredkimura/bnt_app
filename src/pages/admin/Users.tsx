import { useState, useEffect } from 'react';
import { getAllUsers } from '../../lib/api';

interface User {
    id: number;
    name: string;
    email: string;
    role: 'Admin' | 'Volunteer' | 'Donor';
    subscriptionStatus: 'Active' | 'Inactive';
    createdAt: string;
}

export function AdminUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const data = await getAllUsers();
            setUsers(data);
        } catch (err) {
            console.error('Failed to load users:', err);
            setError('Failed to load users. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const stats = {
        total: users.length,
        admins: users.filter(u => u.role === 'Admin').length,
        volunteers: users.filter(u => u.role === 'Volunteer').length,
        donors: users.filter(u => u.role === 'Donor').length,
    };

    const statCards = [
        { label: 'Total Members', value: stats.total, icon: '👥', color: 'bg-brand-brown' },
        { label: 'Admins', value: stats.admins, icon: '🛡️', color: 'bg-brand-burgundy' },
        { label: 'Volunteers', value: stats.volunteers, icon: '🤝', color: 'bg-brand-orange' },
        { label: 'Donors', value: stats.donors, icon: '💝', color: 'bg-pink-600' },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="font-hand text-2xl text-brand-brown">Loading users...</p>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="font-marker text-5xl text-brand-brown mb-2">
                    User Management
                </h1>
                <p className="font-hand text-xl text-brand-brown/70">
                    View and manage all members of the Books & Trunks community.
                </p>
            </div>

            {error && (
                <div className="bg-red-100 border-2 border-red-400 text-red-800 px-4 py-3 rounded-lg font-hand mb-6">
                    {error}
                </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-brand-cream p-6 rounded-lg shadow-lg border-2 border-brand-brown/20"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-3xl">{stat.icon}</span>
                            <div className="font-marker text-3xl text-brand-brown">
                                {stat.value}
                            </div>
                        </div>
                        <div className="font-hand text-lg text-brand-brown/70">
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* Users Table */}
            <div className="bg-brand-cream rounded-lg shadow-lg border-2 border-brand-brown/20 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left font-hand">
                        <thead className="bg-brand-brown/10 border-b-2 border-brand-brown/20">
                            <tr>
                                <th className="px-6 py-4 text-xl text-brand-brown">Name</th>
                                <th className="px-6 py-4 text-xl text-brand-brown">Email</th>
                                <th className="px-6 py-4 text-xl text-brand-brown">Role</th>
                                <th className="px-6 py-4 text-xl text-brand-brown">Status</th>
                                <th className="px-6 py-4 text-xl text-brand-brown">Joined</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-brown/10">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-brand-brown/5 transition-colors">
                                    <td className="px-6 py-4 text-lg text-brand-brown font-bold">{user.name}</td>
                                    <td className="px-6 py-4 text-lg text-brand-brown">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${user.role === 'Admin' ? 'bg-brand-burgundy text-brand-cream' :
                                                user.role === 'Volunteer' ? 'bg-brand-orange text-brand-brown' :
                                                    'bg-pink-100 text-pink-700'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${user.subscriptionStatus === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {user.subscriptionStatus}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-lg text-brand-brown/70">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
