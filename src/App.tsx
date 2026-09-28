import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SportsSection } from './components/SportsSection';
import { ServicesSection } from './components/ServicesSection';
import { EventsAndTournaments } from './components/EventsAndTournaments';
import { GalleryAndVideo } from './components/GalleryAndVideo';
import { TestimonialsAndFAQ } from './components/TestimonialsAndFAQ';
import { ContactAndFooter } from './components/ContactAndFooter';
import { BookingWizard } from './components/BookingWizard';
import { MobileStickyBar } from './components/MobileStickyBar';
import { Booking, ActivityType, TimeSlotConfig, EventEnquiry } from './types/f3';
import { INITIAL_BOOKINGS, INITIAL_TIME_SLOT_CONFIG } from './data/f3Data';

const LOCAL_STORAGE_BOOKINGS = 'f3_turf_bookings_v1';
const LOCAL_STORAGE_TIMESLOTS = 'f3_turf_timeslots_v1';
const LOCAL_STORAGE_ENQUIRIES = 'f3_turf_enquiries_v1';

export default function App() {
  // Navigation views: 'public' | 'booking'
  const [activeView, setActiveView] = useState<'public' | 'booking'>('public');
  const [selectedBookingSport, setSelectedBookingSport] = useState<ActivityType>('Football');

  // Load Bookings state
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_BOOKINGS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_BOOKINGS;
  });

  // Load TimeSlot config
  const [timeSlotConfig] = useState<TimeSlotConfig>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_TIMESLOTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_TIME_SLOT_CONFIG;
  });

  // Enquiries list
  const [enquiries, setEnquiries] = useState<EventEnquiry[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_ENQUIRIES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Save Bookings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_BOOKINGS, JSON.stringify(bookings));
    } catch (e) {
      console.error(e);
    }
  }, [bookings]);

  // Save TimeSlot config
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_TIMESLOTS, JSON.stringify(timeSlotConfig));
    } catch (e) {
      console.error(e);
    }
  }, [timeSlotConfig]);

  // Save Enquiries
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_ENQUIRIES, JSON.stringify(enquiries));
    } catch (e) {
      console.error(e);
    }
  }, [enquiries]);

  // Check URL hash/path for routing (supports /book)
  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;

      if (path === '/book' || hash === '#book') {
        setActiveView('booking');
      } else {
        setActiveView('public');
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Handlers for switching views
  const handleOpenBooking = (sport: ActivityType = 'Football') => {
    setSelectedBookingSport(sport);
    setActiveView('booking');
    window.location.hash = '#book';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToPublic = () => {
    setActiveView('public');
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToSection = (sectionId: string) => {
    if (activeView !== 'public') {
      setActiveView('public');
      window.location.hash = '';
    }
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Booking updates
  const handleBookingSubmitted = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const handleEnquirySubmitted = (enquiry: EventEnquiry) => {
    setEnquiries((prev) => [enquiry, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] font-body selection:bg-[#FFD900] selection:text-[#050505] relative">
      
      {/* 1. Global Navigation Bar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking('Football')}
        onNavigateToSection={handleNavigateToSection}
        activeView={activeView}
      />

      {/* 2. Main View Switcher */}
      {activeView === 'booking' ? (
        /* COMPLETE MULTI-STEP BOOKING FLOW (Section 10 - 12) */
        <BookingWizard
          initialActivity={selectedBookingSport}
          onBookingSubmitted={handleBookingSubmitted}
          onCloseOrBackHome={handleBackToPublic}
          existingBookings={bookings}
        />
      ) : (
        /* PUBLIC BUSINESS WEBSITE (Sections 5 - 27) */
        <main>
          {/* Section 5 & 6: Hero Section & Trust Bar */}
          <HeroSection
            onOpenBooking={() => handleOpenBooking('Football')}
            onExplore={() => handleNavigateToSection('about')}
          />

          {/* Section 7: About F3 */}
          <AboutSection
            onDiscover={() => handleNavigateToSection('sports')}
          />

          {/* Section 8: Sports Section */}
          <SportsSection
            onSelectSport={(sport) => handleOpenBooking(sport)}
          />

          {/* Section 9: Services Section */}
          <ServicesSection
            onSelectService={(activity) => handleOpenBooking(activity)}
          />

          {/* Section 17, 18, 19, 20: Events, Tournaments, Corporate, Live Screening */}
          <EventsAndTournaments
            onEnquirySubmitted={handleEnquirySubmitted}
          />

          {/* Section 21 & 22: Video Section & Gallery */}
          <GalleryAndVideo />

          {/* Section 23 & 24: Testimonials & FAQ */}
          <TestimonialsAndFAQ />

          {/* Section 25, 26, 27: Contact, Map, & Footer */}
          <ContactAndFooter
            onOpenBooking={() => handleOpenBooking('Football')}
            onNavigateToSection={handleNavigateToSection}
          />
        </main>
      )}

      {/* 3. Sticky Bottom Mobile CTA Bar (Section 36) */}
      <MobileStickyBar
        onOpenBooking={() => handleOpenBooking('Football')}
        show={activeView === 'public'}
      />

    </div>
  );
}
