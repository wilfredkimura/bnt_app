import { motion } from 'framer-motion';

interface ImageCardProps {
  src: string;
  alt: string;
  caption?: string;
  location?: string;
  className?: string;
  delay?: number;
}

export function ImageCard({
  src,
  alt,
  caption,
  location,
  className = '',
  delay = 0
}: ImageCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 ${className}`}
    >
      {/* Image Area */}
      <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        {location && (
          <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
            📍 {location}
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-4 bg-white border-t border-gray-50 flex flex-col justify-between h-full">
        {caption ? (
          <p className="text-gray-800 font-hand text-xl leading-relaxed line-clamp-2">
            {caption}
          </p>
        ) : (
          <p className="text-gray-400 font-hand italic text-lg">
            No description provided.
          </p>
        )}
      </div>
    </motion.div>
  );
}
