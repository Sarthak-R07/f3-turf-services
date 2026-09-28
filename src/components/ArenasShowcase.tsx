import React from 'react';
import { ARENAS } from '../data/mockTurfData';
import { Arena } from '../types/turf';
import { Check, Shield, Zap, Sparkles, ChevronRight, Ruler, Users, Sun } from 'lucide-react';

interface ArenasShowcaseProps {
  onSelectArenaToBook: (arenaId: string) => void;
}

export const ArenasShowcase: React.FC<ArenasShowcaseProps> = ({
  onSelectArenaToBook
}) => {
  return (
    <section id="arenas-section" className="py-20 bg-[#0B0F14] border-b border-[#1E252F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFE500] mb-2">
            <span>Stadium Specifications</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span>Three Custom Built Pitches</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white uppercase tracking-tight">
            Our Tournament Arenas
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Engineered with high-tensile safety netting, zero-glare LED sports floodlights, and FIFA-certified shock-pad underlays to protect your knees and joints.
          </p>
        </div>

        {/* Arenas Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {ARENAS.map((arena) => (
            <div
              key={arena.id}
              className="bg-[#10151C] border border-[#212A36] rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#FFE500]/50 transition-all duration-300 group"
            >
              {/* Arena Photo */}
              <div className="relative aspect-4/3 w-full overflow-hidden bg-[#161D26]">
                <img
                  src={arena.image}
                  alt={arena.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10151C] via-[#10151C]/20 to-transparent" />
                
                {/* Badge */}
                <div className="absolute top-3 left-3 bg-[#0A0D11]/90 backdrop-blur-md px-3 py-1 rounded-lg border border-[#222C38] text-[11px] font-bold uppercase tracking-wider text-[#FFE500]">
                  {arena.sport === 'football' ? '5v5 / 7v7 Football' : arena.sport === 'cricket' ? 'Box Cricket Arena' : 'Multi-Sport Cage'}
                </div>

                <div className="absolute bottom-3 right-3 bg-[#0A0D11]/90 backdrop-blur-md px-3 py-1 rounded-lg border border-[#222C38] text-xs font-mono font-bold text-white">
                  ₹{arena.hourlyRatePeak}<span className="text-[10px] text-slate-400 font-normal">/hr prime</span>
                </div>
              </div>

              {/* Arena Info Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-extrabold text-xl text-white tracking-tight uppercase">
                    {arena.name}
                  </h3>
                  <p className="text-xs text-[#FFE500] font-medium mt-0.5">
                    {arena.subtitle}
                  </p>
                  
                  {/* Quick specs pill strip */}
                  <div className="grid grid-cols-2 gap-2 my-4 py-3 border-y border-[#1E2632] text-xs">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Ruler className="w-3.5 h-3.5 text-[#FFE500] shrink-0" />
                      <span className="font-mono text-[11px]">{arena.dimensions}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Users className="w-3.5 h-3.5 text-[#FFE500] shrink-0" />
                      <span className="text-[11px]">{arena.capacity}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Sun className="w-3.5 h-3.5 text-[#FFE500] shrink-0" />
                      <span className="font-mono text-[11px]">{arena.lightingLux} Lux Stadium</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="text-[11px]">Shock Absorber</span>
                    </div>
                  </div>

                  {/* Surface description */}
                  <div className="text-xs text-slate-400 mb-4 leading-relaxed">
                    <span className="text-slate-300 font-semibold">Surface: </span>
                    {arena.surface}
                  </div>

                  {/* Features list */}
                  <ul className="space-y-1.5 mb-6 text-xs text-slate-300">
                    {arena.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#FFE500] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Primary Button */}
                <button
                  onClick={() => onSelectArenaToBook(arena.id)}
                  className="w-full py-3 px-4 text-xs font-black uppercase tracking-wider text-black bg-[#FFE500] hover:bg-[#F2D900] active:scale-98 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Book {arena.name.split(' ')[0]} Now</span>
                  <ChevronRight className="w-4 h-4 text-black" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
