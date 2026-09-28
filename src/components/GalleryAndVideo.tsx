import React, { useState } from 'react';
import { MediaPlaceholder } from './MediaPlaceholder';
import { INITIAL_GALLERY } from '../data/f3Data';

export const GalleryAndVideo: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Turf', 'Football', 'Box Cricket', 'Events', 'Tournaments', 'Screening'];

  const filteredGallery = INITIAL_GALLERY.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  return (
    <div id="gallery">
      {/* SECTION 21: GALLERY */}
      <section className="py-20 bg-[#080808] border-b border-[#1E1E1E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-heading font-bold text-[#FFD900] uppercase tracking-wider mb-2">
              FACILITY & MATCH ARCHIVE
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white uppercase tracking-tight">
              F3 TURF GALLERY
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-slate-400">
              Clean media placeholders ready for official F3 Turf photos and tournament moments.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-heading font-bold uppercase rounded-lg transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#FFD900] text-black shadow-md'
                    : 'text-slate-400 hover:text-white bg-[#111111] border border-[#222222]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry-Style Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                className="bg-[#0D0D0D] border border-[#222222] rounded-2xl p-4 flex flex-col justify-between group hover:border-[#FFD900]/40 transition-colors"
              >
                <MediaPlaceholder
                  type="image"
                  aspectRatio={item.aspectRatio}
                  label={item.placeholderLabel}
                  sublabel={`Category: ${item.category}`}
                  className="mb-3"
                />

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="font-heading font-bold text-white uppercase tracking-tight">
                    {item.title}
                  </span>
                  <span className="text-[10px] font-mono text-[#FFD900] uppercase">
                    {item.category}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};
