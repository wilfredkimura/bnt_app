import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Doodle } from '../components/ui/Doodle';

export function SubmitRequest() {
    const { user } = useUser();
    const [type, setType] = useState<'Petition' | 'Custom'>('Custom');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setIsSubmitting(true);
        setStatus(null);

        try {
            const response = await fetch('/api/requests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.id, // Clerk's user ID
                    type,
                    subject,
                    message
                }),
            });

            if (response.ok) {
                setStatus({ type: 'success', message: 'Your request has been submitted successfully!' });
                setSubject('');
                setMessage('');
            } else {
                const data = await response.json();
                setStatus({ type: 'error', message: data.error || 'Failed to submit request' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'An unexpected error occurred. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="max-w-4xl mx-auto py-12 px-4">
            <div className="text-center mb-12">
                <div className="inline-block relative">
                    <h1 className="font-marker text-4xl md:text-5xl text-brand-brown transform -rotate-1">
                        Submit a Request
                    </h1>
                    <Doodle type="underline" className="absolute -bottom-2 left-0 w-full text-brand-orange h-4" />
                </div>
                <p className="font-hand text-2xl text-brand-brown/70 mt-4">
                    Have a petition or a custom request for Books & Trunks? Let us know!
                </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl border-4 border-brand-brown transform rotate-1 relative">
                <Doodle type="star" className="absolute -top-6 -left-6 w-12 h-12 text-brand-orange" />

                {status && (
                    <div className={`mb-6 p-4 rounded-lg border-2 ${status.type === 'success' ? 'bg-green-50 border-green-500 text-green-700' : 'bg-red-50 border-red-500 text-red-700'} font-hand text-xl`}>
                        {status.message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block font-marker text-xl text-brand-brown mb-2">Request Type</label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="radio"
                                    value="Custom"
                                    checked={type === 'Custom'}
                                    onChange={() => setType('Custom')}
                                    className="w-5 h-5 accent-brand-orange"
                                />
                                <span className="font-hand text-2xl group-hover:text-brand-orange transition-colors">Custom Request</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="radio"
                                    value="Petition"
                                    checked={type === 'Petition'}
                                    onChange={() => setType('Petition')}
                                    className="w-5 h-5 accent-brand-burgundy"
                                />
                                <span className="font-hand text-2xl group-hover:text-brand-burgundy transition-colors">Petition</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="subject" className="block font-marker text-xl text-brand-brown mb-2">Subject</label>
                        <input
                            id="subject"
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full p-4 border-2 border-brand-brown/20 rounded-xl focus:border-brand-burgundy outline-none font-hand text-2xl bg-brand-cream/10"
                            placeholder="What is this about?"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block font-marker text-xl text-brand-brown mb-2">Message</label>
                        <textarea
                            id="message"
                            rows={6}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full p-4 border-2 border-brand-brown/20 rounded-xl focus:border-brand-burgundy outline-none font-hand text-2xl bg-brand-cream/10 md:resize-y"
                            placeholder="Describe your request in detail..."
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full bg-brand-orange text-white font-marker text-2xl py-4 rounded-xl border-4 border-brand-brown shadow-[4px_4px_0px_#4A3728] active:translate-y-1 active:shadow-none transition-all disabled:opacity-50`}
                    >
                        {isSubmitting ? 'Submitting...' : 'Send Request'}
                    </button>
                </form>
            </div>
        </main>
    );
}
