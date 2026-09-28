import React from 'react';
import { MediaPlaceholder } from './MediaPlaceholder';
import { Calendar, ChevronRight, Zap, Shield } from 'lucide-react';
import { ActivityType } from '../types/f3';

interface SportsSectionProps {
  onSelectSport: (sport: ActivityType) => void;
}

export const SportsSection: React.FC<SportsSectionProps> = ({ onSelectSport }) => {
  return (
    <section id="sports" className="py-20 bg-[#050505] border-b border-[#1E1E1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-heading font-bold text-[#FFD900] uppercase tracking-wider mb-2">
            SPORTS AT F3
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white uppercase tracking-tight">
            CHOOSE YOUR GAME.
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            "Whatever your game, bring your squad and get on the turf."
          </p>
        </div>

        {/* 2 Large Sports Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Football */}
          <div className="bg-[#0D0D0D] border border-[#222222] hover:border-[#FFD900]/40 rounded-2xl p-6 transition-all flex flex-col justify-between group shadow-xl">
            <div>
              <div className="mb-4 rounded-xl overflow-hidden">
                <MediaPlaceholder
                  type="image"
                  aspectRatio="16/9"
                  label="F3 Football Arena"
                  sublabel="Floodlit arena with professional goalpost and safety perimeter netting"
                  initialSrc={import.meta.env.BASE_URL + "turf-real/football_turf.jpg"}
                  className="w-full rounded-xl overflow-hidden"
                />
              </div>

              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#161616] text-[#FFD900] flex items-center justify-center border border-[#262626]">
                  <Zap className="w-4 h-4" />
                </div>
                <h3 className="font-heading font-extrabold text-2xl text-white uppercase tracking-tight">
                  FOOTBALL
                </h3>
              </div>

              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                "Book the turf for friendly matches, training sessions and competitive games."
              </p>

              <div className="mt-4 pt-3 border-t border-[#1C1C1C] flex items-center gap-3 text-xs text-slate-400">
                <span>5v5 & 7v7 formats</span>
                <span>·</span>
                <span>Shock pad underlay</span>
                <span>·</span>
                <span>High perimeter net</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1C1C1C]">
              <button
                onClick={() => onSelectSport('Football')}
                className="w-full py-3.5 px-4 text-xs font-heading font-extrabold tracking-wider uppercase text-black bg-[#FFD900] hover:bg-[#E6C400] active:scale-98 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Calendar className="w-4 h-4 text-black stroke-[2.5]" />
                <span>BOOK FOOTBALL</span>
                <ChevronRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>

          {/* Card 2: Box Cricket */}
          <div className="bg-[#0D0D0D] border border-[#222222] hover:border-[#FFD900]/40 rounded-2xl p-6 transition-all flex flex-col justify-between group shadow-xl">
            <div>
              <div className="mb-4 rounded-xl overflow-hidden">
                <MediaPlaceholder
                  type="image"
                  aspectRatio="16/9"
                  label="F3 Box Cricket Arena"
                  sublabel="Tournament match action, crease markings, and high-tension netting"
                  initialSrc={import.meta.env.BASE_URL + "turf-real/box_cricket.jpg"}
                  className="w-full rounded-xl overflow-hidden"
                />
              </div>

              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#161616] text-[#FFD900] flex items-center justify-center border border-[#262626]">
                  <Shield className="w-4 h-4" />
                </div>
                <h3 className="font-heading font-extrabold text-2xl text-white uppercase tracking-tight">
                  BOX CRICKET
                </h3>
              </div>

              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                "Get your team together and experience fast-paced box cricket."
              </p>

              <div className="mt-4 pt-3 border-t border-[#1C1C1C] flex items-center gap-3 text-xs text-slate-400">
                <span>6v6 & 8v8 overs</span>
                <span>·</span>
                <span>Crease markings</span>
                <span>·</span>
                <span>Tension ceiling net</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1C1C1C]">
              <button
                onClick={() => onSelectSport('Box Cricket')}
                className="w-full py-3.5 px-4 text-xs font-heading font-extrabold tracking-wider uppercase text-black bg-[#FFD900] hover:bg-[#E6C400] active:scale-98 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Calendar className="w-4 h-4 text-black stroke-[2.5]" />
                <span>BOOK BOX CRICKET</span>
                <ChevronRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
