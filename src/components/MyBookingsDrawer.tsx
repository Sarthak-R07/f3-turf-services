import React from 'react';
import { Booking } from '../types/turf';
import { 
  X, 
  Ticket, 
  Calendar, 
  Clock, 
  MapPin, 
  QrCode, 
  Share2, 
  Trash2, 
  AlertCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { FbTurfLogo } from './FbTurfLogo';

interface MyBookingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  onCancelBooking: (id: string) => void;
  onBookNewSlot: () => void;
}

export const MyBookingsDrawer: React.FC<MyBookingsDrawerProps> = ({
  isOpen,
  onClose,
  bookings,
  onCancelBooking,
  onBookNewSlot
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0D1217] border-l border-[#222B38] text-slate-100 flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-6 bg-[#131922] border-b border-[#222B38] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Ticket className="w-5 h-5 text-[#FFE500]" />
              <h2 className="font-display font-extrabold text-lg uppercase text-white tracking-tight">
                My Match Passes
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1E2734] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {bookings.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#161D26] border border-[#263140] flex items-center justify-center mb-4 text-slate-500">
                  <Ticket className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-base text-white">No Active Bookings Yet</h3>
                <p className="text-xs text-slate-400 max-w-xs mt-1">
                  Ready to play? Pick your arena, choose your squad's slot, and your digital entry pass will appear here.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onBookNewSlot();
                  }}
                  className="mt-5 px-5 py-2.5 text-xs font-black uppercase text-black bg-[#FFE500] hover:bg-[#F2D900] rounded-xl transition-all cursor-pointer shadow-lg"
                >
                  Book A Slot Now
                </button>
              </div>
            ) : (
              bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-[#121820] border border-[#263140] rounded-2xl p-4 space-y-3 relative overflow-hidden"
                >
                  {/* Top bar of pass */}
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-[10px] font-mono text-[#FFE500] uppercase font-bold tracking-wider">
                        {booking.id}
                      </div>
                      <div className="font-display font-bold text-sm text-white">
                        {booking.arenaName}
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Confirmed
                    </span>
                  </div>

                  {/* Details grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs bg-[#161D26] p-3 rounded-xl border border-[#212935]">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase">Match Date</span>
                      <div className="font-semibold text-white mt-0.5">{booking.date}</div>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase">Slot Time</span>
                      <div className="font-mono font-bold text-[#FFE500] mt-0.5">
                        {booking.slots.join(', ')}
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase">Team</span>
                      <div className="text-slate-200 mt-0.5 truncate">{booking.teamName}</div>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase">Fee Paid</span>
                      <div className="font-mono font-bold text-white mt-0.5">
                        ₹{booking.advancePaid} <span className="text-[10px] text-slate-400">/ ₹{booking.totalAmount}</span>
                      </div>
                    </div>
                  </div>

                  {/* Add-ons if any */}
                  {booking.selectedAddOns && booking.selectedAddOns.length > 0 && (
                    <div className="text-[11px] text-slate-400">
                      <span className="text-slate-300 font-medium">Add-ons: </span>
                      {booking.selectedAddOns.join(', ')}
                    </div>
                  )}

                  {/* Footer actions */}
                  <div className="pt-2 border-t border-[#212935] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-white p-0.5 rounded flex items-center justify-center">
                        <QrCode className="w-7 h-7 text-black" />
                      </div>
                      <span className="text-[10px] text-slate-400">Ready at gate</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/?text=${encodeURIComponent(
                          `Match Pass: ${booking.arenaName} on ${booking.date} (${booking.slots.join(', ')}) - Booking ID: ${booking.id}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-slate-300 hover:text-white bg-[#1A222D] hover:bg-[#232D3B] rounded-lg transition-colors"
                        title="Share on WhatsApp"
                      >
                        <Share2 className="w-4 h-4 text-emerald-400" />
                      </a>

                      <button
                        onClick={() => {
                          if (confirm(`Cancel booking ${booking.id}? Free cancellation applies before 4 hours of game.`)) {
                            onCancelBooking(booking.id);
                          }
                        }}
                        className="p-2 text-slate-400 hover:text-red-400 bg-[#1A222D] hover:bg-red-950/40 rounded-lg transition-colors"
                        title="Cancel Booking"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer of Drawer */}
          {bookings.length > 0 && (
            <div className="p-4 bg-[#131922] border-t border-[#222B38]">
              <button
                onClick={() => {
                  onClose();
                  onBookNewSlot();
                }}
                className="w-full py-3 text-xs font-black uppercase text-black bg-[#FFE500] hover:bg-[#F2D900] rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Book Another Pitch Slot</span>
                <ChevronRight className="w-4 h-4 text-black" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
