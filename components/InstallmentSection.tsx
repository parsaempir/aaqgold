'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';

const plans = [
  { months: 3, label: '3 Months' },
  { months: 6, label: '6 Months' },
  { months: 12, label: '12 Months' },
];

const benefits = [
  'Fixed price at purchase — no market exposure',
  'Vault-stored & insured during the plan',
  'Cancel anytime — get back what you paid',
  'No hidden fees, no compounding interest',
];

export default function InstallmentSection() {
  const [amount, setAmount] = useState(1000);
  const [months, setMonths] = useState(6);
  const monthly = useMemo(() => Math.round(amount / months), [amount, months]);

  return (
    <section
      id="installment"
      className="relative overflow-hidden py-24 md:py-32"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1624365168968-3eaf1e8a9f56?auto=format&fit=crop&w=2000&q=80"
          alt=""
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-900/85 to-ink-900" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-start gap-14 lg:grid-cols-2">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-gold-400">
              Installment Plans
            </span>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-white md:text-5xl">
              Own Gold, <span className="text-gold-gradient">Pay Monthly</span>
            </h2>
            <p className="mt-6 text-lg text-neutral-300">
              Lock in today&apos;s price and pay over time. We hold your bar in
              an insured vault until your final installment, then ship it sealed
              and certified.
            </p>

            <div className="mt-10 space-y-4">
              {benefits.map((t) => (
                <div key={t} className="flex items-start gap-3">
                  <div className="bg-gold-gradient mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#0A0A0A"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-neutral-300">{t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-3xl p-7 md:p-9">
            <div className="text-xs uppercase tracking-[0.25em] text-gold-300">
              Plan Calculator
            </div>
            <div className="mt-2 font-serif text-2xl text-white md:text-3xl">
              Estimate Your Monthly
            </div>

            <div className="mt-8">
              <label className="text-sm text-neutral-400">Total amount</label>
              <div className="text-gold-gradient mt-2 font-serif text-3xl">
                ${amount.toLocaleString()}
              </div>
              <input
                type="range"
                min={100}
                max={10000}
                step={100}
                value={amount}
                onChange={(e) => setAmount(+e.target.value)}
                className="mt-3 w-full"
              />
              <div className="mt-1 flex justify-between text-xs text-neutral-500">
                <span>$100</span>
                <span>$10,000</span>
              </div>
            </div>

            <div className="mt-8">
              <label className="text-sm text-neutral-400">Plan duration</label>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {plans.map((p) => (
                  <button
                    key={p.months}
                    onClick={() => setMonths(p.months)}
                    className={`rounded-xl px-3 py-3 text-sm font-medium transition-all ${
                      months === p.months
                        ? 'bg-gold-gradient text-ink-900'
                        : 'border border-gold-400/20 text-neutral-300 hover:border-gold-400/50'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-gold-400/15 bg-ink-800 p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-400">Per month</span>
                <span className="text-gold-gradient font-serif text-3xl">
                  ${monthly.toLocaleString()}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-neutral-500">
                <span>{months} payments · 0% interest</span>
                <span>Total ${amount.toLocaleString()}</span>
              </div>
            </div>

            <button className="bg-gold-gradient gold-shine mt-6 w-full rounded-full py-4 font-semibold text-ink-900 transition-all hover:shadow-xl hover:shadow-gold-400/20">
              Start Plan →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
