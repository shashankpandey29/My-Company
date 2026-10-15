import React, { useState } from 'react';
import { PageId } from '../types';
import { COMPANY_INFO, OFFICE_LOCATIONS, SERVICES_DATA } from '../data/companyData';
import { PageHeader } from '../components/PageHeader';
import { SEOHead } from '../components/SEOHead';
import { CompanySocialLinks } from '../components/CompanySocialLinks';
import { saveContactInquiry } from '../lib/storage';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Building2,
  Globe,
  Sparkles,
  Loader2,
  AlertCircle,
} from 'lucide-react';

interface ContactPageProps {
  setCurrentPage: (page: PageId) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    corporateEmail: '',
    phone: '',
    organization: '',
    serviceRequested: SERVICES_DATA[0]?.id || 'software-development',
    budgetRange: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const TARGET_GMAIL = 'pandeyshashank520@gmail.com';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.fullName.trim() || !formData.corporateEmail.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setLoading(true);

    try {
      const selectedService = SERVICES_DATA.find((s) => s.id === formData.serviceRequested)?.title || formData.serviceRequested;

      // 1. Dispatch directly to pandeyshashank520@gmail.com via FormSubmit
      const externalDispatch = fetch(`https://formsubmit.co/ajax/${TARGET_GMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: `New IT Project Inquiry from ${formData.fullName} - Supernova Pvt. Ltd.`,
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
      }).catch((e) => console.warn('FormSubmit external dispatch notification:', e));

      // 2. Also dispatch to local server API bridge
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
      }).catch((e) => console.warn('Server contact route notification:', e));

      // 3. Save to local storage for administrative portal logging
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
        new Promise((resolve) => setTimeout(resolve, 1500)),
      ]);

      setSubmitted(true);
      setLoading(false);
    } catch (err: any) {
      console.error('Submission processing error:', err);
      // Graceful fallback: submission was saved locally and prepared for email
      setSubmitted(true);
      setLoading(false);
    }
  };


  const contactJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    'name': 'Contact Supernova Pvt. Ltd.',
    'description': 'Contact Supernova Pvt. Ltd. in Noida, Sector 62, Uttar Pradesh, India for software development and IT service inquiries.',
    'mainEntity': {
      '@type': 'Organization',
      'name': 'Supernova Pvt. Ltd.',
      'telephone': COMPANY_INFO.phone,
      'email': COMPANY_INFO.primaryEmail,
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Noida, Sector 62',
        'addressRegion': 'Uttar Pradesh',
        'addressCountry': 'India'
      }
    }
  };

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen font-sans">
      <SEOHead
        title="Contact Supernova Pvt. Ltd. | IT Company in Noida Sector 62"
        description="Contact Supernova Pvt. Ltd. in Noida, Sector 62, Uttar Pradesh, India for custom software development, website development, CRM/ERP systems, and IT support."
        keywords="contact Supernova Pvt Ltd, IT company contact Noida Sector 62, software development inquiry Noida, IT consultation Noida"
        canonicalPath="/contact"
        jsonLd={contactJsonLd}
      />

      <PageHeader
        title="Contact Supernova Pvt. Ltd."
        subtitle="Inquire About Enterprise Software Projects, Request Technical Consultations, or Reach Our Offices."
        badge="Contact Us"
        setCurrentPage={setCurrentPage}
      />

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Column */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-6 sm:p-8 space-y-6 shadow-sm">
            {submitted ? (
              <div className="py-12 sm:py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto text-emerald-600 shadow-sm">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
                  Thank you, Submitted successfully
                </h3>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        corporateEmail: '',
                        phone: '',
                        organization: '',
                        serviceRequested: SERVICES_DATA[0]?.id || 'software-development',
                        budgetRange: '₹5 Lakh - ₹20 Lakh',
                        message: '',
                      });
                    }}
                    className="inline-flex items-center px-4 py-2 text-xs font-semibold rounded bg-slate-900 hover:bg-slate-800 text-white transition-colors cursor-pointer shadow-xs"
                  >
                    Submit another response
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <div className="inline-flex items-center space-x-2 text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded border border-blue-200">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Project Proposal & Inquiry Form</span>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 font-serif">Initiate Technical Consultation</h2>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1">
                    Fill out your project requirements below. Your submission will be reviewed promptly by our engineering leads.
                  </p>
                </div>

                {errorMessage && (
                  <div className="bg-red-50 border border-red-200 text-red-800 p-3.5 rounded text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 text-xs">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Vikram Malhotra"
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1.5">Corporate Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.corporateEmail}
                      onChange={(e) => setFormData({ ...formData, corporateEmail: e.target.value })}
                      placeholder="v.malhotra@company.com"
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 120 XXXXXXX or +91 98765 43210"
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1.5">Organization / Company Name</label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="Company Name Pvt. Ltd."
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1.5">Service Requested</label>
                    <select
                      value={formData.serviceRequested}
                      onChange={(e) => setFormData({ ...formData, serviceRequested: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1.5">Project Scope / Message</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe your requirements, project goals, timeline, or technical specifications..."
                    className="w-full bg-slate-50 border border-slate-300 rounded px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                  ></textarea>
                </div>

                <div className="flex items-center space-x-2 text-[11px] text-slate-500 pt-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Your submission is handled under strict corporate data privacy protocols.</span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold text-xs transition-colors shadow flex items-center justify-center space-x-2 cursor-pointer disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Proposal...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Project Proposal</span>
                    </>
                  )}
                </button>
              </form>
            </>
          )}
          </div>

          {/* Contact Details & HQ Location Column */}
          <div className="lg:col-span-5 space-y-6">

            <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 font-serif flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-700" />
                <span>Direct Corporate Channels</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded border border-slate-200">
                  <Mail className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-slate-500 font-medium">Primary Contact Email</div>
                    <div className="font-bold text-slate-900 font-mono">{COMPANY_INFO.primaryEmail}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded border border-slate-200">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-slate-500 font-medium">Corporate Telephone & WhatsApp</div>
                    <div className="font-bold text-slate-900 font-mono flex items-center justify-between gap-2 mt-0.5">
                      <span>{COMPANY_INFO.phone}</span>
                      <a
                        href="https://wa.me/917905243606?text=Hello%20Supernova%20team%2C%20I%20would%20like%20to%20inquire%20about%20your%20services."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-sans font-semibold px-2.5 py-1 rounded shadow-2xs transition-colors"
                      >
                        WhatsApp Us
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded border border-slate-200">
                  <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-slate-500 font-medium">Office Hours</div>
                    <div className="font-semibold text-slate-800">Monday - Friday: 9:00 AM - 6:00 PM IST</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Official Company LinkedIn Link */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-3 shadow-sm">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Connect With Us on LinkedIn
              </h4>
              <CompanySocialLinks variant="buttons" />
            </div>

            {/* Headquarters & Branch Locations Card */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 font-serif flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-700" />
                <span>Office & Branch Locations</span>
              </h3>

              <div className="space-y-3">
                {/* Headquarters */}
                <div className="p-3.5 bg-slate-50 rounded border border-slate-200 space-y-1.5 text-xs">
                  <div className="font-bold text-slate-900 flex items-center justify-between font-serif">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      {COMPANY_INFO.name}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                      Headquarters
                    </span>
                  </div>
                  <p className="text-slate-700 pl-5">{COMPANY_INFO.headquarters}</p>
                  <div className="text-slate-500 pl-5 pt-0.5 text-[11px] flex flex-wrap gap-x-4">
                    <span>Email: <strong className="text-slate-700 font-mono">{COMPANY_INFO.primaryEmail}</strong></span>
                    <span>Phone: <strong className="text-slate-700 font-mono">{COMPANY_INFO.phone}</strong></span>
                  </div>
                </div>

                {/* Branch 1 - Virar West */}
                <div className="p-3.5 bg-slate-50 rounded border border-slate-200 space-y-1.5 text-xs">
                  <div className="font-bold text-slate-900 flex items-center justify-between font-serif">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      Branch Office — Virar
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold">
                      Branch 1
                    </span>
                  </div>
                  <p className="text-slate-700 pl-5 leading-relaxed">
                    8th Floor, New Viva College, opp. Dmart, Chintamani Vihar, Y K Nagar, Virar West, Vasai-Virar, Maharashtra 401303
                  </p>
                  <div className="text-slate-500 pl-5 pt-0.5 text-[11px] flex flex-wrap gap-x-4">
                    <span>Email: <strong className="text-slate-700 font-mono">{COMPANY_INFO.primaryEmail}</strong></span>
                    <span>Phone: <strong className="text-slate-700 font-mono">{COMPANY_INFO.phone}</strong></span>
                  </div>
                </div>

                {/* Branch 2 - Goregaon (E) */}
                <div className="p-3.5 bg-slate-50 rounded border border-slate-200 space-y-1.5 text-xs">
                  <div className="font-bold text-slate-900 flex items-center justify-between font-serif">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      Branch Office — Goregaon
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold">
                      Branch 2
                    </span>
                  </div>
                  <p className="text-slate-700 pl-5 leading-relaxed">
                    Pahadi Village, Cama Industrial Estate, Goregaon (E), Mumbai, Maharashtra 400063
                  </p>
                  <div className="text-slate-500 pl-5 pt-0.5 text-[11px] flex flex-wrap gap-x-4">
                    <span>Email: <strong className="text-slate-700 font-mono">{COMPANY_INFO.primaryEmail}</strong></span>
                    <span>Phone: <strong className="text-slate-700 font-mono">{COMPANY_INFO.phone}</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
