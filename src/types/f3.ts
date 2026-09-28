export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

export type ActivityType = 
  | 'Football' 
  | 'Box Cricket' 
  | 'Corporate Event' 
  | 'Sports Day' 
  | 'Tournament' 
  | 'Live Screening'
  | 'Other Event';

export interface Booking {
  id: string;
  bookingReference: string; // e.g. "F3-892144"
  customerName: string;
  phone: string;
  email: string;
  activity: ActivityType;
  bookingDate: string; // "YYYY-MM-DD"
  startTime: string; // "07:00 PM"
  endTime: string;   // "08:00 PM"
  players: number;
  specialRequirements?: string;
  companyOrganization?: string;
  eventType?: string;
  expectedParticipants?: number;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
}

export interface TimeSlotConfig {
  openingTime: string; // "06:00 AM"
  closingTime: string; // "02:00 AM"
  slotDurationMinutes: number; // 60
  availableDays: string[]; // ["Monday", "Tuesday", ...]
  blockedDates: string[]; // ["2026-10-15"]
  specialEventDates: string[];
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  activityKey: ActivityType;
  iconName: string;
}

export interface EventEnquiry {
  id: string;
  type: 'tournament' | 'corporate' | 'screening' | 'general';
  name: string;
  phone: string;
  email: string;
  organization?: string;
  sportOrEvent?: string;
  expectedTeamsOrParticipants?: string;
  preferredDate?: string;
  message?: string;
  status: 'PENDING' | 'CONTACTED' | 'CONFIRMED';
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Turf' | 'Football' | 'Box Cricket' | 'Events' | 'Tournaments' | 'Screening';
  aspectRatio: '16/9' | '4/3' | '1/1' | '3/2';
  placeholderLabel: string;
  customMediaUrl?: string;
}

export interface DashboardStats {
  todaysBookings: number;
  upcomingBookings: number;
  pendingRequests: number;
  confirmedBookings: number;
  totalBookings: number;
  estimatedRevenue: number;
}
