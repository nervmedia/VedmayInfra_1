import React from 'react';
import { X, Download, Printer, CheckCircle2, ShieldCheck, FileText, Sparkles } from 'lucide-react';

interface BrochureModalProps {
  projectName?: string;
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const BrochureModal: React.FC<BrochureModalProps> = ({
  projectName = 'Vedira Fortune',
  isOpen,
  onClose,
  onOpenBooking,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-neutral-950 border border-neutral-800 rounded-sm shadow-2xl p-6 sm:p-8 my-auto text-neutral-100 print:bg-white print:text-black print:border-none print:shadow-none">
        {/* Top bar */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-800 print:border-gray-300">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-amber-400 font-medium print:text-amber-800">
              Architectural Dossier & Technical Specs
            </span>
            <h3 className="text-2xl font-serif font-medium text-white print:text-black">
              {projectName} · Master Specification Sheet
            </h3>
          </div>
          <div className="flex items-center gap-2 print:hidden">
            <button
              onClick={handlePrint}
              className="p-2 text-neutral-400 hover:text-white rounded hover:bg-neutral-900 transition-colors cursor-pointer"
              title="Print Specification Sheet"
            >
              <Printer className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white rounded hover:bg-neutral-900 transition-colors cursor-pointer"
              aria-label="Close Dossier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Sheet */}
        <div className="space-y-6 text-xs sm:text-sm">
          {/* Executive Overview */}
          <div className="bg-neutral-900/80 print:bg-gray-100 p-4 rounded border border-neutral-800 print:border-gray-300">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="font-semibold text-white print:text-black">
                MahaRERA Registration: P50500049281
              </span>
              <span className="text-amber-400 font-mono print:text-amber-800">
                Location: New Manish Nagar / Somalwada, Nagpur
              </span>
            </div>
            <p className="text-neutral-400 print:text-gray-700 text-xs leading-relaxed">
              Vedira Fortune is an ultra-luxury residential scheme engineered to deliver highest
              structural resilience, Vastu alignment, and low-maintenance green footprint.
            </p>
          </div>

          {/* Technical Specifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-neutral-800 print:border-gray-300 p-4 rounded bg-neutral-900/40 print:bg-white">
              <h4 className="text-xs uppercase tracking-wider text-amber-400 print:text-amber-800 font-semibold mb-2">
                01. Structure & Superstructure
              </h4>
              <ul className="space-y-1.5 text-xs text-neutral-300 print:text-gray-800 list-disc list-inside">
                <li>Earthquake resistant RCC frame design (Seismic Zone III).</li>
                <li>Fe-550D primary grade thermo-mechanically treated steel.</li>
                <li>AAC lightweight high-insulation masonry blocks.</li>
                <li>Two-layer structural elastomeric waterproofing.</li>
              </ul>
            </div>

            <div className="border border-neutral-800 print:border-gray-300 p-4 rounded bg-neutral-900/40 print:bg-white">
              <h4 className="text-xs uppercase tracking-wider text-amber-400 print:text-amber-800 font-semibold mb-2">
                02. Flooring & Wall Finishes
              </h4>
              <ul className="space-y-1.5 text-xs text-neutral-300 print:text-gray-800 list-disc list-inside">
                <li>Imported Italian Botticino marble in living & dining.</li>
                <li>German engineered hardwood flooring in master bedroom suite.</li>
                <li>Anti-skid wooden textured ceramic planks in sky balconies.</li>
                <li>Low-VOC Asian Paints Royale luxury emulsion on interior walls.</li>
              </ul>
            </div>

            <div className="border border-neutral-800 print:border-gray-300 p-4 rounded bg-neutral-900/40 print:bg-white">
              <h4 className="text-xs uppercase tracking-wider text-amber-400 print:text-amber-800 font-semibold mb-2">
                03. Security, Electrical & Smart Systems
              </h4>
              <ul className="space-y-1.5 text-xs text-neutral-300 print:text-gray-800 list-disc list-inside">
                <li>Biometric thumb-print keyless digital locks for all residences.</li>
                <li>Concealed fire-resistant copper wiring (Polycab/Finolex).</li>
                <li>Schneider Electric / Legrand modular switches & plates.</li>
                <li>Color video door phone (VDP) with intercom connectivity.</li>
              </ul>
            </div>

            <div className="border border-neutral-800 print:border-gray-300 p-4 rounded bg-neutral-900/40 print:bg-white">
              <h4 className="text-xs uppercase tracking-wider text-amber-400 print:text-amber-800 font-semibold mb-2">
                04. Green Eco & Communal Infrastructure
              </h4>
              <ul className="space-y-1.5 text-xs text-neutral-300 print:text-gray-800 list-disc list-inside">
                <li>5kW common solar photovoltaic grid for elevators and pumps.</li>
                <li>Dedicated Level-2 EV vehicle charging points in stilt parking.</li>
                <li>Dual percolation rainwater harvesting system.</li>
                <li>Rooftop wooden pergola gazebo and sunset yoga deck.</li>
              </ul>
            </div>
          </div>

          {/* Legal Clearances Notice */}
          <div className="border-t border-neutral-800 print:border-gray-300 pt-4 flex items-center justify-between text-xs text-neutral-400 print:text-gray-600">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 print:text-emerald-700" />
              <span>Sanctioned by NMRDA/NMC with 100% Clear Title Legal Certification</span>
            </span>
            <span className="font-mono">Document Ref: VED-DOS-2026</span>
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-8 pt-4 border-t border-neutral-800 print:hidden flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-400">
            Need an on-site sample specification kit? Book a VIP visit.
          </p>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-none px-4 py-2 border border-neutral-700 hover:border-neutral-500 text-neutral-200 text-xs font-medium rounded-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Save PDF / Print</span>
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="flex-1 sm:flex-none px-5 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
            >
              Book Site Walkthrough
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
