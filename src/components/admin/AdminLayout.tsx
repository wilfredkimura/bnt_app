
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Doodle } from '../ui/Doodle';
import { useAuth } from '../../contexts/AuthContext';

export function AdminLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navItems = [
        { name: 'Dashboard', path: '/admin', icon: '📊' },
        { name: 'Stories', path: '/admin/stories', icon: '📝' },
        { name: 'Gallery', path: '/admin/gallery', icon: '🖼️' },
        { name: 'Users', path: '/admin/users', icon: '👥' },
        { name: 'Requests', path: '/admin/requests', icon: '📩' },
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
            <aside className="w-64 bg-brand-burgundy text-brand-cream p-6 flex flex-col">
                <div className="mb-8">
                    <Link to="/" className="flex items-center gap-2">
                        <Doodle type="heart" className="w-8 h-8 text-brand-orange" />
                        <span className="font-marker text-2xl">Books & Trunks</span>
                    </Link>
                    <p className="font-hand text-sm opacity-80 mt-2">Admin Dashboard</p>
                </div>

                <nav className="flex-1 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-hand text-lg transition-all ${isActive(item.path)
                                ? 'bg-brand-orange text-brand-brown shadow-md'
                                : 'hover:bg-brand-brown/30'
                                }`}
                        >
                            <span>{item.icon}</span>
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className="mt-auto pt-6 border-t border-brand-cream/20">
                    <Link
                        to="/"
                        className="flex items-center gap-2 px-4 py-3 rounded-lg font-hand text-lg hover:bg-brand-brown/30 transition-all"
                    >
                        <span>🏠</span>
                        <span>Back to Site</span>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-3 rounded-lg font-hand text-lg hover:bg-brand-brown/30 transition-all mt-2"
                    >
                        <span>🚪</span>
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
}
