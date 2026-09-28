import React from 'react';

interface F3LogoProps {
  className?: string;
  variant?: 'horizontal' | 'badge' | 'minimal';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const F3Logo: React.FC<F3LogoProps> = ({
  className = '',
  variant = 'horizontal',
  size = 'md'
}) => {
  const getDims = () => {
    switch (size) {
      case 'sm':
        return 32;
      case 'lg':
        return 52;
      case 'xl':
        return 72;
      case 'md':
      default:
        return 40;
    }
  };

  const dim = getDims();

  const renderSymbol = () => (
    <svg
      width={dim}
      height={dim}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform group-hover:scale-105"
    >
      <defs>
        <clipPath id="f3-logo-clip">
          <rect width="160" height="160" rx="22" />
        </clipPath>
      </defs>

      {/* Sport Badge Canvas */}
      <rect width="160" height="160" rx="22" fill="#0D0D0D" stroke="#222222" strokeWidth="2" />

      {/* Athletic Speed Stripes */}
      <g clipPath="url(#f3-logo-clip)">
        <polygon points="-10,35 35,-10 52,-10 -10,52" fill="#FFD900" />
        <polygon points="-10,65 65,-10 78,-10 -10,78" fill="#FFD900" />
        <polygon points="110,170 170,110 170,122 122,170" fill="#FFD900" />
        <polygon points="85,170 170,85 170,98 98,170" fill="#FFD900" />
      </g>

      {/* Dynamic F & 3 Stylized Glyphs */}
      <g transform="translate(18, 26)">
        {/* Letter F */}
        <path
          d="M 12 18 L 68 18 L 60 36 L 30 36 L 26 48 L 56 48 L 48 64 L 21 64 L 12 86 L -2 86 Z"
          fill="#FFD900"
        />
        {/* Number 3 / B Athletic Slanted Curves */}
        <path
          d="M 46 18 L 100 18 C 112 18 118 27 112 37 C 107 46 95 51 86 53 C 97 56 102 64 97 74 C 91 84 79 88 64 88 L 32 88 L 36 72 L 62 72 C 70 72 75 69 77 63 C 79 57 76 53 68 53 L 48 53 L 55 38 L 74 38 C 81 38 86 35 88 30 C 90 25 86 22 79 22 L 44 22 Z"
          fill="#FFD900"
        />
      </g>

      {/* Wordmark TURF */}
      <text
        x="80"
        y="136"
        textAnchor="middle"
        fill="#FFD900"
        fontSize="19"
        fontWeight="900"
        fontFamily="sans-serif"
        letterSpacing="6"
      >
        TURF
      </text>
    </svg>
  );

  if (variant === 'minimal') {
    return (
      <div className={`inline-flex items-center ${className}`}>
        {renderSymbol()}
      </div>
    );
  }

  if (variant === 'badge') {
    return (
      <div className={`flex flex-col items-center gap-2 ${className}`}>
        {renderSymbol()}
        <div className="text-center">
          <span className="font-heading font-extrabold text-xl tracking-tight text-white">
            F3 <span className="text-[#FFD900]">TURF SERVICES</span>
          </span>
          <div className="text-[10px] uppercase tracking-widest text-[#777777] font-semibold">
            Play · Compete · Experience
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 group select-none ${className}`}>
      {renderSymbol()}
      <div className="flex flex-col leading-none">
        <div className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center">
          F3<span className="text-[#FFD900] ml-1.5">TURF SERVICES</span>
        </div>
        <span className="text-[10px] tracking-wider text-[#777777] font-semibold uppercase mt-1">
          Sports & Events Venue
        </span>
      </div>
    </div>
  );
};
