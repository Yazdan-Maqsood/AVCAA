import React from 'react';

const Logo = ({ size = 40, showText = true, className = "" }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* SVG Icon */}
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Shape (Hexagon for Tech feel) */}
        <path 
          d="M50 5L93.3 25V75L50 95L6.7 75V25L50 5Z" 
          fill="#B3001B" 
        />
        
        {/* Inner Code Brackets (< >) */}
        <path 
          d="M35 35L20 50L35 65" 
          stroke="white" 
          strokeWidth="6" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M65 35L80 50L65 65" 
          stroke="white" 
          strokeWidth="6" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        
        {/* Center Checkmark (Verification/AI) */}
        <path 
          d="M42 50L48 56L60 42" 
          stroke="white" 
          strokeWidth="6" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>

      {/* Brand Text */}
      {showText && (
        <span className="text-2xl font-extrabold tracking-wider text-brand-black dark:text-white">
          ACVAA
        </span>
      )}
    </div>
  );
};

export default Logo;