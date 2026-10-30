import React from 'react';
import { MapPin, Phone, Mail, ShieldCheck, ArrowUp } from 'lucide-react';
import { PageType, OurProjectsStatusFilter } from './Navbar';

interface FooterProps {
  onNavigate?: (page: PageType, subTab?: OurProjectsStatusFilter) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (
    e: React.MouseEvent,
    page: PageType,
    subTab?: OurProjectsStatusFilter
  ) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(page, subTab);
    } else {
      scrollToTop();
    }
  };

  return (
    <footer className="bg-[#05070B] text-neutral-400 border-t border-neutral-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-900">
          {/* Brand & Corporate Overview (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, 'home')}
              className="flex items-center gap-3 text-2xl font-serif font-semibold tracking-widest text-white hover:text-[#C5A869] transition-colors cursor-pointer"
              aria-label="VEDMAY - Return to Home"
            >
              <img
                src="/images/vedmay/logo.png"
                alt="VEDMAY Infra"
                className="h-14 w-auto object-contain shrink-0"
              />
              <span>VEDMAY INFRA</span>
            </a>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm font-light">
              Your trusted partner in real estate and construction for over 10–12 years. Shaping
              Nagpur’s skyline by delivering NMRDA-sanctioned residential and commercial plots and
              luxury apartment projects with 100% transparency and timely delivery.
            </p>
            <div className="pt-2 text-neutral-300 space-y-2 text-xs font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A869] shrink-0 mt-0.5" />
                <span>
                  Plot No. 14, Jaihind Society, Beside &apos;Amrut Lawn&apos;, Shyam Nagar, Nagpur
                  440036
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A869] shrink-0" />
                <a href="tel:+917122894500" className="hover:text-[#C5A869] transition-colors font-mono">
                  +91 712 289 4500 / +91 98230 45678
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C5A869] shrink-0" />
                <a
                  href="mailto:Vedmaypropertynagpur@gmail.com"
                  className="hover:text-[#C5A869] transition-colors font-mono"
                >
                  Vedmaypropertynagpur@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Portfolio Links (Exact Vedmay Infra Projects) */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
              Signature Projects
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="/our-projects"
                  onClick={(e) => handleLinkClick(e, 'our-projects', 'ongoing')}
                  className="hover:text-[#C5A869] transition-colors cursor-pointer"
                >
                  Vedira Fortune (Manish Nagar)
                </a>
              </li>
              <li>
                <a
                  href="/our-projects"
                  onClick={(e) => handleLinkClick(e, 'our-projects', 'ongoing')}
                  className="hover:text-[#C5A869] transition-colors cursor-pointer"
                >
                  Om Shree Estate (Umred Road)
                </a>
              </li>
              <li>
                <a
                  href="/our-projects"
                  onClick={(e) => handleLinkClick(e, 'our-projects', 'ongoing')}
                  className="hover:text-[#C5A869] transition-colors cursor-pointer"
                >
                  Sai Nagri 9 (Borekhedi)
                </a>
              </li>
              <li>
                <a
                  href="/our-projects"
                  onClick={(e) => handleLinkClick(e, 'our-projects', 'ongoing')}
                  className="hover:text-[#C5A869] transition-colors cursor-pointer"
                >
                  Sai Nagri 8 (Dongergaon)
                </a>
              </li>
              <li>
                <a
                  href="/our-projects"
                  onClick={(e) => handleLinkClick(e, 'our-projects', 'ongoing')}
                  className="hover:text-[#C5A869] transition-colors cursor-pointer"
                >
                  Sai Nagri 7 (Panchgaon)
                </a>
              </li>
              <li>
                <a
                  href="/our-projects"
                  onClick={(e) => handleLinkClick(e, 'our-projects', 'completed')}
                  className="hover:text-[#C5A869] transition-colors cursor-pointer"
                >
                  Vedira Heights &amp; Ramalay Bliss
                </a>
              </li>
            </ul>
          </div>

          {/* Page Directory */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="/"
                  onClick={(e) => handleLinkClick(e, 'home')}
                  className="hover:text-[#C5A869] transition-colors cursor-pointer"
                >
                  Home Page
                </a>
              </li>
              <li>
                <a
                  href="/all-projects"
                  onClick={(e) => handleLinkClick(e, 'all-projects')}
                  className="hover:text-[#C5A869] transition-colors cursor-pointer"
                >
                  All Projects
                </a>
              </li>
              <li>
                <a
                  href="/our-projects"
                  onClick={(e) => handleLinkClick(e, 'our-projects', 'all')}
                  className="hover:text-[#C5A869] transition-colors cursor-pointer"
                >
                  Our Projects
                </a>
              </li>
              <li>
                <a
                  href="/about-vedmay"
                  onClick={(e) => handleLinkClick(e, 'about-vedmay')}
                  className="hover:text-[#C5A869] transition-colors cursor-pointer"
                >
                  About Vedmay Infra
                </a>
              </li>
              <li>
                <a
                  href="/contacts"
                  onClick={(e) => handleLinkClick(e, 'contacts')}
                  className="hover:text-[#C5A869] transition-colors cursor-pointer"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Corporate Governance */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
              Sanctions &amp; Legal
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-1.5 text-neutral-300">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A869]" />
                <span>MahaRERA Registered</span>
              </li>
              <li>
                <span className="text-[11px] text-neutral-400 block font-mono">
                  RERA: P50500077649
                </span>
              </li>
              <li>
                <span className="text-[11px] text-neutral-400 block font-mono">
                  Sanction: NMRDA / NMC RL
                </span>
              </li>
              <li>
                <span className="text-[11px] text-neutral-400 block mt-2">
                  10–12 Years Experience · 100% Clear 7/12 Titles
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Quiet Sub-Footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} Vedmay Infra Nagpur. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms &amp; Conditions</span>
            <span>MahaRERA Disclosures</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="text-neutral-400 hover:text-[#C5A869] flex items-center gap-1 transition-colors cursor-pointer"
              title="Scroll to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
