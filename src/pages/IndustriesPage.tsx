import React, { useState } from 'react';
import { PageId, IndustryItem } from '../types';
import { INDUSTRIES_DATA } from '../data/companyData';
import { PageHeader } from '../components/PageHeader';
import { SEOHead } from '../components/SEOHead';
import {
  Building2,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Award,
} from 'lucide-react';

interface IndustriesPageProps {
  setCurrentPage: (page: PageId) => void;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState<string>(INDUSTRIES_DATA[0].id);

  const selectedIndustry = INDUSTRIES_DATA.find((i) => i.id === activeTab) || INDUSTRIES_DATA[0];

  const industriesJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'Industries Served by Supernova Pvt. Ltd.',
    'itemListElement': INDUSTRIES_DATA.map((ind, idx) => ({
      '@type': 'ListItem',
      'position': idx + 1,
      'item': {
        '@type': 'Thing',
        'name': ind.name,
        'description': ind.tagline
      }
    }))
  };

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen font-sans">
      <SEOHead
        title="Industry Software Solutions | Supernova Pvt. Ltd."
        description="Domain-specific software engineering by Supernova Pvt. Ltd.: Banking & Finance, Healthcare, Education, Real Estate, and Retail solutions."
        keywords="banking software development, healthcare software solutions, education LMS software, real estate property management software, retail e-commerce IT company Noida"
        canonicalPath="/industries"
        jsonLd={industriesJsonLd}
      />

      <PageHeader
        title="Industries We Serve"
        subtitle="Specialized Enterprise Software & Compliance Frameworks Tailored to Domain Requirements."
        badge="Industry Vertical Solutions"
        setCurrentPage={setCurrentPage}
      />

      {/* Industry Tabs Bar */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none border-b border-slate-200">
          {INDUSTRIES_DATA.map((ind) => (
            <button
              key={ind.id}
              onClick={() => setActiveTab(ind.id)}
              className={`px-5 py-3 rounded font-bold text-xs whitespace-nowrap transition-all flex items-center space-x-2 border ${
                activeTab === ind.id
                  ? 'bg-blue-700 text-white border-blue-700 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span>{ind.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Active Industry Deep-Dive */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Challenges & Solutions */}
          <div className="lg:col-span-8 p-6 sm:p-10 space-y-8">
            <div>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
                Sector Software Engineering
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-2 font-serif">{selectedIndustry.name}</h2>
              <p className="text-emerald-700 font-semibold text-sm mt-1">{selectedIndustry.tagline}</p>
              <p className="text-slate-600 text-sm leading-relaxed mt-3">{selectedIndustry.overview}</p>
            </div>

            {/* Key Industry Challenges */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-1">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Critical Domain Challenges</span>
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {selectedIndustry.challenges.map((c, idx) => (
                  <div key={idx} className="bg-slate-50 p-3 rounded border border-slate-200 text-xs text-slate-700 flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0"></span>
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Supernova Targeted Engineering Solutions */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Supernova Tailored Solutions</span>
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {selectedIndustry.solutions.map((s, idx) => (
                  <div key={idx} className="bg-slate-50 p-3 rounded border border-slate-200 text-xs text-slate-800 font-medium flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={() => setCurrentPage('contact')}
                className="px-6 py-3 rounded bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs transition-colors flex items-center gap-2 shadow-sm"
              >
                <span>Request Consultation for {selectedIndustry.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Visual & Compliance Badges */}
          <div className="lg:col-span-4 bg-slate-50 border-t lg:border-t-0 lg:border-l border-slate-200 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="h-52 rounded overflow-hidden border border-slate-200 relative shadow-sm">
                <img
                  src={selectedIndustry.imageUrl}
                  alt={selectedIndustry.name}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-700" />
                  <span>Regulatory Compliance Protocols</span>
                </h4>
                <div className="space-y-2">
                  {selectedIndustry.complianceStandards.map((st, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-2 rounded bg-white border border-slate-200 text-xs text-slate-800 font-medium flex items-center justify-between shadow-sm"
                    >
                      <span>{st}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 rounded bg-white border border-slate-200 text-xs text-slate-700 shadow-sm">
              <p className="font-bold text-slate-900 mb-1">Direct Technical Consultation</p>
              <p className="text-slate-600">
                Engage with our software engineering leads in Noida, Sector 62 for {selectedIndustry.name} platform design.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
