import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Doodle } from '../ui/Doodle';
import { UserButton, useUser } from '@clerk/clerk-react';

export function AdminLayout() {
    const location = useLocation();
    const { user } = useUser();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { name: 'Dashboard', path: '/admin', icon: '📊' },
        { name: 'Stories', path: '/admin/stories', icon: '📝' },
        { name: 'Gallery', path: '/admin/gallery', icon: '🖼️' },
        { name: 'Events', path: '/admin/events', icon: '📅' },
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

    const NavContent = () => (
        <>
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
                        onClick={() => setIsMobileMenuOpen(false)}
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
        </>
    );

    return (
        <div className="min-h-screen bg-texture-paper flex flex-col md:flex-row">
            {/* Mobile Header */}
            <header className="md:hidden bg-brand-burgundy text-brand-cream px-4 py-4 flex items-center justify-between shadow-lg sticky top-0 z-50">
                <Link to="/admin" className="flex items-center gap-2">
                    <Doodle type="heart" className="w-6 h-6 text-brand-orange" />
                    <span className="font-marker text-xl">BNT Admin</span>
                </Link>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 hover:bg-brand-cream/10 rounded-lg transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isMobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </header>

            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 bg-brand-burgundy text-brand-cream p-6 flex-col shadow-2xl relative z-20 h-screen sticky top-0">
                <NavContent />
            </aside>

            {/* Mobile Drawer Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    <div
                        className="absolute inset-0 bg-brand-brown/60 backdrop-blur-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                    <aside className="absolute inset-y-0 left-0 w-64 bg-brand-burgundy text-brand-cream p-6 flex flex-col shadow-2xl animate-in slide-in-from-left duration-300">
                        <NavContent />
                    </aside>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-8 overflow-auto min-h-screen">
                <div className="max-w-6xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
