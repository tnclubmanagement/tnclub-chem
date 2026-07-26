import React from 'react';
import type { Chemical } from '../../data/chemicals';

interface FlaskIconProps {
  chemical: Chemical;
  size?: number;
}

export const FlaskIcon: React.FC<FlaskIconProps> = ({ chemical, size = 52 }) => {
  const { colorHex, state } = chemical;

  return (
    <svg width={size} height={size} viewBox="0 0 50 60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Flask clip path for filling liquid/solid */}
        <clipPath id={`flask-clip-${chemical.id}`}>
          <path d="M 20 5 L 20 20 L 6 48 A 4 4 0 0 0 9 54 L 41 54 A 4 4 0 0 0 44 48 L 30 20 L 30 5 Z" />
        </clipPath>
      </defs>

      {/* Flask Outline (Glass) */}
      <path 
        d="M 18 5 L 32 5 M 20 5 L 20 20 L 6 48 A 4 4 0 0 0 9 54 L 41 54 A 4 4 0 0 0 44 48 L 30 20 L 30 5 Z" 
        fill="rgba(255, 255, 255, 0.4)" 
        stroke="#cbd5e1" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />

      {/* Chemical Fill */}
      {state === 'aqueous' || state === 'liquid' ? (
        <g clipPath={`url(#flask-clip-${chemical.id})`}>
          {/* Liquid level */}
          <rect x="0" y="28" width="50" height="30" fill={colorHex} opacity={0.85} />
          {/* Liquid surface wave (simple styling) */}
          <ellipse cx="25" cy="28" rx="13" ry="3" fill={colorHex} opacity={1} />
        </g>
      ) : (
        <g clipPath={`url(#flask-clip-${chemical.id})`}>
          {/* Solid/Powder pile at the bottom */}
          <path d="M 5 55 L 15 45 L 25 48 L 35 42 L 45 55 Z" fill={colorHex} opacity={0.9} />
          <path d="M 5 55 L 20 48 L 30 50 L 45 55 Z" fill={colorHex} opacity={0.6} />
        </g>
      )}

      {/* Reflection highlight */}
      <path d="M 12 47 L 22 27" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" />
      
      {/* Formula label (optional, placed at bottom right if desired, or maybe omit since it's on the card) */}
    </svg>
  );
};
