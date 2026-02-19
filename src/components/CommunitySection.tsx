import React from 'react';
import { motion } from 'framer-motion';
import { Pin } from './ui/Pin';
import { Tape } from './ui/Tape';
const testimonials = [{
  text: "The book trunk brought stories we'd never seen before. Our children's eyes light up every reading day!",
  author: 'Teacher, Kangemi Resource Centre',
  color: 'bg-yellow-100',
  rotate: 'rotate-2'
}, {
  text: '400 practice books have transformed how our students learn. Thank you for believing in Doldol.',
  author: 'ShedALight Institute',
  color: 'bg-blue-100',
  rotate: '-rotate-1'
}, {
  text: '525 books created a sustainable library model for our church community. Literacy is now accessible to all.',
  author: 'PCEA Upendo Church, Rongai',
  color: 'bg-pink-100',
  rotate: 'rotate-3'
}];
export function CommunitySection() {
  return <section className="py-24 px-4 bg-texture-paper relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-marker text-4xl md:text-5xl text-brand-brown mb-4">
            Community Voices
          </h2>
          <div className="h-1 w-32 bg-brand-orange mx-auto rounded-full transform -rotate-1"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => <motion.div key={index} initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} whileHover={{
          y: -5,
          rotate: 0
        }} transition={{
          delay: index * 0.1
        }} viewport={{
          once: true
        }} className={`relative p-6 ${item.color} shadow-md ${item.rotate} min-h-[200px] flex flex-col justify-center`}>
              {/* Pin or Tape */}
              {index % 2 === 0 ? <Pin className="-top-3 left-1/2 -translate-x-1/2" /> : <Tape className="-top-4 left-1/2 -translate-x-1/2" />}

              <p className="font-hand text-2xl text-brand-brown leading-relaxed mb-4">
                "{item.text}"
              </p>
              <div className="mt-auto text-right">
                <span className="font-marker text-brand-burgundy text-lg">
                  - {item.author}
                </span>
              </div>
            </motion.div>)}
        </div>
      </div>
    </section>;
}