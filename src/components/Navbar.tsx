import React, { useState } from 'react';
import { Menu, X, Search, Phone, ChevronDown } from 'lucide-react';

export type PageType = 'home' | 'all-projects' | 'our-projects' | 'about-vedmay' | 'contacts';
export type OurProjectsStatusFilter = 'all' | 'ongoing' | 'completed' | 'upcoming';

interface NavbarProps {
  currentPage: PageType;
  onNavigate: (page: PageType, subTab?: OurProjectsStatusFilter) => void;
  onOpenBooking: () => void;
  onOpenSearch: () => void;
}

// Authentic WhatsApp SVG Icon matching the user's screenshot
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenBooking,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubMenuOpen, setMobileSubMenuOpen] = useState(true);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'EN' | 'HI' | 'MR'>('EN');

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('home');
  };

  const handleWhatsAppClick = () => {
    window.open(
      'https://wa.me/919823045678?text=Hello%20VEDMAY,%20I%20would%20like%20to%20inquire%20about%20your%20Nagpur%20projects.',
      '_blank'
    );
  };

  const handleInstantCallClick = () => {
    window.location.href = 'tel:+917122894500';
  };

  return (
    <header className="sticky top-0 z-50 bg-[#E8E6E1] text-[#14171F] border-b border-[#D4D1C8] shadow-sm select-none">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Exact Layout Matching Second Image with First Image Actions */}
        <div className="flex items-center justify-between h-20 gap-4 lg:gap-8">
          {/* Left Block: Brand Wordmark with Divider & Navigation Links */}
          <div className="flex items-center gap-6 lg:gap-8 shrink-0">
            {/* Wordmark with Official Logo & Pipe Divider: [LOGO] VEDMAY | */}
            <div className="flex items-center">
              <a
                href="/"
                onClick={handleHomeClick}
                className="flex items-center gap-3 text-2xl sm:text-[26px] font-serif font-normal tracking-[0.18em] text-[#14171F] hover:text-[#8D7039] transition-colors whitespace-nowrap cursor-pointer uppercase"
                aria-label="VEDMAY - Home"
              >
                <img
                  src="/images/vedmay/logo.png"
                  alt="VEDMAY Infra"
                  className="h-12 sm:h-14 w-auto object-contain shrink-0 drop-shadow-xs"
                />
                <span>VEDMAY</span>
              </a>
              <span className="ml-5 text-[#A3A096] font-light text-2xl leading-none select-none">
                |
              </span>
            </div>

            {/* Navigation Tabs (ALL PROJECTS, OUR PROJECTS with sub-tabs, ABOUT VEDMAY, CONTACTS) */}
            <nav className="hidden xl:flex items-center gap-6 2xl:gap-8 text-xs font-medium tracking-[0.16em] uppercase">
              {/* ALL PROJECTS */}
              <a
                href="/all-projects"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('all-projects');
                }}
                className={`py-2 transition-all whitespace-nowrap ${
                  currentPage === 'all-projects'
                    ? 'text-[#14171F] font-bold border-b-2 border-[#14171F]'
                    : 'text-[#2D313A] hover:text-[#8D7039] border-b-2 border-transparent'
                }`}
              >
                ALL PROJECTS
              </a>

              {/* OUR PROJECTS with Dropdown SUB TABS (ONGOING, COMPLETED, UPCOMING) */}
              <div className="relative group">
                <a
                  href="/our-projects"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('our-projects', 'all');
                  }}
                  className={`flex items-center gap-1.5 py-2 transition-all whitespace-nowrap cursor-pointer ${
                    currentPage === 'our-projects'
                      ? 'text-[#14171F] font-bold border-b-2 border-[#14171F]'
                      : 'text-[#2D313A] hover:text-[#8D7039] border-b-2 border-transparent'
                  }`}
                >
                  <span>OUR PROJECTS</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#5A5D64] group-hover:text-[#14171F] transition-transform duration-200 group-hover:rotate-180" />
                </a>

                {/* Sub Tab Dropdown Menu */}
                <div className="absolute top-full left-0 pt-2 w-64 hidden group-hover:block z-50">
                  <div className="bg-[#FAF9F6] border border-[#D4D1C8] shadow-2xl rounded-sm p-2 text-[#14171F]">
                    <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-[#8D7039] border-b border-[#E2DFD6] mb-1 flex items-center justify-between">
                      <span>STATUS SUB TABS</span>
                      <span className="text-[#8D7039] text-[9px]">VEDMAY</span>
                    </div>

                    <button
                      onClick={() => onNavigate('our-projects', 'ongoing')}
                      className="w-full text-left px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[#14171F] hover:bg-[#E8E6E1] rounded-xs transition-colors flex items-center justify-between group/sub cursor-pointer"
                    >
                      <span>ONGOING</span>
                      <span className="text-[10px] font-normal lowercase tracking-normal text-[#5A5D64]">
                        under construction
                      </span>
                    </button>

                    <button
                      onClick={() => onNavigate('our-projects', 'completed')}
                      className="w-full text-left px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[#14171F] hover:bg-[#E8E6E1] rounded-xs transition-colors flex items-center justify-between group/sub cursor-pointer"
                    >
                      <span>COMPLETED</span>
                      <span className="text-[10px] font-normal lowercase tracking-normal text-[#5A5D64]">
                        ready to move
                      </span>
                    </button>

                    <button
                      onClick={() => onNavigate('our-projects', 'upcoming')}
                      className="w-full text-left px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[#14171F] hover:bg-[#E8E6E1] rounded-xs transition-colors flex items-center justify-between group/sub cursor-pointer"
                    >
                      <span>UPCOMING</span>
                      <span className="text-[10px] font-normal lowercase tracking-normal text-[#5A5D64]">
                        new launches
                      </span>
                    </button>

                    <div className="border-t border-[#E2DFD6] mt-1 pt-1.5">
                      <button
                        onClick={() => onNavigate('our-projects', 'all')}
                        className="w-full text-left px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-[#5A5D64] hover:text-[#14171F] transition-colors flex items-center justify-between cursor-pointer"
                      >
                        <span>All Signature Projects</span>
                        <span>→</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* ABOUT VEDMAY */}
              <a
                href="/about-vedmay"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('about-vedmay');
                }}
                className={`py-2 transition-all whitespace-nowrap ${
                  currentPage === 'about-vedmay'
                    ? 'text-[#14171F] font-bold border-b-2 border-[#14171F]'
                    : 'text-[#2D313A] hover:text-[#8D7039] border-b-2 border-transparent'
                }`}
              >
                ABOUT VEDMAY
              </a>

              {/* CONTACTS */}
              <a
                href="/contacts"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('contacts');
                }}
                className={`py-2 transition-all whitespace-nowrap ${
                  currentPage === 'contacts'
                    ? 'text-[#14171F] font-bold border-b-2 border-[#14171F]'
                    : 'text-[#2D313A] hover:text-[#8D7039] border-b-2 border-transparent'
                }`}
              >
                CONTACTS
              </a>
            </nav>
          </div>

          {/* Right Block: Only icons for SEARCH, INSTANT CALL, WHATSAPP, with GET IN TOUCH IN LAST */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-5 shrink-0 text-xs font-medium uppercase tracking-[0.14em]">
            {/* 1. SEARCH - ICON ONLY */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#14171F] hover:text-[#8D7039] hover:bg-black/5 rounded-full transition-all cursor-pointer flex items-center justify-center group"
              title="Search Developments"
              aria-label="Search Developments"
            >
              <Search className="w-[19px] h-[19px] text-[#14171F] group-hover:text-[#8D7039] transition-colors" strokeWidth={1.9} />
            </button>

            {/* 2. INSTANT CALL - ICON ONLY */}
            <button
              onClick={handleInstantCallClick}
              className="p-2 text-[#14171F] hover:text-[#8D7039] hover:bg-black/5 rounded-full transition-all cursor-pointer flex items-center justify-center group"
              title="Instant Call (+91 712 289 4500)"
              aria-label="Instant Call (+91 712 289 4500)"
            >
              <Phone className="w-[19px] h-[19px] text-[#14171F] group-hover:text-[#8D7039] transition-colors" strokeWidth={1.9} />
            </button>

            {/* 3. WHATSAPP - ICON ONLY */}
            <button
              onClick={handleWhatsAppClick}
              className="p-2 text-[#14171F] hover:text-emerald-700 hover:bg-emerald-50 rounded-full transition-all cursor-pointer flex items-center justify-center group"
              title="WhatsApp Sales Desk (+91 98230 45678)"
              aria-label="WhatsApp Sales Desk (+91 98230 45678)"
            >
              <WhatsAppIcon className="w-[19px] h-[19px] text-[#14171F] group-hover:text-emerald-600 transition-colors" />
            </button>

            {/* 4. Language Selector: | EN ⌵ */}
            <div className="relative">
              <button
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className="flex items-center gap-1.5 pl-3 border-l border-[#A3A096] text-[#14171F] hover:text-[#8D7039] transition-colors whitespace-nowrap cursor-pointer py-1 font-semibold tracking-wider text-xs"
                title="Select Language"
              >
                <span>{selectedLanguage}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#5A5D64]" />
              </button>

              {languageMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-32 bg-[#FAF9F6] border border-[#D4D1C8] shadow-xl rounded-sm py-1 z-50 text-xs">
                  <button
                    onClick={() => {
                      setSelectedLanguage('EN');
                      setLanguageMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-[#E8E6E1] transition-colors ${
                      selectedLanguage === 'EN' ? 'font-bold text-[#8D7039]' : 'text-[#14171F]'
                    }`}
                  >
                    English (EN)
                  </button>
                  <button
                    onClick={() => {
                      setSelectedLanguage('HI');
                      setLanguageMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-[#E8E6E1] transition-colors ${
                      selectedLanguage === 'HI' ? 'font-bold text-[#8D7039]' : 'text-[#14171F]'
                    }`}
                  >
                    हिन्दी (HI)
                  </button>
                  <button
                    onClick={() => {
                      setSelectedLanguage('MR');
                      setLanguageMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-[#E8E6E1] transition-colors ${
                      selectedLanguage === 'MR' ? 'font-bold text-[#8D7039]' : 'text-[#14171F]'
                    }`}
                  >
                    मराठी (MR)
                  </button>
                </div>
              )}
            </div>

            {/* 5. GET IN TOUCH IN LAST (Framed rectangular border box button) */}
            <button
              onClick={onOpenBooking}
              className="ml-1 px-5 py-2.5 border border-[#14171F] text-[#14171F] hover:bg-[#14171F] hover:text-[#FAF9F6] transition-all whitespace-nowrap text-xs font-semibold tracking-[0.16em] uppercase cursor-pointer"
            >
              GET IN TOUCH
            </button>
          </div>

          {/* Medium / Tablet Compact Quick Action Icons: Search, Call, WhatsApp, Get in Touch in last */}
          <div className="hidden sm:flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#14171F] hover:text-[#8D7039] transition-colors"
              title="Search"
              aria-label="Search"
            >
              <Search className="w-5 h-5" strokeWidth={2} />
            </button>
            <button
              onClick={handleInstantCallClick}
              className="p-2 text-[#14171F] hover:text-[#8D7039] transition-colors"
              title="Instant Call"
              aria-label="Instant Call"
            >
              <Phone className="w-5 h-5" strokeWidth={2} />
            </button>
            <button
              onClick={handleWhatsAppClick}
              className="p-2 text-[#14171F] hover:text-emerald-700 transition-colors"
              title="WhatsApp"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon className="w-5 h-5" />
            </button>
            <button
              onClick={onOpenBooking}
              className="px-3.5 py-1.5 border border-[#14171F] text-[#14171F] text-xs font-semibold uppercase tracking-wider ml-1"
            >
              Get In Touch
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#14171F] hover:text-[#8D7039] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#FAF9F6] border-b border-[#D4D1C8] px-4 pt-3 pb-6 space-y-4 text-[#14171F]">
          {/* Mobile Navigation Tabs */}
          <nav className="flex flex-col space-y-2 text-sm font-semibold tracking-wider uppercase">
            <a
              href="/all-projects"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                onNavigate('all-projects');
              }}
              className={`py-2 px-3 rounded-sm transition-colors ${
                currentPage === 'all-projects'
                  ? 'bg-[#E8E6E1] text-[#14171F] font-bold border-l-4 border-[#14171F]'
                  : 'text-[#2D313A] hover:bg-[#E8E6E1]'
              }`}
            >
              ALL PROJECTS
            </a>

            {/* OUR PROJECTS with expandable sub tabs */}
            <div className="border-y border-[#E2DFD6] py-2 space-y-2">
              <div className="flex items-center justify-between px-3">
                <a
                  href="/our-projects"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    onNavigate('our-projects', 'all');
                  }}
                  className={`font-semibold ${
                    currentPage === 'our-projects' ? 'text-[#8D7039]' : 'text-[#2D313A]'
                  }`}
                >
                  OUR PROJECTS
                </a>
                <button
                  onClick={() => setMobileSubMenuOpen(!mobileSubMenuOpen)}
                  className="p-1 text-[#5A5D64] hover:text-[#14171F]"
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${mobileSubMenuOpen ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>

              {mobileSubMenuOpen && (
                <div className="pl-6 border-l-2 border-[#8D7039] space-y-2 pt-1 pb-1">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigate('our-projects', 'ongoing');
                    }}
                    className="block w-full text-left text-xs uppercase tracking-wider text-[#2D313A] hover:text-[#8D7039] py-1 cursor-pointer"
                  >
                    ▸ ONGOING <span className="text-[10px] text-[#5A5D64] lowercase">(under construction)</span>
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigate('our-projects', 'completed');
                    }}
                    className="block w-full text-left text-xs uppercase tracking-wider text-[#2D313A] hover:text-[#8D7039] py-1 cursor-pointer"
                  >
                    ▸ COMPLETED <span className="text-[10px] text-[#5A5D64] lowercase">(ready to move)</span>
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigate('our-projects', 'upcoming');
                    }}
                    className="block w-full text-left text-xs uppercase tracking-wider text-[#2D313A] hover:text-[#8D7039] py-1 cursor-pointer"
                  >
                    ▸ UPCOMING <span className="text-[10px] text-[#5A5D64] lowercase">(new launches)</span>
                  </button>
                </div>
              )}
            </div>

            <a
              href="/about-vedmay"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                onNavigate('about-vedmay');
              }}
              className={`py-2 px-3 rounded-sm transition-colors ${
                currentPage === 'about-vedmay'
                  ? 'bg-[#E8E6E1] text-[#14171F] font-bold border-l-4 border-[#14171F]'
                  : 'text-[#2D313A] hover:bg-[#E8E6E1]'
              }`}
            >
              ABOUT VEDMAY
            </a>

            <a
              href="/contacts"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                onNavigate('contacts');
              }}
              className={`py-2 px-3 rounded-sm transition-colors ${
                currentPage === 'contacts'
                  ? 'bg-[#E8E6E1] text-[#14171F] font-bold border-l-4 border-[#14171F]'
                  : 'text-[#2D313A] hover:bg-[#E8E6E1]'
              }`}
            >
              CONTACTS
            </a>
          </nav>

          {/* Mobile Action Buttons (Search, Get in Touch, Call, WhatsApp, Language) */}
          <div className="pt-3 border-t border-[#E2DFD6] space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="py-2.5 px-3 border border-[#14171F] rounded-sm text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 text-[#14171F]"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleWhatsAppClick();
                }}
                className="py-2.5 px-3 bg-emerald-600 text-white rounded-sm text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>WhatsApp</span>
              </button>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleInstantCallClick();
              }}
              className="w-full py-2.5 border border-[#14171F] text-[#14171F] rounded-sm text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Instant Call (+91 712 289 4500)</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 bg-[#14171F] text-[#FAF9F6] font-semibold text-xs tracking-[0.16em] uppercase rounded-sm shadow-md"
            >
              Get In Touch
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
