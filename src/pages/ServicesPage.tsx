import React, { useState } from 'react';
import { PageId, ServiceItem } from '../types';
import { SERVICES_DATA } from '../data/companyData';
import { PageHeader } from '../components/PageHeader';
import { SEOHead } from '../components/SEOHead';
import {
  Code2,
  Globe,
  ShieldCheck,
  Layers,
  CheckCircle2,
  ArrowRight,
  Calculator,
  X,
  Sparkles,
  ChevronRight,
  FileText,
} from 'lucide-react';

interface ServicesPageProps {
  setCurrentPage: (page: PageId) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ setCurrentPage }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [quoteCalculatorOpen, setQuoteCalculatorOpen] = useState(false);

  // Quote estimator state
  const [quoteServiceId, setQuoteServiceId] = useState<string>('software-development');
  const [projectScope, setProjectScope] = useState<'Standard' | 'Enterprise' | 'Global Architecture'>('Enterprise');
  const [timeline, setTimeline] = useState<'1-3 Months' | '3-6 Months' | '6+ Months'>('3-6 Months');

  const servicesJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'serviceType': 'IT & Software Development Services',
    'provider': {
      '@type': 'Organization',
      'name': 'Supernova Pvt. Ltd.',
      'url': 'https://supernova.com/'
    },
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Supernova IT Services Catalog',
      'itemListElement': SERVICES_DATA.map((s, idx) => ({
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': s.title,
          'description': s.shortDesc
        },
        'position': idx + 1
      }))
    }
  };

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen font-sans">
      <SEOHead
        title="Software Development & IT Services | Supernova Pvt. Ltd."
        description="Comprehensive IT & software development services by Supernova Pvt. Ltd. in Noida: custom software, website development, IT support, and CRM/ERP software."
        keywords="software development services, website development company, IT support and maintenance, CRM ERP software development Noida"
        canonicalPath="/services"
        jsonLd={servicesJsonLd}
      />

      <PageHeader
        title="IT & Software Services"
        subtitle="Custom Enterprise Software, Website Development, IT Support & Maintenance, and CRM/ERP Systems."
        badge="Services Overview"
        setCurrentPage={setCurrentPage}
      />

      {/* Services List Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-slate-200 p-6 rounded-lg shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 font-serif">
              <Sparkles className="w-5 h-5 text-blue-700" />
              <span>Tailored IT Service Delivery Models</span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Supernova Pvt. Ltd. delivers custom software engineering tailored to your enterprise operational needs.
            </p>
          </div>
          <button
            onClick={() => setQuoteCalculatorOpen(true)}
            className="px-5 py-2.5 rounded bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold transition-colors shadow flex items-center gap-2 shrink-0"
          >
            <Calculator className="w-4 h-4 text-emerald-300" />
            <span>Interactive Cost & Scope Estimator</span>
          </button>
        </div>

        <div className="space-y-8">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow grid grid-cols-1 lg:grid-cols-12"
            >
              <div className="lg:col-span-8 p-6 sm:p-8 space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded bg-blue-900 text-white flex items-center justify-center shrink-0">
                    {service.id === 'software-development' && <Code2 className="w-6 h-6 text-emerald-400" />}
                    {service.id === 'website-development' && <Globe className="w-6 h-6 text-emerald-400" />}
                    {service.id === 'it-support-maintenance' && <ShieldCheck className="w-6 h-6 text-emerald-400" />}
                    {service.id === 'crm-erp-solutions' && <Layers className="w-6 h-6 text-emerald-400" />}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 font-serif">{service.title}</h3>
                    <p className="text-xs text-blue-700 font-semibold uppercase tracking-wider mt-0.5">Enterprise Service Pillar</p>
                  </div>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">{service.fullDesc}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase text-slate-900 tracking-wider mb-2 border-b border-slate-100 pb-1">
                      Key Capabilities
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {service.keyFeatures.map((feat, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase text-slate-900 tracking-wider mb-2 border-b border-slate-100 pb-1">
                      Deliverables & Outcomes
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {service.deliverables.map((deliv, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-slate-500 font-medium mr-2">Technologies Used:</span>
                  {service.technologiesUsed.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-4 flex items-center space-x-4 border-t border-slate-100">
                  <button
                    onClick={() => setCurrentPage('contact')}
                    className="px-5 py-2.5 rounded bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold transition-colors flex items-center space-x-2 shadow-sm"
                  >
                    <span>Request Proposal for {service.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-4 bg-slate-50 border-t lg:border-t-0 lg:border-l border-slate-200 p-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="h-44 rounded overflow-hidden border border-slate-200 relative shadow-inner">
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-2 text-xs text-slate-600 bg-white p-3 rounded border border-slate-200 shadow-sm">
                    <div className="flex justify-between">
                      <span className="font-medium text-slate-500">Deployment Model:</span>
                      <span className="font-semibold text-slate-900">Cloud / On-Prem VPC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-slate-500">IP Transfer:</span>
                      <span className="font-semibold text-emerald-700">100% Client Code IP</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-slate-500">Quality Standard:</span>
                      <span className="font-semibold text-blue-700">ISO 27001 Security</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setQuoteServiceId(service.id);
                    setQuoteCalculatorOpen(true);
                  }}
                  className="w-full mt-4 py-2 px-3 rounded bg-white hover:bg-slate-100 text-xs font-semibold text-slate-800 border border-slate-300 transition-colors text-center"
                >
                  Estimate Engagement Parameters
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Quote Estimator Modal */}
      {quoteCalculatorOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-300 rounded-lg max-w-xl w-full p-6 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setQuoteCalculatorOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded bg-blue-900 text-white">
                <Calculator className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-serif">Service Engagement Estimator</h3>
                <p className="text-xs text-slate-500">Estimate project horizon and engineering team parameters</p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">Selected Service Pillar</label>
                <select
                  value={quoteServiceId}
                  onChange={(e) => setQuoteServiceId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  {SERVICES_DATA.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">Architecture Scope</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Standard', 'Enterprise', 'Global Architecture'] as const).map((sc) => (
                    <button
                      key={sc}
                      type="button"
                      onClick={() => setProjectScope(sc)}
                      className={`py-2 px-2 rounded border text-center transition-colors ${
                        projectScope === sc
                          ? 'bg-blue-700 text-white border-blue-700 font-bold'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {sc}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">Target Delivery Horizon</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['1-3 Months', '3-6 Months', '6+ Months'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTimeline(t)}
                      className={`py-2 px-2 rounded border text-center transition-colors ${
                        timeline === t
                          ? 'bg-blue-700 text-white border-blue-700 font-bold'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded border border-slate-200 space-y-2">
                <div className="font-bold text-slate-900 text-xs">Engagement Estimate Summary:</div>
                <div className="flex justify-between text-slate-600">
                  <span>Selected Pillar:</span>
                  <span className="font-bold text-blue-700">
                    {SERVICES_DATA.find((s) => s.id === quoteServiceId)?.title}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Target Scope:</span>
                  <span className="font-semibold text-slate-900">{projectScope} ({timeline})</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Quality Baseline:</span>
                  <span className="text-emerald-700 font-semibold">ISO 27001 & NDA Included</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setQuoteCalculatorOpen(false);
                  setCurrentPage('contact');
                }}
                className="w-full py-3 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors text-center shadow"
              >
                Proceed to Contact Form With These Parameters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
