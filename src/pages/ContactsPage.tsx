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
  ArrowRight,
} from 'lucide-react';

interface ContactsPageProps {
  onOpenBooking: (projectName?: string) => void;
  onNavigateToOurProjects: () => void;
}

export const ContactsPage: React.FC<ContactsPageProps> = ({
  onOpenBooking,
  onNavigateToOurProjects,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    project: 'Vedira Fortune (Manish Nagar)',
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
    <div className="bg-[#070A0F] text-neutral-100 min-h-screen pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header Banner */}
        <div className="border-b border-neutral-800 pb-8 mb-12">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C5A869] font-mono mb-3">
            <span>CONTACTS &amp; HEAD OFFICE</span>
            <span aria-hidden="true">·</span>
            <span>SHYAM NAGAR, NAGPUR 440036</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-white mb-4">
                Connect With Vedmay Infra
              </h1>
              <p className="text-neutral-400 text-sm sm:text-base font-light max-w-2xl leading-relaxed">
                Experience personalized consultations with our team at Shyam Nagar, Nagpur. Whether
                you are inquiring about 3 BHK ultra-luxury flats at Vedira Fortune in Manish Nagar or
                NMRDA-sanctioned plots at Om Shree Estate &amp; Sai Nagri 7, 8, 9, we are at your
                service 7 days a week.
              </p>
            </div>

            <button
              type="button"
              onClick={onNavigateToOurProjects}
              className="self-start lg:self-end px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-[#C5A869] border border-neutral-700/80 rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Landmark Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Rapid Highlights Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          <div className="bg-neutral-900/60 border border-neutral-800 p-5 rounded-sm">
            <div className="flex items-center gap-2 text-xs text-[#C5A869] font-mono uppercase tracking-wider mb-1">
              <Phone className="w-3.5 h-3.5" />
              <span>Direct Hotlines</span>
            </div>
            <a
              href="tel:+917122894500"
              className="text-sm font-semibold text-white hover:text-[#C5A869] block font-mono"
            >
              +91 712 289 4500
            </a>
            <span className="text-[11px] text-neutral-400 mt-0.5 block font-mono">
              +91 98230 45678 (WhatsApp)
            </span>
          </div>

          <div className="bg-neutral-900/60 border border-neutral-800 p-5 rounded-sm">
            <div className="flex items-center gap-2 text-xs text-[#C5A869] font-mono uppercase tracking-wider mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Registered Office</span>
            </div>
            <span className="text-xs font-medium text-white block">
              Plot No. 14, Jaihind Society, Shyam Nagar
            </span>
            <span className="text-[11px] text-neutral-400 mt-0.5 block">
              Beside &apos;Amrut Lawn&apos;, Nagpur 440036
            </span>
          </div>

          <div className="bg-neutral-900/60 border border-neutral-800 p-5 rounded-sm">
            <div className="flex items-center gap-2 text-xs text-[#C5A869] font-mono uppercase tracking-wider mb-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Visiting Hours</span>
            </div>
            <span className="text-xs font-medium text-white block">9:30 AM – 7:30 PM IST</span>
            <span className="text-[11px] text-emerald-400 mt-0.5 block">
              Open all 7 days for site visits
            </span>
          </div>

          <div className="bg-neutral-900/60 border border-neutral-800 p-5 rounded-sm">
            <div className="flex items-center gap-2 text-xs text-[#C5A869] font-mono uppercase tracking-wider mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>MahaRERA &amp; NMRDA</span>
            </div>
            <span className="text-xs font-medium text-white block font-mono">P50500077649</span>
            <span className="text-[11px] text-neutral-400 mt-0.5 block">
              100% Clear 7/12 Titles
            </span>
          </div>
        </div>

        {/* Contact Suite: Details & Interactive Callback Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Corporate Information */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-neutral-900/70 border border-neutral-800 p-8 rounded-sm space-y-6">
              <h3 className="text-xl font-serif text-white font-medium flex items-center gap-2">
                <Building className="w-5 h-5 text-[#C5A869]" />
                <span>Nagpur Corporate Headquarters</span>
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-neutral-300 font-light">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C5A869] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium mb-0.5">
                      Official Address
                    </strong>
                    <span>
                      Plot No. 14, Jaihind Society, Beside &apos;Amrut Lawn&apos;, Shyam Nagar,
                      Nagpur 440036
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-neutral-800/80">
                  <Phone className="w-5 h-5 text-[#C5A869] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium mb-0.5">Direct Hotlines</strong>
                    <div className="space-y-0.5">
                      <a
                        href="tel:+917122894500"
                        className="hover:text-[#C5A869] transition-colors block font-mono text-neutral-200"
                      >
                        +91 712 289 4500 (Sales Desk)
                      </a>
                      <a
                        href="tel:+919823045678"
                        className="hover:text-[#C5A869] transition-colors block font-mono text-neutral-200"
                      >
                        +91 98230 45678 (Direct Mobile / WhatsApp)
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-neutral-800/80">
                  <Mail className="w-5 h-5 text-[#C5A869] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium mb-0.5">Official Email</strong>
                    <div className="space-y-0.5">
                      <a
                        href="mailto:Vedmaypropertynagpur@gmail.com"
                        className="hover:text-[#C5A869] transition-colors block font-mono text-neutral-200"
                      >
                        Vedmaypropertynagpur@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-neutral-800/80">
                  <Clock className="w-5 h-5 text-[#C5A869] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium mb-0.5">
                      Consultation Hours
                    </strong>
                    <span>Monday through Sunday: 9:30 AM – 7:30 PM (IST)</span>
                    <span className="block text-[11px] text-[#C5A869] mt-0.5">
                      Open on all weekends &amp; public holidays for site visits.
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => onOpenBooking('Vedira Fortune')}
                  className="flex-1 py-3 bg-[#C5A869] hover:bg-[#B89758] text-[#14171F] text-xs font-semibold uppercase tracking-wider rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Site Visit</span>
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
              <ShieldCheck className="w-8 h-8 text-[#C5A869] shrink-0" />
              <div className="text-xs">
                <span className="text-white font-medium block">
                  MahaRERA &amp; NMRDA Registered Developer
                </span>
                <span className="text-neutral-400 font-mono text-[11px]">
                  RERA Reg: P50500077649 · Clean 7/12 titles &amp; RL sanctions
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Callback & Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-neutral-900/70 border border-neutral-800 p-8 sm:p-10 rounded-sm">
              <div className="mb-6">
                <span className="text-xs uppercase tracking-wider text-[#C5A869] font-mono block mb-1">
                  DIRECT CLIENT INQUIRY
                </span>
                <h3 className="text-2xl font-serif text-white font-normal">
                  Request Sanctioned Layouts, Price Sheet or Callback
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Fill in your details below and our Sales Advisory Desk will connect within 15
                  minutes.
                </p>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-serif text-white">Inquiry Received Successfully</h4>
                  <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto font-light">
                    Thank you,{' '}
                    <strong className="text-white">{formData.fullName || 'Valued Guest'}</strong>.
                    Our Senior Sales Advisor for {formData.project} will call you at{' '}
                    <span className="font-mono text-[#E4D2A6]">{formData.phone}</span> shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        phone: '',
                        email: '',
                        project: 'Vedira Fortune (Manish Nagar)',
                        message: '',
                      });
                    }}
                    className="mt-4 px-6 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-neutral-300 mb-2">
                        Full Name <span className="text-[#C5A869]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Anil Kumar"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-sm text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#C5A869] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-neutral-300 mb-2">
                        Phone Number <span className="text-[#C5A869]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98XXX XXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-sm text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#C5A869] transition-colors font-mono"
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
                        className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-sm text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#C5A869] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-neutral-300 mb-2">
                        Interested Project
                      </label>
                      <select
                        value={formData.project}
                        onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                        className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-sm text-sm text-white focus:outline-none focus:border-[#C5A869] transition-colors cursor-pointer"
                      >
                        <option value="Vedira Fortune (Manish Nagar)">
                          Vedira Fortune (Manish Nagar) — 3 BHK Luxury Flats
                        </option>
                        <option value="Om Shree Estate (Umred Road)">
                          Om Shree Estate (Umred Road) — NMRDA Sanctioned Plots
                        </option>
                        <option value="Sai Nagri 9 (Borekhedi)">
                          Sai Nagri 9 (Borekhedi) — Sanctioned Plots
                        </option>
                        <option value="Sai Nagri 8 (Dongergaon)">
                          Sai Nagri 8 (Dongergaon) — Sanctioned Plots
                        </option>
                        <option value="Sai Nagri 7 (Panchgaon)">
                          Sai Nagri 7 (Panchgaon) — Sanctioned Plots
                        </option>
                        <option value="Vedira Heights & Ramalay Bliss">
                          Vedira Heights &amp; Ramalay Bliss — Completed Flats
                        </option>
                        <option value="All Projects / General Advisory">
                          All Projects / Investment Advisory
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-neutral-300 mb-2">
                      Specific Requirements / Preferred Visit Time
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Share your preferred plot size or 3 BHK flat requirement, budget range, or preferred site visit date..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-sm text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#C5A869] transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[11px] text-neutral-500">
                      Your privacy is respected. Direct communication with Vedmay Infra Nagpur only.
                    </p>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-3.5 bg-[#C5A869] hover:bg-[#B89758] text-[#14171F] text-xs font-semibold uppercase tracking-wider rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
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
    </div>
  );
};
