import React, { useState } from 'react';
import { MATCH_CHALLENGES } from '../data/mockTurfData';
import { MatchChallenge, SportType } from '../types/turf';
import { Users, Phone, Calendar, Clock, Plus, Trophy, MessageSquare, Check, X, ShieldAlert } from 'lucide-react';

export const MatchFinderSection: React.FC = () => {
  const [challenges, setChallenges] = useState<MatchChallenge[]>(MATCH_CHALLENGES);
  const [sportFilter, setSportFilter] = useState<'all' | SportType>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [joinedIds, setJoinedIds] = useState<string[]>([]);

  // Modal form states
  const [newTitle, setNewTitle] = useState('');
  const [newSport, setNewSport] = useState<SportType>('football');
  const [newFormat, setNewFormat] = useState('5v5 Football');
  const [newTeam, setNewTeam] = useState('');
  const [newCaptain, setNewCaptain] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newDate, setNewDate] = useState('Tonight');
  const [newTime, setNewTime] = useState('21:00 - 22:00');
  const [newSkill, setNewSkill] = useState<'Casual' | 'Semi-Pro' | 'Competitive'>('Casual');
  const [newSpots, setNewSpots] = useState(2);
  const [newDesc, setNewDesc] = useState('');

  const filtered = challenges.filter((c) => {
    if (sportFilter === 'all') return true;
    return c.sport === sportFilter;
  });

  const handleCreateChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCaptain.trim() || !newPhone.trim()) return;

    const newChallenge: MatchChallenge = {
      id: `mc-${Date.now()}`,
      title: newTitle.trim(),
      sport: newSport,
      format: newFormat,
      teamName: newTeam.trim() || `${newCaptain}'s Squad`,
      captainName: newCaptain.trim(),
      contactPhone: newPhone.trim(),
      skillLevel: newSkill,
      date: newDate,
      timeSlot: newTime,
      arenaName: newSport === 'cricket' ? 'Thunder Box Cricket' : 'Colosseum Football Arena',
      splitCostApprox: 150,
      neededSpots: Number(newSpots) || 1,
      description: newDesc.trim() || 'Friendly match, all players welcome to join!',
      joinedCount: 0,
      createdAt: 'Just now'
    };

    setChallenges([newChallenge, ...challenges]);
    setIsModalOpen(false);
    // Reset form
    setNewTitle('');
    setNewTeam('');
    setNewDesc('');
  };

  const handleJoinOrChallenge = (challenge: MatchChallenge) => {
    if (joinedIds.includes(challenge.id)) return;
    setJoinedIds([...joinedIds, challenge.id]);
    setChallenges(challenges.map((c) => {
      if (c.id === challenge.id) {
        return { ...c, joinedCount: c.joinedCount + 1 };
      }
      return c;
    }));
  };

  return (
    <section id="match-finder-section" className="py-20 bg-[#090C0F] border-b border-[#1E252F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFE500] mb-2">
              <span>Player Matchmaking & Opponent Finder</span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span>Pickup Matches</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white uppercase tracking-tight">
              Match Finder & Challenges
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-xl">
              Missing 2 players for your match tonight? Or looking for a rival squad to challenge for an intense box cricket series? Connect with the local turf community.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 text-xs font-black uppercase tracking-wider text-black bg-[#FFE500] hover:bg-[#F2D900] active:scale-95 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-black stroke-[3]" />
              <span>Post A Challenge / Call Players</span>
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => setSportFilter('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              sportFilter === 'all'
                ? 'bg-white text-black'
                : 'text-slate-400 hover:text-white bg-[#12171E] border border-[#212A36]'
            }`}
          >
            All Sports ({challenges.length})
          </button>
          <button
            onClick={() => setSportFilter('football')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              sportFilter === 'football'
                ? 'bg-emerald-500 text-black font-bold'
                : 'text-slate-400 hover:text-white bg-[#12171E] border border-[#212A36]'
            }`}
          >
            ⚽ Football ({challenges.filter((c) => c.sport === 'football').length})
          </button>
          <button
            onClick={() => setSportFilter('cricket')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              sportFilter === 'cricket'
                ? 'bg-amber-400 text-black font-bold'
                : 'text-slate-400 hover:text-white bg-[#12171E] border border-[#212A36]'
            }`}
          >
            🏏 Box Cricket ({challenges.filter((c) => c.sport === 'cricket').length})
          </button>
        </div>

        {/* Challenges Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => {
            const hasJoined = joinedIds.includes(item.id);
            const remainingSpots = Math.max(0, item.neededSpots - item.joinedCount);

            return (
              <div
                key={item.id}
                className="bg-[#10151C] border border-[#222C38] rounded-2xl p-5 flex flex-col justify-between hover:border-[#FFE500]/40 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                      item.sport === 'football' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {item.format}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      {item.createdAt}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base text-white tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    "{item.description}"
                  </p>

                  {/* Metadata matrix */}
                  <div className="mt-4 pt-3 border-t border-[#1C2430] grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">Host Squad</span>
                      <span className="font-semibold text-slate-200 truncate block">{item.teamName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">Skill Level</span>
                      <span className="text-slate-200 block">{item.skillLevel}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">Match Timing</span>
                      <span className="font-mono text-white text-[11px] block">{item.date} · {item.timeSlot}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">Split Fee</span>
                      <span className="font-mono font-bold text-[#FFE500] block">~₹{item.splitCostApprox}/player</span>
                    </div>
                  </div>
                </div>

                {/* Card Action footer */}
                <div className="mt-5 pt-3 border-t border-[#1C2430] flex items-center justify-between gap-3">
                  <div className="text-xs text-slate-400">
                    <span className="font-bold text-white">{remainingSpots}</span> spot{remainingSpots === 1 ? '' : 's'} open
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/${item.contactPhone.replace(/\D/g, '')}?text=${encodeURIComponent(
                        `Hi ${item.captainName}! Saw your FB TURF listing for ${item.title} (${item.date} ${item.timeSlot}). We want to connect!`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-slate-300 hover:text-white bg-[#161D26] hover:bg-[#1E2734] border border-[#263242] rounded-lg transition-colors"
                      title="WhatsApp Captain"
                    >
                      <Phone className="w-4 h-4 text-emerald-400" />
                    </a>

                    <button
                      onClick={() => handleJoinOrChallenge(item)}
                      disabled={hasJoined || remainingSpots === 0}
                      className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                        hasJoined
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : remainingSpots === 0
                          ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                          : 'bg-[#FFE500] text-black hover:bg-[#F2D900]'
                      }`}
                    >
                      {hasJoined ? (
                        <span className="flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Joined Squad
                        </span>
                      ) : (
                        <span>Join / Accept</span>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Modal to Post a Challenge */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs overflow-y-auto">
            <div className="relative w-full max-w-lg bg-[#0E131A] border border-[#253040] rounded-2xl shadow-2xl p-6 my-8 text-slate-100">
              <div className="flex justify-between items-center pb-4 border-b border-[#212A38] mb-4">
                <h3 className="font-display font-extrabold text-lg uppercase text-white">
                  Post A Match Challenge
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateChallenge} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Challenge Headline *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Need 2 players for 5v5 friendly tonight at 9 PM"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-[#161D26] border border-[#2A3747] rounded-lg focus:outline-none focus:border-[#FFE500] text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Sport</label>
                    <select
                      value={newSport}
                      onChange={(e) => {
                        const s = e.target.value as SportType;
                        setNewSport(s);
                        setNewFormat(s === 'football' ? '5v5 Football' : '7v7 Box Cricket');
                      }}
                      className="w-full px-3 py-2 bg-[#161D26] border border-[#2A3747] rounded-lg text-white focus:outline-none"
                    >
                      <option value="football">Football</option>
                      <option value="cricket">Box Cricket</option>
                      <option value="multisport">Multi-Sport</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Format</label>
                    <input
                      type="text"
                      value={newFormat}
                      onChange={(e) => setNewFormat(e.target.value)}
                      className="w-full px-3 py-2 bg-[#161D26] border border-[#2A3747] rounded-lg text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Team Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Bandra All-Stars"
                      value={newTeam}
                      onChange={(e) => setNewTeam(e.target.value)}
                      className="w-full px-3 py-2 bg-[#161D26] border border-[#2A3747] rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Captain Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sahil R."
                      value={newCaptain}
                      onChange={(e) => setNewCaptain(e.target.value)}
                      className="w-full px-3 py-2 bg-[#161D26] border border-[#2A3747] rounded-lg text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98000 00000"
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-[#161D26] border border-[#2A3747] rounded-lg text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Spots Needed</label>
                    <input
                      type="number"
                      min={1}
                      max={14}
                      value={newSpots}
                      onChange={(e) => setNewSpots(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-[#161D26] border border-[#2A3747] rounded-lg text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Date</label>
                    <input
                      type="text"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      placeholder="e.g. Tonight or Tomorrow"
                      className="w-full px-3 py-2 bg-[#161D26] border border-[#2A3747] rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Time Slot</label>
                    <input
                      type="text"
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                      placeholder="e.g. 21:00 - 22:00"
                      className="w-full px-3 py-2 bg-[#161D26] border border-[#2A3747] rounded-lg text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Details & Message</label>
                  <textarea
                    rows={2}
                    placeholder="Provide details on level, requirements, or whether you need a full opponent team..."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full px-3 py-2 bg-[#161D26] border border-[#2A3747] rounded-lg text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 text-xs font-black uppercase text-black bg-[#FFE500] hover:bg-[#F2D900] rounded-xl transition-all cursor-pointer shadow-lg mt-2"
                >
                  Publish Challenge
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
