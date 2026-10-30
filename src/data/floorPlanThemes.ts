export type FloorPlanTheme =
  | 'onyx-gold'
  | 'blueprint'
  | 'nordic-ivory'
  | 'emerald-sanctuary'
  | 'champagne-rose'
  | 'vastu-mandala'
  | 'twilight-slate';

export interface ThemeConfig {
  name: string;
  shortName: string;
  tagline: string;
  accentColor: string;
  badgeBorder: string;
  badgeBg: string;
  badgeText: string;
  glowColor: string;
  swatchColors: [string, string, string];
  viewportBg: string;
  gridStroke: string;
  gridOpacity: string;
  outerWallStroke: string;
  defaultRoomFill: string;
  defaultRoomStroke: string;
  selectedRoomStroke: string;
  roomTextColor: string;
  roomSubTextColor: string;
  pinColor: string;
}

export const FLOOR_PLAN_THEMES: Record<FloorPlanTheme, ThemeConfig> = {
  'onyx-gold': {
    name: 'Onyx & Imperial Gold',
    shortName: 'Onyx Gold',
    tagline: 'Signature dark onyx background with 24K gold drafting lines',
    accentColor: '#C5A869',
    badgeBorder: 'rgba(197, 168, 105, 0.4)',
    badgeBg: 'rgba(197, 168, 105, 0.12)',
    badgeText: '#FDE68A',
    glowColor: 'rgba(197, 168, 105, 0.15)',
    swatchColors: ['#070A0F', '#C5A869', '#F5F2EC'],
    viewportBg: '#070A0F',
    gridStroke: '#C5A869',
    gridOpacity: '0.18',
    outerWallStroke: '#C5A869',
    defaultRoomFill: 'rgba(15, 23, 42, 0.65)',
    defaultRoomStroke: '#475569',
    selectedRoomStroke: '#C5A869',
    roomTextColor: '#F8FAFC',
    roomSubTextColor: '#CBD5E1',
    pinColor: '#FDE047',
  },
  blueprint: {
    name: 'Architectural CAD Blueprint',
    shortName: 'CAD Blueprint',
    tagline: 'Classic cyan-on-navy engineering layout blueprint',
    accentColor: '#38BDF8',
    badgeBorder: 'rgba(56, 189, 248, 0.4)',
    badgeBg: 'rgba(56, 189, 248, 0.12)',
    badgeText: '#BAE6FD',
    glowColor: 'rgba(56, 189, 248, 0.15)',
    swatchColors: ['#020914', '#0284C7', '#38BDF8'],
    viewportBg: '#041022',
    gridStroke: '#38BDF8',
    gridOpacity: '0.22',
    outerWallStroke: '#38BDF8',
    defaultRoomFill: 'rgba(2, 132, 199, 0.15)',
    defaultRoomStroke: '#0284C7',
    selectedRoomStroke: '#38BDF8',
    roomTextColor: '#F0F9FF',
    roomSubTextColor: '#BAE6FD',
    pinColor: '#38BDF8',
  },
  'nordic-ivory': {
    name: 'Warm Ivory Paper',
    shortName: 'Ivory Paper',
    tagline: 'Daylight studio parchment with espresso drafting lines',
    accentColor: '#8D7039',
    badgeBorder: 'rgba(141, 112, 57, 0.4)',
    badgeBg: 'rgba(141, 112, 57, 0.12)',
    badgeText: '#78350F',
    glowColor: 'rgba(141, 112, 57, 0.12)',
    swatchColors: ['#EDE8DD', '#8D7039', '#1E293B'],
    viewportBg: '#F8F6F0',
    gridStroke: '#94A3B8',
    gridOpacity: '0.25',
    outerWallStroke: '#1E293B',
    defaultRoomFill: 'rgba(226, 232, 240, 0.6)',
    defaultRoomStroke: '#64748B',
    selectedRoomStroke: '#8D7039',
    roomTextColor: '#0F172A',
    roomSubTextColor: '#334155',
    pinColor: '#8D7039',
  },
  'emerald-sanctuary': {
    name: 'Emerald & Brass',
    shortName: 'Emerald',
    tagline: 'Deep botanical green with warm brushed brass accents',
    accentColor: '#34D399',
    badgeBorder: 'rgba(52, 211, 153, 0.4)',
    badgeBg: 'rgba(52, 211, 153, 0.12)',
    badgeText: '#A7F3D0',
    glowColor: 'rgba(52, 211, 153, 0.15)',
    swatchColors: ['#030E09', '#059669', '#34D399'],
    viewportBg: '#04140D',
    gridStroke: '#10B981',
    gridOpacity: '0.18',
    outerWallStroke: '#34D399',
    defaultRoomFill: 'rgba(6, 78, 59, 0.35)',
    defaultRoomStroke: '#047857',
    selectedRoomStroke: '#34D399',
    roomTextColor: '#ECFDF5',
    roomSubTextColor: '#A7F3D0',
    pinColor: '#34D399',
  },
  'champagne-rose': {
    name: 'Champagne Bronze',
    shortName: 'Champagne',
    tagline: 'Warm bronze and rose-gold gallery lighting',
    accentColor: '#FBBF24',
    badgeBorder: 'rgba(251, 191, 36, 0.4)',
    badgeBg: 'rgba(251, 191, 36, 0.12)',
    badgeText: '#FDE68A',
    glowColor: 'rgba(251, 191, 36, 0.15)',
    swatchColors: ['#0D070B', '#B45309', '#FBBF24'],
    viewportBg: '#120A0F',
    gridStroke: '#F59E0B',
    gridOpacity: '0.18',
    outerWallStroke: '#FBBF24',
    defaultRoomFill: 'rgba(30, 20, 28, 0.6)',
    defaultRoomStroke: '#78350F',
    selectedRoomStroke: '#FBBF24',
    roomTextColor: '#FFFBEB',
    roomSubTextColor: '#FDE68A',
    pinColor: '#FBBF24',
  },
  'vastu-mandala': {
    name: 'Vastu Purusha Mandala',
    shortName: 'Vastu Grid',
    tagline: '8-directional Vastu energy quadrant overlay',
    accentColor: '#F59E0B',
    badgeBorder: 'rgba(245, 158, 11, 0.4)',
    badgeBg: 'rgba(245, 158, 11, 0.12)',
    badgeText: '#FEF08A',
    glowColor: 'rgba(245, 158, 11, 0.18)',
    swatchColors: ['#10B981', '#F59E0B', '#EF4444'],
    viewportBg: '#090D16',
    gridStroke: '#F59E0B',
    gridOpacity: '0.24',
    outerWallStroke: '#F59E0B',
    defaultRoomFill: 'rgba(15, 23, 42, 0.55)',
    defaultRoomStroke: '#64748B',
    selectedRoomStroke: '#F59E0B',
    roomTextColor: '#FFFFFF',
    roomSubTextColor: '#FDE68A',
    pinColor: '#F59E0B',
  },
  'twilight-slate': {
    name: 'Twilight Obsidian Slate',
    shortName: 'Twilight',
    tagline: 'Minimalist graphite slate with platinum highlights',
    accentColor: '#E2E8F0',
    badgeBorder: 'rgba(226, 232, 240, 0.35)',
    badgeBg: 'rgba(226, 232, 240, 0.1)',
    badgeText: '#F8FAFC',
    glowColor: 'rgba(226, 232, 240, 0.12)',
    swatchColors: ['#0F172A', '#475569', '#E2E8F0'],
    viewportBg: '#0B0F17',
    gridStroke: '#94A3B8',
    gridOpacity: '0.18',
    outerWallStroke: '#E2E8F0',
    defaultRoomFill: 'rgba(30, 41, 59, 0.5)',
    defaultRoomStroke: '#475569',
    selectedRoomStroke: '#E2E8F0',
    roomTextColor: '#F8FAFC',
    roomSubTextColor: '#CBD5E1',
    pinColor: '#E2E8F0',
  },
};

export interface MaterialSwatch {
  id: string;
  name: string;
  category: string;
  application: string;
  origin: string;
  finish: string;
  imageUrl: string;
}

export const LUXURY_MATERIAL_SWATCHES: MaterialSwatch[] = [
  {
    id: 'sw-1',
    name: 'Italian Botticino Vitrified Slab',
    category: 'Flooring',
    application: 'Living, Dining & Foyer',
    origin: 'Morbi / Italian Spec',
    finish: 'High-Gloss Mirror Polish',
    imageUrl: '/images/vedmay/flats-living.jpg',
  },
  {
    id: 'sw-2',
    name: 'Warm Walnut Hardwood Texture',
    category: 'Master Suite',
    application: 'Master Bedroom Flooring',
    origin: 'Engineered Acoustic Plank',
    finish: 'Matte Satin Seal',
    imageUrl: '/images/vedmay/flats-bedroom.jpg',
  },
  {
    id: 'sw-3',
    name: 'Black Galaxy Quartz Countertop',
    category: 'Kitchen',
    application: 'Modular Kitchen Platform',
    origin: 'South Indian Granite / Quartz',
    finish: 'Stain-Resistant Honed',
    imageUrl: '/images/vedmay/flats-kitchen.jpg',
  },
];

export interface RoomPhotoSet {
  daylight: string;
  twilight: string;
  finishes: string;
}

export const ROOM_PHOTOGRAPHY: Record<string, RoomPhotoSet> = {
  'room-living': {
    daylight: '/images/vedmay/flats-living.jpg',
    twilight: '/images/vedmay/flats-exterior.jpg',
    finishes: '/images/vedmay/flats-living.jpg',
  },
  'room-master': {
    daylight: '/images/vedmay/flats-bedroom.jpg',
    twilight: '/images/vedmay/flats-bedroom.jpg',
    finishes: '/images/vedmay/flats-bedroom.jpg',
  },
  'room-kitchen': {
    daylight: '/images/vedmay/flats-kitchen.jpg',
    twilight: '/images/vedmay/flats-kitchen.jpg',
    finishes: '/images/vedmay/flats-kitchen.jpg',
  },
  'room-balcony': {
    daylight: '/images/vedmay/flats-terrace.jpg',
    twilight: '/images/vedmay/flats-facade.jpg',
    finishes: '/images/vedmay/flats-terrace.jpg',
  },
};

export const PLAN_3D_CUTAWAY_IMAGES: Record<
  string,
  { render: string; blueprint: string; isometric: string }
> = {
  'fp-3bhk-fortune': {
    render: '/images/vedmay/vedira-fortune-plan.png',
    blueprint: '/images/vedmay/vedira-fortune-plan.png',
    isometric: '/images/vedmay/vedira-fortune-elevation.png',
  },
};

export interface BhkArchitecturalSnapshot {
  badge: string;
  superBuiltUp: string;
  carpetArea: string;
  balconyArea: string;
  priceEstimate: string;
  caption: string;
  description: string;
  specs: string[];
  hero3DCutaway: string;
  livingLounge: string;
  masterSuite: string;
  kitchenDining: string;
  balconyTerrace: string;
  daylightView: string;
  twilightView: string;
  blueprintSketch: string;
}

export const BHK_ARCHITECTURAL_SNAPSHOTS: Record<
  '2BHK' | '3BHK' | '4BHK',
  BhkArchitecturalSnapshot
> = {
  '2BHK': {
    badge: 'VEDIRA HEIGHTS & BLISS',
    superBuiltUp: '1,050 Sq.Ft.',
    carpetArea: '785 Sq.Ft.',
    balconyArea: '110 Sq.Ft.',
    priceEstimate: '₹48 Lakhs*',
    caption: 'Smart Vastu-compliant 2 BHK layout in Nagpur with cross-ventilated living lounge.',
    description:
      'Designed for modern nuclear families in Nagpur with zero wasted corridor space and bright natural daylight.',
    specs: [
      'East-West cross ventilation',
      'Branded vitrified flooring',
      'Solar water heating provision',
    ],
    hero3DCutaway: '/images/vedmay/vedira-heights-2.jpg',
    livingLounge: '/images/vedmay/flats-living.jpg',
    masterSuite: '/images/vedmay/flats-bedroom.jpg',
    kitchenDining: '/images/vedmay/flats-kitchen.jpg',
    balconyTerrace: '/images/vedmay/flats-terrace.jpg',
    daylightView: '/images/vedmay/vedira-heights-1.jpg',
    twilightView: '/images/vedmay/flats-facade.jpg',
    blueprintSketch: '/images/vedmay/vedira-fortune-plan.png',
  },
  '3BHK': {
    badge: 'VEDIRA FORTUNE FLAGSHIP',
    superBuiltUp: '1,450 Sq.Ft.',
    carpetArea: '1,120 Sq.Ft.',
    balconyArea: '165 Sq.Ft.',
    priceEstimate: '₹78 Lakhs*',
    caption:
      'Official Vedira Fortune 3 BHK Floor Plan (Somalwada / Manish Nagar, Nagpur) — RERA P50500077649.',
    description:
      'Spacious 3 BHK luxury apartment featuring grand living lounge, sit-out terrace deck, and 100% Vastu compliance.',
    specs: [
      'MahaRERA Registered: P50500077649',
      '1,450 Sq.Ft. Super Built-up Area',
      'Dedicated EV charging & covered parking',
    ],
    hero3DCutaway: '/images/vedmay/vedira-fortune-plan.png',
    livingLounge: '/images/vedmay/flats-living.jpg',
    masterSuite: '/images/vedmay/flats-bedroom.jpg',
    kitchenDining: '/images/vedmay/flats-kitchen.jpg',
    balconyTerrace: '/images/vedmay/flats-terrace.jpg',
    daylightView: '/images/vedmay/vedira-fortune-main.png',
    twilightView: '/images/vedmay/vedira-fortune-elevation.png',
    blueprintSketch: '/images/vedmay/vedira-fortune-plan.png',
  },
  '4BHK': {
    badge: 'CUSTOM BUNGALOW / PLOT BUILD',
    superBuiltUp: '2,400 Sq.Ft.',
    carpetArea: '1,890 Sq.Ft.',
    balconyArea: '260 Sq.Ft.',
    priceEstimate: '₹1.25 Cr*',
    caption:
      'Bespoke 4 BHK duplex villa construction on NMRDA sanctioned plots at Om Shree Estate & Sai Nagri.',
    description:
      'Turnkey architectural design and civil construction by Vedmay Infra on your chosen NMRDA sanctioned plot.',
    specs: [
      'Custom duplex bungalow elevation',
      'Fe-550D RCC earthquake-resistant frame',
      'Private lawn & double car porch',
    ],
    hero3DCutaway: '/images/vedmay/vedira-fortune-elevation.png',
    livingLounge: '/images/vedmay/flats-living.jpg',
    masterSuite: '/images/vedmay/flats-bedroom.jpg',
    kitchenDining: '/images/vedmay/flats-kitchen.jpg',
    balconyTerrace: '/images/vedmay/flats-terrace.jpg',
    daylightView: '/images/vedmay/om-shree-estate-main.jpg',
    twilightView: '/images/vedmay/flats-exterior.jpg',
    blueprintSketch: '/images/vedmay/om-shree-map.png',
  },
};
