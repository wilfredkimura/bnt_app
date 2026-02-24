import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
    useUser
} from '@clerk/clerk-react';

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, isSignedIn } = useUser();

    // Check for admin role in metadata (if using Clerk roles) or fallback to name/email check
    const isAdmin = user?.publicMetadata?.role === 'Admin' ||
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
                                <UserButton afterSignOutUrl="/" />
                                <span className="font-hand text-lg text-brand-brown">
                                    👋 {user?.firstName || user?.username}
                                </span>
                            </div>
                        </SignedIn>

                        <SignedOut>
                            <div className="flex items-center gap-4">
                                <SignInButton mode="modal">
                                    <button className="font-hand text-lg text-brand-brown hover:text-brand-burgundy transition-colors">
                                        Login
                                    </button>
                                </SignInButton>
                                <Link
                                    to="/signup"
                                    className="font-hand text-lg bg-brand-burgundy text-brand-cream px-4 py-2 rounded-lg hover:bg-brand-brown transition-all"
                                >
                                    Sign Up
                                </Link>
                            </div>
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
                                    <UserButton afterSignOutUrl="/" />
                                    <p className="font-hand text-lg text-brand-brown">
                                        👋 {user?.firstName}
                                    </p>
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
                                        className="w-full font-hand text-lg text-center text-brand-brown hover:text-brand-burgundy transition-colors py-2"
                                    >
                                        Login
                                    </button>
                                </SignInButton>
                                <Link
                                    to="/signup"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block font-hand text-lg bg-brand-burgundy text-brand-cream px-4 py-2 rounded-lg hover:bg-brand-brown transition-all text-center"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        </SignedOut>
                    </div>
                </div>
            )}
        </nav>
    );
}
