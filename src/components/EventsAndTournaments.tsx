import React, { useState } from 'react';
import { MediaPlaceholder } from './MediaPlaceholder';
import { Trophy, Briefcase, Tv, CheckCircle2, X, Check } from 'lucide-react';
import { EventEnquiry } from '../types/f3';

interface EventsAndTournamentsProps {
  onEnquirySubmitted: (enquiry: EventEnquiry) => void;
}

export const EventsAndTournaments: React.FC<EventsAndTournamentsProps> = ({
  onEnquirySubmitted
}) => {
  // Modal state for Tournament, Corporate, or Screening
  const [modalType, setModalType] = useState<'tournament' | 'corporate' | 'screening' | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [expectedCount, setExpectedCount] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmitEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !modalType) return;

    const newEnquiry: EventEnquiry = {
      id: `enq-${Date.now()}`,
      type: modalType,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      organization: organization.trim() || undefined,
      expectedTeamsOrParticipants: expectedCount.trim() || undefined,
      preferredDate: preferredDate.trim() || undefined,
      message: message.trim() || undefined,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };

    onEnquirySubmitted(newEnquiry);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setModalType(null);
      setName('');
      setPhone('');
      setEmail('');
      setOrganization('');
      setMessage('');
    }, 2000);
  };

  return (
    <div id="events" className="space-y-0">
      
      {/* SECTION 18: TOURNAMENT SECTION */}
      <section className="py-20 bg-[#080808] border-b border-[#1E1E1E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="text-xs font-heading font-bold text-[#FFD900] uppercase tracking-wider">
                COMPETITIVE ARENA
              </div>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white uppercase tracking-tight">
                HOST YOUR TOURNAMENT AT F3.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                "Bring teams together, compete and create memorable sporting experiences at F3."
              </p>

              {/* 4 Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#0D0D0D] border border-[#222222] flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#FFD900] shrink-0" />
                  <span className="text-xs font-heading font-bold text-white uppercase">Team Registration</span>
                </div>
                <div className="p-4 rounded-xl bg-[#0D0D0D] border border-[#222222] flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#FFD900] shrink-0" />
                  <span className="text-xs font-heading font-bold text-white uppercase">Match Scheduling</span>
                </div>
                <div className="p-4 rounded-xl bg-[#0D0D0D] border border-[#222222] flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#FFD900] shrink-0" />
                  <span className="text-xs font-heading font-bold text-white uppercase">Tournament Management</span>
                </div>
                <div className="p-4 rounded-xl bg-[#0D0D0D] border border-[#222222] flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#FFD900] shrink-0" />
                  <span className="text-xs font-heading font-bold text-white uppercase">Event Support</span>
                </div>
              </div>

              <div>
                <button
                  onClick={() => setModalType('tournament')}
                  className="px-7 py-3.5 text-xs font-heading font-extrabold uppercase tracking-wider text-black bg-[#FFD900] hover:bg-[#E6C400] active:scale-95 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Trophy className="w-4 h-4 text-black" />
                  <span>ORGANIZE A TOURNAMENT</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <MediaPlaceholder
                type="image"
                aspectRatio="4/3"
                label="F3 Tournament Arena"
                sublabel="Championship matches, team celebrations & floodlit arena events"
                initialSrc={import.meta.env.BASE_URL + "turf-real/f3_tournament_arena.jpg"}
                className="w-full rounded-2xl shadow-2xl border border-[#2A2A2A] overflow-hidden"
              />
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 19: CORPORATE EVENTS */}
      <section className="py-20 bg-[#050505] border-b border-[#1E1E1E]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-xs font-heading font-bold text-[#FFD900] uppercase tracking-wider">
            BUSINESS & TEAM ENGAGEMENT
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white uppercase tracking-tight">
            BRING YOUR TEAM TO F3.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            "Turn team-building into an active experience with sports, competition and connection."
          </p>

          {/* 4 Use Cases */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 text-xs text-slate-300">
            <div className="p-3.5 bg-[#0E0E0E] rounded-xl border border-[#222222] flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#FFD900]" />
              <span className="font-semibold text-white">Corporate Sports Day</span>
            </div>
            <div className="p-3.5 bg-[#0E0E0E] rounded-xl border border-[#222222] flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#FFD900]" />
              <span className="font-semibold text-white">Team Building Matches</span>
            </div>
            <div className="p-3.5 bg-[#0E0E0E] rounded-xl border border-[#222222] flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#FFD900]" />
              <span className="font-semibold text-white">Employee Engagement</span>
            </div>
            <div className="p-3.5 bg-[#0E0E0E] rounded-xl border border-[#222222] flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#FFD900]" />
              <span className="font-semibold text-white">Company Tournament</span>
            </div>
          </div>

          <div>
            <button
              onClick={() => setModalType('corporate')}
              className="px-7 py-3.5 text-xs font-heading font-extrabold uppercase tracking-wider text-black bg-[#FFD900] hover:bg-[#E6C400] active:scale-95 rounded-xl transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
            >
              <Briefcase className="w-4 h-4 text-black" />
              <span>PLAN A CORPORATE EVENT</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 20: LIVE SCREENING */}
      <section className="py-20 bg-[#080808] border-b border-[#1E1E1E]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="text-xs font-heading font-bold text-[#FFD900] uppercase tracking-wider mb-2">
            FAN ZONE EXPERIENCE
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight">
            WATCH THE GAME. FEEL THE GAME.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            "Experience major sporting moments together with your team and friends."
          </p>

          <div className="mt-8">
            <button
              onClick={() => setModalType('screening')}
              className="px-7 py-3.5 text-xs font-heading font-extrabold uppercase tracking-wider text-black bg-[#FFD900] hover:bg-[#E6C400] active:scale-95 rounded-xl transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
            >
              <Tv className="w-4 h-4 text-black" />
              <span>ENQUIRE FOR SCREENING</span>
            </button>
          </div>
        </div>
      </section>

      {/* ENQUIRY MODAL (For Tournament, Corporate, or Screening) */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-[#0E0E0E] border border-[#2B2B2B] rounded-2xl shadow-2xl p-6 text-slate-100 text-xs">
            <div className="flex justify-between items-center pb-3 border-b border-[#222222] mb-4">
              <h3 className="font-heading font-extrabold text-base uppercase text-white">
                {modalType === 'tournament'
                  ? 'Organize A Tournament Enquiry'
                  : modalType === 'corporate'
                  ? 'Corporate Event Enquiry'
                  : 'Live Sports Screening Enquiry'}
              </h3>
              <button
                onClick={() => setModalType(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isSuccess ? (
              <div className="py-8 text-center space-y-2">
                <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h4 className="font-heading font-bold text-lg text-white">Enquiry Submitted!</h4>
                <p className="text-xs text-slate-400">
                  Our F3 event coordinator will reach out to you via WhatsApp or phone shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitEnquiry} className="space-y-3.5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 bg-[#141414] border border-[#2A2A2A] rounded-xl text-white focus:outline-none focus:border-[#FFD900]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Mobile / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98000 00000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-[#141414] border border-[#2A2A2A] rounded-xl text-white font-mono focus:outline-none focus:border-[#FFD900]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-[#141414] border border-[#2A2A2A] rounded-xl text-white focus:outline-none focus:border-[#FFD900]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">
                      {modalType === 'tournament' ? 'Expected Teams' : 'Expected Participants'}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 8 to 16 teams / 50 players"
                      value={expectedCount}
                      onChange={(e) => setExpectedCount(e.target.value)}
                      className="w-full px-3 py-2 bg-[#141414] border border-[#2A2A2A] rounded-xl text-white focus:outline-none focus:border-[#FFD900]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Organization / Club</label>
                    <input
                      type="text"
                      placeholder="e.g. Bandra United / Infosys"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      className="w-full px-3 py-2 bg-[#141414] border border-[#2A2A2A] rounded-xl text-white focus:outline-none focus:border-[#FFD900]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Preferred Date</label>
                    <input
                      type="text"
                      placeholder="e.g. Next Saturday"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-3 py-2 bg-[#141414] border border-[#2A2A2A] rounded-xl text-white focus:outline-none focus:border-[#FFD900]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Message / Requirements</label>
                  <textarea
                    rows={2}
                    placeholder="Details regarding match format, referee requirements, trophies, sound system..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 bg-[#141414] border border-[#2A2A2A] rounded-xl text-white focus:outline-none focus:border-[#FFD900]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 text-xs font-heading font-extrabold uppercase text-black bg-[#FFD900] hover:bg-[#E6C400] rounded-xl transition-all cursor-pointer shadow-lg mt-2"
                >
                  Send Enquiry
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
