import React, { useState, useEffect } from 'react';
import { F3Logo } from './F3Logo';
import { Menu, X, Calendar, Phone } from 'lucide-react';
import { F3_CONTACT_INFO } from '../data/f3Data';

interface NavbarProps {
  onOpenBooking: () => void;
  onNavigateToSection: (sectionId: string) => void;
  activeView: 'public' | 'booking';
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onNavigateToSection,
  activeView
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Sports', id: 'sports' },
    { label: 'Facilities', id: 'facilities' },
    { label: 'Events', id: 'events' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigateToSection(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || activeView !== 'public'
          ? 'bg-[#050505]/95 backdrop-blur-md border-b border-[#1E1E1E] shadow-xl py-3.5'
          : 'bg-gradient-to-b from-[#050505]/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: F3 Logo */}
        <button
          onClick={() => handleNavClick('hero')}
          className="cursor-pointer text-left focus:outline-none"
        >
          <F3Logo size="md" variant="horizontal" />
        </button>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-300">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.id)}
              className="hover:text-[#FFD900] transition-colors cursor-pointer py-1"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 text-xs font-heading font-extrabold uppercase tracking-wider text-black bg-[#FFD900] hover:bg-[#E6C400] active:scale-95 rounded-lg transition-all shadow-[0_0_20px_rgba(255,217,0,0.25)] flex items-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <Calendar className="w-4 h-4 text-black stroke-[2.5]" />
            <span>BOOK A SLOT</span>
          </button>
        </div>

        {/* Mobile quick controls */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={onOpenBooking}
            className="px-3.5 py-2 text-[11px] font-heading font-extrabold uppercase text-black bg-[#FFD900] rounded-lg cursor-pointer"
          >
            Book Slot
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-200 hover:text-[#FFD900] bg-[#111111] border border-[#222222] rounded-lg"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0A0A] border-b border-[#222222] px-4 pt-3 pb-6 space-y-3 mt-2">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.id)}
                className="text-left px-3 py-2 text-sm font-medium text-slate-200 hover:text-[#FFD900] hover:bg-[#161616] rounded-md transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#222222] flex flex-col gap-2">
            <a
              href={`tel:${F3_CONTACT_INFO.phoneRaw}`}
              className="w-full py-2.5 px-3 text-xs font-semibold text-slate-300 bg-[#141414] border border-[#2A2A2A] rounded-lg flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                Call Desk: {F3_CONTACT_INFO.phoneDisplay}
              </span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
