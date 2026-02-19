import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Doodle } from '../components/ui/Doodle';
import { useAuth } from '../contexts/AuthContext';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, isAdmin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const success = await login(email, password);
        setLoading(false);

        if (success) {
            // Redirect based on role
            if (isAdmin) {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } else {
            setError('Invalid email or password. Please try again.');
        }
    };

    return (
        <main className="min-h-screen w-full bg-texture-paper overflow-x-hidden selection:bg-brand-orange/30">
            <Navbar />

            <section className="pt-32 pb-16 px-4">
                <div className="max-w-md mx-auto">
                    <div className="text-center mb-8">
                        <div className="relative inline-block mb-6">
                            <h1 className="font-marker text-5xl md:text-6xl text-brand-brown relative z-10">
                                Login
                            </h1>
                            <div className="absolute -bottom-2 left-0 w-full h-6 bg-brand-orange/40 -rotate-1 z-0"></div>
                        </div>
                        <Doodle type="heart" className="w-12 h-12 mx-auto text-brand-burgundy" />
                    </div>

                    <div className="bg-brand-cream p-8 rounded-lg shadow-lg border-2 border-brand-brown/20">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="bg-red-100 border-2 border-red-400 text-red-800 px-4 py-3 rounded-lg font-hand">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label className="font-hand text-xl text-brand-brown block mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-brand-brown/30 focus:border-brand-burgundy focus:outline-none font-hand text-lg"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>

                            <div>
                                <label className="font-hand text-xl text-brand-brown block mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-brand-brown/30 focus:border-brand-burgundy focus:outline-none font-hand text-lg"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full font-hand text-2xl bg-brand-burgundy text-brand-cream px-6 py-4 rounded-lg shadow-lg hover:shadow-xl hover:bg-brand-brown transition-all transform hover:-rotate-1 disabled:opacity-50"
                            >
                                {loading ? 'Logging in...' : 'Login'}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="font-hand text-lg text-brand-brown mb-2">
                                Don't have an account?
                            </p>
                            <Link
                                to="/signup"
                                className="font-hand text-lg text-brand-burgundy hover:text-brand-brown transition-colors"
                            >
                                Sign up here →
                            </Link>
                        </div>

                        <div className="mt-4 text-center">
                            <Link
                                to="/"
                                className="font-hand text-lg text-brand-brown/70 hover:text-brand-brown transition-colors"
                            >
                                ← Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
