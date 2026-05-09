'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1700);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-obsidian"
          aria-hidden
        >
          <div className="pointer-events-none absolute inset-0 bg-gold-radial opacity-30" />
          <div className="relative flex flex-col items-center gap-6">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-20 w-20"
            >
              <span className="absolute inset-0 rounded-full border border-gold-400/30" />
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-2 border-transparent"
                style={{
                  borderTopColor: '#D4AF37',
                  borderRightColor: 'rgba(212,175,55,0.3)',
                }}
              />
              <span className="absolute inset-3 flex items-center justify-center rounded-full bg-gold-gradient font-display text-lg font-extrabold text-obsidian shadow-[0_0_30px_rgba(212,175,55,0.6)]">
                A
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="text-center"
            >
              <p className="font-display text-sm tracking-[0.5em] text-pearl-soft">
                AAQ&nbsp;GOLD
              </p>
              <p className="mt-2 text-xs text-pearl-mute">
                در حال آماده‌سازی تجربه‌ی شما…
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
