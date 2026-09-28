import React from 'react';
import { SERVICES_LIST } from '../data/f3Data';
import { ActivityType } from '../types/f3';
import { Shield, Zap, Briefcase, Tv, Flag, Trophy, ArrowRight } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (activity: ActivityType) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Shield':
        return <Shield className="w-5 h-5 text-[#FFD900]" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-[#FFD900]" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-[#FFD900]" />;
      case 'Tv':
        return <Tv className="w-5 h-5 text-[#FFD900]" />;
      case 'Flag':
        return <Flag className="w-5 h-5 text-[#FFD900]" />;
      case 'Trophy':
      default:
        return <Trophy className="w-5 h-5 text-[#FFD900]" />;
    }
  };

  return (
    <section id="facilities" className="py-20 bg-[#080808] border-b border-[#1E1E1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-heading font-bold text-[#FFD900] uppercase tracking-wider mb-2">
            WHAT WE OFFER
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white uppercase tracking-tight">
            BUILT FOR SPORT. READY FOR EVENTS.
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Dedicated infrastructure for friendly weekend squads, corporate leagues, and championship showcases.
          </p>
        </div>

        {/* 6 Clean Rectangular Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_LIST.map((srv) => (
            <div
              key={srv.id}
              onClick={() => onSelectService(srv.activityKey)}
              className="bg-[#0D0D0D] border border-[#222222] hover:border-[#FFD900]/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:-translate-y-1 shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#141414] border border-[#262626] group-hover:border-[#FFD900]/40 flex items-center justify-center transition-colors">
                    {getIcon(srv.iconName)}
                  </div>
                  <span className="font-mono text-xs font-bold text-[#777777] group-hover:text-[#FFD900] transition-colors">
                    {srv.number}
                  </span>
                </div>

                <h3 className="font-heading font-extrabold text-lg text-white uppercase tracking-tight group-hover:text-[#FFD900] transition-colors">
                  {srv.title}
                </h3>

                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {srv.shortDescription}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#1C1C1C] flex items-center justify-between text-xs font-heading font-bold text-slate-400 group-hover:text-white transition-colors">
                <span>Book / Enquire</span>
                <ArrowRight className="w-4 h-4 text-[#FFD900] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
