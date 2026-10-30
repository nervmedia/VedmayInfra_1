import React from 'react';

export interface RoomImageOption {
  id: string;
  label: string;
  mood: 'daylight' | 'twilight' | 'finishes';
  caption: string;
}

interface RoomPerspectiveRenderProps {
  roomId: string;
  mood?: 'daylight' | 'twilight' | 'finishes';
  className?: string;
}

export const RoomPerspectiveRender: React.FC<RoomPerspectiveRenderProps> = ({
  roomId,
  mood = 'twilight',
  className = '',
}) => {
  // Master Bedroom Suite
  if (roomId.includes('master')) {
    return (
      <svg
        viewBox="0 0 600 380"
        className={`w-full h-full object-cover select-none ${className}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="mbWall" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={mood === 'daylight' ? '#2A3447' : '#141A26'} />
            <stop offset="100%" stopColor={mood === 'daylight' ? '#1E2533' : '#0B0F17'} />
          </linearGradient>
          <linearGradient id="mbWoodFloor" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={mood === 'daylight' ? '#4A3728' : '#2D2016'} />
            <stop offset="100%" stopColor={mood === 'daylight' ? '#33241A' : '#1A120B'} />
          </linearGradient>
          <linearGradient id="mbGoldGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.3" />
          </linearGradient>
          <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FDE047" stopOpacity={mood === 'twilight' ? 0.7 : 0.2} />
            <stop offset="100%" stopColor="#FDE047" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Room Backdrop */}
        <rect width="600" height="380" fill="url(#mbWall)" />

        {/* Smoked Oak Wood Flooring in Perspective */}
        <polygon points="0,380 600,380 520,240 80,240" fill="url(#mbWoodFloor)" />
        {/* Parquet Floor Board Lines */}
        <line x1="160" y1="240" x2="110" y2="380" stroke="#100b07" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="260" y1="240" x2="230" y2="380" stroke="#100b07" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="360" y1="240" x2="370" y2="380" stroke="#100b07" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="450" y1="240" x2="490" y2="380" stroke="#100b07" strokeWidth="1" strokeOpacity="0.4" />

        {/* Feature Headboard Wall with Fluted Acoustic Battens */}
        <rect x="80" y="40" width="440" height="200" fill="#1C2331" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.3" />
        {[...Array(16)].map((_, i) => (
          <line
            key={i}
            x1={100 + i * 26}
            y1="40"
            x2={100 + i * 26}
            y2="240"
            stroke="#D4AF37"
            strokeWidth="0.7"
            strokeOpacity={mood === 'finishes' ? 0.6 : 0.25}
          />
        ))}

        {/* Floor-to-Ceiling Balcony Glazing (Right) */}
        <rect x="420" y="30" width="160" height="230" fill={mood === 'daylight' ? '#7DD3FC' : '#0F1E36'} stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.5" />
        {/* Sky View through Glass */}
        {mood === 'daylight' ? (
          <g>
            <rect x="420" y="30" width="160" height="150" fill="#BAE6FD" opacity="0.6" />
            <circle cx="530" cy="70" r="24" fill="#FEF08A" opacity="0.8" />
          </g>
        ) : (
          <g>
            <rect x="420" y="30" width="160" height="230" fill="#0A1120" opacity="0.8" />
            <circle cx="500" cy="80" r="3" fill="#FDE047" opacity="0.9" />
            <line x1="430" y1="160" x2="570" y2="160" stroke="#334155" strokeWidth="0.8" />
            <rect x="440" y="140" width="12" height="20" fill="#D4AF37" opacity="0.4" />
            <rect x="460" y="130" width="16" height="30" fill="#60A5FA" opacity="0.3" />
          </g>
        )}

        {/* King Size Master Bed in Center */}
        <g transform="translate(130, 130)">
          {/* Upholstered Nubuck Leather Headboard */}
          <rect x="20" y="0" width="260" height="90" rx="8" fill="#334155" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.7" />
          <line x1="150" y1="0" x2="150" y2="90" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.5" />
          {/* Mattress Base */}
          <rect x="30" y="60" width="240" height="130" rx="6" fill="#1E293B" />
          {/* Crisp Egyptian Cotton Linen Quilt */}
          <rect x="35" y="90" width="230" height="95" rx="4" fill={mood === 'daylight' ? '#F8FAFC' : '#CBD5E1'} />
          {/* Accent Gold Bed Runner */}
          <rect x="35" y="150" width="230" height="22" fill="#D4AF37" opacity="0.75" />
          {/* Fluffy Pillows */}
          <rect x="50" y="45" width="80" height="35" rx="5" fill="#FFFFFF" />
          <rect x="170" y="45" width="80" height="35" rx="5" fill="#FFFFFF" />
        </g>

        {/* Dual Brass Sconces & Ambient Halo */}
        <circle cx="120" cy="110" r="30" fill="url(#lampGlow)" />
        <circle cx="120" cy="110" r="5" fill="#D4AF37" />
        <line x1="120" y1="80" x2="120" y2="110" stroke="#D4AF37" strokeWidth="1.5" />

        <circle cx="440" cy="110" r="30" fill="url(#lampGlow)" />
        <circle cx="440" cy="110" r="5" fill="#D4AF37" />
        <line x1="440" y1="80" x2="440" y2="110" stroke="#D4AF37" strokeWidth="1.5" />

        {/* Contemporary Bedside Pedestals */}
        <rect x="90" y="190" width="35" height="45" rx="2" fill="#1E2430" stroke="#D4AF37" strokeWidth="0.5" />
        <rect x="430" y="190" width="35" height="45" rx="2" fill="#1E2430" stroke="#D4AF37" strokeWidth="0.5" />

        {/* Spec Watermark Label */}
        <g transform="translate(20, 20)">
          <rect x="0" y="0" width="170" height="24" rx="3" fill="#0B0F17" fillOpacity="0.85" stroke="#D4AF37" strokeWidth="0.6" />
          <text x="10" y="16" fill="#D4AF37" fontSize="10" fontFamily="sans-serif" fontWeight="600" letterSpacing="1">
            MASTER SANCTUARY
          </text>
        </g>
      </svg>
    );
  }

  // Living & Dining Lounge
  if (roomId.includes('living')) {
    return (
      <svg
        viewBox="0 0 600 380"
        className={`w-full h-full object-cover select-none ${className}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="lvWall" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E2532" />
            <stop offset="100%" stopColor="#0B0E14" />
          </linearGradient>
          <linearGradient id="lvMarbleFloor" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={mood === 'daylight' ? '#334155' : '#171F2C'} />
            <stop offset="100%" stopColor={mood === 'daylight' ? '#1E293B' : '#0B0F17'} />
          </linearGradient>
          <linearGradient id="lvChandelierGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Room Background */}
        <rect width="600" height="380" fill="url(#lvWall)" />

        {/* Bookmatched Italian Botticino Marble Floor */}
        <polygon points="0,380 600,380 510,210 90,210" fill="url(#lvMarbleFloor)" />
        {/* Marble Veins */}
        <path d="M110,250 Q220,290 320,270 T500,320" stroke="#FFFFFF" strokeWidth="0.5" strokeOpacity="0.12" fill="none" />
        <path d="M180,310 Q300,350 440,330" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.1" fill="none" />

        {/* Panoramic Glass Terrace Curtain Wall */}
        <rect x="360" y="40" width="220" height="190" fill="#0C1526" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.5" />
        <line x1="470" y1="40" x2="470" y2="230" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.5" />
        {/* Skyline Horizon */}
        <rect x="365" y="120" width="210" height="105" fill="#060A12" opacity="0.7" />
        <circle cx="430" cy="90" r="14" fill="#FDE047" opacity={mood === 'twilight' ? 0.7 : 0.2} />

        {/* Fluted Wood Feature Wall with Hidden Coved Illumination */}
        <rect x="90" y="30" width="250" height="180" fill="#1A1F2B" />
        {[...Array(12)].map((_, i) => (
          <rect key={i} x={95 + i * 20} y="30" width="12" height="180" fill="#131720" stroke="#262E3D" strokeWidth="0.5" />
        ))}
        {/* Coved 2700K Warm LED strip */}
        <rect x="90" y="30" width="250" height="4" fill="#FEF08A" opacity="0.8" />

        {/* Modernist Chandelier */}
        <g transform="translate(250, 40)">
          <line x1="30" y1="0" x2="30" y2="40" stroke="#D4AF37" strokeWidth="1.5" />
          <ellipse cx="30" cy="40" rx="45" ry="12" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
          <circle cx="5" cy="40" r="4" fill="#FEF08A" />
          <circle cx="30" cy="40" r="5" fill="#FEF08A" />
          <circle cx="55" cy="40" r="4" fill="#FEF08A" />
        </g>

        {/* Custom Italian L-Shaped Sectional Lounge */}
        <g transform="translate(130, 200)">
          <rect x="0" y="20" width="240" height="55" rx="6" fill="#334155" stroke="#475569" strokeWidth="1" />
          <rect x="0" y="0" width="240" height="24" rx="4" fill="#1E293B" />
          {/* Gold & Velvet Cushions */}
          <rect x="20" y="6" width="24" height="24" rx="3" fill="#D4AF37" opacity="0.85" />
          <rect x="60" y="6" width="24" height="24" rx="3" fill="#64748B" />
          <rect x="180" y="6" width="24" height="24" rx="3" fill="#D4AF37" opacity="0.85" />
        </g>

        {/* Sculptural Marble & Brass Coffee Table */}
        <g transform="translate(190, 270)">
          <ellipse cx="90" cy="24" rx="75" ry="20" fill="#262626" stroke="#D4AF37" strokeWidth="1" />
          <ellipse cx="90" cy="22" rx="72" ry="18" fill="#1A1A1A" />
          <rect x="65" y="14" width="20" height="12" fill="#D4AF37" opacity="0.7" />
          <circle cx="115" cy="18" r="5" fill="#94A3B8" />
        </g>

        {/* Spec Watermark Label */}
        <g transform="translate(20, 20)">
          <rect x="0" y="0" width="180" height="24" rx="3" fill="#0B0F17" fillOpacity="0.85" stroke="#D4AF37" strokeWidth="0.6" />
          <text x="10" y="16" fill="#D4AF37" fontSize="10" fontFamily="sans-serif" fontWeight="600" letterSpacing="1">
            GRAND LIVING LOUNGE
          </text>
        </g>
      </svg>
    );
  }

  // Designer Modular Kitchen
  if (roomId.includes('kitchen')) {
    return (
      <svg
        viewBox="0 0 600 380"
        className={`w-full h-full object-cover select-none ${className}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="kitWall" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="kitQuartz" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>
        </defs>

        <rect width="600" height="380" fill="url(#kitWall)" />
        {/* Porcelain Slate Floor */}
        <polygon points="0,380 600,380 500,240 100,240" fill="#131B2B" />

        {/* Overhead Soft-Close Cabinetry with Under-Cabinet LEDs */}
        <rect x="90" y="40" width="420" height="75" fill="#1E2430" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.4" />
        {[...Array(6)].map((_, i) => (
          <g key={i}>
            <rect x={95 + i * 68} y="44" width="64" height="67" fill="#242C3D" stroke="#334155" strokeWidth="0.5" />
            <line x1={95 + i * 68 + 30} y1="100" x2={95 + i * 68 + 40} y2="100" stroke="#D4AF37" strokeWidth="1.5" />
          </g>
        ))}
        {/* Under-cabinet task LED strip */}
        <rect x="90" y="115" width="420" height="3" fill="#FEF08A" opacity="0.9" />

        {/* Backsplash in Calacatta Marble Tiles */}
        <rect x="90" y="118" width="420" height="82" fill="#0F172A" />
        <path d="M120,150 Q240,170 360,155 T490,165" stroke="#FFFFFF" strokeWidth="0.5" strokeOpacity="0.2" fill="none" />

        {/* Main Kitchen Counter with Quartz Stone Top */}
        <rect x="90" y="200" width="420" height="15" fill="url(#kitQuartz)" stroke="#94A3B8" strokeWidth="0.5" />
        <rect x="90" y="215" width="420" height="70" fill="#1E2430" stroke="#334155" strokeWidth="0.5" />

        {/* Built-in Bosch Induction Hob & Sleek Chimney Hood */}
        <g transform="translate(180, 70)">
          <polygon points="40,0 80,0 95,50 25,50" fill="#0F172A" stroke="#475569" strokeWidth="1" />
          <rect x="20" y="50" width="80" height="10" fill="#334155" />
          <circle cx="45" cy="55" r="2.5" fill="#D4AF37" />
          <circle cx="75" cy="55" r="2.5" fill="#D4AF37" />
        </g>
        {/* 4-Zone Hob Surface */}
        <rect x="200" y="196" width="80" height="6" fill="#000000" rx="1" />
        <circle cx="215" cy="199" r="2.5" fill="#EF4444" opacity="0.8" />
        <circle cx="235" cy="199" r="2.5" fill="#EF4444" opacity="0.8" />
        <circle cx="255" cy="199" r="2.5" fill="#EF4444" opacity="0.8" />

        {/* Undermount Double Quartz Sink with Tall Brushed Brass Gooseneck Tap */}
        <g transform="translate(360, 165)">
          <path d="M25,35 L25,10 A15,15 0 0,1 55,10 L55,20" fill="none" stroke="#D4AF37" strokeWidth="2.5" />
          <rect x="15" y="34" width="45" height="5" fill="#D4AF37" rx="1" />
        </g>

        {/* Spec Watermark Label */}
        <g transform="translate(20, 20)">
          <rect x="0" y="0" width="180" height="24" rx="3" fill="#0B0F17" fillOpacity="0.85" stroke="#D4AF37" strokeWidth="0.6" />
          <text x="10" y="16" fill="#D4AF37" fontSize="10" fontFamily="sans-serif" fontWeight="600" letterSpacing="1">
            MODULAR QUARTZ KITCHEN
          </text>
        </g>
      </svg>
    );
  }

  // Sky Balcony & Terrace Deck
  if (roomId.includes('balcony') || roomId.includes('terrace')) {
    return (
      <svg
        viewBox="0 0 600 380"
        className={`w-full h-full object-cover select-none ${className}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="balcSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0B132B" />
            <stop offset="50%" stopColor="#1C2541" />
            <stop offset="85%" stopColor="#473347" />
            <stop offset="100%" stopColor="#7E4A4C" />
          </linearGradient>
          <linearGradient id="balcTeak" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#78350F" />
            <stop offset="100%" stopColor="#451A03" />
          </linearGradient>
        </defs>

        {/* Sunset Sky over Nagpur Horizon */}
        <rect width="600" height="380" fill="url(#balcSky)" />

        {/* Distant City Skyline Silhouettes */}
        <path
          d="M0,230 L50,220 L100,225 L160,210 L230,220 L310,205 L380,220 L450,215 L520,225 L600,210 L600,270 L0,270 Z"
          fill="#0B0F17"
          opacity="0.85"
        />
        <circle cx="340" cy="140" r="28" fill="#FDE047" opacity="0.3" />
        <circle cx="340" cy="140" r="16" fill="#FDE047" opacity="0.75" />

        {/* Balcony Cantilever Teakwood Decking */}
        <polygon points="0,380 600,380 550,250 50,250" fill="url(#balcTeak)" />
        {[...Array(14)].map((_, i) => (
          <line
            key={i}
            x1={40 + i * 40}
            y1="250"
            x2={i * 45}
            y2="380"
            stroke="#271202"
            strokeWidth="1.2"
            strokeOpacity="0.7"
          />
        ))}

        {/* Frameless Toughened Glass Balustrade with Bronze Handrail */}
        <rect x="40" y="200" width="520" height="52" fill="#60A5FA" fillOpacity="0.15" stroke="#93C5FD" strokeWidth="0.5" strokeOpacity="0.4" />
        <line x1="40" y1="200" x2="560" y2="200" stroke="#D4AF37" strokeWidth="2.5" />
        {[100, 200, 300, 400, 500].map((x, i) => (
          <line key={i} x1={x} y1="200" x2={x} y2="252" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.6" />
        ))}

        {/* Luxury Outdoor Wicker Lounge & Planters */}
        <g transform="translate(180, 280)">
          <rect x="0" y="0" width="130" height="40" rx="6" fill="#1C2430" stroke="#334155" strokeWidth="1" />
          <rect x="10" y="6" width="110" height="28" rx="4" fill="#CBD5E1" opacity="0.9" />
          <rect x="15" y="10" width="22" height="20" rx="3" fill="#D4AF37" opacity="0.8" />
        </g>
        {/* Low Teak Cocktail Table */}
        <ellipse cx="350" cy="310" rx="35" ry="12" fill="#451A03" stroke="#D4AF37" strokeWidth="1" />

        {/* Lush Green Architectural Planters */}
        <g transform="translate(470, 230)">
          <rect x="10" y="20" width="45" height="45" rx="3" fill="#1C2430" stroke="#D4AF37" strokeWidth="0.8" />
          <circle cx="22" cy="18" r="14" fill="#15803D" />
          <circle cx="42" cy="14" r="16" fill="#16A34A" />
          <circle cx="32" cy="8" r="12" fill="#22C55E" />
        </g>

        {/* Spec Watermark Label */}
        <g transform="translate(20, 20)">
          <rect x="0" y="0" width="180" height="24" rx="3" fill="#0B0F17" fillOpacity="0.85" stroke="#D4AF37" strokeWidth="0.6" />
          <text x="10" y="16" fill="#D4AF37" fontSize="10" fontFamily="sans-serif" fontWeight="600" letterSpacing="1">
            SKY GARDEN BALCONY
          </text>
        </g>
      </svg>
    );
  }

  // Sacred Vastu Prayer Sanctum (Mandir)
  if (roomId.includes('mandir')) {
    return (
      <svg
        viewBox="0 0 600 380"
        className={`w-full h-full object-cover select-none ${className}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="manWall" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E2331" />
            <stop offset="100%" stopColor="#0E121B" />
          </linearGradient>
          <radialGradient id="divineAura" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="600" height="380" fill="url(#manWall)" />
        {/* Pure White Makrana Marble Floor */}
        <polygon points="0,380 600,380 490,250 110,250" fill="#E2E8F0" />
        <line x1="220" y1="250" x2="160" y2="380" stroke="#CBD5E1" strokeWidth="0.8" />
        <line x1="380" y1="250" x2="440" y2="380" stroke="#CBD5E1" strokeWidth="0.8" />

        {/* Back Wall with Pure White Marble Laser-Cut Jaali Screen */}
        <rect x="140" y="40" width="320" height="210" fill="#F8FAFC" stroke="#D4AF37" strokeWidth="1" />
        {/* Sacred Arch Gopuram */}
        <path d="M160,250 L160,110 Q300,30 440,110 L440,250 Z" fill="#F1F5F9" stroke="#D4AF37" strokeWidth="1.2" />

        {/* Divine Golden Halo Aura */}
        <circle cx="300" cy="140" r="90" fill="url(#divineAura)" />

        {/* Sacred Brass OM Emblem */}
        <text x="300" y="155" fill="#D4AF37" fontSize="48" fontFamily="serif" textAnchor="middle" fontWeight="bold">
          ॐ
        </text>

        {/* Tiered Marble Altar with Brass Diyas */}
        <g transform="translate(190, 210)">
          <rect x="0" y="15" width="220" height="25" rx="3" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="1" />
          <rect x="25" y="0" width="170" height="15" rx="2" fill="#F8FAFC" stroke="#D4AF37" strokeWidth="0.8" />

          {/* Left Diya */}
          <ellipse cx="45" cy="0" rx="8" ry="3" fill="#D4AF37" />
          <path d="M45,0 Q43,-12 45,-16 Q47,-12 45,0" fill="#F59E0B" />
          <circle cx="45" cy="-10" r="3" fill="#FEF08A" />

          {/* Right Diya */}
          <ellipse cx="175" cy="0" rx="8" ry="3" fill="#D4AF37" />
          <path d="M175,0 Q173,-12 175,-16 Q177,-12 175,0" fill="#F59E0B" />
          <circle cx="175" cy="-10" r="3" fill="#FEF08A" />

          {/* Flower Garlands */}
          <circle cx="110" cy="15" r="5" fill="#F97316" />
          <circle cx="95" cy="16" r="4" fill="#FDE047" />
          <circle cx="125" cy="16" r="4" fill="#FDE047" />
        </g>

        {/* Spec Watermark Label */}
        <g transform="translate(20, 20)">
          <rect x="0" y="0" width="190" height="24" rx="3" fill="#0B0F17" fillOpacity="0.85" stroke="#D4AF37" strokeWidth="0.6" />
          <text x="10" y="16" fill="#D4AF37" fontSize="10" fontFamily="sans-serif" fontWeight="600" letterSpacing="1">
            ISHANYA VASTU MANDIR
          </text>
        </g>
      </svg>
    );
  }

  // Default: Junior Bedroom / Guest Bedroom
  return (
    <svg
      viewBox="0 0 600 380"
      className={`w-full h-full object-cover select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="600" height="380" fill="#151A24" />
      <polygon points="0,380 600,380 500,240 100,240" fill="#201812" />
      <rect x="100" y="50" width="400" height="190" fill="#1C2331" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.3" />

      {/* Modern Queen Bed */}
      <g transform="translate(160, 150)">
        <rect x="0" y="0" width="200" height="60" rx="6" fill="#2E384D" stroke="#D4AF37" strokeWidth="0.8" />
        <rect x="10" y="40" width="180" height="120" rx="4" fill="#CBD5E1" />
        <rect x="25" y="20" width="65" height="30" rx="3" fill="#FFFFFF" />
        <rect x="110" y="20" width="65" height="30" rx="3" fill="#FFFFFF" />
      </g>

      {/* Corner Study Desk with Floating Shelves */}
      <g transform="translate(380, 170)">
        <rect x="0" y="20" width="90" height="6" fill="#D4AF37" />
        <rect x="0" y="60" width="100" height="8" fill="#334155" />
        <circle cx="45" cy="50" r="14" fill="#FEF08A" opacity="0.3" />
      </g>

      {/* Spec Watermark Label */}
      <g transform="translate(20, 20)">
        <rect x="0" y="0" width="180" height="24" rx="3" fill="#0B0F17" fillOpacity="0.85" stroke="#D4AF37" strokeWidth="0.6" />
        <text x="10" y="16" fill="#D4AF37" fontSize="10" fontFamily="sans-serif" fontWeight="600" letterSpacing="1">
          JUNIOR EXECUTIVE SUITE
        </text>
      </g>
    </svg>
  );
};

interface FloorPlan3DCutawayProps {
  planTitle: string;
  className?: string;
}

export const FloorPlan3DCutaway: React.FC<FloorPlan3DCutawayProps> = ({
  planTitle,
  className = '',
}) => {
  return (
    <div className={`relative w-full h-full flex items-center justify-center bg-[#070A0F] p-4 ${className}`}>
      <svg
        viewBox="0 0 800 520"
        className="w-full h-auto max-h-[480px] select-none filter drop-shadow-2xl"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="cutawayBase" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0B0F17" />
          </linearGradient>
          <linearGradient id="wallTop" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>
          <linearGradient id="marbleTile" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2A3447" />
            <stop offset="100%" stopColor="#151C28" />
          </linearGradient>
          <linearGradient id="woodParquet" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#451A03" />
            <stop offset="100%" stopColor="#290E02" />
          </linearGradient>
        </defs>

        {/* 3D Isometric Floor Slab Shadow */}
        <polygon
          points="400,60 740,210 740,230 400,440 60,230 60,210"
          fill="#000000"
          opacity="0.6"
        />

        {/* Main Isometric Concrete Foundation Floor Slab */}
        <polygon
          points="400,50 740,200 400,410 60,200"
          fill="url(#cutawayBase)"
          stroke="#D4AF37"
          strokeWidth="1.5"
        />

        {/* Vertical Floor Slab Edges (3D Depth) */}
        <polygon points="60,200 400,410 400,430 60,220" fill="#0B0F17" stroke="#334155" strokeWidth="1" />
        <polygon points="400,410 740,200 740,220 400,430" fill="#141B26" stroke="#334155" strokeWidth="1" />

        {/* Section 1: Grand Living Lounge (Italian Marble Flooring) */}
        <polygon points="400,50 560,120 400,240 240,140" fill="url(#marbleTile)" stroke="#38BDF8" strokeWidth="0.8" />
        {/* Living Room Furniture in 3D Isometric */}
        <g transform="translate(320, 110)">
          {/* L-Sofa in Isometric */}
          <polygon points="50,10 110,40 80,60 20,30" fill="#334155" stroke="#64748B" strokeWidth="1" />
          <polygon points="80,60 110,40 120,45 90,65" fill="#1E293B" />
          {/* Coffee Table */}
          <ellipse cx="60" cy="40" rx="20" ry="10" fill="#D4AF37" opacity="0.8" />
          {/* Chandelier Glow */}
          <circle cx="65" cy="0" r="15" fill="#FEF08A" opacity="0.3" />
        </g>
        <text x="360" y="170" fill="#D4AF37" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
          LIVING & DINING (424 SQ.FT)
        </text>

        {/* Section 2: Master Bedroom Suite (Smoked Oak Parquet) */}
        <polygon points="560,120 740,200 580,320 400,240" fill="url(#woodParquet)" stroke="#D4AF37" strokeWidth="0.8" />
        {/* Master Bed in 3D */}
        <g transform="translate(540, 180)">
          <polygon points="30,10 90,40 50,70 -10,40" fill="#CBD5E1" stroke="#D4AF37" strokeWidth="1" />
          {/* Headboard */}
          <polygon points="30,10 90,40 90,15 30,-15" fill="#334155" />
          {/* Accent Gold Runner */}
          <polygon points="10,55 70,25 75,28 15,58" fill="#D4AF37" />
        </g>
        <text x="570" y="270" fill="#FEF08A" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
          MASTER SANCTUARY (246 SQ.FT)
        </text>

        {/* Section 3: Designer Kitchen (Porcelain Tiles) */}
        <polygon points="240,140 400,240 310,330 150,220" fill="#1E293B" stroke="#F59E0B" strokeWidth="0.8" />
        <text x="270" y="240" fill="#F59E0B" fontSize="10" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
          MODULAR KITCHEN
        </text>

        {/* Section 4: Sky Balcony Deck (Teakwood Decking) */}
        <polygon points="400,240 580,320 400,410 310,330" fill="#78350F" stroke="#22C55E" strokeWidth="1.2" />
        {/* Balcony Planters */}
        <circle cx="480" cy="330" r="10" fill="#15803D" />
        <circle cx="500" cy="340" r="8" fill="#22C55E" />
        <circle cx="360" cy="370" r="10" fill="#15803D" />
        <text x="440" y="375" fill="#86EFAC" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
          SKY BALCONY DECK (220 SQ.FT)
        </text>

        {/* Section 5: Vastu Mandir Sanctuary */}
        <polygon points="150,220 220,170 280,210 210,260" fill="#FEF08A" fillOpacity="0.25" stroke="#D4AF37" strokeWidth="1.5" />
        <text x="215" y="215" fill="#D4AF37" fontSize="12" textAnchor="middle" fontWeight="bold">
          ॐ MANDIR
        </text>

        {/* 3D Architectural Wall Extrusions (Cutaway Height) */}
        {/* Perimeter Walls in 3D */}
        <polygon points="400,50 400,25 740,175 740,200" fill="#1E293B" stroke="#D4AF37" strokeWidth="0.8" />
        <polygon points="60,200 60,175 400,25 400,50" fill="#0F172A" stroke="#D4AF37" strokeWidth="0.8" />
        {/* Center Partition Wall */}
        <polygon points="400,240 400,215 560,95 560,120" fill="#1E293B" stroke="#D4AF37" strokeWidth="0.8" />

        {/* Top Trim Brass Lines on Walls */}
        <line x1="400" y1="25" x2="740" y2="175" stroke="#D4AF37" strokeWidth="2" />
        <line x1="60" y1="175" x2="400" y2="25" stroke="#D4AF37" strokeWidth="2" />
        <line x1="400" y1="215" x2="560" y2="95" stroke="#D4AF37" strokeWidth="1.5" />

        {/* 3D Cutaway Header Badge */}
        <g transform="translate(40, 40)">
          <rect x="0" y="0" width="280" height="42" rx="4" fill="#0B0F17" fillOpacity="0.9" stroke="#D4AF37" strokeWidth="1" />
          <text x="16" y="20" fill="#D4AF37" fontSize="11" fontFamily="sans-serif" fontWeight="bold" letterSpacing="1">
            3D ARCHITECTURAL ISOMETRIC CUTAWAY
          </text>
          <text x="16" y="34" fill="#94A3B8" fontSize="10" fontFamily="sans-serif">
            {planTitle} · Top-Down Spatial Perspective
          </text>
        </g>
      </svg>
    </div>
  );
};
