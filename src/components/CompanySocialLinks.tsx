import React from 'react';
import { useSocialLinks } from '../context/SocialLinksContext';
import { ExternalLink } from 'lucide-react';

interface CompanySocialLinksProps {
  variant?: 'inline' | 'buttons' | 'compact' | 'badge';
  className?: string;
}

export const CompanySocialLinks: React.FC<CompanySocialLinksProps> = ({
  variant = 'inline',
  className = '',
}) => {
  const { socialLinks } = useSocialLinks();

  const linkedinUrl = socialLinks.linkedin || 'https://www.linkedin.com/company/supernova-pvt-ltd';

  // SVG Icon for LinkedIn
  const LinkedInIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
    <svg className={`${className} fill-current`} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );

  // Buttons variant: direct clickable pill/button for LinkedIn only
  if (variant === 'buttons') {
    return (
      <div className={`flex items-center ${className}`}>
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-[#0A66C2] hover:bg-[#004182] active:scale-95 text-white text-xs font-bold transition-all shadow-sm group cursor-pointer"
          title="Connect with Supernova on LinkedIn"
        >
          <LinkedInIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>Follow us on LinkedIn</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>
    );
  }

  // Compact variant: LinkedIn icon button
  if (variant === 'compact') {
    return (
      <div className={`flex items-center ${className}`}>
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-7 h-7 rounded-md bg-[#0A66C2] text-white flex items-center justify-center hover:bg-[#004182] transition-colors cursor-pointer shadow-2xs"
          title="Connect on LinkedIn"
          aria-label="Connect with Supernova on LinkedIn"
        >
          <LinkedInIcon className="w-3.5 h-3.5" />
        </a>
      </div>
    );
  }

  // Default / Inline: Clear, prominent clickable LinkedIn link button
  return (
    <div className={`flex items-center ${className}`}>
      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#0A66C2] text-white text-xs font-semibold hover:bg-[#004182] hover:scale-105 active:scale-95 transition-all shadow-xs cursor-pointer group"
        title="Connect with Supernova on LinkedIn"
        aria-label="Connect with Supernova on LinkedIn"
      >
        <LinkedInIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
        <span>LinkedIn</span>
        <ExternalLink className="w-3 h-3 opacity-75 group-hover:translate-x-0.5 transition-transform" />
      </a>
    </div>
  );
};
