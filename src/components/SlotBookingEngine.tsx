import React, { useState, useMemo } from 'react';
import { ARENAS, ADD_ONS } from '../data/mockTurfData';
import { Arena, AddOnOption, SportType, Slot } from '../types/turf';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Check, 
  AlertCircle, 
  Zap, 
  Plus, 
  Minus, 
  ShieldCheck, 
  Sparkles,
  Info,
  ChevronRight,
  Flame
} from 'lucide-react';

interface SlotBookingEngineProps {
  selectedArenaId: string;
  onSelectArena: (id: string) => void;
  onInitiateBooking: (bookingDetails: {
    arena: Arena;
    date: string;
    selectedSlots: string[];
    selectedAddOns: AddOnOption[];
    totalAmount: number;
  }) => void;
  bookedSlotsByDateArena: Record<string, string[]>; // e.g. "pitch-1_2026-09-28": ["19:00 - 20:00"]
}

export const SlotBookingEngine: React.FC<SlotBookingEngineProps> = ({
  selectedArenaId,
  onSelectArena,
  onInitiateBooking,
  bookedSlotsByDateArena
}) => {
  // Generate next 7 days
  const today = useMemo(() => new Date(), []);
  
  const dateOptions = useMemo(() => {
    const list = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      const iso = d.toISOString().split('T')[0];
      const dayName = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNum = d.getDate();
      const monthName = d.toLocaleDateString('en-US', { month: 'short' });
      list.push({ iso, dayName, dayNum, monthName, isWeekend: d.getDay() === 0 || d.getDay() === 6 });
    }
    return list;
  }, [today]);

  const [selectedDate, setSelectedDate] = useState<string>(dateOptions[0].iso);
  const [timeCategoryFilter, setTimeCategoryFilter] = useState<'all' | 'morning' | 'afternoon' | 'evening' | 'night'>('all');
  const [selectedSlotTimes, setSelectedSlotTimes] = useState<string[]>([]);
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);

  const currentArena = useMemo(() => {
    return ARENAS.find((a) => a.id === selectedArenaId) || ARENAS[0];
  }, [selectedArenaId]);

  // Hourly slots from 06:00 AM to 02:00 AM
  const allSlots = useMemo(() => {
    const rawTimes = [
      { start: '06:00', end: '07:00', category: 'morning', isPeak: false },
      { start: '07:00', end: '08:00', category: 'morning', isPeak: false },
      { start: '08:00', end: '09:00', category: 'morning', isPeak: false },
      { start: '09:00', end: '10:00', category: 'morning', isPeak: false },
      { start: '10:00', end: '11:00', category: 'morning', isPeak: false },
      { start: '11:00', end: '12:00', category: 'morning', isPeak: false },
      { start: '12:00', end: '13:00', category: 'afternoon', isPeak: false },
      { start: '13:00', end: '14:00', category: 'afternoon', isPeak: false },
      { start: '14:00', end: '15:00', category: 'afternoon', isPeak: false },
      { start: '15:00', end: '16:00', category: 'afternoon', isPeak: false },
      { start: '16:00', end: '17:00', category: 'evening', isPeak: true },
      { start: '17:00', end: '18:00', category: 'evening', isPeak: true },
      { start: '18:00', end: '19:00', category: 'evening', isPeak: true },
      { start: '19:00', end: '20:00', category: 'evening', isPeak: true },
      { start: '20:00', end: '21:00', category: 'evening', isPeak: true },
      { start: '21:00', end: '22:00', category: 'night', isPeak: true },
      { start: '22:00', end: '23:00', category: 'night', isPeak: true },
      { start: '23:00', end: '00:00', category: 'night', isPeak: true },
      { start: '00:00', end: '01:00', category: 'night', isPeak: true },
      { start: '01:00', end: '02:00', category: 'night', isPeak: false },
    ];

    // Seed preset booked slots for realistic schedule
    const bookedKey = `${currentArena.id}_${selectedDate}`;
    const dynamicallyBooked = bookedSlotsByDateArena[bookedKey] || [];

    // Static popular bookings on specific hours
    const staticBookedTimes = ['19:00 - 20:00', '21:00 - 22:00'];

    return rawTimes.map((item) => {
      const label = `${item.start} - ${item.end}`;
      const isBooked = dynamicallyBooked.includes(label) || staticBookedTimes.includes(label);
      const isFillingFast = !isBooked && (item.start === '20:00' || item.start === '18:00');
      const rate = item.isPeak ? currentArena.hourlyRatePeak : currentArena.hourlyRateOffPeak;

      return {
        id: `${currentArena.id}_${selectedDate}_${item.start}`,
        arenaId: currentArena.id,
        date: selectedDate,
        startTime: item.start,
        endTime: item.end,
        label,
        timeCategory: item.category as 'morning' | 'afternoon' | 'evening' | 'night',
        price: rate,
        isPeak: item.isPeak,
        isBooked,
        isFillingFast
      };
    });
  }, [currentArena, selectedDate, bookedSlotsByDateArena]);

  // Filter slots
  const filteredSlots = useMemo(() => {
    if (timeCategoryFilter === 'all') return allSlots;
    return allSlots.filter((s) => s.timeCategory === timeCategoryFilter);
  }, [allSlots, timeCategoryFilter]);

  // Toggle slot selection
  const handleToggleSlot = (slotLabel: string, isBooked: boolean) => {
    if (isBooked) return;
    if (selectedSlotTimes.includes(slotLabel)) {
      setSelectedSlotTimes(selectedSlotTimes.filter((t) => t !== slotLabel));
    } else {
      setSelectedSlotTimes([...selectedSlotTimes, slotLabel]);
    }
  };

  // Toggle add-on
  const handleToggleAddOn = (addonId: string) => {
    if (selectedAddOnIds.includes(addonId)) {
      setSelectedAddOnIds(selectedAddOnIds.filter((id) => id !== addonId));
    } else {
      setSelectedAddOnIds([...selectedAddOnIds, addonId]);
    }
  };

  // Pricing calculations
  const slotsSubtotal = useMemo(() => {
    let sum = 0;
    selectedSlotTimes.forEach((timeLabel) => {
      const matched = allSlots.find((s) => s.label === timeLabel);
      if (matched) sum += matched.price;
    });
    return sum;
  }, [selectedSlotTimes, allSlots]);

  const addOnsSubtotal = useMemo(() => {
    return selectedAddOnIds.reduce((sum, id) => {
      const addon = ADD_ONS.find((a) => a.id === id);
      return sum + (addon ? addon.price : 0);
    }, 0);
  }, [selectedAddOnIds]);

  const totalAmount = slotsSubtotal + addOnsSubtotal;

  const handleBookNow = () => {
    if (selectedSlotTimes.length === 0) return;
    const chosenAddOns = ADD_ONS.filter((a) => selectedAddOnIds.includes(a.id));
    onInitiateBooking({
      arena: currentArena,
      date: selectedDate,
      selectedSlots: selectedSlotTimes,
      selectedAddOns: chosenAddOns,
      totalAmount
    });
  };

  return (
    <section id="booking-section" className="py-20 bg-[#090C0F] border-b border-[#1E252F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFE500] mb-2">
              <span>Interactive Pitch Reservation</span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span>Instant Confirmation</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white uppercase tracking-tight">
              Select Arena & Book Slots
            </h2>
          </div>
          
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-[#161D26] border border-[#2D3848]" />
              Available
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-[#FFE500]" />
              Selected
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-[#1A1616] border border-red-900/50" />
              Booked
            </span>
          </div>
        </div>

        {/* Step 1: Arena Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {ARENAS.map((arena) => {
            const isSelected = arena.id === currentArena.id;
            return (
              <button
                key={arena.id}
                onClick={() => {
                  onSelectArena(arena.id);
                  setSelectedSlotTimes([]); // reset selection when arena changes
                }}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#141B24] border-[#FFE500] shadow-[0_0_20px_rgba(255,229,0,0.15)] ring-1 ring-[#FFE500]'
                    : 'bg-[#0E1217] border-[#1F2732] hover:border-[#354354] hover:bg-[#12171E]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[11px] font-bold uppercase tracking-wider ${
                    arena.sport === 'football' ? 'text-emerald-400' : arena.sport === 'cricket' ? 'text-amber-400' : 'text-cyan-400'
                  }`}>
                    {arena.sport === 'football' ? 'Football Pitch' : arena.sport === 'cricket' ? 'Box Cricket' : 'Multi-Sport'}
                  </span>
                  <span className="text-xs font-mono font-bold text-white">
                    ₹{arena.hourlyRatePeak}<span className="text-[10px] text-slate-400 font-normal">/hr prime</span>
                  </span>
                </div>
                <div className="font-display font-bold text-base text-white tracking-tight">
                  {arena.name}
                </div>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                  <span>{arena.dimensions}</span>
                  <span aria-hidden="true">·</span>
                  <span>{arena.capacity}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Step 2: Date Selector Carousel */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-[#FFE500]" />
              Select Match Date
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Schedule open for next 7 days
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {dateOptions.map((item) => {
              const isSelected = item.iso === selectedDate;
              return (
                <button
                  key={item.iso}
                  onClick={() => {
                    setSelectedDate(item.iso);
                    setSelectedSlotTimes([]);
                  }}
                  className={`py-3 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#FFE500] text-black border-[#FFE500] shadow-md font-bold'
                      : 'bg-[#0E1217] text-slate-300 border-[#1F2732] hover:border-[#354354] hover:bg-[#151B22]'
                  }`}
                >
                  <div className={`text-[11px] uppercase tracking-wide ${isSelected ? 'text-black/80 font-bold' : 'text-slate-400'}`}>
                    {item.dayName}
                  </div>
                  <div className="text-xl font-display font-extrabold my-0.5">
                    {item.dayNum}
                  </div>
                  <div className={`text-[10px] ${isSelected ? 'text-black/70' : 'text-slate-500'}`}>
                    {item.monthName} {item.isWeekend && <span className="text-emerald-500 font-bold">· Wknd</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Time Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-2 rounded-xl bg-[#0E1217] border border-[#1F2732]">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setTimeCategoryFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                timeCategoryFilter === 'all'
                  ? 'bg-[#FFE500] text-black'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              All Slots (20)
            </button>
            <button
              onClick={() => setTimeCategoryFilter('morning')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                timeCategoryFilter === 'morning'
                  ? 'bg-[#FFE500] text-black'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Morning (06:00 - 12:00)
            </button>
            <button
              onClick={() => setTimeCategoryFilter('afternoon')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                timeCategoryFilter === 'afternoon'
                  ? 'bg-[#FFE500] text-black'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Afternoon (12:00 - 16:00)
            </button>
            <button
              onClick={() => setTimeCategoryFilter('evening')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                timeCategoryFilter === 'evening'
                  ? 'bg-[#FFE500] text-black'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Evening Lights (16:00 - 21:00)
            </button>
            <button
              onClick={() => setTimeCategoryFilter('night')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                timeCategoryFilter === 'night'
                  ? 'bg-[#FFE500] text-black'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Late Night (21:00 - 02:00)
            </button>
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-1.5 px-2">
            <Zap className="w-3.5 h-3.5 text-[#FFE500]" />
            <span>Floodlights on from 16:00 to 02:00</span>
          </div>
        </div>

        {/* Step 4: Slots Interactive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-10">
          {filteredSlots.map((slot) => {
            const isSelected = selectedSlotTimes.includes(slot.label);
            const isBooked = slot.isBooked;

            return (
              <button
                key={slot.label}
                disabled={isBooked}
                onClick={() => handleToggleSlot(slot.label, isBooked)}
                className={`relative p-3.5 rounded-xl border text-left transition-all ${
                  isBooked
                    ? 'bg-[#121113] border-[#261E1E] text-slate-500 cursor-not-allowed opacity-60'
                    : isSelected
                    ? 'bg-[#FFE500] border-[#FFE500] text-black shadow-[0_0_20px_rgba(255,229,0,0.3)] ring-2 ring-[#FFE500] cursor-pointer scale-[1.02]'
                    : 'bg-[#10151C] border-[#222C38] text-slate-200 hover:border-[#FFE500]/60 hover:bg-[#161D27] cursor-pointer'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className={`text-xs font-mono font-bold ${isSelected ? 'text-black' : 'text-white'}`}>
                    {slot.startTime} - {slot.endTime}
                  </div>
                  {isBooked ? (
                    <span className="text-[10px] uppercase font-bold text-red-400">Booked</span>
                  ) : isSelected ? (
                    <Check className="w-4 h-4 text-black font-extrabold" />
                  ) : slot.isFillingFast ? (
                    <span className="flex items-center gap-0.5 text-[10px] text-amber-400 font-semibold">
                      <Flame className="w-3 h-3 text-amber-400" /> Fast
                    </span>
                  ) : null}
                </div>

                <div className="flex items-center justify-between text-[11px] mt-2 pt-2 border-t border-black/10 dark:border-white/10">
                  <span className={`text-[10px] uppercase tracking-wider ${
                    isSelected ? 'text-black/80 font-bold' : slot.isPeak ? 'text-[#FFE500]' : 'text-slate-400'
                  }`}>
                    {slot.isPeak ? 'Floodlight' : 'Off-Peak'}
                  </span>
                  <span className={`font-mono font-bold ${isSelected ? 'text-black' : 'text-slate-200'}`}>
                    ₹{slot.price}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Step 5: Optional Match Add-Ons */}
        <div className="mt-8 bg-[#0E1217] border border-[#1F2732] rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="font-display font-bold text-lg text-white uppercase tracking-tight">
                Enhance Your Match Experience
              </h3>
              <p className="text-xs text-slate-400">
                Official tournament gear, pro referee, and match recordings delivered directly to your squad.
              </p>
            </div>
            <span className="text-xs font-mono text-[#FFE500]">Optional Equipment</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ADD_ONS.map((addon) => {
              const isChecked = selectedAddOnIds.includes(addon.id);
              return (
                <div
                  key={addon.id}
                  onClick={() => handleToggleAddOn(addon.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                    isChecked
                      ? 'bg-[#151D26] border-[#FFE500] ring-1 ring-[#FFE500]/50'
                      : 'bg-[#10141A] border-[#1F2732] hover:border-[#334152]'
                  }`}
                >
                  <div className={`w-5 h-5 rounded flex items-center justify-center mt-0.5 border shrink-0 ${
                    isChecked ? 'bg-[#FFE500] border-[#FFE500] text-black' : 'border-[#334152] bg-[#161C24]'
                  }`}>
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{addon.name}</span>
                      <span className="text-xs font-mono font-bold text-[#FFE500]">₹{addon.price}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                      {addon.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 6: Sticky Summary Bar when slots are chosen */}
        {selectedSlotTimes.length > 0 && (
          <div className="mt-8 sticky bottom-4 z-40 bg-[#12171F]/95 backdrop-blur-md border border-[#FFE500]/40 rounded-2xl p-4 sm:p-5 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1 w-full md:w-auto">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFE500]">
                <span>{currentArena.name}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedDate}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedSlotTimes.length} Slot{selectedSlotTimes.length > 1 ? 's' : ''} ({selectedSlotTimes.length} hr)</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 mt-1.5 text-xs text-slate-300">
                <span className="font-semibold text-white">Chosen Times:</span>
                {selectedSlotTimes.map((t) => (
                  <span key={t} className="font-mono text-[11px] bg-[#1A222D] border border-[#2B3848] px-2 py-0.5 rounded">
                    {t}
                  </span>
                ))}
                {selectedAddOnIds.length > 0 && (
                  <span className="text-slate-400 text-[11px] ml-1">
                    + {selectedAddOnIds.length} add-on{selectedAddOnIds.length > 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between w-full md:w-auto gap-6">
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-wider text-slate-400">Total Payable</div>
                <div className="text-2xl font-display font-extrabold text-[#FFE500] font-mono leading-none">
                  ₹{totalAmount.toLocaleString()}
                </div>
              </div>

              <button
                onClick={handleBookNow}
                className="px-7 py-3.5 text-xs font-black uppercase tracking-wider text-black bg-[#FFE500] hover:bg-[#F2D900] active:scale-95 rounded-xl transition-all shadow-[0_0_25px_rgba(255,229,0,0.35)] flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <span>Proceed To Book</span>
                <ChevronRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
