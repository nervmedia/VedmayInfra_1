import React, { useState } from 'react';
import { Search, ArrowRight, ShieldCheck, Award, Building2, MapPin } from 'lucide-react';
import { ArchitecturalImage } from './ArchitecturalImage';

interface HeroSectionProps {
  onSearch: (filters: { location: string; type: string; budget: string }) => void;
  onOpenBooking: () => void;
  onExploreFortune: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearch,
  onOpenBooking,
  onExploreFortune,
}) => {
  const [location, setLocation] = useState('all');
  const [type, setType] = useState('all');
  const [budget, setBudget] = useState('all');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ location, type, budget });
    const target = document.getElementById('all-projects') || document.getElementById('new-launches');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between bg-[#070A0F] text-white overflow-hidden pt-6 pb-12">
      {/* Background Architectural Canvas Visual */}
      <div className="absolute inset-0 z-0 opacity-45">
        <ArchitecturalImage
          id="hero-bg"
          imageSrc="/images/vedmay/vedira-fortune-main.png"
          category="Exterior"
          title="Vedira Fortune High-Rise"
          aspectRatio="16:9"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070A0F] via-[#070A0F]/70 to-[#070A0F]/30" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#070A0F]/60 to-[#070A0F]" />
      </div>

      {/* Main Hero Storytelling & Headline */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-12 sm:pt-20">
        <div className="max-w-3xl">
          {/* Subtle quiet text kicker (no pill) */}
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-400 font-medium mb-4">
            <span>VEDMAY Signature Collection</span>
            <span aria-hidden="true">·</span>
            <span>Nagpur Prime Living</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-white leading-[1.1] mb-6 text-balance">
            Architectural Mastery. <br />
            <span className="italic font-normal text-amber-300">Uncompromising</span> Luxury.
          </h1>

          <p className="text-neutral-300 text-base sm:text-lg font-light leading-relaxed mb-8 max-w-2xl">
            Introducing <strong className="text-white font-medium">Vedira Fortune</strong> in New
            Manish Nagar and our curated portfolio of ultra-luxury residences, sky mansions, and
            plotted enclaves in Nagpur. Designed with precision Vastu alignment, biometric security,
            and private sky terraces.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreFortune}
              className="px-7 py-3.5 bg-amber-400 text-neutral-950 font-medium text-xs sm:text-sm tracking-wider uppercase hover:bg-amber-300 transition-all rounded-sm shadow-[0_0_25px_rgba(212,175,55,0.35)] flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Vedira Fortune</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenBooking}
              className="px-6 py-3.5 border border-neutral-700 hover:border-amber-400 text-white hover:text-amber-300 text-xs sm:text-sm tracking-wider uppercase transition-colors rounded-sm bg-neutral-900/60 backdrop-blur-sm cursor-pointer"
            >
              Schedule VIP Consultation
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Emaar-Style Property Search Filter Bar */}
      <div id="search" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12 scroll-mt-24">
        <form
          onSubmit={handleSearchSubmit}
          className="bg-neutral-900/90 border border-neutral-800 p-4 sm:p-5 rounded-sm backdrop-blur-md shadow-2xl"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            {/* Location selector */}
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-neutral-400 mb-1.5">
                Location & Corridor
              </label>
              <div className="relative">
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 text-white text-xs sm:text-sm rounded-sm px-3 py-2.5 focus:border-amber-400 focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="all">All Prime Locations (Nagpur)</option>
                  <option value="New Manish Nagar / Somalwada">New Manish Nagar / Somalwada</option>
                  <option value="Wardha Road Corridor">Wardha Road Corridor</option>
                  <option value="Waranga - MIHAN Growth Corridor">Waranga - MIHAN Corridor</option>
                  <option value="Central Nagpur Commercial Boulevard">Central Nagpur</option>
                </select>
                <MapPin className="w-4 h-4 text-neutral-500 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-neutral-400 mb-1.5">
                Property Portfolio
              </label>
              <div className="relative">
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 text-white text-xs sm:text-sm rounded-sm px-3 py-2.5 focus:border-amber-400 focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="all">All Portfolios</option>
                  <option value="ultra-luxury-flats">Ultra-Luxury Flats (3 BHK)</option>
                  <option value="sky-mansions">Sky Mansions (4 BHK Duplex)</option>
                  <option value="plotted-enclaves">Plotted Villa Enclaves</option>
                  <option value="commercial">Commercial Hubs & Suites</option>
                </select>
                <Building2 className="w-4 h-4 text-neutral-500 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Budget Range */}
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-neutral-400 mb-1.5">
                Investment Budget
              </label>
              <div className="relative">
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 text-white text-xs sm:text-sm rounded-sm px-3 py-2.5 focus:border-amber-400 focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="all">Any Budget</option>
                  <option value="under-1cr">Under ₹1.00 Cr</option>
                  <option value="1cr-1.5cr">₹1.00 Cr - ₹1.50 Cr</option>
                  <option value="1.5cr-2.5cr">₹1.50 Cr - ₹2.50 Cr</option>
                  <option value="above-2.5cr">Above ₹2.50 Cr</option>
                </select>
              </div>
            </div>

            {/* Search Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2 cursor-pointer h-[42px]"
              >
                <Search className="w-4 h-4" />
                <span>Search Residences</span>
              </button>
            </div>
          </div>
        </form>

        {/* Adjacency Trust Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-neutral-800/80 text-neutral-400 text-xs">
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <span className="block text-white font-medium text-sm font-mono tabular-nums">
                12+ Years
              </span>
              <span className="text-[11px] text-neutral-400">Engineering Legacy</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Building2 className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <span className="block text-white font-medium text-sm font-mono tabular-nums">
                1.8M+ Sq. Ft.
              </span>
              <span className="text-[11px] text-neutral-400">Developed in Nagpur</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <span className="block text-white font-medium text-sm font-mono tabular-nums">
                100% RERA
              </span>
              <span className="text-[11px] text-neutral-400">Clear Title Approvals</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-5 h-5 text-amber-400 font-serif text-lg font-bold flex items-center justify-center shrink-0">
              ॐ
            </span>
            <div>
              <span className="block text-white font-medium text-sm font-mono tabular-nums">
                100% Vastu
              </span>
              <span className="text-[11px] text-neutral-400">Architectural Harmony</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
