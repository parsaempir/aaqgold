'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    n: '01',
    title: 'Choose your gold',
    body: 'Real, certified bullion or fractional grams. Transparent pricing tied to live spot — no hidden margins.',
  },
  {
    n: '02',
    title: 'Pay your way',
    body: 'Pay in full for instant ownership, or split the cost across 3–24 months with a 0% installment plan.',
  },
  {
    n: '03',
    title: 'Own & redeem',
    body: 'Your gold is allocated, vault-stored and insured. Sell back, hold, or take physical delivery anytime.',
  },
];

export default function HowItWorks() {
  const rootRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hiw-card', {
        y: 36,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.12,
        scrollTrigger: { trigger: rootRef.current, start: 'top 80%', once: true },
      });

      gsap.from('.hiw-heading-line', {
        yPercent: 110,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: rootRef.current, start: 'top 75%', once: true },
      });

      gsap.from('.hiw-eyebrow', {
        y: 14,
        opacity: 0,
        duration: 0.8,
        ease: 'expo.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 78%', once: true },
      });

      // Animated connector path
      const path = pathRef.current;
      if (path) {
        const len = path.getTotalLength();
        path.style.strokeDasharray = `${len}`;
        path.style.strokeDashoffset = `${len}`;
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 70%',
            end: 'bottom 75%',
            scrub: 0.6,
          },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="how" className="relative isolate py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="hiw-eyebrow eyebrow">How it works</div>
            <h2 className="font-display mt-4 max-w-2xl text-balance text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
              <span className="split-line">
                <span className="hiw-heading-line block">A modern way to</span>
              </span>
              <span className="split-line">
                <span className="hiw-heading-line block">own real gold.</span>
              </span>
            </h2>
          </div>
          <p className="max-w-md text-pretty text-base text-ink-soft md:text-lg">
            From first purchase to long-term holding, every step is designed to
            feel as effortless as it is secure.
          </p>
        </div>

        <div className="relative mt-14">
          {/* Animated connector — desktop only */}
          <svg
            aria-hidden
            viewBox="0 0 1200 60"
            preserveAspectRatio="none"
            className="absolute left-0 right-0 top-[88px] hidden h-[60px] w-full md:block"
          >
            <path
              d="M 80 30 C 280 -10, 520 70, 700 30 C 880 -10, 1020 70, 1120 30"
              fill="none"
              stroke="rgba(220, 174, 61, 0.18)"
              strokeWidth="1.5"
            />
            <path
              ref={pathRef}
              d="M 80 30 C 280 -10, 520 70, 700 30 C 880 -10, 1020 70, 1120 30"
              fill="none"
              stroke="url(#hiw-grad)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="hiw-grad" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="#F1CE6C" />
                <stop offset="0.5" stopColor="#DCAE3D" />
                <stop offset="1" stopColor="#B07F1E" />
              </linearGradient>
            </defs>
          </svg>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {steps.map((s) => (
              <div
                key={s.n}
                className="hiw-card halo group relative flex flex-col gap-6 rounded-3xl border border-hairline bg-pearl p-7 transition-transform duration-500 hover:-translate-y-1.5 md:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm font-semibold tracking-widest text-gold-500">
                    {s.n}
                  </span>
                  <span className="dot-pulse">
                    <span className="relative block h-2 w-2 rounded-full bg-gold-400" />
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-ink md:text-[1.6rem]">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[0.97rem] leading-relaxed text-ink-soft">
                    {s.body}
                  </p>
                </div>

                <div className="mt-auto flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-ink-mute transition-colors group-hover:text-gold-600">
                  <Arrow />
                  <span>Step</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
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
