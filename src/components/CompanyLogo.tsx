import React from 'react';

interface CompanyLogoProps {
  variant?: 'navbar' | 'footer' | 'icon-only';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({
  variant = 'navbar',
  className = '',
  size = 'md',
}) => {
  const isFooter = variant === 'footer';

  // Dimension mapping for emblem icon
  const iconDimensions = {
    sm: 'w-9 h-9',
    md: 'w-11 h-11',
    lg: 'w-14 h-14',
  };

  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* Black & Green Professional Logo Emblem */}
      <div
        className={`${iconDimensions[size]} shrink-0 relative rounded-2xl bg-gradient-to-br from-[#03060b] via-[#09121d] to-[#020508] p-0.5 border border-emerald-500/60 shadow-[0_4px_14px_rgba(0,0,0,0.5)] transition-all duration-200 group-hover:scale-105 group-hover:border-emerald-400 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.45)]`}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="logoEmeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="50%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="logoMintHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#A7F3D0" />
              <stop offset="50%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
            <filter id="logoGlowEffect" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Inner hairline geometric frame */}
          <rect
            x="6"
            y="6"
            width="88"
            height="88"
            rx="18"
            stroke="#34D399"
            strokeWidth="0.8"
            strokeOpacity="0.4"
          />

          {/* Upper dynamic curved blade / swoosh */}
          <path
            d="M50 16 C50 16 75 30 75 46 C75 56 66 63 53 63 C40 63 32 54 39 45 C43 41 49 39 53 39 C62 39 64 45 60 49 C55 54 48 52 46 49"
            stroke="url(#logoEmeraldGrad)"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Lower dynamic counter curved blade / swoosh */}
          <path
            d="M50 84 C50 84 25 70 25 54 C25 44 34 37 47 37 C60 37 68 46 61 55 C57 59 51 61 47 61 C38 61 36 55 40 51 C45 46 52 48 54 51"
            stroke="url(#logoEmeraldGrad)"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Nova Core Starburst / Diamond Spark */}
          <polygon
            points="50,26 53,43 70,50 53,57 50,74 47,57 30,50 47,43"
            fill="url(#logoMintHighlight)"
            filter="url(#logoGlowEffect)"
            opacity="0.95"
          />

          {/* Core White Pulse Point */}
          <circle cx="50" cy="50" r="3.5" fill="#FFFFFF" />
          <circle cx="50" cy="50" r="5.5" fill="none" stroke="#34D399" strokeWidth="1" strokeOpacity="0.8" />

          {/* Corner geometric dots */}
          <circle cx="16" cy="16" r="2" fill="#10B981" opacity="0.8" />
          <circle cx="84" cy="84" r="2" fill="#10B981" opacity="0.8" />
        </svg>
      </div>

      {/* Brand Typography */}
      {variant !== 'icon-only' && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1 leading-none tracking-tight">
            <span
              className={`text-xl sm:text-2xl font-black font-sans ${
                isFooter ? 'text-white' : 'text-slate-900 group-hover:text-emerald-700'
              } transition-colors`}
            >
              SUPER<span className="text-emerald-500 font-black">NOVA</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-[10px] font-extrabold text-emerald-600 tracking-[0.22em] uppercase font-sans">
              Pvt. Ltd. • IT Solutions
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
