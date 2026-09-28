import React, { useState } from 'react';
import { FAQ_LIST } from '../data/f3Data';
import { ChevronDown, MessageSquareQuote, ShieldAlert } from 'lucide-react';

export const TestimonialsAndFAQ: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="space-y-0">
      
      {/* SECTION 23: TESTIMONIALS (Section 23 - Strict Rule: Do not invent customer testimonials) */}
      <section className="py-20 bg-[#050505] border-b border-[#1E1E1E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-heading font-bold text-[#FFD900] uppercase tracking-wider mb-2">
              PLAYER VOICES
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white uppercase tracking-tight">
              COMMUNITY EXPERIENCES
            </h2>
            <p className="mt-2 text-xs text-slate-400">
              "Customer experiences will appear here."
            </p>
          </div>

          {/* Clean Professional Empty Testimonial Placeholders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className="bg-[#0D0D0D] border border-dashed border-[#262626] rounded-2xl p-6 flex flex-col justify-between text-left"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-[#141414] border border-[#2B2B2B] flex items-center justify-center text-[#FFD900] mb-4">
                    <MessageSquareQuote className="w-5 h-5" />
                  </div>
                  <p className="text-xs text-slate-400 italic leading-relaxed">
                    "Customer experiences will appear here once verified match player feedback is connected."
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#1C1C1C] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#181818] border border-[#2A2A2A]" />
                    <span className="text-[11px] font-heading font-bold text-slate-400">
                      Player Review Placeholder {num}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#777777]">F3 Turf</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 24: FAQ */}
      <section className="py-20 bg-[#080808] border-b border-[#1E1E1E]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <div className="text-xs font-heading font-bold text-[#FFD900] uppercase tracking-wider mb-2">
              HELP & QUESTIONS
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white uppercase tracking-tight">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="mt-2 text-xs text-slate-400">
              Clear, factual answers regarding F3 booking, sports, and venue facilities.
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_LIST.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#0D0D0D] border border-[#222222] rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-heading font-bold text-sm text-white uppercase tracking-tight">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#FFD900] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-[#1C1C1C] pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
};
