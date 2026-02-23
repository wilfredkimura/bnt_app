
import { motion } from 'framer-motion';
import { Doodle } from './ui/Doodle';
import { Polaroid } from './ui/Polaroid';
export function HeroSection() {
  return <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-20 pb-32 md:pb-48 px-4">
    {/* Background Doodles */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <Doodle type="star" className="absolute top-20 left-[10%] text-brand-orange w-16 h-16 opacity-60 rotate-12" />
      <Doodle type="squiggle" className="absolute bottom-32 right-[15%] text-brand-green w-32 h-12 opacity-50 -rotate-6" />
      <Doodle type="arrow" className="absolute top-40 right-[20%] text-brand-burgundy w-24 h-24 opacity-70 rotate-45" />
      <Doodle type="circle" className="absolute bottom-20 left-[5%] text-brand-peach w-20 h-20 opacity-40" />
    </div>

    <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
      {/* Text Content */}
      <div className="text-center lg:text-left space-y-8">
        <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} className="relative inline-block">
          <h1 className="font-marker text-5xl md:text-7xl lg:text-8xl text-brand-brown leading-tight transform -rotate-2">
            Foster Literacy <br />
            <span className="text-brand-orange">Kwa Umoja</span>
          </h1>
          <Doodle type="underline" className="absolute -bottom-4 left-0 w-full text-brand-burgundy h-6" />
        </motion.div>

        <motion.p initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.4,
          duration: 0.8
        }} className="font-hand text-2xl md:text-3xl text-brand-brown/80 max-w-lg mx-auto lg:mx-0 leading-relaxed">
          Mapping literacy across Kenya. Transforming communities through
          books, one trunk at a time. From Doldol to Kangemi to Rongai.
        </motion.p>

        <motion.div initial={{
          opacity: 0,
          scale: 0.9
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          delay: 0.6
        }} className="pt-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <button className="group relative inline-block">
            <div className="absolute inset-0 bg-brand-brown rounded-lg transform rotate-2 group-hover:rotate-1 transition-transform"></div>
            <div className="relative bg-brand-orange text-white font-marker text-xl px-8 py-4 rounded-lg transform -rotate-1 group-hover:-rotate-2 transition-transform border-2 border-brand-brown hover:bg-brand-orange/90">
              Donate Now
            </div>
            <Doodle type="arrow" className="absolute -right-16 top-1/2 -translate-y-1/2 w-12 h-12 text-brand-brown transform rotate-12 hidden md:block" />
          </button>

          <button className="group relative inline-block">
            <div className="absolute inset-0 bg-brand-burgundy/20 rounded-lg transform -rotate-1 group-hover:-rotate-2 transition-transform"></div>
            <div className="relative bg-white text-brand-burgundy font-marker text-xl px-8 py-4 rounded-lg transform rotate-1 group-hover:rotate-2 transition-transform border-2 border-brand-burgundy hover:bg-brand-cream">
              Our Impact
            </div>
          </button>
        </motion.div>
      </div>

      {/* Hero Image Cluster */}
      <div className="relative h-[600px] md:h-[700px] w-full flex items-center justify-center">
        <div className="relative w-full h-full max-w-md mx-auto">
          <Polaroid src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Children reading together" caption="Kangemi Read Aloud" rotation={-6} attachment="pin" className="absolute top-4 left-4 z-10 w-64" delay={0.2} />
        </div>
      </div>
    </div>
  </section>;
}