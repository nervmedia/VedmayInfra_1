import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Maximize2,
  Calendar,
  Layers,
  Sparkles,
  Zap,
  Sun,
  Key,
  Flame,
  Compass,
  CheckCircle2,
  Building,
  Filter,
  Search,
  ArrowRight,
  SlidersHorizontal,
} from 'lucide-react';
import { Property, PROPERTIES } from '../data/properties';
import { ArchitecturalImage } from '../components/ArchitecturalImage';
import { InteractiveFloorPlan } from '../components/InteractiveFloorPlan';

interface AllProjectsPageProps {
  onOpenGallery: (property: Property) => void;
  onOpenBooking: (projectName: string) => void;
  onOpenBrochure: (projectName: string) => void;
  onNavigateToOurProjects: () => void;
}

type CategoryFilter = 'all' | 'new-launches' | 'communities' | 'ready-to-move' | 'commercial';

export const AllProjectsPage: React.FC<AllProjectsPageProps> = ({
  onOpenGallery,
  onOpenBooking,
  onOpenBrochure,
  onNavigateToOurProjects,
}) => {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState('all');
  const [activeCardImages, setActiveCardImages] = useState<Record<string, string>>({});

  // Filtered properties
  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((p) => {
      // Category match
      if (categoryFilter !== 'all') {
        if (categoryFilter === 'commercial') {
          if (p.category !== 'commercial' && !p.tabCategories.includes('commercial')) return false;
        } else if (!p.tabCategories.includes(categoryFilter)) {
          return false;
        }
      }

      // Location match
      if (selectedLocation !== 'all' && !p.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
        return false;
      }

      // Budget match
      if (selectedBudget !== 'all') {
        if (selectedBudget === 'under-1cr' && p.priceStartingFrom >= 10000000) return false;
        if (selectedBudget === '1cr-2cr' && (p.priceStartingFrom < 10000000 || p.priceStartingFrom > 20000000)) return false;
        if (selectedBudget === 'above-2cr' && p.priceStartingFrom <= 20000000) return false;
      }

      // Search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesLocation = p.location.toLowerCase().includes(q);
        const matchesSubtitle = p.subtitle.toLowerCase().includes(q);
        if (!matchesTitle && !matchesLocation && !matchesSubtitle) return false;
      }

      return true;
    });
  }, [categoryFilter, searchQuery, selectedLocation, selectedBudget]);

  const allFloorPlans = useMemo(() => PROPERTIES.flatMap((p) => p.floorPlans), []);

  const counts = useMemo(() => ({
    all: PROPERTIES.length,
    newLaunches: PROPERTIES.filter((p) => p.tabCategories.includes('new-launches')).length,
    communities: PROPERTIES.filter((p) => p.tabCategories.includes('communities')).length,
    delivered: PROPERTIES.filter((p) => p.tabCategories.includes('ready-to-move')).length,
    commercial: PROPERTIES.filter((p) => p.category === 'commercial' || p.tabCategories.includes('commercial')).length,
  }), []);

  const handleSelectPropertyForFloorPlan = (propertyId: string) => {
    const el = document.getElementById('all-projects-floorplans');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#070A0F] text-neutral-100 min-h-screen pt-8 pb-24">
      {/* Editorial Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="border-b border-neutral-800 pb-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-400 font-medium mb-3">
            <span>COMPLETE NAGPUR PORTFOLIO</span>
            <span aria-hidden="true">·</span>
            <span>RERA REGISTERED DEVELOPMENTS</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-white mb-4">
                All VEDMAY Projects
              </h1>
              <p className="text-neutral-400 text-sm sm:text-base font-light max-w-2xl leading-relaxed">
                Discover Nagpur’s most distinguished addresses. Explore our comprehensive collection of
                boutique ultra-luxury residences, landmark high-rise sky suites, master gated townships,
                and Grade-A commercial spaces.
              </p>
            </div>

            <button
              onClick={onNavigateToOurProjects}
              className="self-start lg:self-end px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-amber-400 border border-neutral-700/80 rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Signature Collection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Filter & Search Bar with Official Website Palette */}
        <div className="mt-8 bg-[#E8E6E1] border border-[#D4D1C8] p-4 sm:p-5 rounded-sm space-y-4 text-[#14171F]">
          {/* Top Row: Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xs transition-all cursor-pointer ${
                categoryFilter === 'all'
                  ? 'bg-[#14171F] text-[#FAF9F6] border border-[#14171F] shadow-sm'
                  : 'bg-[#FAF9F6] text-[#2D313A] hover:text-[#14171F] hover:bg-[#DDD8CF] border border-[#D4D1C8]'
              }`}
            >
              All Projects ({counts.all})
            </button>
            <button
              onClick={() => setCategoryFilter('new-launches')}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xs transition-all cursor-pointer ${
                categoryFilter === 'new-launches'
                  ? 'bg-[#14171F] text-[#FAF9F6] border border-[#14171F] shadow-sm'
                  : 'bg-[#FAF9F6] text-[#2D313A] hover:text-[#14171F] hover:bg-[#DDD8CF] border border-[#D4D1C8]'
              }`}
            >
              New Launches ({counts.newLaunches})
            </button>
            <button
              onClick={() => setCategoryFilter('communities')}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xs transition-all cursor-pointer ${
                categoryFilter === 'communities'
                  ? 'bg-[#14171F] text-[#FAF9F6] border border-[#14171F] shadow-sm'
                  : 'bg-[#FAF9F6] text-[#2D313A] hover:text-[#14171F] hover:bg-[#DDD8CF] border border-[#D4D1C8]'
              }`}
            >
              Master Townships ({counts.communities})
            </button>
            <button
              onClick={() => setCategoryFilter('ready-to-move')}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xs transition-all cursor-pointer ${
                categoryFilter === 'ready-to-move'
                  ? 'bg-[#14171F] text-[#FAF9F6] border border-[#14171F] shadow-sm'
                  : 'bg-[#FAF9F6] text-[#2D313A] hover:text-[#14171F] hover:bg-[#DDD8CF] border border-[#D4D1C8]'
              }`}
            >
              Ready to Move ({counts.delivered})
            </button>
            <button
              onClick={() => setCategoryFilter('commercial')}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xs transition-all cursor-pointer ${
                categoryFilter === 'commercial'
                  ? 'bg-[#14171F] text-[#FAF9F6] border border-[#14171F] shadow-sm'
                  : 'bg-[#FAF9F6] text-[#2D313A] hover:text-[#14171F] hover:bg-[#DDD8CF] border border-[#D4D1C8]'
              }`}
            >
              Commercial ({counts.commercial})
            </button>
          </div>

          {/* Bottom Row: Search, Location, and Budget Filter */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-neutral-800/80">
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by project name or locality..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-neutral-950 border border-neutral-800 rounded-sm text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3.5 py-2 bg-neutral-950 border border-neutral-800 rounded-sm text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="all">All Nagpur Corridors</option>
                <option value="Somalwada">Somalwada & Manish Nagar</option>
                <option value="Wardha">Wardha Road Corridor</option>
                <option value="Waranga">Waranga / MIHAN IT Zone</option>
                <option value="Commercial">Central Nagpur Commercial</option>
              </select>
            </div>

            <div>
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="w-full px-3.5 py-2 bg-neutral-950 border border-neutral-800 rounded-sm text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="all">All Investment Budgets</option>
                <option value="under-1cr">Under ₹1.0 Crore</option>
                <option value="1cr-2cr">₹1.00 Cr – ₹2.00 Cr</option>
                <option value="above-2cr">Above ₹2.00 Crore</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Property Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex items-center justify-between mb-6 text-xs text-neutral-400">
          <span>
            Displaying <strong className="text-amber-400 font-semibold">{filteredProperties.length}</strong>{' '}
            developments
          </span>
          {(searchQuery || selectedLocation !== 'all' || selectedBudget !== 'all' || categoryFilter !== 'all') && (
            <button
              onClick={() => {
                setCategoryFilter('all');
                setSearchQuery('');
                setSelectedLocation('all');
                setSelectedBudget('all');
              }}
              className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {filteredProperties.length === 0 ? (
          <div className="py-20 text-center bg-neutral-900/40 border border-neutral-800 rounded-sm">
            <Building className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
            <h3 className="text-xl font-serif text-white mb-2">No Developments Match Your Filters</h3>
            <p className="text-xs text-neutral-400 mb-6 max-w-md mx-auto">
              Try adjusting your search criteria or resetting filters to view all available VEDMAY
              properties in Nagpur.
            </p>
            <button
              onClick={() => {
                setCategoryFilter('all');
                setSearchQuery('');
                setSelectedLocation('all');
                setSelectedBudget('all');
              }}
              className="px-6 py-2.5 bg-amber-400 text-neutral-950 text-xs font-semibold uppercase tracking-wider rounded-sm cursor-pointer"
            >
              View All Projects
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {filteredProperties.map((property) => {
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
                    <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400 mb-2">
                      <span className="flex items-center gap-1 text-amber-300 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        {property.location}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{property.carpetAreaRange}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-neutral-300 font-medium">{property.status}</span>
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

                    <div className="border-t border-b border-neutral-800/80 py-4 mb-6 grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs text-neutral-300">
                      {property.highlightSpecs.slice(0, 4).map((spec, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                          <span className="truncate">{spec}</span>
                        </div>
                      ))}
                    </div>

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
                    onClick={() => handleSelectPropertyForFloorPlan(property.id)}
                    className="flex-1 min-w-[140px] py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium tracking-wide uppercase rounded-sm transition-colors flex items-center justify-center gap-2 border border-neutral-700 cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5 text-amber-400" />
                    <span>Floor Plan Map</span>
                  </button>
                  <button
                    onClick={() => onOpenBooking(property.title)}
                    className="flex-1 min-w-[140px] py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-semibold tracking-wide uppercase rounded-sm transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Visit</span>
                  </button>
                </div>
              </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Embedded Floor Plan Explorer on All Projects Page */}
      <div id="all-projects-floorplans" className="border-t border-neutral-800 pt-16">
        <InteractiveFloorPlan
          floorPlans={allFloorPlans}
          onOpenBooking={onOpenBooking}
          onOpenBrochure={onOpenBrochure}
        />
      </div>
    </div>
  );
};
