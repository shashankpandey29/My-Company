import React from 'react';
import { PageId } from '../types';
import { COMPANY_INFO } from '../data/companyData';
import { SEOHead } from '../components/SEOHead';
import {
  AlertTriangle,
  Home,
  Code2,
  Phone,
  Search,
  ArrowRight,
  Terminal,
} from 'lucide-react';

interface NotFoundPageProps {
  setCurrentPage: (page: PageId) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ setCurrentPage }) => {
  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen flex items-center justify-center p-4 font-sans">
      <SEOHead
        title="404 Page Not Found | Supernova Pvt. Ltd."
        description="The requested page could not be found on the Supernova Pvt. Ltd. website."
        keywords="404 page not found Supernova"
        canonicalPath="/404"
      />

      <div className="max-w-xl w-full bg-white border border-slate-200 rounded-lg p-8 sm:p-12 shadow-sm space-y-8 text-center relative overflow-hidden">
        <div className="w-16 h-16 rounded bg-amber-50 border border-amber-200 text-amber-700 mx-auto flex items-center justify-center font-bold">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-amber-800 uppercase tracking-wider bg-amber-100 px-3 py-1 rounded border border-amber-200">
            HTTP 404 • Page Not Found
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 font-serif">Page Not Found</h1>
          <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            The requested page or web resource could not be found on the Supernova website.
          </p>
        </div>

        {/* Diagnostic Block */}
        <div className="bg-slate-50 p-4 rounded border border-slate-200 text-left text-xs font-mono text-slate-700 space-y-1">
          <div className="text-slate-500 flex items-center justify-between pb-1 border-b border-slate-200">
            <span>[supernova-router]</span>
            <span className="text-red-700 font-bold">404_NOT_FOUND</span>
          </div>
          <div className="text-blue-700 pt-1">&gt; Requested route resolution failed.</div>
          <div className="text-slate-600">&gt; Supernova Pvt. Ltd. • Noida, Sector 62</div>
        </div>

        {/* Direct Link Options */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setCurrentPage('home')}
            className="px-5 py-2.5 rounded bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs transition-colors flex items-center gap-2 shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </button>

          <button
            onClick={() => setCurrentPage('services')}
            className="px-5 py-2.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-semibold text-xs transition-colors flex items-center gap-2"
          >
            <Code2 className="w-4 h-4 text-blue-700" />
            <span>View Services</span>
          </button>

          <button
            onClick={() => setCurrentPage('contact')}
            className="px-5 py-2.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-semibold text-xs transition-colors flex items-center gap-2"
          >
            <Phone className="w-4 h-4 text-emerald-700" />
            <span>Contact Support</span>
          </button>
        </div>
      </div>
    </div>
  );
};
