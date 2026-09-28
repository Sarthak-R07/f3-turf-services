import React, { useState } from 'react';
import { TOURNAMENTS } from '../data/mockTurfData';
import { Tournament } from '../types/turf';
import { Trophy, Calendar, DollarSign, Award, Users, Check, X, Sparkles, ChevronRight } from 'lucide-react';

export const TournamentsSection: React.FC = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>(TOURNAMENTS);
  const [selectedTourn, setSelectedTourn] = useState<Tournament | null>(null);
  const [registeredSquads, setRegisteredSquads] = useState<string[]>([]);
  const [teamName, setTeamName] = useState('');
  const [captainName, setCaptainName] = useState('');
  const [captainPhone, setCaptainPhone] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTourn || !teamName.trim() || !captainPhone.trim()) return;

    setTournaments((prev) =>
      prev.map((t) => (t.id === selectedTourn.id ? { ...t, filledSlots: t.filledSlots + 1 } : t))
    );
    setRegisteredSquads([...registeredSquads, selectedTourn.id]);
    setSuccessMessage(true);

    setTimeout(() => {
      setSuccessMessage(false);
      setSelectedTourn(null);
      setTeamName('');
      setCaptainName('');
      setCaptainPhone('');
    }, 2000);
  };

  return (
    <section id="tournaments-section" className="py-20 bg-[#0B0F14] border-b border-[#1E252F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFE500] mb-2">
            <span>Competitive Leagues & Cups</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span>Cash Prizes & Trophies</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white uppercase tracking-tight">
            Upcoming Tournaments
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Compete against the best amateur and semi-pro teams in the region. Full broadcast lighting, YouTube live streaming, certified refs, and custom championship trophies.
          </p>
        </div>

        {/* Tournaments Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {tournaments.map((tourn) => {
            const isRegistered = registeredSquads.includes(tourn.id);
            const percentFilled = Math.round((tourn.filledSlots / tourn.totalSlots) * 100);

            return (
              <div
                key={tourn.id}
                className="bg-[#10151C] border border-[#212A36] rounded-2xl p-6 flex flex-col justify-between hover:border-[#FFE500]/50 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#FFE500]/10 text-[#FFE500] border border-[#FFE500]/30">
                      {tourn.status}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#FFE500]" />
                      {tourn.date}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-xl text-white tracking-tight uppercase group-hover:text-[#FFE500] transition-colors">
                    {tourn.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {tourn.tagline}
                  </p>

                  {/* Prize pool marquee card */}
                  <div className="mt-5 p-4 rounded-xl bg-[#151D26] border border-[#242E3B] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">Prize Pool</span>
                      <span className="font-display font-black text-lg text-[#FFE500] tracking-tight">
                        {tourn.prizePool}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">Entry Fee</span>
                      <span className="font-mono font-bold text-sm text-white">
                        ₹{tourn.entryFee} <span className="text-[10px] text-slate-400 font-normal">/ squad</span>
                      </span>
                    </div>
                  </div>

                  {/* Slot availability progress bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Team Slots Filled</span>
                      <span className="font-mono font-bold text-white">
                        {tourn.filledSlots} / {tourn.totalSlots} Squads
                      </span>
                    </div>
                    <div className="w-full bg-[#18212C] rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-[#FFE500] h-full rounded-full transition-all duration-500"
                        style={{ width: `${percentFilled}%` }}
                      />
                    </div>
                  </div>

                  {/* Perks list */}
                  <div className="mt-5 space-y-1.5 text-xs text-slate-300">
                    {tourn.perks.map((perk, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#FFE500] shrink-0" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Registration button */}
                <div className="mt-6 pt-4 border-t border-[#1C2532]">
                  {isRegistered ? (
                    <div className="py-2.5 px-4 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-center gap-2">
                      <Check className="w-4 h-4" />
                      <span>Squad Registered! Pass Sent</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => setSelectedTourn(tourn)}
                      className="w-full py-3 px-4 text-xs font-black uppercase tracking-wider text-black bg-[#FFE500] hover:bg-[#F2D900] active:scale-98 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <Trophy className="w-4 h-4 text-black" />
                      <span>Register Team (₹{tourn.entryFee})</span>
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Registration Modal */}
        {selectedTourn && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
            <div className="relative w-full max-w-md bg-[#0E131A] border border-[#253040] rounded-2xl shadow-2xl p-6 text-slate-100">
              <div className="flex justify-between items-center pb-3 border-b border-[#212A38] mb-4">
                <div>
                  <h3 className="font-display font-black text-base uppercase text-white">
                    Team Registration
                  </h3>
                  <p className="text-[11px] text-[#FFE500] font-mono">{selectedTourn.title}</p>
                </div>
                <button
                  onClick={() => setSelectedTourn(null)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {successMessage ? (
                <div className="py-8 text-center space-y-2">
                  <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-white">Team Registered!</h4>
                  <p className="text-xs text-slate-400">
                    Tournament rules, match fixtures, and captain briefing will be sent to WhatsApp.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRegister} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Official Team Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bandra Thunderbolts"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      className="w-full px-3 py-2 bg-[#161D26] border border-[#2A3747] rounded-lg text-white focus:outline-none focus:border-[#FFE500]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Team Captain Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aditya Verma"
                      value={captainName}
                      onChange={(e) => setCaptainName(e.target.value)}
                      className="w-full px-3 py-2 bg-[#161D26] border border-[#2A3747] rounded-lg text-white focus:outline-none focus:border-[#FFE500]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Captain Mobile / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98000 00000"
                      value={captainPhone}
                      onChange={(e) => setCaptainPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-[#161D26] border border-[#2A3747] rounded-lg text-white font-mono focus:outline-none focus:border-[#FFE500]"
                    />
                  </div>

                  <div className="p-3 rounded-lg bg-[#141B24] border border-[#232D3B] text-[11px] text-slate-300 flex justify-between items-center">
                    <span>Registration Fee:</span>
                    <span className="font-mono font-bold text-sm text-[#FFE500]">₹{selectedTourn.entryFee}</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 text-xs font-black uppercase text-black bg-[#FFE500] hover:bg-[#F2D900] rounded-xl transition-all cursor-pointer shadow-lg mt-2"
                  >
                    Confirm Registration
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
