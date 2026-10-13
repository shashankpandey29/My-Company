import React, { createContext, useContext, useState, useEffect } from 'react';
import { SocialLinks } from '../types';
import { COMPANY_INFO } from '../data/companyData';

interface SocialLinksContextType {
  socialLinks: SocialLinks;
  updateSocialLinks: (updates: Partial<SocialLinks>) => void;
  setLinkedInUrl: (url: string) => void;
  resetSocialLinks: () => void;
  isEditModalOpen: boolean;
  openEditModal: () => void;
  closeEditModal: () => void;
}

const STORAGE_KEY = 'supernova_company_social_links';

const DEFAULT_LINKS: SocialLinks = {
  linkedin: COMPANY_INFO.socialLinks.linkedin,
  twitter: COMPANY_INFO.socialLinks.twitter,
  github: COMPANY_INFO.socialLinks.github,
  instagram: COMPANY_INFO.socialLinks.instagram,
  youtube: COMPANY_INFO.socialLinks.youtube,
};

const SocialLinksContext = createContext<SocialLinksContextType | undefined>(undefined);

export const SocialLinksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socialLinks, setSocialLinks] = useState<SocialLinks>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...DEFAULT_LINKS, ...parsed };
      }
    } catch {
      // Fallback to defaults
    }
    return DEFAULT_LINKS;
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Sync to localStorage
  const saveLinks = (newLinks: SocialLinks) => {
    setSocialLinks(newLinks);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newLinks));
    } catch (err) {
      console.warn('Failed to persist social links in localStorage', err);
    }
  };

  const updateSocialLinks = (updates: Partial<SocialLinks>) => {
    saveLinks({
      ...socialLinks,
      ...updates,
    });
  };

  const setLinkedInUrl = (url: string) => {
    updateSocialLinks({ linkedin: url.trim() });
  };

  const resetSocialLinks = () => {
    saveLinks(DEFAULT_LINKS);
  };

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  // Cross-tab synchronization
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setSocialLinks(JSON.parse(e.newValue));
        } catch {
          // ignore error
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <SocialLinksContext.Provider
      value={{
        socialLinks,
        updateSocialLinks,
        setLinkedInUrl,
        resetSocialLinks,
        isEditModalOpen,
        openEditModal,
        closeEditModal,
      }}
    >
      {children}
    </SocialLinksContext.Provider>
  );
};

export const useSocialLinks = (): SocialLinksContextType => {
  const context = useContext(SocialLinksContext);
  if (!context) {
    throw new Error('useSocialLinks must be used within a SocialLinksProvider');
  }
  return context;
};
