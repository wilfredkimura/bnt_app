
import { motion } from 'framer-motion';
import { Doodle } from '../components/ui/Doodle';

export function SocietyProfile() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    const sections = [
        {
            title: "Vision",
            content: "To be a leading catalyst in transforming communities through literacy, creating a generation of empowered readers and lifelong learners.",
            color: "bg-brand-orange/10",
            icon: <Doodle type="star" className="w-12 h-12 text-brand-orange mb-4" />
        },
        {
            title: "Mission",
            content: "The Books & Trunks Society is dedicated to promoting literacy, learning, and community engagement through innovative reading programs and educational initiatives that make quality literature accessible to children and communities across Kenya.",
            color: "bg-brand-burgundy/10",
            icon: <Doodle type="heart" className="w-12 h-12 text-brand-burgundy mb-4" />
        }
    ];

    const achievements = [
        {
            category: "Literacy Programs",
            items: [
                "Book Club Read Aloud Sessions: Regular sessions at Kangemi Resource Centre since February 2025 (2.5 sessions monthly).",
                "Book Club Days Out: 3 Innovative literacy excursions: Alliance Française, Nairobi & Friends of Creation HQ, Tigoni."
            ]
        },
        {
            category: "Book Distribution",
            items: [
                "ShedALight Institute, Doldol: 400 practice books for mathematics and literature.",
                "PCEA Upendo Church, Rongai: 325 CBE books and 200 storybooks in collaboration with KMUN."
            ]
        }
    ];

    const objectives = [
        "Direct Literacy Promotion - Promoting literacy through structured reading programs.",
        "Resource Distribution - Donating trunks filled with books to selected communities.",
        "Strategic Expansion - Expanding reach through local and international stakeholders.",
        "Infrastructure Development - Establishing libraries within community centers.",
        "Program Sustainability - Creating reading habits that build lifelong skills.",
        "Partnership Building - Strengthening community ties for educational impact."
    ];

    return (
        <main className="min-h-screen bg-brand-cream pt-24 pb-20 selection:bg-brand-orange/30">
            {/* Hero Section */}
            <section className="max-w-6xl mx-auto px-4 py-16 text-center">
                <motion.div {...fadeIn}>
                    <div className="relative inline-block mb-6">
                        <h1 className="font-marker text-5xl md:text-7xl text-brand-brown">
                            Profile: Foster Literacy Kwa Umoja
                        </h1>
                        <Doodle type="underline" className="absolute -bottom-4 left-0 w-full text-brand-orange h-6" />
                    </div>
                    <p className="font-hand text-3xl md:text-4xl text-brand-brown/80 mb-12">
                        The Books and Trunks Society Profile
                    </p>
                </motion.div>

                <motion.div 
                    {...fadeIn} 
                    className="bg-white p-8 md:p-12 rounded-3xl border-4 border-brand-brown/10 shadow-xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 transform rotate-12 -mr-16 -mt-16 rounded-full" />
                    <h2 className="font-marker text-4xl text-brand-brown mb-6 flex items-center justify-center gap-4">
                         About Us
                    </h2>
                    <p className="font-hand text-2xl text-brand-brown leading-relaxed max-w-4xl mx-auto">
                        The Books and Trunks Society (B&T) is a registered NGO established in October 2024 that began operations 
                        in February 2025. We are a non-political, non-profit organization dedicated to promoting literacy and 
                        education among communities across Kenya, with particular focus on rural and remote areas.
                    </p>
                </motion.div>
            </section>

            {/* Vision & Mission */}
            <section className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                {sections.map((section, idx) => (
                    <motion.div 
                        key={idx}
                        {...fadeIn}
                        transition={{ delay: idx * 0.2 }}
                        className={`${section.color} p-10 rounded-3xl border-2 border-brand-brown/5 relative`}
                    >
                        {section.icon}
                        <h3 className="font-marker text-3xl text-brand-brown mb-4">{section.title}</h3>
                        <p className="font-hand text-xl text-brand-brown/90 leading-relaxed">
                            {section.content}
                        </p>
                    </motion.div>
                ))}
            </section>

            {/* Our Approach */}
            <section className="max-w-4xl mx-auto px-4 py-16 text-center">
                <motion.div {...fadeIn}>
                    <h2 className="font-marker text-4xl text-brand-brown mb-8">Our Approach</h2>
                    <div className="relative">
                        <Doodle type="squiggle" className="absolute -top-8 -left-8 w-16 h-16 text-brand-burgundy/20 opacity-50" />
                        <p className="font-hand text-2xl text-brand-brown leading-relaxed italic">
                            "B&T operates through innovative reading programs and community-based initiatives, working 
                            collaboratively with local communities, educational institutions, and partners to establish 
                            libraries and creative literacy programs that are transformative for all."
                        </p>
                        <Doodle type="circle" className="absolute -bottom-8 -right-8 w-20 h-20 text-brand-orange/20 opacity-50" />
                    </div>
                </motion.div>
            </section>

            {/* 2025 Achievements */}
            <section className="max-w-6xl mx-auto px-4 py-20 bg-white/50 rounded-[3rem] border-4 border-dashed border-brand-brown/10">
                <motion.h2 {...fadeIn} className="font-marker text-5xl text-brand-brown text-center mb-16">
                    2025 Key Achievements
                </motion.h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {achievements.map((ach, idx) => (
                        <motion.div 
                            key={idx}
                            {...fadeIn}
                            className="bg-white p-8 rounded-2xl shadow-md border-b-8 border-brand-orange"
                        >
                            <h4 className="font-marker text-2xl text-brand-burgundy mb-6 flex items-center gap-3">
                                {idx === 0 ? '📚' : '🚚'} {ach.category}
                            </h4>
                            <ul className="space-y-4">
                                {ach.items.map((item, i) => (
                                    <li key={i} className="flex gap-4 items-start">
                                        <span className="text-brand-orange mt-1">•</span>
                                        <span className="font-hand text-xl text-brand-brown leading-snug">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Sub-sections: TLX, Mtoto News, Raregeneticz */}
                <div className="mt-16 space-y-12">
                    <motion.div {...fadeIn} className="bg-brand-brown text-brand-cream p-10 rounded-3xl relative overflow-hidden">
                        <h4 className="font-marker text-3xl mb-6">Taifa Teule Leadership Experience (TLX)</h4>
                        <p className="font-hand text-xl mb-6 leading-relaxed opacity-90">
                            Executed "Paint Their Dream Stories" at Kangemi Resource Centre, transforming the library with painting and book organization. Graduated with strengthened skills in fundraising and project management.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <span className="bg-brand-burgundy px-4 py-1 rounded-full text-sm font-marker">Fundraising</span>
                            <span className="bg-brand-burgundy px-4 py-1 rounded-full text-sm font-marker">Project Management</span>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div {...fadeIn} className="bg-white p-8 rounded-3xl border-2 border-brand-burgundy/20">
                            <h4 className="font-marker text-2xl text-brand-burgundy mb-4">Mtoto News Creativity Festival</h4>
                            <p className="font-hand text-lg text-brand-brown/80 mb-4">
                                Chaperoned 22 kids for masterclasses in podcasting, content creation, and digital journalism. Integrated traditional literacy with digital expression.
                            </p>
                            <div className="h-1 w-20 bg-brand-orange rounded-full" />
                        </motion.div>
                        <motion.div {...fadeIn} className="bg-white p-8 rounded-3xl border-2 border-brand-orange/20">
                            <h4 className="font-marker text-2xl text-brand-orange mb-4">Raregeneticz Kenya Tour 2025</h4>
                            <p className="font-hand text-lg text-brand-brown/80 mb-4">
                                Collaborated to sensitize the public on Sickle Cell disease through literature distribution, combining fashion with health advocacy.
                            </p>
                            <div className="h-1 w-20 bg-brand-burgundy rounded-full" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Strategic Partnerships */}
            <section className="max-w-6xl mx-auto px-4 py-20 text-center">
                <motion.h2 {...fadeIn} className="font-marker text-4xl text-brand-brown mb-12">Strategic Partnerships</motion.h2>
                <div className="flex flex-wrap justify-center gap-6">
                    {["Kenya Model United Nations", "Kangemi Resource Centre", "PCEA Upendo Church", "Taifa Teule Network", "Mtoto News International"].map((partner, i) => (
                        <motion.div 
                            key={i}
                            {...fadeIn}
                            transition={{ delay: i * 0.1 }}
                            className="px-8 py-3 bg-brand-cream border-2 border-brand-brown/10 rounded-full font-marker text-lg text-brand-brown hover:bg-brand-orange/10 hover:border-brand-orange/40 transition-colors cursor-default"
                        >
                            {partner}
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Specific Objectives */}
            <section className="max-w-6xl mx-auto px-4 py-20">
                <motion.h2 {...fadeIn} className="font-marker text-5xl text-brand-brown text-center mb-16">Specific Objectives</motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {objectives.map((obj, i) => (
                        <motion.div 
                            key={i}
                            {...fadeIn}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-6 rounded-2xl border-l-8 border-brand-burgundy shadow-lg hover:-translate-y-2 transition-transform"
                        >
                            <span className="font-marker text- brand-burgundy text-4xl opacity-20 block mb-2">{i + 1}</span>
                            <p className="font-hand text-xl text-brand-brown">{obj}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 2026 Roadmap */}
            <section className="max-w-4xl mx-auto px-4 py-24 bg-brand-orange text-brand-cream rounded-t-[4rem]">
                <div className="text-center">
                    <h2 className="font-marker text-5xl mb-12 flex items-center justify-center gap-4">
                        <Doodle type="star" className="w-10 h-10" />
                        Looking Ahead: 2026
                    </h2>
                    <ul className="space-y-6 text-left max-w-2xl mx-auto">
                        {[
                            "Expand Book Club Days Out to five diverse venues",
                            "Replicate PCEA Rongai sustainable library model",
                            "Deepen partnerships with educational resource centers",
                            "Integrate traditional literacy with digital initiatives",
                            "Scale operations to more underserved communities",
                            "Leverage TLX training for organizational capacity"
                        ].map((plan, i) => (
                            <motion.li 
                                key={i}
                                {...fadeIn}
                                className="flex gap-4 items-center bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20"
                            >
                                <span className="text-2xl">📝</span>
                                <span className="font-hand text-2xl">{plan}</span>
                            </motion.li>
                        ))}
                    </ul>
                </div>

                <div className="mt-24 pt-12 border-t border-white/20 text-center">
                    <h3 className="font-marker text-4xl mb-6">Partner With Us</h3>
                    <p className="font-hand text-2xl mb-12 max-w-2xl mx-auto">
                        Together, we can create a generation of empowered readers and lifelong learners.
                    </p>
                    <div className="flex flex-col md:flex-row justify-center gap-8 items-center">
                        <div className="space-y-2">
                            <p className="font-marker text-lg opacity-80 uppercase tracking-widest">Instagram</p>
                            <a href="#" className="font-hand text-3xl hover:text-white transition-colors">@books_n_trunks_</a>
                        </div>
                        <div className="space-y-2">
                            <p className="font-marker text-lg opacity-80 uppercase tracking-widest">TikTok</p>
                            <a href="#" className="font-hand text-3xl hover:text-white transition-colors">@books_n_trunks_</a>
                        </div>
                    </div>
                    <p className="mt-16 font-marker text-xl opacity-60">
                        Foster Literacy Kwa Umoja - Promoting Literacy Together
                    </p>
                </div>
            </section>
        </main>
    );
}
