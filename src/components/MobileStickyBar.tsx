import React from 'react';
import { Calendar, Phone, MessageSquare } from 'lucide-react';
import { F3_CONTACT_INFO } from '../data/f3Data';

interface MobileStickyBarProps {
  onOpenBooking: () => void;
  show: boolean;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onOpenBooking, show }) => {
  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#080808]/95 backdrop-blur-md border-t border-[#1F1F1F] p-2.5 sm:hidden shadow-2xl flex items-center gap-2">
      <a
        href={`tel:${F3_CONTACT_INFO.phoneRaw}`}
        className="p-3 rounded-xl bg-[#141414] border border-[#2B2B2B] text-slate-200 active:scale-95"
        title="Call F3 Desk"
      >
        <Phone className="w-4 h-4 text-[#FFD900]" />
      </a>

      <a
        href={`https://wa.me/${F3_CONTACT_INFO.whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 active:scale-95"
        title="WhatsApp F3"
      >
        <MessageSquare className="w-4 h-4" />
      </a>

      <button
        onClick={onOpenBooking}
        className="flex-1 py-3 px-4 rounded-xl bg-[#FFD900] hover:bg-[#E6C400] active:scale-95 text-black font-heading font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer"
      >
        <Calendar className="w-4 h-4 text-black stroke-[2.5]" />
        <span>BOOK A SLOT</span>
      </button>
    </div>
  );
};
