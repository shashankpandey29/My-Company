import React, { useState } from 'react';
import { PageId, TechnologyItem } from '../types';
import { TECHNOLOGIES_DATA } from '../data/companyData';
import { PageHeader } from '../components/PageHeader';
import { SEOHead } from '../components/SEOHead';
import {
  Terminal,
  Cpu,
  Code2,
  Cloud,
  Smartphone,
  Binary,
  CheckCircle2,
  ArrowRight,
  Layers,
  Sparkles,
} from 'lucide-react';

interface TechnologiesPageProps {
  setCurrentPage: (page: PageId) => void;
}

export const TechnologiesPage: React.FC<TechnologiesPageProps> = ({ setCurrentPage }) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', 'Backend', 'Frontend / Mobile', 'Systems', 'Cloud & DevOps', 'AI & Data'];

  const filteredTechs =
    filterCategory === 'All'
      ? TECHNOLOGIES_DATA
      : TECHNOLOGIES_DATA.filter((t) => t.category === filterCategory);

  const techsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'Technologies Used by Supernova Pvt. Ltd.',
    'itemListElement': TECHNOLOGIES_DATA.map((t, idx) => ({
      '@type': 'ListItem',
      'position': idx + 1,
      'item': {
        '@type': 'ComputerLanguage',
        'name': t.name,
        'description': t.description
      }
    }))
  };

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen font-sans">
      <SEOHead
        title="Enterprise Software Technologies | Supernova Pvt. Ltd."
        description="Technologies & stacks utilized by Supernova Pvt. Ltd.: Java, .NET, Flutter, C, PHP, AWS Cloud, and Python AI solutions."
        keywords="Java software development, .NET development, Flutter app development, C systems development, PHP Laravel web development, AWS cloud architecture, Python AI development Noida"
        canonicalPath="/technologies"
        jsonLd={techsJsonLd}
      />

      <PageHeader
        title="Technologies & Frameworks"
        subtitle="Programming Languages, Mobile Frameworks, Cloud Infrastructure, and AI Stacks Utilized by Supernova Engineers."
        badge="Technology Stacks"
        setCurrentPage={setCurrentPage}
      />

      {/* Category Filter Pills */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded text-xs font-bold transition-all border ${
                filterCategory === cat
                  ? 'bg-blue-700 text-white border-blue-700 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Technologies Grid */}
      <section className="py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTechs.map((tech) => (
            <div
              key={tech.id}
              className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 font-bold">
                    <Terminal className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    {tech.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-serif">{tech.name}</h3>
                  <p className="text-slate-600 text-xs mt-1.5 leading-relaxed">{tech.description}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 border-b border-slate-100 pb-1">
                    Key Capabilities
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {tech.keyCapabilities.map((cap, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                    Primary Industry Use Cases
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {tech.useCases.map((uc, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-50 text-slate-700 border border-slate-200 font-medium"
                      >
                        {uc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => setCurrentPage('contact')}
                  className="w-full py-2 px-3 rounded bg-slate-100 hover:bg-blue-50 text-xs font-semibold text-blue-700 border border-slate-200 transition-colors flex items-center justify-center space-x-1"
                >
                  <span>Inquire About {tech.name} Projects</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
