'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    title: 'Product',
    links: [
      { label: 'Buy gold', href: '#cash' },
      { label: 'The Aurea way', href: '#story' },
      { label: 'Sell gold', href: '#cash' },
      { label: 'Take delivery', href: '#trust' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#trust' },
      { label: 'Vaults & insurance', href: '#trust' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'How it works', href: '#how' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Help center', href: '#' },
      { label: 'Contact', href: '#cta' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms', href: '#' },
      { label: 'Privacy', href: '#' },
      { label: 'Risk disclosure', href: '#' },
      { label: 'Licenses', href: '#' },
    ],
  },
];

export default function Footer() {
  const rootRef = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.foot-fade', {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.05,
        scrollTrigger: { trigger: rootRef.current, start: 'top 85%', once: true },
      });

      const letters = wordmarkRef.current?.querySelectorAll<HTMLElement>('.wm-l');
      if (letters && letters.length) {
        gsap.set(letters, { yPercent: 110, opacity: 0 });
        gsap.to(letters, {
          yPercent: 0,
          opacity: 1,
          duration: 1.4,
          ease: 'expo.out',
          stagger: 0.06,
          scrollTrigger: {
            trigger: wordmarkRef.current,
            start: 'top 92%',
            once: true,
          },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={rootRef}
      className="relative isolate overflow-hidden border-t border-hairline bg-cream"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-300/60 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="foot-fade md:col-span-4">
            <a href="#hero" className="group flex items-center gap-2.5 text-ink">
              <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gold-gradient shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] transition-transform duration-700 group-hover:rotate-[18deg]">
                <span className="font-display text-[14px] font-extrabold text-[#1A1306]">
                  Au
                </span>
              </span>
              <span className="font-display text-xl font-extrabold tracking-tight">
                Aurea
              </span>
            </a>
            <p className="mt-5 max-w-xs text-pretty text-sm leading-relaxed text-ink-soft">
              Real, allocated gold — bought instantly or in flexible
              installments. Vault-stored, fully insured, transparent.
            </p>

            <div className="mt-6 flex items-center gap-2">
              <Social label="X" path="M4 4l16 16M20 4L4 20" />
              <Social
                label="Instagram"
                path="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm5.5-1.2a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8z"
              />
              <Social
                label="LinkedIn"
                path="M5 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM3 10h4v10H3V10zm6 0h4v1.6c.6-1 2-1.9 3.6-1.9 3.4 0 4.4 2.2 4.4 5V20h-4v-4.6c0-1.5-.5-2.6-2-2.6s-2 1-2 2.6V20H9V10z"
              />
            </div>
          </div>

          {sections.map((s) => (
            <div key={s.title} className="foot-fade md:col-span-2">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-mute">
                {s.title}
              </div>
              <ul className="mt-4 space-y-2.5">
                {s.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="group inline-flex items-center text-[0.92rem] text-ink-soft transition-colors hover:text-ink"
                    >
                      <span className="relative">
                        {l.label}
                        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gold-400 transition-all duration-500 group-hover:w-full" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="hairline-soft mt-14" />

        <div className="mt-6 flex flex-col items-start justify-between gap-3 text-xs text-ink-mute md:flex-row md:items-center">
          <div>
            © {new Date().getFullYear()} Aurea Gold Inc. · LBMA member ·
            Lloyd&rsquo;s insured · SOC 2 Type II
          </div>
          <div className="flex items-center gap-4">
            <span>Investing in gold carries risk. Read the risk disclosure.</span>
          </div>
        </div>
      </div>

      {/* Luxury wordmark — reveals on scroll */}
      <div
        ref={wordmarkRef}
        aria-hidden
        className="relative mx-auto flex max-w-[1400px] items-end justify-center px-6 pb-6 pt-2"
      >
        <div className="font-display flex w-full select-none items-end justify-between gap-[2vw] leading-[0.95] tracking-tighter">
          {'AUREA'.split('').map((ch, i) => (
            <span
              key={i}
              className="block flex-1 text-center"
              style={{ overflow: 'hidden', paddingBottom: '0.06em' }}
            >
              <span className="wm-l block text-[clamp(4rem,18vw,15rem)] font-extrabold text-gold-gradient">
                {ch}
              </span>
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}

function Social({ label, path }: { label: string; path: string }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline bg-pearl text-ink-soft transition-colors hover:border-gold-300/60 hover:bg-gold-50 hover:text-gold-700"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d={path}
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
