import React, { useState, useEffect } from 'react';
import {
  Maximize2,
  Minimize2,
  Compass,
  Ruler,
  Info,
  Sparkles,
  Download,
  Calendar,
  Sun,
  Moon,
  Eye,
  Palette,
  Box,
  Image as ImageIcon,
  Grid3X3,
  X,
  ChevronRight,
  ZoomIn,
  Layers,
  CheckCircle2,
  Sliders,
  ExternalLink,
  Camera,
  Check,
  Columns,
} from 'lucide-react';
import { FloorPlanOption, RoomDetail } from '../data/properties';
import { RoomPerspectiveRender, FloorPlan3DCutaway } from './FloorPlanVisuals';
import {
  FloorPlanTheme,
  FLOOR_PLAN_THEMES,
  LUXURY_MATERIAL_SWATCHES,
  ROOM_PHOTOGRAPHY,
  PLAN_3D_CUTAWAY_IMAGES,
  BhkArchitecturalSnapshot,
  BHK_ARCHITECTURAL_SNAPSHOTS,
} from '../data/floorPlanThemes';

export type { FloorPlanTheme };

export type DisplayViewMode =
  | '3d-render-image'
  | '2d-plan'
  | '3d-cutaway'
  | 'room-gallery'
  | 'materials';

export type RoomVisualMode = 'photo' | 'twilight' | 'daylight' | 'vector' | 'finishes';

export type SnapshotAngle =
  | 'cutaway'
  | 'living'
  | 'master'
  | 'kitchen'
  | 'balcony'
  | 'daylight'
  | 'twilight'
  | 'blueprint';

interface InteractiveFloorPlanProps {
  floorPlans: FloorPlanOption[];
  onOpenBooking: (projectName: string) => void;
  onOpenBrochure: (projectName: string) => void;
}

export const InteractiveFloorPlan: React.FC<InteractiveFloorPlanProps> = ({
  floorPlans,
  onOpenBooking,
  onOpenBrochure,
}) => {
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);
  const currentPlan = floorPlans[selectedPlanIndex] || floorPlans[0];

  const [activeRoomId, setActiveRoomId] = useState<string>(
    currentPlan.rooms[0]?.id || 'room-living'
  );

  // Active BHK Configuration for dedicated High-Res Architectural Snapshots (2BHK, 3BHK, 4BHK)
  const [activeBhk, setActiveBhk] = useState<'2BHK' | '3BHK' | '4BHK'>('3BHK');
  const [activeSnapshotAngle, setActiveSnapshotAngle] = useState<SnapshotAngle>('cutaway');
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [compareAngle, setCompareAngle] = useState<'cutaway' | 'living' | 'master' | 'kitchen' | 'balcony'>('living');

  // 7 Architectural Themes
  const [activeTheme, setActiveTheme] = useState<FloorPlanTheme>('onyx-gold');

  // Display View Modes (High-Res Snapshot vs 2D CAD vs 3D Isometric vs Room Walkthrough vs Materials)
  const [displayView, setDisplayView] = useState<DisplayViewMode>('3d-render-image');

  // Image subtype for legacy 3D Render Image Mode
  const [renderImageType, setRenderImageType] = useState<'render' | 'blueprint' | 'isometric'>('render');

  // Room Visual Mode in Sidebar
  const [roomVisualMode, setRoomVisualMode] = useState<RoomVisualMode>('photo');

  // Fullscreen Lightbox Modal
  const [enlargedImageRoom, setEnlargedImageRoom] = useState<RoomDetail | null>(null);
  const [lightboxImageSrc, setLightboxImageSrc] = useState<string | null>(null);

  const [showDimensions, setShowDimensions] = useState(true);
  const [showPinsOn3D, setShowPinsOn3D] = useState(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const activeRoom: RoomDetail =
    currentPlan.rooms.find((r) => r.id === activeRoomId) || currentPlan.rooms[0];

  // Keep activeBhk synchronized with the active floor plan
  useEffect(() => {
    if (currentPlan) {
      if (currentPlan.id.includes('2bhk') || currentPlan.title.includes('2 BHK')) {
        setActiveBhk('2BHK');
      } else if (currentPlan.id.includes('4bhk') || currentPlan.title.includes('4 BHK')) {
        setActiveBhk('4BHK');
      } else if (currentPlan.id.includes('3bhk') || currentPlan.title.includes('3 BHK')) {
        setActiveBhk('3BHK');
      }
    }
  }, [currentPlan]);

  const handlePlanChange = (idx: number) => {
    setSelectedPlanIndex(idx);
    const plan = floorPlans[idx];
    if (plan) {
      if (plan.id.includes('2bhk') || plan.title.includes('2 BHK')) {
        setActiveBhk('2BHK');
      } else if (plan.id.includes('4bhk') || plan.title.includes('4 BHK')) {
        setActiveBhk('4BHK');
      } else if (plan.id.includes('3bhk') || plan.title.includes('3 BHK')) {
        setActiveBhk('3BHK');
      }
      if (plan.rooms.length > 0) {
        setActiveRoomId(plan.rooms[0].id);
      }
    }
  };

  const handleBhkSnapshotSelect = (bhk: '2BHK' | '3BHK' | '4BHK') => {
    setActiveBhk(bhk);
    const targetPlanId =
      bhk === '2BHK'
        ? 'fp-2bhk-fortune'
        : bhk === '4BHK'
        ? 'fp-4bhk-penthouse'
        : 'fp-3bhk-fortune';
    const foundIdx = floorPlans.findIndex(
      (p) =>
        p.id === targetPlanId ||
        (bhk === '2BHK' && p.title.includes('2 BHK')) ||
        (bhk === '3BHK' && p.title.includes('3 BHK')) ||
        (bhk === '4BHK' && p.title.includes('4 BHK'))
    );
    if (foundIdx !== -1) {
      setSelectedPlanIndex(foundIdx);
      const plan = floorPlans[foundIdx];
      if (plan && plan.rooms.length > 0) {
        setActiveRoomId(plan.rooms[0].id);
      }
    }
  };

  const currentTheme = FLOOR_PLAN_THEMES[activeTheme] || FLOOR_PLAN_THEMES['onyx-gold'];
  const currentBhkSnapshot =
    BHK_ARCHITECTURAL_SNAPSHOTS[activeBhk] || BHK_ARCHITECTURAL_SNAPSHOTS['3BHK'];

  const getActiveSnapshotUrl = () => {
    switch (activeSnapshotAngle) {
      case 'living':
        return currentBhkSnapshot.livingLounge;
      case 'master':
        return currentBhkSnapshot.masterSuite;
      case 'kitchen':
        return currentBhkSnapshot.kitchenDining;
      case 'balcony':
        return currentBhkSnapshot.balconyTerrace;
      case 'daylight':
        return currentBhkSnapshot.daylightView;
      case 'twilight':
        return currentBhkSnapshot.twilightView;
      case 'blueprint':
        return currentBhkSnapshot.blueprintSketch;
      case 'cutaway':
      default:
        return currentBhkSnapshot.hero3DCutaway;
    }
  };

  const getActiveSnapshotTitle = () => {
    switch (activeSnapshotAngle) {
      case 'living':
        return 'Grand Living & Dining Lounge Snapshot';
      case 'master':
        return 'Master Bedroom Sanctuary Snapshot';
      case 'kitchen':
        return 'Gourmet Modular Kitchen Snapshot';
      case 'balcony':
        return 'Panoramic Sky Balcony & Terrace Snapshot';
      case 'daylight':
        return 'Natural Daylight Architectural Perspective';
      case 'twilight':
        return 'Atmospheric Twilight & 2700K Ambient Glow';
      case 'blueprint':
        return 'Technical CAD Drafting Sheet Blueprint';
      case 'cutaway':
      default:
        return 'Photorealistic 3D Spatial Cutaway Model';
    }
  };

  const currentPlanImageData =
    PLAN_3D_CUTAWAY_IMAGES[currentPlan.id] || PLAN_3D_CUTAWAY_IMAGES['fp-3bhk-fortune'];
  const activeRoomPhoto =
    ROOM_PHOTOGRAPHY[activeRoom?.id] || ROOM_PHOTOGRAPHY['room-living'];

  // Calculate pin position percentage on the 3D Render view from the room coordinates
  const getRoomPinPercent = (room: RoomDetail) => {
    // Coordinate space is 600 x 450
    const xPct = ((room.coordinates.x + room.coordinates.width / 2) / 600) * 100;
    const yPct = ((room.coordinates.y + room.coordinates.height / 2) / 450) * 100;
    return { left: `${Math.min(92, Math.max(8, xPct))}%`, top: `${Math.min(90, Math.max(10, yPct))}%` };
  };

  return (
    <section
      id="floor-plans"
      className="py-20 text-neutral-100 relative overflow-hidden scroll-mt-20 transition-colors duration-700"
      style={{
        backgroundColor:
          activeTheme === 'nordic-ivory'
            ? '#EDE8DD'
            : activeTheme === 'emerald-sanctuary'
            ? '#030E09'
            : activeTheme === 'champagne-rose'
            ? '#0D070B'
            : activeTheme === 'blueprint'
            ? '#020914'
            : '#070A0F',
      }}
    >
      {/* Background Architectural Grid Lines */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          backgroundImage: `linear-gradient(to right, ${currentTheme.gridStroke}15 1px, transparent 1px), linear-gradient(to bottom, ${currentTheme.gridStroke}15 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-medium mb-3 px-3 py-1 rounded-full border transition-colors"
            style={{
              color: currentTheme.accentColor,
              borderColor: currentTheme.badgeBorder,
              backgroundColor: currentTheme.badgeBg,
            }}
          >
            <Ruler className="w-3.5 h-3.5" style={{ color: currentTheme.accentColor }} />
            <span>Interactive Architectural Studio & Floor Plans</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight mb-4 transition-colors"
            style={{
              color: activeTheme === 'nordic-ivory' ? '#0F172A' : '#FFFFFF',
            }}
          >
            Floor Plans, 3D Spatial Renders & Themes
          </h2>
          <p
            className="text-sm sm:text-base font-light leading-relaxed transition-colors"
            style={{
              color: activeTheme === 'nordic-ivory' ? '#475569' : '#A3A3A3',
            }}
          >
            Explore diverse high-resolution architectural 3D cutaway images, switch between 7 luxury design themes,
            inspect technical CAD blueprints, and experience photographic day & twilight room perspectives.
          </p>
        </div>

        {/* Configuration Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {floorPlans.map((plan, idx) => (
            <button
              key={plan.id}
              onClick={() => handlePlanChange(idx)}
              className={`px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 rounded-sm border whitespace-nowrap cursor-pointer ${
                selectedPlanIndex === idx
                  ? 'shadow-lg'
                  : 'bg-neutral-900/80 text-neutral-300 border-neutral-800 hover:border-neutral-600 hover:text-white'
              }`}
              style={
                selectedPlanIndex === idx
                  ? {
                      backgroundColor: currentTheme.accentColor,
                      color:
                        activeTheme === 'nordic-ivory' || activeTheme === 'onyx-gold'
                          ? '#070A0F'
                          : '#FFFFFF',
                      borderColor: currentTheme.accentColor,
                      boxShadow: `0 0 20px ${currentTheme.glowColor}`,
                    }
                  : undefined
              }
            >
              {plan.title}
            </button>
          ))}
        </div>

        {/* Master Control Suite: View Modes + Architectural Themes */}
        <div className="bg-neutral-950/90 border border-neutral-800/90 rounded-sm p-4 mb-6 shadow-xl backdrop-blur-md space-y-4">
          {/* Row 1: View Modes Switcher */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-mono mr-1 shrink-0 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>Floor Plan View:</span>
              </span>

              {/* Mode 1: High-Res Architectural Snapshot (2BHK · 3BHK · 4BHK) */}
              <button
                onClick={() => setDisplayView('3d-render-image')}
                className={`px-3 py-1.5 text-xs font-medium rounded flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                  displayView === '3d-render-image'
                    ? 'shadow-sm text-neutral-950 font-semibold'
                    : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800'
                }`}
                style={
                  displayView === '3d-render-image'
                    ? { backgroundColor: currentTheme.accentColor }
                    : undefined
                }
              >
                <Camera className="w-3.5 h-3.5" />
                <span>High-Res Architectural Snapshot</span>
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold uppercase transition-colors"
                  style={{
                    backgroundColor:
                      displayView === '3d-render-image'
                        ? 'rgba(0, 0, 0, 0.25)'
                        : 'rgba(212, 175, 55, 0.15)',
                    color:
                      displayView === '3d-render-image'
                        ? '#070A0F'
                        : '#FEF08A',
                  }}
                >
                  2BHK · 3BHK · 4BHK
                </span>
              </button>

              {/* Mode 2: Interactive CAD Blueprint */}
              <button
                onClick={() => setDisplayView('2d-plan')}
                className={`px-3 py-1.5 text-xs font-medium rounded flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                  displayView === '2d-plan'
                    ? 'shadow-sm text-neutral-950 font-semibold'
                    : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800'
                }`}
                style={
                  displayView === '2d-plan'
                    ? { backgroundColor: currentTheme.accentColor }
                    : undefined
                }
              >
                <Grid3X3 className="w-3.5 h-3.5" />
                <span>Interactive CAD Blueprint</span>
              </button>

              {/* Mode 3: 3D Isometric Cutaway */}
              <button
                onClick={() => setDisplayView('3d-cutaway')}
                className={`px-3 py-1.5 text-xs font-medium rounded flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                  displayView === '3d-cutaway'
                    ? 'shadow-sm text-neutral-950 font-semibold'
                    : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800'
                }`}
                style={
                  displayView === '3d-cutaway'
                    ? { backgroundColor: currentTheme.accentColor }
                    : undefined
                }
              >
                <Box className="w-3.5 h-3.5" />
                <span>Isometric 3D Cutaway</span>
              </button>

              {/* Mode 4: Room Walkthrough Photo Gallery */}
              <button
                onClick={() => setDisplayView('room-gallery')}
                className={`px-3 py-1.5 text-xs font-medium rounded flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                  displayView === 'room-gallery'
                    ? 'shadow-sm text-neutral-950 font-semibold'
                    : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800'
                }`}
                style={
                  displayView === 'room-gallery'
                    ? { backgroundColor: currentTheme.accentColor }
                    : undefined
                }
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Room Walkthrough Gallery</span>
              </button>

              {/* Mode 5: Luxury Materials & Finishes */}
              <button
                onClick={() => setDisplayView('materials')}
                className={`px-3 py-1.5 text-xs font-medium rounded flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                  displayView === 'materials'
                    ? 'shadow-sm text-neutral-950 font-semibold'
                    : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800'
                }`}
                style={
                  displayView === 'materials'
                    ? { backgroundColor: currentTheme.accentColor }
                    : undefined
                }
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Material Swatches</span>
              </button>
            </div>

            {/* Quick Stats Pill */}
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 bg-neutral-900 px-3 py-1 rounded border border-neutral-800">
              <span className="text-amber-400 font-semibold">{currentPlan.superBuiltUpSqFt} sq.ft</span>
              <span>·</span>
              <span className="text-emerald-400">Vastu {currentPlan.vastuScore}%</span>
            </div>
          </div>

          {/* Row 2: 7 Architectural Themes Palette Bar */}
          <div className="pt-3 border-t border-neutral-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-mono mr-1 shrink-0 flex items-center gap-1">
                <Palette className="w-3.5 h-3.5 text-amber-400" />
                <span>Architectural Themes (7 Styles):</span>
              </span>

              {(Object.keys(FLOOR_PLAN_THEMES) as FloorPlanTheme[]).map((themeKey) => {
                const th = FLOOR_PLAN_THEMES[themeKey];
                const isActive = activeTheme === themeKey;
                return (
                  <button
                    key={themeKey}
                    onClick={() => setActiveTheme(themeKey)}
                    className={`px-2.5 py-1 text-xs rounded transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 border ${
                      isActive
                        ? 'border-amber-400 bg-neutral-800 text-white shadow-md'
                        : 'border-neutral-800 bg-neutral-900/90 text-neutral-400 hover:text-white hover:border-neutral-700'
                    }`}
                    style={
                      isActive
                        ? {
                            borderColor: th.accentColor,
                            backgroundColor: th.badgeBg,
                            color: th.badgeText,
                          }
                        : undefined
                    }
                    title={th.tagline}
                  >
                    {/* 3-Tone Swatch Pill */}
                    <span className="inline-flex items-center -space-x-1 shrink-0">
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-black/40"
                        style={{ backgroundColor: th.swatchColors[0] }}
                      />
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-black/40"
                        style={{ backgroundColor: th.swatchColors[1] }}
                      />
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-black/40"
                        style={{ backgroundColor: th.swatchColors[2] }}
                      />
                    </span>
                    <span>{th.shortName}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Theme Description */}
            <div className="text-[11px] text-neutral-400 hidden xl:flex items-center gap-1 font-mono">
              <span className="text-neutral-500">Active:</span>
              <span style={{ color: currentTheme.accentColor }}>{currentTheme.name}</span>
            </div>
          </div>
        </div>

        {/* Primary Viewport + Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Viewport (8 Cols) */}
          <div
            className="lg:col-span-8 bg-neutral-900/90 border rounded-sm p-4 sm:p-6 backdrop-blur-sm relative transition-all duration-500"
            style={{
              borderColor:
                activeTheme === 'nordic-ivory'
                  ? '#CBD5E1'
                  : currentTheme.badgeBorder,
              boxShadow: `0 0 35px ${currentTheme.glowColor}`,
            }}
          >
            {/* Viewport Top Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-neutral-800 text-xs">
              <div className="flex items-center gap-2">
                <span
                  className="text-xs font-mono font-semibold uppercase tracking-wider"
                  style={{ color: currentTheme.accentColor }}
                >
                  {currentPlan.title}
                </span>
                <span className="text-neutral-500 hidden sm:inline">|</span>
                <span className="text-neutral-400 text-[11px] hidden sm:inline">
                  {currentPlan.facing}
                </span>
              </div>

              {/* Viewport Control Tools */}
              <div className="flex items-center gap-2">
                {/* Pin toggle on 3D view */}
                {displayView === '3d-render-image' && activeSnapshotAngle === 'cutaway' && (
                  <button
                    onClick={() => setShowPinsOn3D(!showPinsOn3D)}
                    className={`px-2.5 py-1 text-xs border rounded flex items-center gap-1 transition-colors cursor-pointer ${
                      showPinsOn3D
                        ? 'border-amber-400/60 text-amber-300 bg-amber-400/10'
                        : 'border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                    title="Toggle Interactive Room Pin Hotspots"
                  >
                    <span>Pins</span>
                  </button>
                )}

                {/* Compare BHK Snapshots Trigger */}
                {displayView === '3d-render-image' && (
                  <button
                    onClick={() => setIsCompareModalOpen(true)}
                    className="px-2.5 py-1 text-xs border border-amber-400/50 hover:border-amber-400 text-amber-300 bg-amber-400/10 hover:bg-amber-400/20 rounded flex items-center gap-1.5 transition-colors cursor-pointer font-medium"
                    title="Compare 2BHK, 3BHK, and 4BHK High-Res Snapshots Side-by-Side"
                  >
                    <Columns className="w-3.5 h-3.5 text-amber-400" />
                    <span>Compare BHKs</span>
                  </button>
                )}

                {/* Dimension toggle on 2D CAD plan */}
                {displayView === '2d-plan' && (
                  <button
                    onClick={() => setShowDimensions(!showDimensions)}
                    className={`px-3 py-1.5 border rounded flex items-center gap-1.5 transition-colors cursor-pointer ${
                      showDimensions
                        ? 'border-amber-400/60 text-amber-300 bg-amber-400/10'
                        : 'border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                    title="Toggle dimension overlay"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Dimensions</span>
                  </button>
                )}

                {/* Zoom */}
                <button
                  onClick={() => setZoomLevel((prev) => (prev >= 1.3 ? 1 : prev + 0.15))}
                  className="p-1.5 border border-neutral-800 rounded text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  title="Zoom Viewport"
                >
                  {zoomLevel > 1 ? (
                    <Minimize2 className="w-3.5 h-3.5" />
                  ) : (
                    <Maximize2 className="w-3.5 h-3.5" />
                  )}
                </button>

                {/* North Compass */}
                <div className="flex items-center gap-1 text-[11px] text-neutral-400 bg-neutral-950 px-2 py-1 rounded border border-neutral-800">
                  <Compass className="w-3 h-3 text-amber-400" />
                  <span>North ↑</span>
                </div>
              </div>
            </div>

            {/* VIEW 1: HIGH-RES ARCHITECTURAL SNAPSHOT MODE (DEDICATED 2BHK · 3BHK · 4BHK) */}
            {displayView === '3d-render-image' && (
              <div className="space-y-3">
                {/* Dedicated BHK Quick-Switcher Bar (2BHK · 3BHK · 4BHK) */}
                <div className="bg-neutral-950 p-2 sm:p-2.5 rounded-sm border border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-mono font-medium flex items-center gap-1.5 mr-1">
                      <Camera className="w-3.5 h-3.5 text-amber-400" />
                      <span>Select Snapshot Unit:</span>
                    </span>

                    {(['2BHK', '3BHK', '4BHK'] as const).map((bhkKey) => {
                      const snap = BHK_ARCHITECTURAL_SNAPSHOTS[bhkKey];
                      const isActive = activeBhk === bhkKey;
                      return (
                        <button
                          key={bhkKey}
                          onClick={() => handleBhkSnapshotSelect(bhkKey)}
                          className={`px-3 py-1.5 rounded text-xs transition-all cursor-pointer flex items-center gap-2 border ${
                            isActive
                              ? 'shadow-md font-bold'
                              : 'bg-neutral-900 text-neutral-400 hover:text-white border-neutral-800 hover:border-neutral-700'
                          }`}
                          style={
                            isActive
                              ? {
                                  backgroundColor: currentTheme.accentColor,
                                  color:
                                    activeTheme === 'nordic-ivory' || activeTheme === 'onyx-gold'
                                      ? '#070A0F'
                                      : '#FFFFFF',
                                  borderColor: currentTheme.accentColor,
                                }
                              : undefined
                          }
                        >
                          <span className="font-mono text-xs">{bhkKey}</span>
                          <span className="text-[11px] opacity-80 hidden sm:inline">
                            ({snap.superBuiltUp})
                          </span>
                          {isActive && <Check className="w-3 h-3 ml-0.5" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Active BHK Tagline */}
                  <div className="text-[11px] font-mono text-neutral-400 flex items-center gap-2">
                    <span className="text-amber-400 font-semibold">{currentBhkSnapshot.badge}</span>
                    <span>·</span>
                    <span className="text-neutral-300">{currentBhkSnapshot.superBuiltUp}</span>
                  </div>
                </div>

                {/* Perspective & Angle Selector Strip */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                  <span className="text-[10px] font-mono uppercase text-neutral-500 shrink-0 mr-1">
                    Angle:
                  </span>
                  {[
                    { id: 'cutaway', label: '3D Spatial Cutaway', icon: '🏢' },
                    { id: 'living', label: 'Living & Dining Salon', icon: '🛋️' },
                    { id: 'master', label: 'Master Suite Retreat', icon: '🛏️' },
                    { id: 'kitchen', label: 'Gourmet Modular Kitchen', icon: '🍳' },
                    { id: 'balcony', label: 'Sky Deck Balcony', icon: '🌅' },
                    { id: 'daylight', label: 'Daylight Perspective', icon: '☀️' },
                    { id: 'twilight', label: 'Twilight 2700K Glow', icon: '🌙' },
                    { id: 'blueprint', label: 'CAD Technical Sheet', icon: '📐' },
                  ].map((angle) => {
                    const isSelected = activeSnapshotAngle === angle.id;
                    return (
                      <button
                        key={angle.id}
                        onClick={() => setActiveSnapshotAngle(angle.id as SnapshotAngle)}
                        className={`px-2.5 py-1 text-xs rounded transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 border ${
                          isSelected
                            ? 'bg-amber-400 text-neutral-950 font-semibold border-amber-400 shadow-sm'
                            : 'bg-neutral-950 text-neutral-400 hover:text-white border-neutral-800 hover:border-neutral-700'
                        }`}
                        title={`${angle.label} for ${activeBhk}`}
                      >
                        <span className="text-xs">{angle.icon}</span>
                        <span>{angle.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* High-Resolution Architectural Image Stage */}
                <div
                  className="relative w-full overflow-hidden border rounded min-h-[380px] sm:min-h-[460px] flex items-center justify-center p-1 transition-all duration-500 bg-neutral-950"
                  style={{
                    borderColor: currentTheme.badgeBorder,
                    backgroundColor: currentTheme.viewportBg,
                  }}
                >
                  <div
                    className="relative w-full h-full max-w-[700px] transition-transform duration-300 ease-out flex items-center justify-center overflow-hidden rounded"
                    style={{ transform: `scale(${zoomLevel})` }}
                  >
                    {/* The Dedicated High-Resolution Architectural Image for the Active BHK & Angle */}
                    <img
                      key={`${activeBhk}-${activeSnapshotAngle}`}
                      src={getActiveSnapshotUrl()}
                      alt={`${activeBhk} ${getActiveSnapshotTitle()}`}
                      className="w-full h-auto max-h-[460px] object-contain rounded shadow-2xl transition-all duration-500 animate-fadeIn"
                      loading="eager"
                    />

                    {/* Theme Color Ambient Tint Overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none mix-blend-color opacity-15"
                      style={{ backgroundColor: currentTheme.accentColor }}
                    />

                    {/* Unit Spec Watermark Badge */}
                    <div className="absolute top-3 left-3 bg-neutral-950/90 border border-neutral-800 text-[11px] px-2.5 py-1 rounded backdrop-blur-md flex items-center gap-2 pointer-events-none shadow-lg">
                      <span className="font-mono font-bold text-amber-400">{activeBhk}</span>
                      <span className="text-neutral-500">|</span>
                      <span className="text-white font-medium">{getActiveSnapshotTitle()}</span>
                      <span className="text-neutral-500">|</span>
                      <span className="text-neutral-400 font-mono text-[10px]">
                        {currentBhkSnapshot.superBuiltUp}
                      </span>
                    </div>

                    {/* Interactive Room Hotspots / Beacon Pins (Shown on 3D Cutaway) */}
                    {showPinsOn3D && activeSnapshotAngle === 'cutaway' && (
                      <div className="absolute inset-0 pointer-events-auto">
                        {currentPlan.rooms.map((room) => {
                          const isSelected = activeRoomId === room.id;
                          const pinPos = getRoomPinPercent(room);

                          return (
                            <div
                              key={room.id}
                              style={{ left: pinPos.left, top: pinPos.top }}
                              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
                              onClick={() => setActiveRoomId(room.id)}
                            >
                              {/* Pulsing Beacon Ring */}
                              <span
                                className={`absolute -inset-2 rounded-full opacity-75 ${
                                  isSelected ? 'animate-ping' : 'group-hover:animate-ping'
                                }`}
                                style={{ backgroundColor: currentTheme.accentColor }}
                              />

                              {/* Pin Center */}
                              <div
                                className={`relative px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold flex items-center gap-1 shadow-2xl transition-transform ${
                                  isSelected
                                    ? 'scale-110 ring-2 ring-white text-neutral-950 font-bold'
                                    : 'text-white hover:scale-105'
                                }`}
                                style={{
                                  backgroundColor: isSelected
                                    ? currentTheme.accentColor
                                    : 'rgba(15, 23, 42, 0.85)',
                                  borderColor: currentTheme.accentColor,
                                  border: '1px solid',
                                }}
                              >
                                <span
                                  className="w-1.5 h-1.5 rounded-full"
                                  style={{ backgroundColor: currentTheme.pinColor }}
                                />
                                <span className="truncate max-w-[80px] sm:max-w-none">{room.name}</span>
                              </div>

                              {/* Hover Tooltip Card */}
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 bg-neutral-950/95 border border-neutral-700 rounded shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
                                <p className="text-xs font-semibold text-white">{room.name}</p>
                                <p className="text-[10px] text-amber-400 font-mono">
                                  {room.dimensions} · {room.sqft} sq.ft
                                </p>
                                <p className="text-[10px] text-neutral-400 line-clamp-1 mt-0.5">
                                  {room.vastuQuadrant}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Lightbox Trigger for Full-Screen High-Resolution View */}
                    <button
                      onClick={() => setLightboxImageSrc(getActiveSnapshotUrl())}
                      className="absolute top-3 right-3 p-2 bg-neutral-950/80 hover:bg-amber-400 hover:text-neutral-950 text-white rounded transition-colors shadow-lg cursor-pointer backdrop-blur-sm"
                      title="Enlarge Full High-Resolution Image"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Viewport Caption Bar */}
                  <div className="absolute bottom-3 left-3 right-3 bg-neutral-950/90 border border-neutral-800 text-[11px] text-neutral-300 p-2 sm:px-3 rounded flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="line-clamp-1">
                        <strong className="text-white font-mono">{activeBhk}:</strong>{' '}
                        {currentBhkSnapshot.caption}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setIsCompareModalOpen(true)}
                        className="text-[10px] font-mono text-amber-400 hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <Columns className="w-3 h-3" />
                        <span>Compare 2BHK · 3BHK · 4BHK</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 2: INTERACTIVE CAD BLUEPRINT (WITH 7 THEMES) */}
            {displayView === '2d-plan' && (
              <div
                className="relative w-full overflow-hidden border rounded flex items-center justify-center min-h-[380px] sm:min-h-[460px] p-2 transition-colors duration-500"
                style={{
                  backgroundColor: currentTheme.viewportBg,
                  borderColor:
                    activeTheme === 'nordic-ivory' ? '#CBD5E1' : currentTheme.badgeBorder,
                }}
              >
                <div
                  className="w-full h-full max-w-[620px] transition-transform duration-300 ease-out flex items-center justify-center"
                  style={{ transform: `scale(${zoomLevel})` }}
                >
                  <svg
                    viewBox="0 0 600 450"
                    className="w-full h-auto select-none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Definitions */}
                    <defs>
                      <pattern
                        id={`cadGrid-${activeTheme}`}
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M 20 0 L 0 0 0 20"
                          fill="none"
                          stroke={currentTheme.gridStroke}
                          strokeWidth="0.5"
                          strokeOpacity={currentTheme.gridOpacity}
                        />
                      </pattern>
                      <linearGradient id="themeActiveGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={currentTheme.accentColor} stopOpacity="0.4" />
                        <stop offset="100%" stopColor={currentTheme.accentColor} stopOpacity="0.12" />
                      </linearGradient>
                    </defs>

                    {/* Background Grid */}
                    <rect width="600" height="450" fill={`url(#cadGrid-${activeTheme})`} />

                    {/* Vastu Quadrant Energy Overlay */}
                    {activeTheme === 'vastu-mandala' && (
                      <g opacity="0.32">
                        {/* NE - Ishanya */}
                        <rect x="40" y="30" width="170" height="130" fill="#10B981" />
                        <text x="125" y="95" fill="#FFFFFF" fontSize="10" textAnchor="middle" fontWeight="bold">
                          NE · ISHANYA (Water / Divine)
                        </text>
                        {/* East - Indra */}
                        <rect x="210" y="30" width="170" height="130" fill="#06B6D4" />
                        <text x="295" y="95" fill="#FFFFFF" fontSize="10" textAnchor="middle" fontWeight="bold">
                          EAST · INDRA (Solar Vitality)
                        </text>
                        {/* SE - Agneya */}
                        <rect x="380" y="30" width="170" height="130" fill="#EF4444" />
                        <text x="465" y="95" fill="#FFFFFF" fontSize="10" textAnchor="middle" fontWeight="bold">
                          SE · AGNEYA (Sacred Kitchen Fire)
                        </text>

                        {/* North - Kubera */}
                        <rect x="40" y="160" width="170" height="130" fill="#6366F1" />
                        <text x="125" y="225" fill="#FFFFFF" fontSize="10" textAnchor="middle" fontWeight="bold">
                          NORTH · KUBERA (Abundance)
                        </text>
                        {/* Center - Brahmāsthan */}
                        <rect x="210" y="160" width="170" height="130" fill="#F59E0B" />
                        <text x="295" y="225" fill="#FFFFFF" fontSize="10" textAnchor="middle" fontWeight="bold">
                          BRAHMĀSTHAN (Cosmic Ether)
                        </text>
                        {/* South - Yama */}
                        <rect x="380" y="160" width="170" height="130" fill="#F97316" />
                        <text x="465" y="225" fill="#FFFFFF" fontSize="10" textAnchor="middle" fontWeight="bold">
                          SOUTH · YAMA
                        </text>

                        {/* NW - Vayavya */}
                        <rect x="40" y="290" width="170" height="130" fill="#38BDF8" />
                        <text x="125" y="355" fill="#FFFFFF" fontSize="10" textAnchor="middle" fontWeight="bold">
                          NW · VAYAVYA (Cosmic Air)
                        </text>
                        {/* West - Varuna */}
                        <rect x="210" y="290" width="170" height="130" fill="#64748B" />
                        <text x="295" y="355" fill="#FFFFFF" fontSize="10" textAnchor="middle" fontWeight="bold">
                          WEST · VARUNA
                        </text>
                        {/* SW - Nairutya */}
                        <rect x="380" y="290" width="170" height="130" fill="#B45309" />
                        <text x="465" y="355" fill="#FFFFFF" fontSize="10" textAnchor="middle" fontWeight="bold">
                          SW · NAIRUTYA (Master Stability)
                        </text>
                      </g>
                    )}

                    {/* Outer Structural Perimeter Walls */}
                    <rect
                      x="40"
                      y="10"
                      width="510"
                      height="410"
                      fill="none"
                      stroke={currentTheme.outerWallStroke}
                      strokeWidth="4"
                      rx="2"
                    />

                    {/* Main Entrance Foyer */}
                    <g transform="translate(40, 200)">
                      <path
                        d="M0,0 A40,40 0 0,1 40,40"
                        fill="none"
                        stroke={currentTheme.accentColor}
                        strokeWidth="2"
                        strokeDasharray="4 2"
                      />
                      <line x1="0" y1="0" x2="0" y2="40" stroke={currentTheme.accentColor} strokeWidth="3" />
                      <text
                        x="-8"
                        y="25"
                        fill={currentTheme.accentColor}
                        fontSize="9"
                        textAnchor="end"
                        fontFamily="monospace"
                      >
                        MAIN FOYER
                      </text>
                    </g>

                    {/* Interactive Rooms Rendered from Plan Data */}
                    {currentPlan.rooms.map((room) => {
                      const isSelected = activeRoomId === room.id;
                      const { x, y, width, height } = room.coordinates;

                      return (
                        <g
                          key={room.id}
                          className="cursor-pointer transition-all duration-200"
                          onClick={() => setActiveRoomId(room.id)}
                        >
                          {/* Room Boundary */}
                          <rect
                            x={x}
                            y={y}
                            width={width}
                            height={height}
                            fill={isSelected ? 'url(#themeActiveGlow)' : currentTheme.defaultRoomFill}
                            stroke={isSelected ? currentTheme.selectedRoomStroke : currentTheme.defaultRoomStroke}
                            strokeWidth={isSelected ? '2.5' : '1.5'}
                            className="transition-colors hover:opacity-85"
                          />

                          {/* Furniture Details for living, master, kitchen, balcony, mandir */}
                          <g opacity={isSelected ? '0.9' : '0.6'}>
                            {room.id.includes('living') && (
                              <g transform={`translate(${x + 20}, ${y + 30})`}>
                                <rect x="0" y="0" width="120" height="28" rx="4" fill="#334155" />
                                <rect x="0" y="28" width="28" height="55" rx="4" fill="#334155" />
                                <rect x="42" y="36" width="55" height="32" rx="3" fill="#64748B" />
                                <rect x="140" y="16" width="60" height="85" rx="3" fill="#475569" />
                                <circle cx="130" cy="35" r="5" fill="#94A3B8" />
                                <circle cx="130" cy="65" r="5" fill="#94A3B8" />
                                <circle cx="210" cy="35" r="5" fill="#94A3B8" />
                                <circle cx="210" cy="65" r="5" fill="#94A3B8" />
                              </g>
                            )}

                            {room.id.includes('master') && (
                              <g transform={`translate(${x + 30}, ${y + 30})`}>
                                <rect x="30" y="0" width="110" height="110" rx="6" fill="#334155" />
                                <rect x="40" y="10" width="90" height="25" rx="2" fill="#E2E8F0" />
                                <rect x="10" y="10" width="15" height="20" rx="2" fill="#64748B" />
                                <rect x="145" y="10" width="15" height="20" rx="2" fill="#64748B" />
                              </g>
                            )}

                            {room.id.includes('kitchen') && (
                              <g transform={`translate(${x + 10}, ${y + 10})`}>
                                <rect x="0" y="0" width="145" height="24" fill="#475569" />
                                <rect x="0" y="24" width="24" height="90" fill="#475569" />
                                <circle cx="50" cy="12" r="6" fill="#EF4444" opacity="0.6" />
                                <circle cx="70" cy="12" r="6" fill="#EF4444" opacity="0.6" />
                                <rect x="100" y="4" width="25" height="16" rx="2" fill="#94A3B8" />
                              </g>
                            )}

                            {room.id.includes('balcony') && (
                              <g transform={`translate(${x + 20}, ${y + 8})`}>
                                <circle cx="20" cy="15" r="7" fill="#22C55E" opacity="0.8" />
                                <circle cx="50" cy="15" r="7" fill="#22C55E" opacity="0.8" />
                                <rect x="140" y="8" width="35" height="16" rx="2" fill="#A16207" />
                                <circle cx="210" cy="15" r="7" fill="#22C55E" opacity="0.8" />
                              </g>
                            )}

                            {room.id.includes('mandir') && (
                              <g transform={`translate(${x + 15}, ${y + 12})`}>
                                <circle cx="25" cy="20" r="10" fill="#D4AF37" opacity="0.5" />
                                <text x="25" y="24" fill="#FEF08A" fontSize="12" textAnchor="middle">
                                  🕉
                                </text>
                              </g>
                            )}
                          </g>

                          {/* Room Name Label */}
                          <text
                            x={x + width / 2}
                            y={y + height / 2 - (showDimensions ? 10 : 0)}
                            fill={isSelected ? currentTheme.accentColor : currentTheme.roomTextColor}
                            fontSize={width < 100 ? '9' : '11'}
                            fontWeight={isSelected ? '600' : '500'}
                            textAnchor="middle"
                            className="pointer-events-none drop-shadow-md"
                          >
                            {room.name}
                          </text>

                          {/* Room Dimension Indicator */}
                          {showDimensions && (
                            <text
                              x={x + width / 2}
                              y={y + height / 2 + 10}
                              fill={isSelected ? currentTheme.roomSubTextColor : currentTheme.roomSubTextColor}
                              fontSize="9"
                              fontFamily="monospace"
                              textAnchor="middle"
                              className="pointer-events-none"
                            >
                              {room.dimensions} ({room.sqft} sq.ft)
                            </text>
                          )}

                          {/* Hotspot Pulse Node */}
                          <circle
                            cx={x + 16}
                            cy={y + 16}
                            r={isSelected ? '5' : '3.5'}
                            fill={isSelected ? currentTheme.accentColor : currentTheme.pinColor}
                            className={isSelected ? 'animate-pulse' : ''}
                          />
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Floating Instruction Badge */}
                <div className="absolute bottom-3 left-3 bg-neutral-950/90 border border-neutral-800 text-[11px] text-neutral-300 px-3 py-1.5 rounded flex items-center gap-2 backdrop-blur-sm pointer-events-none">
                  <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Click any room on the blueprint to inspect images & technical specs</span>
                </div>
              </div>
            )}

            {/* VIEW 3: 3D ISOMETRIC CUTAWAY */}
            {displayView === '3d-cutaway' && (
              <div className="w-full rounded border border-neutral-800 overflow-hidden">
                <FloorPlan3DCutaway planTitle={currentPlan.title} />
              </div>
            )}

            {/* VIEW 4: ROOM VISUAL WALKTHROUGH GALLERY */}
            {displayView === 'room-gallery' && (
              <div className="w-full space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentPlan.rooms.map((room) => {
                    const roomPhotos = ROOM_PHOTOGRAPHY[room.id] || ROOM_PHOTOGRAPHY['room-living'];
                    const isSelected = activeRoomId === room.id;

                    return (
                      <div
                        key={room.id}
                        onClick={() => setActiveRoomId(room.id)}
                        className={`group border rounded-sm overflow-hidden bg-neutral-950 transition-all cursor-pointer ${
                          isSelected
                            ? 'border-amber-400 shadow-xl'
                            : 'border-neutral-800 hover:border-neutral-700'
                        }`}
                        style={
                          isSelected
                            ? { borderColor: currentTheme.accentColor }
                            : undefined
                        }
                      >
                        <div className="aspect-[16/10] relative overflow-hidden bg-neutral-900">
                          <img
                            src={roomPhotos.daylight}
                            alt={room.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEnlargedImageRoom(room);
                            }}
                            className="absolute top-2 right-2 p-1.5 bg-neutral-950/80 hover:bg-amber-400 hover:text-neutral-950 text-white rounded transition-colors"
                            title="Enlarge high-res render"
                          >
                            <ZoomIn className="w-3.5 h-3.5" />
                          </button>

                          <div className="absolute bottom-2 left-3 right-3 text-white">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400">
                              {room.vastuQuadrant}
                            </span>
                          </div>
                        </div>

                        <div className="p-3">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <h4 className="font-serif font-medium text-white">{room.name}</h4>
                            <span className="font-mono text-amber-400 text-[11px]">
                              {room.sqft} sq.ft
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-400 line-clamp-1">{room.finishes}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* VIEW 5: LUXURY MATERIALS & FINISHES PALETTE */}
            {displayView === 'materials' && (
              <div className="w-full space-y-4">
                <div className="bg-neutral-950/80 p-3 rounded border border-neutral-800 text-xs text-neutral-300 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Curated Luxury Material Specifications for {currentPlan.title}</span>
                  </div>
                  <span className="text-[10px] text-amber-400/80 font-mono">100% Certified Origins</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {LUXURY_MATERIAL_SWATCHES.map((swatch) => (
                    <div
                      key={swatch.id}
                      className="border border-neutral-800 rounded bg-neutral-950/90 overflow-hidden group hover:border-amber-400/60 transition-all"
                    >
                      <div className="aspect-[4/3] relative overflow-hidden bg-neutral-900">
                        <img
                          src={swatch.imageUrl}
                          alt={swatch.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <span className="absolute top-2 left-2 text-[10px] font-mono uppercase bg-neutral-950/80 px-2 py-0.5 rounded text-amber-300 border border-neutral-700">
                          {swatch.category}
                        </span>
                      </div>
                      <div className="p-3 text-xs">
                        <h4 className="font-medium text-white mb-1">{swatch.name}</h4>
                        <div className="space-y-1 text-[11px] text-neutral-400 font-light">
                          <p><span className="text-neutral-500">Application:</span> {swatch.application}</p>
                          <p><span className="text-neutral-500">Origin:</span> {swatch.origin}</p>
                          <p><span className="text-neutral-500">Finish:</span> {swatch.finish}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Visual Room Image Thumbnails Strip */}
            <div className="mt-4 pt-4 border-t border-neutral-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider text-neutral-400 font-mono flex items-center gap-1.5">
                  <ImageIcon className="w-3 h-3 text-amber-400" />
                  <span>Room Perspectives & Photography:</span>
                </span>
                <span className="text-[11px] text-amber-400/80">
                  Select space to inspect
                </span>
              </div>

              <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
                {currentPlan.rooms.map((room) => {
                  const isSelected = activeRoomId === room.id;
                  const roomPhoto = ROOM_PHOTOGRAPHY[room.id] || ROOM_PHOTOGRAPHY['room-living'];

                  return (
                    <button
                      key={room.id}
                      onClick={() => setActiveRoomId(room.id)}
                      className={`group flex-shrink-0 w-36 sm:w-40 rounded-sm border p-1 text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-amber-400 bg-amber-400/10 shadow-lg'
                          : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700'
                      }`}
                      style={
                        isSelected
                          ? { borderColor: currentTheme.accentColor }
                          : undefined
                      }
                    >
                      <div className="w-full aspect-[16/10] overflow-hidden rounded bg-neutral-900 mb-1.5 relative">
                        <img
                          src={roomPhoto.daylight}
                          alt={room.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div className="text-[11px] font-medium text-white truncate group-hover:text-amber-400 transition-colors">
                        {room.name}
                      </div>
                      <div className="text-[10px] font-mono text-neutral-400">
                        {room.dimensions} ({room.sqft} sq.ft)
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Room Inspector & High-Resolution Visual Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Active Room Perspective Image Card */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-sm overflow-hidden shadow-xl">
              <div className="p-3 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wider text-amber-400 font-mono font-medium flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Room Visual Perspective</span>
                </span>

                {/* Mood Switcher (Photo vs Twilight vs Daylight vs Finishes vs Vector) */}
                <div className="flex items-center gap-1 bg-neutral-900 p-0.5 rounded border border-neutral-800">
                  <button
                    onClick={() => setRoomVisualMode('photo')}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                      roomVisualMode === 'photo'
                        ? 'bg-amber-400 text-neutral-950 font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                    title="Real Architectural Photo"
                  >
                    Photo
                  </button>
                  <button
                    onClick={() => setRoomVisualMode('daylight')}
                    className={`p-1 rounded text-xs transition-colors cursor-pointer ${
                      roomVisualMode === 'daylight'
                        ? 'bg-amber-400 text-neutral-950'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                    title="Daylight Architecture"
                  >
                    <Sun className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => setRoomVisualMode('twilight')}
                    className={`p-1 rounded text-xs transition-colors cursor-pointer ${
                      roomVisualMode === 'twilight'
                        ? 'bg-amber-400 text-neutral-950'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                    title="Twilight / Ambient 2700K"
                  >
                    <Moon className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => setRoomVisualMode('finishes')}
                    className={`p-1 rounded text-xs transition-colors cursor-pointer ${
                      roomVisualMode === 'finishes'
                        ? 'bg-amber-400 text-neutral-950'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                    title="Material Textures"
                  >
                    <Sparkles className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => setRoomVisualMode('vector')}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                      roomVisualMode === 'vector'
                        ? 'bg-amber-400 text-neutral-950 font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                    title="Vector CAD Schematic"
                  >
                    CAD
                  </button>
                </div>
              </div>

              {/* High-Resolution Room Render Viewport */}
              <div className="aspect-[16/10] relative group overflow-hidden bg-neutral-950">
                {roomVisualMode === 'vector' ? (
                  <RoomPerspectiveRender roomId={activeRoom.id} mood="twilight" />
                ) : (
                  <img
                    src={
                      roomVisualMode === 'twilight'
                        ? activeRoomPhoto.twilight
                        : roomVisualMode === 'finishes'
                        ? activeRoomPhoto.finishes
                        : activeRoomPhoto.daylight
                    }
                    alt={activeRoom.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                <button
                  onClick={() => setEnlargedImageRoom(activeRoom)}
                  className="absolute bottom-2 right-2 px-2.5 py-1 bg-neutral-950/80 hover:bg-amber-400 hover:text-neutral-950 text-white text-[11px] font-medium rounded flex items-center gap-1.5 transition-colors cursor-pointer backdrop-blur-sm"
                >
                  <Maximize2 className="w-3 h-3" />
                  <span>Enlarge Render</span>
                </button>

                <div className="absolute top-2 left-2 bg-neutral-950/85 px-2 py-0.5 rounded border border-neutral-700 text-[10px] font-mono text-amber-300">
                  {roomVisualMode.toUpperCase()} VIEW
                </div>
              </div>

              {/* Room Specifications & Architectural Dossier */}
              <div className="p-4 space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                  <h3 className="text-lg font-serif font-medium text-white">{activeRoom.name}</h3>
                  <span className="font-mono text-xs text-amber-400 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
                    {activeRoom.sqft} sq.ft ({activeRoom.sqm} m²)
                  </span>
                </div>

                <div>
                  <span className="text-neutral-500 block uppercase tracking-wider text-[10px] mb-0.5">
                    Dimensions
                  </span>
                  <span className="text-amber-300 font-mono text-sm">{activeRoom.dimensions}</span>
                </div>

                <div>
                  <span className="text-neutral-500 block uppercase tracking-wider text-[10px] mb-0.5">
                    Vastu Quadrant & Element
                  </span>
                  <div className="flex items-center gap-1.5 text-amber-200">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{activeRoom.vastuQuadrant}</span>
                  </div>
                </div>

                <div>
                  <span className="text-neutral-500 block uppercase tracking-wider text-[10px] mb-0.5">
                    Architectural Finishes
                  </span>
                  <p className="text-neutral-300 leading-relaxed font-light">
                    {activeRoom.finishes}
                  </p>
                </div>

                <div>
                  <span className="text-neutral-500 block uppercase tracking-wider text-[10px] mb-0.5">
                    Lighting & Cross-Ventilation
                  </span>
                  <p className="text-neutral-300 leading-relaxed font-light">
                    {activeRoom.lighting}
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onOpenBooking('Vedira Fortune')}
                    className="w-full py-2.5 bg-amber-400 text-neutral-950 font-medium text-xs tracking-wider uppercase hover:bg-amber-300 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                    style={{
                      backgroundColor: currentTheme.accentColor,
                      color:
                        activeTheme === 'nordic-ivory' || activeTheme === 'onyx-gold'
                          ? '#070A0F'
                          : '#FFFFFF',
                    }}
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Private Walkthrough</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Overall Configuration Metrics Summary */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-sm p-4 shadow-lg">
              <h4 className="text-sm font-medium text-white uppercase tracking-wider text-[11px] mb-3 pb-2 border-b border-neutral-800">
                Residence Specifications
              </h4>

              <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                <div className="bg-neutral-950 p-2.5 rounded border border-neutral-800/80">
                  <span className="text-neutral-500 block text-[10px] uppercase">
                    Super Built-Up
                  </span>
                  <span className="text-base font-semibold text-white font-mono">
                    {currentPlan.superBuiltUpSqFt}
                  </span>
                  <span className="text-[10px] text-neutral-400 ml-1">sq. ft.</span>
                </div>

                <div className="bg-neutral-950 p-2.5 rounded border border-neutral-800/80">
                  <span className="text-neutral-500 block text-[10px] uppercase">Carpet Area</span>
                  <span className="text-base font-semibold text-white font-mono">
                    {currentPlan.carpetSqFt}
                  </span>
                  <span className="text-[10px] text-neutral-400 ml-1">sq. ft.</span>
                </div>

                <div className="bg-neutral-950 p-2.5 rounded border border-neutral-800/80">
                  <span className="text-neutral-500 block text-[10px] uppercase">Sky Balcony</span>
                  <span className="text-base font-semibold text-white font-mono">
                    {currentPlan.balconySqFt}
                  </span>
                  <span className="text-[10px] text-neutral-400 ml-1">sq. ft.</span>
                </div>

                <div className="bg-neutral-950 p-2.5 rounded border border-neutral-800/80">
                  <span className="text-neutral-500 block text-[10px] uppercase">Vastu Score</span>
                  <span className="text-base font-semibold text-emerald-400 font-mono">
                    {currentPlan.vastuScore}%
                  </span>
                  <span className="text-[10px] text-emerald-500 ml-1">Certified</span>
                </div>
              </div>

              <button
                onClick={() => onOpenBrochure('Vedira Fortune')}
                className="w-full py-2 border border-neutral-700 hover:border-amber-400 text-neutral-200 hover:text-white transition-colors text-xs font-medium flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Download Architectural Dossier</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enlarged High-Resolution Room Render Lightbox Modal */}
      {enlargedImageRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
          <div className="relative max-w-4xl w-full bg-neutral-950 border border-neutral-800 rounded-sm overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="p-4 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-serif font-medium text-white">
                  {enlargedImageRoom.name}
                </h3>
                <span className="text-xs font-mono text-amber-400">
                  {enlargedImageRoom.dimensions} · {enlargedImageRoom.sqft} sq.ft ·{' '}
                  {enlargedImageRoom.vastuQuadrant}
                </span>
              </div>
              <button
                onClick={() => setEnlargedImageRoom(null)}
                className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Large High-Res Render Viewport */}
            <div className="aspect-[16/10] w-full bg-neutral-950 relative overflow-hidden">
              <img
                src={
                  roomVisualMode === 'twilight'
                    ? (ROOM_PHOTOGRAPHY[enlargedImageRoom.id] || ROOM_PHOTOGRAPHY['room-living']).twilight
                    : roomVisualMode === 'finishes'
                    ? (ROOM_PHOTOGRAPHY[enlargedImageRoom.id] || ROOM_PHOTOGRAPHY['room-living']).finishes
                    : (ROOM_PHOTOGRAPHY[enlargedImageRoom.id] || ROOM_PHOTOGRAPHY['room-living']).daylight
                }
                alt={enlargedImageRoom.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Modal Footer with Finishes & Actions */}
            <div className="p-4 bg-neutral-900 border-t border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
              <div className="text-neutral-300 max-w-lg">
                <span className="text-amber-400 font-medium block mb-0.5">Finishes & Lighting:</span>
                <p className="font-light">{enlargedImageRoom.finishes} — {enlargedImageRoom.lighting}</p>
              </div>
              <button
                onClick={() => {
                  setEnlargedImageRoom(null);
                  onOpenBooking('Vedira Fortune');
                }}
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold uppercase tracking-wider text-xs rounded-sm transition-colors whitespace-nowrap"
              >
                Book Private Viewing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Generic Image Lightbox (e.g. For Full 3D Cutaway Renders) */}
      {lightboxImageSrc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md cursor-pointer"
          onClick={() => setLightboxImageSrc(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-neutral-950 border border-neutral-800 rounded overflow-hidden shadow-2xl cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
                High-Resolution Architectural Visualizer · {currentPlan.title}
              </span>
              <button
                onClick={() => setLightboxImageSrc(null)}
                className="p-1 text-neutral-400 hover:text-white rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-2 bg-neutral-950 flex items-center justify-center">
              <img
                src={lightboxImageSrc}
                alt="High Resolution Floor Plan"
                className="max-h-[80vh] w-auto object-contain rounded"
              />
            </div>
          </div>
        </div>
      )}
      {/* Side-by-Side 2BHK · 3BHK · 4BHK Snapshot Comparison Modal */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-md overflow-y-auto">
          <div className="relative max-w-6xl w-full bg-neutral-950 border border-neutral-800 rounded-sm shadow-2xl my-auto overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-neutral-900 border-b border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-mono mb-1">
                  <Columns className="w-3.5 h-3.5" />
                  <span>Side-by-Side Architectural Snapshot Comparison</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif text-white font-medium">
                  2BHK vs 3BHK vs 4BHK Snapshot Showcase
                </h3>
              </div>

              {/* Angle Switcher inside Comparison Modal */}
              <div className="flex items-center gap-1.5 bg-neutral-950 p-1 rounded border border-neutral-800 flex-wrap">
                {[
                  { id: 'living', label: 'Living Lounge', icon: '🛋️' },
                  { id: 'cutaway', label: '3D Cutaway', icon: '🏢' },
                  { id: 'master', label: 'Master Suite', icon: '🛏️' },
                  { id: 'kitchen', label: 'Kitchen', icon: '🍳' },
                  { id: 'balcony', label: 'Balcony', icon: '🌅' },
                ].map((ang) => (
                  <button
                    key={ang.id}
                    onClick={() => setCompareAngle(ang.id as any)}
                    className={`px-2.5 py-1 text-xs rounded transition-all cursor-pointer flex items-center gap-1 ${
                      compareAngle === ang.id
                        ? 'bg-amber-400 text-neutral-950 font-semibold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span>{ang.icon}</span>
                    <span>{ang.label}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition-colors"
                aria-label="Close comparison modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 3-Column Comparative Grid */}
            <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-6 max-h-[75vh] overflow-y-auto scrollbar-thin">
              {(['2BHK', '3BHK', '4BHK'] as const).map((bhkKey) => {
                const bhkSnap = BHK_ARCHITECTURAL_SNAPSHOTS[bhkKey];
                const compareImgUrl =
                  compareAngle === 'living'
                    ? bhkSnap.livingLounge
                    : compareAngle === 'master'
                    ? bhkSnap.masterSuite
                    : compareAngle === 'kitchen'
                    ? bhkSnap.kitchenDining
                    : compareAngle === 'balcony'
                    ? bhkSnap.balconyTerrace
                    : bhkSnap.hero3DCutaway;

                return (
                  <div
                    key={bhkKey}
                    className={`bg-neutral-900/90 border rounded-sm overflow-hidden flex flex-col justify-between transition-all ${
                      activeBhk === bhkKey
                        ? 'border-amber-400 shadow-xl'
                        : 'border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <div>
                      {/* Column Header */}
                      <div className="p-3 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block">
                            {bhkSnap.badge}
                          </span>
                          <h4 className="text-base font-serif font-medium text-white">
                            {bhkKey} Residence
                          </h4>
                        </div>
                        <span className="font-mono text-xs text-amber-300 font-semibold">
                          {bhkSnap.superBuiltUp}
                        </span>
                      </div>

                      {/* Snapshot Image Preview */}
                      <div className="aspect-[16/10] relative overflow-hidden bg-black group">
                        <img
                          src={compareImgUrl}
                          alt={`${bhkKey} ${compareAngle}`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

                        {/* Zoom button */}
                        <button
                          onClick={() => setLightboxImageSrc(compareImgUrl)}
                          className="absolute top-2 right-2 p-1.5 bg-neutral-950/80 hover:bg-amber-400 hover:text-neutral-950 text-white rounded transition-colors"
                          title="Enlarge high-resolution image"
                        >
                          <ZoomIn className="w-3.5 h-3.5" />
                        </button>

                        <div className="absolute bottom-2 left-3 right-3 text-white text-[11px] font-mono">
                          <span className="text-amber-400 capitalize">{compareAngle}</span> View ·{' '}
                          {bhkSnap.priceEstimate}
                        </div>
                      </div>

                      {/* Details & Specs */}
                      <div className="p-4 space-y-3 text-xs">
                        <div className="grid grid-cols-2 gap-2 text-[11px] border-b border-neutral-800/80 pb-3">
                          <div>
                            <span className="text-neutral-500 block text-[10px] uppercase">
                              Carpet Area
                            </span>
                            <span className="text-white font-mono font-medium">
                              {bhkSnap.carpetArea}
                            </span>
                          </div>
                          <div>
                            <span className="text-neutral-500 block text-[10px] uppercase">
                              Balcony / Deck
                            </span>
                            <span className="text-white font-mono font-medium">
                              {bhkSnap.balconyArea}
                            </span>
                          </div>
                        </div>

                        <p className="text-neutral-300 font-light leading-relaxed text-[11px] line-clamp-3">
                          {bhkSnap.description}
                        </p>

                        <div className="space-y-1.5 pt-1">
                          <span className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider block">
                            Architectural Specs:
                          </span>
                          {bhkSnap.specs.slice(0, 3).map((sp, idx) => (
                            <div
                              key={idx}
                              className="text-[11px] text-neutral-300 flex items-start gap-1.5 font-light"
                            >
                              <Check className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                              <span>{sp}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Column Actions */}
                    <div className="p-4 pt-0">
                      <button
                        onClick={() => {
                          handleBhkSnapshotSelect(bhkKey);
                          setIsCompareModalOpen(false);
                        }}
                        className={`w-full py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                          activeBhk === bhkKey
                            ? 'bg-amber-400 text-neutral-950 hover:bg-amber-300'
                            : 'border border-neutral-700 text-neutral-300 hover:border-amber-400 hover:text-white'
                        }`}
                      >
                        <span>{activeBhk === bhkKey ? 'Active View' : `Select ${bhkKey}`}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-neutral-900 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-neutral-400 text-[11px]">
                All configurations are certified 100% Vastu compliant and built with premium luxury specifications.
              </span>
              <button
                onClick={() => {
                  setIsCompareModalOpen(false);
                  onOpenBooking('Vedira Fortune');
                }}
                className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold uppercase tracking-wider text-xs rounded-sm transition-colors"
              >
                Book Private Walkthrough
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
