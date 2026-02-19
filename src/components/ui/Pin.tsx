import React from 'react';
interface PinProps {
  color?: string;
  className?: string;
}
export function Pin({
  color = '#E07A5F',
  className = ''
}: PinProps) {
  return <div className={`absolute z-20 flex flex-col items-center justify-center drop-shadow-md ${className}`}>
      {/* Pin Head */}
      <div className="w-4 h-4 rounded-full shadow-inner relative z-10" style={{
      backgroundColor: color,
      boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.2), inset 2px 2px 4px rgba(255,255,255,0.4)'
    }}>
        {/* Highlight */}
        <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white rounded-full opacity-40"></div>
      </div>
      {/* Pin Shadow/Hole */}
      <div className="w-1.5 h-1.5 bg-black/30 rounded-full -mt-1 blur-[1px]"></div>
    </div>;
}