import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { PageId } from '../types';
import { COMPANY_INFO, SERVICES_DATA, INDUSTRIES_DATA, TECHNOLOGIES_DATA } from '../data/companyData';
import { SEOHead } from '../components/SEOHead';
import { ScrollToTop } from '../components/ScrollToTop';
import {
  ArrowRight,
  ShieldCheck,
  Cpu,
  Code2,
  Globe,
  Layers,
  CheckCircle2,
  Lock,
  Building2,
  ChevronRight,
  Terminal,
  Server,
  Workflow,
  MapPin,
  Clock,
  Phone,
  Mail,
  Users,
  Award,
  Zap,
} from 'lucide-react';

interface HomePageProps {
  setCurrentPage: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setCurrentPage }) => {
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  const homeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ITBusiness',
    'name': 'Supernova Pvt. Ltd.',
    'description': 'Enterprise Software Development & IT Services Company located in Noida, Sector 62, Uttar Pradesh, India.',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Noida, Sector 62',
      'addressRegion': 'Uttar Pradesh',
      'addressCountry': 'India'
    },
    'url': 'https://supernovaglobal.com/',
    'telephone': COMPANY_INFO.phone,
    'email': COMPANY_INFO.primaryEmail
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: (customDelay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.5,
        delay: shouldReduceMotion ? 0 : customDelay,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    }),
  };

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen font-sans">
      <SEOHead
        title="Enterprise Software Development & IT Services Company in Noida"
        description="Supernova Pvt. Ltd. is a leading enterprise software development and IT services company based in Noida, Sector 62, Uttar Pradesh, India. Custom software, web applications, CRM/ERP systems, and managed IT services."
        keywords="software development company, IT services company, web development company, enterprise software development, CRM ERP solutions, IT support and maintenance, software development company in Noida, IT company in Noida Sector 62, Supernova Pvt Ltd"
        canonicalPath="/"
        jsonLd={homeJsonLd}
      />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="bg-gradient-to-b from-slate-100/90 via-slate-50 to-white text-slate-800 relative py-16 md:py-20 border-b border-slate-200 overflow-hidden"
      >
        {/* Subtle background glow accents */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 -mb-20 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge */}
              <motion.div
                custom={0.05}
                initial="hidden"
                animate="visible"
                variants={fadeUpVariant}
                className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-semibold text-blue-900 shadow-2xs"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                <span>Supernova Pvt. Ltd. • Enterprise IT Solutions</span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                custom={0.18}
                initial="hidden"
                animate="visible"
                variants={fadeUpVariant}
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-slate-900 font-serif leading-tight"
              >
                Enterprise <span className="text-emerald-600">Software</span> Development & <span className="text-emerald-600">IT Services</span> Company
              </motion.h1>

              {/* Subheading Paragraph */}
              <motion.p
                custom={0.3}
                initial="hidden"
                animate="visible"
                variants={fadeUpVariant}
                className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal"
              >
                Supernova Pvt. Ltd. provides custom software engineering, scalable web application development, enterprise <span className="text-emerald-700 font-semibold">CRM & ERP platforms</span>, and 24/7 managed IT support for organizations in India and globally.
              </motion.p>

              {/* Bullet Highlights */}
              <motion.div
                custom={0.42}
                initial="hidden"
                animate="visible"
                variants={fadeUpVariant}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-slate-700 font-medium"
              >
                {[
                  'Custom Enterprise Architecture',
                  '24/7 Managed IT Support & Maintenance',
                  'ISO 27001 Security Standards',
                  'Enterprise CRM & ERP Solutions',
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    custom={0.45 + idx * 0.08}
                    initial="hidden"
                    animate="visible"
                    variants={fadeUpVariant}
                    className="flex items-center space-x-2"
                  >
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0 drop-shadow-[0_0_4px_rgba(52,211,153,0.3)]" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Primary & Secondary CTAs */}
              <motion.div
                custom={0.65}
                initial="hidden"
                animate="visible"
                variants={fadeUpVariant}
                className="flex flex-wrap items-center gap-4 pt-4"
              >
                <button
                  onClick={() => setCurrentPage('contact')}
                  className="px-6 py-3.5 rounded-md font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex items-center space-x-2 text-sm cursor-pointer"
                >
                  <span>Talk to Our Experts</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setCurrentPage('services')}
                  className="px-6 py-3.5 rounded-md font-semibold bg-blue-700 hover:bg-blue-800 text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-sm cursor-pointer"
                >
                  Explore Our Services
                </button>
              </motion.div>
            </div>

            {/* Hero Right Visual Column with Fade-In + Subtle Floating Animation */}
            <motion.div
              custom={0.4}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariant}
              className="lg:col-span-5"
            >
              <motion.div
                animate={shouldReduceMotion ? {} : { y: [0, -5, 0] }}
                transition={
                  shouldReduceMotion
                    ? {}
                    : { duration: 5, repeat: Infinity, ease: 'easeInOut' }
                }
                className="bg-[#0B1630] border border-slate-800 rounded-lg overflow-hidden shadow-2xl group"
              >
                <div className="overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                    alt="IT professionals working at Supernova Pvt. Ltd. headquarters in Noida"
                    referrerPolicy="no-referrer"
                    loading="eager"
                    className="w-full h-56 object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                  />
                </div>
                <div className="p-6 space-y-4 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                    <span className="font-bold text-white text-sm">Supernova Pvt. Ltd. Operations</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono text-[10px] shadow-[0_0_10px_rgba(52,211,153,0.15)] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      Verified IT Enterprise
                    </span>
                  </div>

                  <div className="space-y-2 text-slate-300">
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Headquarters:</strong> Noida, Sector 62, Uttar Pradesh, India</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <span><strong>Governance:</strong> Strict NDA Protection & Security Baseline</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-700">
                    <span>Engineering Excellence</span>
                    <button
                      onClick={() => setCurrentPage('about')}
                      className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <span>About Company</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: shouldReduceMotion ? 0.1 : 0.5 }}
          className="text-center space-y-3 mb-12"
        >
          <span className="text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded border border-blue-200">
            Enterprise Services Scope
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif">
            Core IT & Software Services
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
            End-to-end IT services, custom software engineering, and digital solutions designed for operational reliability and corporate performance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_DATA.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: shouldReduceMotion ? 0.1 : 0.45,
                delay: shouldReduceMotion ? 0 : (idx % 4) * 0.1,
              }}
              className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={service.imageUrl}
                    alt={`${service.title} by Supernova Pvt. Ltd.`}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-blue-900 text-white p-2 rounded-md shadow">
                    {service.id === 'software-development' && <Code2 className="w-5 h-5" />}
                    {service.id === 'website-development' && <Globe className="w-5 h-5" />}
                    {service.id === 'it-support-maintenance' && <ShieldCheck className="w-5 h-5" />}
                    {service.id === 'crm-erp-solutions' && <Layers className="w-5 h-5" />}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors font-serif">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{service.shortDesc}</p>

                  <ul className="space-y-1.5 pt-2 text-xs text-slate-700">
                    {service.keyFeatures.slice(0, 3).map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0"></span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={() => setCurrentPage('services')}
                  className="w-full py-2.5 px-4 rounded bg-slate-100 hover:bg-blue-50 text-blue-700 font-semibold text-xs transition-colors flex items-center justify-center space-x-1.5 border border-slate-200 cursor-pointer"
                >
                  <span>Learn More About {service.title}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Industries Capability Section */}
      <section className="py-16 bg-slate-100 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: shouldReduceMotion ? 0.1 : 0.5 }}
            className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4"
          >
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded border border-emerald-200">
                Industry Vertical Solutions
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 font-serif mt-2">
                Specialized Sector Software Engineering
              </h2>
            </div>
            <button
              onClick={() => setCurrentPage('industries')}
              className="text-sm font-semibold text-blue-700 hover:text-blue-800 flex items-center space-x-1 cursor-pointer"
            >
              <span>View All Supported Industries</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {INDUSTRIES_DATA.map((ind, idx) => (
              <motion.div
                key={ind.id}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: shouldReduceMotion ? 0.1 : 0.4,
                  delay: shouldReduceMotion ? 0 : idx * 0.08,
                }}
                onClick={() => setCurrentPage('industries')}
                className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group flex flex-col justify-between hover:-translate-y-0.5"
              >
                <div>
                  <div className="h-32 overflow-hidden relative">
                    <img
                      src={ind.imageUrl}
                      alt={`${ind.name} IT solutions by Supernova`}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 space-y-1">
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-700 transition-colors font-serif">
                      {ind.name}
                    </h3>
                    <p className="text-slate-600 text-xs line-clamp-2">{ind.tagline}</p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <span className="text-[11px] font-semibold text-blue-700 flex items-center gap-1 group-hover:underline">
                    Explore Solutions <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Capabilities */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: shouldReduceMotion ? 0.1 : 0.5 }}
          className="text-center space-y-3 mb-12"
        >
          <span className="text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded border border-blue-200">
            Technology Stacks
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif">
            Enterprise Technology Capabilities
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm">
            Supernova Pvt. Ltd. leverages modern, battle-tested programming languages, frameworks, and cloud platforms.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
          {TECHNOLOGIES_DATA.map((tech, idx) => (
            <motion.div
              key={tech.id}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{
                duration: shouldReduceMotion ? 0.1 : 0.35,
                delay: shouldReduceMotion ? 0 : idx * 0.05,
              }}
              onClick={() => setCurrentPage('technologies')}
              className="bg-white border border-slate-200 rounded-lg p-4 text-center hover:border-blue-500 hover:shadow-md transition-all cursor-pointer group hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 rounded bg-blue-50 border border-blue-100 mx-auto flex items-center justify-center text-blue-700 group-hover:bg-blue-700 group-hover:text-white transition-colors mb-2">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900">{tech.name}</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">{tech.category}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us / Value Proposition */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: shouldReduceMotion ? 0.1 : 0.5 }}
            className="text-center max-w-3xl mx-auto space-y-3 mb-12"
          >
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-blue-950 px-3 py-1 rounded border border-blue-800">
              Why Supernova Pvt. Ltd.
            </span>
            <h2 className="text-3xl font-extrabold font-serif">
              Built on Trust, Technology, & Engineering Rigor
            </h2>
            <p className="text-blue-100 text-sm sm:text-base">
              We partner with organizations to build software applications that operate with speed, stability, and total data protection.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: shouldReduceMotion ? 0.1 : 0.45, delay: 0.1 }}
              className="bg-blue-950/80 border border-blue-800/80 p-6 rounded-lg space-y-3 hover:border-blue-700 transition-colors"
            >
              <div className="w-10 h-10 rounded bg-emerald-600 text-white flex items-center justify-center font-bold shadow-[0_0_12px_rgba(52,211,153,0.3)]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-serif">Security & Compliance First</h3>
              <p className="text-blue-200 text-xs leading-relaxed">
                ISO 27001 ISMS baseline security standards, mutual NDA protocols, encrypted code repositories, and strict access controls.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: shouldReduceMotion ? 0.1 : 0.45, delay: 0.2 }}
              className="bg-blue-950/80 border border-blue-800/80 p-6 rounded-lg space-y-3 hover:border-blue-700 transition-colors"
            >
              <div className="w-10 h-10 rounded bg-blue-600 text-white flex items-center justify-center font-bold">
                <Server className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-serif">24/7 SLA IT Support</h3>
              <p className="text-blue-200 text-xs leading-relaxed">
                Dedicated infrastructure monitoring, proactive patch management, and multi-tier technical support escalation engines.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: shouldReduceMotion ? 0.1 : 0.45, delay: 0.3 }}
              className="bg-blue-950/80 border border-blue-800/80 p-6 rounded-lg space-y-3 hover:border-blue-700 transition-colors"
            >
              <div className="w-10 h-10 rounded bg-emerald-600 text-white flex items-center justify-center font-bold shadow-[0_0_12px_rgba(52,211,153,0.3)]">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-serif">100% Full Source IP Ownership</h3>
              <p className="text-blue-200 text-xs leading-relaxed">
                Complete assignment of custom software source code, patents, and technical documentation upon project milestone execution.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Company Summary Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: shouldReduceMotion ? 0.1 : 0.5 }}
            className="lg:col-span-6 space-y-4"
          >
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded border border-blue-200">
              About Supernova Pvt. Ltd.
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 font-serif">
              Enterprise Technology Partner & IT Solutions
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Supernova Pvt. Ltd. delivers mission-critical software development, cloud computing architectures, CRM/ERP business platforms, and managed IT maintenance services to enterprise clients across India and globally.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Our engineering team focuses on modular microservices, high-concurrency systems, and clean code practices to ensure long-term system durability.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setCurrentPage('about')}
                className="px-5 py-2.5 rounded bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs transition-colors flex items-center space-x-2 cursor-pointer shadow-xs hover:shadow-md hover:-translate-y-0.5 duration-200"
              >
                <span>Read Full Company Profile</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCurrentPage('contact')}
                className="px-5 py-2.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors border border-slate-300 cursor-pointer"
              >
                Contact Our Team
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: shouldReduceMotion ? 0.1 : 0.5 }}
            className="lg:col-span-6"
          >
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm space-y-4">
              <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
                <div className="w-10 h-10 rounded bg-blue-900 text-white font-bold flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{COMPANY_INFO.name}</h3>
                  <p className="text-xs text-slate-500">Registered IT Services Company</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-slate-900">Headquarters Address</span>
                    <span>{COMPANY_INFO.headquarters}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Mail className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-slate-900">Primary Contact Email</span>
                    <span className="font-mono text-slate-600">{COMPANY_INFO.primaryEmail}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-slate-900">Corporate Telephone</span>
                    <span className="font-mono text-slate-600">{COMPANY_INFO.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final Contact CTA Section */}
      <section className="bg-slate-900 text-white py-16 border-t border-slate-800">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: shouldReduceMotion ? 0.1 : 0.5 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif">
            Ready to Discuss Your Software Project?
          </h2>
          <p className="text-slate-300 text-sm max-w-2xl mx-auto">
            Get in touch with the Supernova Pvt. Ltd. software team in Noida, Sector 62 for architectural reviews and service proposals.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setCurrentPage('contact')}
              className="px-6 py-3 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center space-x-2 cursor-pointer"
            >
              <span>Contact Us Today</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage('careers')}
              className="px-6 py-3 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition-colors border border-slate-700 cursor-pointer"
            >
              Join Our Engineering Team
            </button>
          </div>
        </motion.div>
      </section>

      {/* Subtle Scroll to Top Button (appears only when scrolled past first section) */}
      <ScrollToTop firstSectionRef={heroRef} />
    </div>
  );
};
