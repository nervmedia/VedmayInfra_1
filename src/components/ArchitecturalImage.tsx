import React, { useState } from 'react';
import { Maximize2 } from 'lucide-react';

interface ArchitecturalImageProps {
  id: string;
  imageSrc?: string;
  category?: string;
  title: string;
  subtitle?: string;
  className?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1' | 'auto';
  fitMode?: 'contain' | 'cover';
  showBadge?: boolean;
}

// Fallback mapping for real images from vedmayinfra.com
const REAL_IMAGE_MAP: Record<string, string> = {
  'vedira-fortune': '/images/vedmay/vedira-fortune-main.png',
  'om-shree-estate': '/images/vedmay/om-shree-estate-main.jpg',
  'sai-nagri-9': '/images/vedmay/sai-nagri-9-main.png',
  'sai-nagri-8': '/images/vedmay/sai-nagri-8-main.png',
  'sai-nagri-7': '/images/vedmay/sai-nagri-7-main.png',
  'vedmay-flats-collection': '/images/vedmay/flats-facade.jpg',
  'vf-1': '/images/vedmay/vedira-fortune-main.png',
  'vf-2': '/images/vedmay/vedira-fortune-elevation.png',
  'vf-3': '/images/vedmay/flats-living.jpg',
  'vf-4': '/images/vedmay/flats-bedroom.jpg',
  'vf-5': '/images/vedmay/flats-kitchen.jpg',
  'vf-6': '/images/vedmay/flats-terrace.jpg',
  'vf-7': '/images/vedmay/vedira-fortune-plan.png',
  'vf-8': '/images/vedmay/vedira-fortune-location.png',
  'os-1': '/images/vedmay/om-shree-estate-main.jpg',
  'os-2': '/images/vedmay/om-shree-map.png',
  'os-3': '/images/vedmay/om-shree-estate-gate.jpg',
  'os-4': '/images/vedmay/om-shree-estate-site.jpg',
  'sn9-1': '/images/vedmay/sai-nagri-9-main.png',
  'sn9-2': '/images/vedmay/sai-nagri-9-layout.png',
  'sn9-3': '/images/vedmay/sai-nagri-9-location.jpg',
  'sn8-1': '/images/vedmay/sai-nagri-8-main.png',
  'sn8-2': '/images/vedmay/sai-nagri-8-layout.png',
  'sn8-3': '/images/vedmay/sai-nagri-8-site.png',
  'sn8-4': '/images/vedmay/sai-nagri-8-location.jpg',
  'sn7-1': '/images/vedmay/sai-nagri-7-main.png',
  'sn7-2': '/images/vedmay/sai-nagri-7-layout.png',
  'sn7-3': '/images/vedmay/sai-nagri-7-location.jpg',
  'vfc-1': '/images/vedmay/flats-facade.jpg',
  'vfc-2': '/images/vedmay/flats-entrance.jpg',
  'vfc-3': '/images/vedmay/flats-living.jpg',
  'vfc-4': '/images/vedmay/flats-bedroom.jpg',
  'vfc-5': '/images/vedmay/flats-kitchen.jpg',
  'vfc-6': '/images/vedmay/flats-terrace.jpg',
};

export const ArchitecturalImage: React.FC<ArchitecturalImageProps> = ({
  id,
  imageSrc,
  category = 'Exterior',
  title,
  subtitle,
  className = '',
  aspectRatio = '16:9',
  fitMode = 'contain',
  showBadge = false,
}) => {
  const [loadError, setLoadError] = useState(false);

  const aspectClass =
    aspectRatio === '16:9'
      ? 'aspect-[16/9]'
      : aspectRatio === '4:3'
      ? 'aspect-[4/3]'
      : aspectRatio === '1:1'
      ? 'aspect-square'
      : '';

  // Resolved real high-res image from vedmayinfra.com
  const resolvedSrc =
    imageSrc ||
    REAL_IMAGE_MAP[id] ||
    (id.includes('vedira') ? '/images/vedmay/vedira-fortune-main.png' : '') ||
    (id.includes('om-shree') ? '/images/vedmay/om-shree-estate-main.jpg' : '') ||
    (id.includes('sai-nagri-9') ? '/images/vedmay/sai-nagri-9-main.png' : '') ||
    (id.includes('sai-nagri-8') ? '/images/vedmay/sai-nagri-8-main.png' : '') ||
    (id.includes('sai-nagri-7') ? '/images/vedmay/sai-nagri-7-main.png' : '') ||
    '/images/vedmay/vedira-fortune-main.png';

  return (
    <div
      className={`relative overflow-hidden bg-[#0A0D14] flex items-center justify-center ${aspectClass} ${className}`}
    >
      {!loadError ? (
        <>
          {/* Subtle blurred ambient backdrop to fill widescreen frame elegantly without harsh empty borders */}
          <img
            src={resolvedSrc}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover blur-xl opacity-30 scale-110 pointer-events-none select-none transition-opacity duration-700"
          />

          {/* Crystal-clear foreground master image: fitted completely so NO content, text or dimension is cut off */}
          <img
            src={resolvedSrc}
            alt={title}
            loading="eager"
            decoding="async"
            onError={() => setLoadError(true)}
            className={`relative z-10 max-h-full max-w-full w-auto h-auto transition-transform duration-700 ease-out ${
              fitMode === 'contain'
                ? 'object-contain mx-auto p-1.5 group-hover:scale-[1.02]'
                : 'w-full h-full object-cover group-hover:scale-105'
            }`}
          />
        </>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-900 text-neutral-400 p-4 text-center">
          <span className="text-xs uppercase tracking-widest text-[#C5A869] font-mono mb-1">
            VEDMAY INFRA
          </span>
          <span className="text-sm font-serif text-white">{title}</span>
        </div>
      )}

      {/* Subtle luxury vignette gradient overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

      {showBadge && (
        <div className="absolute bottom-2 right-2 z-20 bg-black/75 backdrop-blur-md px-2 py-0.5 text-[10px] font-mono text-[#E4D2A6] rounded-xs border border-white/10 flex items-center gap-1 pointer-events-none">
          <Maximize2 className="w-2.5 h-2.5 text-[#C5A869]" />
          <span>Full Uncut View</span>
        </div>
      )}
    </div>
  );
};
