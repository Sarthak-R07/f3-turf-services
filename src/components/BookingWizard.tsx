import React, { useState, useMemo } from 'react';
import { ActivityType, Booking } from '../types/f3';
import { F3_CONTACT_INFO } from '../data/f3Data';
import { 
  Zap, 
  Shield, 
  Briefcase, 
  Flag, 
  Trophy, 
  Tv, 
  Calendar as CalendarIcon, 
  Clock, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Share2, 
  Download, 
  ArrowLeft,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { F3Logo } from './F3Logo';

interface BookingWizardProps {
  initialActivity?: ActivityType;
  onBookingSubmitted: (booking: Booking) => void;
  onCloseOrBackHome: () => void;
  existingBookings: Booking[];
}

export const BookingWizard: React.FC<BookingWizardProps> = ({
  initialActivity = 'Football',
  onBookingSubmitted,
  onCloseOrBackHome,
  existingBookings
}) => {
  // Wizard steps: 1 to 5, plus 6 for confirmation screen
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form states
  const [selectedActivity, setSelectedActivity] = useState<ActivityType>(initialActivity);
  
  // Date selection: Next 14 days
  const availableDates = useMemo(() => {
    const list = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      const iso = d.toISOString().split('T')[0];
      const dayName = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNumber = d.getDate();
      const monthName = d.toLocaleDateString('en-US', { month: 'short' });
      list.push({ iso, dayName, dayNumber, monthName });
    }
    return list;
  }, []);

  const [selectedDate, setSelectedDate] = useState<string>(availableDates[0].iso);

  // Time Slots 06:00 AM to 02:00 AM
  const timeSlotsList = useMemo(() => {
    return [
      { start: '06:00 AM', end: '07:00 AM' },
      { start: '07:00 AM', end: '08:00 AM' },
      { start: '08:00 AM', end: '09:00 AM' },
      { start: '09:00 AM', end: '10:00 AM' },
      { start: '10:00 AM', end: '11:00 AM' },
      { start: '11:00 AM', end: '12:00 PM' },
      { start: '12:00 PM', end: '01:00 PM' },
      { start: '01:00 PM', end: '02:00 PM' },
      { start: '02:00 PM', end: '03:00 PM' },
      { start: '03:00 PM', end: '04:00 PM' },
      { start: '04:00 PM', end: '05:00 PM' },
      { start: '05:00 PM', end: '06:00 PM' },
      { start: '06:00 PM', end: '07:00 PM' },
      { start: '07:00 PM', end: '08:00 PM' },
      { start: '08:00 PM', end: '09:00 PM' },
      { start: '09:00 PM', end: '10:00 PM' },
      { start: '10:00 PM', end: '11:00 PM' },
      { start: '11:00 PM', end: '12:00 AM' },
      { start: '12:00 AM', end: '01:00 AM' },
      { start: '01:00 AM', end: '02:00 AM' },
    ];
  }, []);

  const [selectedSlot, setSelectedSlot] = useState<{ start: string; end: string } | null>({
    start: '07:00 PM',
    end: '08:00 PM'
  });

  // Check if slot is booked by existing bookings (prevent double booking)
  const isSlotBooked = (start: string) => {
    return existingBookings.some(
      (b) => b.bookingDate === selectedDate && b.startTime === start && b.status !== 'CANCELLED'
    );
  };

  // Customer Details Form
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [players, setPlayers] = useState<number>(10);
  const [specialRequirements, setSpecialRequirements] = useState('');

  // Corporate Specific Details
  const [companyOrganization, setCompanyOrganization] = useState('');
  const [eventType, setEventType] = useState('Corporate Tournament');
  const [expectedParticipants, setExpectedParticipants] = useState<number>(25);

  // Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Confirmation state
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Activity options list
  const activityOptions: { key: ActivityType; title: string; subtitle: string; icon: React.ReactNode }[] = [
    {
      key: 'Football',
      title: 'Football',
      subtitle: '5v5 / 7v7 Turf Match',
      icon: <Zap className="w-5 h-5 text-[#FFD900]" />
    },
    {
      key: 'Box Cricket',
      title: 'Box Cricket',
      subtitle: 'Fast-paced Overs Cage',
      icon: <Shield className="w-5 h-5 text-[#FFD900]" />
    },
    {
      key: 'Corporate Event',
      title: 'Corporate Event',
      subtitle: 'Employee Matches & Retreat',
      icon: <Briefcase className="w-5 h-5 text-[#FFD900]" />
    },
    {
      key: 'Sports Day',
      title: 'Sports Day',
      subtitle: 'Schools & Community Days',
      icon: <Flag className="w-5 h-5 text-[#FFD900]" />
    },
    {
      key: 'Tournament',
      title: 'Tournament',
      subtitle: 'Competitive Cups & Leagues',
      icon: <Trophy className="w-5 h-5 text-[#FFD900]" />
    },
    {
      key: 'Other Event',
      title: 'Other Event',
      subtitle: 'Private Venue Reservation',
      icon: <Tv className="w-5 h-5 text-[#FFD900]" />
    }
  ];

  // Validation
  const validateStep4 = () => {
    const newErrors: Record<string, string> = {};
    if (!customerName.trim()) {
      newErrors.customerName = 'Full Name is required';
    }

    // Clean Indian phone validation (10 digits, optional +91)
    const cleanedPhone = phone.replace(/[\s-]/g, '');
    const phoneRegex = /^(\+91)?[6789]\d{9}$/;
    if (!phone.trim()) {
      newErrors.phone = 'Mobile Number is required';
    } else if (!phoneRegex.test(cleanedPhone)) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (!email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!players || players < 1) {
      newErrors.players = 'Number of players must be at least 1';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      if (!selectedSlot) {
        alert('Please select an available time slot');
        return;
      }
      setCurrentStep(4);
    } else if (currentStep === 4) {
      if (validateStep4()) {
        setCurrentStep(5);
      }
    }
  };

  const handleConfirmBooking = () => {
    if (!selectedSlot) return;

    const randomRef = `F3-${Math.floor(100000 + Math.random() * 900000)}`;
    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      bookingReference: randomRef,
      customerName: customerName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      activity: selectedActivity,
      bookingDate: selectedDate,
      startTime: selectedSlot.start,
      endTime: selectedSlot.end,
      players: Number(players) || 10,
      specialRequirements: specialRequirements.trim() || undefined,
      companyOrganization: companyOrganization.trim() || undefined,
      eventType: eventType.trim() || undefined,
      expectedParticipants: Number(expectedParticipants) || undefined,
      status: 'PENDING', // STRICT REQUIREMENT: Initial status is "Booking Request Received", NOT "Payment Confirmed"
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FFD900', '#FFFFFF', '#050505']
      });
    } catch (e) {
      // Ignored
    }

    setConfirmedBooking(newBooking);
    onBookingSubmitted(newBooking);
    setCurrentStep(6);
  };

  const isCorporateOrEvent = 
    selectedActivity === 'Corporate Event' || 
    selectedActivity === 'Sports Day' || 
    selectedActivity === 'Tournament';

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Top Breadcrumb & Return to Home */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#1E1E1E]">
          <button
            onClick={onCloseOrBackHome}
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#FFD900]" />
            <span>Back to F3 Home</span>
          </button>

          <div className="flex items-center gap-2">
            <F3Logo size="sm" variant="minimal" />
            <span className="font-heading font-extrabold text-xs tracking-wider uppercase text-white">
              F3 SLOT RESERVATION
            </span>
          </div>
        </div>

        {/* Wizard Step Progress (Steps 1 to 5) */}
        {currentStep <= 5 && (
          <div className="mb-10">
            <div className="flex items-center justify-between text-[11px] font-heading font-bold uppercase tracking-wider text-slate-400 mb-2">
              <span className={currentStep === 1 ? 'text-[#FFD900]' : ''}>1. Activity</span>
              <span className={currentStep === 2 ? 'text-[#FFD900]' : ''}>2. Date</span>
              <span className={currentStep === 3 ? 'text-[#FFD900]' : ''}>3. Time Slot</span>
              <span className={currentStep === 4 ? 'text-[#FFD900]' : ''}>4. Details</span>
              <span className={currentStep === 5 ? 'text-[#FFD900]' : ''}>5. Summary</span>
            </div>

            <div className="w-full bg-[#181818] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#FFD900] h-full transition-all duration-300"
                style={{ width: `${(currentStep / 5) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* STEP 1: SELECT ACTIVITY */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs font-heading font-bold text-[#FFD900] uppercase tracking-wider">
                STEP 1 OF 5
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white uppercase tracking-tight mt-1">
                SELECT YOUR SPORT OR EVENT
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Choose the primary sporting activity or event format for your booking.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {activityOptions.map((opt) => {
                const isSelected = selectedActivity === opt.key;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setSelectedActivity(opt.key)}
                    className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#121212] border-[#FFD900] ring-2 ring-[#FFD900] shadow-[0_0_20px_rgba(255,217,0,0.15)]'
                        : 'bg-[#0D0D0D] border-[#222222] hover:border-[#383838] hover:bg-[#141414]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#181818] flex items-center justify-center border border-[#2B2B2B]">
                        {opt.icon}
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-[#FFD900] bg-[#FFD900] text-black' : 'border-[#333333]'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>

                    <div>
                      <div className="font-heading font-extrabold text-base text-white uppercase tracking-tight">
                        {opt.title}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {opt.subtitle}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-6 flex justify-end">
              <button
                onClick={handleNextStep}
                className="px-7 py-3.5 text-xs font-heading font-extrabold uppercase tracking-wider text-black bg-[#FFD900] hover:bg-[#E6C400] active:scale-95 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>CONTINUE TO DATE</span>
                <ChevronRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SELECT DATE */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs font-heading font-bold text-[#FFD900] uppercase tracking-wider">
                STEP 2 OF 5
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white uppercase tracking-tight mt-1">
                CHOOSE MATCH DATE
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Booking schedule open for the next 14 days.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
              {availableDates.map((item) => {
                const isSelected = selectedDate === item.iso;
                return (
                  <button
                    key={item.iso}
                    type="button"
                    onClick={() => setSelectedDate(item.iso)}
                    className={`py-4 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#FFD900] text-black border-[#FFD900] font-bold shadow-lg scale-102'
                        : 'bg-[#0D0D0D] text-slate-200 border-[#222222] hover:border-[#383838] hover:bg-[#141414]'
                    }`}
                  >
                    <div className={`text-[11px] uppercase font-heading font-bold ${
                      isSelected ? 'text-black/80' : 'text-slate-400'
                    }`}>
                      {item.dayName}
                    </div>
                    <div className="text-2xl font-heading font-extrabold my-1">
                      {item.dayNumber}
                    </div>
                    <div className={`text-[10px] ${isSelected ? 'text-black/70' : 'text-slate-500'}`}>
                      {item.monthName}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-8 flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-5 py-3 text-xs font-semibold text-slate-400 hover:text-white bg-[#111111] border border-[#222222] rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                onClick={handleNextStep}
                className="px-7 py-3.5 text-xs font-heading font-extrabold uppercase tracking-wider text-black bg-[#FFD900] hover:bg-[#E6C400] active:scale-95 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>CHOOSE TIME SLOT</span>
                <ChevronRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SELECT TIME SLOT */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto mb-6">
              <span className="text-xs font-heading font-bold text-[#FFD900] uppercase tracking-wider">
                STEP 3 OF 5
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white uppercase tracking-tight mt-1">
                SELECT TIME SLOT
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Hourly slots for {selectedActivity} on <span className="text-[#FFD900] font-mono">{selectedDate}</span>.
              </p>
            </div>

            {/* Architecture note: Configurable mock availability banner */}
            <div className="p-3.5 rounded-xl bg-[#0F0F0F] border border-[#242424] flex items-center gap-2.5 text-xs text-slate-400">
              <HelpCircle className="w-4 h-4 text-[#FFD900] shrink-0" />
              <span>
                <strong>Slot Availability Status:</strong> Real-time booking slots are synchronized with the F3 admin calendar. Slots shown as unavailable are currently blocked or reserved.
              </span>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 text-xs text-slate-400 justify-end">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#161616] border border-[#333333]" />
                Available
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-black border-2 border-[#FFD900]" />
                Selected
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#121212] border border-red-950 text-red-500 opacity-60" />
                Unavailable
              </span>
            </div>

            {/* Slots Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {timeSlotsList.map((slot) => {
                const booked = isSlotBooked(slot.start);
                const isSelected = selectedSlot?.start === slot.start;

                return (
                  <button
                    key={slot.start}
                    type="button"
                    disabled={booked}
                    onClick={() => setSelectedSlot(slot)}
                    className={`p-3.5 rounded-xl border text-center transition-all ${
                      booked
                        ? 'bg-[#121212] border-[#222222] text-slate-600 cursor-not-allowed opacity-50'
                        : isSelected
                        ? 'bg-black border-2 border-[#FFD900] text-white shadow-[0_0_15px_rgba(255,217,0,0.25)] ring-1 ring-[#FFD900] cursor-pointer'
                        : 'bg-[#0E0E0E] border-[#222222] text-slate-200 hover:border-[#FFD900]/50 hover:bg-[#141414] cursor-pointer'
                    }`}
                  >
                    <div className="text-xs font-mono font-bold">
                      {slot.start}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      to {slot.end}
                    </div>
                    <div className="mt-2 pt-1 border-t border-white/5 text-[9px] uppercase font-bold tracking-wider">
                      {booked ? (
                        <span className="text-red-400">Unavailable</span>
                      ) : isSelected ? (
                        <span className="text-[#FFD900]">Selected</span>
                      ) : (
                        <span className="text-slate-400">Open Slot</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-8 flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-5 py-3 text-xs font-semibold text-slate-400 hover:text-white bg-[#111111] border border-[#222222] rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                onClick={handleNextStep}
                disabled={!selectedSlot}
                className="px-7 py-3.5 text-xs font-heading font-extrabold uppercase tracking-wider text-black bg-[#FFD900] hover:bg-[#E6C400] disabled:bg-slate-700 disabled:text-slate-400 active:scale-95 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>ENTER DETAILS</span>
                <ChevronRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: CUSTOMER DETAILS */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto mb-6">
              <span className="text-xs font-heading font-bold text-[#FFD900] uppercase tracking-wider">
                STEP 4 OF 5
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white uppercase tracking-tight mt-1">
                PLAYER & CONTACT INFORMATION
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Please provide valid contact details to receive your F3 Booking Reference ID.
              </p>
            </div>

            <div className="bg-[#0E0E0E] border border-[#222222] rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Aryan Sonawane"
                    value={customerName}
                    onChange={(e) => {
                      setCustomerName(e.target.value);
                      if (errors.customerName) setErrors({ ...errors, customerName: '' });
                    }}
                    className={`w-full px-3.5 py-2.5 text-xs bg-[#141414] border rounded-xl text-white focus:outline-none transition-colors ${
                      errors.customerName ? 'border-red-500' : 'border-[#2A2A2A] focus:border-[#FFD900]'
                    }`}
                  />
                  {errors.customerName && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.customerName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Mobile Number (10-digit Indian Number) *
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 98201 23456"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors({ ...errors, phone: '' });
                    }}
                    className={`w-full px-3.5 py-2.5 text-xs font-mono bg-[#141414] border rounded-xl text-white focus:outline-none transition-colors ${
                      errors.phone ? 'border-red-500' : 'border-[#2A2A2A] focus:border-[#FFD900]'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. captain@sports.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    className={`w-full px-3.5 py-2.5 text-xs bg-[#141414] border rounded-xl text-white focus:outline-none transition-colors ${
                      errors.email ? 'border-red-500' : 'border-[#2A2A2A] focus:border-[#FFD900]'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Number of Players *
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={60}
                    value={players}
                    onChange={(e) => setPlayers(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-xs font-mono bg-[#141414] border border-[#2A2A2A] focus:border-[#FFD900] rounded-xl text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Corporate Specific Additional Fields */}
              {isCorporateOrEvent && (
                <div className="pt-4 border-t border-[#1C1C1C] space-y-4">
                  <div className="text-xs font-heading font-bold text-[#FFD900] uppercase tracking-wider">
                    Corporate / Event Specifics
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-300 mb-1">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Tech Solutions Pvt Ltd"
                        value={companyOrganization}
                        onChange={(e) => setCompanyOrganization(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-[#141414] border border-[#2A2A2A] focus:border-[#FFD900] rounded-xl text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-300 mb-1">
                        Event Type
                      </label>
                      <input
                        type="text"
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-[#141414] border border-[#2A2A2A] focus:border-[#FFD900] rounded-xl text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-300 mb-1">
                        Expected Participants
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={expectedParticipants}
                        onChange={(e) => setExpectedParticipants(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 text-xs font-mono bg-[#141414] border border-[#2A2A2A] focus:border-[#FFD900] rounded-xl text-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Special Requirements (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Need football bibs, cricket bats/stumps, sound system, referee, etc."
                  value={specialRequirements}
                  onChange={(e) => setSpecialRequirements(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-[#141414] border border-[#2A2A2A] focus:border-[#FFD900] rounded-xl text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-6 flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(3)}
                className="px-5 py-3 text-xs font-semibold text-slate-400 hover:text-white bg-[#111111] border border-[#222222] rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                onClick={handleNextStep}
                className="px-7 py-3.5 text-xs font-heading font-extrabold uppercase tracking-wider text-black bg-[#FFD900] hover:bg-[#E6C400] active:scale-95 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>REVIEW SUMMARY</span>
                <ChevronRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: BOOKING SUMMARY */}
        {currentStep === 5 && selectedSlot && (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto mb-6">
              <span className="text-xs font-heading font-bold text-[#FFD900] uppercase tracking-wider">
                STEP 5 OF 5
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white uppercase tracking-tight mt-1">
                REVIEW & CONFIRM BOOKING
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Verify your slot reservation details before submitting your request.
              </p>
            </div>

            {/* Summary Card */}
            <div className="bg-[#0D0D0D] border-2 border-[#262626] rounded-2xl p-6 sm:p-8 space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#1E1E1E]">
                <div className="flex items-center gap-3">
                  <F3Logo size="sm" variant="minimal" />
                  <div>
                    <div className="font-heading font-extrabold text-lg text-white uppercase">
                      {selectedActivity}
                    </div>
                    <div className="text-xs text-slate-400">
                      F3 Turf Services Match Slot
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Status Upon Request</div>
                  <div className="text-xs font-heading font-bold text-[#FFD900]">
                    Booking Request Received
                  </div>
                </div>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-[#141414] p-3.5 rounded-xl border border-[#222222]">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Match Date</span>
                  <div className="font-heading font-bold text-white text-sm mt-0.5">{selectedDate}</div>
                </div>

                <div className="bg-[#141414] p-3.5 rounded-xl border border-[#222222]">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Time Slot</span>
                  <div className="font-mono font-bold text-[#FFD900] text-sm mt-0.5">
                    {selectedSlot.start} – {selectedSlot.end}
                  </div>
                </div>

                <div className="bg-[#141414] p-3.5 rounded-xl border border-[#222222]">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Customer / Organizer</span>
                  <div className="font-heading font-bold text-white text-sm mt-0.5">{customerName}</div>
                  <div className="text-slate-400 text-[11px] font-mono mt-0.5">{phone} · {email}</div>
                </div>

                <div className="bg-[#141414] p-3.5 rounded-xl border border-[#222222]">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Players / Attendees</span>
                  <div className="font-heading font-bold text-white text-sm mt-0.5">{players} Players</div>
                  {companyOrganization && (
                    <div className="text-slate-400 text-[11px] mt-0.5">{companyOrganization}</div>
                  )}
                </div>
              </div>

              {specialRequirements && (
                <div className="p-3.5 rounded-xl bg-[#141414] border border-[#222222] text-xs">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">
                    Special Requirements:
                  </span>
                  <p className="text-slate-300">{specialRequirements}</p>
                </div>
              )}

              {/* Strict Disclaimer Notice */}
              <div className="p-3.5 rounded-xl bg-[#161616] border border-[#2A2A2A] text-xs text-slate-400 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-[#FFD900] shrink-0 mt-0.5" />
                <span>
                  By confirming, your request will be recorded with status <strong className="text-white">Booking Request Received</strong>. The F3 front desk will contact you via WhatsApp / Phone to confirm payment and entry requirements.
                </span>
              </div>
            </div>

            <div className="pt-6 flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(4)}
                className="px-5 py-3 text-xs font-semibold text-slate-400 hover:text-white bg-[#111111] border border-[#222222] rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                onClick={handleConfirmBooking}
                className="px-8 py-4 text-xs sm:text-sm font-heading font-black uppercase tracking-wider text-black bg-[#FFD900] hover:bg-[#E6C400] active:scale-95 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(255,217,0,0.35)]"
              >
                <span>CONFIRM BOOKING</span>
                <Check className="w-4 h-4 text-black stroke-[3]" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: BOOKING CONFIRMATION SCREEN (Section 11) */}
        {currentStep === 6 && confirmedBooking && (
          <div className="space-y-8 text-center max-w-2xl mx-auto py-8">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <div className="text-xs font-heading font-bold text-emerald-400 uppercase tracking-widest mb-1">
                SUBMISSION SUCCESSFUL
              </div>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white uppercase tracking-tight">
                BOOKING REQUEST RECEIVED
              </h2>
              <p className="text-sm text-slate-400 mt-2">
                "Thanks for choosing F3 Turf Services."
              </p>
            </div>

            {/* Official Confirmation Card */}
            <div className="bg-[#0E0E0E] border-2 border-dashed border-[#FFD900]/50 rounded-2xl p-6 sm:p-8 text-left space-y-4">
              <div className="flex justify-between items-start pb-4 border-b border-[#222222]">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Booking ID</div>
                  <div className="text-2xl font-mono font-black text-[#FFD900]">
                    {confirmedBooking.bookingReference}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Status</div>
                  <span className="inline-block mt-0.5 px-2.5 py-1 text-[11px] font-heading font-bold uppercase rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    Booking Request Received
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs py-2">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">Activity</span>
                  <div className="font-heading font-bold text-white text-sm mt-0.5">
                    {confirmedBooking.activity}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">Match Date</span>
                  <div className="font-heading font-bold text-white text-sm mt-0.5">
                    {confirmedBooking.bookingDate}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">Time Slot</span>
                  <div className="font-mono font-bold text-[#FFD900] text-sm mt-0.5">
                    {confirmedBooking.startTime} – {confirmedBooking.endTime}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">Customer</span>
                  <div className="font-heading font-bold text-white text-sm mt-0.5">
                    {confirmedBooking.customerName}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">Phone</span>
                  <div className="font-mono text-slate-300 mt-0.5">
                    {confirmedBooking.phone}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">Players</span>
                  <div className="font-heading font-bold text-white mt-0.5">
                    {confirmedBooking.players}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#222222] text-[11px] text-slate-400 flex items-center justify-between">
                <span>Venue Desk: {F3_CONTACT_INFO.phoneDisplay}</span>
                <span>F3 Turf Services</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-5 py-3 text-xs font-heading font-bold uppercase tracking-wider text-slate-200 bg-[#161616] hover:bg-[#202020] border border-[#2A2A2A] rounded-xl flex items-center gap-2 cursor-pointer transition-colors"
              >
                <Download className="w-4 h-4 text-[#FFD900]" />
                <span>DOWNLOAD CONFIRMATION</span>
              </button>

              <a
                href={`https://wa.me/${F3_CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
                  `Hi F3 Turf Services! I have submitted a booking request:\n` +
                  `Booking ID: ${confirmedBooking.bookingReference}\n` +
                  `Activity: ${confirmedBooking.activity}\n` +
                  `Date: ${confirmedBooking.bookingDate}\n` +
                  `Time: ${confirmedBooking.startTime} - ${confirmedBooking.endTime}\n` +
                  `Name: ${confirmedBooking.customerName}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 text-xs font-heading font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl flex items-center gap-2 cursor-pointer transition-colors shadow-md"
              >
                <Share2 className="w-4 h-4" />
                <span>WHATSAPP F3</span>
              </a>

              <button
                onClick={onCloseOrBackHome}
                className="px-6 py-3 text-xs font-heading font-bold uppercase tracking-wider text-black bg-[#FFD900] hover:bg-[#E6C400] rounded-xl cursor-pointer transition-colors shadow-md"
              >
                BACK TO HOME
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
