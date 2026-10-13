import React from 'react';
import { PageId } from '../types';
import { COMPANY_INFO, OFFICE_LOCATIONS } from '../data/companyData';
import { PageHeader } from '../components/PageHeader';
import { SEOHead } from '../components/SEOHead';
import {
  Building2,
  CheckCircle2,
  ShieldCheck,
  Target,
  Award,
  Users,
  MapPin,
  Workflow,
  Cpu,
  Lock,
  ArrowRight,
  Mail,
  Phone,
} from 'lucide-react';

interface AboutPageProps {
  setCurrentPage: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ setCurrentPage }) => {
  const aboutJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    'name': 'About Supernova Pvt. Ltd.',
    'description': 'Supernova Pvt. Ltd. is an enterprise IT services and software development company based in Noida, Sector 62, Uttar Pradesh, India.',
    'publisher': {
      '@type': 'Organization',
      'name': 'Supernova Pvt. Ltd.',
      'url': 'https://supernovaglobal.com/'
    }
  };

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen font-sans">
      <SEOHead
        title="About Supernova Pvt. Ltd. | IT Services Company in Noida"
        description="Learn about Supernova Pvt. Ltd., an enterprise software development and IT services company headquartered in Noida, Sector 62, Uttar Pradesh, India."
        keywords="about Supernova Pvt Ltd, IT company in Noida Sector 62, software development company profile, enterprise IT partner Noida"
        canonicalPath="/about"
        jsonLd={aboutJsonLd}
      />

      <PageHeader
        title="About Supernova Pvt. Ltd."
        subtitle="Enterprise Software Engineering & IT Solutions Company Headquartered in Noida, India."
        badge="Company Overview"
        setCurrentPage={setCurrentPage}
      />

      {/* Corporate Overview Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded border border-blue-200">
              Who We Are
            </span>

            <h2 className="text-3xl font-extrabold text-slate-900 font-serif leading-tight">
              Enterprise Software & Technology Solutions Partner
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              <strong className="text-slate-900">{COMPANY_INFO.name}</strong> is a dedicated IT services and software engineering company located in Noida, Sector 62, Uttar Pradesh, India. We specialize in building custom software applications, web portals, cloud infrastructure, and CRM/ERP systems.
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We partner with organizations to modernize legacy software systems, build distributed APIs, and maintain high operational reliability through SLA-backed IT support.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
                <div className="flex items-center space-x-2 text-blue-700 font-bold mb-2 text-sm font-serif">
                  <Target className="w-5 h-5 text-emerald-600" />
                  <span>Engineering Focus</span>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Building stable, well-architected software systems tailored precisely to complex corporate workflows and business logic.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
                <div className="flex items-center space-x-2 text-blue-700 font-bold mb-2 text-sm font-serif">
                  <Workflow className="w-5 h-5 text-blue-600" />
                  <span>Development Standards</span>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Clean modular codebases, comprehensive documentation, automated test integration, and strict security compliance.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-md space-y-6">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-3 flex items-center gap-2 font-serif">
                <Award className="w-5 h-5 text-blue-700" />
                <span>Company Credentials</span>
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <div className="text-slate-500 font-medium">Company Name</div>
                  <div className="text-sm font-bold text-slate-900">{COMPANY_INFO.name}</div>
                </div>

                <div>
                  <div className="text-slate-500 font-medium">Headquarters Location</div>
                  <div className="text-sm font-semibold text-slate-800">{COMPANY_INFO.headquarters}</div>
                </div>

                <div>
                  <div className="text-slate-500 font-medium">Primary Contact Details</div>
                  <div className="text-xs text-slate-700 mt-1 space-y-1 font-mono">
                    <div>Email: {COMPANY_INFO.primaryEmail}</div>
                    <div>Phone: {COMPANY_INFO.phone}</div>
                  </div>
                </div>

                <div>
                  <div className="text-slate-500 font-medium">Security & Quality Standards</div>
                  <div className="mt-2 space-y-1.5">
                    {COMPANY_INFO.isoCertifications.map((cert, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-emerald-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Principles */}
      <section className="py-16 bg-slate-100 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-12">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded border border-blue-200">
              Development Standards
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 font-serif">Core Engineering Principles</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-serif">1. Modular Architecture</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Structured application design, clear API contracts, and clean code principles to simplify future maintenance and feature expansion.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-serif">2. Security & Compliance</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Implementation of standard encryption protocols, secure token authentication, role-based access controls, and data protection guidelines.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-serif">3. Reliability & Support</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Continuous operational monitoring, automated backup verification, bug fixing, and structured SLA-backed IT maintenance schedules.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Headquarters & Branch Locations Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded border border-blue-200">
            Office Locations
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 font-serif">Headquarters & Branch Offices</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Headquarters */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="font-bold text-slate-900 text-sm flex items-center space-x-2 font-serif">
                  <Building2 className="w-4 h-4 text-blue-700" />
                  <span>{COMPANY_INFO.name}</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                  Headquarters
                </span>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Address</span>
                    <span>{COMPANY_INFO.headquarters}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Mail className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Email</span>
                    <span className="font-mono">{COMPANY_INFO.primaryEmail}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Phone</span>
                    <span className="font-mono">{COMPANY_INFO.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setCurrentPage('contact')}
                className="px-3.5 py-1.5 rounded bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>Contact Office</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Branch 1 - Virar West */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="font-bold text-slate-900 text-sm flex items-center space-x-2 font-serif">
                  <Building2 className="w-4 h-4 text-blue-700" />
                  <span>Branch Office — Virar</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold">
                  Branch 1
                </span>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Address</span>
                    <span>8th Floor, New Viva College, opp. Dmart, Chintamani Vihar, Y K Nagar, Virar West, Vasai-Virar, Maharashtra 401303</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Mail className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Email</span>
                    <span className="font-mono">{COMPANY_INFO.primaryEmail}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Phone</span>
                    <span className="font-mono">{COMPANY_INFO.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setCurrentPage('contact')}
                className="px-3.5 py-1.5 rounded bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>Contact Office</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Branch 2 - Goregaon (E) */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="font-bold text-slate-900 text-sm flex items-center space-x-2 font-serif">
                  <Building2 className="w-4 h-4 text-blue-700" />
                  <span>Branch Office — Goregaon</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold">
                  Branch 2
                </span>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Address</span>
                    <span>Pahadi Village, Cama Industrial Estate, Goregaon (E), Mumbai, Maharashtra 400063</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Mail className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Email</span>
                    <span className="font-mono">{COMPANY_INFO.primaryEmail}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Phone</span>
                    <span className="font-mono">{COMPANY_INFO.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setCurrentPage('contact')}
                className="px-3.5 py-1.5 rounded bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>Contact Office</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
