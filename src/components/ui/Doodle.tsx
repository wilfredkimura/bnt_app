import React from 'react';
interface DoodleProps {
  type: 'star' | 'arrow' | 'heart' | 'squiggle' | 'circle' | 'underline';
  className?: string;
  color?: string;
}
export function Doodle({
  type,
  className = '',
  color = 'currentColor'
}: DoodleProps) {
  const strokeWidth = 2.5;
  const renderDoodle = () => {
    switch (type) {
      case 'star':
        return <svg viewBox="0 0 50 50" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <path d="M25 2L31 18L48 18L34 29L39 46L25 36L11 46L16 29L2 18L19 18L25 2Z" />
          </svg>;
      case 'arrow':
        return <svg viewBox="0 0 100 50" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 25C20 20 50 10 90 25M90 25L75 15M90 25L78 35" />
          </svg>;
      case 'heart':
        return <svg viewBox="0 0 50 50" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <path d="M25 45C25 45 5 30 5 15C5 8 12 2 18 2C22 2 25 6 25 6C25 6 28 2 32 2C38 2 45 8 45 15C45 30 25 45 25 45Z" />
          </svg>;
      case 'squiggle':
        return <svg viewBox="0 0 100 20" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 10C10 0 20 20 30 10C40 0 50 20 60 10C70 0 80 20 90 10" />
          </svg>;
      case 'circle':
        return <svg viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <path d="M50 5C25 5 5 25 5 50C5 75 25 95 50 95C75 95 95 75 95 50C95 25 75 5 50 5Z" strokeDasharray="10 5" />
          </svg>;
      case 'underline':
        return <svg viewBox="0 0 200 20" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 10C50 15 150 15 195 5" />
          </svg>;
    }
  };
  return <div className={`w-12 h-12 ${className}`}>{renderDoodle()}</div>;
}