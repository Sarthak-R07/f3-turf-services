import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Arena, AddOnOption, Booking } from '../types/turf';
import { 
  X, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  QrCode, 
  Share2, 
  Download, 
  CreditCard,
  Banknote,
  Sparkles
} from 'lucide-react';
import { FbTurfLogo } from './FbTurfLogo';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingDraft: {
    arena: Arena;
    date: string;
    selectedSlots: string[];
    selectedAddOns: AddOnOption[];
    totalAmount: number;
  } | null;
  onBookingConfirmed: (newBooking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  bookingDraft,
  onBookingConfirmed
}) => {
  if (!isOpen || !bookingDraft) return null;

  const [captainName, setCaptainName] = useState('');
  const [teamName, setTeamName] = useState('');
  const [captainPhone, setCaptainPhone] = useState('');
  const [captainEmail, setCaptainEmail] = useState('');
  const [paymentMode, setPaymentMode] = useState<'online_full' | 'advance_25'>('online_full');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  const advanceAmount = Math.round(bookingDraft.totalAmount * 0.25);
  const amountToPayNow = paymentMode === 'online_full' ? bookingDraft.totalAmount : advanceAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!captainName.trim() || !captainPhone.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const bookingId = `FBT-${Math.floor(100000 + Math.random() * 900000)}`;
      const qrSeed = `FBTURF-PASS-${bookingId}-${Date.now()}`;

      const newBooking: Booking = {
        id: bookingId,
        arenaId: bookingDraft.arena.id,
        arenaName: bookingDraft.arena.name,
        date: bookingDraft.date,
        slots: bookingDraft.selectedSlots,
        sport: bookingDraft.arena.sport,
        captainName: captainName.trim(),
        teamName: teamName.trim() || `${captainName.trim()}'s Squad`,
        captainPhone: captainPhone.trim(),
        captainEmail: captainEmail.trim() || 'player@fbturf.com',
        selectedAddOns: bookingDraft.selectedAddOns.map((a) => a.name),
        totalAmount: bookingDraft.totalAmount,
        advancePaid: amountToPayNow,
        paymentMode,
        createdAt: new Date().toISOString(),
        qrCodeToken: qrSeed,
        status: 'confirmed'
      };

      // Confetti burst
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FFE500', '#10B981', '#FFFFFF', '#090C0F']
        });
      } catch (err) {
        // Fallback gracefully
      }

      setConfirmedBooking(newBooking);
      onBookingConfirmed(newBooking);
      setIsSubmitting(false);
    }, 700);
  };

  const getWhatsAppShareUrl = (booking: Booking) => {
    const text = encodeURIComponent(
      `⚽ *MATCH CONFIRMED AT FB TURF!*\n\n` +
      `🏟️ *Arena:* ${booking.arenaName}\n` +
      `📅 *Date:* ${booking.date}\n` +
      `⏰ *Time Slot(s):* ${booking.slots.join(', ')}\n` +
      `👥 *Team:* ${booking.teamName}\n` +
      `🎫 *Booking ID:* ${booking.id}\n\n` +
      `See you under the floodlights on pitch! Please wear turf studs or flats.`
    );
    return `https://wa.me/?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#0D1217] border border-[#263140] rounded-2xl shadow-2xl text-slate-100 overflow-hidden my-8">
        
        {/* Modal Top Header */}
        <div className="px-6 py-4 bg-[#141A23] border-b border-[#242E3B] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FbTurfLogo size="sm" variant="mark-only" />
            <div>
              <h3 className="font-display font-extrabold text-base uppercase text-white tracking-tight">
                {confirmedBooking ? 'Match Pass Confirmed' : 'Complete Pitch Booking'}
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                {bookingDraft.arena.name}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1E2734] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        {!confirmedBooking ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Booking Summary Card */}
            <div className="p-4 rounded-xl bg-[#121820] border border-[#212A36] space-y-2 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-[#212A36]">
                <span className="text-slate-400 font-medium">Arena & Date:</span>
                <span className="font-bold text-white">{bookingDraft.date} · {bookingDraft.arena.name}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-[#212A36]">
                <span className="text-slate-400 font-medium">Time Slot(s):</span>
                <span className="font-mono font-bold text-[#FFE500]">
                  {bookingDraft.selectedSlots.join(', ')}
                </span>
              </div>
              {bookingDraft.selectedAddOns.length > 0 && (
                <div className="flex justify-between items-center pb-2 border-b border-[#212A36]">
                  <span className="text-slate-400 font-medium">Add-ons:</span>
                  <span className="text-slate-300">
                    {bookingDraft.selectedAddOns.map((a) => a.name).join(', ')}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center pt-1 text-sm">
                <span className="font-bold text-white">Total Pitch Fee:</span>
                <span className="font-mono font-extrabold text-lg text-[#FFE500]">
                  ₹{bookingDraft.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Captain & Team Details */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Squad & Contact Info
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Captain / Organizer Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aryan Sonawane"
                    value={captainName}
                    onChange={(e) => setCaptainName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#161D26] border border-[#2A3747] rounded-lg focus:outline-none focus:border-[#FFE500] text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Team Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Thunder FC"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#161D26] border border-[#2A3747] rounded-lg focus:outline-none focus:border-[#FFE500] text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Mobile Phone (for Pass SMS/WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={captainPhone}
                    onChange={(e) => setCaptainPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#161D26] border border-[#2A3747] rounded-lg focus:outline-none focus:border-[#FFE500] text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Email Address (for Invoice)
                  </label>
                  <input
                    type="email"
                    placeholder="captain@sports.com"
                    value={captainEmail}
                    onChange={(e) => setCaptainEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#161D26] border border-[#2A3747] rounded-lg focus:outline-none focus:border-[#FFE500] text-white"
                  />
                </div>
              </div>
            </div>

            {/* Payment Mode Selection */}
            <div className="space-y-2 pt-2 border-t border-[#212A36]">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Choose Payment Option
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMode('online_full')}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    paymentMode === 'online_full'
                      ? 'bg-[#18212D] border-[#FFE500] ring-1 ring-[#FFE500]'
                      : 'bg-[#121820] border-[#252F3D] hover:bg-[#161D26]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-[#FFE500]" />
                      Pay 100% Online
                    </span>
                    <span className="text-xs font-mono font-bold text-[#FFE500]">
                      ₹{bookingDraft.totalAmount}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Instant guaranteed slot. Zero queue at counter.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMode('advance_25')}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    paymentMode === 'advance_25'
                      ? 'bg-[#18212D] border-[#FFE500] ring-1 ring-[#FFE500]'
                      : 'bg-[#121820] border-[#252F3D] hover:bg-[#161D26]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Banknote className="w-3.5 h-3.5 text-emerald-400" />
                      Pay 25% Advance
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      ₹{advanceAmount}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Pay remaining ₹{bookingDraft.totalAmount - advanceAmount} at pitch reception.
                  </p>
                </button>
              </div>
            </div>

            {/* Terms note */}
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Free cancellation up to 4 hours before kick-off. Clean non-marking footwear mandatory.</span>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 text-xs font-black uppercase tracking-wider text-black bg-[#FFE500] hover:bg-[#F2D900] active:scale-95 rounded-xl transition-all shadow-[0_0_25px_rgba(255,229,0,0.35)] flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Confirming Slot Reservation...</span>
              ) : (
                <span>Confirm & Pay ₹{amountToPayNow.toLocaleString()}</span>
              )}
            </button>
          </form>
        ) : (
          /* Confirmed Digital Pass Display */
          <div className="p-6 space-y-6 text-center">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">
                Booking Confirmed
              </div>
              <h2 className="font-display font-extrabold text-2xl text-white uppercase tracking-tight">
                You're Scheduled To Play!
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Show this digital pass at FB TURF front desk or simply share with your team.
              </p>
            </div>

            {/* The Ticket Badge */}
            <div className="bg-[#121820] border-2 border-dashed border-[#FFE500]/50 rounded-2xl p-5 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                <FbTurfLogo size="sm" variant="mark-only" />
              </div>

              <div className="flex justify-between items-start pb-4 border-b border-[#232C3A]">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Match Booking ID</span>
                  <div className="text-lg font-mono font-extrabold text-[#FFE500]">
                    {confirmedBooking.id}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Team</span>
                  <div className="text-xs font-bold text-white">
                    {confirmedBooking.teamName}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 py-3 text-xs border-b border-[#232C3A]">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">Arena</span>
                  <div className="font-semibold text-white mt-0.5">{confirmedBooking.arenaName}</div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">Date</span>
                  <div className="font-semibold text-white mt-0.5">{confirmedBooking.date}</div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">Time Slot</span>
                  <div className="font-mono font-bold text-[#FFE500] mt-0.5">
                    {confirmedBooking.slots.join(', ')}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">Captain</span>
                  <div className="font-semibold text-white mt-0.5">{confirmedBooking.captainName}</div>
                </div>
              </div>

              {/* QR Mock code */}
              <div className="pt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-lg p-1 flex items-center justify-center shrink-0">
                    <QrCode className="w-10 h-10 text-black" />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] font-mono text-slate-300">Scan at entrance gate</div>
                    <div className="text-[11px] font-bold text-emerald-400">
                      Paid: ₹{confirmedBooking.advancePaid} {confirmedBooking.paymentMode === 'advance_25' && '(Advance)'}
                    </div>
                  </div>
                </div>

                <a
                  href={getWhatsAppShareUrl(confirmedBooking)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>WhatsApp Team</span>
                </a>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="w-full py-3 text-xs font-bold text-black bg-[#FFE500] hover:bg-[#F2D900] rounded-xl transition-all cursor-pointer"
              >
                Done & View in My Bookings
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
