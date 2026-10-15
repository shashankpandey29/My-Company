import React, { useState } from 'react';
import { PageId } from '../types';
import { COMPANY_INFO, OFFICE_LOCATIONS } from '../data/companyData';
import { CompanyLogo } from './CompanyLogo';
import { CompanySocialLinks } from './CompanySocialLinks';
import {
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  ArrowRight,
  Globe,
  CheckCircle2,
  Lock,
} from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const handleNavClick = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 font-sans">
      {/* Corporate Call-to-Action Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-blue-950 border-b border-blue-800/60 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
              Consult With Our Experts
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-serif mt-1">
              Accelerate Your Enterprise Software & IT Strategy
            </h3>
            <p className="mt-2 text-slate-300 text-sm max-w-2xl leading-relaxed">
              Connect with Supernova software architects in Noida, Sector 62 to evaluate your application requirements, system modernization, or IT infrastructure.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleNavClick('contact')}
              className="px-6 py-3 rounded-md text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md flex items-center gap-2"
            >
              <span>Talk to Our Experts</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className="px-5 py-3 rounded-md text-sm font-semibold bg-blue-800 hover:bg-blue-700 text-white border border-blue-600/50 transition-colors"
            >
              Explore Our Services
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand & Overview */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center">
              <CompanyLogo variant="footer" size="md" />
            </div>

            <p className="text-slate-400 text-sm leading-relaxed pr-4">{COMPANY_INFO.description}</p>

            <div className="pt-2 space-y-2 text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Headquarters: {COMPANY_INFO.headquarters}</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Certifications: {COMPANY_INFO.isoCertifications.join(' • ')}</span>
              </div>
            </div>

            {/* Newsletter Subscription Form */}
            <div className="pt-4">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
                Subscribe to Tech Insights
              </h4>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter corporate email"
                  required
                  className="bg-slate-800 border border-slate-700 rounded-md px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-xs font-semibold transition-colors"
                >
                  Subscribe
                </button>
              </form>
              {subscribed && (
                <p className="mt-1.5 text-xs text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Subscription confirmed. Thank you!
                </p>
              )}
            </div>

            {/* Connect With Us (LinkedIn Only) */}
            <div className="pt-4 border-t border-slate-800/80 space-y-2">
              <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
                Connect With Us
              </span>
              <CompanySocialLinks variant="inline" />
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              IT Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNavClick('services')}
                  className="text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  Software Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('services')}
                  className="text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  Website Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('services')}
                  className="text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  IT Support & Maintenance
                </button>
              </li>

              <li>
                <button
                  onClick={() => handleNavClick('services')}
                  className="text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  CRM / ERP Solutions
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Industry & Tech */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Industries & Tech
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNavClick('industries')}
                  className="text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  Banking & Finance
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('industries')}
                  className="text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  Healthcare Systems
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('industries')}
                  className="text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  Education & LMS
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('technologies')}
                  className="text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  Java & .NET Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('technologies')}
                  className="text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  AWS Cloud & Python AI
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Portals & Legal Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Company & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNavClick('about')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  About Supernova
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('careers')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Careers & Job Openings
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('contact')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Contact Us in Noida
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('login')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Client Portal Login
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('profile')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Client Account Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('contact')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Talk to Us / Inquiry
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('privacy')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('terms')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Corporate Headquarters & Branch Locations Block */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4">
            Corporate Headquarters & Branch Locations
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Headquarters Card */}
            <div className="bg-slate-800/80 p-4 rounded-md border border-slate-700/80 space-y-2 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="font-bold text-white flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{COMPANY_INFO.name}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold shrink-0">
                    Headquarters
                  </span>
                </div>
                <p className="text-slate-300 pl-6 leading-relaxed">{COMPANY_INFO.headquarters}</p>
              </div>
              <div className="pl-6 pt-2 border-t border-slate-700/60 flex flex-wrap gap-x-4 gap-y-1 text-slate-400 text-[11px]">
                <span>Email: <strong className="text-slate-200">{COMPANY_INFO.primaryEmail}</strong></span>
                <span>Phone: <strong className="text-slate-200">{COMPANY_INFO.phone}</strong></span>
              </div>
            </div>

            {/* Branch 1 - Virar West */}
            <div className="bg-slate-800/80 p-4 rounded-md border border-slate-700/80 space-y-2 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="font-bold text-white flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>Branch Office — Virar</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 font-semibold shrink-0">
                    Branch 1
                  </span>
                </div>
                <p className="text-slate-300 pl-6 leading-relaxed">
                  8th Floor, New Viva College, opp. Dmart, Chintamani Vihar, Y K Nagar, Virar West, Vasai-Virar, Maharashtra 401303
                </p>
              </div>
              <div className="pl-6 pt-2 border-t border-slate-700/60 flex flex-wrap gap-x-4 gap-y-1 text-slate-400 text-[11px]">
                <span>Email: <strong className="text-slate-200">{COMPANY_INFO.primaryEmail}</strong></span>
                <span>Phone: <strong className="text-slate-200">{COMPANY_INFO.phone}</strong></span>
              </div>
            </div>

            {/* Branch 2 - Goregaon (E), Mumbai */}
            <div className="bg-slate-800/80 p-4 rounded-md border border-slate-700/80 space-y-2 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="font-bold text-white flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>Branch Office — Goregaon</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 font-semibold shrink-0">
                    Branch 2
                  </span>
                </div>
                <p className="text-slate-300 pl-6 leading-relaxed">
                  Pahadi Village, Cama Industrial Estate, Goregaon (E), Mumbai, Maharashtra 400063
                </p>
              </div>
              <div className="pl-6 pt-2 border-t border-slate-700/60 flex flex-wrap gap-x-4 gap-y-1 text-slate-400 text-[11px]">
                <span>Email: <strong className="text-slate-200">{COMPANY_INFO.primaryEmail}</strong></span>
                <span>Phone: <strong className="text-slate-200">{COMPANY_INFO.phone}</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} {COMPANY_INFO.name} All rights reserved. Enterprise Software & IT Services.</p>

          <div className="flex items-center space-x-2">
            <span className="text-[11px] text-slate-500 hidden sm:inline mr-1">LinkedIn:</span>
            <CompanySocialLinks variant="compact" />
          </div>

          <div className="flex items-center space-x-6">
            <button onClick={() => handleNavClick('privacy')} className="hover:text-slate-200">
              Privacy Policy
            </button>
            <button onClick={() => handleNavClick('terms')} className="hover:text-slate-200">
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
