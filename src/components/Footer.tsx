import React from 'react';
import { FbTurfLogo } from './FbTurfLogo';
import { MapPin, Phone, Mail, Clock, MessageSquare, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigateToBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToBooking }) => {
  return (
    <footer className="bg-[#07090C] border-t border-[#1C232E] text-slate-400 text-xs">
      
      {/* Top Footer Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4">
            <FbTurfLogo variant="horizontal" size="md" />
            <p className="text-xs text-slate-400 leading-relaxed">
              Premier multi-sport turf facility featuring FIFA-grade synthetic football pitches and high-tension box cricket cages. Engineered for athletes, powered by community.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Pitch Lights Operational Till 02:00 AM</span>
            </div>
          </div>

          {/* Col 2: Timings & Operating Hours */}
          <div className="space-y-3">
            <h4 className="font-display font-extrabold text-sm text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#FFE500]" />
              Facility Timings
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex justify-between pb-1.5 border-b border-[#1A222D]">
                <span>Monday – Friday:</span>
                <span className="font-mono text-white">06:00 AM – 02:00 AM</span>
              </li>
              <li className="flex justify-between pb-1.5 border-b border-[#1A222D]">
                <span>Saturday – Sunday:</span>
                <span className="font-mono text-[#FFE500]">06:00 AM – 02:00 AM</span>
              </li>
              <li className="flex justify-between pb-1.5 border-b border-[#1A222D]">
                <span>Prime Floodlights:</span>
                <span className="font-mono text-white">04:00 PM – 02:00 AM</span>
              </li>
              <li className="flex justify-between">
                <span>Sports Cafe:</span>
                <span className="font-mono text-white">07:00 AM – 01:00 AM</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Venue Location & Directions */}
          <div className="space-y-3">
            <h4 className="font-display font-extrabold text-sm text-white uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#FFE500]" />
              Arena Location
            </h4>
            <p className="text-xs leading-relaxed text-slate-300">
              FB TURF Sports Arena, Plot 42, Off Linking Road, Near Bandra Sports Complex, Mumbai 400050.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <a
                href="https://maps.google.com/?q=turf+football+sports+arena"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-lg bg-[#141B24] hover:bg-[#1C2532] border border-[#253040] text-slate-200 transition-colors inline-flex items-center gap-2 text-xs font-semibold"
              >
                <MapPin className="w-3.5 h-3.5 text-[#FFE500]" />
                <span>Open in Google Maps</span>
              </a>

              <a
                href="https://wa.me/919820144521?text=Hi%20FB%20TURF!%20Need%20info%20regarding%20pitch%20slots"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/40 text-emerald-400 transition-colors inline-flex items-center gap-2 text-xs font-semibold"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Quick WhatsApp Helpdesk</span>
              </a>
            </div>
          </div>

          {/* Col 4: Quick Navigation & Rules */}
          <div className="space-y-3">
            <h4 className="font-display font-extrabold text-sm text-white uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Pitch Guidelines
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>• Rubber turf boots or sneakers only</li>
              <li>• Strictly no metal studs or cleats</li>
              <li>• AC showers & lockers complimentary</li>
              <li>• 15 mins warm-up before kick-off</li>
              <li>• Zero smoking / alcohol premises</li>
            </ul>

            <button
              onClick={onNavigateToBooking}
              className="mt-3 w-full py-2.5 px-3 rounded-lg bg-[#FFE500] hover:bg-[#F2D900] text-black font-extrabold uppercase text-[11px] tracking-wider transition-all cursor-pointer shadow-sm"
            >
              Check Today's Open Slots
            </button>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="mt-12 pt-8 border-t border-[#161D27] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} FB TURF Sports Arena. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <a href="#booking-section" className="hover:text-[#FFE500] transition-colors">Book Slots</a>
            <span>·</span>
            <a href="#arenas-section" className="hover:text-[#FFE500] transition-colors">Pitches</a>
            <span>·</span>
            <a href="#tournaments-section" className="hover:text-[#FFE500] transition-colors">Tournaments</a>
            <span>·</span>
            <a href="#pricing-section" className="hover:text-[#FFE500] transition-colors">Rate Card</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
