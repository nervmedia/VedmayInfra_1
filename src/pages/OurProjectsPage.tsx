import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Maximize2,
  Calendar,
  Layers,
  Sparkles,
  Zap,
  Sun,
  Key,
  CheckCircle2,
  Building,
  Clock,
  ArrowRight,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { Property, PROPERTIES } from '../data/properties';
import { ArchitecturalImage } from '../components/ArchitecturalImage';
import { OurProjectsStatusFilter } from '../components/Navbar';

interface OurProjectsPageProps {
  initialSubTab?: OurProjectsStatusFilter;
  onOpenGallery: (property: Property) => void;
  onOpenBooking: (projectName: string) => void;
  onOpenBrochure: (projectName: string) => void;
  onNavigateToAllProjects: () => void;
}

export const OurProjectsPage: React.FC<OurProjectsPageProps> = ({
  initialSubTab = 'all',
  onOpenGallery,
  onOpenBooking,
  onOpenBrochure,
  onNavigateToAllProjects,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<OurProjectsStatusFilter>(initialSubTab);
  const [activeCardImages, setActiveCardImages] = useState<Record<string, string>>({});

  // Sync if initialSubTab prop changes (e.g. user clicked sub-tab in Navbar)
  useEffect(() => {
    if (initialSubTab) {
      setActiveSubTab(initialSubTab);
    }
  }, [initialSubTab]);

  const ongoingProjects = PROPERTIES.filter((p) => p.status === 'Under Construction');
  const completedProjects = PROPERTIES.filter((p) => p.status === 'Ready to Move');
  const upcomingProjects = PROPERTIES.filter((p) => p.status === 'New Launch');

  const filteredProjects =
    activeSubTab === 'ongoing'
      ? ongoingProjects
      : activeSubTab === 'completed'
      ? completedProjects
      : activeSubTab === 'upcoming'
      ? upcomingProjects
      : PROPERTIES;

  return (
    <div className="bg-[#070A0F] text-neutral-100 min-h-screen pt-8 pb-24">
      {/* Editorial Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="border-b border-neutral-800 pb-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-400 font-medium mb-3">
            <span>VEDMAY SIGNATURE DEVELOPMENTS</span>
            <span aria-hidden="true">·</span>
            <span>PROPRIETARY ARCHITECTURAL EXCELLENCE</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-white mb-4">
                Our Signature Projects
              </h1>
              <p className="text-neutral-400 text-sm sm:text-base font-light max-w-2xl leading-relaxed">
                The crown jewels of VEDMAY engineering. From cantilevered sky terraces in Somalwada
                to sprawling master-planned townships and high-rise panoramic residences in Nagpur.
              </p>
            </div>

            <button
              onClick={onNavigateToAllProjects}
              className="self-start lg:self-end px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700/80 rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>View All Nagpur Projects</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>
        </div>

        {/* Status Sub Tabs (ALL, ONGOING, COMPLETED, UPCOMING) in Official Website Palette */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 p-4 bg-[#E8E6E1] border border-[#D4D1C8] rounded-sm text-[#14171F]">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-semibold text-[#14171F] uppercase tracking-wider mr-2 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-[#8D7039]" />
              <span>Filter by Status:</span>
            </span>

            <button
              onClick={() => setActiveSubTab('all')}
              className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-xs transition-all cursor-pointer ${
                activeSubTab === 'all'
                  ? 'bg-[#14171F] text-[#FAF9F6] border border-[#14171F] shadow-sm'
                  : 'bg-[#FAF9F6] text-[#2D313A] hover:text-[#14171F] hover:bg-[#DDD8CF] border border-[#D4D1C8]'
              }`}
            >
              All Projects ({PROPERTIES.length})
            </button>

            <button
              onClick={() => setActiveSubTab('ongoing')}
              className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-xs transition-all cursor-pointer flex items-center gap-2 ${
                activeSubTab === 'ongoing'
                  ? 'bg-[#14171F] text-[#FAF9F6] border border-[#14171F] shadow-sm'
                  : 'bg-[#FAF9F6] text-[#2D313A] hover:text-[#14171F] hover:bg-[#DDD8CF] border border-[#D4D1C8]'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-[#C5A869]" />
              <span>ONGOING ({ongoingProjects.length})</span>
            </button>

            <button
              onClick={() => setActiveSubTab('completed')}
              className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-xs transition-all cursor-pointer flex items-center gap-2 ${
                activeSubTab === 'completed'
                  ? 'bg-[#14171F] text-[#FAF9F6] border border-[#14171F] shadow-sm'
                  : 'bg-[#FAF9F6] text-[#2D313A] hover:text-[#14171F] hover:bg-[#DDD8CF] border border-[#D4D1C8]'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>COMPLETED ({completedProjects.length})</span>
            </button>

            <button
              onClick={() => setActiveSubTab('upcoming')}
              className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-xs transition-all cursor-pointer flex items-center gap-2 ${
                activeSubTab === 'upcoming'
                  ? 'bg-[#14171F] text-[#FAF9F6] border border-[#14171F] shadow-sm'
                  : 'bg-[#FAF9F6] text-[#2D313A] hover:text-[#14171F] hover:bg-[#DDD8CF] border border-[#D4D1C8]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#8D7039]" />
              <span>UPCOMING ({upcomingProjects.length})</span>
            </button>
          </div>

          <div className="text-xs text-[#5A5D64] font-mono">
            Status:{' '}
            <span className="text-[#14171F] font-bold uppercase">
              {activeSubTab === 'all' ? 'All Developments' : activeSubTab}
            </span>
          </div>
        </div>

        {/* Tab Context Banner */}
        <div className="mt-4 p-4 bg-neutral-950 border border-neutral-800/80 rounded-sm text-xs text-neutral-300 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              {activeSubTab === 'ongoing' && (
                <>
                  <strong className="text-white">Ongoing Construction:</strong> Live on-site structural
                  updates, slab cast milestones, and guaranteed timely possession backed by MahaRERA escrow.
                </>
              )}
              {activeSubTab === 'completed' && (
                <>
                  <strong className="text-white">Delivered & Ready to Move:</strong> Completed residences
                  with Occupancy Certificates (OC), full bank approvals, and active resident welfare associations.
                </>
              )}
              {activeSubTab === 'upcoming' && (
                <>
                  <strong className="text-white">Upcoming Landmark Releases:</strong> Architectural designs
                  finalized, pre-launch priority allocation open for high-net-worth investors and families.
                </>
              )}
              {activeSubTab === 'all' && (
                <>
                  <strong className="text-white">Comprehensive Signature Portfolio:</strong> All VEDMAY
                  developments spanning ongoing construction, ready-to-move homes, and upcoming launches.
                </>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Property Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {filteredProjects.map((property) => {
            const activeImg = activeCardImages[property.id] || property.image;
            return (
            <div
              key={property.id}
              className="bg-neutral-900/60 border border-neutral-800 rounded-sm overflow-hidden hover:border-amber-400/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative cursor-pointer" onClick={() => onOpenGallery(property)}>
                  <ArchitecturalImage
                    id={property.id}
                    imageSrc={activeImg}
                    category={property.gallery[0]?.category || 'Exterior'}
                    title={property.title}
                    subtitle={property.subtitle}
                    fitMode="contain"
                  />
                  {property.statusKicker && (
                    <div className="absolute top-4 left-4 z-20 bg-amber-400 text-neutral-950 px-2.5 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider shadow-md pointer-events-none">
                      {property.statusKicker}
                    </div>
                  )}
                  <div className="absolute top-4 right-4 z-20 bg-neutral-950/80 border border-neutral-700/80 px-2.5 py-1 rounded text-[11px] text-white flex items-center gap-1.5 backdrop-blur-sm pointer-events-none">
                    <Maximize2 className="w-3 h-3 text-amber-400" />
                    <span>{property.gallery.length} High-Res Views</span>
                  </div>
                </div>

                {property.gallery.length > 1 && (
                  <div className="bg-neutral-950 px-4 py-2.5 border-y border-neutral-800 flex items-center gap-2.5 overflow-x-auto">
                    {property.gallery.map((gItem) => {
                      const isSelected = activeImg === gItem.image;
                      return (
                        <button
                          key={gItem.id}
                          type="button"
                          onClick={() =>
                            setActiveCardImages((prev) => ({
                              ...prev,
                              [property.id]: gItem.image,
                            }))
                          }
                          className={`shrink-0 w-16 h-12 rounded-xs bg-[#070A0F] p-0.5 border transition-all flex items-center justify-center cursor-pointer ${
                            isSelected
                              ? 'border-amber-400 ring-1 ring-amber-400'
                              : 'border-neutral-800 opacity-65 hover:opacity-100'
                          }`}
                          title={gItem.caption}
                        >
                          <img
                            src={gItem.image}
                            alt={gItem.caption}
                            className="max-h-full max-w-full object-contain"
                          />
                        </button>
                      );
                    })}
                  </div>
                )}

                <div className="p-6">
                  {/* Status Banner */}
                  <div className="mb-3">
                    {property.status === 'Under Construction' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-amber-400/10 text-amber-300 border border-amber-400/30 rounded-xs">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span>ONGOING · Poss. {property.completionDate}</span>
                      </span>
                    )}
                    {property.status === 'Ready to Move' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-emerald-400/10 text-emerald-300 border border-emerald-400/30 rounded-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>COMPLETED · Ready for Immediate Possession</span>
                      </span>
                    )}
                    {property.status === 'New Launch' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-sky-400/10 text-sky-300 border border-sky-400/30 rounded-xs">
                        <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                        <span>UPCOMING · Pre-Launch Registration Open</span>
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400 mb-2">
                    <span className="flex items-center gap-1 text-amber-300 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      {property.location}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{property.carpetAreaRange}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-neutral-300 font-mono">RERA: {property.reraNumber}</span>
                  </div>

                  <div className="flex items-baseline justify-between gap-4 mb-3">
                    <h3 className="text-2xl font-serif font-medium text-white group-hover:text-amber-300 transition-colors">
                      {property.title}
                    </h3>
                    <div className="text-right shrink-0">
                      <span className="text-lg font-serif font-semibold text-amber-400 tabular-nums">
                        {property.priceDisplay}
                      </span>
                    </div>
                  </div>

                  <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed mb-6 line-clamp-3">
                    {property.description}
                  </p>

                  {/* Highlights Grid */}
                  <div className="border-t border-b border-neutral-800/80 py-4 mb-6 grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs text-neutral-300">
                    {property.highlightSpecs.slice(0, 4).map((spec, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                        <span className="truncate">{spec}</span>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400">
                    {property.features.biometricSecurity && (
                      <div className="flex items-center gap-1 text-neutral-300">
                        <Key className="w-3.5 h-3.5 text-amber-400" />
                        <span>Biometric Lock</span>
                      </div>
                    )}
                    {property.features.solarGrid && (
                      <div className="flex items-center gap-1 text-neutral-300">
                        <Sun className="w-3.5 h-3.5 text-amber-400" />
                        <span>5kW Solar</span>
                      </div>
                    )}
                    {property.features.evCharging && (
                      <div className="flex items-center gap-1 text-neutral-300">
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        <span>EV Ready</span>
                      </div>
                    )}
                    {property.features.vastuCompliant && (
                      <div className="flex items-center gap-1 text-neutral-300">
                        <span className="text-amber-400 font-serif">ॐ</span>
                        <span>100% Vastu</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onOpenBrochure(property.title)}
                  className="flex-1 min-w-[140px] py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium tracking-wide uppercase rounded-sm transition-colors flex items-center justify-center gap-2 border border-neutral-700 cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  <span>Dossier Specs</span>
                </button>
                <button
                  onClick={() => onOpenBooking(property.title)}
                  className="flex-1 min-w-[140px] py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-semibold tracking-wide uppercase rounded-sm transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Schedule Site Visit</span>
                </button>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
