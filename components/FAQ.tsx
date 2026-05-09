'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: 'Is the gold I buy real, physical gold?',
    a: 'Yes. Every gram you buy is matched 1:1 with serial-numbered, LBMA-certified bullion held in your name. You can take physical delivery whenever you want.',
  },
  {
    q: 'How does the installment plan work?',
    a: 'Pick a plan length (3, 12 or 24 months). We allocate your gold immediately at today’s spot price; you pay equal monthly installments with 0% interest. Your gold is released to you on completion.',
  },
  {
    q: 'What happens if the gold price changes during my plan?',
    a: 'Your price is locked when you start a plan, so swings in spot don’t affect what you pay. You can also choose a flexible plan that buys grams monthly at the current spot.',
  },
  {
    q: 'Where is my gold stored, and is it insured?',
    a: 'In fully insured Brink’s vaults across Zurich, London and Singapore. Your holdings are insured at full market value by Lloyd’s of London and audited monthly.',
  },
  {
    q: 'Can I sell my gold back at any time?',
    a: 'Yes. You can sell back any portion at the live bid price with same-day settlement to your linked bank account. There are no lock-ups.',
  },
  {
    q: 'Are there any hidden fees?',
    a: 'No. Pricing is tied to live LBMA spot with a single transparent spread. The first 12 months of vault storage are free.',
  },
];

export default function FAQ() {
  const rootRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.faq-row', {
        y: 18,
        opacity: 0,
        duration: 0.7,
        ease: 'expo.out',
        stagger: 0.05,
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
      id="faq"
      className="relative isolate py-28 md:py-36"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-12">
        <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
          <div className="eyebrow">Frequently asked</div>
          <h2 className="font-display mt-3 text-balance text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
            Questions, answered.
          </h2>
          <p className="mt-5 max-w-md text-pretty text-base text-ink-soft md:text-lg">
            Everything you need to know about buying, holding and redeeming
            gold with Aurea. Still curious?{' '}
            <a className="font-medium text-gold-700 underline-offset-4 hover:underline" href="#cta">
              Talk to us
            </a>
            .
          </p>
        </div>

        <div className="lg:col-span-8">
          <div className="rounded-3xl border border-hairline bg-pearl">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={f.q}
                  className={`faq-row ${
                    i !== 0 ? 'border-t border-hairline' : ''
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left md:px-8 md:py-6"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-lg font-semibold tracking-tight text-ink md:text-xl">
                      {f.q}
                    </span>
                    <span
                      className={`flex h-9 w-9 flex-none items-center justify-center rounded-full border transition ${
                        isOpen
                          ? 'border-gold-300 bg-gold-50 text-gold-700 rotate-45'
                          : 'border-hairline bg-canvas text-ink-mute'
                      }`}
                    >
                      <Plus />
                    </span>
                  </button>
                  <div
                    className={`grid overflow-hidden px-6 transition-[grid-template-rows,opacity] duration-500 ease-out md:px-8 ${
                      isOpen
                        ? 'grid-rows-[1fr] pb-6 opacity-100 md:pb-7'
                        : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <p className="overflow-hidden text-pretty text-[0.97rem] leading-relaxed text-ink-soft">
                      {f.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Plus() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
