'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GoldBarScene from './GoldBarScene';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const primaryBtnRef = useRef<HTMLAnchorElement>(null);
  const secondaryBtnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'expo.out' },
        delay: 0.05,
      });

      tl.from(eyebrowRef.current, { y: 14, opacity: 0, duration: 0.8 });

      const lines =
        headlineRef.current?.querySelectorAll<HTMLElement>('.line-inner');
      if (lines && lines.length) {
        gsap.set(lines, { yPercent: 110, opacity: 0 });
        tl.to(
          lines,
          { yPercent: 0, opacity: 1, duration: 1.05, stagger: 0.09 },
          '-=0.5'
        );
      }

      tl.from(subRef.current, { y: 16, opacity: 0, duration: 0.85 }, '-=0.55')
        .from(
          ctasRef.current?.children ?? [],
          { y: 18, opacity: 0, duration: 0.85, stagger: 0.08 },
          '-=0.55'
        )
        .from(
          sceneRef.current,
          { opacity: 0, scale: 0.92, duration: 1.4 },
          '-=1.4'
        );

      // Subtle parallax on the 3D scene.
      if (sceneRef.current) {
        gsap.to(sceneRef.current, {
          y: -60,
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Magnetic CTAs.
  useEffect(() => {
    const buttons = [primaryBtnRef.current, secondaryBtnRef.current].filter(
      Boolean
    ) as HTMLElement[];
    const cleanups: Array<() => void> = [];
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!fine) return;

    buttons.forEach((btn) => {
      const move = (e: PointerEvent) => {
        const r = btn.getBoundingClientRect();
        const relX = e.clientX - (r.left + r.width / 2);
        const relY = e.clientY - (r.top + r.height / 2);
        gsap.to(btn, {
          x: relX * 0.18,
          y: relY * 0.28,
          duration: 0.5,
          ease: 'power3.out',
        });
      };
      const leave = () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
      };
      btn.addEventListener('pointermove', move);
      btn.addEventListener('pointerleave', leave);
      cleanups.push(() => {
        btn.removeEventListener('pointermove', move);
        btn.removeEventListener('pointerleave', leave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative isolate overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-canvas-fade"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[640px] w-[1100px] -translate-x-1/2 rounded-full bg-gold-soft blur-2xl"
      />

      <div className="mx-auto grid min-h-[78vh] max-w-7xl grid-cols-1 items-center gap-14 px-6 pb-10 pt-32 md:pt-40 lg:grid-cols-12 lg:gap-12 lg:pb-12">
        <div className="lg:col-span-7">
          <div
            ref={eyebrowRef}
            className="inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-gold-600"
          >
            <span className="block h-px w-8 bg-gold-300" />
            Placeholder · Real gold, real-time
          </div>

          <h1
            ref={headlineRef}
            className="font-display mt-7 text-[clamp(2.6rem,6.4vw,5.6rem)] font-extrabold leading-[1.0] tracking-tight text-ink text-balance"
          >
            <span className="split-line">
              <span className="line-inner block">Buy gold today.</span>
            </span>
            <span className="split-line">
              <span className="line-inner block">
                Pay <span className="text-gold-shine">your way</span>.
              </span>
            </span>
          </h1>

          <p
            ref={subRef}
            className="mt-7 max-w-md text-pretty text-base text-ink-soft md:text-lg"
          >
            Vault-stored, fully insured, transparent. Built for modern buyers.
          </p>

          <div
            ref={ctasRef}
            className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
          >
            <a ref={primaryBtnRef} href="#cash" className="btn-gold">
              Buy Gold Now
              <Arrow />
            </a>
            <a ref={secondaryBtnRef} href="#story" className="btn-ghost">
              Discover Placeholder
            </a>
          </div>
        </div>

        <div className="relative lg:col-span-5">
          <div ref={sceneRef} className="relative aspect-square w-full">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-8 -z-10 rounded-full bg-gold-soft opacity-80 blur-3xl"
            />
            <GoldBarScene />
          </div>
        </div>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
