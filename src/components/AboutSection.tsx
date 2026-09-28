import React from 'react';
import { MediaPlaceholder } from './MediaPlaceholder';
import { CheckCircle2, ChevronRight } from 'lucide-react';

interface AboutSectionProps {
  onDiscover: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onDiscover }) => {
  const highlights = [
    { title: 'Premium Sporting Experience', desc: 'FIFA-grade grass surface and shock-absorbing underlay.' },
    { title: 'Flexible Booking', desc: 'Effortless hourly reservations from morning till late night.' },
    { title: 'Events & Tournaments', desc: 'Turnkey competitive cups, prize distributions, and trophies.' },
    { title: 'Corporate Activities', desc: 'Tailored inter-company games, team retreats, and wellness days.' },
    { title: 'Sports Screening', desc: 'High-definition viewing areas for major sports celebrations.' },
  ];

  return (
    <section id="about" className="py-20 bg-[#080808] border-b border-[#1E1E1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: F3 Team & Community Photo */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl p-1 bg-gradient-to-tr from-[#FFD900]/30 via-[#2B2B2B] to-[#141414] shadow-2xl overflow-hidden">
              <MediaPlaceholder
                type="image"
                aspectRatio="3/2"
                label="F3 Turf Sports Community"
                sublabel="F3 team and athletes in official kits"
                initialSrc="/turf-real/real_turf_5.jpg"
                className="w-full rounded-xl overflow-hidden"
              />
            </div>
          </div>

          {/* Right Column: Narrative + Highlights */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="text-xs font-heading font-bold text-[#FFD900] uppercase tracking-wider mb-2">
                ABOUT F3 TURF SERVICES
              </div>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white uppercase tracking-tight">
                MORE THAN JUST A TURF.
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              "F3 Turf Services is built for people who love the game. From football and box cricket to tournaments, corporate events and live sports screenings, F3 provides a dedicated space to play, compete, connect and celebrate sport."
            </p>

            {/* Highlights List */}
            <div className="space-y-3 pt-2">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#1A1A1A] border border-[#2E2E2E] text-[#FFD900] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-heading font-bold text-white uppercase tracking-wide">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3">
              <button
                onClick={onDiscover}
                className="px-6 py-3 text-xs font-heading font-bold tracking-wider uppercase text-black bg-[#FFD900] hover:bg-[#E6C400] active:scale-95 rounded-lg transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>DISCOVER F3</span>
                <ChevronRight className="w-4 h-4 text-black" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
