
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Doodle } from '../components/ui/Doodle';

export function GetInvolved() {
    const opportunities = [
        {
            title: 'Volunteer',
            description: 'Join our team of passionate volunteers helping to distribute books and organize reading sessions.',
            icon: 'heart',
            cta: 'Apply to Volunteer',
        },
        {
            title: 'Donate Books',
            description: 'Have books to share? We accept new and gently used books suitable for children and young adults.',
            icon: 'star',
            cta: 'Donate Books',
        },
        {
            title: 'Financial Support',
            description: 'Your donations help us purchase books, maintain trunks, and expand our reach across Kenya.',
            icon: 'heart',
            cta: 'Make a Donation',
        },
        {
            title: 'Partner with Us',
            description: 'Schools, organizations, and businesses can partner with us to bring literacy to more communities.',
            icon: 'star',
            cta: 'Become a Partner',
        },
    ];

    return (
        <main className="min-h-screen w-full bg-texture-paper overflow-x-hidden selection:bg-brand-orange/30">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-16 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="relative inline-block mb-6">
                        <h1 className="font-marker text-5xl md:text-7xl text-brand-brown relative z-10">
                            Get Involved
                        </h1>
                        <div className="absolute -bottom-2 left-0 w-full h-6 bg-brand-orange/40 -rotate-1 z-0"></div>
                    </div>
                    <p className="font-hand text-2xl md:text-3xl text-brand-brown max-w-3xl mx-auto">
                        Join us in our mission to bring books to every child in Kenya
                    </p>
                    <Doodle type="star" className="w-16 h-16 mx-auto mt-6 text-brand-burgundy" />
                </div>
            </section>

            {/* Opportunities Grid */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {opportunities.map((opportunity, index) => (
                            <div
                                key={index}
                                className="bg-brand-cream p-8 rounded-lg shadow-lg border-4 border-brand-brown transform hover:scale-105 transition-all"
                                style={{ rotate: `${(index % 2 === 0 ? 1 : -1) * 1.5}deg` }}
                            >
                                <Doodle
                                    type={opportunity.icon as 'star' | 'heart'}
                                    className="w-12 h-12 mb-4 text-brand-orange"
                                />
                                <h3 className="font-marker text-3xl text-brand-brown mb-4">
                                    {opportunity.title}
                                </h3>
                                <p className="font-hand text-xl text-brand-brown mb-6">
                                    {opportunity.description}
                                </p>
                                <button className="font-hand text-xl bg-brand-burgundy text-brand-cream px-6 py-3 rounded-lg shadow-md hover:shadow-xl hover:bg-brand-brown transition-all w-full">
                                    {opportunity.cta}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="py-16 px-4 bg-brand-orange/10">
                <div className="max-w-3xl mx-auto">
                    <h2 className="font-marker text-4xl md:text-5xl text-brand-brown text-center mb-8">
                        Get in Touch
                    </h2>
                    <div className="bg-brand-cream p-8 rounded-lg shadow-lg border-2 border-brand-brown/20">
                        <form className="space-y-6">
                            <div>
                                <label className="font-hand text-xl text-brand-brown block mb-2">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-lg border-2 border-brand-brown/30 focus:border-brand-burgundy focus:outline-none font-hand text-lg"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="font-hand text-xl text-brand-brown block mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-3 rounded-lg border-2 border-brand-brown/30 focus:border-brand-burgundy focus:outline-none font-hand text-lg"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label className="font-hand text-xl text-brand-brown block mb-2">
                                    How would you like to help?
                                </label>
                                <select className="w-full px-4 py-3 rounded-lg border-2 border-brand-brown/30 focus:border-brand-burgundy focus:outline-none font-hand text-lg">
                                    <option>Volunteer</option>
                                    <option>Donate Books</option>
                                    <option>Financial Support</option>
                                    <option>Partnership</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="font-hand text-xl text-brand-brown block mb-2">
                                    Message
                                </label>
                                <textarea
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-brand-brown/30 focus:border-brand-burgundy focus:outline-none font-hand text-lg resize-none"
                                    placeholder="Tell us more about how you'd like to get involved..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="font-hand text-2xl bg-brand-burgundy text-brand-cream px-8 py-4 rounded-lg shadow-lg hover:shadow-xl hover:bg-brand-brown transition-all w-full transform hover:-rotate-1"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Contact Info */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-marker text-4xl text-brand-brown mb-8">
                        Other Ways to Reach Us
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-brand-cream p-6 rounded-lg shadow-md border-2 border-brand-brown/20">
                            <Doodle type="heart" className="w-10 h-10 mx-auto mb-3 text-brand-burgundy" />
                            <h3 className="font-marker text-2xl text-brand-brown mb-2">Email</h3>
                            <p className="font-hand text-lg text-brand-brown">
                                admin@booksntrunks.org
                            </p>
                        </div>
                        <div className="bg-brand-cream p-6 rounded-lg shadow-md border-2 border-brand-brown/20">
                            <Doodle type="star" className="w-10 h-10 mx-auto mb-3 text-brand-burgundy" />
                            <h3 className="font-marker text-2xl text-brand-brown mb-2">Phone</h3>
                            <p className="font-hand text-lg text-brand-brown">
                                +254 705 956 111
                            </p>
                        </div>
                        <div className="bg-brand-cream p-6 rounded-lg shadow-md border-2 border-brand-brown/20">
                            <Doodle type="heart" className="w-10 h-10 mx-auto mb-3 text-brand-burgundy" />
                            <h3 className="font-marker text-2xl text-brand-brown mb-2">Address</h3>
                            <p className="font-hand text-lg text-brand-brown">
                                P.O. Box 20380-00200<br />Nairobi, Kenya
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
