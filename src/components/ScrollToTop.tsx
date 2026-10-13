import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

interface ScrollToTopProps {
  /** Optional reference to the first section element to trigger once scrolled past */
  firstSectionRef?: React.RefObject<HTMLElement | null>;
  /** Fallback threshold in pixels if ref is not available */
  fallbackThreshold?: number;
}

export const ScrollToTop: React.FC<ScrollToTopProps> = ({
  firstSectionRef,
  fallbackThreshold = 500,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      let threshold = fallbackThreshold;
      if (firstSectionRef && firstSectionRef.current) {
        // Trigger precisely when the bottom of the first section scrolls out of view
        const rect = firstSectionRef.current.getBoundingClientRect();
        // rect.bottom <= 0 means the entire first section has scrolled past the top of the viewport
        // Or if scrolled past 85% of its height for early subtle appearance
        const sectionHeight = firstSectionRef.current.offsetHeight;
        threshold = sectionHeight > 0 ? sectionHeight * 0.9 : fallbackThreshold;
      }

      const currentScrollY = window.scrollY || document.documentElement.scrollTop;
      setIsVisible(currentScrollY > threshold);
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [firstSectionRef, fallbackThreshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20, scale: shouldReduceMotion ? 1 : 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 16, scale: shouldReduceMotion ? 1 : 0.9 }}
          transition={{
            duration: shouldReduceMotion ? 0.1 : 0.28,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="fixed bottom-6 left-6 z-40 group pointer-events-auto"
        >
          <motion.button
            onClick={scrollToTop}
            whileHover={shouldReduceMotion ? {} : { scale: 1.08, y: -2 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.94 }}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-900/90 hover:bg-slate-800 text-white shadow-xl hover:shadow-2xl hover:shadow-slate-900/40 border border-slate-700/80 backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer relative focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            aria-label="Scroll back to top"
            title="Scroll to top"
          >
            {/* Subtle inner highlight border */}
            <span className="absolute inset-0 rounded-full border border-white/10 pointer-events-none" />

            {/* Icon with subtle upward animation on hover */}
            <motion.div
              animate={{ y: [0, -2, 0] }}
              transition={{
                repeat: Infinity,
                duration: 2.5,
                ease: 'easeInOut',
              }}
            >
              <ChevronUp className="w-5 h-5 text-slate-200 group-hover:text-emerald-400 transition-colors stroke-[2.2]" />
            </motion.div>
          </motion.button>

          {/* Minimal hover tooltip */}
          <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block whitespace-nowrap bg-slate-900/95 text-slate-200 text-[11px] font-medium px-2.5 py-1 rounded-md shadow-lg pointer-events-none border border-slate-700/80">
            Top
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
