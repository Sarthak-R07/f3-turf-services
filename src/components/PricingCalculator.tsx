import React, { useState } from 'react';
import { ARENAS } from '../data/mockTurfData';
import { Check, HelpCircle, Phone, Mail, Send, Sparkles } from 'lucide-react';

interface PricingCalculatorProps {
  onBookPitch: (arenaId: string) => void;
}

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({ onBookPitch }) => {
  const [corporateModalOpen, setCorporateModalOpen] = useState(false);
  const [corpName, setCorpName] = useState('');
  const [corpEmail, setCorpEmail] = useState('');
  const [corpSlots, setCorpSlots] = useState('Monthly Season Pass (4 matches/month)');
  const [corpSubmitted, setCorpSubmitted] = useState(false);

  const handleCorpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!corpName.trim() || !corpEmail.trim()) return;
    setCorpSubmitted(true);
    setTimeout(() => {
      setCorpSubmitted(false);
      setCorporateModalOpen(false);
      setCorpName('');
      setCorpEmail('');
    }, 2000);
  };

  return (
    <section id="pricing-section" className="py-20 bg-[#0B0F14] border-b border-[#1E252F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFE500] mb-2">
            <span>Transparent Pricing</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span>No Hidden Surcharges</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white uppercase tracking-tight">
            Hourly Rates & Plans
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Book on-demand or subscribe to a monthly season slot to lock in your squad's prime floodlit hour every week.
          </p>
        </div>

        {/* Pricing Matrix Table */}
        <div className="bg-[#10151C] border border-[#212A36] rounded-2xl overflow-hidden shadow-xl mb-12">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#1F2732] bg-[#141A23] text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  <th className="py-4 px-6">Arena Specification</th>
                  <th className="py-4 px-6">Off-Peak (06:00 - 16:00)</th>
                  <th className="py-4 px-6 text-[#FFE500]">Prime Lights (16:00 - 02:00)</th>
                  <th className="py-4 px-6">Weekend Prime</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1B232D] text-sm">
                {ARENAS.map((arena) => (
                  <tr key={arena.id} className="hover:bg-[#151C25] transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-display font-bold text-white text-base">
                        {arena.name}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {arena.dimensions} · {arena.capacity}
                      </div>
                    </td>
                    <td className="py-4 px-6 font-mono font-medium text-slate-200">
                      ₹{arena.hourlyRateOffPeak}<span className="text-xs text-slate-400">/hr</span>
                    </td>
                    <td className="py-4 px-6 font-mono font-bold text-[#FFE500]">
                      ₹{arena.hourlyRatePeak}<span className="text-xs text-[#FFE500]/70">/hr</span>
                    </td>
                    <td className="py-4 px-6 font-mono font-bold text-white">
                      ₹{arena.hourlyRatePeak + 200}<span className="text-xs text-slate-400">/hr</span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => onBookPitch(arena.id)}
                        className="px-4 py-2 text-xs font-black uppercase text-black bg-[#FFE500] hover:bg-[#F2D900] rounded-lg transition-all cursor-pointer whitespace-nowrap shadow-sm"
                      >
                        Book Slot
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Corporate & Season Passes Banner */}
        <div className="bg-gradient-to-r from-[#141B24] via-[#111720] to-[#141B24] border border-[#263345] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#FFE500] px-2.5 py-1 rounded bg-[#FFE500]/10 border border-[#FFE500]/30 inline-block">
              Corporate & League Packages
            </span>
            <h3 className="font-display font-extrabold text-2xl text-white uppercase tracking-tight">
              Looking For Fixed Weekly Slots or Company Tournaments?
            </h3>
            <p className="text-xs text-slate-400 max-w-xl">
              Lock in your team's Tuesday or Friday 8 PM slot for the whole month at discounted corporate rates. Custom refereeing, digital jerseys, and trophy presentation included.
            </p>
          </div>

          <button
            onClick={() => setCorporateModalOpen(true)}
            className="px-6 py-3.5 text-xs font-black uppercase tracking-wider text-black bg-[#FFE500] hover:bg-[#F2D900] active:scale-95 rounded-xl transition-all shadow-md shrink-0 cursor-pointer"
          >
            Enquire Corporate Package
          </button>
        </div>

        {/* Corporate Package Modal */}
        {corporateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
            <div className="relative w-full max-w-md bg-[#0E131A] border border-[#253040] rounded-2xl shadow-2xl p-6 text-slate-100">
              <div className="flex justify-between items-center pb-3 border-b border-[#212A38] mb-4">
                <h3 className="font-display font-black text-base uppercase text-white">
                  Corporate & Bulk Pass Enquiry
                </h3>
                <button
                  onClick={() => setCorporateModalOpen(false)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {corpSubmitted ? (
                <div className="py-8 text-center space-y-2">
                  <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-white">Enquiry Received!</h4>
                  <p className="text-xs text-slate-400">
                    Our venue manager will contact you within 2 business hours with rate proposals.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleCorpSubmit} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Company / Organization Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Google India / Bandra Tech"
                      value={corpName}
                      onChange={(e) => setCorpName(e.target.value)}
                      className="w-full px-3 py-2 bg-[#161D26] border border-[#2A3747] rounded-lg text-white focus:outline-none focus:border-[#FFE500]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Contact Email / Phone *</label>
                    <input
                      type="text"
                      required
                      placeholder="aditya@company.com or +91 98000 00000"
                      value={corpEmail}
                      onChange={(e) => setCorpEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-[#161D26] border border-[#2A3747] rounded-lg text-white focus:outline-none focus:border-[#FFE500]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Requirement Type</label>
                    <select
                      value={corpSlots}
                      onChange={(e) => setCorpSlots(e.target.value)}
                      className="w-full px-3 py-2 bg-[#161D26] border border-[#2A3747] rounded-lg text-white focus:outline-none"
                    >
                      <option value="Monthly Season Pass (4 matches/month)">Monthly Fixed Season Pass (4 matches/month)</option>
                      <option value="Half-Day Corporate Tournament (8 teams)">Half-Day Corporate Tournament (8 teams)</option>
                      <option value="Full Day Sports Carnival">Full Day Sports Carnival (Football + Box Cricket)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 text-xs font-black uppercase text-black bg-[#FFE500] hover:bg-[#F2D900] rounded-xl transition-all cursor-pointer shadow-lg mt-2"
                  >
                    Submit Package Enquiry
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
