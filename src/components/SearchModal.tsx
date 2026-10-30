import React, { useState } from 'react';
import { X, Search, MapPin, ArrowRight } from 'lucide-react';
import { PROPERTIES } from '../data/properties';
import { PageType, OurProjectsStatusFilter } from './Navbar';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageType, subTab?: OurProjectsStatusFilter) => void;
  onOpenBooking: (projectName?: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenBooking,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = PROPERTIES.filter((p) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      p.title.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.reraNumber.toLowerCase().includes(q)
    );
  });

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-start justify-center pt-20 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-[#0D1117] border border-neutral-800 rounded-sm shadow-2xl overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-neutral-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#C5A869]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Vedmay Infra projects (e.g., Vedira Fortune, Om Shree Estate, Sai Nagri)..."
            autoFocus
            className="w-full bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[65vh] overflow-y-auto divide-y divide-neutral-800/80">
          {filtered.map((prop) => (
            <div
              key={prop.id}
              className="p-4 hover:bg-neutral-900/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={prop.image}
                  alt={prop.title}
                  className="w-16 h-16 object-contain bg-black p-1 border border-neutral-800 shrink-0"
                />
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#C5A869]">
                    {prop.statusKicker || prop.status} · {prop.reraNumber}
                  </div>
                  <h4 className="text-lg font-serif text-white">{prop.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-neutral-400">
                    <MapPin className="w-3 h-3 text-[#C5A869]" />
                    <span>{prop.location}</span>
                    <span>·</span>
                    <span className="text-white font-mono">{prop.priceDisplay}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigate('all-projects');
                  }}
                  className="px-3 py-1.5 border border-neutral-700 hover:border-[#C5A869] text-xs uppercase tracking-wider text-neutral-200 cursor-pointer flex items-center gap-1"
                >
                  <span>View</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenBooking(prop.title);
                  }}
                  className="px-3 py-1.5 bg-[#C5A869] text-neutral-950 font-semibold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Enquire
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
