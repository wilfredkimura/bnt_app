import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
    useUser,
    useAuth
} from '@clerk/clerk-react';

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, isSignedIn } = useUser();
    const { getToken } = useAuth();
    const syncChecked = useRef(false);
    const [dbRole, setDbRole] = useState<string | null>(null);

    // Auto-sync trigger & Role fetch: When user logs in, ensure they exist in Neon and get their role
    useEffect(() => {
        if (isSignedIn && !syncChecked.current) {
            const syncUser = async () => {
                try {
                    const token = await getToken();
                    // Ping the profile endpoint to both trigger sync AND get the latest role
                    const res = await fetch('/api/community/me', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });

                    if (res.ok) {
                        const profile = await res.json();
                        setDbRole(profile.role);
                        console.log('[Navbar] User profile loaded:', profile.role);
                        syncChecked.current = true;
                    } else if (res.status === 404) {
                        // If not found yet, maybe the background sync is still running?
                        // Hit health to force a sync if needed
                        await fetch('/api/health', {
                            headers: { 'Authorization': `Bearer ${token}` }
                        });
                    }
                } catch (err) {
                    console.error('[Navbar] Profile fetch fail:', err);
                }
            };
            syncUser();
        }
    }, [isSignedIn, getToken]);

    // Check for admin role - DB role takes priority, fallback to metadata/email for initial dev
    const isAdmin = dbRole === 'Admin' ||
        user?.publicMetadata?.role === 'Admin' ||
        user?.emailAddresses.some(e => e.emailAddress.includes('admin@booksandtrunks.org'));

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Stories', path: '/stories' },
        { name: 'Impact', path: '/impact' },
        { name: 'Members', path: '/members' },
        { name: 'Get Involved', path: '/get-involved' },
    ];

    const authenticatedLinks = [
        ...navLinks,
    ];

    const currentLinks = isSignedIn ? authenticatedLinks : navLinks;

    return (
        <nav className="fixed top-0 left-0 right-0 bg-brand-cream shadow-md z-50 border-b-2 border-brand-brown/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3">
                        <img
                            src="/images/logo.png"
                            alt="Books & Trunks"
                            className="h-12 w-auto"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        {currentLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="font-marker text-xl text-brand-brown hover:text-brand-burgundy transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* Conditional Auth Buttons */}
                        <SignedIn>
                            <Link
                                to="/requests"
                                className="font-marker text-lg text-brand-brown hover:text-brand-burgundy transition-colors"
                            >
                                📩 Requests
                            </Link>
                            <Link
                                to="/profile"
                                className="font-marker text-lg bg-brand-orange text-brand-cream px-4 py-2 rounded-lg hover:bg-brand-brown transition-all"
                            >
                                👤 My Profile
                            </Link>
                            {isAdmin && (
                                <Link
                                    to="/admin"
                                    className="font-marker text-lg bg-brand-burgundy text-brand-cream px-4 py-2 rounded-lg hover:bg-brand-brown transition-all"
                                >
                                    📊 Admin
                                </Link>
                            )}
                            <div className="flex items-center gap-3 ml-2">
                                <UserButton afterSignOutUrl="/" showName />
                            </div>
                        </SignedIn>

                        <SignedOut>
                            <SignInButton mode="modal">
                                <button className="font-marker text-xl bg-brand-burgundy text-brand-cream px-6 py-2 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300">
                                    Join Community
                                </button>
                            </SignInButton>
                        </SignedOut>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-brand-orange/20 transition-colors"
                    >
                        <svg
                            className="w-6 h-6 text-brand-brown"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {isMenuOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-brand-cream border-t-2 border-brand-brown/20">
                    <div className="px-4 py-4 space-y-3">
                        {currentLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                className="block font-hand text-xl text-brand-brown hover:text-brand-burgundy transition-colors py-2"
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* Mobile Auth Buttons */}
                        <SignedIn>
                            <div className="pt-3 border-t-2 border-brand-brown/10">
                                <div className="flex items-center gap-3 mb-4">
                                    <UserButton afterSignOutUrl="/" showName />
                                </div>
                                {isAdmin && (
                                    <Link
                                        to="/admin"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block font-hand text-lg bg-brand-burgundy text-brand-cream px-4 py-2 rounded-lg hover:bg-brand-brown transition-all text-center mb-2"
                                    >
                                        📊 Admin Dashboard
                                    </Link>
                                )}
                            </div>
                        </SignedIn>

                        <SignedOut>
                            <div className="pt-3 border-t-2 border-brand-brown/10 space-y-2">
                                <SignInButton mode="modal">
                                    <button
                                        onClick={() => setIsMenuOpen(false)}
                                        className="w-full font-marker text-xl bg-brand-burgundy text-brand-cream px-4 py-3 rounded-xl hover:bg-brand-brown transition-all"
                                    >
                                        Join Community
                                    </button>
                                </SignInButton>
                            </div>
                        </SignedOut>
                    </div>
                </div>
            )}
        </nav>
    );
}
