import React, { useState } from 'react';
import { F3_CONTACT_INFO } from '../data/f3Data';
import { F3Logo } from './F3Logo';
import { 
  Phone, 
  MessageSquare, 
  Mail, 
  MapPin, 
  Clock, 
  Navigation, 
  ExternalLink,
  Send,
  CheckCircle2
} from 'lucide-react';

interface ContactAndFooterProps {
  onOpenBooking: () => void;
  onNavigateToSection: (id: string) => void;
}

export const ContactAndFooter: React.FC<ContactAndFooterProps> = ({
  onOpenBooking,
  onNavigateToSection
}) => {
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactPhone.trim()) return;
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setContactName('');
      setContactPhone('');
      setContactMessage('');
    }, 2500);
  };

  return (
    <div>
      {/* SECTION 25 & 26: CONTACT SECTION & GOOGLE MAP PLACEHOLDER */}
      <section id="contact" className="py-20 bg-[#050505] border-b border-[#1E1E1E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs font-heading font-bold text-[#FFD900] uppercase tracking-wider mb-2">
              GET IN TOUCH
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white uppercase tracking-tight">
              CONTACT F3 TURF SERVICES
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-400">
              Reach our front desk for direct inquiries, corporate packages, and tournament bookings.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Col: Contact Information (Col 6) */}
            <div className="lg:col-span-6 bg-[#0D0D0D] border border-[#222222] rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <F3Logo variant="horizontal" size="md" />

                <div className="pt-4 space-y-3.5 text-xs text-slate-300">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#141414] border border-[#262626] flex items-center justify-center text-[#FFD900] shrink-0 mt-0.5">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">Phone</span>
                      <a href={`tel:${F3_CONTACT_INFO.phoneRaw}`} className="font-mono text-white font-bold hover:text-[#FFD900] text-sm">
                        {F3_CONTACT_INFO.phoneDisplay}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#141414] border border-[#262626] flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">WhatsApp</span>
                      <a
                        href={`https://wa.me/${F3_CONTACT_INFO.whatsappNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-white font-bold hover:text-emerald-400 text-sm"
                      >
                        {F3_CONTACT_INFO.phoneDisplay}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#141414] border border-[#262626] flex items-center justify-center text-[#FFD900] shrink-0 mt-0.5">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">Email</span>
                      <span className="text-white font-medium">{F3_CONTACT_INFO.email}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#141414] border border-[#262626] flex items-center justify-center text-[#FFD900] shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">Address</span>
                      <span className="text-white">{F3_CONTACT_INFO.address}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#141414] border border-[#262626] flex items-center justify-center text-[#FFD900] shrink-0 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">Opening Hours</span>
                      <span className="text-white font-mono">{F3_CONTACT_INFO.openingHours}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Three Mandatory Quick Buttons (Section 25) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-4 border-t border-[#1C1C1C]">
                <a
                  href={`tel:${F3_CONTACT_INFO.phoneRaw}`}
                  className="py-3 px-3 rounded-xl bg-[#141414] hover:bg-[#1E1E1E] border border-[#2A2A2A] text-white text-center text-xs font-heading font-bold uppercase transition-colors flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#FFD900]" />
                  <span>CALL NOW</span>
                </a>

                <a
                  href={`https://wa.me/${F3_CONTACT_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-3 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/40 text-emerald-400 text-center text-xs font-heading font-bold uppercase transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WHATSAPP</span>
                </a>

                <button
                  onClick={() => alert(`Directions: ${F3_CONTACT_INFO.address}`)}
                  className="py-3 px-3 rounded-xl bg-[#141414] hover:bg-[#1E1E1E] border border-[#2A2A2A] text-white text-center text-xs font-heading font-bold uppercase transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#FFD900]" />
                  <span>GET DIRECTIONS</span>
                </button>
              </div>
            </div>

            {/* Right Col: Google Map Placeholder (Section 26) */}
            <div className="lg:col-span-6 bg-[#0D0D0D] border border-[#222222] rounded-2xl p-6 flex flex-col justify-between space-y-4">
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center rounded-xl bg-[#090909] border border-dashed border-[#262626]">
                <div className="w-14 h-14 rounded-2xl bg-[#141414] border border-[#292929] flex items-center justify-center text-[#FFD900] mb-3">
                  <MapPin className="w-7 h-7" />
                </div>
                <div className="font-heading font-bold text-base text-white uppercase tracking-tight">
                  [ GOOGLE MAP PLACEHOLDER ]
                </div>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">
                  {F3_CONTACT_INFO.googleMapLabel}
                </p>
                <div className="mt-4 px-3 py-1.5 rounded-lg bg-[#141414] border border-[#2B2B2B] text-[11px] font-mono text-slate-400">
                  Embed Google Maps iframe when address is finalized
                </div>
              </div>

              {/* Quick message enquiry form */}
              <form onSubmit={handleContactSubmit} className="pt-2 space-y-2.5 text-xs">
                <div className="text-[11px] font-heading font-bold uppercase text-slate-300">
                  Quick Message Enquiry
                </div>
                {isSent ? (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Message received! We will contact you shortly.</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="px-3 py-2 bg-[#141414] border border-[#262626] rounded-xl text-white text-xs focus:outline-none focus:border-[#FFD900]"
                      />
                      <input
                        type="tel"
                        required
                        placeholder="Mobile Number"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="px-3 py-2 bg-[#141414] border border-[#262626] rounded-xl text-white font-mono text-xs focus:outline-none focus:border-[#FFD900]"
                      />
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Inquiry message (e.g. Booking availability, weekend match)..."
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        className="flex-1 px-3 py-2 bg-[#141414] border border-[#262626] rounded-xl text-white text-xs focus:outline-none focus:border-[#FFD900]"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#FFD900] text-black font-heading font-bold rounded-xl text-xs hover:bg-[#E6C400] transition-colors cursor-pointer"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 27: FOOTER */}
      <footer className="bg-[#050505] border-t border-[#1C1C1C] text-slate-400 text-xs py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#181818]">
            
            {/* Col 1: Logo & Tagline */}
            <div className="space-y-4">
              <F3Logo variant="horizontal" size="md" />
              <div className="text-xs font-heading font-bold text-[#FFD900] tracking-wider uppercase">
                {F3_CONTACT_INFO.tagline}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                F3 Turf Services is a premium sports turf and events venue offering football, box cricket, corporate events, live sports screening, sports days, and tournaments.
              </p>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="space-y-3">
              <div className="font-heading font-bold text-sm text-white uppercase tracking-wider">
                NAVIGATION
              </div>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => onNavigateToSection('hero')} className="hover:text-[#FFD900] transition-colors">Home</button></li>
                <li><button onClick={() => onNavigateToSection('about')} className="hover:text-[#FFD900] transition-colors">About</button></li>
                <li><button onClick={() => onNavigateToSection('sports')} className="hover:text-[#FFD900] transition-colors">Sports</button></li>
                <li><button onClick={() => onNavigateToSection('events')} className="hover:text-[#FFD900] transition-colors">Events</button></li>
                <li><button onClick={() => onNavigateToSection('gallery')} className="hover:text-[#FFD900] transition-colors">Gallery</button></li>
                <li><button onClick={() => onNavigateToSection('contact')} className="hover:text-[#FFD900] transition-colors">Contact</button></li>
                <li>
                  <button onClick={onOpenBooking} className="text-[#FFD900] font-bold hover:underline">
                    Book a Slot →
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Services */}
            <div className="space-y-3">
              <div className="font-heading font-bold text-sm text-white uppercase tracking-wider">
                SERVICES
              </div>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>• Football (5v5 & 7v7)</li>
                <li>• Box Cricket</li>
                <li>• Corporate Events</li>
                <li>• Sports Day</li>
                <li>• Tournaments</li>
                <li>• Live Screening</li>
              </ul>
            </div>

            {/* Col 4: Contact & Venue */}
            <div className="space-y-3">
              <div className="font-heading font-bold text-sm text-white uppercase tracking-wider">
                CONTACT & VENUE
              </div>
              <ul className="space-y-2 text-xs">
                <li>Phone: <span className="font-mono text-white">{F3_CONTACT_INFO.phoneDisplay}</span></li>
                <li>WhatsApp: <span className="font-mono text-emerald-400">{F3_CONTACT_INFO.phoneDisplay}</span></li>
                <li>Email: <span className="text-slate-300">{F3_CONTACT_INFO.email}</span></li>
                <li>Location: <span className="text-slate-400">{F3_CONTACT_INFO.address}</span></li>
              </ul>
            </div>

          </div>

          {/* Bottom Copyright & Disclaimer */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <div>
              © 2026 F3 Turf Services. All rights reserved.
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Production-Ready Platform</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
