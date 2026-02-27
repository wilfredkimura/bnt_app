
import { Doodle } from '../components/ui/Doodle';

export function Impact() {
    const metrics = [
        { value: '5,000+', label: 'Books Distributed', icon: 'star' },
        { value: '2,500+', label: 'Children Reached', icon: 'heart' },
        { value: '50+', label: 'Schools Visited', icon: 'star' },
        { value: '15', label: 'Communities Served', icon: 'heart' },
    ];

    const milestones = [
        {
            year: '2024',
            month: 'October',
            title: 'Books & Trunks Founded',
            description: 'Our journey began with a simple mission: bring books to every child in Kenya.',
        },
        {
            year: '2024',
            month: 'November',
            title: 'First Trunk Delivered',
            description: 'We delivered our first trunk of 200 books to ShedALight Institute in Nairobi.',
        },
        {
            year: '2024',
            month: 'December',
            title: 'Reached 10 Schools',
            description: 'Expanded our reach to 10 schools across Nairobi, Kisumu, and Mombasa.',
        },
        {
            year: '2025',
            month: 'January',
            title: '5,000 Books Milestone',
            description: 'Celebrated distributing our 5,000th book, touching thousands of young lives.',
        },
    ];

    return (
        <main className="min-h-screen w-full bg-texture-paper overflow-x-hidden selection:bg-brand-orange/30">

            {/* Hero Section */}
            <section className="pt-32 pb-16 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="relative inline-block mb-6">
                        <h1 className="font-marker text-5xl md:text-7xl text-brand-brown relative z-10">
                            Our Impact
                        </h1>
                        <div className="absolute -bottom-2 left-0 w-full h-6 bg-brand-orange/40 -rotate-1 z-0"></div>
                    </div>
                    <p className="font-hand text-2xl md:text-3xl text-brand-brown max-w-3xl mx-auto">
                        Measuring the difference we're making, one book at a time
                    </p>
                </div>
            </section>

            {/* Impact Metrics */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {metrics.map((metric, index) => (
                            <div
                                key={index}
                                className="bg-brand-cream p-8 rounded-lg shadow-lg border-4 border-brand-brown transform hover:scale-105 transition-transform relative"
                                style={{ rotate: `${(index % 2 === 0 ? 1 : -1) * 2}deg` }}
                            >
                                <Doodle
                                    type={metric.icon as 'star' | 'heart'}
                                    className="w-12 h-12 mx-auto mb-4 text-brand-orange"
                                />
                                <div className="text-center">
                                    <div className="font-marker text-5xl text-brand-burgundy mb-2">
                                        {metric.value}
                                    </div>
                                    <div className="font-hand text-2xl text-brand-brown">
                                        {metric.label}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-16 px-4 bg-brand-orange/10">
                <div className="max-w-4xl mx-auto">
                    <h2 className="font-marker text-4xl md:text-5xl text-brand-brown text-center mb-12">
                        Our Journey
                    </h2>
                    <div className="space-y-8">
                        {milestones.map((milestone, index) => (
                            <div
                                key={index}
                                className="flex gap-6 items-start"
                            >
                                <div className="flex-shrink-0 w-24 text-right">
                                    <div className="font-marker text-3xl text-brand-burgundy">
                                        {milestone.month}
                                    </div>
                                    <div className="font-marker text-2xl text-brand-brown">
                                        {milestone.year}
                                    </div>
                                </div>
                                <div className="flex-shrink-0 w-4 h-4 bg-brand-orange rounded-full mt-2 relative">
                                    {index < milestones.length - 1 && (
                                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-0.5 h-24 bg-brand-brown/30"></div>
                                    )}
                                </div>
                                <div className="flex-1 bg-brand-cream p-6 rounded-lg shadow-md border-2 border-brand-brown/20">
                                    <h3 className="font-marker text-2xl text-brand-brown mb-2">
                                        {milestone.title}
                                    </h3>
                                    <p className="font-hand text-xl text-brand-brown/80">
                                        {milestone.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Impact Stories */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="font-marker text-4xl md:text-5xl text-brand-brown text-center mb-12">
                        Impact in Action
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-brand-cream p-6 rounded-lg shadow-lg border-2 border-brand-brown/20 transform rotate-1 hover:rotate-0 transition-transform">
                            <Doodle type="star" className="w-10 h-10 mb-4 text-brand-burgundy" />
                            <h3 className="font-marker text-2xl text-brand-brown mb-3">
                                Literacy Rates
                            </h3>
                            <p className="font-hand text-xl text-brand-brown">
                                Schools report a 40% increase in reading proficiency among students who access our book trunks regularly.
                            </p>
                        </div>
                        <div className="bg-brand-cream p-6 rounded-lg shadow-lg border-2 border-brand-brown/20 transform -rotate-1 hover:rotate-0 transition-transform">
                            <Doodle type="heart" className="w-10 h-10 mb-4 text-brand-burgundy" />
                            <h3 className="font-marker text-2xl text-brand-brown mb-3">
                                Community Engagement
                            </h3>
                            <p className="font-hand text-xl text-brand-brown">
                                Over 500 parents have joined reading programs, creating a culture of literacy at home.
                            </p>
                        </div>
                        <div className="bg-brand-cream p-6 rounded-lg shadow-lg border-2 border-brand-brown/20 transform rotate-1 hover:rotate-0 transition-transform">
                            <Doodle type="star" className="w-10 h-10 mb-4 text-brand-burgundy" />
                            <h3 className="font-marker text-2xl text-brand-brown mb-3">
                                Student Confidence
                            </h3>
                            <p className="font-hand text-xl text-brand-brown">
                                Teachers note increased confidence and participation in class discussions among students.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}
