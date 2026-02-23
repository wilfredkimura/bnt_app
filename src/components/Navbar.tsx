import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isAuthenticated, isAdmin, user, logout } = useAuth();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Stories', path: '/stories' },
        { name: 'Impact', path: '/impact' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Get Involved', path: '/get-involved' },
    ];

    const authenticatedLinks = [
        ...navLinks,
        { name: 'Requests', path: '/requests' },
    ];

    const currentLinks = isAuthenticated ? authenticatedLinks : navLinks;

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
    };

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
                        {isAuthenticated ? (
                            <>
                                {isAdmin && (
                                    <Link
                                        to="/admin"
                                        className="font-hand text-lg bg-brand-burgundy text-brand-cream px-4 py-2 rounded-lg hover:bg-brand-brown transition-all"
                                    >
                                        📊 Admin Dashboard
                                    </Link>
                                )}
                                <div className="flex items-center gap-3">
                                    <span className="font-hand text-lg text-brand-brown">
                                        👋 {user?.name}
                                    </span>
                                    <button
                                        onClick={handleLogout}
                                        className="font-hand text-lg bg-brand-brown text-brand-cream px-4 py-2 rounded-lg hover:bg-brand-burgundy transition-all"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="font-hand text-lg text-brand-brown hover:text-brand-burgundy transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="font-hand text-lg bg-brand-burgundy text-brand-cream px-4 py-2 rounded-lg hover:bg-brand-brown transition-all"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
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
                        {isAuthenticated ? (
                            <>
                                <div className="pt-3 border-t-2 border-brand-brown/10">
                                    <p className="font-hand text-lg text-brand-brown mb-3">
                                        👋 {user?.name}
                                    </p>
                                    {isAdmin && (
                                        <Link
                                            to="/admin"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="block font-hand text-lg bg-brand-burgundy text-brand-cream px-4 py-2 rounded-lg hover:bg-brand-brown transition-all text-center mb-2"
                                        >
                                            📊 Admin Dashboard
                                        </Link>
                                    )}
                                    <button
                                        onClick={handleLogout}
                                        className="w-full font-hand text-lg bg-brand-brown text-brand-cream px-4 py-2 rounded-lg hover:bg-brand-burgundy transition-all"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="pt-3 border-t-2 border-brand-brown/10 space-y-2">
                                <Link
                                    to="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block font-hand text-lg text-center text-brand-brown hover:text-brand-burgundy transition-colors py-2"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block font-hand text-lg bg-brand-burgundy text-brand-cream px-4 py-2 rounded-lg hover:bg-brand-brown transition-all text-center"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
