import React, { useState, useEffect } from 'react';
import { Image, UploadCloud, Play } from 'lucide-react';

export interface MediaPlaceholderProps {
  type?: 'image' | 'video';
  aspectRatio?: '16/9' | '4/3' | '1/1' | '21/9' | '3/2' | string;
  label: string;
  sublabel?: string;
  className?: string;
  showPlayButton?: boolean;
  initialSrc?: string;
}

export const MediaPlaceholder: React.FC<MediaPlaceholderProps> = ({
  type = 'image',
  aspectRatio = '16/9',
  label,
  sublabel = 'Media placeholder for F3 Turf Services',
  className = '',
  showPlayButton = false,
  initialSrc
}) => {
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(initialSrc);

  useEffect(() => {
    if (initialSrc !== undefined) {
      setCurrentSrc(initialSrc);
    }
  }, [initialSrc]);

  // Aspect ratio mapping
  const getAspectClass = () => {
    switch (aspectRatio) {
      case '16/9':
        return 'aspect-16/9';
      case '4/3':
        return 'aspect-4/3';
      case '1/1':
        return 'aspect-square';
      case '21/9':
        return 'aspect-21/9';
      case '3/2':
        return 'aspect-3/2';
      default:
        return 'aspect-16/9';
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCurrentSrc(url);
    }
  };

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl border border-[#222222] bg-[#111111] transition-all group ${getAspectClass()} ${className}`}
    >
      {currentSrc ? (
        <div className="relative w-full h-full">
          {type === 'video' ? (
            <video
              src={currentSrc}
              controls
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={currentSrc}
              alt={label}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      ) : (
        /* Professional Empty Media Placeholder */
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#0D0D0D] border border-dashed border-[#2A2A2A] hover:border-[#FFD900]/50 transition-colors">
          {/* Subtle grid pattern background */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#777777 1px, transparent 1px)`,
              backgroundSize: '16px 16px'
            }}
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* Icon Box */}
            <div className="w-12 h-12 rounded-xl bg-[#161616] border border-[#262626] flex items-center justify-center text-[#FFD900] mb-3 group-hover:scale-105 group-hover:border-[#FFD900]/40 transition-all shadow-sm">
              {showPlayButton || type === 'video' ? (
                <div className="w-7 h-7 rounded-full bg-[#FFD900] text-black flex items-center justify-center pl-0.5 shadow-md">
                  <Play className="w-3.5 h-3.5 fill-black" />
                </div>
              ) : (
                <Image className="w-5 h-5 text-[#FFD900]" />
              )}
            </div>

            {/* Primary Centered Label */}
            <span className="font-heading font-bold text-sm tracking-tight text-white uppercase group-hover:text-[#FFD900] transition-colors">
              {label}
            </span>

            {/* Aspect & Details Tag */}
            <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[#777777]">
              <span>{aspectRatio} Ratio</span>
              <span>·</span>
              <span className="capitalize">{type} slot</span>
            </div>

            <p className="mt-2 text-[10px] text-[#666666] max-w-xs leading-normal">
              {sublabel}
            </p>

            {/* Click to upload real photo / preview */}
            <label className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#161616] hover:bg-[#202020] border border-[#2B2B2B] hover:border-[#FFD900]/40 text-[11px] font-semibold text-slate-300 hover:text-white cursor-pointer transition-all">
              <UploadCloud className="w-3.5 h-3.5 text-[#FFD900]" />
              <span>Upload Real {type === 'video' ? 'Video' : 'Photo'}</span>
              <input
                type="file"
                accept={type === 'video' ? 'video/*' : 'image/*'}
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
