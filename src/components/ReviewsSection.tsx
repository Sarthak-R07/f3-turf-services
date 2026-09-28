import React, { useState } from 'react';
import { REVIEWS } from '../data/mockTurfData';
import { Review, SportType } from '../types/turf';
import { Star, MessageSquarePlus, CheckCircle, X } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);
  const [modalOpen, setModalOpen] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [teamName, setTeamName] = useState('');
  const [sport, setSport] = useState<SportType>('football');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [arenaName, setArenaName] = useState('Colosseum Football Arena');

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      name: authorName.trim(),
      team: teamName.trim() || 'Local Squad',
      sport,
      rating,
      date: 'Just now',
      comment: comment.trim(),
      arenaName
    };

    setReviewsList([newRev, ...reviewsList]);
    setModalOpen(false);
    setAuthorName('');
    setTeamName('');
    setComment('');
  };

  return (
    <section className="py-20 bg-[#090C0F] border-b border-[#1E252F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFE500] mb-2">
              <span>Player Community</span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span>Verified Match Feedback</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white uppercase tracking-tight">
              What Players Say About FB TURF
            </h2>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2.5 text-xs font-bold text-slate-200 bg-[#161D26] hover:bg-[#1E2632] border border-[#2B3747] rounded-xl transition-all flex items-center gap-2 cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#FFE500]" />
            <span>Write A Review</span>
          </button>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#10151C] border border-[#212A36] rounded-2xl p-6 flex flex-col justify-between hover:border-[#FFE500]/40 transition-colors"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rev.rating
                          ? 'fill-[#FFE500] text-[#FFE500]'
                          : 'fill-slate-700 text-slate-700'
                      }`}
                    />
                  ))}
                  <span className="text-[11px] font-mono text-slate-400 ml-2">
                    {rev.date}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author footer */}
              <div className="mt-6 pt-4 border-t border-[#1C2532] flex items-center justify-between">
                <div>
                  <div className="font-display font-bold text-sm text-white flex items-center gap-1.5">
                    <span>{rev.name}</span>
                    <span title="Verified Match Player">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {rev.team} · <span className="text-[#FFE500]">{rev.sport === 'football' ? 'Football' : 'Cricket'}</span>
                  </div>
                </div>

                <span className="text-[10px] text-slate-500 font-mono">
                  {rev.arenaName.split(' ')[0]}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Write Review Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
            <div className="relative w-full max-w-md bg-[#0E131A] border border-[#253040] rounded-2xl shadow-2xl p-6 text-slate-100">
              <div className="flex justify-between items-center pb-3 border-b border-[#212A38] mb-4">
                <h3 className="font-display font-black text-base uppercase text-white">
                  Write A Turf Review
                </h3>
                <button onClick={() => setModalOpen(false)} className="p-1 text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmitReview} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#161D26] border border-[#2A3747] rounded-lg text-white focus:outline-none focus:border-[#FFE500]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Team / Club</label>
                    <input
                      type="text"
                      placeholder="e.g. Strikers FC"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      className="w-full px-3 py-2 bg-[#161D26] border border-[#2A3747] rounded-lg text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Rating</label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-[#161D26] border border-[#2A3747] rounded-lg text-white focus:outline-none"
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ (5/5)</option>
                      <option value={4}>⭐⭐⭐⭐ (4/5)</option>
                      <option value={3}>⭐⭐⭐ (3/5)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Pitch Played On</label>
                  <select
                    value={arenaName}
                    onChange={(e) => setArenaName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#161D26] border border-[#2A3747] rounded-lg text-white focus:outline-none"
                  >
                    <option value="Colosseum Football Arena">Colosseum Football Arena</option>
                    <option value="Thunder Box Cricket Arena">Thunder Box Cricket Arena</option>
                    <option value="All-Star Multi-Sport Cage">All-Star Multi-Sport Cage</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Review Comments *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="How was the turf grass, floodlights, booking ease, and amenities?"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-3 py-2 bg-[#161D26] border border-[#2A3747] rounded-lg text-white focus:outline-none focus:border-[#FFE500]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 text-xs font-black uppercase text-black bg-[#FFE500] hover:bg-[#F2D900] rounded-xl transition-all cursor-pointer shadow-lg mt-2"
                >
                  Publish Review
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
