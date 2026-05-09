'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    title: 'Allocated, not paper',
    body: 'Every gram you buy is matched 1:1 with serial-numbered bullion in your name. Never lent, never rehypothecated.',
    icon: <IconShield />,
  },
  {
    title: 'Real-time pricing',
    body: 'Tied to live LBMA spot — no sneaky markup. The price you see is the price you pay.',
    icon: <IconChart />,
  },
  {
    title: 'Sell back in seconds',
    body: 'Liquidate any portion at the live bid with same-day settlement to your bank.',
    icon: <IconBolt />,
  },
  {
    title: 'Insured & vault-stored',
    body: 'Stored in fully insured Brink&rsquo;s vaults across Zurich, London and Singapore.',
    icon: <IconVault />,
  },
  {
    title: 'Take physical delivery',
    body: 'Whenever you&rsquo;re ready, redeem your holdings as certified bars or coins to your door.',
    icon: <IconBox />,
  },
  {
    title: 'Built for modern buyers',
    body: 'A clean, mobile-first experience that turns gold ownership into a 60-second decision.',
    icon: <IconSpark />,
  },
];

export default function Benefits() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.bft-card', {
        y: 28,
        opacity: 0,
        duration: 0.85,
        ease: 'expo.out',
        stagger: 0.06,
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      gsap.from('.bft-heading', {
        y: 20,
        opacity: 0,
        duration: 0.9,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 82%',
          once: true,
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="benefits"
      className="relative isolate py-28 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="bft-heading max-w-2xl">
          <div className="eyebrow">Why Placeholder</div>
          <h2 className="font-display mt-3 text-balance text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
            Premium-grade gold ownership, without the friction.
          </h2>
          <p className="mt-5 text-pretty text-base text-ink-soft md:text-lg">
            We rebuilt the experience of owning gold from scratch — with the
            transparency, speed and clarity you&rsquo;d expect from a modern
            fintech.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="bft-card halo group relative rounded-3xl border border-hairline bg-pearl p-7 transition-transform duration-500 hover:-translate-y-1.5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-50 text-gold-700 transition-colors group-hover:bg-gold-100">
                {b.icon}
              </div>
              <h3 className="font-display mt-6 text-xl font-semibold tracking-tight text-ink">
                {b.title}
              </h3>
              <p
                className="mt-2.5 text-[0.97rem] leading-relaxed text-ink-soft"
                dangerouslySetInnerHTML={{ __html: b.body }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function IconShield() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2.2 2.2L15 10"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconChart() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 19h16M6 16l4-5 3 3 5-7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconBolt() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconVault() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="14" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M14 9v1.5M14 13.5V15M11 12h1.5M15.5 12H17"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M6 12H8M5 19v1.5M19 19v1.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconBox() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 7l9-4 9 4v10l-9 4-9-4V7z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M3 7l9 4 9-4M12 11v10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconSpark() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
