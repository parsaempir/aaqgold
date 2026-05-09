'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      lerp: 0.075,
    });
    lenisRef.current = lenis;

    // Bridge Lenis to ScrollTrigger so pinned + scrub animations stay in sync.
    lenis.on('scroll', ScrollTrigger.update);
    const tickerCb = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    // Anchor click → smooth scroll.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest('a[href^="#"]') as
        | HTMLAnchorElement
        | null;
      if (!a) return;
      const id = a.getAttribute('href');
      if (!id || id === '#' || id.length < 2) return;
      const el = document.querySelector(id) as HTMLElement | null;
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -80, duration: 1.4 });
    };
    document.addEventListener('click', onClick);

    return () => {
      gsap.ticker.remove(tickerCb);
      document.removeEventListener('click', onClick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
