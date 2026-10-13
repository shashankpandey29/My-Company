import React from 'react';
import { PageId } from '../types';
import { COMPANY_INFO } from '../data/companyData';
import { PageHeader } from '../components/PageHeader';
import { SEOHead } from '../components/SEOHead';
import { ShieldCheck, Lock, CheckCircle2, FileText } from 'lucide-react';

interface PrivacyPolicyPageProps {
  setCurrentPage: (page: PageId) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ setCurrentPage }) => {
  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen font-sans">
      <SEOHead
        title="Privacy Policy | Supernova Pvt. Ltd."
        description="Read the Privacy Policy and Data Governance standards of Supernova Pvt. Ltd. located in Noida, Sector 62, Uttar Pradesh, India."
        keywords="privacy policy Supernova Pvt Ltd, data protection Supernova IT company"
        canonicalPath="/privacy"
      />

      <PageHeader
        title="Privacy Policy"
        subtitle="Data Governance, ISO 27001 Security Controls, and Information Protection Standards at Supernova Pvt. Ltd."
        badge="Legal & Compliance"
        setCurrentPage={setCurrentPage}
      />

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 text-slate-700 text-sm leading-relaxed pb-20">
        <div className="bg-white border border-slate-200 p-6 rounded-lg space-y-3 shadow-sm">
          <div className="flex items-center space-x-2 text-blue-700 font-bold text-xs">
            <Lock className="w-4 h-4" />
            <span>Effective Date: August 2026 • Document Version 3.4</span>
          </div>
          <p className="text-xs text-slate-600">
            This Privacy Policy governs the collection, processing, and protection of information maintained by <strong className="text-slate-900">{COMPANY_INFO.name}</strong> ("Supernova", "We", "Us") across our corporate website and IT service engagements in Noida, Sector 62, Uttar Pradesh, India.
          </p>
        </div>

        <div className="space-y-6 bg-white border border-slate-200 p-6 sm:p-8 rounded-lg shadow-sm">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2 font-serif">
              1. Information Collection Scope
            </h2>
            <p>
              Supernova collects business information required to evaluate software specifications, execute client agreements, deliver custom IT solutions, and provide technical support. This includes:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
              <li>Corporate Contact Information: Full name, corporate email address, organization name, phone number, and designation.</li>
              <li>Project Requirements: Technical specifications, RFP documents, and service inquiries submitted through our contact forms.</li>
              <li>Access Logs: Standard server web access logs, IP addresses, and session tokens utilized strictly for portal security and performance optimization.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2 font-serif">
              2. Use of Collected Data
            </h2>
            <p>Collected information is used exclusively for:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
              <li>Evaluating software project proposals and preparing official service agreements.</li>
              <li>Delivering contracted IT development, website maintenance, and CRM/ERP solutions.</li>
              <li>Ensuring platform security, monitoring operational health, and maintaining data privacy standards.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2 font-serif">
              3. Data Security Protocols
            </h2>
            <p>
              Supernova maintains rigorous technical and administrative security measures aligned with ISO/IEC 27001 standards. All data transmitted through our web portals is encrypted using TLS protocol, and server databases are protected inside secure cloud infrastructure.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2 font-serif">
              4. Inquiries & Data Rights
            </h2>
            <p>
              Clients may request details regarding their stored corporate information or inquire about privacy protocols by contacting our team at <span className="text-blue-700 font-mono font-bold">{COMPANY_INFO.primaryEmail}</span> or visiting our headquarters at Noida, Sector 62, Uttar Pradesh, India.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
