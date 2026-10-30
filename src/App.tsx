import React, { useState, useEffect } from 'react';
import { Navbar, PageType, OurProjectsStatusFilter } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AllProjectsPage } from './pages/AllProjectsPage';
import { OurProjectsPage } from './pages/OurProjectsPage';
import { AboutVedmayPage } from './pages/AboutVedmayPage';
import { ContactsPage } from './pages/ContactsPage';
import { InteractiveGalleryModal } from './components/InteractiveGalleryModal';
import { BookingModal } from './components/BookingModal';
import { BrochureModal } from './components/BrochureModal';
import { SearchModal } from './components/SearchModal';
import { Property, PROPERTIES } from './data/properties';

export default function App() {
  // 5 Distinct Independent Pages: 'home' | 'all-projects' | 'our-projects' | 'about-vedmay' | 'contacts'
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [ourProjectsFilter, setOurProjectsFilter] = useState<OurProjectsStatusFilter>('all');

  // Modals & Active Property States
  const [selectedGalleryProperty, setSelectedGalleryProperty] = useState<Property | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingProjectName, setBookingProjectName] = useState('Vedira Fortune');
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [brochureProjectName, setBrochureProjectName] = useState('Vedira Fortune');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Parse path, query, and hash into distinct page
  const parseUrl = (): { page: PageType; subTab: OurProjectsStatusFilter } => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const search = new URLSearchParams(window.location.search);
    const statusParam = search.get('status') || search.get('tab');

    let page: PageType = 'home';
    let subTab: OurProjectsStatusFilter = 'all';

    if (path.includes('all-projects') || hash.includes('all-projects')) {
      page = 'all-projects';
    } else if (path.includes('our-projects') || hash.includes('our-projects')) {
      page = 'our-projects';
      if (statusParam === 'ongoing' || hash.includes('ongoing')) {
        subTab = 'ongoing';
      } else if (statusParam === 'completed' || hash.includes('completed')) {
        subTab = 'completed';
      } else if (statusParam === 'upcoming' || hash.includes('upcoming')) {
        subTab = 'upcoming';
      }
    } else if (path.includes('about') || hash.includes('about')) {
      page = 'about-vedmay';
    } else if (path.includes('contact') || hash.includes('contact')) {
      page = 'contacts';
    } else {
      // Default to Home page
      page = 'home';
    }

    return { page, subTab };
  };

  // Sync initial URL on mount and handle browser back/forward buttons
  useEffect(() => {
    const { page, subTab } = parseUrl();
    setCurrentPage(page);
    if (subTab) {
      setOurProjectsFilter(subTab);
    }

    const handlePopState = () => {
      const parsed = parseUrl();
      setCurrentPage(parsed.page);
      if (parsed.subTab) {
        setOurProjectsFilter(parsed.subTab);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Primary navigation handler between the separate pages
  const handleNavigate = (page: PageType, subTab?: OurProjectsStatusFilter) => {
    setCurrentPage(page);
    if (subTab) {
      setOurProjectsFilter(subTab);
    }

    let url = '/';
    if (page === 'home') {
      url = '/';
    } else if (page === 'all-projects') {
      url = '/all-projects';
    } else if (page === 'our-projects') {
      url = subTab && subTab !== 'all' ? `/our-projects?status=${subTab}` : '/our-projects';
    } else if (page === 'about-vedmay') {
      url = '/about-vedmay';
    } else if (page === 'contacts') {
      url = '/contacts';
    }

    try {
      window.history.pushState({ page, subTab }, '', url);
    } catch {
      window.location.hash = `#/${page}${subTab && subTab !== 'all' ? `?status=${subTab}` : ''}`;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (projectName: string = 'Vedira Fortune') => {
    setBookingProjectName(projectName);
    setIsBookingOpen(true);
  };

  const handleOpenBrochure = (projectName: string = 'Vedira Fortune') => {
    setBrochureProjectName(projectName);
    setIsBrochureOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#070A0F] text-neutral-100 flex flex-col font-sans selection:bg-[#C5A869] selection:text-[#14171F]">
      {/* Persistent 3-Zone Header Navigation matching Emaar luxury aesthetic */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking('Vedira Fortune')}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Renders ONLY the actively selected page ("alag alag pages") */}
      <main className="flex-1">
        {/* PAGE 0: HOME PAGE (Vedmay Communities & Flagship Projects) */}
        {currentPage === 'home' && (
          <HomePage
            onSearch={(_filters) => {
              handleNavigate('all-projects');
            }}
            onOpenBooking={handleOpenBooking}
            onOpenBrochure={handleOpenBrochure}
            onExploreFortune={() => handleNavigate('all-projects')}
            onSelectPropertyForFloorPlan={(_propId) => {}}
            onOpenGallery={(prop) => setSelectedGalleryProperty(prop)}
            displayProperties={PROPERTIES}
            ourProjectsFilter={ourProjectsFilter}
            onOurProjectsFilterChange={(filter) => setOurProjectsFilter(filter)}
            onNavigateToAllProjects={() => handleNavigate('all-projects')}
            onNavigateToOurProjects={() => handleNavigate('our-projects')}
            onNavigateToAbout={() => handleNavigate('about-vedmay')}
            onNavigateToContacts={() => handleNavigate('contacts')}
          />
        )}

        {/* PAGE 1: ALL PROJECTS */}
        {currentPage === 'all-projects' && (
          <AllProjectsPage
            onOpenGallery={(prop) => setSelectedGalleryProperty(prop)}
            onOpenBooking={handleOpenBooking}
            onOpenBrochure={handleOpenBrochure}
            onNavigateToOurProjects={() => handleNavigate('our-projects')}
          />
        )}

        {/* PAGE 2: OUR PROJECTS (with sub tabs: ONGOING, COMPLETED, UPCOMING) */}
        {currentPage === 'our-projects' && (
          <OurProjectsPage
            initialSubTab={ourProjectsFilter}
            onOpenGallery={(prop) => setSelectedGalleryProperty(prop)}
            onOpenBooking={handleOpenBooking}
            onOpenBrochure={handleOpenBrochure}
            onNavigateToAllProjects={() => handleNavigate('all-projects')}
          />
        )}

        {/* PAGE 3: ABOUT VEDMAY */}
        {currentPage === 'about-vedmay' && (
          <AboutVedmayPage
            onOpenBooking={() => handleOpenBooking('Vedira Fortune')}
            onNavigateToOurProjects={() => handleNavigate('our-projects')}
          />
        )}

        {/* PAGE 4: CONTACTS */}
        {currentPage === 'contacts' && (
          <ContactsPage
            onOpenBooking={handleOpenBooking}
            onNavigateToOurProjects={() => handleNavigate('our-projects')}
          />
        )}
      </main>

      {/* Persistent Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Interactive Media Modals */}
      <InteractiveGalleryModal
        property={selectedGalleryProperty}
        onClose={() => setSelectedGalleryProperty(null)}
        onOpenBooking={handleOpenBooking}
        onOpenBrochure={handleOpenBrochure}
      />

      <BookingModal
        initialProjectName={bookingProjectName}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      <BrochureModal
        projectName={brochureProjectName}
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
        onOpenBooking={() => handleOpenBooking(brochureProjectName)}
      />

      {/* Global Interactive Architectural Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenBooking}
      />
    </div>
  );
}
