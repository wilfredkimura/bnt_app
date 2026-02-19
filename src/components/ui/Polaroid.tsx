
import { motion } from 'framer-motion';
import { Tape } from './Tape';
import { Pin } from './Pin';
interface PolaroidProps {
  src: string;
  alt: string;
  caption?: string;
  rotation?: number;
  attachment?: 'tape' | 'pin' | 'none';
  className?: string;
  delay?: number;
}
export function Polaroid({
  src,
  alt,
  caption,
  rotation = 0,
  attachment = 'tape',
  className = '',
  delay = 0
}: PolaroidProps) {
  return <motion.div initial={{
    opacity: 0,
    scale: 0.9,
    rotate: rotation
  }} whileInView={{
    opacity: 1,
    scale: 1,
    rotate: rotation
  }} whileHover={{
    scale: 1.05,
    rotate: rotation + (Math.random() > 0.5 ? 2 : -2),
    zIndex: 10
  }} transition={{
    duration: 0.5,
    delay,
    type: 'spring',
    stiffness: 200,
    damping: 15
  }} viewport={{
    once: true
  }} className={`relative bg-white p-3 pb-12 shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full max-w-[280px] mx-auto ${className}`} style={{
    transformOrigin: 'center center'
  }}>
    {/* Attachment */}
    {attachment === 'tape' && <Tape className="-top-3 left-1/2 -translate-x-1/2" />}
    {attachment === 'pin' && <Pin className="-top-2 left-1/2 -translate-x-1/2" />}

    {/* Photo Area */}
    <div className="aspect-[4/5] w-full overflow-hidden bg-gray-100 mb-3 filter sepia-[0.1] contrast-[1.05]">
      <img src={src} alt={alt} className="w-full h-full object-cover" />
      {/* Inner shadow/vignette for realism */}
      <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] pointer-events-none"></div>
    </div>

    {/* Caption */}
    {caption && <div className="absolute bottom-3 left-0 right-0 text-center px-2">
      <p className="font-hand text-xl text-gray-800 leading-tight transform -rotate-1">
        {caption}
      </p>
    </div>}
  </motion.div>;
}