'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type Plan = {
  id: string;
  tag: string;
  title: string;
  tagline: string;
  price: string;
  priceNote: string;
  ctaLabel: string;
  ctaHref: string;
  highlight?: boolean;
  perks: { label: string; included: boolean }[];
};

const plans: Plan[] = [
  {
    id: 'cash',
    tag: 'Cash Gold Purchase',
    title: 'Own It Outright',
    tagline:
      'Pay once, hold forever. Best price, fastest settlement, lifetime buy-back.',
    price: '$2,486',
    priceNote: 'live spot · 1 oz bar',
    ctaLabel: 'Buy Gold Now',
    ctaHref: '#cash',
    perks: [
      { label: 'Lowest total price (no fees)', included: true },
      { label: 'Same-day vault settlement', included: true },
      { label: 'Lifetime buy-back at spot', included: true },
      { label: 'Insured 48h global delivery', included: true },
      { label: 'Monthly payments', included: false },
    ],
  },
  {
    id: 'installments',
    tag: 'Installment Gold Purchase',
    title: 'Own It On Your Terms',
    tagline:
      'Lock today’s price. Pay monthly with 0% interest. Take delivery the moment you finish.',
    price: '$207',
    priceNote: '/ month · 12 months · 0% APR',
    ctaLabel: 'Start Installment Plan',
    ctaHref: '#plans',
    highlight: true,
    perks: [
      { label: 'Lock today’s gold price', included: true },
      { label: '3, 6 or 12-month plans', included: true },
      { label: '0% interest on most plans', included: true },
      { label: 'Cancel anytime, refund balance', included: true },
      { label: 'Delivery on final payment', included: true },
    ],
  },
];

export default function Comparison() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-cmp="head"]',
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: '[data-cmp="head"]',
            start: 'top 90%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '[data-cmp="card"]',
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.15,
          immediateRender: false,
          scrollTrigger: {
            trigger: '[data-cmp="grid"]',
            start: 'top 90%',
            once: true,
          },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="cash"
      className="relative overflow-hidden py-24 md:py-32"
    >
      <div
        className="pointer-events-none absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(247,237,196,0.7) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div data-cmp="head" className="mb-14 max-w-2xl md:mb-20">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold-600">
            Cash vs Installments
          </span>
          <h2 className="mt-3 font-serif text-3xl font-light leading-tight tracking-tight text-charcoal-900 sm:text-4xl md:text-5xl">
            Two ways to own gold.
            <br />
            <span className="text-gold-gradient italic">Pick yours.</span>
          </h2>
          <p className="mt-4 max-w-xl text-sm text-charcoal-600 md:text-base">
            Same vault, same certified bullion. Choose to settle in one
            payment, or spread it over months — both routes lead to real,
            physical gold in your name.
          </p>
        </div>

        <div data-cmp="grid" className="grid gap-5 md:grid-cols-2 md:gap-6">
          {plans.map((p) => (
            <article
              key={p.id}
              data-cmp="card"
              className={`group relative overflow-hidden rounded-3xl border p-6 backdrop-blur-md transition-all duration-500 md:p-9 ${
                p.highlight
                  ? 'border-gold-500/40 bg-gradient-to-b from-paper-100/80 via-white/85 to-white/95 shadow-[0_30px_70px_-30px_rgba(146,113,30,0.35)]'
                  : 'border-gold-500/20 bg-white/75 shadow-[0_20px_60px_-30px_rgba(146,113,30,0.22)]'
              } hover:-translate-y-1 hover:border-gold-500/55 hover:shadow-[0_30px_70px_-25px_rgba(146,113,30,0.32)]`}
            >
              {p.highlight && (
                <div className="bg-gold-gradient absolute right-6 top-6 rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-widest text-charcoal-900 shadow-md shadow-gold-500/30">
                  Most Flexible
                </div>
              )}

              <div
                className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(circle, rgba(212,175,55,0.4) 0%, transparent 70%)',
                }}
                aria-hidden
              />

              <div className="relative">
                <div className="text-[10px] uppercase tracking-[0.3em] text-gold-600">
                  {p.tag}
                </div>
                <h3 className="mt-3 font-serif text-3xl font-light text-charcoal-900 md:text-4xl">
                  {p.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-charcoal-600 md:text-base">
                  {p.tagline}
                </p>

                <div className="mt-7 flex items-baseline gap-2">
                  <span className="font-num text-4xl font-semibold text-charcoal-900 md:text-5xl">
                    {p.price}
                  </span>
                  <span className="text-xs text-charcoal-500 md:text-sm">
                    {p.priceNote}
                  </span>
                </div>

                <div className="my-7 h-px bg-gradient-to-r from-transparent via-gold-500/35 to-transparent" />

                <ul className="space-y-3">
                  {p.perks.map((perk) => (
                    <li
                      key={perk.label}
                      className={`flex items-center gap-3 text-sm ${
                        perk.included ? 'text-charcoal-800' : 'text-charcoal-400'
                      }`}
                    >
                      {perk.included ? (
                        <span className="bg-gold-gradient inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-charcoal-900 shadow-sm shadow-gold-500/30">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                      ) : (
                        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-charcoal-400/40 text-charcoal-400">
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                          >
                            <path d="M6 6l12 12M18 6L6 18" />
                          </svg>
                        </span>
                      )}
                      {perk.label}
                    </li>
                  ))}
                </ul>

                <a
                  href={p.ctaHref}
                  className={`mt-9 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all ${
                    p.highlight
                      ? 'bg-gold-gradient gold-shine text-charcoal-900 shadow-lg shadow-gold-500/30 hover:shadow-xl hover:shadow-gold-500/45'
                      : 'border border-gold-500/40 bg-white/60 text-gold-700 hover:border-gold-500 hover:bg-gold-500/10'
                  }`}
                >
                  {p.ctaLabel}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-charcoal-500">
          Live spot price refreshed every 60 seconds · Quotes locked at
          checkout
        </p>
      </div>
    </section>
  );
}
