import React from 'react';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  defaultMessage?: string;
  isChatOpen?: boolean;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = '7905243606',
  defaultMessage = 'Hello Supernova team, I would like to inquire about your software and IT services.',
  isChatOpen = false,
}) => {
  // Clean phone number (remove any non-digits for wa.me URL)
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  const fullPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
  const whatsappUrl = `https://wa.me/${fullPhone}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div
      className={`pointer-events-auto relative font-sans group ${
        isChatOpen ? 'hidden sm:flex' : 'flex'
      }`}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        title="WhatsApp"
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] active:scale-95 text-white flex items-center justify-center shadow-xl hover:shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-105 border-2 border-slate-900 cursor-pointer"
      >
        {/* WhatsApp Official SVG Symbol */}
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 sm:w-8 sm:h-8 fill-white"
          aria-hidden="true"
        >
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-0.86 4.28-2.42 5.83-1.56 1.56-3.63 2.41-5.82 2.41-1.42 0-2.82-.37-4.05-1.08l-.29-.17-3.11.82.83-3.03-.19-.31c-.77-1.26-1.18-2.72-1.18-4.23 0-4.54 3.7-8.24 8.24-8.24zm-4.7 4.14c-.16 0-.35.06-.53.25-.19.19-.72.7-.72 1.72s.74 1.99.84 2.13c.11.14 1.43 2.24 3.52 3.12 1.74.73 2.09.58 2.47.55.38-.04 1.22-.5 1.4-.98.17-.48.17-.9.12-.98-.05-.08-.19-.13-.41-.24-.22-.11-1.29-.64-1.49-.71-.2-.07-.35-.11-.5.11-.15.22-.59.71-.72.86-.13.15-.26.17-.48.06-.22-.11-.93-.34-1.77-1.09-.65-.58-1.09-1.29-1.22-1.51-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.07-.15.04-.28-.02-.39-.06-.11-.5-1.22-.69-1.67-.18-.43-.37-.37-.51-.38z" />
        </svg>

        {/* Small subtle active pulse */}
        <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-300 rounded-full animate-ping opacity-75 pointer-events-none" />
        <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-200 rounded-full border border-slate-900 pointer-events-none" />
      </a>

      {/* Simple Tooltip (no number or extra text) */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block whitespace-nowrap bg-slate-900/95 text-white text-[11px] font-medium px-2.5 py-1 rounded-md shadow-lg pointer-events-none border border-slate-700">
        WhatsApp
      </div>
    </div>
  );
};
