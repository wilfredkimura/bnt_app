import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDashboardStats } from '../../lib/api';

export function AdminDashboard() {
    const [stats, setStats] = useState({
        totalStories: 0,
        publishedStories: 0,
        galleryCount: 0,
        activeUsers: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const data = await getDashboardStats();
            setStats({
                totalStories: data.totalStories,
                publishedStories: data.publishedStories,
                galleryCount: data.galleryCount,
                activeUsers: data.activeUsers,
            });
        } catch (error) {
            console.error('Failed to load stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        { label: 'Total Stories', value: stats.totalStories.toString(), icon: '📝', color: 'bg-brand-orange' },
        { label: 'Gallery Images', value: stats.galleryCount.toString(), icon: '🖼️', color: 'bg-brand-burgundy' },
        { label: 'Active Users', value: stats.activeUsers.toString(), icon: '👥', color: 'bg-brand-brown' },
        { label: 'Published Posts', value: stats.publishedStories.toString(), icon: '✅', color: 'bg-green-600' },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="font-hand text-2xl text-brand-brown">Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="font-marker text-3xl md:text-5xl text-brand-brown mb-2">
                    Admin Dashboard
                </h1>
                <p className="font-hand text-lg md:text-xl text-brand-brown/70">
                    Welcome back! Here's what's happening with Books & Trunks.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-brand-cream p-6 rounded-lg shadow-lg border-2 border-brand-brown/20 transform hover:scale-105 transition-transform"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-4xl">{stat.icon}</span>
                        </div>
                        <div className="font-marker text-4xl text-brand-brown mb-2">
                            {stat.value}
                        </div>
                        <div className="font-hand text-lg text-brand-brown/70">
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-brand-cream p-6 rounded-lg shadow-lg border-2 border-brand-brown/20 mb-8">
                <h2 className="font-marker text-3xl text-brand-brown mb-4">
                    Quick Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link
                        to="/admin/stories/new"
                        className="font-hand text-xl bg-brand-burgundy text-brand-cream px-6 py-4 rounded-lg shadow-md hover:shadow-xl hover:bg-brand-brown transition-all text-center"
                    >
                        ✍️ Create New Story
                    </Link>
                    <Link
                        to="/admin/gallery"
                        className="font-hand text-xl bg-brand-orange text-brand-brown px-6 py-4 rounded-lg shadow-md hover:shadow-xl hover:bg-brand-burgundy hover:text-brand-cream transition-all text-center"
                    >
                        📸 Upload Images
                    </Link>
                    <Link
                        to="/admin/users"
                        className="font-hand text-xl bg-brand-brown text-brand-cream px-6 py-4 rounded-lg shadow-md hover:shadow-xl hover:bg-brand-burgundy transition-all text-center"
                    >
                        👥 Manage Users
                    </Link>
                </div>
            </div>

            {/* Info Card */}
            <div className="bg-brand-cream p-6 rounded-lg shadow-lg border-2 border-brand-brown/20">
                <h2 className="font-marker text-3xl text-brand-brown mb-4">
                    Getting Started
                </h2>
                <div className="space-y-3">
                    <p className="font-hand text-lg text-brand-brown">
                        📝 Create your first story to share community impact
                    </p>
                    <p className="font-hand text-lg text-brand-brown">
                        🖼️ Upload gallery images to showcase your work
                    </p>
                    <p className="font-hand text-lg text-brand-brown">
                        ✅ Publish stories to make them visible on the website
                    </p>
                </div>
            </div>
        </div>
    );
}
