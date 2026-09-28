import React from 'react';
import { MediaPlaceholder } from './MediaPlaceholder';
import { Calendar, ArrowDown, ChevronRight, Zap, Trophy, Briefcase, Tv, Flag } from 'lucide-react';
import { F3_CONTACT_INFO } from '../data/f3Data';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onExplore: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  onExplore
}) => {
  return (
    <section id="hero" className="relative pt-24 sm:pt-28 pb-16 overflow-hidden bg-[#050505] border-b border-[#1E1E1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Top Grid: Headline + Video/Image Media Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text Column (Col 6) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Brand Kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#141414] border border-[#262626] text-xs font-heading font-bold text-[#FFD900] uppercase tracking-wider">
              <span>F3 TURF SERVICES</span>
              <span className="text-slate-500">·</span>
              <span>SPORTS & EVENTS VENUE</span>
            </div>

            {/* Main Punchy Tagline */}
            <h1 className="font-heading font-extrabold text-4xl sm:text-6xl text-white tracking-tight uppercase leading-[1.05]">
              PLAY. COMPETE. <br />
              <span className="text-[#FFD900]">EXPERIENCE.</span>
            </h1>

            {/* Sub-headline */}
            <div className="text-base sm:text-lg font-heading font-semibold text-slate-200">
              Premium Sports Turf & Event Venue
            </div>

            <p className="text-sm sm:text-base text-slate-400 font-normal leading-relaxed max-w-xl">
              "Your destination for football, box cricket, tournaments, corporate events and unforgettable sporting experiences."
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="px-7 py-4 text-xs sm:text-sm font-heading font-black tracking-wider uppercase text-black bg-[#FFD900] hover:bg-[#E6C400] active:scale-95 rounded-xl shadow-[0_0_25px_rgba(255,217,0,0.3)] transition-all flex items-center gap-2.5 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-black stroke-[2.5]" />
                <span>BOOK YOUR SLOT</span>
                <ChevronRight className="w-4 h-4 text-black" />
              </button>

              <button
                onClick={onExplore}
                className="px-6 py-4 text-xs sm:text-sm font-heading font-bold tracking-wider uppercase text-white bg-[#141414] hover:bg-[#1E1E1E] border border-[#2B2B2B] rounded-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>EXPLORE F3</span>
                <ArrowDown className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Below Hero Minimal Pillars */}
            <div className="pt-6 border-t border-[#1C1C1C] grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <span className="w-2 h-2 rounded-full bg-[#FFD900]" />
                <span>Football</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <span className="w-2 h-2 rounded-full bg-[#FFD900]" />
                <span>Box Cricket</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <span className="w-2 h-2 rounded-full bg-[#FFD900]" />
                <span>Events</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <span className="w-2 h-2 rounded-full bg-[#FFD900]" />
                <span>Tournaments</span>
              </div>
            </div>

          </div>

          {/* Right Media Column (Col 6) - F3 Turf Arena Photo */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl p-1 bg-gradient-to-b from-[#FFD900]/40 via-[#2B2B2B] to-[#141414] shadow-2xl overflow-hidden group">
              <MediaPlaceholder
                type="image"
                aspectRatio="4/3"
                label="F3 Turf Arena"
                sublabel="Night view of F3 floodlit sports turf and arena"
                initialSrc={import.meta.env.BASE_URL + "turf-real/real_turf_4.jpg"}
                className="w-full rounded-xl overflow-hidden"
              />
            </div>
          </div>

        </div>

        {/* Section 6: TRUST / QUICK INFORMATION BAR */}
        <div className="mt-14 pt-8 border-t border-[#1E1E1E]">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            
            <div className="p-3.5 rounded-xl bg-[#0D0D0D] border border-[#1F1F1F] flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#161616] text-[#FFD900] flex items-center justify-center shrink-0 border border-[#292929]">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-heading font-bold text-white uppercase">Football</div>
                <div className="text-[10px] text-slate-400">5v5 & 7v7 Pitches</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0D0D0D] border border-[#1F1F1F] flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#161616] text-[#FFD900] flex items-center justify-center shrink-0 border border-[#292929]">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-heading font-bold text-white uppercase">Box Cricket</div>
                <div className="text-[10px] text-slate-400">High-tension Nets</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0D0D0D] border border-[#1F1F1F] flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#161616] text-[#FFD900] flex items-center justify-center shrink-0 border border-[#292929]">
                <Trophy className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-heading font-bold text-white uppercase">Tournaments</div>
                <div className="text-[10px] text-slate-400">Leagues & Cups</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0D0D0D] border border-[#1F1F1F] flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#161616] text-[#FFD900] flex items-center justify-center shrink-0 border border-[#292929]">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-heading font-bold text-white uppercase">Corporate Events</div>
                <div className="text-[10px] text-slate-400">Sports & Team Outings</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0D0D0D] border border-[#1F1F1F] flex items-center gap-3 col-span-2 sm:col-span-1">
              <div className="w-9 h-9 rounded-lg bg-[#161616] text-[#FFD900] flex items-center justify-center shrink-0 border border-[#292929]">
                <Tv className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-heading font-bold text-white uppercase">Live Screening</div>
                <div className="text-[10px] text-slate-400">Derbies & Matches</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
