'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: 'Starter',
    months: '3 months',
    monthly: '$120',
    target: '5 g',
    perks: [
      'Zero interest',
      'Auto-pay supported',
      'Pause once · no fee',
    ],
    featured: false,
  },
  {
    name: 'Builder',
    months: '12 months',
    monthly: '$240',
    target: '36 g',
    perks: [
      'Zero interest',
      'Locked-in price option',
      'Free vault for 12 mo',
      'Sell back anytime',
    ],
    featured: true,
  },
  {
    name: 'Vault',
    months: '24 months',
    monthly: '$480',
    target: '150 g',
    perks: [
      'Zero interest',
      'Priority allocation',
      'Free physical delivery',
      'Dedicated advisor',
    ],
    featured: false,
  },
];

export default function InstallmentPlans() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.plan-card', {
        y: 36,
        opacity: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 78%',
          once: true,
        },
      });

      gsap.from('.plans-heading', {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="plans"
      className="relative isolate py-28 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="plans-heading flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="eyebrow">Installment plans</div>
            <h2 className="font-display mt-3 max-w-2xl text-balance text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
              Stack gold, one month at a time.
            </h2>
            <p className="mt-5 max-w-xl text-pretty text-base text-ink-soft md:text-lg">
              Lock in today&rsquo;s spot and split the cost across 3, 12 or 24
              months. Your gold is allocated immediately and released on
              completion — no interest, no surprises.
            </p>
          </div>
          <div className="rounded-full border border-hairline bg-pearl px-4 py-2 text-xs font-medium text-ink-soft">
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
            0% APR · early payoff anytime
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`plan-card halo group relative flex flex-col rounded-3xl p-7 transition-transform duration-500 hover:-translate-y-1.5 md:p-8 ${
                p.featured
                  ? 'glass-gold'
                  : 'border border-hairline bg-pearl'
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-7 rounded-full bg-gold-gradient px-3 py-1 text-[11px] font-semibold tracking-wide text-[#1A1306] shadow-[0_8px_20px_-8px_rgba(176,127,30,0.55)]">
                  Most popular
                </span>
              )}

              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">
                  {p.name}
                </h3>
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-ink-mute">
                  {p.months}
                </span>
              </div>

              <div className="mt-7 flex items-baseline gap-2">
                <span className="font-display text-5xl font-extrabold tracking-tight text-ink tabular">
                  {p.monthly}
                </span>
                <span className="text-sm text-ink-mute">/ month</span>
              </div>
              <div className="mt-1 text-sm text-ink-soft">
                Target:{' '}
                <span className="font-medium text-ink">{p.target}</span> of
                allocated gold
              </div>

              <ul className="mt-7 space-y-3 text-[0.95rem] text-ink-soft">
                {p.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-gold-50 text-gold-700">
                      <Check />
                    </span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-9">
                <a
                  href="#cta"
                  className={
                    p.featured
                      ? 'btn-gold w-full justify-center'
                      : 'btn-ghost w-full justify-center'
                  }
                >
                  Choose {p.name}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-ink-mute">
          <span>★ Cancel anytime</span>
          <span>★ Pause up to 2 months</span>
          <span>★ KYC in under 60 seconds</span>
          <span>★ No credit check required</span>
        </div>
      </div>
    </section>
  );
}

function Check() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12.5l4.5 4.5L19 7"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
