import React from 'react';
interface TapeProps {
  className?: string;
  variant?: 'top' | 'corner-tl' | 'corner-tr' | 'corner-bl' | 'corner-br';
}
export function Tape({
  className = '',
  variant = 'top'
}: TapeProps) {
  const getRotation = () => {
    switch (variant) {
      case 'corner-tl':
        return '-rotate-45 -translate-x-4 -translate-y-2';
      case 'corner-tr':
        return 'rotate-45 translate-x-4 -translate-y-2';
      case 'corner-bl':
        return 'rotate-45 -translate-x-4 translate-y-2';
      case 'corner-br':
        return '-rotate-45 translate-x-4 translate-y-2';
      default:
        return '-rotate-1';
    }
  };
  return <div className={`absolute z-20 h-8 w-24 bg-white/40 backdrop-blur-[1px] shadow-sm border-l border-r border-white/20 ${getRotation()} ${className}`} style={{
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
    maskImage: "url(\"data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='100%25' height='100%25' fill='black'/%3E%3C/svg%3E\")",
    WebkitMaskImage: "url(\"data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='100%25' height='100%25' fill='black'/%3E%3C/svg%3E\")"
  }}>
      {/* Texture overlay for tape */}
      <div className="absolute inset-0 opacity-20 bg-yellow-100 mix-blend-multiply"></div>
    </div>;
}