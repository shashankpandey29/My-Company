import React, { useState } from 'react';
import { PageId } from '../types';
import { COMPANY_INFO } from '../data/companyData';
import { useAuth } from '../context/AuthContext';
import { useSocialLinks } from '../context/SocialLinksContext';
import { CompanyLogo } from './CompanyLogo';
import {
  Menu,
  X,
  User,
  LayoutDashboard,
  LogIn,
  UserPlus,
  Building2,
  Code2,
  Cpu,
  Briefcase,
  Phone,
  Globe,
  Layers,
  LogOut,
  MessageSquare,
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  onOpenTalkToUs: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage, onOpenTalkToUs }) => {
  const { user, profile, isAdmin, signOut } = useAuth();
  const { socialLinks, openEditModal } = useSocialLinks();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Globe className="w-4 h-4" /> },
    { id: 'about', label: 'About Us', icon: <Building2 className="w-4 h-4" /> },
    { id: 'services', label: 'Services', icon: <Code2 className="w-4 h-4" /> },
    { id: 'industries', label: 'Industries', icon: <Layers className="w-4 h-4" /> },
    { id: 'technologies', label: 'Technologies', icon: <Cpu className="w-4 h-4" /> },
    { id: 'careers', label: 'Careers', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact', icon: <Phone className="w-4 h-4" /> },
  ];

  const handleNavClick = (page: PageId) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 text-slate-800 shadow-xs transition-all">
      {/* Main Corporate Header Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center text-left focus:outline-none group cursor-pointer"
            aria-label="Supernova Home"
          >
            <CompanyLogo variant="navbar" size="md" />
          </button>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-2 rounded-md text-sm font-medium transition-all cursor-pointer ${
                  currentPage === item.id
                    ? 'bg-blue-50 text-blue-700 font-semibold border-b-2 border-blue-700'
                    : 'text-slate-700 hover:text-blue-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center space-x-2">
            {/* LinkedIn Company Profile Button */}
            <a
              href={socialLinks.linkedin || 'https://www.linkedin.com/company/supernova-pvt-ltd'}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-md text-xs font-semibold bg-[#0A66C2] hover:bg-[#004182] text-white transition-all flex items-center space-x-1.5 shadow-xs cursor-pointer"
              title="Visit Supernova on LinkedIn"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span>LinkedIn</span>
            </a>

            {/* Talk to us Button */}
            <button
              onClick={onOpenTalkToUs}
              className="px-3.5 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white shadow-xs hover:shadow-md cursor-pointer"
              title="Talk to us"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Talk to us</span>
            </button>

            {user ? (
              <>
                <button
                  onClick={() => handleNavClick('profile')}
                  className={`px-3.5 py-2 rounded-md text-sm font-semibold transition-colors flex items-center space-x-1.5 border cursor-pointer ${
                    currentPage === 'profile'
                      ? 'bg-blue-50 text-blue-700 border-blue-300'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <User className="w-4 h-4 text-blue-700" />
                  <span>{profile?.full_name ? profile.full_name.split(' ')[0] : 'Portal'}</span>
                </button>

                <button
                  onClick={async () => {
                    await signOut();
                    handleNavClick('login');
                  }}
                  title="Sign Out"
                  className="px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center space-x-1 border border-slate-200 cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-slate-500" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavClick('login')}
                  className={`px-3.5 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-1.5 cursor-pointer ${
                    currentPage === 'login'
                      ? 'text-blue-700 bg-blue-50'
                      : 'text-slate-700 hover:text-blue-700 hover:bg-slate-100'
                  }`}
                >
                  <LogIn className="w-4 h-4 text-slate-500" />
                  <span>Login</span>
                </button>

                <button
                  onClick={() => handleNavClick('signup')}
                  className="px-4 py-2 rounded-md text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center space-x-1.5 cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-700 hover:bg-slate-100 border border-slate-200 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-md text-sm font-medium flex items-center justify-between transition-colors ${
                  currentPage === item.id
                    ? 'bg-blue-50 text-blue-700 font-bold border-l-4 border-blue-700'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
            <button
              onClick={() => handleNavClick('login')}
              className="w-full py-2.5 px-3 rounded-md text-sm font-medium text-center bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center space-x-1.5"
            >
              <LogIn className="w-4 h-4 text-slate-600" />
              <span>Login</span>
            </button>
            <button
              onClick={() => handleNavClick('signup')}
              className="w-full py-2.5 px-3 rounded-md text-sm font-semibold text-center bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center space-x-1.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>Sign Up</span>
            </button>
          </div>

          <div className="pt-1 grid grid-cols-2 gap-2">
            <button
              onClick={() => handleNavClick('profile')}
              className="py-2 px-3 rounded-md text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 flex items-center justify-center space-x-1"
            >
              <User className="w-3.5 h-3.5 text-slate-500" />
              <span>Client Portal</span>
            </button>
            <button
              onClick={() => {
                onOpenTalkToUs();
                setMobileMenuOpen(false);
              }}
              className="py-2 px-3 rounded-md text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
              <span>Talk to us</span>
            </button>
          </div>

          {/* Social Media Link / LinkedIn in mobile drawer - Clickable link only */}
          <div className="pt-2 border-t border-slate-100">
            <a
              href={socialLinks.linkedin || 'https://www.linkedin.com/company/supernova-pvt-ltd'}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-md text-xs font-bold text-center bg-[#0A66C2] hover:bg-[#004182] text-white flex items-center justify-center space-x-2 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span>Visit LinkedIn</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
