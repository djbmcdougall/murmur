import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "h-8 w-8" }) => (
  <svg 
    viewBox="0 0 1000 1000" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Main speech bubble shape */}
    <path
      d="M300 250 
         Q300 250 500 250 
         Q700 250 700 500
         Q700 750 500 750
         Q300 750 300 500
         Z"
      fill="white"
      stroke="black"
      strokeWidth="60"
    />
    
    {/* Center dot */}
    <circle
      cx="500"
      cy="500"
      r="60"
      fill="black"
    />
    
    {/* Sound waves */}
    <g transform="translate(750, 450)">
      <path
        d="M0 50 L60 50"
        stroke="black"
        strokeWidth="60"
        strokeLinecap="round"
      />
      <path
        d="M100 50 L160 50"
        stroke="black"
        strokeWidth="60"
        strokeLinecap="round"
      />
    </g>
  </svg>
);