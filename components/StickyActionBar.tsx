'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function StickyActionBar() {
  const [show, setShow] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;
    const obs = new IntersectionObserver(
      ([entry]) => setNearFooter(entry.isIntersecting),
      { rootMargin: '0px 0px 200px 0px' }
    );
    obs.observe(footer);
    return () => obs.disconnect();
  }, []);

  const visible = show && !nearFooter;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4"
        >
          <div className="glass-strong flex w-full max-w-md items-center justify-between gap-3 rounded-full px-3 py-2 shadow-[0_30px_60px_-20px_rgba(212,175,55,0.45)] sm:px-4 md:max-w-lg md:px-5 md:py-2.5">
            <div className="flex min-w-0 items-center gap-3">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold-gradient text-obsidian shadow-[0_8px_22px_-8px_rgba(212,175,55,0.7)]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M5 9l7-7 7 7" />
                </svg>
              </div>
              <div className="truncate text-sm font-medium text-pearl md:text-base">
                همین حالا طلا بخرید
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <a
                href="#plans"
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold text-pearl-soft transition-colors hover:border-gold-400/50 hover:text-pearl sm:text-xs"
              >
                اقساطی
              </a>
              <a
                href="#products"
                className="rounded-full bg-gold-gradient px-3.5 py-1.5 text-[11px] font-bold text-obsidian shadow-[0_8px_22px_-8px_rgba(212,175,55,0.7)] sm:text-xs"
              >
                نقدی
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
