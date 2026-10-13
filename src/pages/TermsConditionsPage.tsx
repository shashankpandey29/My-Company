import React from 'react';
import { PageId } from '../types';
import { COMPANY_INFO } from '../data/companyData';
import { PageHeader } from '../components/PageHeader';
import { SEOHead } from '../components/SEOHead';
import { ShieldCheck, FileCheck, Award } from 'lucide-react';

interface TermsConditionsPageProps {
  setCurrentPage: (page: PageId) => void;
}

export const TermsConditionsPage: React.FC<TermsConditionsPageProps> = ({ setCurrentPage }) => {
  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen font-sans">
      <SEOHead
        title="Terms & Conditions | Supernova Pvt. Ltd."
        description="Read the Terms & Conditions and Master Services Agreement framework of Supernova Pvt. Ltd. located in Noida, Sector 62, Uttar Pradesh, India."
        keywords="terms and conditions Supernova Pvt Ltd, master services agreement Supernova IT Noida"
        canonicalPath="/terms"
      />

      <PageHeader
        title="Terms & Conditions"
        subtitle="Master Services Agreement Framework, Intellectual Property Assignment, and Service Level Agreements (SLA)."
        badge="Legal & Compliance"
        setCurrentPage={setCurrentPage}
      />

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 text-slate-700 text-sm leading-relaxed pb-20">
        <div className="bg-white border border-slate-200 p-6 rounded-lg space-y-3 shadow-sm">
          <div className="flex items-center space-x-2 text-blue-700 font-bold text-xs">
            <FileCheck className="w-4 h-4" />
            <span>Master Services Agreement Framework • Version 4.1</span>
          </div>
          <p className="text-xs text-slate-600">
            By accessing our portal or engaging in software services with <strong className="text-slate-900">{COMPANY_INFO.name}</strong>, headquartered in Noida, Sector 62, Uttar Pradesh, India, you agree to comply with the terms and conditions outlined below.
          </p>
        </div>

        <div className="space-y-6 bg-white border border-slate-200 p-6 sm:p-8 rounded-lg shadow-sm">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2 font-serif">
              1. Engagement & Statements of Work (SOW)
            </h2>
            <p>
              All software development projects, website deliverables, IT support commitments, and technical specifications are governed by mutual Statements of Work (SOW) executed between Supernova Pvt. Ltd. and the client.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2 font-serif">
              2. Intellectual Property (IP) Rights
            </h2>
            <p>
              Upon fulfillment of contractual payment milestones, Supernova assigns 100% full intellectual property rights, source code ownership, and technical documentation for custom software developed under the agreed Statement of Work to the client.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2 font-serif">
              3. Service Level Agreements (SLA) & IT Support
            </h2>
            <p>
              IT Support & Maintenance and cloud management services operate under defined Service Level Agreements specifying response timelines, bug fix prioritization, and uptime monitoring support.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2 font-serif">
              4. Confidentiality & Non-Disclosure
            </h2>
            <p>
              Both parties agree to protect proprietary technical data, software source code, trade secrets, and business logic under mutual non-disclosure obligations.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
