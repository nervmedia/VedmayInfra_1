import React, { useState } from 'react';
import {
  Sun,
  KeyRound,
  Zap,
  ShieldCheck,
  Sparkles,
  Droplets,
  ArrowUpRight,
  Compass,
} from 'lucide-react';

interface AmenitiesDeckProps {
  onOpenBooking: () => void;
}

export const AmenitiesDeck: React.FC<AmenitiesDeckProps> = ({ onOpenBooking }) => {
  const [activeAmenityIndex, setActiveAmenityIndex] = useState(0);

  const amenities = [
    {
      id: 'township-gate',
      icon: ShieldCheck,
      title: 'Grand Entrance Gate & Gated Boundary',
      category: 'Township Infrastructure',
      project: 'Om Shree Estate & Sai Nagri 7, 8, 9',
      highlight: 'NMRDA Sanctioned Gated Plotted Communities',
      description:
        'Every Vedmay Infra plotted township features a grand architectural entrance archway, peripheral boundary security, and clearly demarcated plots with concrete boundary pillars and wide internal roads.',
      spec: 'NMRDA Sanctioned Layout · RL Approved · Clear 7/12 Title',
      image: '/images/vedmay/om-shree-estate-gate.jpg',
    },
    {
      id: 'civil-roads',
      icon: Compass,
      title: 'Wide Cement Concrete Roads & Electrification',
      category: 'Civil Engineering',
      project: 'Om Shree Estate · Dongergaon · Borekhedi · Panchgaon',
      highlight: 'Complete On-Site Civil Infrastructure Before Handover',
      description:
        'We deliver fully developed internal cement concrete roads, street lighting poles, electrical transformer networks, and stormwater drainage lines so plot owners can begin home construction immediately.',
      spec: '9m & 12m Wide Internal Roads · Full Electrification Grid',
      image: '/images/vedmay/om-shree-estate-site.jpg',
    },
    {
      id: 'solar',
      icon: Sun,
      title: '3 BHK Ultra-Luxury Architectural Elevation & Solar Grid',
      category: 'Vedira Fortune · Manish Nagar',
      project: 'Vedira Fortune (MahaRERA: P50500077649)',
      highlight: '5kW Common Solar Array & Contemporary Facade',
      description:
        'Vedira Fortune in Manish Nagar integrates a high-efficiency rooftop solar array powering common elevators, passage lighting, and water pumps alongside a striking modern architectural facade.',
      spec: '1,550 Sq. Ft. 3 BHK Residence · MahaRERA P50500077649',
      image: '/images/vedmay/vedira-fortune-elevation.png',
    },
    {
      id: 'biometric',
      icon: KeyRound,
      title: 'Designer Living Halls & Smart Biometric Access',
      category: 'Interior Finishes',
      project: 'Vedira Fortune · Vedira Heights · Ramalay Bliss',
      highlight: 'Premium Vitrified Flooring & False Ceiling Lighting',
      description:
        'Our residential flats feature keyless biometric main door locks, double-charged vitrified flooring, designer POP false ceilings with concealed LED cove lighting, and abundant natural cross-ventilation.',
      spec: 'Biometric Security · Double-Charged Vitrified Tiles',
      image: '/images/vedmay/flats-living.jpg',
    },
    {
      id: 'kitchen',
      icon: Sparkles,
      title: 'Contemporary Modular Kitchen & Finishes',
      category: 'Luxury Apartments',
      project: 'Delivered Residences · Nagpur',
      highlight: 'Ergonomic Granite Platforms & Branded Sanitaryware',
      description:
        'Thoughtfully planned kitchens in Vedira Heights, Ramalay Bliss, and Vedira Fortune come equipped with polished granite countertops, glazed designer dado tiles, stainless steel sinks, and utility balconies.',
      spec: 'Agneya (South-East) Vastu Aligned Kitchen Layout',
      image: '/images/vedmay/flats-kitchen.jpg',
    },
    {
      id: 'water',
      icon: Droplets,
      title: 'Landscaped Open Parks, Water Supply & Drainage',
      category: 'Sustainable Township',
      project: 'Sai Nagri 7, 8, 9 & Om Shree Estate',
      highlight: 'Dedicated Green Reserves & Underground Utility Lines',
      description:
        'All plotted layouts include dedicated open green spaces, children’s play areas, underground sewage chambers, rainwater harvesting pits, and water supply pipelines to every plot.',
      spec: 'Underground Sewage Network · Landscaped Open Spaces',
      image: '/images/vedmay/sai-nagri-8-site.png',
    },
    {
      id: 'ev',
      icon: Zap,
      title: 'Covered Stilt Parking & EV Charging Provision',
      category: 'Modern Mobility',
      project: 'Vedira Fortune & Vedira Heights',
      highlight: 'Spacious Paved Stilt Parking with EV Points',
      description:
        'Dedicated covered stilt parking bays with wide turning radii, CCTV surveillance, automatic boom barriers, and dedicated electric vehicle charging points for modern homeowners.',
      spec: 'Covered Stilt Parking · 24×7 CCTV Surveillance',
      image: '/images/vedmay/flats-entrance.jpg',
    },
  ];

  const currentAmenity = amenities[activeAmenityIndex];

  return (
    <section id="amenities" className="py-20 bg-[#0B0F17] text-neutral-100 border-b border-[#242936]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A869] font-mono mb-3">
            <span>INFRASTRUCTURE &amp; SPECIFICATIONS</span>
            <span aria-hidden="true">·</span>
            <span>PLOTS &amp; LUXURY FLATS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight text-white mb-4">
            Built to Last: Real On-Site Infrastructure &amp; Finishes
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
            Whether you invest in an NMRDA-sanctioned plot at Om Shree Estate &amp; Sai Nagri or a
            3 BHK luxury flat at Vedira Fortune, every Vedmay Infra project delivers complete civil
            infrastructure and superior construction quality.
          </p>
        </div>

        {/* Asymmetric Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Interactive Feature List (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-2">
            {amenities.map((item, index) => {
              const Icon = item.icon;
              const isSelected = activeAmenityIndex === index;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveAmenityIndex(index)}
                  className={`w-full text-left p-3.5 rounded-sm border cursor-pointer transition-all duration-200 flex items-start gap-3.5 ${
                    isSelected
                      ? 'bg-[#171B24] border-[#C5A869]'
                      : 'bg-[#11141C] border-[#242936] hover:border-[#384152]'
                  }`}
                >
                  <div
                    className={`p-2 rounded-xs shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-[#C5A869] text-[#14171F]'
                        : 'bg-[#171B24] text-[#9E9A90]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4
                        className={`text-sm font-medium transition-colors truncate ${
                          isSelected ? 'text-white' : 'text-neutral-300'
                        }`}
                      >
                        {item.title}
                      </h4>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-[#C5A869] shrink-0">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-0.5 line-clamp-1">
                      {item.highlight}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Uncropped Real Photo Spotlight Card (7 Cols) */}
          <div className="lg:col-span-7 bg-[#141821] border border-[#2A3040] rounded-sm p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Uncropped Real Site / Interior Photo Frame */}
              <div className="relative h-[320px] sm:h-[360px] w-full rounded-xs overflow-hidden mb-6 bg-[#090C10] border border-[#242936] flex items-center justify-center p-2">
                <img
                  src={currentAmenity.image}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-25 scale-110 pointer-events-none"
                />
                <img
                  src={currentAmenity.image}
                  alt={currentAmenity.title}
                  referrerPolicy="no-referrer"
                  className="relative z-10 max-h-full max-w-full w-auto h-auto object-contain rounded-xs shadow-xl"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-[#C5A869] font-mono mb-2">
                <span>{currentAmenity.category}</span>
                <span aria-hidden="true">·</span>
                <span>{currentAmenity.project}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif text-white font-normal mb-3">
                {currentAmenity.title}
              </h3>

              <p className="text-[#C8C4BA] text-sm font-light leading-relaxed mb-6">
                {currentAmenity.description}
              </p>
            </div>

            {/* Bottom Specs & Action */}
            <div className="pt-5 border-t border-[#242936] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#9E9A90] font-mono block mb-0.5">
                  Verified Specification
                </span>
                <span className="text-xs font-mono text-[#E4D2A6] font-medium">
                  {currentAmenity.spec}
                </span>
              </div>
              <button
                type="button"
                onClick={onOpenBooking}
                className="px-5 py-2.5 bg-[#C5A869] hover:bg-[#B89758] text-[#14171F] text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2 shrink-0 cursor-pointer whitespace-nowrap"
              >
                <span>Schedule Site Inspection</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
