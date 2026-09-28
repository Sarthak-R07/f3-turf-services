import React, { useState, useMemo } from 'react';
import { Booking, BookingStatus, TimeSlotConfig, GalleryItem, ActivityType } from '../types/f3';
import { F3Logo } from './F3Logo';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  Trophy, 
  Image as ImageIcon, 
  Briefcase, 
  Settings, 
  Search, 
  Filter, 
  Check, 
  X, 
  Eye, 
  Plus, 
  Trash2, 
  ArrowLeft,
  ChevronRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

interface AdminPortalProps {
  bookings: Booking[];
  onUpdateBookingStatus: (id: string, newStatus: BookingStatus) => void;
  onDeleteBooking: (id: string) => void;
  timeSlotConfig: TimeSlotConfig;
  onUpdateTimeSlotConfig: (config: TimeSlotConfig) => void;
  onExitAdmin: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  bookings,
  onUpdateBookingStatus,
  onDeleteBooking,
  timeSlotConfig,
  onUpdateTimeSlotConfig,
  onExitAdmin
}) => {
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'bookings' | 'calendar' | 'timeslots' | 'customers' | 'events' | 'gallery' | 'services' | 'settings'
  >('dashboard');

  // Search and filter states for Bookings
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | BookingStatus>('ALL');
  const [sportFilter, setSportFilter] = useState<'ALL' | ActivityType>('ALL');
  const [selectedBookingForView, setSelectedBookingForView] = useState<Booking | null>(null);

  // Calendar states
  const [calendarView, setCalendarView] = useState<'month' | 'week' | 'day'>('month');

  // Time slot form state
  const [openingTime, setOpeningTime] = useState(timeSlotConfig.openingTime);
  const [closingTime, setClosingTime] = useState(timeSlotConfig.closingTime);
  const [slotDuration, setSlotDuration] = useState(timeSlotConfig.slotDurationMinutes);
  const [newBlockedDate, setNewBlockedDate] = useState('');
  const [blockedDatesList, setBlockedDatesList] = useState<string[]>(timeSlotConfig.blockedDates);

  // Compute KPI Stats
  const todayStr = new Date().toISOString().split('T')[0];
  const stats = useMemo(() => {
    const todays = bookings.filter((b) => b.bookingDate === todayStr);
    const upcoming = bookings.filter((b) => b.bookingDate >= todayStr && b.status !== 'CANCELLED');
    const pending = bookings.filter((b) => b.status === 'PENDING');
    const confirmed = bookings.filter((b) => b.status === 'CONFIRMED');
    const total = bookings.length;
    // Mock estimate: ₹1,400 per confirmed booking
    const revenue = confirmed.length * 1400;

    return {
      todaysBookings: todays.length,
      upcomingBookings: upcoming.length,
      pendingRequests: pending.length,
      confirmedBookings: confirmed.length,
      totalBookings: total,
      estimatedRevenue: revenue
    };
  }, [bookings, todayStr]);

  // Filtered Bookings Table
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchSearch =
        b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.bookingReference.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.phone.includes(searchTerm);
      const matchStatus = statusFilter === 'ALL' || b.status === statusFilter;
      const matchSport = sportFilter === 'ALL' || b.activity === sportFilter;
      return matchSearch && matchStatus && matchSport;
    });
  }, [bookings, searchTerm, statusFilter, sportFilter]);

  const handleSaveTimeSlots = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateTimeSlotConfig({
      ...timeSlotConfig,
      openingTime,
      closingTime,
      slotDurationMinutes: Number(slotDuration),
      blockedDates: blockedDatesList
    });
    alert('Time Slot & Schedule configuration saved successfully.');
  };

  const handleAddBlockedDate = () => {
    if (newBlockedDate && !blockedDatesList.includes(newBlockedDate)) {
      setBlockedDatesList([...blockedDatesList, newBlockedDate]);
      setNewBlockedDate('');
    }
  };

  const handleRemoveBlockedDate = (d: string) => {
    setBlockedDatesList(blockedDatesList.filter((item) => item !== d));
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] flex flex-col pt-16">
      
      {/* Admin Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#0A0A0A] border-b border-[#222222] px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <F3Logo size="sm" variant="minimal" />
          <div className="flex items-baseline gap-2">
            <span className="font-heading font-black text-sm text-white tracking-wider uppercase">
              F3 TURF ADMIN PORTAL
            </span>
            <span className="text-[10px] font-mono text-[#FFD900] bg-[#FFD900]/10 px-2 py-0.5 rounded border border-[#FFD900]/30 uppercase">
              Authenticated
            </span>
          </div>
        </div>

        <button
          onClick={onExitAdmin}
          className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-[#141414] hover:bg-[#1C1C1C] border border-[#2B2B2B] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to Public Website</span>
        </button>
      </header>

      {/* Main Admin Layout: Sidebar + Workspace */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar (Section 13) */}
        <aside className="w-56 sm:w-64 bg-[#0A0A0A] border-r border-[#1E1E1E] p-4 flex flex-col justify-between shrink-0">
          <div className="space-y-1">
            <div className="text-[10px] font-heading font-bold text-[#777777] uppercase tracking-wider px-3 mb-2">
              Management Menu
            </div>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full px-3 py-2.5 rounded-xl text-xs font-heading font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-[#FFD900] text-black shadow-md'
                  : 'text-slate-300 hover:bg-[#141414] hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('bookings')}
              className={`w-full px-3 py-2.5 rounded-xl text-xs font-heading font-bold flex items-center justify-between transition-all cursor-pointer ${
                activeTab === 'bookings'
                  ? 'bg-[#FFD900] text-black shadow-md'
                  : 'text-slate-300 hover:bg-[#141414] hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <CalendarCheck className="w-4 h-4" />
                <span>Bookings List</span>
              </div>
              {stats.pendingRequests > 0 && (
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full font-bold ${
                  activeTab === 'bookings' ? 'bg-black text-[#FFD900]' : 'bg-[#FFD900] text-black'
                }`}>
                  {stats.pendingRequests}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('calendar')}
              className={`w-full px-3 py-2.5 rounded-xl text-xs font-heading font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
                activeTab === 'calendar'
                  ? 'bg-[#FFD900] text-black shadow-md'
                  : 'text-slate-300 hover:bg-[#141414] hover:text-white'
              }`}
            >
              <CalendarIcon className="w-4 h-4" />
              <span>Calendar View</span>
            </button>

            <button
              onClick={() => setActiveTab('timeslots')}
              className={`w-full px-3 py-2.5 rounded-xl text-xs font-heading font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
                activeTab === 'timeslots'
                  ? 'bg-[#FFD900] text-black shadow-md'
                  : 'text-slate-300 hover:bg-[#141414] hover:text-white'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Time Slots & Rules</span>
            </button>

            <button
              onClick={() => setActiveTab('customers')}
              className={`w-full px-3 py-2.5 rounded-xl text-xs font-heading font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
                activeTab === 'customers'
                  ? 'bg-[#FFD900] text-black shadow-md'
                  : 'text-slate-300 hover:bg-[#141414] hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Customer Registry</span>
            </button>

            <button
              onClick={() => setActiveTab('events')}
              className={`w-full px-3 py-2.5 rounded-xl text-xs font-heading font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
                activeTab === 'events'
                  ? 'bg-[#FFD900] text-black shadow-md'
                  : 'text-slate-300 hover:bg-[#141414] hover:text-white'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>Events & Tournaments</span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`w-full px-3 py-2.5 rounded-xl text-xs font-heading font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
                activeTab === 'gallery'
                  ? 'bg-[#FFD900] text-black shadow-md'
                  : 'text-slate-300 hover:bg-[#141414] hover:text-white'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Media Gallery</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`w-full px-3 py-2.5 rounded-xl text-xs font-heading font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
                activeTab === 'services'
                  ? 'bg-[#FFD900] text-black shadow-md'
                  : 'text-slate-300 hover:bg-[#141414] hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Services Master</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full px-3 py-2.5 rounded-xl text-xs font-heading font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-[#FFD900] text-black shadow-md'
                  : 'text-slate-300 hover:bg-[#141414] hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Venue Settings</span>
            </button>
          </div>

          {/* Sidebar Footer info */}
          <div className="pt-4 border-t border-[#1C1C1C] text-[10px] text-slate-500 font-mono">
            <div>F3 Admin v2.4 (Production)</div>
            <div>PostgreSQL / API Ready</div>
          </div>
        </aside>

        {/* Workspace Area */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8 bg-[#050505]">
          
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <div>
                <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white uppercase tracking-tight">
                  VENUE DASHBOARD
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Daily live occupancy, incoming reservation requests, and schedule overview.
                </p>
              </div>

              {/* 6 Key Performance Indicator Cards (Section 13) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                
                <div className="p-5 rounded-2xl bg-[#0D0D0D] border border-[#222222]">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Today's Bookings</div>
                  <div className="text-3xl font-heading font-black text-white mt-1">
                    {stats.todaysBookings}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Scheduled for {todayStr}</div>
                </div>

                <div className="p-5 rounded-2xl bg-[#0D0D0D] border border-[#222222]">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Upcoming Bookings</div>
                  <div className="text-3xl font-heading font-black text-white mt-1">
                    {stats.upcomingBookings}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Future confirmed matches</div>
                </div>

                <div className="p-5 rounded-2xl bg-[#0D0D0D] border border-[#FFD900]/40 ring-1 ring-[#FFD900]/20">
                  <div className="text-[10px] uppercase font-bold text-[#FFD900]">Pending Requests</div>
                  <div className="text-3xl font-heading font-black text-[#FFD900] mt-1">
                    {stats.pendingRequests}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Awaiting staff confirmation</div>
                </div>

                <div className="p-5 rounded-2xl bg-[#0D0D0D] border border-[#222222]">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Confirmed Bookings</div>
                  <div className="text-3xl font-heading font-black text-emerald-400 mt-1">
                    {stats.confirmedBookings}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Active match slots</div>
                </div>

                <div className="p-5 rounded-2xl bg-[#0D0D0D] border border-[#222222]">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Total Bookings (All-time)</div>
                  <div className="text-3xl font-heading font-black text-white mt-1">
                    {stats.totalBookings}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Recorded in database</div>
                </div>

                <div className="p-5 rounded-2xl bg-[#0D0D0D] border border-[#222222]">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Est. Booking Value</div>
                  <div className="text-3xl font-heading font-black text-[#FFD900] font-mono mt-1">
                    ₹{stats.estimatedRevenue.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Configurable rate calculation</div>
                </div>

              </div>

              {/* Quick Actions & Recent Incoming Bookings */}
              <div className="bg-[#0D0D0D] border border-[#222222] rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-bold text-base text-white uppercase">
                    Recent Booking Requests
                  </h3>
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className="text-xs text-[#FFD900] hover:underline font-bold"
                  >
                    View All Bookings →
                  </button>
                </div>

                <div className="divide-y divide-[#1A1A1A]">
                  {bookings.slice(0, 4).map((b) => (
                    <div key={b.id} className="py-3.5 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#FFD900]">
                            {b.bookingReference}
                          </span>
                          <span className="text-xs font-heading font-bold text-white">
                            {b.customerName}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {b.activity} · {b.bookingDate} at {b.startTime} ({b.players} players)
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                          b.status === 'CONFIRMED'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : b.status === 'CANCELLED'
                            ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {b.status}
                        </span>

                        {b.status === 'PENDING' && (
                          <button
                            onClick={() => onUpdateBookingStatus(b.id, 'CONFIRMED')}
                            className="px-2.5 py-1 text-[11px] font-bold text-black bg-[#FFD900] hover:bg-[#E6C400] rounded-md transition-colors"
                          >
                            Confirm
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: BOOKINGS MANAGEMENT (Section 14) */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-heading font-extrabold text-2xl text-white uppercase tracking-tight">
                    BOOKING MANAGEMENT
                  </h1>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Filter, review, confirm, and manage customer slot requests.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-400">
                    {filteredBookings.length} Bookings Found
                  </span>
                </div>
              </div>

              {/* Filters Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-[#0D0D0D] border border-[#222222] rounded-2xl">
                {/* Search input */}
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search by customer name, phone, or Ref ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#141414] border border-[#292929] rounded-xl text-white focus:outline-none focus:border-[#FFD900]"
                  />
                </div>

                {/* Status filter */}
                <div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-[#141414] border border-[#292929] rounded-xl text-white focus:outline-none focus:border-[#FFD900]"
                  >
                    <option value="ALL">All Statuses (Pending, Confirmed, Cancelled)</option>
                    <option value="PENDING">Pending Requests</option>
                    <option value="CONFIRMED">Confirmed Slots</option>
                    <option value="CANCELLED">Cancelled</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                </div>

                {/* Sport filter */}
                <div>
                  <select
                    value={sportFilter}
                    onChange={(e) => setSportFilter(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-[#141414] border border-[#292929] rounded-xl text-white focus:outline-none focus:border-[#FFD900]"
                  >
                    <option value="ALL">All Activities</option>
                    <option value="Football">Football</option>
                    <option value="Box Cricket">Box Cricket</option>
                    <option value="Corporate Event">Corporate Event</option>
                    <option value="Sports Day">Sports Day</option>
                    <option value="Tournament">Tournament</option>
                  </select>
                </div>
              </div>

              {/* Booking Table (Section 14) */}
              <div className="bg-[#0D0D0D] border border-[#222222] rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-[#1F1F1F] bg-[#121212] text-[11px] uppercase tracking-wider text-slate-400 font-heading font-bold">
                        <th className="py-3.5 px-4">Booking ID</th>
                        <th className="py-3.5 px-4">Customer</th>
                        <th className="py-3.5 px-4">Activity</th>
                        <th className="py-3.5 px-4">Date</th>
                        <th className="py-3.5 px-4">Time</th>
                        <th className="py-3.5 px-4">Players</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A1A1A]">
                      {filteredBookings.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="py-8 text-center text-slate-500">
                            No matching bookings found.
                          </td>
                        </tr>
                      ) : (
                        filteredBookings.map((b) => (
                          <tr key={b.id} className="hover:bg-[#131313] transition-colors">
                            <td className="py-3.5 px-4 font-mono font-bold text-[#FFD900]">
                              {b.bookingReference}
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-heading font-bold text-white">{b.customerName}</div>
                              <div className="text-[11px] text-slate-400 font-mono">{b.phone}</div>
                            </td>
                            <td className="py-3.5 px-4 text-slate-300 font-semibold">
                              {b.activity}
                            </td>
                            <td className="py-3.5 px-4 text-slate-300">
                              {b.bookingDate}
                            </td>
                            <td className="py-3.5 px-4 font-mono text-[#FFD900]">
                              {b.startTime} – {b.endTime}
                            </td>
                            <td className="py-3.5 px-4 text-slate-300">
                              {b.players}
                            </td>
                            <td className="py-3.5 px-4">
                              <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                                b.status === 'CONFIRMED'
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                  : b.status === 'CANCELLED'
                                  ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              }`}>
                                {b.status}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => setSelectedBookingForView(b)}
                                  className="p-1.5 text-slate-400 hover:text-white bg-[#181818] hover:bg-[#222222] rounded-md transition-colors"
                                  title="View Details"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>

                                {b.status !== 'CONFIRMED' && (
                                  <button
                                    onClick={() => onUpdateBookingStatus(b.id, 'CONFIRMED')}
                                    className="p-1.5 text-emerald-400 hover:text-emerald-300 bg-emerald-950/30 hover:bg-emerald-900/40 rounded-md transition-colors"
                                    title="Confirm Booking"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                  </button>
                                )}

                                {b.status !== 'CANCELLED' && (
                                  <button
                                    onClick={() => onUpdateBookingStatus(b.id, 'CANCELLED')}
                                    className="p-1.5 text-red-400 hover:text-red-300 bg-red-950/30 hover:bg-red-900/40 rounded-md transition-colors"
                                    title="Cancel Booking"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                )}

                                <button
                                  onClick={() => {
                                    if (confirm(`Delete record for ${b.bookingReference}?`)) {
                                      onDeleteBooking(b.id);
                                    }
                                  }}
                                  className="p-1.5 text-slate-500 hover:text-red-400 rounded-md transition-colors"
                                  title="Delete from DB"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* View Customer Booking Modal */}
              {selectedBookingForView && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
                  <div className="relative w-full max-w-md bg-[#0E0E0E] border border-[#2B2B2B] rounded-2xl shadow-2xl p-6 text-slate-100 text-xs">
                    <div className="flex justify-between items-center pb-3 border-b border-[#222222] mb-4">
                      <h3 className="font-heading font-extrabold text-base uppercase text-white">
                        Booking Details ({selectedBookingForView.bookingReference})
                      </h3>
                      <button
                        onClick={() => setSelectedBookingForView(null)}
                        className="p-1 text-slate-400 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Customer Name:</span>
                        <span className="font-bold text-white">{selectedBookingForView.customerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Phone:</span>
                        <span className="font-mono text-[#FFD900]">{selectedBookingForView.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Email:</span>
                        <span className="text-slate-200">{selectedBookingForView.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Activity:</span>
                        <span className="font-bold text-white">{selectedBookingForView.activity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Slot Date & Time:</span>
                        <span className="font-mono text-white">
                          {selectedBookingForView.bookingDate} · {selectedBookingForView.startTime} - {selectedBookingForView.endTime}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Players Count:</span>
                        <span className="text-white">{selectedBookingForView.players}</span>
                      </div>
                      {selectedBookingForView.specialRequirements && (
                        <div className="pt-2 border-t border-[#1C1C1C]">
                          <span className="text-slate-400 block mb-1">Special Requirements:</span>
                          <p className="bg-[#141414] p-2.5 rounded-lg text-slate-300">
                            {selectedBookingForView.specialRequirements}
                          </p>
                        </div>
                      )}
                      {selectedBookingForView.companyOrganization && (
                        <div className="flex justify-between pt-1">
                          <span className="text-slate-400">Company / Organization:</span>
                          <span className="text-white">{selectedBookingForView.companyOrganization}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#222222] flex gap-2">
                      <button
                        onClick={() => {
                          onUpdateBookingStatus(selectedBookingForView.id, 'CONFIRMED');
                          setSelectedBookingForView(null);
                        }}
                        className="flex-1 py-2 text-xs font-bold text-black bg-[#FFD900] rounded-xl hover:bg-[#E6C400]"
                      >
                        Confirm Slot
                      </button>
                      <button
                        onClick={() => setSelectedBookingForView(null)}
                        className="px-4 py-2 text-xs text-slate-300 bg-[#161616] rounded-xl"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 3: CALENDAR VIEW (Section 15) */}
          {activeTab === 'calendar' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-heading font-extrabold text-2xl text-white uppercase tracking-tight">
                    ARENA SCHEDULE CALENDAR
                  </h1>
                  <p className="text-xs text-slate-400 mt-0.5">
                    View booked slots, available hours, and pending reservations.
                  </p>
                </div>

                {/* View switcher */}
                <div className="flex items-center gap-1 p-1 bg-[#121212] border border-[#222222] rounded-xl text-xs">
                  <button
                    onClick={() => setCalendarView('month')}
                    className={`px-3 py-1.5 rounded-lg font-heading font-bold transition-all ${
                      calendarView === 'month' ? 'bg-[#FFD900] text-black' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Month
                  </button>
                  <button
                    onClick={() => setCalendarView('week')}
                    className={`px-3 py-1.5 rounded-lg font-heading font-bold transition-all ${
                      calendarView === 'week' ? 'bg-[#FFD900] text-black' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Week
                  </button>
                  <button
                    onClick={() => setCalendarView('day')}
                    className={`px-3 py-1.5 rounded-lg font-heading font-bold transition-all ${
                      calendarView === 'day' ? 'bg-[#FFD900] text-black' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Day (Today)
                  </button>
                </div>
              </div>

              {/* Calendar Grid Representation */}
              <div className="bg-[#0D0D0D] border border-[#222222] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-heading font-extrabold text-base text-white">
                    October 2026 Schedule
                  </span>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Confirmed
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFD900]" /> Pending
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#333333]" /> Available
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-2 text-center text-xs">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                    <div key={day} className="py-2 font-heading font-bold text-slate-400 border-b border-[#222222]">
                      {day}
                    </div>
                  ))}

                  {/* 28-day simplified visual view with booked badges */}
                  {[...Array(28)].map((_, i) => {
                    const dayNum = i + 1;
                    const dateStr = `2026-10-${dayNum < 10 ? '0' + dayNum : dayNum}`;
                    const dayBookings = bookings.filter((b) => b.bookingDate === dateStr);
                    const isToday = dayNum === 1;

                    return (
                      <div
                        key={i}
                        className={`min-h-[85px] p-2 rounded-xl border text-left flex flex-col justify-between ${
                          isToday
                            ? 'bg-[#181818] border-[#FFD900]'
                            : 'bg-[#121212] border-[#222222] hover:border-[#333333]'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className={`font-mono text-xs font-bold ${isToday ? 'text-[#FFD900]' : 'text-slate-400'}`}>
                            {dayNum}
                          </span>
                          {dayBookings.length > 0 && (
                            <span className="w-2 h-2 rounded-full bg-[#FFD900]" />
                          )}
                        </div>

                        <div className="space-y-1 mt-1">
                          {dayBookings.map((b) => (
                            <div
                              key={b.id}
                              className={`text-[9px] font-mono truncate px-1 py-0.5 rounded font-bold ${
                                b.status === 'CONFIRMED'
                                  ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                                  : 'bg-amber-950/60 text-amber-400 border border-amber-800/40'
                              }`}
                            >
                              {b.startTime.split(' ')[0]} {b.activity.slice(0, 4)}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: TIME SLOTS & OPERATING RULES (Section 16) */}
          {activeTab === 'timeslots' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h1 className="font-heading font-extrabold text-2xl text-white uppercase tracking-tight">
                  TIME SLOT CONFIGURATION
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  Configure operating hours, slot length, available days, and block dates for tournament maintenance.
                </p>
              </div>

              <form onSubmit={handleSaveTimeSlots} className="bg-[#0D0D0D] border border-[#222222] rounded-2xl p-6 space-y-5 text-xs">
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">Turf Opening Time</label>
                    <input
                      type="text"
                      value={openingTime}
                      onChange={(e) => setOpeningTime(e.target.value)}
                      className="w-full px-3 py-2 bg-[#141414] border border-[#2A2A2A] rounded-xl text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Turf Closing Time</label>
                    <input
                      type="text"
                      value={closingTime}
                      onChange={(e) => setClosingTime(e.target.value)}
                      className="w-full px-3 py-2 bg-[#141414] border border-[#2A2A2A] rounded-xl text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Default Slot Duration (Minutes)</label>
                  <select
                    value={slotDuration}
                    onChange={(e) => setSlotDuration(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#141414] border border-[#2A2A2A] rounded-xl text-white font-mono"
                  >
                    <option value={60}>60 minutes (Standard 1 hour)</option>
                    <option value={90}>90 minutes (1.5 hours)</option>
                    <option value={120}>120 minutes (2 hours match)</option>
                  </select>
                </div>

                {/* Blocked Dates management */}
                <div className="pt-3 border-t border-[#1C1C1C]">
                  <label className="block text-slate-400 mb-1">Blocked / Maintenance Dates</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="date"
                      value={newBlockedDate}
                      onChange={(e) => setNewBlockedDate(e.target.value)}
                      className="px-3 py-2 bg-[#141414] border border-[#2A2A2A] rounded-xl text-white text-xs"
                    />
                    <button
                      type="button"
                      onClick={handleAddBlockedDate}
                      className="px-3 py-2 bg-[#222222] hover:bg-[#333333] text-white rounded-xl text-xs font-semibold"
                    >
                      + Block Date
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {blockedDatesList.length === 0 ? (
                      <span className="text-[11px] text-slate-500">No blocked dates. All dates open.</span>
                    ) : (
                      blockedDatesList.map((d) => (
                        <span key={d} className="px-2.5 py-1 bg-[#1A1A1A] border border-[#2E2E2E] rounded-md font-mono text-[11px] flex items-center gap-1.5">
                          <span>{d}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveBlockedDate(d)}
                            className="text-red-400 hover:text-red-300"
                          >
                            ×
                          </button>
                        </span>
                      ))
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#1C1C1C]">
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-xs font-heading font-extrabold uppercase text-black bg-[#FFD900] hover:bg-[#E6C400] rounded-xl transition-all shadow-md"
                  >
                    Save Slot Configuration
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 5: CUSTOMER REGISTRY */}
          {activeTab === 'customers' && (
            <div className="space-y-6">
              <div>
                <h1 className="font-heading font-extrabold text-2xl text-white uppercase tracking-tight">
                  CUSTOMER REGISTRY
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  Captains, squad managers, and corporate contacts stored from previous bookings.
                </p>
              </div>

              <div className="bg-[#0D0D0D] border border-[#222222] rounded-2xl p-6">
                <div className="divide-y divide-[#1A1A1A]">
                  {bookings.map((b) => (
                    <div key={b.id} className="py-3 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-heading font-bold text-white">{b.customerName}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{b.phone} · {b.email}</div>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-400">Last booked: </span>
                        <span className="font-bold text-[#FFD900]">{b.activity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: EVENTS & SETTINGS PLACEHOLDERS */}
          {(activeTab === 'events' || activeTab === 'gallery' || activeTab === 'services' || activeTab === 'settings') && (
            <div className="space-y-6">
              <div>
                <h1 className="font-heading font-extrabold text-2xl text-white uppercase tracking-tight capitalize">
                  {activeTab} Management
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  Configure venue parameters, media placeholders, and public event listings.
                </p>
              </div>

              <div className="bg-[#0D0D0D] border border-[#222222] rounded-2xl p-6 text-xs text-slate-400 space-y-3">
                <p>
                  This panel synchronizes directly with the public website components. You can add new upcoming tournaments or replace gallery placeholders using the Media System.
                </p>
                <div className="p-3 bg-[#141414] rounded-xl border border-[#252525] text-slate-300">
                  Venue: <strong>F3 TURF SERVICES</strong> · Phone: <strong>+91 72 72 82 14 14</strong>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
};
