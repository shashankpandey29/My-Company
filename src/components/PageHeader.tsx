import React from 'react';
import { PageId } from '../types';
import { ChevronRight, Home } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  badge?: string;
  setCurrentPage?: (page: PageId) => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  badge,
  setCurrentPage,
}) => {
  return (
    <header className="bg-gradient-to-b from-slate-100/80 via-slate-50 to-white border-b border-slate-200 text-slate-900 py-10 md:py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Subtle Accent Gradients */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Breadcrumb Navigation */}
        {setCurrentPage && (
          <nav className="flex items-center space-x-2 text-xs text-slate-500 mb-3.5" aria-label="Breadcrumb">
            <button
              onClick={() => setCurrentPage('home')}
              className="hover:text-blue-700 flex items-center space-x-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1 py-0.5 text-slate-600 font-medium"
            >
              <Home className="w-3.5 h-3.5 text-slate-400" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-blue-900 font-semibold">{title}</span>
          </nav>
        )}

        {badge && (
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800 text-xs font-semibold mb-3 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>{badge}</span>
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 max-w-4xl font-serif leading-tight">
          {title}
        </h1>

        <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed font-normal">
          {subtitle}
        </p>
      </div>
    </header>
  );
};

