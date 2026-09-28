import React from 'react';

interface FbTurfLogoProps {
  className?: string;
  variant?: 'full' | 'horizontal' | 'mark-only';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const FbTurfLogo: React.FC<FbTurfLogoProps> = ({
  className = '',
  variant = 'horizontal',
  size = 'md'
}) => {
  // SVG Graphic of the dynamic FB Turf mark
  const renderSvgMark = (dimensions: number) => (
    <svg
      width={dimensions}
      height={dimensions}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 group-hover:scale-105"
    >
      <defs>
        <clipPath id="logo-badge-clip">
          <rect width="200" height="200" rx="28" />
        </clipPath>
      </defs>

      {/* Background with rounded sports badge frame */}
      <rect width="200" height="200" rx="28" fill="#0D1117" />
      
      {/* Corner Speed / Hazard Stripes - Top Left */}
      <g clipPath="url(#logo-badge-clip)">
        {/* Top-left angled stripes */}
        <polygon points="-20,40 40,-20 65,-20 -20,65" fill="#FFE500" />
        <polygon points="-20,80 80,-20 100,-20 -20,100" fill="#FFE500" />
        <polygon points="-20,12 12,-20 25,-20 -20,25" fill="#FFE500" />

        {/* Bottom-right angled stripes */}
        <polygon points="135,220 220,135 220,150 150,220" fill="#FFE500" />
        <polygon points="100,220 220,100 220,120 120,220" fill="#FFE500" />
        <polygon points="175,220 220,175 220,185 185,220" fill="#FFE500" />
      </g>

      {/* Main Stylized FB Mark (Slanted geometric sports glyph) */}
      <g transform="translate(18, 25)">
        {/* F & B interconnected energetic silhouette */}
        <path
          d="M 28 32 L 140 32 L 126 58 L 56 58 L 50 72 L 118 72 L 105 95 L 42 95 L 30 122 L 8 122 Z"
          fill="#FFE500"
        />
        <path
          d="M 72 32 L 152 32 C 166 32 172 44 165 58 C 158 72 142 80 130 84 C 145 88 152 98 145 112 C 137 127 122 134 100 134 L 52 134 L 58 114 L 95 114 C 106 114 114 110 118 102 C 122 94 117 88 106 88 L 74 88 L 84 68 L 114 68 C 124 68 131 64 134 56 C 137 48 132 44 122 44 L 66 44 Z"
          fill="#FFE500"
        />
      </g>

      {/* TURF text */}
      <text
        x="100"
        y="166"
        textAnchor="middle"
        fill="#FFE500"
        fontSize="25"
        fontWeight="900"
        fontFamily="sans-serif"
        letterSpacing="8"
      >
        TURF
      </text>
    </svg>
  );

  const getDimension = () => {
    switch (size) {
      case 'sm':
        return 34;
      case 'lg':
        return 56;
      case 'xl':
        return 96;
      case 'md':
      default:
        return 42;
    }
  };

  const dim = getDimension();

  if (variant === 'mark-only') {
    return (
      <div className={`inline-flex items-center ${className}`}>
        {renderSvgMark(dim)}
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center gap-2 ${className}`}>
        {renderSvgMark(dim)}
        <div className="flex flex-col items-center">
          <span className="font-display font-extrabold text-2xl tracking-tighter text-white">
            FB <span className="text-[#FFE500]">TURF</span>
          </span>
          <span className="text-[10px] tracking-widest text-slate-400 uppercase font-semibold">
            Sports Arena & Stadium
          </span>
        </div>
      </div>
    );
  }

  // Horizontal variant (Ideal for Top Bar Nav)
  return (
    <div className={`inline-flex items-center gap-3 group select-none ${className}`}>
      {renderSvgMark(dim)}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5">
          <span className="font-display font-black text-xl tracking-tight text-white group-hover:text-slate-100">
            FB<span className="text-[#FFE500] ml-1">TURF</span>
          </span>
        </div>
        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium mt-1">
          Arena & Box Cricket
        </span>
      </div>
    </div>
  );
};
