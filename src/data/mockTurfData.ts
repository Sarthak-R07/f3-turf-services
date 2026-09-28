import heroImg from '../assets/images/hero_turf_arena_1790574091946.jpg';
import footballImg from '../assets/images/turf_pitch_football_1790574100301.jpg';
import cricketImg from '../assets/images/turf_pitch_cricket_1790574111912.jpg';
import loungeImg from '../assets/images/turf_lounge_cafe_1790574124485.jpg';
import { Arena, AddOnOption, Tournament, MatchChallenge, Review } from '../types/turf';

export const HERO_IMAGE = heroImg;
export const LOUNGE_IMAGE = loungeImg;

export const ARENAS: Arena[] = [
  {
    id: 'pitch-1',
    name: 'Colosseum Football Arena',
    subtitle: 'FIFA 2-Star Certified Synthetic Turf',
    sport: 'football',
    dimensions: '105 ft × 65 ft',
    capacity: '5v5 or 7v7 matches',
    surface: '50mm Monofilament Grass with Thermo-Plastic Infill',
    infill: 'Eco-grade silica sand & shock pad',
    lightingLux: 550,
    hourlyRateOffPeak: 1200,
    hourlyRatePeak: 1800,
    image: footballImg,
    recommendedFor: '5-a-side Football, Speed Drills & Weekend Friendlies',
    features: [
      'FIFA Approved Monofilament Grass',
      'Dual-layer impact shock pad for joint safety',
      'High-velocity 40ft perimeter safety netting',
      'Full electronic scoreboard & match timer'
    ]
  },
  {
    id: 'pitch-2',
    name: 'Thunder Box Cricket Arena',
    subtitle: 'Precision Boundary & High-Tension Cage',
    sport: 'cricket',
    dimensions: '110 ft × 50 ft (High Ceiling)',
    capacity: '6v6 to 8v8 Box Cricket',
    surface: '18mm Dense Multi-Sport Turf with True Bounce',
    infill: 'Even-bounce compressed sub-base',
    lightingLux: 600,
    hourlyRateOffPeak: 1100,
    hourlyRatePeak: 1600,
    image: cricketImg,
    recommendedFor: 'Box Cricket, Overarm Tournaments & Corporate Leagues',
    features: [
      'Zero-deflection seamless boundary nets',
      'Standard taped pitch crease & crease marks',
      'Stump sets, leather balls & high-grade tennis bats available',
      'Dugout seating with digital score tracker'
    ]
  },
  {
    id: 'pitch-3',
    name: 'All-Star Multi-Sport Cage',
    subtitle: 'Versatile Fast-Paced Arena',
    sport: 'multisport',
    dimensions: '90 ft × 55 ft',
    capacity: '4v4 Football, Box Cricket & Dodgeball',
    surface: '35mm All-Weather Multi-Blade Synthetic Pitch',
    infill: 'Dual-grade soft rubber infill',
    lightingLux: 500,
    hourlyRateOffPeak: 1000,
    hourlyRatePeak: 1500,
    image: heroImg,
    recommendedFor: 'Casual Pickup Matches, Training Academies & Team Practice',
    features: [
      'Modular goalposts and movable boundary lines',
      'High-grip anti-slip underlay',
      'Rebound side walls for continuous fast play',
      'Direct access to player locker zone'
    ]
  }
];

export const ADD_ONS: AddOnOption[] = [
  {
    id: 'addon-ball-bibs',
    name: 'Match Ball & Bibs Set',
    price: 150,
    description: '1 Official match ball + 2 sets of colored team vests',
    iconName: 'Shield'
  },
  {
    id: 'addon-recording',
    name: '4K HD Pitch Recording & Highlights',
    price: 350,
    description: 'Uncut bird-eye match recording + 3-min highlight reel sent to your phone',
    iconName: 'Video'
  },
  {
    id: 'addon-referee',
    name: 'Official Tournament Referee / Umpire',
    price: 450,
    description: 'Certified official for fair play, foul tracking, and score tallying',
    iconName: 'Whistle'
  },
  {
    id: 'addon-hydration',
    name: 'Team Hydration Crate',
    price: 250,
    description: '12 chilled electrolyte bottles + unlimited filtered ice water',
    iconName: 'Droplet'
  },
  {
    id: 'addon-footwear',
    name: 'Turf Studs / Shoe Rental (Per Pair)',
    price: 100,
    description: 'Sanitized non-marking turf boots (sizes UK 6 - 11 available)',
    iconName: 'Footprints'
  }
];

export const TOURNAMENTS: Tournament[] = [
  {
    id: 'tourn-1',
    title: 'FB Turf Champions Trophy: 5v5',
    tagline: 'The Ultimate Weekend Football Showdown',
    sport: 'football',
    date: 'Oct 17 - Oct 18, 2026',
    prizePool: '₹40,000 + Champion Trophy',
    entryFee: 3200,
    totalSlots: 16,
    filledSlots: 12,
    format: 'Group Stage + Knockout',
    perks: ['Free Team Jerseys', 'Live Streaming on YouTube', 'Man of the Match Awards', 'Refreshments Included'],
    status: 'Filling Fast'
  },
  {
    id: 'tourn-2',
    title: 'Night Flash Box Cricket League',
    tagline: 'Under the Floodlights, 6 Overs per Innings',
    sport: 'cricket',
    date: 'Oct 24, 2026 (Night 8 PM - 2 AM)',
    prizePool: '₹25,000 + Gold Medals',
    entryFee: 2400,
    totalSlots: 12,
    filledSlots: 7,
    format: 'Double Elimination Knockout',
    perks: ['Red Tennis Ball Match Rules', 'Player Stats Tracking', 'Best Batsman & Bowler Prizes'],
    status: 'Registration Open'
  },
  {
    id: 'tourn-3',
    title: 'Midweek Corporate Turf Cup',
    tagline: 'Inter-Company Football & Box Cricket Blitz',
    sport: 'multisport',
    date: 'Nov 04, 2026',
    prizePool: '₹20,000 + Corporate Cup',
    entryFee: 2800,
    totalSlots: 8,
    filledSlots: 4,
    format: 'Round Robin Blitz',
    perks: ['Company Branding on Dugouts', 'Networking Buffet Dinner', 'Full Match Photography'],
    status: 'Registration Open'
  }
];

export const MATCH_CHALLENGES: MatchChallenge[] = [
  {
    id: 'mc-1',
    title: 'Need 2 Players for 5v5 Football Tonight!',
    sport: 'football',
    format: '5v5 Football (Midfield & Defender)',
    teamName: 'Strikers FC',
    captainName: 'Rohan Sharma',
    skillLevel: 'Semi-Pro',
    date: 'Tonight',
    timeSlot: '20:00 - 21:00',
    arenaName: 'Colosseum Football Arena',
    splitCostApprox: 180,
    neededSpots: 2,
    contactPhone: '+91 98201 44521',
    description: 'Fast-paced friendly game. Two teammates got stuck in traffic. Studs/turf shoes recommended. Just bring your game!',
    joinedCount: 1,
    createdAt: '35 mins ago'
  },
  {
    id: 'mc-2',
    title: 'Box Cricket Team Challenge - Looking for Opponent',
    sport: 'cricket',
    format: '7v7 Box Cricket (8 Overs Match)',
    teamName: 'Royal Challengers Bandra',
    captainName: 'Aman Patel',
    skillLevel: 'Competitive',
    date: 'Tomorrow',
    timeSlot: '21:00 - 22:30',
    arenaName: 'Thunder Box Cricket Arena',
    splitCostApprox: 200,
    neededSpots: 7,
    contactPhone: '+91 98332 99014',
    description: 'We have our 7 ready and booked the slot. Looking for a competitive squad to play a best-of-3 series under the floodlights. Winner takes bragging rights!',
    joinedCount: 0,
    createdAt: '2 hours ago'
  },
  {
    id: 'mc-3',
    title: 'Casual 5v5 Sunday Morning Football Game',
    sport: 'football',
    format: '5v5 Mixed Friendly',
    teamName: 'Weekend Warriors',
    captainName: 'Devansh K.',
    skillLevel: 'Casual',
    date: 'Sunday',
    timeSlot: '07:00 - 08:30 AM',
    arenaName: 'Colosseum Football Arena',
    splitCostApprox: 140,
    neededSpots: 3,
    contactPhone: '+91 97664 12098',
    description: 'Relaxed fitness-focused game followed by juices at the cafe. All skill levels welcome, zero toxicity.',
    joinedCount: 1,
    createdAt: '5 hours ago'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Vikramaditya Sengupta',
    team: 'Dynamo Bandra FC',
    sport: 'football',
    rating: 5,
    date: '3 days ago',
    comment: 'Hands down the best turf in the city. The monofilament grass has zero plastic burn when sliding, and the 500-lux lights make late night 11 PM matches feel like Champions League.',
    arenaName: 'Colosseum Football Arena'
  },
  {
    id: 'rev-2',
    name: 'Kunal Deshmukh',
    team: 'Midnight Strikers',
    sport: 'cricket',
    rating: 5,
    date: '1 week ago',
    comment: 'The boundary netting at the box cricket arena is tight and high, so you can play lofted shots without losing the ball. Clean changing rooms and chilled electrolyte water at the dugout.',
    arenaName: 'Thunder Box Cricket Arena'
  },
  {
    id: 'rev-3',
    name: 'Siddharth Rao',
    team: 'Tech Titans Corporate',
    sport: 'football',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Smooth online booking experience! We reserved 2 hours for our company tournament, booked the referee and 4K recording. The highlights reel delivered the next morning was pristine.',
    arenaName: 'Colosseum Football Arena'
  }
];

export const AMENITIES = [
  {
    title: '550 Lux Stadium Floodlights',
    description: 'Zero dark corners. High-wattage LED lights calibrated for night visibility and slow-motion video captures.',
    icon: 'Sun'
  },
  {
    title: 'FIFA-Grade Shockpad Underlay',
    description: 'Dual layer high-density cushion reducing knee shock and ankle strain by over 45% compared to concrete basements.',
    icon: 'ShieldCheck'
  },
  {
    title: 'AC Changing Rooms & Showers',
    description: 'Spacious air-conditioned locker rooms, hot water pressure showers, and secure gear storage.',
    icon: 'Bath'
  },
  {
    title: 'Player Dugouts & Viewing Lounge',
    description: 'Covered substitute dugouts with water dispensers plus an elevated spectator viewing gallery.',
    icon: 'Armchair'
  },
  {
    title: 'Sports Cafe & Nutrition Bar',
    description: 'Fresh fruit smoothies, cold brew coffees, protein snacks, and chilled energy drinks post-match.',
    icon: 'Coffee'
  },
  {
    title: '4K Match Stream & Highlights',
    description: 'AI bird-eye pitch cameras tracking game flow. Download your goals and cricket sixes in high definition.',
    icon: 'Camera'
  }
];
