
import { motion } from 'framer-motion';
import { Doodle } from './ui/Doodle';
const stats = [{
  number: '15',
  label: 'Book Trunks Delivered',
  color: 'bg-brand-orange',
  rotate: '-rotate-2'
}, {
  number: '925+',
  label: 'Books Donated',
  color: 'bg-brand-green',
  rotate: 'rotate-3'
}, {
  number: '3',
  label: 'Communities Served',
  color: 'bg-brand-peach',
  rotate: '-rotate-1'
}];
export function ImpactSection() {
  return <section className="py-20 px-4 bg-brand-cream relative">
    <div className="max-w-6xl mx-auto">
      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className="font-marker text-4xl md:text-5xl text-brand-brown mb-4">
          Our Reach So Far
        </h2>
        <p className="font-hand text-2xl text-brand-brown/70">
          Doldol • Kangemi • Ongata Rongai
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {stats.map((stat, index) => <motion.div key={index} initial={{
          opacity: 0,
          scale: 0.8
        }} whileInView={{
          opacity: 1,
          scale: 1
        }} transition={{
          delay: index * 0.2,
          type: 'spring'
        }} viewport={{
          once: true
        }} className="flex flex-col items-center">
          <div className={`relative group ${stat.rotate}`}>
            {/* Badge Shape */}
            <div className={`w-48 h-48 ${stat.color} rounded-full flex items-center justify-center relative shadow-lg border-4 border-white transform transition-transform group-hover:scale-110`}>
              <div className="text-center">
                <span className="block font-marker text-5xl text-white mb-1">
                  {stat.number}
                </span>
                <Doodle type="star" className="w-6 h-6 mx-auto text-white mb-1" />
              </div>

              {/* Dashed border effect */}
              <div className="absolute inset-2 border-2 border-dashed border-white/50 rounded-full"></div>
            </div>

            {/* Label Tape */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-4 py-2 shadow-md transform -rotate-2 min-w-[180px] text-center">
              <span className="font-hand text-2xl text-brand-brown font-bold">
                {stat.label}
              </span>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-white/30 backdrop-blur-sm rotate-1"></div>
            </div>
          </div>
        </motion.div>)}
      </div>

      {/* Partner Logos Section */}
      <div className="mt-20 text-center">
        <h3 className="font-marker text-2xl text-brand-brown mb-8">
          Featuring with other institutions
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
          <div className="font-hand text-xl text-brand-brown">
            Kenya Model United Nations
          </div>
          <div className="font-hand text-xl text-brand-brown">Mtoto News</div>
          <div className="font-hand text-xl text-brand-brown">DuraCoat</div>
          <div className="font-hand text-xl text-brand-brown">
            ShedALight Institute
          </div>
        </div>
      </div>
    </div>
  </section>;
}