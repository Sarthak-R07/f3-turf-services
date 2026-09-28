import { Booking, ServiceItem, GalleryItem, TimeSlotConfig } from '../types/f3';

export const F3_CONTACT_INFO = {
  brandName: 'F3 TURF SERVICES',
  tagline: 'PLAY. COMPETE. EXPERIENCE.',
  subtitle: 'Premium Sports Turf & Event Venue',
  phoneDisplay: '+91 72 72 82 14 14', // From official F3 Turf on-site banner
  phoneRaw: '7272821414',
  whatsappNumber: '917272821414',
  email: 'contact@f3turfservices.com',
  address: '[ADD F3 TURF ADDRESS]',
  openingHours: '06:00 AM – 02:00 AM [Configurable in Admin]',
  googleMapLabel: 'F3 Turf Services Location [Google Map Placeholder]'
};

export const INITIAL_TIME_SLOT_CONFIG: TimeSlotConfig = {
  openingTime: '06:00 AM',
  closingTime: '02:00 AM',
  slotDurationMinutes: 60,
  availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  blockedDates: [],
  specialEventDates: []
};

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'srv-cricket',
    number: '01',
    title: 'BOX CRICKET',
    shortDescription: 'High-tension perimeter netting, certified pitch turf, and boundary cages engineered for fast-paced competitive overs.',
    activityKey: 'Box Cricket',
    iconName: 'Shield'
  },
  {
    id: 'srv-football',
    number: '02',
    title: 'FOOTBALL',
    shortDescription: 'Monofilament synthetic grass pitch with impact shock-pad protection for 5v5 friendly matches and training academies.',
    activityKey: 'Football',
    iconName: 'Zap'
  },
  {
    id: 'srv-corporate',
    number: '03',
    title: 'CORPORATE EVENTS',
    shortDescription: 'Structured inter-company tournaments, team-building sports sessions, and corporate employee wellness days.',
    activityKey: 'Corporate Event',
    iconName: 'Briefcase'
  },
  {
    id: 'srv-screening',
    number: '04',
    title: 'LIVE SCREENING',
    shortDescription: 'Dedicated venue space with projector/screen capability to watch major international cricket and football derbies.',
    activityKey: 'Live Screening',
    iconName: 'Tv'
  },
  {
    id: 'srv-sports-day',
    number: '05',
    title: 'SPORTS DAY',
    shortDescription: 'Full-facility private booking for schools, colleges, and sports academies hosting annual athletic competitions.',
    activityKey: 'Sports Day',
    iconName: 'Flag'
  },
  {
    id: 'srv-tournaments',
    number: '06',
    title: 'TOURNAMENTS',
    shortDescription: 'Turnkey venue management, official scoring tables, trophy presentation stages, and full match scheduling.',
    activityKey: 'Tournament',
    iconName: 'Trophy'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'b-101',
    bookingReference: 'F3-782910',
    customerName: 'Rohit K.',
    phone: '+91 98201 12345',
    email: 'rohit@f3turf.com',
    activity: 'Box Cricket',
    bookingDate: new Date().toISOString().split('T')[0],
    startTime: '07:00 PM',
    endTime: '08:00 PM',
    players: 14,
    specialRequirements: 'Stumps and tennis balls required',
    status: 'CONFIRMED',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: 'b-102',
    bookingReference: 'F3-849201',
    customerName: 'Sameer Desai',
    phone: '+91 98192 88441',
    email: 'sameer.desai@gmail.com',
    activity: 'Football',
    bookingDate: new Date().toISOString().split('T')[0],
    startTime: '09:00 PM',
    endTime: '10:00 PM',
    players: 10,
    specialRequirements: 'Team bibs needed',
    status: 'PENDING',
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    updatedAt: new Date(Date.now() - 1800000).toISOString()
  },
  {
    id: 'b-103',
    bookingReference: 'F3-910283',
    customerName: 'Aditya Verma (Tech Solutions)',
    phone: '+91 98334 00912',
    email: 'aditya.v@company.com',
    activity: 'Corporate Event',
    bookingDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    startTime: '05:00 PM',
    endTime: '08:00 PM',
    players: 30,
    companyOrganization: 'Tech Solutions India',
    eventType: 'Inter-department Box Cricket & Dinner',
    expectedParticipants: 45,
    specialRequirements: 'Sound system, seating chairs and scoreboard',
    status: 'PENDING',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    updatedAt: new Date(Date.now() - 7200000).toISOString()
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'F3 Night Floodlight Turf Arena',
    category: 'Turf',
    aspectRatio: '16/9',
    placeholderLabel: 'F3 Floodlit Turf Photo'
  },
  {
    id: 'gal-2',
    title: 'Box Cricket Tournament Action',
    category: 'Box Cricket',
    aspectRatio: '4/3',
    placeholderLabel: 'Box Cricket Match Photo'
  },
  {
    id: 'gal-3',
    title: '5-a-side Football Friendly',
    category: 'Football',
    aspectRatio: '4/3',
    placeholderLabel: 'Football Turf Match Photo'
  },
  {
    id: 'gal-4',
    title: 'Trophy Presentation & Awards',
    category: 'Tournaments',
    aspectRatio: '1/1',
    placeholderLabel: 'Tournament Trophy Photo'
  },
  {
    id: 'gal-5',
    title: 'Corporate Sports Day Championship',
    category: 'Events',
    aspectRatio: '16/9',
    placeholderLabel: 'Corporate Event Photo'
  },
  {
    id: 'gal-6',
    title: 'Clubhouse & Match Screening Area',
    category: 'Screening',
    aspectRatio: '4/3',
    placeholderLabel: 'Live Screening Photo'
  }
];

export const FAQ_LIST = [
  {
    question: 'How can I book a turf slot at F3?',
    answer: 'You can select your activity, pick an open date, choose your preferred hour, and submit your booking request directly via our website [BOOK A SLOT] system. You will receive an immediate F3 Booking ID, and our team will confirm your slot via WhatsApp/phone.'
  },
  {
    question: 'What sports are available at F3 Turf Services?',
    answer: 'F3 Turf Services primarily hosts 5v5 / 7v7 Football, Box Cricket, and multi-sport activities with dedicated boundary netting and tournament-grade synthetic grass.'
  },
  {
    question: 'Can I organize a tournament at F3?',
    answer: 'Yes! We host amateur, collegiate, and competitive tournaments with match scheduling, official scoring areas, and championship trophy setups. Use the [ORGANIZE A TOURNAMENT] section to submit your enquiry.'
  },
  {
    question: 'Can companies organize corporate events and sports days?',
    answer: 'Yes. We cater to corporate sports leagues, annual employee sports days, and active team-building sessions. Custom slots, equipment, and sound systems can be arranged.'
  },
  {
    question: 'Do you host live sports screenings?',
    answer: 'F3 provides dedicated venue space and screen facilities for live screenings of major football and cricket derbies. Please enquire in advance for private screenings.'
  },
  {
    question: 'What footwear is allowed on the turf?',
    answer: 'Flat-soled sports sneakers and rubber turf studs (TF) are welcome. Metal studs and spiked cleats are strictly prohibited to ensure player safety and preserve the turf surface.'
  },
  {
    question: 'How can I contact F3 Turf Services directly?',
    answer: 'You can reach F3 Turf Services by phone at +91 72 72 82 14 14, via WhatsApp, or through the contact enquiry form on this website.'
  }
];
