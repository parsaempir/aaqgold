'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function StickyActionBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 320);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
          <div className="glass flex w-full max-w-md items-center justify-between gap-4 rounded-full px-4 py-2 shadow-2xl shadow-black/50 md:max-w-lg md:px-5 md:py-2.5">
            <div className="flex items-center gap-3">
              <div className="bg-gold-gradient h-7 w-7 shrink-0 rounded-full" />
              <div className="text-sm font-medium text-white md:text-base">
                Start Buying Gold Now
              </div>
            </div>
            <a
              href="#bars"
              className="bg-gold-gradient gold-shine shrink-0 rounded-full px-4 py-2 text-xs font-semibold text-ink-900 md:px-5 md:text-sm"
            >
              Shop Bars
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
