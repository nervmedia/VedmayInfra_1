import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Calendar,
  MessageSquare,
  ShieldCheck,
  Building,
} from 'lucide-react';
import { PROPERTIES } from '../data/properties';

interface ContactSectionProps {
  onOpenBooking: (projectName?: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenBooking }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    project: 'Vedira Fortune (Somalwada)',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section
      id="contacts"
      className="py-24 bg-[#090D16] text-neutral-100 border-t border-neutral-800/80 scroll-mt-20 relative"
    >
      {/* Anchor alias for #contact */}
      <div id="contact" className="absolute -top-20" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-400 font-medium mb-3">
              <span>CONTACTS & SALES ADVISORY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight text-white">
              Connect With VEDMAY
            </h2>
          </div>
          <p className="text-neutral-400 text-xs sm:text-sm font-light max-w-md mt-4 md:mt-0">
            Our Senior Portfolio Directors are available 7 days a week to guide you through floor
            plans, legal sanctions, site inspections, and customized payment schedules.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Corporate Information & Sales Lounge */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-neutral-900/70 border border-neutral-800 p-8 rounded-sm space-y-6">
              <h3 className="text-xl font-serif text-white font-medium flex items-center gap-2">
                <Building className="w-5 h-5 text-amber-400" />
                <span>Nagpur Corporate Sales Gallery</span>
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-neutral-300 font-light">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium mb-0.5">Corporate Address</strong>
                    <span>
                      Plot No. 14, Jaihind Society, Beside 'Amrut Lawn', Shyam Nagar, Nagpur 440036
                    </span>
                    <span className="block text-[11px] text-neutral-400 mt-1 font-mono">
                      (Just 6 mins from Airport Metro Station)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-neutral-800/80">
                  <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium mb-0.5">Direct Hotlines</strong>
                    <div className="space-y-0.5">
                      <a
                        href="tel:+917122894500"
                        className="hover:text-amber-400 transition-colors block font-mono text-neutral-200"
                      >
                        +91 712 289 4500 (Sales Desk)
                      </a>
                      <a
                        href="tel:+919823045678"
                        className="hover:text-amber-400 transition-colors block font-mono text-neutral-200"
                      >
                        +91 98230 45678 (Direct Mobile / WhatsApp)
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-neutral-800/80">
                  <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium mb-0.5">Executive Email</strong>
                    <div className="space-y-0.5">
                      <a
                        href="mailto:Vedmaypropertynagpur@gmail.com"
                        className="hover:text-amber-400 transition-colors block font-mono text-neutral-200"
                      >
                        Vedmaypropertynagpur@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-neutral-800/80">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium mb-0.5">Experience Center Hours</strong>
                    <span>Monday through Sunday: 9:30 AM – 7:30 PM (IST)</span>
                    <span className="block text-[11px] text-amber-400/90 mt-0.5">
                      Open on all weekends & public holidays for site visits.
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => onOpenBooking('Vedira Fortune')}
                  className="flex-1 py-3 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Site Walkthrough</span>
                </button>
                <a
                  href="https://wa.me/919823045678?text=Hello%20VEDMAY,%20I%20would%20like%20to%20inquire%20about%20your%20Nagpur%20projects."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2 border border-neutral-700"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Credential Badge */}
            <div className="bg-neutral-900/40 border border-neutral-800/80 p-5 rounded-sm flex items-center gap-4">
              <ShieldCheck className="w-8 h-8 text-amber-400 shrink-0" />
              <div className="text-xs">
                <span className="text-white font-medium block">MahaRERA & NMRDA Registered Developer</span>
                <span className="text-neutral-400 font-mono text-[11px]">
                  RERA Reg: P50500049281 · Clean titles & approved sanctions
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Inquiry & Priority Callback Form */}
          <div className="lg:col-span-7">
            <div className="bg-neutral-900/70 border border-neutral-800 p-8 sm:p-10 rounded-sm">
              <div className="mb-6">
                <span className="text-xs uppercase tracking-wider text-amber-400 font-mono block mb-1">
                  DIRECT CLIENT INQUIRY
                </span>
                <h3 className="text-2xl font-serif text-white font-normal">
                  Request an Architectural Dossier or Callback
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Fill in your details below and a Dedicated Relationship Manager will connect within 15 minutes.
                </p>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-serif text-white">Inquiry Received Successfully</h4>
                  <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto font-light">
                    Thank you, <strong className="text-white">{formData.fullName || 'Valued Guest'}</strong>. Our
                    Senior Sales Director for {formData.project} will call you at{' '}
                    <span className="font-mono text-amber-300">{formData.phone}</span> shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        phone: '',
                        email: '',
                        project: 'Vedira Fortune (Somalwada)',
                        message: '',
                      });
                    }}
                    className="mt-4 px-6 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs uppercase tracking-wider rounded-sm transition-colors"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-neutral-300 mb-2">
                        Full Name <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dr. Rajesh Sharma"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-sm text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-neutral-300 mb-2">
                        Phone Number <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98XXX XXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-sm text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-neutral-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-sm text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-neutral-300 mb-2">
                        Interested Project
                      </label>
                      <select
                        value={formData.project}
                        onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                        className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-sm text-sm text-white focus:outline-none focus:border-amber-400 transition-colors cursor-pointer"
                      >
                        <option value="Vedira Fortune (Manish Nagar)">Vedira Fortune (Manish Nagar) - 3 BHK Ultra Luxury</option>
                        <option value="Om Shree Estate (Umred Road)">Om Shree Estate (Umred Road) - NMRDA Plots</option>
                        <option value="Sai Nagri 8 (Dongergaon)">Sai Nagri 8 (Dongergaon) - Wardha Road Plots</option>
                        <option value="Sai Nagri 9 (Borekhedi)">Sai Nagri 9 (Borekhedi) - Plotted Enclave</option>
                        <option value="Sai Nagri 7 (Panchgaon)">Sai Nagri 7 (Panchgaon) - Sanctioned Plots</option>
                        <option value="Vedira Heights & Ramalay Bliss">Vedira Heights &amp; Ramalay Bliss - Completed Flats</option>
                        <option value="General Investment Advisory">General Nagpur Real Estate Advisory</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-neutral-300 mb-2">
                      Specific Requirements / Preferred Visit Time
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Share your preferred configuration (2 BHK, 3 BHK, 4 BHK), budget range, or preferred visit date/time..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-sm text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[11px] text-neutral-500">
                      🔒 Your privacy is respected. No spam. Direct communication only.
                    </p>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Submitting...</span>
                      ) : (
                        <>
                          <span>Submit Inquiry</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
