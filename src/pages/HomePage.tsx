import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Maximize2,
  CheckCircle2,
  Building2,
  Compass,
  Award,
  Clock,
  FileText,
  Sparkles,
} from 'lucide-react';
import { Property, PROPERTIES } from '../data/properties';
import { OurProjectsStatusFilter } from '../components/Navbar';

interface HomePageProps {
  onSearch: (filters: {
    searchQuery: string;
    selectedLocation: string;
    selectedType: string;
    selectedPriceRange: string;
    selectedStatus: string;
    activeTab: string;
  }) => void;
  onOpenBooking: (projectName?: string) => void;
  onOpenBrochure: (projectName: string) => void;
  onExploreFortune: () => void;
  onSelectPropertyForFloorPlan: (propId: string) => void;
  onOpenGallery: (prop: Property) => void;
  displayProperties: Property[];
  ourProjectsFilter: OurProjectsStatusFilter;
  onOurProjectsFilterChange: (filter: OurProjectsStatusFilter) => void;
  onNavigateToAllProjects: () => void;
  onNavigateToOurProjects: () => void;
  onNavigateToAbout: () => void;
  onNavigateToContacts: () => void;
}

const VEDMAY_PHILOSOPHY_TEXT =
  'At Vedmay Infra, we believe in building more than just properties — we create foundations for the future through quality, transparency, and timely project delivery across Nagpur.';

export const HomePage: React.FC<HomePageProps> = ({
  onOpenBooking,
  onOpenBrochure,
  onOpenGallery,
  onNavigateToAllProjects,
  onNavigateToOurProjects,
  onNavigateToAbout,
  onNavigateToContacts,
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const heroInRef = useRef<HTMLDivElement | null>(null);
  const shadeRef = useRef<HTMLDivElement | null>(null);
  const flipRef = useRef<HTMLElement | null>(null);
  const hSectionRef = useRef<HTMLElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLElement | null>(null);
  const lifeRef = useRef<HTMLElement | null>(null);
  const colRef = useRef<HTMLElement | null>(null);
  const cvRef = useRef<HTMLElement | null>(null);
  const card2Ref = useRef<HTMLDivElement | null>(null);

  // Interactive preview image state for the 3 pinned flagship slides (Poster / Plan / Location)
  const [slideMediaIndex, setSlideMediaIndex] = useState<Record<string, number>>({});

  // Top 3 Flagship Launches for the Pinned Flip Section
  const flipLaunches = [
    {
      property: PROPERTIES.find((p) => p.id === 'vedira-fortune') || PROPERTIES[0],
      indexLabel: '01 / 03',
      eyebrow: 'FLAGSHIP 3 BHK RESIDENCES · SOMALWADA / MANISH NAGAR',
      headline: 'Vedira Fortune',
      description:
        'An exclusive vertical sanctuary in Somalwada / Manish Nagar offering 100% Vastu-compliant 3 BHK residences with grand sit-out balconies, covered EV parking, and MahaRERA compliance.',
      metrics: [
        { label: 'CONFIGURATION', value: '3 BHK Luxury Flats' },
        { label: 'SUPER BUILT-UP', value: '1,450 Sq.Ft.' },
        { label: 'STARTING AT', value: '₹78 Lakhs*' },
        { label: 'MAHARERA REG.', value: 'P50500077649' },
      ],
      bgGradient:
        'radial-gradient(circle at 78% 30%, rgba(200, 165, 102, 0.22), transparent 48%), linear-gradient(135deg, #071324 0%, #0D1F38 55%, #1A1612 100%)',
    },
    {
      property: PROPERTIES.find((p) => p.id === 'om-shree-estate') || PROPERTIES[1],
      indexLabel: '02 / 03',
      eyebrow: 'NMRDA SANCTIONED MEGA TOWNSHIP · MAIN UMRED ROAD',
      headline: 'Om Shree Estate',
      description:
        'Fully developed NMRDA & RL sanctioned residential and commercial plotted township at Bahadura on Main Umred Road, complete with cement concrete roads, grand entrance gate, and landscaped parks.',
      metrics: [
        { label: 'PLOT TYPES', value: 'Residential & Commercial' },
        { label: 'PLOT SIZES', value: '1,000 – 4,000 Sq.Ft.' },
        { label: 'STARTING AT', value: '₹22.5 Lakhs*' },
        { label: 'SANCTION', value: 'NMRDA & RL Approved' },
      ],
      bgGradient:
        'radial-gradient(circle at 22% 70%, rgba(200, 165, 102, 0.2), transparent 45%), linear-gradient(135deg, #06181E 0%, #0D2933 58%, #1D1912 100%)',
    },
    {
      property: PROPERTIES.find((p) => p.id === 'sai-nagri-9') || PROPERTIES[2],
      indexLabel: '03 / 03',
      eyebrow: 'WARDHA ROAD GROWTH CORRIDOR · BOREKHEDI',
      headline: 'Sai Nagri 9',
      description:
        'Strategically located near Samruddhi Mahamarg Circle, MIHAN SEZ, and AIIMS Nagpur. Clear 7/12 title plots with immediate registration and 80–90% bank loan facility from leading nationalized banks.',
      metrics: [
        { label: 'LOCATION', value: 'Borekhedi, Wardha Rd' },
        { label: 'PLOT SIZES', value: '1,000 – 2,500 Sq.Ft.' },
        { label: 'STARTING AT', value: '₹21 Lakhs*' },
        { label: 'BANK FINANCE', value: 'Up to 80–90% Loan' },
      ],
      bgGradient:
        'radial-gradient(circle at 75% 25%, rgba(168, 185, 225, 0.18), transparent 45%), linear-gradient(135deg, #060913 0%, #101B33 60%, #1E2436 100%)',
    },
  ];

  // 5 Parallax Community Cards with distinct scroll speeds
  const collageTiles = [
    {
      speed: 0.12,
      tag: 'FLAGSHIP 3 BHK APARTMENTS',
      label: 'Vedira Fortune',
      location: 'Manish Nagar / Somalwada, Nagpur',
      price: '₹78 Lakhs*',
      image: '/images/vedmay/vedira-fortune-main.png',
      property: PROPERTIES.find((p) => p.id === 'vedira-fortune') || PROPERTIES[0],
      colSpan: 'lg:col-span-7',
      heightClass: 'h-[380px] sm:h-[440px]',
    },
    {
      speed: 0.24,
      tag: 'NMRDA SANCTIONED TOWNSHIP',
      label: 'Om Shree Estate',
      location: 'Main Umred Road, Bahadura, Nagpur',
      price: '₹22.5 Lakhs*',
      image: '/images/vedmay/om-shree-estate-main.jpg',
      property: PROPERTIES.find((p) => p.id === 'om-shree-estate') || PROPERTIES[1],
      colSpan: 'lg:col-span-5',
      heightClass: 'h-[380px] sm:h-[440px]',
    },
    {
      speed: -0.08,
      tag: '#1 COMPLETED LANDMARK',
      label: 'Vedira Heights',
      location: 'Prime Residential Enclave, Nagpur',
      price: '100% Sold & Handed Over',
      image: '/images/vedmay/vedira-heights-1.jpg',
      property: PROPERTIES.find((p) => p.id === 'vedira-heights') || PROPERTIES[0],
      colSpan: 'lg:col-span-4',
      heightClass: 'h-[340px] sm:h-[380px]',
    },
    {
      speed: 0.16,
      tag: '#2 COMPLETED LANDMARK',
      label: 'Ramalay Bliss',
      location: 'Serene Residential Address, Nagpur',
      price: '100% Sold & Handed Over',
      image: '/images/vedmay/vedira-heights-2.jpg',
      property: PROPERTIES.find((p) => p.id === 'vedira-heights') || PROPERTIES[0],
      colSpan: 'lg:col-span-4',
      heightClass: 'h-[340px] sm:h-[380px]',
    },
    {
      speed: 0.28,
      tag: 'WARDHA ROAD PLOTTED SERIES',
      label: 'Sai Nagri 7, 8 & 9',
      location: 'Panchgaon, Dongergaon & Borekhedi',
      price: 'Starting ₹18.5 Lakhs*',
      image: '/images/vedmay/sai-nagri-8-main.png',
      property: PROPERTIES.find((p) => p.id === 'sai-nagri-8') || PROPERTIES[2],
      colSpan: 'lg:col-span-4',
      heightClass: 'h-[340px] sm:h-[380px]',
    },
  ];

  const philosophyWords = VEDMAY_PHILOSOPHY_TEXT.split(' ');

  // Silky-smooth 60fps Scroll Engine with full lerp damping across all sections
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const clamp = (n: number, a: number, b: number) => Math.min(b, Math.max(a, n));
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const LERP = rm ? 1 : 0.16;

    const hero = heroRef.current;
    const heroIn = heroInRef.current;
    const shade = shadeRef.current;
    const flip = flipRef.current;
    const hs = hSectionRef.current;
    const rail = railRef.current;
    const bar = barRef.current;
    const life = lifeRef.current;
    const col = colRef.current;
    const cv = cvRef.current;
    const card2 = card2Ref.current;

    const sls = flip ? Array.from(flip.querySelectorAll<HTMLElement>('.vm-sl')) : [];
    const arts = sls.map((s) => s.querySelector<HTMLElement>('.vm-art'));
    const caps = sls.map((s) => s.querySelector<HTMLElement>('.vm-cap'));
    const dots = flip ? Array.from(flip.querySelectorAll<HTMLElement>('.vm-dots button')) : [];
    const words = life ? Array.from(life.querySelectorAll<HTMLElement>('.vm-life-word')) : [];
    const tiles = col ? Array.from(col.querySelectorAll<HTMLElement>('.vm-parallax-card')) : [];

    const prog = (el: HTMLElement | null) => {
      if (!el) return 0;
      const r = el.getBoundingClientRect();
      const stickyH = Math.max(1, window.innerHeight - 80);
      return clamp(-(r.top - 80) / Math.max(1, r.height - stickyH), 0, 1);
    };

    // Lerped state variables for 60fps butter-smooth motion
    let sWipe = 0;
    let sZoom = 0;
    let sRail = 0;
    let sLife = 0;
    let sCol = 0;
    let sCv = 0;
    let raf = 0;

    function frame() {
      const vh = window.innerHeight;
      const y = window.scrollY;

      // Targets
      const tWipe = clamp(y / Math.max(1, vh - 80), 0, 1);
      const tZoom = rm ? 0.5 : prog(flip);
      const tRail = prog(hs);
      const tLife = prog(life);
      const colRect = col ? col.getBoundingClientRect() : null;
      const tCol = colRect ? clamp((colRect.top + colRect.height / 2 - vh / 2) * 0.35, -160, 160) : 0;
      const tCv = clamp(prog(cv) * 2.1, 0, 1);

      // Smooth Lerp step
      sWipe += (tWipe - sWipe) * LERP;
      sZoom += (tZoom - sZoom) * LERP;
      sRail += (tRail - sRail) * LERP;
      sLife += (tLife - sLife) * LERP;
      sCol += (tCol - sCol) * LERP;
      sCv += (tCv - sCv) * LERP;

      if (Math.abs(tWipe - sWipe) < 0.0005) sWipe = tWipe;
      if (Math.abs(tZoom - sZoom) < 0.0005) sZoom = tZoom;
      if (Math.abs(tRail - sRail) < 0.0005) sRail = tRail;
      if (Math.abs(tLife - sLife) < 0.0005) sLife = tLife;
      if (Math.abs(tCol - sCol) < 0.05) sCol = tCol;
      if (Math.abs(tCv - sCv) < 0.0005) sCv = tCv;

      // 1. Hero shutter wipe + scale (and hide completely once covered by section 2)
      if (hero) {
        hero.style.visibility = y >= Math.max(1, vh - 80) ? 'hidden' : 'visible';
      }
      if (heroIn) {
        heroIn.style.transform = `translate3d(0, ${-sWipe * 4}vh, 0) scale(${1 - 0.04 * sWipe})`;
        heroIn.style.opacity = String(1 - 0.22 * sWipe);
      }
      if (shade) {
        shade.style.opacity = String(sWipe * 0.25);
      }

      // 2. Pinned flip (350vh): smooth lerped crossfade + background scale + text rise
      if (sls.length > 0) {
        const pos = sZoom * sls.length;
        const last = sls.length - 1;
        sls.forEach((s, i) => {
          let d = Math.abs(pos - i - 0.5);
          if (i === 0 && pos < 0.5) d = 0;
          if (i === last && pos > last + 0.5) d = 0;
          const op = clamp(1.65 - d * 3.2, 0, 1);
          s.style.opacity = String(op);
          s.style.pointerEvents = op > 0.5 ? 'auto' : 'none';
          s.style.zIndex = op > 0.5 ? '10' : '1';

          const l = clamp(pos - i, 0, 1);
          const art = arts[i];
          if (art) {
            const scaleVal = 1.02 + 0.16 * (i === 0 ? clamp(pos, 0, 1) : l);
            art.style.transform = `scale(${scaleVal}) translate3d(0, ${-l * 1.5}%, 0)`;
          }
          const cap = caps[i];
          if (cap) {
            const tVal = clamp((1 - d) * 2.4 - 0.4, 0, 1);
            cap.style.transform = `translate3d(0, ${(1 - tVal) * 28}px, 0)`;
            cap.style.opacity = String(tVal);
          }
        });

        const activeDotIndex = Math.min(last, Math.max(0, Math.floor(pos)));
        dots.forEach((d, i) => {
          d.classList.toggle('on', activeDotIndex === i);
        });
      }

      // 3. Horizontal rail (300vh)
      if (hs && rail && bar) {
        const max = Math.max(0, rail.scrollWidth - window.innerWidth + window.innerWidth * 0.08);
        rail.style.transform = `translate3d(${-sRail * max}px, 0, 0)`;
        bar.style.transform = `scaleX(${sRail})`;
      }

      // 4. Word-by-word philosophy reveal (240vh)
      if (life && words.length > 0) {
        const N = words.length;
        words.forEach((w, i) => {
          const wordOp = 0.14 + 0.86 * clamp((sLife * 1.28 * N - i) / 2.8, 0, 1);
          w.style.opacity = String(wordOp);
        });
      }

      // 5. Multi-speed parallax cards (desktop)
      if (col && tiles.length > 0) {
        if (window.innerWidth >= 1024 && !rm) {
          tiles.forEach((t) => {
            const speed = parseFloat(t.dataset.s || '0.1');
            t.style.transform = `translate3d(0, ${-sCol * speed}px, 0)`;
          });
        } else {
          tiles.forEach((t) => {
            t.style.transform = 'none';
          });
        }
      }

      // 6. Converse clip-path expansion (220vh)
      if (cv && card2) {
        const insetV = (1 - sCv) * 14;
        const insetH = (1 - sCv) * 10;
        const radius = (1 - sCv) * 36;
        card2.style.clipPath = `inset(${insetV}% ${insetH}% round ${radius}px)`;
      }

      const stillMoving =
        sWipe !== tWipe ||
        sZoom !== tZoom ||
        sRail !== tRail ||
        sLife !== tLife ||
        sCol !== tCol ||
        sCv !== tCv;

      raf = stillMoving ? requestAnimationFrame(frame) : 0;
    }

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', kick);
    frame();

    // IntersectionObserver for .vm-rv reveals + animated counters b[data-n]
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          const target = e.target as HTMLElement;
          const parent = target.parentElement;
          if (parent) {
            const idx = Array.from(parent.children).indexOf(target);
            target.style.transitionDelay = `${idx * 0.1}s`;
          }
          target.classList.add('in');

          const b = target.querySelector<HTMLElement>('b[data-n]');
          if (b) {
            const n = Number(b.dataset.n || '0');
            const suffix = b.dataset.suffix || '';
            const t0 = performance.now();
            const step = (t: number) => {
              const k = clamp((t - t0) / 1600, 0, 1);
              const val = Math.round(n * (1 - Math.pow(1 - k, 3)));
              b.textContent = val.toLocaleString() + suffix;
              if (k < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.2 }
    );

    const rvNodes = Array.from(root.querySelectorAll<HTMLElement>('.vm-rv'));
    rvNodes.forEach((node) => io.observe(node));

    return () => {
      window.removeEventListener('scroll', kick);
      window.removeEventListener('resize', kick);
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Helper to jump to a specific slide in the flip section
  const scrollToFlipSlide = (slideIdx: number) => {
    const flip = flipRef.current;
    if (!flip) return;
    const rect = flip.getBoundingClientRect();
    const flipTop = window.scrollY + rect.top - 80;
    const scrollable = Math.max(1, flip.offsetHeight - (window.innerHeight - 80));
    const targetProgress = (slideIdx + 0.5) / flipLaunches.length;
    window.scrollTo({
      top: flipTop + scrollable * targetProgress,
      behavior: 'smooth',
    });
  };

  return (
    <div ref={rootRef} className="vm-home-root selection:bg-[#C5A869] selection:text-[#071C35]">
      <style>{`
        .vm-home-root {
          --paper: #F8F7F4;
          --soft: #EFECE6;
          --ink: #071C35;
          --night: #060B14;
          --gold: #C5A869;
          --gold-dark: #8D7039;
          --lt: #F8F7F4;
          --serif: "Cormorant Garamond", Georgia, serif;
          --sans: "Plus Jakarta Sans", Inter, system-ui, sans-serif;
          background: var(--night);
          color: var(--ink);
          font-family: var(--sans);
          position: relative;
          z-index: 1;
        }

        /* Sticky Pin Offset accounting for the 80px (h-20) Navbar */
        .vm-pin {
          position: sticky;
          top: 80px;
          height: calc(100vh - 80px);
          height: calc(100svh - 80px);
          width: 100%;
          overflow: hidden;
        }

        /* 1. STICKY HERO WITH SHUTTER WIPE */
        .vm-hero {
          position: sticky;
          top: 80px;
          height: calc(100vh - 80px);
          height: calc(100svh - 80px);
          overflow: hidden;
          color: var(--lt);
          background: radial-gradient(circle at 50% 35%, #132542 0%, #071120 65%, #040811 100%);
          z-index: 1;
        }
        .vm-hero-in {
          position: absolute;
          inset: 0;
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 0 5vw;
          transform-origin: 50% 55%;
          will-change: transform, opacity;
        }
        .vm-logo {
          font-family: var(--serif);
          font-weight: 500;
          font-size: clamp(44px, 9vw, 124px);
          line-height: 0.95;
          letter-spacing: 0.24em;
          padding-left: 0.24em;
          display: flex;
          color: #FFFFFF;
          text-shadow: 0 16px 48px rgba(0, 0, 0, 0.75);
        }
        .vm-logo span {
          display: inline-block;
          animation: vmUp 0.65s cubic-bezier(0.22, 1, 0.36, 1) both;
          animation-delay: calc(0.04s + var(--i, 0) * 0.05s);
        }
        .vm-rule {
          width: 160px;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
          margin: 18px 0;
          animation: vmRule 0.7s 0.25s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .vm-sub {
          font-size: clamp(11px, 1.15vw, 13px);
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #E5E0D5;
          max-width: 780px;
          animation: vmUp 0.65s 0.35s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .vm-hero-actions {
          margin-top: 28px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 14px;
          animation: vmUp 0.65s 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .vm-cue {
          position: absolute;
          left: 50%;
          bottom: 20px;
          width: 1px;
          height: 42px;
          z-index: 3;
          background: linear-gradient(var(--gold), transparent);
          animation: vmCue 2s infinite;
        }
        .vm-shade {
          position: absolute;
          inset: 0;
          z-index: 4;
          background: #030710;
          opacity: 0;
          pointer-events: none;
          will-change: opacity;
        }

        @keyframes vmUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes vmRule {
          from { width: 0; }
          to { width: 160px; }
        }
        @keyframes vmCue {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }

        /* 2. PINNED FLIP LAUNCHES (350vh) */
        .vm-flip {
          height: 350vh;
          z-index: 2;
          background: var(--night);
          color: var(--lt);
          position: relative;
        }
        .vm-sl {
          position: absolute;
          inset: 0;
          opacity: 0;
          display: flex;
          align-items: center;
          will-change: opacity;
        }
        .vm-art {
          position: absolute;
          inset: -6%;
          transform: scale(1.02);
          will-change: transform;
          pointer-events: none;
        }
        .vm-cap {
          will-change: transform, opacity;
        }
        .vm-dots {
          position: absolute;
          right: 24px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 30;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .vm-dots button {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: rgba(248, 247, 244, 0.3);
          border: 1px solid rgba(197, 168, 105, 0.4);
          transition: all 0.35s ease;
          cursor: pointer;
          padding: 0;
        }
        .vm-dots button.on {
          height: 32px;
          background: var(--gold);
          border-color: var(--gold);
        }

        /* 3. PINNED HORIZONTAL PORTFOLIO RAIL (300vh) */
        .vm-h {
          height: 300vh;
          z-index: 2;
          background: var(--paper);
          color: var(--ink);
          position: relative;
          border-top: 1px solid #E2DDD3;
          border-bottom: 1px solid #E2DDD3;
        }
        .vm-h .vm-pin {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .vm-rail {
          display: flex;
          gap: 24px;
          padding: 0 5vw;
          will-change: transform;
        }
        .vm-bar {
          height: 2px;
          background: rgba(7, 28, 53, 0.12);
          margin: 28px 5vw 0;
          overflow: hidden;
        }
        .vm-bar i {
          display: block;
          height: 100%;
          width: 100%;
          background: var(--gold-dark);
          transform-origin: left;
          transform: scaleX(0);
          will-change: transform;
        }

        /* 4. LIFE PHILOSOPHY WORD-BY-WORD REVEAL (175vh) */
        .vm-life {
          height: 175vh;
          z-index: 2;
          background: radial-gradient(circle at 50% 0%, #162642 0%, #060B14 72%);
          color: var(--lt);
          position: relative;
        }
        .vm-life .vm-pin {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 0 8vw;
        }
        .vm-life p {
          font: 500 clamp(28px, 4.8vw, 68px)/1.16 var(--serif);
          max-width: 19em;
          text-align: center;
          color: #F8F7F4;
        }
        .vm-life-word {
          opacity: 0.14;
          will-change: opacity;
        }

        /* 5. INTERSECTION OBSERVER REVEALS */
        .vm-rv {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.85s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .vm-rv.in {
          opacity: 1;
          transform: none;
        }

        /* 6. CONVERSE CLIP-PATH REVEAL (175vh) */
        .vm-cv {
          height: 175vh;
          z-index: 3;
          background: var(--paper);
          color: var(--lt);
          position: relative;
        }
        .vm-cv .vm-pin {
          display: grid;
          place-items: center;
        }
        .vm-card2 {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          text-align: center;
          background: radial-gradient(circle at 50% 25%, #132A4A 0%, #06101E 75%);
          padding: 0 5vw;
          clip-path: inset(14% 10% round 36px);
          overflow: hidden;
          will-change: clip-path;
        }

        @media (prefers-reduced-motion: reduce) {
          .vm-logo span, .vm-sub, .vm-hero-actions, .vm-rule {
            animation: none;
            opacity: 1;
          }
          .vm-rule { width: 160px; }
          .vm-rv { opacity: 1; transform: none; }
        }
      `}</style>

      {/* =====================================================================
          1. STICKY HERO WITH SHUTTER WIPE & OFFICIAL VEDMAY BRAND VIDEO
          ===================================================================== */}
      <section className="vm-hero" id="top" aria-label="Vedmay Infra Nagpur" ref={heroRef}>
        {/* Background Official Clean Brand Video */}
        <video
          src="/assets/aistudio/vedmay-about-clean.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
        />

        {/* Subtle Architectural Vignette Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(4,9,18,0.55) 0%, rgba(4,9,18,0.35) 50%, rgba(4,9,18,0.88) 100%)',
          }}
        />

        <div className="vm-hero-in" ref={heroInRef}>
          {/* Top Authority Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-[#C5A869]/40 backdrop-blur-md text-[11px] font-mono uppercase tracking-[0.22em] text-[#E5D3A7] mb-5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C5A869]" />
            <span>MahaRERA Reg: P50500077649 · NMRDA Sanctioned Developer</span>
          </div>

          {/* Official 3D Gold Emblem */}
          <img
            src="/images/vedmay/logo.png"
            alt="Vedmay Infra Official Logo"
            className="h-20 sm:h-24 w-auto object-contain mb-3 drop-shadow-[0_12px_28px_rgba(0,0,0,0.7)]"
          />

          {/* Staggered Character Reveal */}
          <h1 className="vm-logo" aria-label="VEDMAY">
            {['V', 'E', 'D', 'M', 'A', 'Y'].map((ch, idx) => (
              <span key={idx} style={{ ['--i' as string]: idx }}>
                {ch}
              </span>
            ))}
          </h1>

          <div className="vm-rule" />

          <p className="vm-sub">
            NMRDA Sanctioned Plots · 3 BHK Luxury Residences · 10–12 Years Shaping Nagpur’s Skyline
          </p>

          {/* Primary Hero CTA Buttons */}
          <div className="vm-hero-actions">
            <button
              type="button"
              onClick={() => scrollToSection('launching')}
              className="px-7 py-3.5 rounded-full bg-[#C5A869] hover:bg-white text-[#071C35] font-semibold text-xs uppercase tracking-[0.2em] transition-all flex items-center gap-2.5 cursor-pointer shadow-xl"
            >
              <span>Explore Flagship Launches</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onOpenBooking('Vedira Fortune')}
              className="px-7 py-3.5 rounded-full border border-white/45 hover:border-[#C5A869] bg-black/40 hover:bg-black/70 text-white text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur-md transition-all cursor-pointer"
            >
              <span>Book Free Site Visit</span>
            </button>
            <button
              type="button"
              onClick={onNavigateToAllProjects}
              className="px-6 py-3.5 rounded-full border border-[#C5A869]/40 bg-[#071C35]/70 hover:bg-[#C5A869] text-[#E5D3A7] hover:text-[#071C35] text-xs font-mono uppercase tracking-[0.18em] transition-all cursor-pointer"
            >
              <span>All {PROPERTIES.length} Projects</span>
            </button>
          </div>
        </div>

        <div className="vm-shade" ref={shadeRef} />
        <div className="vm-cue" title="Scroll to explore" />
      </section>

      {/* =====================================================================
          2. PINNED 350VH FLIP SHOWCASE (ZERO OVERLAP 12-COLUMN SPLIT)
          ===================================================================== */}
      <section className="vm-flip" id="launching" aria-label="Flagship Launches" ref={flipRef}>
        <div className="vm-pin">
          {flipLaunches.map((item, idx) => {
            const prop = item.property;
            const activeTabIdx = slideMediaIndex[prop.id] || 0;
            const activeMediaUrl = prop.gallery[activeTabIdx]?.image || prop.image;

            return (
              <div
                key={prop.id}
                className="vm-sl"
                style={{ opacity: idx === 0 ? 1 : 0 }}
              >
                {/* Animated Scale Background Layer */}
                <div className="vm-art" style={{ background: item.bgGradient }}>
                  <img
                    src={activeMediaUrl}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-cover blur-3xl opacity-20 scale-110"
                  />
                </div>

                {/* Clean 12-Column Architectural Split */}
                <div className="vm-cap relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 py-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Left 6 Columns: Editorial Details & Metrics */}
                    <div className="lg:col-span-6 space-y-5">
                      <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.24em] text-[#C5A869]">
                        <span className="px-2.5 py-1 bg-[#C5A869]/15 border border-[#C5A869]/40 text-[#E5D3A7] font-semibold">
                          {item.indexLabel}
                        </span>
                        <span>{item.eyebrow}</span>
                      </div>

                      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal text-white tracking-tight leading-[1.05]">
                        {item.headline}
                      </h2>

                      <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-xl">
                        {item.description}
                      </p>

                      {/* 2x2 Architectural Spec Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 pt-2">
                        {item.metrics.map((m) => (
                          <div
                            key={m.label}
                            className="bg-white/[0.04] border border-white/10 px-4 py-3 backdrop-blur-xs"
                          >
                            <span className="block text-[10px] font-mono uppercase tracking-wider text-[#C5A869]">
                              {m.label}
                            </span>
                            <span className="text-xs sm:text-sm font-mono text-white font-medium mt-0.5 block">
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap items-center gap-3.5 pt-2">
                        <button
                          type="button"
                          onClick={() => onOpenGallery(prop)}
                          className="px-6 py-3.5 bg-[#C5A869] hover:bg-white text-[#071C35] font-semibold text-xs uppercase tracking-[0.2em] transition-colors flex items-center gap-2 cursor-pointer"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>Inspect Uncut Brochure</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onOpenBooking(prop.title)}
                          className="px-6 py-3.5 border border-white/35 hover:border-[#C5A869] bg-white/5 hover:bg-white/10 text-white font-semibold text-xs uppercase tracking-[0.2em] transition-colors cursor-pointer"
                        >
                          <span>Register Interest</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onOpenBrochure(prop.title)}
                          className="px-4 py-3.5 text-xs font-mono uppercase tracking-wider text-[#E5D3A7] hover:text-white flex items-center gap-1.5 cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5 text-[#C5A869]" />
                          <span>PDF Dossier</span>
                        </button>
                      </div>
                    </div>

                    {/* Right 6 Columns: Uncropped Official Brochure / Layout Stage with Quick Switcher */}
                    <div className="lg:col-span-6">
                      <div className="bg-[#040B16]/90 border border-[#C5A869]/40 shadow-[0_24px_60px_rgba(0,0,0,0.65)] overflow-hidden">
                        {/* Top Frame Bar with Poster / Layout / Map Switcher */}
                        <div className="px-4 py-2.5 bg-[#071529] border-b border-white/10 flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2 text-[11px] font-mono text-[#E5D3A7]">
                            <MapPin className="w-3.5 h-3.5 text-[#C5A869]" />
                            <span>{prop.location}</span>
                          </div>

                          {prop.gallery.length > 1 && (
                            <div className="flex items-center gap-1">
                              {prop.gallery.slice(0, 3).map((gItem, gIdx) => {
                                const isSel = activeTabIdx === gIdx;
                                const tabName =
                                  gIdx === 0 ? 'Poster' : gIdx === 1 ? 'Layout Plan' : 'Location Map';
                                return (
                                  <button
                                    key={gItem.id}
                                    type="button"
                                    onClick={() =>
                                      setSlideMediaIndex((prev) => ({
                                        ...prev,
                                        [prop.id]: gIdx,
                                      }))
                                    }
                                    className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                                      isSel
                                        ? 'bg-[#C5A869] text-[#071C35] font-semibold'
                                        : 'bg-white/5 text-white/70 hover:text-white'
                                    }`}
                                  >
                                    {tabName}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>

                        {/* Uncropped Image Stage */}
                        <div
                          onClick={() => onOpenGallery(prop)}
                          className="relative h-[32vh] sm:h-[42vh] lg:h-[50vh] w-full p-4 flex items-center justify-center cursor-pointer group overflow-hidden"
                        >
                          <img
                            src={activeMediaUrl}
                            alt=""
                            aria-hidden="true"
                            className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-25 scale-110 pointer-events-none"
                          />
                          <img
                            src={activeMediaUrl}
                            alt={prop.title}
                            referrerPolicy="no-referrer"
                            className="relative z-10 max-h-full max-w-full w-auto h-auto object-contain transition-transform duration-500 group-hover:scale-[1.03] shadow-2xl"
                          />
                          <div className="absolute bottom-3 right-3 z-20 bg-[#071C35]/90 border border-[#C5A869]/50 px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-white flex items-center gap-1.5">
                            <Maximize2 className="w-3 h-3 text-[#C5A869]" />
                            <span>Full Uncut View ({prop.gallery.length} Sheets)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Interactive Side Progress Dots */}
          <div className="vm-dots" aria-label="Slide navigation">
            {flipLaunches.map((item, idx) => (
              <button
                key={item.headline}
                type="button"
                onClick={() => scrollToFlipSlide(idx)}
                className={idx === 0 ? 'on' : ''}
                title={`Jump to ${item.headline}`}
                aria-label={`Jump to ${item.headline}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. PINNED 300VH HORIZONTAL PORTFOLIO RAIL (ALL VEDMAY INFRA PROJECTS)
          ===================================================================== */}
      <section className="vm-h" id="more-launches" ref={hSectionRef}>
        <div className="vm-pin">
          {/* Header Row */}
          <div className="px-[5vw] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#8D7039] mb-1.5">
                <span className="w-8 h-[1px] bg-[#8D7039]" />
                <span>HORIZONTAL PORTFOLIO RAIL · NAGPUR</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#071C35] tracking-tight">
                Signature Developments &amp; Townships
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onNavigateToOurProjects}
                className="px-5 py-2.5 border border-[#071C35] text-[#071C35] hover:bg-[#071C35] hover:text-white text-xs font-semibold uppercase tracking-[0.18em] transition-colors cursor-pointer"
              >
                Ongoing &amp; Completed
              </button>
              <button
                type="button"
                onClick={onNavigateToAllProjects}
                className="px-6 py-2.5 bg-[#071C35] hover:bg-[#C5A869] text-white hover:text-[#071C35] text-xs font-semibold uppercase tracking-[0.18em] transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>View All ({PROPERTIES.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Horizontal Scroll Track */}
          <div className="vm-rail" ref={railRef}>
            {PROPERTIES.map((prop, index) => (
              <article
                key={prop.id}
                className="flex-shrink-0 w-[82vw] sm:w-[390px] lg:w-[420px] bg-white border border-[#DED9CE] hover:border-[#C5A869] shadow-[0_16px_40px_rgba(7,28,53,0.08)] flex flex-col justify-between transition-colors group"
              >
                <div>
                  {/* Uncropped Image Stage */}
                  <div
                    onClick={() => onOpenGallery(prop)}
                    className="relative h-[230px] sm:h-[250px] w-full bg-[#071C35] p-3 flex items-center justify-center cursor-pointer overflow-hidden"
                  >
                    <img
                      src={prop.image}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-30 scale-110 pointer-events-none"
                    />
                    <img
                      src={prop.image}
                      alt={prop.title}
                      referrerPolicy="no-referrer"
                      className="relative z-10 max-h-full max-w-full w-auto h-auto object-contain transition-transform duration-500 group-hover:scale-105 shadow-xl"
                    />
                    <div className="absolute top-3 left-3 z-20 bg-[#071C35]/90 border border-[#C5A869]/40 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-[#E5D3A7]">
                      0{index + 1} · {prop.statusKicker || prop.status}
                    </div>
                    <div className="absolute bottom-2.5 right-2.5 z-20 bg-black/80 text-white px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 border border-white/15">
                      <Maximize2 className="w-3 h-3 text-[#C5A869]" />
                      <span>Uncut View</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2 text-[10px] font-mono uppercase tracking-wider text-[#8D7039] mb-1">
                      <span className="truncate">{prop.location}</span>
                      <span className="shrink-0">{prop.reraNumber}</span>
                    </div>

                    <h3 className="text-2xl font-serif font-normal text-[#071C35] mb-1.5">
                      {prop.title}
                    </h3>

                    <p className="text-xs text-[#4A5260] font-light line-clamp-2 mb-4">
                      {prop.description}
                    </p>

                    <div className="pt-3 border-t border-[#E8E4DC] flex items-center justify-between text-xs font-mono">
                      <div>
                        <span className="block text-[9px] uppercase tracking-wider text-[#6E7582]">
                          SIZE / CONFIG
                        </span>
                        <span className="text-[#071C35] font-medium">{prop.carpetAreaRange}</span>
                      </div>
                      <div className="text-right">
                        <span className="block text-[9px] uppercase tracking-wider text-[#6E7582]">
                          STARTING PRICE
                        </span>
                        <span className="text-[#071C35] font-semibold">{prop.priceDisplay}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="px-5 pb-5 pt-1 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => onOpenGallery(prop)}
                    className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#071C35] hover:text-[#8D7039] flex items-center gap-1.5 pb-0.5 border-b border-[#071C35] hover:border-[#8D7039] cursor-pointer"
                  >
                    <span>Inspect Sheets</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenBooking(prop.title)}
                    className="px-4 py-2 bg-[#071C35] hover:bg-[#C5A869] text-white hover:text-[#071C35] text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors cursor-pointer"
                  >
                    Enquire
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Horizontal Scroll Progress Bar */}
          <div className="vm-bar">
            <i ref={barRef} />
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. PINNED 240VH PURE WORD-BY-WORD SCROLL REVEAL MANIFESTO
          ===================================================================== */}
      <section className="vm-life" ref={lifeRef}>
        <div className="vm-pin">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-[#C5A869] mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            <span>VEDMAY INFRA · ARCHITECTURAL PHILOSOPHY</span>
          </div>

          <p>
            {philosophyWords.map((word, idx) => (
              <React.Fragment key={idx}>
                <span className="vm-life-word">{word}</span>{' '}
              </React.Fragment>
            ))}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-[#E5D3A7]">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C5A869]" />
              <span>10–12 Years Experience</span>
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C5A869]" />
              <span>NMRDA &amp; RL Sanctioned</span>
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C5A869]" />
              <span>100% Clear 7/12 Titles</span>
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. MULTI-SPEED PARALLAX ARCHITECTURAL SHOWCASE (NON-OVERLAPPING BENTO)
          ===================================================================== */}
      <section
        id="featured"
        aria-label="Communities"
        ref={colRef}
        className="relative z-[2] py-28 bg-[#F8F7F4] border-b border-[#E2DDD3] overflow-hidden"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
          {/* Clean Dedicated Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="vm-rv">
              <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8D7039] mb-2.5">
                <span className="w-10 h-[1px] bg-[#8D7039]" />
                <span>MULTI-LAYER PARALLAX GALLERY · NAGPUR</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-normal text-[#071C35] tracking-tight">
                Communities Designed Around You
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[#4A5260] max-w-md font-light vm-rv">
              From ultra-luxury 3 BHK apartments in Manish Nagar to NMRDA-sanctioned plotted
              townships along Umred Road and Wardha Road. Click any showcase to inspect uncut
              brochures.
            </p>
          </div>

          {/* 12-Column Bento Parallax Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {collageTiles.map((tile, idx) => (
              <div
                key={idx}
                data-s={String(tile.speed)}
                onClick={() => onOpenGallery(tile.property)}
                className={`vm-parallax-card ${tile.colSpan} bg-[#071C35] border border-[#D5CFC2] hover:border-[#C5A869] shadow-[0_20px_50px_rgba(7,28,53,0.12)] overflow-hidden cursor-pointer group will-change-transform transition-colors`}
              >
                <div className={`relative ${tile.heightClass} w-full p-4 pb-24 flex items-center justify-center overflow-hidden`}>
                  <img
                    src={tile.image}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-30 scale-110 pointer-events-none"
                  />
                  <img
                    src={tile.image}
                    alt={tile.label}
                    referrerPolicy="no-referrer"
                    className="relative z-10 max-h-full max-w-full w-auto h-auto object-contain transition-transform duration-700 group-hover:scale-[1.04] shadow-2xl"
                  />

                  <div className="absolute top-3 left-3 z-20 bg-[#071C35]/90 border border-[#C5A869]/40 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-[#E5D3A7]">
                    {tile.tag}
                  </div>
                  <div className="absolute top-3 right-3 z-20 bg-black/75 border border-white/15 px-2.5 py-1 text-[10px] font-mono text-white flex items-center gap-1 group-hover:border-[#C5A869]">
                    <Maximize2 className="w-3 h-3 text-[#C5A869]" />
                    <span>Enlarge</span>
                  </div>

                  {/* Bottom Caption Bar */}
                  <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-[#040D1A] via-[#040D1A]/95 to-transparent px-6 pt-8 pb-5 flex items-end justify-between gap-4">
                    <div>
                      <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-[#C5A869]">
                        {tile.location}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-serif font-normal text-white mt-0.5">
                        {tile.label}
                      </h3>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="block text-xs font-mono font-semibold text-[#E5D3A7]">
                        {tile.price}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-white/70 group-hover:text-[#C5A869] flex items-center justify-end gap-1 mt-0.5">
                        <span>Explore</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. LEGACY BUILT ON VISION (SCROLL-TRIGGERED CUBIC-OUT COUNTERS)
          ===================================================================== */}
      <section id="legacy" className="relative z-[2] py-24 bg-[#071C35] text-white border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 text-center">
          <div className="text-xs font-mono uppercase tracking-[0.28em] text-[#C5A869] mb-3 vm-rv">
            10–12 YEARS OF TRUST IN NAGPUR REAL ESTATE
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal text-white max-w-3xl mx-auto mb-16 vm-rv">
            A Legacy Built on Vision, Engineering &amp; Timely Delivery
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="vm-rv bg-white/[0.03] border border-white/10 p-8">
              <b
                data-n="12"
                data-suffix="+"
                className="block text-5xl sm:text-6xl lg:text-7xl font-serif font-normal text-[#C5A869] tabular-nums mb-3"
              >
                0
              </b>
              <span className="block text-xs font-mono uppercase tracking-[0.22em] text-white font-semibold">
                Years Experience
              </span>
              <p className="text-xs text-white/65 mt-2 font-light">
                Have Working 10 Years + across Nagpur
              </p>
            </div>

            <div className="vm-rv bg-white/[0.03] border border-white/10 p-8">
              <b
                data-n="6"
                data-suffix="+"
                className="block text-5xl sm:text-6xl lg:text-7xl font-serif font-normal text-white tabular-nums mb-3"
              >
                0
              </b>
              <span className="block text-xs font-mono uppercase tracking-[0.22em] text-[#C5A869] font-semibold">
                Signature Projects
              </span>
              <p className="text-xs text-white/65 mt-2 font-light">
                Vedira Fortune, Om Shree Estate &amp; Sai Nagri series
              </p>
            </div>

            <div className="vm-rv bg-white/[0.03] border border-white/10 p-8">
              <b
                data-n="850"
                data-suffix="+"
                className="block text-5xl sm:text-6xl lg:text-7xl font-serif font-normal text-[#C5A869] tabular-nums mb-3"
              >
                0
              </b>
              <span className="block text-xs font-mono uppercase tracking-[0.22em] text-white font-semibold">
                Sanctioned Plots
              </span>
              <p className="text-xs text-white/65 mt-2 font-light">
                NMRDA &amp; RL approved residential &amp; commercial layouts
              </p>
            </div>

            <div className="vm-rv bg-white/[0.03] border border-white/10 p-8">
              <b
                data-n="1200"
                data-suffix="+"
                className="block text-5xl sm:text-6xl lg:text-7xl font-serif font-normal text-white tabular-nums mb-3"
              >
                0
              </b>
              <span className="block text-xs font-mono uppercase tracking-[0.22em] text-[#C5A869] font-semibold">
                Happy Families
              </span>
              <p className="text-xs text-white/65 mt-2 font-light">
                Trusted by homeowners &amp; investors in Nagpur
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          7. VISION, MISSION & WHY CHOOSE VEDMAY INFRA (EDITORIAL GRID)
          ===================================================================== */}
      <section id="beyond" className="relative z-[2] py-24 bg-[#EFECE6] text-[#071C35]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
          {/* Vision & Mission 2-Column Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 pb-16 border-b border-[#D8D3C8]">
            <div className="vm-rv bg-white border border-[#DED9CE] p-8 sm:p-10 shadow-xs">
              <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.24em] text-[#8D7039] mb-3">
                <Compass className="w-4 h-4 text-[#8D7039]" />
                <span>01 · OUR VISION</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#071C35] mb-3">
                Shaping the Skyline of Nagpur &amp; Beyond
              </h3>
              <p className="text-sm text-[#4A5260] font-light leading-relaxed">
                To become a leading name in real estate and construction by shaping the skyline of
                Nagpur and beyond. We strive to set new benchmarks in quality, transparency, and
                client satisfaction, creating spaces that inspire future generations.
              </p>
            </div>

            <div className="vm-rv bg-white border border-[#DED9CE] p-8 sm:p-10 shadow-xs">
              <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.24em] text-[#8D7039] mb-3">
                <Building2 className="w-4 h-4 text-[#8D7039]" />
                <span>02 · OUR MISSION</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#071C35] mb-3">
                Transforming Visions Into Reality With Integrity
              </h3>
              <p className="text-sm text-[#4A5260] font-light leading-relaxed">
                At Vedmay Infra, our mission is to transform visions into reality by delivering
                top-notch real estate and construction solutions with the highest standards of
                excellence, integrity, and innovation.
              </p>
            </div>
          </div>

          {/* Why Choose Vedmay Infra Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="vm-rv">
              <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8D7039] mb-2">
                <span className="w-10 h-[1px] bg-[#8D7039]" />
                <span>WHY CHOOSE VEDMAY INFRA?</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-normal text-[#071C35] tracking-tight">
                Three Pillars of Vedmay Excellence
              </h2>
            </div>

            <button
              type="button"
              onClick={onNavigateToAbout}
              className="vm-rv self-start md:self-end px-6 py-3 bg-[#071C35] hover:bg-[#C5A869] text-white hover:text-[#071C35] text-xs font-semibold uppercase tracking-[0.2em] transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Discover About Vedmay</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3 Architectural Pillar Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              onClick={onNavigateToAbout}
              className="vm-rv bg-white border border-[#DED9CE] hover:border-[#C5A869] overflow-hidden flex flex-col justify-between cursor-pointer group transition-colors shadow-xs"
            >
              <div>
                <div className="h-56 w-full bg-[#071C35] p-3 flex items-center justify-center overflow-hidden relative">
                  <img
                    src="/images/vedmay/flats-exterior.jpg"
                    alt="Unmatched Experience & Expertise"
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[#8D7039] mb-2">
                    <Award className="w-4 h-4" />
                    <span>01 · Experience &amp; Expertise</span>
                  </div>
                  <h3 className="text-2xl font-serif text-[#071C35] mb-2.5">
                    10–12 Years Industry Mastery
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A5260] font-light leading-relaxed">
                    With 10–12 years of experience in real estate and construction across Nagpur,
                    our expertise ensures every project is handled with precision and care.
                  </p>
                </div>
              </div>
            </div>

            <div
              onClick={onNavigateToOurProjects}
              className="vm-rv bg-white border border-[#DED9CE] hover:border-[#C5A869] overflow-hidden flex flex-col justify-between cursor-pointer group transition-colors shadow-xs"
            >
              <div>
                <div className="h-56 w-full bg-[#071C35] p-3 flex items-center justify-center overflow-hidden relative">
                  <img
                    src="/images/vedmay/vedira-heights-1.jpg"
                    alt="Timely Delivery - Vedira Heights & Ramalay Bliss"
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[#8D7039] mb-2">
                    <Clock className="w-4 h-4" />
                    <span>02 · Timely Delivery</span>
                  </div>
                  <h3 className="text-2xl font-serif text-[#071C35] mb-2.5">
                    On-Time Project Handover
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A5260] font-light leading-relaxed">
                    Proven by our completed landmarks #1 Vedira Heights (45 Sqm) and #2 Ramalay
                    Bliss (73 Sqm), we focus on timely completion so you can plan without delays.
                  </p>
                </div>
              </div>
            </div>

            <div
              onClick={() => onOpenBrochure('Vedira Fortune')}
              className="vm-rv bg-white border border-[#DED9CE] hover:border-[#C5A869] overflow-hidden flex flex-col justify-between cursor-pointer group transition-colors shadow-xs"
            >
              <div>
                <div className="h-56 w-full bg-[#071C35] p-3 flex items-center justify-center overflow-hidden relative">
                  <img
                    src="/images/vedmay/about/workspace-1.jpg"
                    alt="Trust & Transparency - Shyam Nagar Head Office"
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[#8D7039] mb-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span>03 · Transparency &amp; Trust</span>
                  </div>
                  <h3 className="text-2xl font-serif text-[#071C35] mb-2.5">
                    Clear 7/12 Titles &amp; Zero Surprises
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A5260] font-light leading-relaxed">
                    Open communication and honest dealings—backed by MahaRERA registration
                    (P50500077649), NMRDA RL sanctions, and 80–90% nationalized bank loan support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          8. PINNED 220VH EXPANDING CLIP-PATH CONVERSE CTA
          ===================================================================== */}
      <section className="vm-cv" id="converse" aria-label="Speak with us" ref={cvRef}>
        <div className="vm-pin">
          <div className="vm-card2" ref={card2Ref}>
            <div className="max-w-4xl mx-auto px-4">
              <img
                src="/images/vedmay/logo.png"
                alt="Vedmay Infra"
                className="h-16 sm:h-20 w-auto object-contain mx-auto mb-5"
              />
              <div className="text-xs font-mono uppercase tracking-[0.28em] text-[#C5A869] mb-3">
                REGISTERED HEAD OFFICE · SHYAM NAGAR, NAGPUR
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal text-white leading-[1.08]">
                Let’s Build Your Future With Confidence &amp; Excellence
              </h2>
              <p className="text-sm sm:text-base text-white/75 mt-4 max-w-2xl mx-auto font-light">
                Visit our consultation lounge at Plot No. 14, Jaihind Society, Beside &apos;Amrut
                Lawn&apos;, Shyam Nagar, Nagpur 440036 for personalized layout walkthroughs and
                site visits.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => onOpenBooking('Vedira Fortune')}
                  className="px-8 py-4 rounded-full bg-[#C5A869] hover:bg-white text-[#071C35] text-xs font-semibold uppercase tracking-[0.22em] transition-all flex items-center gap-2.5 cursor-pointer shadow-xl"
                >
                  <span>Schedule Private Site Visit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={onNavigateToContacts}
                  className="px-8 py-4 rounded-full border border-white/40 hover:border-[#C5A869] text-white text-xs font-semibold uppercase tracking-[0.22em] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C5A869]" />
                  <span>Contact Sales Desk</span>
                </button>
              </div>

              <div className="mt-10 pt-6 border-t border-white/15 flex flex-wrap items-center justify-center gap-6 text-xs text-white/75 font-mono">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A869]" />
                  <span>Shyam Nagar, Nagpur 440036</span>
                </span>
                <a
                  href="tel:+917122894500"
                  className="flex items-center gap-1.5 hover:text-[#C5A869]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C5A869]" />
                  <span>+91 712 289 4500</span>
                </a>
                <a
                  href="mailto:Vedmaypropertynagpur@gmail.com"
                  className="flex items-center gap-1.5 hover:text-[#C5A869]"
                >
                  <Mail className="w-3.5 h-3.5 text-[#C5A869]" />
                  <span>Vedmaypropertynagpur@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
