import React from 'react';
import { LOUNGE_IMAGE } from '../data/mockTurfData';
import { 
  Sun, 
  ShieldCheck, 
  Bath, 
  Armchair, 
  Coffee, 
  Camera, 
  CheckCircle, 
  AlertTriangle,
  Zap
} from 'lucide-react';

export const AmenitiesSection: React.FC = () => {
  return (
    <section id="amenities-section" className="py-20 bg-[#090C0F] border-b border-[#1E252F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFE500] mb-2">
            <span>Pro Athlete Infrastructure</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span>Beyond Just The Grass</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white uppercase tracking-tight">
            World-Class Amenities
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            From chilled sports nutrition to private AC shower suites, FB TURF delivers a complete match-day experience for squads and spectators alike.
          </p>
        </div>

        {/* Feature Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Visual Showcase (Col 7) */}
          <div className="lg:col-span-7 bg-[#10151C] border border-[#212A36] rounded-2xl overflow-hidden flex flex-col justify-between group">
            <div className="relative aspect-16/10 w-full overflow-hidden bg-[#161D26]">
              <img
                src={LOUNGE_IMAGE}
                alt="FB TURF Player Dugout and Sports Cafe Lounge"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10151C] via-[#10151C]/20 to-transparent" />
              <div className="absolute bottom-4 left-4 bg-[#0B0E13]/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-[#252E3C] text-xs font-bold text-white flex items-center gap-2">
                <Coffee className="w-4 h-4 text-[#FFE500]" />
                <span>Player Dugout & Nutrition Cafe</span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="font-display font-extrabold text-xl text-white tracking-tight uppercase">
                Post-Match Recovery & Spectator Bleachers
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Relax after an intense 60-minute match with chilled cold-pressed juices, protein recovery shakes, and electrolyte water. Elevated spectator viewing platform lets friends and family catch every goal.
              </p>
              
              <div className="mt-4 pt-4 border-t border-[#1C2532] grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#FFE500]" />
                  <span>Free High-Speed Wi-Fi</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#FFE500]" />
                  <span>Sub Bench Dugouts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#FFE500]" />
                  <span>Music Sound System</span>
                </div>
              </div>
            </div>
          </div>

          {/* Grid of 4 Feature Cards (Col 5) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            
            <div className="p-5 rounded-2xl bg-[#10151C] border border-[#212A36] flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-[#19222E] text-[#FFE500] border border-[#2B394A] shrink-0">
                <Sun className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-white uppercase tracking-tight">
                  550 Lux Stadium Floodlights
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Phillips optical sports luminaires providing shadow-free, broadcast-ready illumination with zero glare.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#10151C] border border-[#212A36] flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-[#19222E] text-emerald-400 border border-[#2B394A] shrink-0">
                <Bath className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-white uppercase tracking-tight">
                  AC Changing Suites & Showers
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Spotless locker areas with high-pressure hot water showers, body wash dispensers, and individual lockable cubicles.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#10151C] border border-[#212A36] flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-[#19222E] text-[#FFE500] border border-[#2B394A] shrink-0">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-white uppercase tracking-tight">
                  4K AI Match Cam Highlights
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Ceiling-mounted 4K sports cameras record your match automatically. Get your highlight clips sent directly to WhatsApp.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Footwear & Safety Policy Strip */}
        <div className="mt-8 p-5 rounded-2xl bg-[#121820] border border-[#222E3E] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-white">
                Footwear & Equipment Policy
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Rubber turf studs (TF) and flat-soled sneakers are permitted. Metal studs / SG boots are strictly prohibited to preserve the grass.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#FFE500] bg-[#161F2A] px-3.5 py-2 rounded-xl border border-[#29384C] shrink-0">
            <span>Turf Boot Rental Available: ₹100/pair</span>
          </div>
        </div>

      </div>
    </section>
  );
};
