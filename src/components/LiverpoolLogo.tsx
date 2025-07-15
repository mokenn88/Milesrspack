import React from 'react';
import liverpoolLogo from '../assets/liverpool-logo.svg';

export default function LiverpoolLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <img 
      src={liverpoolLogo} 
      alt="Liverpool FC Logo" 
      className={className}
    />
  );
}