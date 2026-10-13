import React, { useState, useEffect } from 'react';
import { useSocialLinks } from '../context/SocialLinksContext';
import {
  X,
  ExternalLink,
  CheckCircle2,
  Share2,
  RotateCcw,
  Sparkles,
  Link as LinkIcon,
  Globe,
} from 'lucide-react';

interface SocialLinksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SocialLinksModal: React.FC<SocialLinksModalProps> = ({ isOpen, onClose }) => {
  const { socialLinks, updateSocialLinks, resetSocialLinks } = useSocialLinks();

  const [linkedinUrl, setLinkedinUrl] = useState(socialLinks.linkedin);
  const [twitterUrl, setTwitterUrl] = useState(socialLinks.twitter || '');
  const [githubUrl, setGithubUrl] = useState(socialLinks.github || '');
  const [instagramUrl, setInstagramUrl] = useState(socialLinks.instagram || '');
  const [youtubeUrl, setYoutubeUrl] = useState(socialLinks.youtube || '');

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showOtherChannels, setShowOtherChannels] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLinkedinUrl(socialLinks.linkedin);
      setTwitterUrl(socialLinks.twitter || '');
      setGithubUrl(socialLinks.github || '');
      setInstagramUrl(socialLinks.instagram || '');
      setYoutubeUrl(socialLinks.youtube || '');
      setSavedSuccess(false);
    }
  }, [isOpen, socialLinks]);

  if (!isOpen) return null;

  const normalizeUrl = (url: string) => {
    const trimmed = url.trim();
    if (!trimmed) return '';
    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
      return `https://${trimmed}`;
    }
    return trimmed;
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanLinkedin = normalizeUrl(linkedinUrl);

    updateSocialLinks({
      linkedin: cleanLinkedin || 'https://www.linkedin.com/company/supernova-pvt-ltd',
      twitter: normalizeUrl(twitterUrl),
      github: normalizeUrl(githubUrl),
      instagram: normalizeUrl(instagramUrl),
      youtube: normalizeUrl(youtubeUrl),
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleReset = () => {
    if (window.confirm('Reset all social links back to corporate defaults?')) {
      resetSocialLinks();
      setLinkedinUrl('https://www.linkedin.com/company/supernova-pvt-ltd');
      setTwitterUrl('https://twitter.com/supernovatech');
      setGithubUrl('https://github.com/supernova-tech');
      setInstagramUrl('https://instagram.com/supernova.technologies');
      setYoutubeUrl('https://youtube.com/@supernovatech');
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2000);
    }
  };

  const testLink = (url: string) => {
    const clean = normalizeUrl(url);
    if (clean) {
      window.open(clean, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs font-sans">
      <div
        className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-[#0A66C2] flex items-center justify-center text-white shadow-md">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-bold">Company Social Media</h3>
                <span className="text-[10px] bg-blue-500/30 text-blue-200 border border-blue-400/40 px-2 py-0.5 rounded-full font-medium">
                  Config
                </span>
              </div>
              <p className="text-xs text-blue-200">
                Add or update company LinkedIn and social links across the website
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 space-y-5 overflow-y-auto">
          {savedSuccess && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-4 py-3 rounded-lg flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-semibold">
                Company LinkedIn link updated and saved successfully!
              </span>
            </div>
          )}

          {/* Primary Featured Field: LinkedIn */}
          <div className="bg-blue-50/70 border-2 border-[#0A66C2]/30 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded bg-[#0A66C2] flex items-center justify-center text-white">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </div>
                <div>
                  <label htmlFor="linkedin-input" className="block text-sm font-bold text-slate-900">
                    Company LinkedIn Link
                  </label>
                  <span className="text-[11px] text-slate-500">
                    Official corporate page or leadership profile
                  </span>
                </div>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-100 text-[#0A66C2] border border-blue-200">
                Primary Channel
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="relative flex items-center">
                <input
                  id="linkedin-input"
                  type="text"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://www.linkedin.com/company/supernova-pvt-ltd"
                  className="w-full text-xs font-medium text-slate-800 bg-white border border-slate-300 rounded-lg pl-3 pr-24 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0A66C2] focus:border-[#0A66C2] shadow-xs"
                  required
                />
                <button
                  type="button"
                  onClick={() => testLink(linkedinUrl)}
                  disabled={!linkedinUrl.trim()}
                  className="absolute right-1.5 px-2.5 py-1 text-[11px] font-semibold bg-slate-100 hover:bg-[#0A66C2] hover:text-white text-slate-700 rounded-md transition-colors flex items-center space-x-1 disabled:opacity-40"
                  title="Test link in new tab"
                >
                  <span>Test Link</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
              <p className="text-[11px] text-slate-500">
                Tip: Enter your full LinkedIn company link (e.g. <code>https://www.linkedin.com/company/your-company-name</code>)
              </p>
            </div>
          </div>

          {/* Toggle for other social channels */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setShowOtherChannels(!showOtherChannels)}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center space-x-1"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>
                {showOtherChannels ? 'Hide Other Social Media Channels' : '+ Add / Manage Other Channels (Twitter/X, GitHub, Instagram)'}
              </span>
            </button>
          </div>

          {/* Other Social Media Channels */}
          {showOtherChannels && (
            <div className="space-y-3 pt-2 border-t border-slate-200 animate-in fade-in duration-150">
              {/* Twitter / X */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-800"></span>
                  <span>Twitter / X Profile Link</span>
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={twitterUrl}
                    onChange={(e) => setTwitterUrl(e.target.value)}
                    placeholder="https://twitter.com/supernovatech"
                    className="w-full text-xs text-slate-800 bg-white border border-slate-300 rounded-lg pl-3 pr-20 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  {twitterUrl && (
                    <button
                      type="button"
                      onClick={() => testLink(twitterUrl)}
                      className="absolute right-1.5 px-2 py-0.5 text-[10px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded"
                    >
                      Test
                    </button>
                  )}
                </div>
              </div>

              {/* GitHub */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-900"></span>
                  <span>GitHub Organization Link</span>
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/supernova-tech"
                    className="w-full text-xs text-slate-800 bg-white border border-slate-300 rounded-lg pl-3 pr-20 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  {githubUrl && (
                    <button
                      type="button"
                      onClick={() => testLink(githubUrl)}
                      className="absolute right-1.5 px-2 py-0.5 text-[10px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded"
                    >
                      Test
                    </button>
                  )}
                </div>
              </div>

              {/* Instagram */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-pink-600"></span>
                  <span>Instagram Profile Link</span>
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={instagramUrl}
                    onChange={(e) => setInstagramUrl(e.target.value)}
                    placeholder="https://instagram.com/supernova.technologies"
                    className="w-full text-xs text-slate-800 bg-white border border-slate-300 rounded-lg pl-3 pr-20 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  {instagramUrl && (
                    <button
                      type="button"
                      onClick={() => testLink(instagramUrl)}
                      className="absolute right-1.5 px-2 py-0.5 text-[10px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded"
                    >
                      Test
                    </button>
                  )}
                </div>
              </div>

              {/* YouTube */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-600"></span>
                  <span>YouTube Channel Link</span>
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="https://youtube.com/@supernovatech"
                    className="w-full text-xs text-slate-800 bg-white border border-slate-300 rounded-lg pl-3 pr-20 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  {youtubeUrl && (
                    <button
                      type="button"
                      onClick={() => testLink(youtubeUrl)}
                      className="absolute right-1.5 px-2 py-0.5 text-[10px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded"
                    >
                      Test
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center space-x-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-[#0A66C2] hover:bg-[#004182] rounded-lg transition-colors shadow-sm flex items-center space-x-1.5"
              >
                <span>Save LinkedIn Link</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
