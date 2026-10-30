import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, Shield, User, Mail, Phone, Building } from 'lucide-react';
import { generateBookingReference } from '../utils/calculator';
import { PROPERTIES } from '../data/properties';

interface BookingModalProps {
  initialProjectName?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  initialProjectName = 'Vedira Fortune',
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [projectName, setProjectName] = useState(initialProjectName);
  const [tourType, setTourType] = useState<'onsite' | 'virtual'>('onsite');
  const [preferredDate, setPreferredDate] = useState(
    new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
  );
  const [preferredTime, setPreferredTime] = useState('11:00 AM - 1:00 PM (Morning VIP)');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [confirmedBooking, setConfirmedBooking] = useState<{
    reference: string;
    project: string;
    date: string;
    time: string;
    type: string;
  } | null>(null);

  const validateForm = () => {
    const errs: { [key: string]: string } = {};
    if (!fullName.trim()) errs.fullName = 'Please enter your full name.';
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      errs.phone = 'Please provide a valid 10-digit phone number.';
    }
    if (!preferredDate) errs.preferredDate = 'Please select a preferred viewing date.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const ref = generateBookingReference(projectName);
    setConfirmedBooking({
      reference: ref,
      project: projectName,
      date: preferredDate,
      time: preferredTime,
      type: tourType === 'onsite' ? 'Private On-Site Walkthrough' : 'Interactive 3D Video Tour',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-neutral-950 border border-neutral-800 rounded-sm shadow-2xl p-6 sm:p-8 my-auto text-neutral-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white rounded hover:bg-neutral-900 transition-colors cursor-pointer"
          aria-label="Close Booking Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmedBooking ? (
          /* Confirmation State */
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-amber-400/10 border border-amber-400/40 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-amber-400" />
            </div>

            <span className="text-xs uppercase font-mono tracking-widest text-amber-400 block mb-1">
              Private Appointment Confirmed
            </span>
            <h3 className="text-2xl font-serif font-medium text-white mb-2">
              VIP Viewing Scheduled
            </h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto mb-6">
              Our Senior Relationship Director has reserved your private consultation slot. A calendar
              invite and entry security gate pass have been dispatched to your email.
            </p>

            {/* Pass Card */}
            <div className="bg-neutral-900 border border-neutral-800 p-5 rounded text-left space-y-2.5 text-xs font-mono mb-6">
              <div className="flex justify-between border-b border-neutral-800 pb-2">
                <span className="text-neutral-500">Booking Reference:</span>
                <span className="text-amber-400 font-bold">{confirmedBooking.reference}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-800 pb-2">
                <span className="text-neutral-500">Residence Project:</span>
                <span className="text-white">{confirmedBooking.project}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-800 pb-2">
                <span className="text-neutral-500">Date & Slot:</span>
                <span className="text-white">
                  {confirmedBooking.date} · {confirmedBooking.time}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Experience Type:</span>
                <span className="text-amber-300">{confirmedBooking.type}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setConfirmedBooking(null)}
                className="flex-1 py-2.5 border border-neutral-700 text-neutral-300 hover:text-white text-xs font-medium uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
              >
                Modify Details
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <div>
            <div className="mb-6">
              <div className="text-xs uppercase tracking-[0.2em] text-amber-400 font-medium mb-1">
                VIP Private Consultation
              </div>
              <h3 className="text-2xl font-serif font-medium text-white">
                Schedule an Exclusive Viewing
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Experience our sample suites, review architectural drawings, and consult directly with
                our engineering leadership.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Tour Experience Type Selector */}
              <div>
                <label className="block text-[11px] font-medium uppercase tracking-wider text-neutral-400 mb-1.5">
                  Experience Format
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setTourType('onsite')}
                    className={`py-2 px-3 text-xs font-medium rounded-sm border transition-colors cursor-pointer ${
                      tourType === 'onsite'
                        ? 'bg-amber-400 text-neutral-950 border-amber-400 font-semibold'
                        : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    Private On-Site Walkthrough
                  </button>
                  <button
                    type="button"
                    onClick={() => setTourType('virtual')}
                    className={`py-2 px-3 text-xs font-medium rounded-sm border transition-colors cursor-pointer ${
                      tourType === 'virtual'
                        ? 'bg-amber-400 text-neutral-950 border-amber-400 font-semibold'
                        : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    Interactive 3D Video Tour
                  </button>
                </div>
              </div>

              {/* Project Selection */}
              <div>
                <label className="block text-[11px] font-medium uppercase tracking-wider text-neutral-400 mb-1.5">
                  Project of Interest
                </label>
                <div className="relative">
                  <select
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 text-white text-xs rounded-sm px-3 py-2.5 focus:border-amber-400 focus:outline-none cursor-pointer"
                  >
                    {PROPERTIES.map((p) => (
                      <option key={p.id} value={p.title}>
                        {p.title} - {p.location} ({p.priceDisplay})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-neutral-400 mb-1.5">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 text-white text-xs rounded-sm px-3 py-2 focus:border-amber-400 focus:outline-none"
                  />
                  {errors.preferredDate && (
                    <span className="text-[11px] text-red-400 mt-0.5 block">
                      {errors.preferredDate}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-neutral-400 mb-1.5">
                    Time Window
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 text-white text-xs rounded-sm px-3 py-2 focus:border-amber-400 focus:outline-none cursor-pointer"
                  >
                    <option value="10:00 AM - 12:00 PM (Morning)">10:00 AM - 12:00 PM (Morning)</option>
                    <option value="12:00 PM - 2:00 PM (Midday)">12:00 PM - 2:00 PM (Midday)</option>
                    <option value="3:00 PM - 5:00 PM (Afternoon)">3:00 PM - 5:00 PM (Afternoon)</option>
                    <option value="5:30 PM - 7:30 PM (Sunset VIP Viewing)">
                      5:30 PM - 7:30 PM (Sunset VIP Viewing)
                    </option>
                  </select>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-neutral-400 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Rajesh Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 text-white text-xs rounded-sm px-3 py-2 focus:border-amber-400 focus:outline-none"
                    />
                    <User className="w-4 h-4 text-neutral-500 absolute right-3 top-2.5 pointer-events-none" />
                  </div>
                  {errors.fullName && (
                    <span className="text-[11px] text-red-400 mt-0.5 block">{errors.fullName}</span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-neutral-400 mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="rajesh@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800 text-white text-xs rounded-sm px-3 py-2 focus:border-amber-400 focus:outline-none"
                      />
                      <Mail className="w-4 h-4 text-neutral-500 absolute right-3 top-2.5 pointer-events-none" />
                    </div>
                    {errors.email && (
                      <span className="text-[11px] text-red-400 mt-0.5 block">{errors.email}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-neutral-400 mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="+91 98230 XXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800 text-white text-xs rounded-sm px-3 py-2 focus:border-amber-400 focus:outline-none"
                      />
                      <Phone className="w-4 h-4 text-neutral-500 absolute right-3 top-2.5 pointer-events-none" />
                    </div>
                    {errors.phone && (
                      <span className="text-[11px] text-red-400 mt-0.5 block">{errors.phone}</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-neutral-400 mb-1">
                    Special Requirements (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Interested in East-facing higher floor units with dual car parking..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 text-white text-xs rounded-sm px-3 py-2 focus:border-amber-400 focus:outline-none resize-none"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                >
                  Confirm VIP Viewing Pass
                </button>
                <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-500 mt-2">
                  <Shield className="w-3 h-3 text-emerald-400" />
                  <span>Strict confidentiality assured. No unsolicited agent calls.</span>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
