'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorGlow() {
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  const sx = useSpring(x, { damping: 30, stiffness: 220, mass: 0.4 });
  const sy = useSpring(y, { damping: 30, stiffness: 220, mass: 0.4 });

  useEffect(() => {
    const supportsHover = window.matchMedia(
      '(hover: hover) and (pointer: fine)'
    ).matches;
    if (!supportsHover) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[55] -ml-[280px] -mt-[280px] hidden h-[560px] w-[560px] md:block"
    >
      <div
        className="h-full w-full rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0.06) 35%, transparent 70%)',
          filter: 'blur(30px)',
          mixBlendMode: 'screen',
        }}
      />
    </motion.div>
  );
}
