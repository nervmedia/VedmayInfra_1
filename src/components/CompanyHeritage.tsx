import React from 'react';
import { Award, Compass, Shield, Users, CheckCircle2, Phone, Mail, MapPin } from 'lucide-react';
import { COMPANY_PILLARS } from '../data/properties';

interface CompanyHeritageProps {
  onOpenBooking: () => void;
}

export const CompanyHeritage: React.FC<CompanyHeritageProps> = ({ onOpenBooking }) => {
  return (
    <section id="about-vedmay" className="py-24 bg-[#0B0F17] text-neutral-100 relative scroll-mt-20">
      {/* Compatibility anchor for #about */}
      <div id="about" className="absolute -top-20" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Brand Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-400 font-medium mb-3">
              <span>ABOUT VEDMAY · OVER A DECADE OF TRUST</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight text-white mb-6 leading-tight">
              Shaping Nagpur’s Skyline with Uncompromising Integrity
            </h2>
            <div className="space-y-4 text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
              <p>
                Founded on the cornerstone of transparent governance and structural excellence,
                <strong className="text-white font-medium"> VEDMAY</strong> has grown over the
                past 12+ years into one of Nagpur’s most trusted real estate developers.
              </p>
              <p>
                From boutique ultra-luxury flats in Somalwada and New Manish Nagar to expansive plotted
                townships near MIHAN and high-street commercial hubs, our developments harmoniously unite
                classical Indian Vastu wisdom with contemporary cantilevered engineering.
              </p>
              <p>
                Every project is delivered with clear legal titles, approved NMRDA/NMC sanctions, and
                verified MahaRERA compliance, ensuring generational security for our homeowners.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
              >
                Schedule Private Executive Meeting
              </button>
            </div>
          </div>

          {/* Key Stat Blocks */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-sm">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-amber-400 font-mono tabular-nums mb-1">
                12+
              </div>
              <span className="text-xs uppercase tracking-wider text-neutral-400 block mb-2">
                Years of Legacy
              </span>
              <p className="text-[11px] text-neutral-500 leading-normal">
                Continuous real estate development & civil engineering track record in Nagpur.
              </p>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-sm">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-amber-400 font-mono tabular-nums mb-1">
                1.8M+
              </div>
              <span className="text-xs uppercase tracking-wider text-neutral-400 block mb-2">
                Sq. Ft. Built
              </span>
              <p className="text-[11px] text-neutral-500 leading-normal">
                High-end residential, gated plotted layouts, and commercial floorplates.
              </p>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-sm">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-amber-400 font-mono tabular-nums mb-1">
                1,200+
              </div>
              <span className="text-xs uppercase tracking-wider text-neutral-400 block mb-2">
                Happy Families
              </span>
              <p className="text-[11px] text-neutral-500 leading-normal">
                Thriving communities enjoying timely possession and appreciation.
              </p>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-sm">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-emerald-400 font-mono tabular-nums mb-1">
                100%
              </div>
              <span className="text-xs uppercase tracking-wider text-neutral-400 block mb-2">
                Litigation Free
              </span>
              <p className="text-[11px] text-neutral-500 leading-normal">
                Impeccable title verification with zero legal encumbrances.
              </p>
            </div>
          </div>
        </div>

        {/* Company Core Pillars (Clean Human Editorial Numbering) */}
        <div className="border-t border-neutral-800 pt-16">
          <div className="text-xs uppercase tracking-[0.25em] text-amber-400 font-medium mb-3">
            Core Principles
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif text-white mb-10">
            The Four Foundations of VEDMAY
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMPANY_PILLARS.map((pillar) => (
              <div
                key={pillar.number}
                className="bg-neutral-900/60 border border-neutral-800/90 p-6 rounded-sm flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xl font-serif text-amber-400/60 font-mono block mb-3">
                    {pillar.number}.
                  </span>
                  <h4 className="text-base font-serif font-medium text-white mb-2">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed font-light mb-6">
                    {pillar.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-neutral-800/80">
                  <span className="text-lg font-serif font-semibold text-amber-400 font-mono block">
                    {pillar.metric}
                  </span>
                  <span className="text-[10px] uppercase text-neutral-500 tracking-wider">
                    {pillar.metricLabel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
