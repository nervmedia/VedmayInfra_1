import React, { useState, useEffect } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Download,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  Maximize2
} from 'lucide-react';
import { Property } from '../data/properties';

interface InteractiveGalleryModalProps {
  property: Property | null;
  onClose: () => void;
  onOpenBooking: (projectName: string) => void;
  onOpenBrochure: (projectName: string) => void;
}

export const InteractiveGalleryModal: React.FC<InteractiveGalleryModalProps> = ({
  property,
  onClose,
  onOpenBooking,
  onOpenBrochure,
}) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setActiveItemIndex(0);
    setIsZoomed(false);
  }, [property?.id]);

  useEffect(() => {
    setIsZoomed(false);
  }, [activeItemIndex]);

  if (!property) return null;

  const currentItem = property.gallery[activeItemIndex] || property.gallery[0];

  const handlePrev = () => {
    setActiveItemIndex((prev) => (prev > 0 ? prev - 1 : property.gallery.length - 1));
  };

  const handleNext = () => {
    setActiveItemIndex((prev) => (prev < property.gallery.length - 1 ? prev + 1 : 0));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-2 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl bg-neutral-950 border border-neutral-800 rounded-sm shadow-2xl overflow-hidden my-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-neutral-800 bg-neutral-950/90">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-widest text-amber-400 font-mono font-medium">
                Official Media · vedmayinfra.com
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-xs font-mono">
                100% Uncut Resolution
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-serif text-white font-medium">{property.title}</h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="p-2 text-neutral-400 hover:text-amber-400 hover:bg-neutral-900 rounded-sm transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-mono"
              title={isZoomed ? 'Reset Fit' : 'Zoom 100%'}
            >
              {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
              <span className="hidden sm:inline">{isZoomed ? 'Fit to Screen' : 'Zoom'}</span>
            </button>

            <a
              href={currentItem.image}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-sm transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-mono"
              title="Open Original High-Resolution Image in New Tab"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">Original HD</span>
            </a>

            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white transition-colors rounded-sm hover:bg-neutral-900 cursor-pointer ml-1"
              aria-label="Close Gallery"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Display Stage — 100% Uncut object-contain without any clipping */}
        <div
          className={`relative w-full bg-[#070A0F] overflow-auto flex items-center justify-center p-3 sm:p-6 transition-all ${
            isZoomed ? 'min-h-[70vh] cursor-zoom-out' : 'h-[52vh] sm:h-[65vh] cursor-zoom-in'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        >
          {/* Subtle Ambient Blur Backdrop */}
          <img
            src={currentItem.image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-20 scale-110 pointer-events-none select-none"
          />

          {/* Full Uncut Image */}
          <img
            src={currentItem.image}
            alt={currentItem.caption}
            className={`relative z-10 rounded-xs shadow-2xl border border-neutral-800/80 transition-all duration-300 ${
              isZoomed
                ? 'w-full max-w-none h-auto object-contain my-auto'
                : 'max-h-full max-w-full w-auto h-auto object-contain'
            }`}
          />

          {/* Nav Controls */}
          {property.gallery.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-neutral-950/80 hover:bg-amber-400 hover:text-neutral-950 text-white rounded-full border border-neutral-700 backdrop-blur-sm transition-all cursor-pointer shadow-lg"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-neutral-950/80 hover:bg-amber-400 hover:text-neutral-950 text-white rounded-full border border-neutral-700 backdrop-blur-sm transition-all cursor-pointer shadow-lg"
                aria-label="Next Image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Frame Index Indicator */}
          <div className="absolute top-4 left-4 z-20 bg-neutral-950/85 px-2.5 py-1 rounded text-xs font-mono text-neutral-200 border border-neutral-800">
            {activeItemIndex + 1} / {property.gallery.length}
          </div>
        </div>

        {/* Thumbnail Reel & Footer Actions */}
        <div className="p-4 sm:p-5 bg-neutral-900/95 border-t border-neutral-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
            <div>
              <h4 className="text-sm font-medium text-white">{currentItem.caption}</h4>
              <p className="text-xs text-neutral-400 mt-0.5">
                Category: <span className="text-amber-300 font-medium">{currentItem.category}</span> · Original Aspect Ratio Preserved (Zero Cropping)
              </p>
            </div>
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => {
                  onClose();
                  onOpenBrochure(property.title);
                }}
                className="px-3.5 py-2 border border-neutral-700 hover:border-amber-400 text-neutral-300 hover:text-white text-xs font-medium rounded-sm transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Brochure</span>
              </button>
              <button
                onClick={() => {
                  onClose();
                  onOpenBooking(property.title);
                }}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-semibold rounded-sm transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Schedule Visit</span>
              </button>
            </div>
          </div>

          {/* Uncut Thumbnails strip */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 pt-1">
            {property.gallery.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveItemIndex(idx)}
                className={`relative shrink-0 w-24 h-16 sm:w-28 sm:h-20 rounded bg-[#070A0F] p-1 overflow-hidden border transition-all flex items-center justify-center cursor-pointer ${
                  activeItemIndex === idx
                    ? 'border-amber-400 ring-2 ring-amber-400/30 opacity-100'
                    : 'border-neutral-800 opacity-60 hover:opacity-100'
                }`}
                title={item.caption}
              >
                <img
                  src={item.image}
                  alt={item.caption}
                  className="max-h-full max-w-full w-auto h-auto object-contain"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
