import React, { useState, useEffect } from 'react';
import { SERVICES_DATA } from '../data/companyData';
import { saveContactInquiry } from '../lib/storage';
import {
  X,
  Send,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Building2,
  Mail,
  User,
  Phone,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

interface TalkToUsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TARGET_GMAIL = 'pandeyshashank520@gmail.com';

export const TalkToUsModal: React.FC<TalkToUsModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    corporateEmail: '',
    phone: '',
    organization: '',
    serviceRequested: SERVICES_DATA[0]?.id || 'software-development',
    budgetRange: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.fullName.trim() || !formData.corporateEmail.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setLoading(true);

    try {
      const selectedService =
        SERVICES_DATA.find((s) => s.id === formData.serviceRequested)?.title || formData.serviceRequested;

      // 1. Dispatch directly to pandeyshashank520@gmail.com via FormSubmit
      const externalDispatch = fetch(`https://formsubmit.co/ajax/${TARGET_GMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `New Project Inquiry from ${formData.fullName} (Talk To Us)`,
          _template: 'table',
          'Client Name': formData.fullName,
          'Corporate Email': formData.corporateEmail,
          'Contact Phone': formData.phone || 'Not provided',
          'Organization / Company': formData.organization || 'Not provided',
          'Service Requested': selectedService,
          'Estimated Budget Range': formData.budgetRange,
          'Project Requirements': formData.message,
          _captcha: 'false',
        }),
      }).catch((err) => console.warn('FormSubmit external dispatch:', err));

      // 2. Local server API bridge dispatch
      const serverDispatch = fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          corporateEmail: formData.corporateEmail,
          phone: formData.phone,
          organization: formData.organization,
          serviceRequested: selectedService,
          budgetRange: formData.budgetRange,
          message: formData.message,
        }),
      }).catch((err) => console.warn('Server contact route notification:', err));

      // 3. Save to local storage
      saveContactInquiry({
        full_name: formData.fullName.trim(),
        corporate_email: formData.corporateEmail.trim(),
        phone: formData.phone.trim() || null,
        organization: formData.organization.trim() || null,
        service_requested: selectedService,
        budget_range: formData.budgetRange,
        message: formData.message.trim(),
        status: 'new',
      });

      // Await network dispatches or timeout smoothly
      await Promise.race([
        Promise.all([externalDispatch, serverDispatch]),
        new Promise((resolve) => setTimeout(resolve, 1400)),
      ]);

      setSubmitted(true);
      setLoading(false);
    } catch (err: any) {
      console.error('Submission error:', err);
      // Graceful fallback
      setSubmitted(true);
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      corporateEmail: '',
      phone: '',
      organization: '',
      serviceRequested: SERVICES_DATA[0]?.id || 'software-development',
      budgetRange: '',
      message: '',
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog Container */}
      <div className="flex min-h-full items-center justify-center p-3 sm:p-6">
        <div
          className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 text-slate-800 overflow-hidden transform transition-all my-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-blue-950 px-6 py-5 text-white flex items-start justify-between">
            <div className="space-y-1 pr-6">
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-semibold tracking-wide uppercase">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <span>Enterprise Consultation</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif tracking-tight text-white flex items-center gap-2">
                Talk to Us
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Share your software or IT requirements with our engineering specialists.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8">
            {submitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto text-emerald-600 shadow-sm animate-in zoom-in-50 duration-300">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
                  Thank you, Submitted successfully
                </h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  Our engineering team has received your project details and will connect with you within 24 hours.
                </p>
                <div className="pt-4 flex items-center justify-center gap-3">
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-md bg-blue-700 hover:bg-blue-800 text-white font-medium text-xs transition-colors cursor-pointer shadow-xs"
                  >
                    Done
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-4 py-2.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs transition-colors cursor-pointer"
                  >
                    Send Another Response
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {errorMessage && (
                  <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Vikram Malhotra"
                        className="w-full bg-slate-50 border border-slate-300 rounded-md pl-9 pr-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1.5">
                      Work Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                      <input
                        type="email"
                        required
                        value={formData.corporateEmail}
                        onChange={(e) => setFormData({ ...formData, corporateEmail: e.target.value })}
                        placeholder="v.malhotra@company.com"
                        className="w-full bg-slate-50 border border-slate-300 rounded-md pl-9 pr-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1.5">Phone Number</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-slate-50 border border-slate-300 rounded-md pl-9 pr-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1.5">Company / Organization</label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                      <input
                        type="text"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="Company or Organization"
                        className="w-full bg-slate-50 border border-slate-300 rounded-md pl-9 pr-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1.5">Service Requested</label>
                    <select
                      value={formData.serviceRequested}
                      onChange={(e) => setFormData({ ...formData, serviceRequested: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-md px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-colors cursor-pointer"
                    >
                      {SERVICES_DATA.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1.5">Your Budget</label>
                    <input
                      type="text"
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      placeholder="Write your budget (e.g. ₹5,00,000, $20,000)"
                      className="w-full bg-slate-50 border border-slate-300 rounded-md px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1.5">
                    Project Requirements / Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your project objectives, scope, target timeline, or tech stack requirements..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-md p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-colors resize-none leading-relaxed"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-md text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 rounded-md text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs hover:shadow-md transition-all flex items-center space-x-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Proposal</span>
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
  );
};
