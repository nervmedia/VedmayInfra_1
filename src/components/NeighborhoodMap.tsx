import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Compass,
  Plane,
  Briefcase,
  GraduationCap,
  Building,
  HeartPulse,
  Map,
} from 'lucide-react';
import { NEIGHBORHOOD_LANDMARKS } from '../data/properties';

const OFFICIAL_LOCATION_MAPS = [
  {
    id: 'vedira-fortune-map',
    project: 'Vedira Fortune',
    corridor: 'Manish Nagar / Somalwada, Nagpur',
    type: '3 BHK Ultra-Luxury Flats',
    image: '/images/vedmay/vedira-fortune-location.png',
    highlights: '3 mins from Manish Nagar Metro · 8 mins from Nagpur International Airport · Close to DPS & AIIMS',
  },
  {
    id: 'sai-nagri-8-map',
    project: 'Sai Nagri 8',
    corridor: 'Dongergaon, Wardha Road, Nagpur',
    type: 'NMRDA Sanctioned Plotted Layout',
    image: '/images/vedmay/sai-nagri-8-location.jpg',
    highlights: 'Direct Wardha Road Highway Connectivity · Close to MIHAN SEZ, TCS, Infosys & AIIMS Campus',
  },
  {
    id: 'sai-nagri-9-map',
    project: 'Sai Nagri 9',
    corridor: 'Borekhedi, Nagpur',
    type: 'NMRDA Sanctioned Plotted Layout',
    image: '/images/vedmay/sai-nagri-9-location.jpg',
    highlights: 'Prime Borekhedi Growth Belt · Fast Highway Access · High Appreciation Residential & Commercial Zone',
  },
  {
    id: 'sai-nagri-7-map',
    project: 'Sai Nagri 7',
    corridor: 'Panchgaon, Umred Road, Nagpur',
    type: 'NMRDA Sanctioned Plotted Layout',
    image: '/images/vedmay/sai-nagri-7-location.jpg',
    highlights: 'Thriving Panchgaon Hub · Outer Ring Road & Umred Road Access · Near Academic & Industrial Zones',
  },
  {
    id: 'om-shree-map',
    project: 'Om Shree Estate',
    corridor: 'Umred Road / Dongergaon, Nagpur',
    type: 'NMRDA Sanctioned Township Map',
    image: '/images/vedmay/om-shree-map.png',
    highlights: 'Sanctioned Master Layout · Wide Cement Concrete Roads · Gated Township Entrance Archway',
  },
];

export const NeighborhoodMap: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLandmarkId, setSelectedLandmarkId] = useState<string>(
    NEIGHBORHOOD_LANDMARKS[0].id
  );
  const [activeLocationMapIndex, setActiveLocationMapIndex] = useState<number>(0);
  const [mapViewMode, setMapViewMode] = useState<'official-maps' | 'radar-vector'>('official-maps');

  const filteredLandmarks =
    selectedCategory === 'all'
      ? NEIGHBORHOOD_LANDMARKS
      : NEIGHBORHOOD_LANDMARKS.filter((l) => l.category === selectedCategory);

  const activeOfficialMap = OFFICIAL_LOCATION_MAPS[activeLocationMapIndex];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Transit':
        return Plane;
      case 'Business':
        return Briefcase;
      case 'Healthcare':
        return HeartPulse;
      case 'Education':
        return GraduationCap;
      case 'Leisure':
        return Building;
      default:
        return MapPin;
    }
  };

  return (
    <section id="neighborhood" className="py-20 bg-[#070A0F] text-neutral-100 border-b border-[#242936]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#242936] gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A869] font-mono mb-3">
              <span>STRATEGIC NAGPUR CONNECTIVITY</span>
              <span aria-hidden="true">·</span>
              <span>MANISH NAGAR · WARDHA ROAD · BOREKHEDI · PANCHGAON</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight text-white">
              Official Project Location Maps &amp; Transit Corridors
            </h2>
          </div>

          {/* Toggle between Official Location Maps & Nagpur Transit Radar */}
          <div className="flex items-center gap-1.5 p-1.5 bg-[#141821] border border-[#2A3040] rounded-sm shrink-0">
            <button
              type="button"
              onClick={() => setMapViewMode('official-maps')}
              className={`px-3.5 py-2 text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer whitespace-nowrap ${
                mapViewMode === 'official-maps'
                  ? 'bg-[#C5A869] text-[#14171F]'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              Official Project Location Maps (5)
            </button>
            <button
              type="button"
              onClick={() => setMapViewMode('radar-vector')}
              className={`px-3.5 py-2 text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer whitespace-nowrap ${
                mapViewMode === 'radar-vector'
                  ? 'bg-[#C5A869] text-[#14171F]'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              Nagpur Transit &amp; IT Radar
            </button>
          </div>
        </div>

        {/* Interactive Layout: Map Canvas (7 Cols) + Landmark / Corridor Feed (5 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left 7 Cols: Official Uncropped Project Location Maps OR Transit Vector Radar */}
          <div className="lg:col-span-7 bg-[#141821] border border-[#2A3040] rounded-sm p-4 sm:p-6 flex flex-col justify-between">
            {mapViewMode === 'official-maps' ? (
              <>
                <div>
                  {/* Project Switcher Tabs for Official Location Maps */}
                  <div className="flex flex-wrap items-center gap-1.5 pb-4 mb-4 border-b border-[#242936]">
                    {OFFICIAL_LOCATION_MAPS.map((item, idx) => {
                      const active = idx === activeLocationMapIndex;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setActiveLocationMapIndex(idx)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-xs transition-colors cursor-pointer whitespace-nowrap ${
                            active
                              ? 'bg-[#C5A869] text-[#14171F] font-semibold'
                              : 'bg-[#0E1117] text-[#C8C4BA] hover:text-white border border-[#242936]'
                          }`}
                        >
                          {item.project}
                        </button>
                      );
                    })}
                  </div>

                  {/* Uncropped Official Location Map Frame */}
                  <div className="relative h-[380px] sm:h-[420px] w-full bg-[#090C10] rounded-xs border border-[#242936] flex items-center justify-center p-2 overflow-hidden">
                    <img
                      src={activeOfficialMap.image}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-20 scale-110 pointer-events-none"
                    />
                    <img
                      src={activeOfficialMap.image}
                      alt={`${activeOfficialMap.project} Location Map`}
                      referrerPolicy="no-referrer"
                      className="relative z-10 max-h-full max-w-full w-auto h-auto object-contain rounded-xs shadow-xl"
                    />
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#242936] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="text-xs font-mono text-[#C5A869] uppercase">
                      {activeOfficialMap.project} · {activeOfficialMap.corridor}
                    </div>
                    <p className="text-xs text-[#9E9A90] mt-0.5">{activeOfficialMap.highlights}</p>
                  </div>
                  <span className="text-[11px] font-mono text-[#E4D2A6] shrink-0">
                    100% Uncut Official Map
                  </span>
                </div>
              </>
            ) : (
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#242936] text-xs">
                  <span className="text-[#C5A869] font-mono flex items-center gap-1.5">
                    <Compass className="w-4 h-4" />
                    <span>Nagpur Highway &amp; Metro Connectivity Axis</span>
                  </span>
                  <span className="text-neutral-400 font-mono text-[11px]">
                    Shyam Nagar HQ &amp; Manish Nagar Hub
                  </span>
                </div>

                {/* Stylized Vector Radar Map (Zero animate-ping) */}
                <div className="relative aspect-[4/3] w-full bg-[#05070B] rounded-xs border border-[#242936] overflow-hidden flex items-center justify-center">
                  <svg viewBox="0 0 500 400" className="w-full h-full select-none">
                    {/* Radial Range Rings */}
                    <circle cx="250" cy="200" r="60" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                    <circle cx="250" cy="200" r="120" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                    <circle cx="250" cy="200" r="180" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />

                    {/* Distance markers */}
                    <text x="250" y="136" fill="#64748b" fontSize="8" textAnchor="middle">2 KM RADIUS (5 MINS)</text>
                    <text x="250" y="76" fill="#64748b" fontSize="8" textAnchor="middle">5 KM RADIUS (10 MINS)</text>
                    <text x="250" y="16" fill="#64748b" fontSize="8" textAnchor="middle">8 KM RADIUS (15 MINS)</text>

                    {/* Wardha Road Highway Axis */}
                    <path d="M50,380 L250,200 L450,20" stroke="#334155" strokeWidth="3" />
                    <path d="M50,380 L250,200 L450,20" stroke="#C5A869" strokeWidth="1" strokeOpacity="0.5" strokeDasharray="6 4" />
                    <text x="390" y="60" fill="#94a3b8" fontSize="8" transform="rotate(-40 390,60)">WARDHA ROAD CORRIDOR</text>

                    {/* Umred Road & Outer Ring Road Connector */}
                    <path d="M40,230 Q250,150 460,260" stroke="#1e293b" strokeWidth="2" fill="none" />
                    <text x="370" y="235" fill="#64748b" fontSize="8">UMRED ROAD / PANCHGAON</text>

                    {/* Center Hub: Vedira Fortune & Shyam Nagar HQ */}
                    <g transform="translate(250, 200)">
                      <circle cx="0" cy="0" r="10" fill="#C5A869" />
                      <circle cx="0" cy="0" r="4" fill="#070A0F" />
                      <text x="0" y="-14" fill="#FEF08A" fontSize="10" fontWeight="bold" textAnchor="middle">
                        VEDIRA FORTUNE &amp; HQ
                      </text>
                      <text x="0" y="24" fill="#C5A880" fontSize="8" textAnchor="middle">
                        Manish Nagar / Shyam Nagar
                      </text>
                    </g>

                    {/* L1: Airport */}
                    <g
                      transform="translate(160, 130)"
                      className="cursor-pointer"
                      onClick={() => setSelectedLandmarkId('l1')}
                    >
                      <circle
                        cx="0"
                        cy="0"
                        r={selectedLandmarkId === 'l1' ? '9' : '6'}
                        fill={selectedLandmarkId === 'l1' ? '#38bdf8' : '#0284c7'}
                      />
                      <text x="0" y="18" fill="#f8fafc" fontSize="9" textAnchor="middle">
                        Nagpur Airport (8 min)
                      </text>
                    </g>

                    {/* L2: Metro */}
                    <g
                      transform="translate(290, 170)"
                      className="cursor-pointer"
                      onClick={() => setSelectedLandmarkId('l2')}
                    >
                      <circle
                        cx="0"
                        cy="0"
                        r={selectedLandmarkId === 'l2' ? '9' : '6'}
                        fill={selectedLandmarkId === 'l2' ? '#38bdf8' : '#0284c7'}
                      />
                      <text x="0" y="18" fill="#f8fafc" fontSize="9" textAnchor="middle">
                        Metro Station (3 min)
                      </text>
                    </g>

                    {/* L3: AIIMS / Dongergaon */}
                    <g
                      transform="translate(115, 310)"
                      className="cursor-pointer"
                      onClick={() => setSelectedLandmarkId('l3')}
                    >
                      <circle
                        cx="0"
                        cy="0"
                        r={selectedLandmarkId === 'l3' ? '9' : '6'}
                        fill={selectedLandmarkId === 'l3' ? '#ef4444' : '#dc2626'}
                      />
                      <text x="0" y="18" fill="#f8fafc" fontSize="9" textAnchor="middle">
                        AIIMS &amp; Dongergaon (12 min)
                      </text>
                    </g>

                    {/* L4: IT Hub */}
                    <g
                      transform="translate(85, 265)"
                      className="cursor-pointer"
                      onClick={() => setSelectedLandmarkId('l4')}
                    >
                      <circle
                        cx="0"
                        cy="0"
                        r={selectedLandmarkId === 'l4' ? '9' : '6'}
                        fill={selectedLandmarkId === 'l4' ? '#38bdf8' : '#0284c7'}
                      />
                      <text x="0" y="18" fill="#f8fafc" fontSize="9" textAnchor="middle">
                        TCS &amp; Infosys MIHAN (14 min)
                      </text>
                    </g>

                    {/* L5: DPS & Schools */}
                    <g
                      transform="translate(330, 250)"
                      className="cursor-pointer"
                      onClick={() => setSelectedLandmarkId('l5')}
                    >
                      <circle
                        cx="0"
                        cy="0"
                        r={selectedLandmarkId === 'l5' ? '9' : '6'}
                        fill={selectedLandmarkId === 'l5' ? '#22c55e' : '#16a34a'}
                      />
                      <text x="0" y="18" fill="#f8fafc" fontSize="9" textAnchor="middle">
                        Om Shree &amp; Panchgaon Belt
                      </text>
                    </g>

                    {/* L6: Borekhedi */}
                    <g
                      transform="translate(380, 95)"
                      className="cursor-pointer"
                      onClick={() => setSelectedLandmarkId('l6')}
                    >
                      <circle
                        cx="0"
                        cy="0"
                        r={selectedLandmarkId === 'l6' ? '9' : '6'}
                        fill={selectedLandmarkId === 'l6' ? '#a855f7' : '#9333ea'}
                      />
                      <text x="0" y="18" fill="#f8fafc" fontSize="9" textAnchor="middle">
                        Sai Nagri 9 Borekhedi
                      </text>
                    </g>
                  </svg>
                </div>
              </div>
            )}
          </div>

          {/* Right 5 Cols: Category Filter + Key Nagpur Landmarks Feed */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div>
              {/* Category Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#141821] border border-[#2A3040] rounded-sm mb-4">
                {(['all', 'Transit', 'Business', 'Healthcare', 'Education'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-xs transition-colors cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#C5A869] text-[#14171F] font-semibold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {cat === 'all' ? 'All Landmarks' : cat}
                  </button>
                ))}
              </div>

              <div className="space-y-2.5">
                {filteredLandmarks.map((landmark) => {
                  const Icon = getCategoryIcon(landmark.category);
                  const isSelected = selectedLandmarkId === landmark.id;

                  return (
                    <div
                      key={landmark.id}
                      onClick={() => setSelectedLandmarkId(landmark.id)}
                      className={`p-3.5 rounded-sm border cursor-pointer transition-all duration-200 flex items-start justify-between gap-4 ${
                        isSelected
                          ? 'bg-[#141821] border-[#C5A869]'
                          : 'bg-[#0E1117] border-[#242936] hover:border-[#384152]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-xs shrink-0 mt-0.5 ${
                            isSelected
                              ? 'bg-[#C5A869] text-[#14171F]'
                              : 'bg-[#171B24] text-neutral-400'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4
                            className={`text-sm font-medium transition-colors ${
                              isSelected ? 'text-white' : 'text-neutral-300'
                            }`}
                          >
                            {landmark.name}
                          </h4>
                          <p className="text-xs text-neutral-400 mt-0.5">{landmark.description}</p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-xs font-mono font-semibold text-[#E4D2A6] flex items-center justify-end gap-1 tabular-nums">
                          <Clock className="w-3 h-3 text-[#C5A869]" />
                          <span>{landmark.driveTimeMin}</span>
                        </div>
                        <span className="text-[11px] text-neutral-500 font-mono mt-0.5 block tabular-nums">
                          {landmark.distanceKm}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Registered Office Quick Box */}
            <div className="p-4 bg-[#141821] border border-[#2A3040] rounded-sm text-xs">
              <div className="flex items-center gap-2 text-[#C5A869] font-mono uppercase mb-1">
                <Map className="w-3.5 h-3.5" />
                <span>Registered Office · Shyam Nagar, Nagpur</span>
              </div>
              <p className="text-[#C8C4BA] font-light">
                Plot No. 14, Jaihind Society, Beside &apos;Amrut Lawn&apos;, Shyam Nagar, Nagpur 440036
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
