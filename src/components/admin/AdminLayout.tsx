import { Link, Outlet, useLocation } from 'react-router-dom';
import { Doodle } from '../ui/Doodle';
import { UserButton, useUser } from '@clerk/clerk-react';

export function AdminLayout() {
    const location = useLocation();
    const { user } = useUser();

    const navItems = [
        { name: 'Dashboard', path: '/admin', icon: '📊' },
        { name: 'Stories', path: '/admin/stories', icon: '📝' },
        { name: 'Gallery', path: '/admin/gallery', icon: '🖼️' },
        { name: 'Users', path: '/admin/users', icon: '👥' },
        { name: 'Requests', path: '/admin/requests', icon: '📩' },
        { name: 'Community', path: '/admin/community', icon: '🤝' },
    ];

    const isActive = (path: string) => {
        if (path === '/admin') {
            return location.pathname === '/admin';
        }
        return location.pathname.startsWith(path);
    };

    return (
        <div className="min-h-screen bg-texture-paper flex">
            {/* Sidebar */}
            <aside className="w-64 bg-brand-burgundy text-brand-cream p-6 flex flex-col shadow-2xl relative z-20">
                <div className="mb-8 p-2 border-2 border-brand-cream/20 rounded-xl bg-brand-cream/5">
                    <Link to="/" className="flex items-center gap-2">
                        <Doodle type="heart" className="w-8 h-8 text-brand-orange" />
                        <span className="font-marker text-2xl tracking-tight">BNT Society</span>
                    </Link>
                    <div className="flex items-center gap-2 mt-3 p-2 bg-brand-cream/10 rounded-lg">
                        <UserButton afterSignOutUrl="/" />
                        <div className="overflow-hidden">
                            <p className="font-hand text-sm font-bold truncate">{user?.fullName || 'Admin'}</p>
                            <p className="text-[10px] opacity-60 uppercase tracking-widest font-marker">Panel Access</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-hand text-lg transition-all ${isActive(item.path)
                                ? 'bg-brand-orange text-brand-brown shadow-[4px_4px_0px_#4A3728] scale-105'
                                : 'hover:bg-brand-cream/10'
                                }`}
                        >
                            <span className="text-xl">{item.icon}</span>
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className="mt-auto pt-6 border-t border-brand-cream/20 flex flex-col gap-2">
                    <Link
                        to="/"
                        className="flex items-center gap-2 px-4 py-3 rounded-lg font-hand text-lg hover:bg-brand-cream/10 transition-all text-brand-orange font-bold underline underline-offset-4"
                    >
                        <span>🏠</span>
                        <span>Back to Public Site</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-auto h-screen">
                <div className="max-w-6xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
