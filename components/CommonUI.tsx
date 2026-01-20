
import React from 'react';

export const Button: React.FC<{
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
}> = ({ onClick, variant = 'primary', className = '', children, disabled }) => {
  const baseStyles = "px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center disabled:opacity-50 active:scale-95";
  const variants = {
    primary: "bg-[#0A192F] text-white hover:bg-[#112240] shadow-lg",
    secondary: "bg-[#64FFDA] text-[#0A192F] hover:bg-[#4ddbb6] shadow-lg",
    outline: "border-2 border-[#0A192F] text-[#0A192F] hover:bg-[#0A192F] hover:text-white"
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export const ScoreGauge: React.FC<{ score: number }> = ({ score }) => {
  const safeScore = Math.min(100, Math.max(0, isNaN(score) ? 50 : score));
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (safeScore / 100) * circumference;
  
  let color = "#EF4444"; 
  if (safeScore > 70) color = "#10B981"; 
  else if (safeScore > 40) color = "#F59E0B"; 

  return (
    <div className="relative flex items-center justify-center w-32 h-32 shrink-0">
      <svg className="w-full h-full -rotate-90">
        <circle cx="64" cy="64" r="45" fill="none" stroke="#e2e8f0" strokeWidth="8" />
        <circle
          cx="64" cy="64" r="45" fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-extrabold" style={{ color }}>{Math.round(safeScore)}%</span>
        <span className="text-[10px] uppercase text-gray-400 font-black tracking-widest mt-1">Truth</span>
      </div>
    </div>
  );
};
