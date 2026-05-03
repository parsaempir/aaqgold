'use client';

import { useState } from 'react';

const faqs = [
  {
    q: 'Is the gold I buy genuinely 999.9 purity?',
    a: 'Yes. Every bar is sourced from LBMA-accredited refineries (PAMP, Valcambi, Argor-Heraeus, Perth Mint) and arrives sealed in tamper-evident packaging with an individual assay certificate and unique serial number.',
  },
  {
    q: 'How does the installment plan work?',
    a: 'You lock in today’s price and pay in equal monthly installments over 3, 6, or 12 months at 0% interest. Your bar is reserved and stored in our insured vault. Once your final payment clears, we ship it sealed to your door.',
  },
  {
    q: 'What happens if I cancel mid-plan?',
    a: 'You can cancel any time. We refund 100% of what you have paid, minus a small administrative fee equal to one monthly installment.',
  },
  {
    q: 'How is delivery handled?',
    a: 'Discreet, signature-required, fully insured shipping via FedEx or UPS. Most domestic orders arrive within 2–5 business days. International is available on request.',
  },
  {
    q: 'Can I sell my gold back to you later?',
    a: 'Yes. We offer a lifetime buy-back guarantee at the prevailing market rate on any bar we sold you, with no questions asked.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'Bank transfer, debit & credit card, and select stablecoins (USDC, USDT). Crypto purchases over $10,000 receive a small premium discount.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <div className="mb-12 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-400">
            FAQ
          </span>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-white md:text-5xl">
            Common <span className="text-gold-gradient">Questions</span>
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={`glass overflow-hidden rounded-2xl transition-all ${
                  isOpen ? 'border-gold-400/40' : ''
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-white">{f.q}</span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-400/10 text-gold-300 transition-transform ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 leading-relaxed text-neutral-400">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
