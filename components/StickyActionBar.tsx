'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function StickyActionBar() {
  const [scrolled, setScrolled] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 320);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;
    const obs = new IntersectionObserver(
      ([entry]) => setNearFooter(entry.isIntersecting),
      { rootMargin: '0px 0px 96px 0px' }
    );
    obs.observe(footer);
    return () => obs.disconnect();
  }, []);

  const show = scrolled && !nearFooter;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4"
        >
          <div className="glass flex w-full max-w-md items-center justify-between gap-2 rounded-full px-3 py-2 shadow-2xl shadow-black/50 sm:gap-4 sm:px-4 md:max-w-lg md:px-5 md:py-2.5">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <div className="bg-gold-gradient hidden h-7 w-7 shrink-0 rounded-full sm:block" />
              <div className="truncate text-[13px] font-medium text-white sm:text-sm md:text-base">
                <span className="sm:hidden">Buy Gold Now</span>
                <span className="hidden sm:inline">Start Buying Gold Now</span>
              </div>
            </div>
            <a
              href="#bars"
              className="bg-gold-gradient gold-shine shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold text-ink-900 sm:px-4 sm:py-2 sm:text-xs md:px-5 md:text-sm"
            >
              Shop
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
