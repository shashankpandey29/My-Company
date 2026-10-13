import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { TalkToUsModal } from './components/TalkToUsModal';
import { SocialLinksModal } from './components/SocialLinksModal';
import { GeminiChatbot } from './components/GeminiChatbot';
import { WhatsAppButton } from './components/WhatsAppButton';
import { useSocialLinks } from './context/SocialLinksContext';

// Import All 14 Requested Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { TechnologiesPage } from './pages/TechnologiesPage';
import { CareersPage } from './pages/CareersPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsConditionsPage } from './pages/TermsConditionsPage';
import { AuthCallbackPage } from './pages/AuthCallbackPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [talkToUsOpen, setTalkToUsOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const { isEditModalOpen, closeEditModal } = useSocialLinks();

  // Detect URL auth callback parameters or path on initial render
  useEffect(() => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    const search = window.location.search;

    if (
      path.startsWith('/auth/callback') ||
      hash.includes('access_token=') ||
      hash.includes('type=recovery') ||
      hash.includes('type=signup') ||
      search.includes('code=') ||
      search.includes('type=recovery') ||
      search.includes('type=signup') ||
      search.includes('error=')
    ) {
      setCurrentPage('auth-callback');
    }
  }, []);

  // Sync window scroll on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'about':
        return <AboutPage setCurrentPage={setCurrentPage} />;
      case 'services':
        return <ServicesPage setCurrentPage={setCurrentPage} />;
      case 'industries':
        return <IndustriesPage setCurrentPage={setCurrentPage} />;
      case 'technologies':
        return <TechnologiesPage setCurrentPage={setCurrentPage} />;
      case 'careers':
        return <CareersPage setCurrentPage={setCurrentPage} />;
      case 'contact':
        return <ContactPage setCurrentPage={setCurrentPage} />;
      case 'login':
        return <LoginPage setCurrentPage={setCurrentPage} />;
      case 'signup':
        return <SignupPage setCurrentPage={setCurrentPage} />;
      case 'profile':
        return <UserProfilePage setCurrentPage={setCurrentPage} />;
      case 'admin':
        return <AdminDashboardPage setCurrentPage={setCurrentPage} />;
      case 'privacy':
        return <PrivacyPolicyPage setCurrentPage={setCurrentPage} />;
      case 'terms':
        return <TermsConditionsPage setCurrentPage={setCurrentPage} />;
      case 'auth-callback':
        return <AuthCallbackPage setCurrentPage={setCurrentPage} />;
      case 'notfound':
        return <NotFoundPage setCurrentPage={setCurrentPage} />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white flex flex-col justify-between">
      <div>
        <Navbar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onOpenTalkToUs={() => setTalkToUsOpen(true)}
        />
        <main>{renderPage()}</main>
      </div>
      <Footer setCurrentPage={setCurrentPage} />

      <TalkToUsModal
        isOpen={talkToUsOpen}
        onClose={() => setTalkToUsOpen(false)}
      />

      <SocialLinksModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
      />

      {/* Floating Action Cluster: Chatbot and WhatsApp both near each other on the right side */}
      <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3 pointer-events-none font-sans">
        <WhatsAppButton
          phoneNumber="7905243606"
          isChatOpen={isChatbotOpen}
        />
        <GeminiChatbot
          isOpen={isChatbotOpen}
          setIsOpen={setIsChatbotOpen}
          onOpenTalkToUs={() => setTalkToUsOpen(true)}
        />
      </div>
    </div>
  );
}
