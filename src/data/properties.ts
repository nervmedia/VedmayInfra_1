export interface RoomDetail {
  id: string;
  name: string;
  dimensions: string;
  sqft: number;
  sqm: number;
  vastuQuadrant: string;
  finishes: string;
  lighting: string;
  coordinates: { x: number; y: number; width: number; height: number };
}

export interface FloorPlanOption {
  id: string;
  title: string;
  config: string;
  superBuiltUpSqFt: number;
  carpetSqFt: number;
  balconySqFt: number;
  vastuScore: number;
  facing: string;
  description: string;
  rooms: RoomDetail[];
}

export interface GalleryItem {
  id: string;
  caption: string;
  category: 'Exterior' | 'Living Room' | 'Master Suite' | 'Terrace Deck' | 'Kitchen' | 'Amenities';
  aspectRatio: string;
  image: string;
}

export interface Property {
  id: string;
  title: string;
  subtitle: string;
  category: 'ultra-luxury-flats' | 'sky-mansions' | 'plotted-enclaves' | 'commercial';
  tabCategories: ('featured' | 'new-launches' | 'communities' | 'ready-to-move' | 'commercial')[];
  location: string;
  city: string;
  priceStartingFrom: number;
  priceDisplay: string;
  configurations: string[];
  carpetAreaRange: string;
  status: 'Ready to Move' | 'Under Construction' | 'New Launch';
  statusKicker?: string;
  completionDate: string;
  reraNumber: string;
  image: string;
  highlightSpecs: string[];
  description: string;
  features: {
    vastuCompliant: boolean;
    evCharging: boolean;
    solarGrid: boolean;
    biometricSecurity: boolean;
    terraceGazebo: boolean;
    rainwaterHarvesting: boolean;
  };
  gallery: GalleryItem[];
  floorPlans: FloorPlanOption[];
}

export const PROPERTIES: Property[] = [
  {
    id: 'vedira-fortune',
    title: 'Vedira Fortune',
    subtitle: '3 BHK Ultra Luxury Flats in Manish Nagar, Nagpur',
    category: 'ultra-luxury-flats',
    tabCategories: ['featured', 'new-launches'],
    statusKicker: 'Possession Started',
    location: 'Manish Nagar, Nagpur',
    city: 'Nagpur',
    priceStartingFrom: 14500000,
    priceDisplay: '₹1.45 Cr onwards',
    configurations: ['3 BHK Ultra-Luxury Flat (1,550 sq. ft.)'],
    carpetAreaRange: '1,550 sq. ft. Super Built-Up',
    status: 'Under Construction',
    completionDate: 'December 2026',
    reraNumber: 'P50500077649',
    image: '/images/vedmay/vedira-fortune-main.png',
    highlightSpecs: [
      '3 BHK Ultra-Luxury Flats crafted for elegance and modern convenience in Manish Nagar',
      'MahaRERA Registered Project (RERA Reg: P50500077649) with 100% clear title',
      'Thumb-print biometric digital door locks & smart video door security',
      '5kW common solar grid system powering common utilities & elevators',
      'Dedicated EV vehicle fast-charging stations in stilt parking',
      'Rooftop gazebo lounge, landscaped terrace & 100% Vastu-compliant layout',
    ],
    description:
      'A signature landmark project by Vedmay Infra, Vedira Fortune redefines modern living with elegance and class. Located in the heart of Nagpur at Manish Nagar, this premium residential project offers 3 BHK ultra luxury flats crafted for those who desire sophistication, comfort, and convenience. More than just a property, Vedira Fortune is a lifestyle.',
    features: {
      vastuCompliant: true,
      evCharging: true,
      solarGrid: true,
      biometricSecurity: true,
      terraceGazebo: true,
      rainwaterHarvesting: true,
    },
    gallery: [
      {
        id: 'vf-1',
        caption: 'Vedira Fortune — 3 BHK Ultra Luxury Flats Official Presentation Poster',
        category: 'Exterior',
        aspectRatio: '16:9',
        image: '/images/vedmay/vedira-fortune-main.png',
      },
      {
        id: 'vf-2',
        caption: 'Vedira Fortune — Full Architectural Building Elevation',
        category: 'Exterior',
        aspectRatio: '16:9',
        image: '/images/vedmay/vedira-fortune-elevation.png',
      },
      {
        id: 'vf-7',
        caption: 'Vedira Fortune — Official 3 BHK Architectural Floor Plan & Layout',
        category: 'Amenities',
        aspectRatio: '16:9',
        image: '/images/vedmay/vedira-fortune-plan.png',
      },
      {
        id: 'vf-8',
        caption: 'Vedira Fortune — Official Manish Nagar Location & Connectivity Map',
        category: 'Amenities',
        aspectRatio: '16:9',
        image: '/images/vedmay/vedira-fortune-location.png',
      },
      {
        id: 'vf-3',
        caption: 'Living & Dining Luxury Hall with Designer False Ceiling',
        category: 'Living Room',
        aspectRatio: '16:9',
        image: '/images/vedmay/flats-living.jpg',
      },
      {
        id: 'vf-4',
        caption: 'Master Bedroom Suite with Wooden Flooring Finish',
        category: 'Master Suite',
        aspectRatio: '16:9',
        image: '/images/vedmay/flats-bedroom.jpg',
      },
      {
        id: 'vf-5',
        caption: 'Contemporary Modular Kitchen with Granite Counter',
        category: 'Kitchen',
        aspectRatio: '16:9',
        image: '/images/vedmay/flats-kitchen.jpg',
      },
      {
        id: 'vf-6',
        caption: 'Cantilevered Sky Terrace & Open Air Balcony',
        category: 'Terrace Deck',
        aspectRatio: '16:9',
        image: '/images/vedmay/flats-terrace.jpg',
      },
    ],
    floorPlans: [
      {
        id: 'fp-vf-3bhk',
        title: 'Vedira Fortune — 3 BHK Ultra-Luxury Residence',
        config: '3 Bed · 3 Bath · Living & Dining · Modular Kitchen · Wide Balconies',
        superBuiltUpSqFt: 1550,
        carpetSqFt: 1240,
        balconySqFt: 180,
        vastuScore: 98,
        facing: 'East Facing Entrance',
        description:
          'Spacious 3 BHK residence in Manish Nagar with cross-ventilation, wide sit-out balconies, and Vastu-compliant room placements.',
        rooms: [
          {
            id: 'room-vf-foyer',
            name: 'Grand Entrance Foyer',
            dimensions: `8'6" × 6'4"`,
            sqft: 54,
            sqm: 5.0,
            vastuQuadrant: 'Ishanya (North-East)',
            finishes: 'Premium vitrified marble-finish flooring with biometric main door',
            lighting: 'Recessed warm architectural spot lighting',
            coordinates: { x: 30, y: 15, width: 70, height: 50 },
          },
          {
            id: 'room-vf-living',
            name: 'Living & Dining Hall',
            dimensions: `22'0" × 14'6"`,
            sqft: 319,
            sqm: 29.6,
            vastuQuadrant: 'East (Surya Mandalam)',
            finishes: 'Double-charged vitrified tiles & designer POP false ceiling',
            lighting: 'Concealed LED cove ambient illumination',
            coordinates: { x: 105, y: 15, width: 180, height: 110 },
          },
          {
            id: 'room-vf-master',
            name: 'Primary Master Bedroom',
            dimensions: `15'0" × 13'0"`,
            sqft: 195,
            sqm: 18.1,
            vastuQuadrant: 'Nairutya (South-West)',
            finishes: 'Laminated wooden texture flooring with attached dress & bath',
            lighting: 'Warm bedside reading lights & natural balcony daylight',
            coordinates: { x: 30, y: 70, width: 140, height: 110 },
          },
          {
            id: 'room-vf-kitchen',
            name: 'Modular Kitchen & Utility',
            dimensions: `12'0" × 10'0"`,
            sqft: 120,
            sqm: 11.1,
            vastuQuadrant: 'Agneya (South-East)',
            finishes: 'Granite platform with stainless steel sink & glazed dado tiles',
            lighting: 'High-CRI task illumination with attached dry utility balcony',
            coordinates: { x: 290, y: 15, width: 100, height: 85 },
          },
        ],
      },
    ],
  },
  {
    id: 'om-shree-estate',
    title: 'Om Shree Estate',
    subtitle: 'NMRDA Sanctioned Residential & Commercial Plotted Township',
    category: 'plotted-enclaves',
    tabCategories: ['featured', 'communities', 'new-launches'],
    statusKicker: 'Possession Started',
    location: 'Umred Road / Dongergaon, Nagpur',
    city: 'Nagpur',
    priceStartingFrom: 2500000,
    priceDisplay: '₹25 Lakh onwards',
    configurations: ['476 sq. ft. Base Plot', '1,500 sq. ft. Residential Plot', '2,500 - 4,500 sq. ft. Corner Plot'],
    carpetAreaRange: '476 - 4,500 sq. ft.',
    status: 'Under Construction',
    completionDate: 'Possession Started',
    reraNumber: 'NMRDA Sanctioned RL',
    image: '/images/vedmay/om-shree-estate-main.jpg',
    highlightSpecs: [
      'Prestigious ongoing landmark project on Umred Road / Dongergaon corridor, Nagpur',
      'Combines innovative township design, superior quality, and unmatched convenience',
      'Sanctioned layout by NMRDA with RL and clear litigation-free 7/12 title',
      'Wide cement concrete avenues with underground electrical and drainage network',
      'Grand architectural entrance gate and boundary wall security',
      'Up to 80–90% bank finance available from leading nationalized banks',
    ],
    description:
      'Om Shree Estate is our prestigious ongoing project designed to set new standards in urban living. Located on the prime Umred Road / Dongergaon corridor of Nagpur, this project combines innovative design, superior quality, and unmatched convenience to offer an exceptional residential and investment experience.',
    features: {
      vastuCompliant: true,
      evCharging: true,
      solarGrid: true,
      biometricSecurity: true,
      terraceGazebo: false,
      rainwaterHarvesting: true,
    },
    gallery: [
      {
        id: 'os-1',
        caption: 'Om Shree Estate - Full Sanctioned Master Layout Plan',
        category: 'Exterior',
        aspectRatio: '16:9',
        image: '/images/vedmay/om-shree-estate-main.jpg',
      },
      {
        id: 'os-2',
        caption: 'Official Sanctioned Map with Plot Number Demarcations',
        category: 'Exterior',
        aspectRatio: '16:9',
        image: '/images/vedmay/om-shree-map.png',
      },
      {
        id: 'os-3',
        caption: 'Grand Entrance Gatehouse & Boundary Wall Arch',
        category: 'Exterior',
        aspectRatio: '16:9',
        image: '/images/vedmay/om-shree-estate-gate.jpg',
      },
      {
        id: 'os-4',
        caption: 'Actual On-Site Development, Asphalt Roads & Electrification',
        category: 'Amenities',
        aspectRatio: '16:9',
        image: '/images/vedmay/om-shree-estate-site.jpg',
      },
    ],
    floorPlans: [
      {
        id: 'fp-os-plot',
        title: 'Om Shree Estate - Villa Plot (2,500 sq. ft.)',
        config: '50ft × 50ft · NMRDA Sanctioned · Clear Title',
        superBuiltUpSqFt: 2500,
        carpetSqFt: 2500,
        balconySqFt: 0,
        vastuScore: 100,
        facing: 'East-Facing Wide Road',
        description: 'Prime rectangular villa plot ready for immediate custom bungalow construction.',
        rooms: [
          {
            id: 'room-os-footprint',
            name: 'Villa Building Envelope',
            dimensions: `35'0" × 40'0"`,
            sqft: 1400,
            sqm: 130.0,
            vastuQuadrant: 'Central Brahmasthan',
            finishes: 'Levelled ground with boundary markers and utility taps',
            lighting: 'All-day open sky natural illumination',
            coordinates: { x: 50, y: 50, width: 280, height: 200 },
          },
        ],
      },
    ],
  },
  {
    id: 'sai-nagri-9',
    title: 'Sai Nagri 9 Borekhedi',
    subtitle: 'NMRDA Sanctioned Residential & Commercial Plotted Enclave',
    category: 'plotted-enclaves',
    tabCategories: ['communities', 'ready-to-move'],
    statusKicker: 'Possession Started',
    location: 'Borekhedi, Nagpur, India',
    city: 'Nagpur',
    priceStartingFrom: 1800000,
    priceDisplay: '₹18 Lakh onwards',
    configurations: ['476 sq. ft. Base Plot', '1,200 sq. ft. Plot', '1,800 - 3,200 sq. ft. Villa Plot'],
    carpetAreaRange: '476 - 3,200 sq. ft.',
    status: 'Ready to Move',
    completionDate: 'Possession Started',
    reraNumber: 'NMRDA Sanctioned RL',
    image: '/images/vedmay/sai-nagri-9-main.png',
    highlightSpecs: [
      'Strategically located in thriving Borekhedi along Nagpur growth corridor',
      'Perfect blend of modern township infrastructure and serene green surroundings',
      'Clear legal titles with up to 80–90% bank loan approvals available',
      'Demarcated individual plots with wide cement concrete internal roads',
      'Water supply line, electricity network & underground sewage drainage',
      'High appreciation potential with possession already started',
    ],
    description:
      'Welcome to Sai Nagri 9, Borekhedi, a prestigious project by Vedmay Infra offering the perfect blend of modern lifestyle and serene surroundings. Strategically located in the thriving location of Borekhedi with possession already started, this project gives investors and homeowners unmatched value and peace of mind.',
    features: {
      vastuCompliant: true,
      evCharging: false,
      solarGrid: true,
      biometricSecurity: false,
      terraceGazebo: false,
      rainwaterHarvesting: true,
    },
    gallery: [
      {
        id: 'sn9-1',
        caption: 'Sai Nagri 9 Borekhedi — Official Project Brochure Poster',
        category: 'Exterior',
        aspectRatio: '16:9',
        image: '/images/vedmay/sai-nagri-9-main.png',
      },
      {
        id: 'sn9-2',
        caption: 'Sai Nagri 9 — Official Sanctioned Layout Map with Highway Access',
        category: 'Exterior',
        aspectRatio: '16:9',
        image: '/images/vedmay/sai-nagri-9-layout.png',
      },
      {
        id: 'sn9-3',
        caption: 'Sai Nagri 9 Borekhedi — Strategic Location Map & Landmarks',
        category: 'Amenities',
        aspectRatio: '16:9',
        image: '/images/vedmay/sai-nagri-9-location.jpg',
      },
    ],
    floorPlans: [
      {
        id: 'fp-sn9-plot',
        title: 'Sai Nagri 9 - Residential Plot (1,800 sq. ft.)',
        config: '30ft × 60ft · North-East Facing · Ready for Construction',
        superBuiltUpSqFt: 1800,
        carpetSqFt: 1800,
        balconySqFt: 0,
        vastuScore: 96,
        facing: 'North-East Road',
        description: 'Ideal proportions for constructing a private family bungalow in Borekhedi.',
        rooms: [
          {
            id: 'room-sn9-core',
            name: 'Plot Demarcation',
            dimensions: `30'0" × 60'0"`,
            sqft: 1800,
            sqm: 167.2,
            vastuQuadrant: 'North-East',
            finishes: 'Concrete boundary pegs with road frontage',
            lighting: 'Open daylight access',
            coordinates: { x: 60, y: 60, width: 260, height: 180 },
          },
        ],
      },
    ],
  },
  {
    id: 'sai-nagri-8',
    title: 'Sai Nagri 8 Dongergaon',
    subtitle: 'Premium NMRDA Sanctioned Plots for Sale in Nagpur',
    category: 'plotted-enclaves',
    tabCategories: ['communities', 'new-launches'],
    statusKicker: 'Now Booking',
    location: 'Dongergaon, Wardha Road, Nagpur',
    city: 'Nagpur',
    priceStartingFrom: 2200000,
    priceDisplay: '₹22 Lakh onwards',
    configurations: ['476 sq. ft. Base Plot', '1,350 sq. ft. Plot', '2,100 - 3,500 sq. ft. Corner Plot'],
    carpetAreaRange: '476 - 3,500 sq. ft.',
    status: 'New Launch',
    completionDate: 'Phase 1 Ready',
    reraNumber: 'NMRDA Sanctioned RL',
    image: '/images/vedmay/sai-nagri-8-main.png',
    highlightSpecs: [
      'Thoughtfully planned project by Vedmay Infra in scenic Dongergaon, Wardha Road',
      'Perfect harmony of tranquility, modernity, and nature',
      'Clear title sanction with instant registration and mutation',
      'Lush open garden reserves and children play area',
      'Wide concrete streets with street lighting throughout the layout',
      'Prime connectivity to Wardha Road, Metro, AIIMS, and MIHAN SEZ',
    ],
    description:
      'Discover Sai Nagri 8 – Premium Plots for Sale in Nagpur. Welcome to Sai Nagri 8, a thoughtfully planned project by Vedmay Infra that perfectly blends tranquility, modernity, and comfort. Located in the picturesque landscape of Dongergaon on Wardha Road, this gated residential enclave offers titled plots with state-of-the-art civil infrastructure.',
    features: {
      vastuCompliant: true,
      evCharging: false,
      solarGrid: true,
      biometricSecurity: false,
      terraceGazebo: false,
      rainwaterHarvesting: true,
    },
    gallery: [
      {
        id: 'sn8-1',
        caption: 'Sai Nagri 8 Dongergaon — Official Project Poster',
        category: 'Exterior',
        aspectRatio: '3:4',
        image: '/images/vedmay/sai-nagri-8-main.png',
      },
      {
        id: 'sn8-2',
        caption: 'Sai Nagri 8 — Complete Sanctioned Layout & Internal Road Network',
        category: 'Exterior',
        aspectRatio: '16:9',
        image: '/images/vedmay/sai-nagri-8-layout.png',
      },
      {
        id: 'sn8-3',
        caption: 'Sai Nagri 8 — On-Site Development Progress & Amenities',
        category: 'Amenities',
        aspectRatio: '4:3',
        image: '/images/vedmay/sai-nagri-8-site.png',
      },
      {
        id: 'sn8-4',
        caption: 'Sai Nagri 8 Dongergaon — Strategic Location & Highway Connectivity Map',
        category: 'Amenities',
        aspectRatio: '16:9',
        image: '/images/vedmay/sai-nagri-8-location.jpg',
      },
    ],
    floorPlans: [
      {
        id: 'fp-sn8-plot',
        title: 'Sai Nagri 8 - Premium Villa Plot (2,100 sq. ft.)',
        config: '35ft × 60ft · Vastu Aligned · Direct Road Frontage',
        superBuiltUpSqFt: 2100,
        carpetSqFt: 2100,
        balconySqFt: 0,
        vastuScore: 97,
        facing: 'East Facing Road',
        description: 'Spacious corner villa plot in Dongergaon for building customized luxury homes.',
        rooms: [
          {
            id: 'room-sn8-bound',
            name: 'Villa Building Footprint',
            dimensions: `30'0" × 50'0"`,
            sqft: 1500,
            sqm: 139.3,
            vastuQuadrant: 'East & North',
            finishes: 'Levelled plot ready for immediate foundation work',
            lighting: 'Open panoramic daylighting',
            coordinates: { x: 50, y: 50, width: 270, height: 190 },
          },
        ],
      },
    ],
  },
  {
    id: 'sai-nagri-7',
    title: 'Sai Nagri 7 Panchgaon',
    subtitle: 'Harmonious Living & Prime Sanctioned Plots in Panchgaon',
    category: 'plotted-enclaves',
    tabCategories: ['communities', 'ready-to-move'],
    statusKicker: 'Possession Started',
    location: 'Panchgaon, Umred Road, Nagpur',
    city: 'Nagpur',
    priceStartingFrom: 1650000,
    priceDisplay: '₹16.5 Lakh onwards',
    configurations: ['476 sq. ft. Base Plot', '1,200 sq. ft. Plot', '1,650 - 2,800 sq. ft. Villa Plot'],
    carpetAreaRange: '476 - 2,800 sq. ft.',
    status: 'Ready to Move',
    completionDate: 'Possession Started',
    reraNumber: 'NMRDA Sanctioned RL',
    image: '/images/vedmay/sai-nagri-7-main.png',
    highlightSpecs: [
      'Remarkable project by Vedmay Infra offering modern living and natural serenity',
      'Located in thriving Panchgaon with swift access to central Nagpur',
      'Possession started with families already beginning home construction',
      'Electricity network, water supply lines & stormwater drainage',
      'Gated community layout with landscaped garden spaces',
      'High appreciation corridor adjoining major academic and industrial zones',
    ],
    description:
      'Welcome to Sai Nagri 7, a remarkable project by Vedmay Infra designed to offer a harmonious balance of modern living and natural serenity. Located in the thriving hub of Panchgaon, Nagpur, Sai Nagri 7 provides clear title residential plots ready for immediate villa construction.',
    features: {
      vastuCompliant: true,
      evCharging: false,
      solarGrid: true,
      biometricSecurity: false,
      terraceGazebo: false,
      rainwaterHarvesting: true,
    },
    gallery: [
      {
        id: 'sn7-1',
        caption: 'Sai Nagri 7 Panchgaon — Official Project Presentation Poster',
        category: 'Exterior',
        aspectRatio: '3:4',
        image: '/images/vedmay/sai-nagri-7-main.png',
      },
      {
        id: 'sn7-2',
        caption: 'Sai Nagri 7 — Sanctioned Layout Map with Clear Plot Demarcations',
        category: 'Exterior',
        aspectRatio: '16:9',
        image: '/images/vedmay/sai-nagri-7-layout.png',
      },
      {
        id: 'sn7-3',
        caption: 'Sai Nagri 7 Panchgaon — Strategic Location Map and Road Connectivity',
        category: 'Amenities',
        aspectRatio: '16:9',
        image: '/images/vedmay/sai-nagri-7-location.jpg',
      },
    ],
    floorPlans: [
      {
        id: 'fp-sn7-plot',
        title: 'Sai Nagri 7 - Villa Plot (1,650 sq. ft.)',
        config: '30ft × 55ft · East-Facing · Clear Title',
        superBuiltUpSqFt: 1650,
        carpetSqFt: 1650,
        balconySqFt: 0,
        vastuScore: 99,
        facing: 'East-Facing Road',
        description: 'Prime rectangular residential plot with direct connection to wide internal road.',
        rooms: [
          {
            id: 'room-sn7-core',
            name: 'Villa Building Footprint',
            dimensions: `26'0" × 45'0"`,
            sqft: 1170,
            sqm: 108.7,
            vastuQuadrant: 'East & North-East',
            finishes: 'Boundary demarcated with concrete pillars',
            lighting: 'Open daylight access',
            coordinates: { x: 50, y: 50, width: 260, height: 180 },
          },
        ],
      },
    ],
  },
  {
    id: 'vedmay-flats-collection',
    title: 'Vedira Heights & Ramalay Bliss',
    subtitle: 'Successfully Completed Residential Flats in Nagpur',
    category: 'ultra-luxury-flats',
    tabCategories: ['ready-to-move', 'featured'],
    statusKicker: 'Completed & Delivered',
    location: 'Manish Nagar & Prime Nagpur Enclaves',
    city: 'Nagpur',
    priceStartingFrom: 6500000,
    priceDisplay: 'Completed & Delivered',
    configurations: ['1 BHK Residence (45 Sqm / 485 sq. ft.)', '2 BHK Luxury Flat (73 Sqm / 785 sq. ft.)'],
    carpetAreaRange: '45 Sqm - 73 Sqm (approx)',
    status: 'Ready to Move',
    completionDate: 'Completed & Handed Over',
    reraNumber: 'OC Received · Delivered',
    image: '/images/vedmay/vedira-heights-1.jpg',
    highlightSpecs: [
      '#1 Vedira Heights (Nagpur): 1st Floor · 1 Bed · 1 Bath · 45 Sqm (approx)',
      '#2 Ramalay Bliss (Nagpur): 1st Floor · 2 Beds · 1 Bath · 73 Sqm (approx)',
      'Delivered on time with Occupancy Certificate (OC) and clear legal title',
      'Modern architectural facade with covered stilt car parking',
      'Designer false ceilings, modular kitchens, and premium vitrified flooring',
      'Prime Nagpur residential locations with seamless metro & airport access',
    ],
    description:
      'Vedira Heights and Ramalay Bliss showcase Vedmay Infra’s track record of successfully completed residential apartment projects in Nagpur. Constructed with uncompromising structural quality, modern elevations, and refined interior finishes, these completed homes reflect our promise of on-time delivery.',
    features: {
      vastuCompliant: true,
      evCharging: true,
      solarGrid: true,
      biometricSecurity: true,
      terraceGazebo: true,
      rainwaterHarvesting: true,
    },
    gallery: [
      {
        id: 'vfc-1',
        caption: 'Vedira Heights — Completed Residential Elevation (Daylight View)',
        category: 'Exterior',
        aspectRatio: '3:4',
        image: '/images/vedmay/vedira-heights-1.jpg',
      },
      {
        id: 'vfc-2',
        caption: 'Ramalay Bliss — Completed Architectural Elevation & Balcony Facade',
        category: 'Exterior',
        aspectRatio: '3:4',
        image: '/images/vedmay/vedira-heights-2.jpg',
      },
      {
        id: 'vfc-3',
        caption: 'Completed Apartment Building Exterior Facade',
        category: 'Exterior',
        aspectRatio: '3:4',
        image: '/images/vedmay/flats-facade.jpg',
      },
      {
        id: 'vfc-4',
        caption: 'Building Facade with Evening Architectural Lighting',
        category: 'Exterior',
        aspectRatio: '3:4',
        image: '/images/vedmay/flats-exterior.jpg',
      },
      {
        id: 'vfc-5',
        caption: 'Grand Entrance Gate & Covered Stilt Parking Access',
        category: 'Exterior',
        aspectRatio: '3:4',
        image: '/images/vedmay/flats-entrance.jpg',
      },
      {
        id: 'vfc-6',
        caption: 'Finished Living Room Interior with Designer False Ceiling',
        category: 'Living Room',
        aspectRatio: '3:4',
        image: '/images/vedmay/flats-living.jpg',
      },
      {
        id: 'vfc-7',
        caption: 'Spacious Master Bedroom Suite with Attached Balcony',
        category: 'Master Suite',
        aspectRatio: '3:4',
        image: '/images/vedmay/flats-bedroom.jpg',
      },
      {
        id: 'vfc-8',
        caption: 'Contemporary Kitchen with Granite Countertops & Storage',
        category: 'Kitchen',
        aspectRatio: '3:4',
        image: '/images/vedmay/flats-kitchen.jpg',
      },
      {
        id: 'vfc-9',
        caption: 'Private Terrace & Open Balcony View',
        category: 'Terrace Deck',
        aspectRatio: '3:4',
        image: '/images/vedmay/flats-terrace.jpg',
      },
    ],
    floorPlans: [
      {
        id: 'fp-vfc-flat',
        title: '3 BHK Boutique Luxury Residence',
        config: '3 Bed · 3 Bath · 2 Balconies · Covered Stilt Car Parking',
        superBuiltUpSqFt: 1980,
        carpetSqFt: 1540,
        balconySqFt: 180,
        vastuScore: 99,
        facing: 'East Facing Entrance',
        description: 'Ready-to-move 3 BHK residence with premium fixtures and cross-ventilation.',
        rooms: [
          {
            id: 'room-vfc-hall',
            name: 'Living & Dining Room',
            dimensions: `22'0" × 14'0"`,
            sqft: 308,
            sqm: 28.6,
            vastuQuadrant: 'East (Surya Mandalam)',
            finishes: 'Double-charged vitrified tiles with false ceiling',
            lighting: 'Concealed LED warm ambient lighting',
            coordinates: { x: 80, y: 30, width: 220, height: 140 },
          },
        ],
      },
    ],
  },
];

export interface NeighborhoodLandmark {
  id: string;
  name: string;
  category: 'Transit' | 'Business' | 'Healthcare' | 'Education' | 'Leisure';
  distanceKm: string;
  driveTimeMin: string;
  description: string;
}

export const NEIGHBORHOOD_LANDMARKS: NeighborhoodLandmark[] = [
  {
    id: 'l1',
    name: 'Dr. Babasaheb Ambedkar International Airport',
    category: 'Transit',
    distanceKm: '3.8 km',
    driveTimeMin: '8 mins',
    description: 'Fast direct drive via Wardha Road corridor with domestic & international connectivity.',
  },
  {
    id: 'l2',
    name: 'Airport South / Manish Nagar Metro Station',
    category: 'Transit',
    distanceKm: '1.2 km',
    driveTimeMin: '3 mins',
    description: 'Rapid seamless metro transit connecting North and South Nagpur corridors.',
  },
  {
    id: 'l3',
    name: 'MIHAN SEZ & AIIMS Medical Campus',
    category: 'Healthcare',
    distanceKm: '6.5 km',
    driveTimeMin: '12 mins',
    description: 'Premier medical university and multi-specialty tertiary care hospital.',
  },
  {
    id: 'l4',
    name: 'Infosys, TCS & Tech Mahindra Campus',
    category: 'Business',
    distanceKm: '7.2 km',
    driveTimeMin: '14 mins',
    description: 'Nagpur’s flagship technology corridor employing over 35,000 IT professionals.',
  },
  {
    id: 'l5',
    name: 'Delhi Public School (DPS) & Somalwada Schools',
    category: 'Education',
    distanceKm: '2.1 km',
    driveTimeMin: '5 mins',
    description: 'Top-tier ICSE and CBSE educational institutions within neighborhood radius.',
  },
  {
    id: 'l6',
    name: 'Empress Mall & Prozone Galleria',
    category: 'Leisure',
    distanceKm: '7.8 km',
    driveTimeMin: '15 mins',
    description: 'Premium shopping, multiplex cinemas, fine dining, and entertainment.',
  },
];

export interface CompanyPillar {
  number: string;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
}

export const COMPANY_PILLARS: CompanyPillar[] = [
  {
    number: '01',
    title: 'Architectural Integrity & Vastu Science',
    description:
      'Every VEDMAY development harmonizes ancient Indian Vastu Shastra principles with modern civil engineering, optimizing natural light, cosmic energy flow, and thermal comfort.',
    metric: '100%',
    metricLabel: 'Vastu Compliant Layouts',
  },
  {
    number: '02',
    title: 'Precision Structural Engineering',
    description:
      'We build with Fe-550D grade steel, earthquake-resilient RCC framework, and waterproofing systems exceeding standard industry codes by 40%.',
    metric: '1.8M+',
    metricLabel: 'Sq. Ft. Built & Delivered',
  },
  {
    number: '03',
    title: 'Transparent Governance & Title Clearance',
    description:
      'Over a decade of zero-litigation records, transparent escrow accounts, sanctioned plans from NMRDA/NMC, and verified RERA approvals for complete peace of mind.',
    metric: '12+',
    metricLabel: 'Years of Trust in Nagpur',
  },
  {
    number: '04',
    title: 'Sustainable Green Innovations',
    description:
      'Leading Nagpur real estate with rooftop solar arrays, dedicated dual-port EV chargers for modern mobility, and multi-stage rainwater harvesting pits.',
    metric: '1,200+',
    metricLabel: 'Delighted Homeowners',
  },
];
