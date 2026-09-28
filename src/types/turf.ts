export type SportType = 'football' | 'cricket' | 'multisport';

export interface Arena {
  id: string;
  name: string;
  subtitle: string;
  sport: SportType;
  dimensions: string;
  capacity: string;
  surface: string;
  infill: string;
  lightingLux: number;
  hourlyRateOffPeak: number; // e.g. 1100
  hourlyRatePeak: number;    // e.g. 1600
  image: string;
  features: string[];
  recommendedFor: string;
}

export interface Slot {
  id: string;
  arenaId: string;
  date: string; // YYYY-MM-DD
  startTime: string; // "06:00"
  endTime: string;   // "07:00"
  timeCategory: 'morning' | 'afternoon' | 'evening' | 'night';
  price: number;
  isPeak: boolean;
  status: 'available' | 'booked' | 'filling_fast';
}

export interface AddOnOption {
  id: string;
  name: string;
  price: number;
  description: string;
  iconName: string;
}

export interface Booking {
  id: string;
  arenaId: string;
  arenaName: string;
  date: string;
  slots: string[]; // ["19:00 - 20:00", "20:00 - 21:00"]
  sport: SportType;
  captainName: string;
  captainPhone: string;
  captainEmail: string;
  teamName: string;
  selectedAddOns: string[];
  totalAmount: number;
  advancePaid: number;
  paymentMode: 'online_full' | 'advance_25';
  createdAt: string;
  qrCodeToken: string;
  status: 'confirmed' | 'cancelled';
}

export interface MatchChallenge {
  id: string;
  title: string;
  sport: SportType;
  format: string; // e.g. "5v5 Turf Football", "7v7 Box Cricket"
  teamName: string;
  captainName: string;
  skillLevel: 'Casual' | 'Semi-Pro' | 'Competitive';
  date: string;
  timeSlot: string;
  arenaName: string;
  splitCostApprox: number;
  neededSpots: number; // e.g., 2 players or whole team
  contactPhone: string;
  description: string;
  joinedCount: number;
  createdAt: string;
}

export interface Tournament {
  id: string;
  title: string;
  tagline: string;
  sport: SportType;
  date: string;
  prizePool: string;
  entryFee: number;
  totalSlots: number;
  filledSlots: number;
  format: string; // "Knockout" | "League + Knockout"
  perks: string[];
  status: 'Registration Open' | 'Filling Fast' | 'Closed';
}

export interface Review {
  id: string;
  name: string;
  team: string;
  sport: SportType;
  rating: number;
  date: string;
  comment: string;
  arenaName: string;
}
