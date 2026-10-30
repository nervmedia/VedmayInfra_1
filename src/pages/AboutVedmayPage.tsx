import React, { useState, useRef } from 'react';
import {
  Award,
  ShieldCheck,
  Clock,
  Users,
  Building,
  CheckCircle2,
  ArrowRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Briefcase
} from 'lucide-react';

interface AboutVedmayPageProps {
  onOpenBooking: () => void;
  onNavigateToOurProjects: () => void;
}

interface WorkspaceItem {
  id: string;
  title: string;
  category: 'Lounge' | 'Office' | 'Engineering' | 'Executive' | 'Standee';
  image: string;
  aspect: 'landscape' | 'portrait';
  description: string;
}

const WORKSPACE_GALLERY: WorkspaceItem[] = [
  {
    id: 'ws-1',
    title: 'Main Client Lounge & Welcome Suite',
    category: 'Lounge',
    image: '/images/vedmay/about/workspace-1.jpg',
    aspect: 'landscape',
    description: 'Welcoming consultation lounge at Shyam Nagar, Nagpur, designed for personalized client meetings and layout walkthroughs.',
  },
  {
    id: 'ws-2',
    title: 'Architectural Blueprint & Sanctions Wing',
    category: 'Engineering',
    image: '/images/vedmay/about/workspace-2.jpg',
    aspect: 'landscape',
    description: 'Dedicated workstations where NMRDA, NMC, and MahaRERA compliance blueprints and structural drawings are reviewed.',
  },
  {
    id: 'ws-3',
    title: 'Executive Boardroom & Project Governance',
    category: 'Executive',
    image: '/images/vedmay/about/workspace-3.jpg',
    aspect: 'landscape',
    description: 'High-level conference suite where land acquisition, financial escrow audits, and civil timelines are finalized.',
  },
  {
    id: 'ws-4',
    title: 'Customer Advisory & Documentation Lounge',
    category: 'Office',
    image: '/images/vedmay/about/workspace-4.jpg',
    aspect: 'landscape',
    description: 'Spacious private advisory suites offering transparent discussion of sale agreements, 7/12 land titles, and banking approvals.',
  },
  {
    id: 'ws-5',
    title: 'Civil Operations & Site Planning Hub',
    category: 'Engineering',
    image: '/images/vedmay/about/workspace-5.jpg',
    aspect: 'landscape',
    description: 'Central operations center coordinating on-site concrete pours, road layout surveys, and pipeline installations across Nagpur.',
  },
  {
    id: 'ws-6',
    title: 'Corporate Identity & Brand Presence',
    category: 'Standee',
    image: '/images/vedmay/about/workspace-6.jpg',
    aspect: 'portrait',
    description: 'Official corporate display highlighting 10–12 years of trust, key milestones, and landmark residential/commercial portfolio.',
  },
  {
    id: 'ws-7',
    title: 'Engineering Benchmarks & Sanction Credentials',
    category: 'Standee',
    image: '/images/vedmay/about/workspace-7.jpg',
    aspect: 'portrait',
    description: 'On-site engineering guidelines showcasing Fe-550D structural standards, RERA approval numbers, and possession guarantees.',
  },
  {
    id: 'ws-8',
    title: 'Customer Satisfaction & Quality Milestones',
    category: 'Standee',
    image: '/images/vedmay/about/workspace-8.jpg',
    aspect: 'portrait',
    description: 'Transparent customer commitment showcase celebrating 1,200+ satisfied families across Wardha Road, Besa, and Somalwada.',
  },
];

export const AboutVedmayPage: React.FC<AboutVedmayPageProps> = ({
  onOpenBooking,
  onNavigateToOurProjects,
}) => {
  // Video Player state
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Lightbox Modal state
  const [activeMedia, setActiveMedia] = useState<{
    image: string;
    title: string;
    subtitle?: string;
    description: string;
    tag?: string;
    index?: number;
    total?: number;
  } | null>(null);

  const [workspaceFilter, setWorkspaceFilter] = useState<'all' | 'landscape' | 'portrait'>('all');

  const filteredWorkspace = WORKSPACE_GALLERY.filter((item) => {
    if (workspaceFilter === 'all') return true;
    return item.aspect === workspaceFilter;
  });

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const openWorkspaceLightbox = (index: number) => {
    const item = filteredWorkspace[index];
    if (!item) return;
    setActiveMedia({
      image: item.image,
      title: item.title,
      subtitle: item.category,
      description: item.description,
      tag: 'Office & Engineering HQ',
      index: index,
      total: filteredWorkspace.length,
    });
  };

  const openDirectorLightbox = (
    image: string,
    name: string,
    designation: string,
    bio: string
  ) => {
    setActiveMedia({
      image,
      title: name,
      subtitle: designation,
      description: bio,
      tag: 'Board of Directors',
    });
  };

  const closeLightbox = () => {
    setActiveMedia(null);
  };

  const nextLightboxImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeMedia && activeMedia.index !== undefined) {
      const nextIdx = (activeMedia.index + 1) % filteredWorkspace.length;
      openWorkspaceLightbox(nextIdx);
    }
  };

  const prevLightboxImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeMedia && activeMedia.index !== undefined) {
      const prevIdx =
        (activeMedia.index - 1 + filteredWorkspace.length) % filteredWorkspace.length;
      openWorkspaceLightbox(prevIdx);
    }
  };

  return (
    <div className="bg-[#070A0F] text-neutral-100 min-h-screen pb-24 selection:bg-amber-400 selection:text-neutral-950">
      {/* 🎬 OFFICIAL BRAND FILM PRESENTED IN FULL-SCREEN CROP */}
      <section className="relative w-full h-screen min-h-[100dvh] bg-black overflow-hidden">
        <video
          ref={videoRef}
          src="/assets/aistudio/vedmay_clean_brand_film.mp4"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover cursor-pointer"
          onClick={toggleMute}
          title="Click to toggle sound"
        />

        {/* Minimal Subtle Sound Toggle in Top Corner (Only Audio Control, No Fullscreen Option, No Image Overlay) */}
        <div className="absolute top-6 right-6 z-20">
          <button
            onClick={toggleMute}
            className="p-3 bg-black/60 hover:bg-black/90 text-white hover:text-[#C5A869] rounded-full backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg"
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-neutral-300" />
            ) : (
              <Volume2 className="w-5 h-5 text-[#C5A869]" />
            )}
          </button>
        </div>
      </section>

      {/* Editorial Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 mb-16">
        <div className="border-b border-neutral-800 pb-8">
          <div className="flex items-center gap-4 mb-4">
            <img
              src="/images/vedmay/logo.png"
              alt="Vedmay Infra Official Logo"
              className="h-16 sm:h-20 w-auto object-contain shrink-0"
            />
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-400 font-medium mb-1">
                <span>ABOUT US</span>
                <span aria-hidden="true">·</span>
                <span>VEDMAY INFRA</span>
                <span aria-hidden="true">·</span>
                <span>NAGPUR SKYLINE DEVELOPER</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-white">
                Welcome to Vedmay Infra
              </h1>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <p className="text-neutral-300 text-sm sm:text-base font-light max-w-3xl leading-relaxed">
                Your trusted partner in real estate and construction for over a decade. With 10–12 years of experience,
                we have been shaping Nagpur’s skyline by delivering exceptional residential and commercial plots and construction projects.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onNavigateToOurProjects}
                className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-amber-400 border border-neutral-700/80 rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>View Projects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onOpenBooking}
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>

        {/* Official Story Copy Exactly from vedmayinfra.com/about/ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mt-12 mb-16">
          <div className="lg:col-span-7 space-y-5 text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
            <p className="text-base sm:text-lg text-white font-serif leading-relaxed border-l-2 border-amber-400 pl-4 py-1 italic">
              "At Vedmay Infra, we believe in building more than just properties – we create foundations for the future.
              Our commitment to quality, transparency, and timely project delivery has earned us the trust of countless clients."
            </p>

            <p>
              Whether you are looking to invest in prime plots or bring your dream construction project to life,
              <strong className="text-white font-medium"> Vedmay Infra </strong> is here to guide you every step of the way.
              Let us help you build your future with confidence and excellence.
            </p>

            <p>
              Over 10 to 12 years of hands-on civil engineering and land development in Nagpur have anchored our reputation.
              Every residential plot, gated township, and luxury residence—from <em>Vedira Fortune</em> in Somalwada to
              <em> Om Shree Estate</em> and <em>Sai Nagri 7, 8 & 9</em> on Wardha Road—is backed by clear NMC/NMRDA approvals,
              100% legal title diligence, and strict structural supervision.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2 text-xs text-amber-400 font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>10–12 Years Experience</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-amber-400 font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% Sanctioned Layouts</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-amber-400 font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Nagpur Skyline Pioneer</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics from Real Operations */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="bg-neutral-900/90 border border-neutral-800 p-6 rounded-sm">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-amber-400 font-mono tabular-nums mb-1">
                10-12
              </div>
              <span className="text-xs uppercase tracking-wider text-neutral-400 block mb-2 font-medium">
                Years Experience
              </span>
              <p className="text-[11px] text-neutral-500 leading-normal">
                Delivering residential and commercial plots and construction in Nagpur.
              </p>
            </div>

            <div className="bg-neutral-900/90 border border-neutral-800 p-6 rounded-sm">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-white font-mono tabular-nums mb-1">
                6+
              </div>
              <span className="text-xs uppercase tracking-wider text-neutral-400 block mb-2 font-medium">
                Key Developments
              </span>
              <p className="text-[11px] text-neutral-500 leading-normal">
                Signature residential flats & prime sanctioned plotted townships.
              </p>
            </div>

            <div className="bg-neutral-900/90 border border-neutral-800 p-6 rounded-sm">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-amber-400 font-mono tabular-nums mb-1">
                1,200+
              </div>
              <span className="text-xs uppercase tracking-wider text-neutral-400 block mb-2 font-medium">
                Countless Clients
              </span>
              <p className="text-[11px] text-neutral-500 leading-normal">
                Trust earned through on-time handover and transparent communication.
              </p>
            </div>

            <div className="bg-neutral-900/90 border border-neutral-800 p-6 rounded-sm">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-emerald-400 font-mono tabular-nums mb-1">
                100%
              </div>
              <span className="text-xs uppercase tracking-wider text-neutral-400 block mb-2 font-medium">
                Transparency
              </span>
              <p className="text-[11px] text-neutral-500 leading-normal">
                Clear documentation with zero surprises throughout the journey.
              </p>
            </div>
          </div>
        </div>

        {/* WHY CHOOSE US (Exact from vedmayinfra.com/about/) */}
        <div className="border-t border-neutral-800 pt-16 mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="text-xs uppercase tracking-[0.25em] text-amber-400 font-medium mb-3">
              WHY CHOOSE US
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight mb-4">
              Pillars of Vedmay Infra Excellence
            </h2>
            <p className="text-neutral-400 text-sm font-light">
              Built on 10–12 years of core values, transparent practices, and punctuality that sets us apart in the Nagpur real estate landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 1. Unmatched Experience & Expertise */}
            <div className="bg-neutral-900/60 border border-neutral-800 p-8 rounded-sm hover:border-amber-400/40 transition-colors flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-6">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif text-white mb-3">
                  Unmatched Experience &amp; Expertise
                </h3>
                <p className="text-neutral-300 text-xs sm:text-sm font-light leading-relaxed">
                  With over 10-12 years of experience, we bring in-depth knowledge of the real estate and construction industries.
                  Our expertise ensures that every project is handled with professionalism, precision, and care.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-neutral-800 text-[11px] font-mono text-amber-400/90 uppercase tracking-wider">
                10–12 Years Industry Knowledge
              </div>
            </div>

            {/* 2. On-Time Project Delivery */}
            <div className="bg-neutral-900/60 border border-neutral-800 p-8 rounded-sm hover:border-amber-400/40 transition-colors flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 mb-6">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif text-white mb-3">
                  On-Time Project Delivery
                </h3>
                <p className="text-neutral-300 text-xs sm:text-sm font-light leading-relaxed">
                  We understand the importance of deadlines. At Vedmay Infra, we focus on timely project completion,
                  so you can plan your future without delays. Our commitment to punctuality is a core part of our business.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-neutral-800 text-[11px] font-mono text-emerald-400/90 uppercase tracking-wider">
                Punctuality &amp; Zero Delays
              </div>
            </div>

            {/* 3. Trust & Transparency */}
            <div className="bg-neutral-900/60 border border-neutral-800 p-8 rounded-sm hover:border-amber-400/40 transition-colors flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-sky-400/10 border border-sky-400/30 flex items-center justify-center text-sky-400 mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif text-white mb-3">
                  Trust &amp; Transparency
                </h3>
                <p className="text-neutral-300 text-xs sm:text-sm font-light leading-relaxed">
                  At Vedmay Infra, we believe in building trust through transparent practices and clear communication.
                  You will always be informed about project timelines, costs, and progress, ensuring no surprises along the way.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-neutral-800 text-[11px] font-mono text-sky-400/90 uppercase tracking-wider">
                Clear Communication &amp; Escrow Integrity
              </div>
            </div>
          </div>
        </div>

        {/* 👥 EXECUTIVE LEADERSHIP / MANAGING DIRECTORS (Exact from vedmayinfra.com/about/) */}
        <div className="border-t border-neutral-800 pt-16 mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-400 font-medium mb-3">
                <Users className="w-3.5 h-3.5" />
                <span>BOARD OF DIRECTORS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif text-white">
                Executive Leadership
              </h2>
            </div>
            <p className="text-neutral-400 text-xs sm:text-sm max-w-md">
              The founding directors guiding Vedmay Infra’s strategic developments, engineering standards, and client relations across Nagpur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 1. Nikesh Vijay Kachore - Chief Managing Director */}
            <div
              onClick={() =>
                openDirectorLightbox(
                  '/images/vedmay/about/nikesh-kachore.jpg',
                  'Nikesh Vijay Kachore',
                  'Chief Managing Director',
                  'Spearheads overall corporate strategy, strategic land acquisition corridors along Wardha Road and Somalwada, and institutional financial partnerships.'
                )
              }
              className="bg-neutral-900/80 border border-neutral-800 rounded-sm overflow-hidden flex flex-col hover:border-amber-400/50 transition-colors cursor-pointer group"
            >
              {/* Uncut Image Container: Uses object-contain with stylish dark backdrop to guarantee NO HEAD OR FONT IS CUT */}
              <div className="h-80 sm:h-96 w-full bg-[#0D1117] flex items-center justify-center p-3 relative">
                <img
                  src="/images/vedmay/about/nikesh-kachore.jpg"
                  alt="Nikesh Vijay Kachore - Chief Managing Director Vedmay Infra"
                  className="max-h-full max-w-full object-contain rounded-xs shadow-md transition-transform duration-300 group-hover:scale-102"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openDirectorLightbox(
                      '/images/vedmay/about/nikesh-kachore.jpg',
                      'Nikesh Vijay Kachore',
                      'Chief Managing Director',
                      'Spearheads overall corporate strategy, strategic land acquisition corridors along Wardha Road and Somalwada, and institutional financial partnerships.'
                    );
                  }}
                  className="absolute bottom-4 right-4 p-2 bg-black/80 hover:bg-amber-400 hover:text-black text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-xs flex items-center gap-1.5 px-3"
                  title="View full photo"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Full View</span>
                </button>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between border-t border-neutral-800">
                <div>
                  <span className="text-[11px] font-mono text-amber-400 uppercase tracking-widest block mb-1">
                    CHIEF MANAGING DIRECTOR
                  </span>
                  <h3 className="text-2xl font-serif text-white font-medium mb-2 group-hover:text-amber-400 transition-colors">
                    Nikesh Vijay Kachore
                  </h3>
                  <p className="text-neutral-400 text-xs font-light leading-relaxed">
                    Spearheads overall corporate strategy, strategic land acquisition corridors along Wardha Road and Somalwada, and institutional financial partnerships.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-neutral-800/60 flex items-center justify-between text-xs text-neutral-400">
                  <span className="font-mono text-[11px]">Vedmay Infra Leadership</span>
                  <span className="text-amber-400">Nagpur HQ</span>
                </div>
              </div>
            </div>

            {/* 2. Pankaj Arun Bokade - Managing Director */}
            <div
              onClick={() =>
                openDirectorLightbox(
                  '/images/vedmay/about/pankaj-bokade.jpg',
                  'Pankaj Arun Bokade',
                  'Managing Director',
                  'Directs civil engineering, site execution, sanctioned layout planning, and contractor management to ensure strict on-time delivery benchmarks.'
                )
              }
              className="bg-neutral-900/80 border border-neutral-800 rounded-sm overflow-hidden flex flex-col hover:border-amber-400/50 transition-colors cursor-pointer group"
            >
              {/* Uncut Image Container */}
              <div className="h-80 sm:h-96 w-full bg-[#0D1117] flex items-center justify-center p-3 relative">
                <img
                  src="/images/vedmay/about/pankaj-bokade.jpg"
                  alt="Pankaj Arun Bokade - Managing Director Vedmay Infra"
                  className="max-h-full max-w-full object-contain rounded-xs shadow-md transition-transform duration-300 group-hover:scale-102"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openDirectorLightbox(
                      '/images/vedmay/about/pankaj-bokade.jpg',
                      'Pankaj Arun Bokade',
                      'Managing Director',
                      'Directs civil engineering, site execution, sanctioned layout planning, and contractor management to ensure strict on-time delivery benchmarks.'
                    );
                  }}
                  className="absolute bottom-4 right-4 p-2 bg-black/80 hover:bg-amber-400 hover:text-black text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-xs flex items-center gap-1.5 px-3"
                  title="View full photo"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Full View</span>
                </button>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between border-t border-neutral-800">
                <div>
                  <span className="text-[11px] font-mono text-amber-400 uppercase tracking-widest block mb-1">
                    MANAGING DIRECTOR
                  </span>
                  <h3 className="text-2xl font-serif text-white font-medium mb-2 group-hover:text-amber-400 transition-colors">
                    Pankaj Arun Bokade
                  </h3>
                  <p className="text-neutral-400 text-xs font-light leading-relaxed">
                    Directs civil engineering, site execution, sanctioned layout planning, and contractor management to ensure strict on-time delivery benchmarks.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-neutral-800/60 flex items-center justify-between text-xs text-neutral-400">
                  <span className="font-mono text-[11px]">Civil Engineering &amp; Operations</span>
                  <span className="text-amber-400">Nagpur HQ</span>
                </div>
              </div>
            </div>

            {/* 3. Mayuri Nikesh Kachore - Managing Director */}
            <div
              onClick={() =>
                openDirectorLightbox(
                  '/images/vedmay/about/mayuri-kachore.jpg',
                  'Mayuri Nikesh Kachore',
                  'Managing Director',
                  'Oversees customer experience, documentation transparency, legal compliance, and community building for all Vedmay developments.'
                )
              }
              className="bg-neutral-900/80 border border-neutral-800 rounded-sm overflow-hidden flex flex-col hover:border-amber-400/50 transition-colors cursor-pointer group"
            >
              {/* Uncut Image Container */}
              <div className="h-80 sm:h-96 w-full bg-[#0D1117] flex items-center justify-center p-3 relative">
                <img
                  src="/images/vedmay/about/mayuri-kachore.jpg"
                  alt="Mayuri Nikesh Kachore - Managing Director Vedmay Infra"
                  className="max-h-full max-w-full object-contain rounded-xs shadow-md transition-transform duration-300 group-hover:scale-102"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openDirectorLightbox(
                      '/images/vedmay/about/mayuri-kachore.jpg',
                      'Mayuri Nikesh Kachore',
                      'Managing Director',
                      'Oversees customer experience, documentation transparency, legal compliance, and community building for all Vedmay developments.'
                    );
                  }}
                  className="absolute bottom-4 right-4 p-2 bg-black/80 hover:bg-amber-400 hover:text-black text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-xs flex items-center gap-1.5 px-3"
                  title="View full photo"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Full View</span>
                </button>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between border-t border-neutral-800">
                <div>
                  <span className="text-[11px] font-mono text-amber-400 uppercase tracking-widest block mb-1">
                    MANAGING DIRECTOR
                  </span>
                  <h3 className="text-2xl font-serif text-white font-medium mb-2 group-hover:text-amber-400 transition-colors">
                    Mayuri Nikesh Kachore
                  </h3>
                  <p className="text-neutral-400 text-xs font-light leading-relaxed">
                    Oversees customer experience, documentation transparency, legal compliance, and community building for all Vedmay developments.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-neutral-800/60 flex items-center justify-between text-xs text-neutral-400">
                  <span className="font-mono text-[11px]">Customer Governance</span>
                  <span className="text-amber-400">Nagpur HQ</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 🏢 OUR WORKSPACE SECTION (ALL 8 IMAGES FROM VEDMAYINFRA.COM/ABOUT/ WITH PROPER UNCUT FRAMING) */}
        <div className="border-t border-neutral-800 pt-16 mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-400 font-medium mb-3">
                <Briefcase className="w-3.5 h-3.5" />
                <span>OFFICIAL PREMISES</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif text-white mb-2">
                Our Workspace
              </h2>
              <p className="text-neutral-400 text-xs sm:text-sm max-w-2xl">
                A glimpse inside our corporate headquarters, client consultation lounge, and engineering planning hubs at Shyam Nagar, Nagpur.
                Click any image to view in 100% full uncropped resolution.
              </p>
            </div>

            {/* Filter buttons for workspace with Authentic Website Palette */}
            <div className="flex items-center gap-1.5 bg-[#E8E6E1] p-1.5 border border-[#D4D1C8] rounded-sm">
              <button
                onClick={() => setWorkspaceFilter('all')}
                className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-xs transition-all cursor-pointer ${
                  workspaceFilter === 'all'
                    ? 'bg-[#14171F] text-[#FAF9F6] shadow-sm'
                    : 'text-[#2D313A] hover:text-[#14171F] hover:bg-[#DDD8CF]'
                }`}
              >
                All (8)
              </button>
              <button
                onClick={() => setWorkspaceFilter('landscape')}
                className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-xs transition-all cursor-pointer ${
                  workspaceFilter === 'landscape'
                    ? 'bg-[#14171F] text-[#FAF9F6] shadow-sm'
                    : 'text-[#2D313A] hover:text-[#14171F] hover:bg-[#DDD8CF]'
                }`}
              >
                Lounges &amp; Offices (5)
              </button>
              <button
                onClick={() => setWorkspaceFilter('portrait')}
                className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-xs transition-all cursor-pointer ${
                  workspaceFilter === 'portrait'
                    ? 'bg-[#14171F] text-[#FAF9F6] shadow-sm'
                    : 'text-[#2D313A] hover:text-[#14171F] hover:bg-[#DDD8CF]'
                }`}
              >
                Standees &amp; Displays (3)
              </button>
            </div>
          </div>

          {/* Workspace Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkspace.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => openWorkspaceLightbox(idx)}
                className="bg-neutral-900/80 border border-neutral-800 rounded-sm overflow-hidden flex flex-col hover:border-amber-400/60 transition-all cursor-pointer group shadow-lg"
              >
                {/* 
                  PROPER UNCUT IMAGE CONTAINER:
                  Both landscape (1600x722) and portrait standee (1155x2560) photos use object-contain
                  inside a dark studio frame so 0% of the image or text is ever cut!
                */}
                <div
                  className={`relative overflow-hidden bg-[#0C0F16] flex items-center justify-center p-3 ${
                    item.aspect === 'portrait' ? 'h-96 w-full' : 'h-64 sm:h-72 w-full'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-h-full max-w-full w-auto h-auto object-contain rounded-xs shadow-md transition-transform duration-500 group-hover:scale-[1.02]"
                  />

                  {/* Hover Tag & Expand Icon */}
                  <div className="absolute top-3 right-3 px-2 py-1 bg-black/70 backdrop-blur-xs text-[10px] font-mono uppercase tracking-wider text-amber-400 rounded-xs border border-white/10">
                    {item.category}
                  </div>

                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3.5 py-1.5 bg-neutral-950/90 text-white border border-amber-400/60 rounded-xs text-xs font-mono flex items-center gap-2">
                      <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>View Full Image</span>
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-serif text-white font-medium mb-1.5 group-hover:text-amber-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-400 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-neutral-800/60 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                    <span>VEDMAY HQ</span>
                    <span className="text-amber-400/80 group-hover:text-amber-400">Expand ↗</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 📍 REGISTERED OFFICE & DIRECT CONTACT (Exact from vedmayinfra.com/about/) */}
        <div className="border-t border-neutral-800 pt-16">
          <div className="bg-neutral-900/90 border border-neutral-800 rounded-sm p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="text-xs uppercase tracking-[0.25em] text-amber-400 font-medium">
                  HEAD OFFICE &amp; ADVISORY DESK
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif text-white">
                  Visit Our Nagpur Headquarters
                </h2>
                <p className="text-neutral-300 text-sm font-light leading-relaxed">
                  Experience personal consultations with our senior management. We walk you through sanctioned maps,
                  7/12 land titles, MahaRERA registrations, and custom payment schedules.
                </p>

                <div className="pt-2 space-y-2 text-xs sm:text-sm text-neutral-300 font-light">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      Plot No. 14, Jaihind Society, Beside 'Amrut Lawn', Shyam Nagar, Nagpur 440036
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                    <a
                      href="mailto:Vedmaypropertynagpur@gmail.com"
                      className="hover:text-amber-400 transition-colors"
                    >
                      Vedmaypropertynagpur@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>+91 712 289 4500 &nbsp;|&nbsp; +91 98230 45678</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                <button
                  onClick={onOpenBooking}
                  className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold text-xs uppercase tracking-[0.16em] rounded-sm transition-colors cursor-pointer text-center shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                >
                  Schedule Private Meeting
                </button>
                <button
                  onClick={onNavigateToOurProjects}
                  className="px-6 py-3.5 bg-neutral-950 hover:bg-neutral-800 text-white border border-neutral-700 font-semibold text-xs uppercase tracking-[0.16em] rounded-sm transition-colors cursor-pointer text-center"
                >
                  Browse Available Plots &amp; Flats
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔍 LIGHTBOX MODAL FOR UNCROPPED HIGH-RESOLUTION IMAGE INSPECTION */}
      {activeMedia !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 select-none"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2.5 text-neutral-400 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 rounded-full transition-colors z-50 cursor-pointer"
            title="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev button (only when part of workspace list) */}
          {activeMedia.index !== undefined && (
            <button
              onClick={prevLightboxImage}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 text-white bg-black/70 hover:bg-amber-400 hover:text-black rounded-full transition-colors z-50 cursor-pointer"
              title="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Next button (only when part of workspace list) */}
          {activeMedia.index !== undefined && (
            <button
              onClick={nextLightboxImage}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 text-white bg-black/70 hover:bg-amber-400 hover:text-black rounded-full transition-colors z-50 cursor-pointer"
              title="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Image Container with 100% full view - ZERO cut-off */}
          <div
            className="max-w-5xl max-h-[88vh] flex flex-col items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeMedia.image}
              alt={activeMedia.title}
              className="max-h-[72vh] max-w-full object-contain rounded-xs shadow-2xl border border-neutral-800"
            />
            <div className="mt-4 text-center max-w-xl">
              {activeMedia.subtitle && (
                <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 block mb-1">
                  {activeMedia.subtitle}
                </span>
              )}
              <h4 className="text-lg font-serif text-white">
                {activeMedia.title}
              </h4>
              <p className="text-xs text-neutral-400 mt-1 font-light leading-relaxed">
                {activeMedia.description}
              </p>
              {activeMedia.index !== undefined && activeMedia.total !== undefined && (
                <span className="text-[10px] font-mono text-neutral-500 mt-2 inline-block">
                  Workspace Photo {activeMedia.index + 1} of {activeMedia.total} • Authentic High-Resolution Photography
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
