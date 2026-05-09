'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SPOT_PER_GRAM = 77.69; // illustrative

export default function CashGold() {
  const rootRef = useRef<HTMLElement>(null);
  const [grams, setGrams] = useState(20);

  const total = (grams * SPOT_PER_GRAM).toFixed(2);
  const formatted = Number(total).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cash-fade', {
        y: 28,
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
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="cash"
      className="relative isolate py-28 md:py-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-gold-soft opacity-70 blur-2xl"
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <div className="cash-fade eyebrow">Cash gold purchase</div>
          <h2 className="cash-fade font-display mt-3 max-w-xl text-balance text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
            Own real gold in seconds.
          </h2>
          <p className="cash-fade mt-5 max-w-lg text-pretty text-base text-ink-soft md:text-lg">
            Pay in full at the live spot price and we&rsquo;ll allocate
            certified bullion to your name. Held in fully insured Brink&rsquo;s
            vaults — yours to keep, sell, or take delivery of, anytime.
          </p>

          <ul className="cash-fade mt-8 grid max-w-md grid-cols-1 gap-3 text-[0.97rem] text-ink-soft sm:grid-cols-2">
            <Feature>Live spot pricing</Feature>
            <Feature>Buy from 1 gram</Feature>
            <Feature>0% storage for 12 months</Feature>
            <Feature>Insured allocation</Feature>
            <Feature>Sell back instantly</Feature>
            <Feature>Physical delivery available</Feature>
          </ul>

          <div className="cash-fade mt-9">
            <a href="#cta" className="btn-gold">
              Buy gold now
              <Arrow />
            </a>
          </div>
        </div>

        {/* Calculator card */}
        <div className="cash-fade lg:col-span-6">
          <div className="card halo relative overflow-hidden p-7 md:p-9">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold-soft blur-2xl"
            />

            <div className="flex items-center justify-between">
              <div className="text-xs font-medium uppercase tracking-[0.22em] text-ink-mute">
                Quick estimate
              </div>
              <div className="rounded-full border border-hairline bg-canvas px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-gold-600">
                Live · ${SPOT_PER_GRAM.toFixed(2)}/g
              </div>
            </div>

            <div className="mt-7 flex items-baseline gap-3">
              <div className="font-display text-[clamp(2.6rem,7vw,4.4rem)] font-extrabold leading-none tracking-tight text-ink tabular">
                {formatted}
              </div>
            </div>
            <div className="mt-2 text-sm text-ink-mute">
              You&rsquo;ll receive{' '}
              <span className="font-medium text-ink">
                {grams.toFixed(0)} g
              </span>{' '}
              of LBMA-certified gold ·{' '}
              <span className="text-emerald-600">all-in price</span>
            </div>

            <div className="mt-7">
              <div className="flex items-center justify-between text-xs font-medium uppercase tracking-[0.18em] text-ink-mute">
                <span>Amount</span>
                <span className="tabular text-ink">{grams} g</span>
              </div>
              <input
                type="range"
                min={1}
                max={250}
                step={1}
                value={grams}
                onChange={(e) => setGrams(Number(e.target.value))}
                className="mt-4 w-full"
                aria-label="Grams of gold"
              />
              <div className="mt-2 flex justify-between text-[11px] text-ink-mute tabular">
                <span>1 g</span>
                <span>50 g</span>
                <span>100 g</span>
                <span>250 g</span>
              </div>
            </div>

            <div className="mt-7 grid grid-cols-3 gap-2">
              {[5, 20, 50].map((g) => (
                <button
                  key={g}
                  onClick={() => setGrams(g)}
                  className={`rounded-2xl border px-3 py-2.5 text-sm font-medium transition ${
                    grams === g
                      ? 'border-gold-300 bg-gold-50 text-gold-700'
                      : 'border-hairline bg-canvas text-ink-soft hover:border-gold-300/70 hover:bg-gold-50/60'
                  }`}
                >
                  {g} g
                </button>
              ))}
            </div>

            <div className="hairline-soft mt-7" />

            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-ink-mute">
                <Lock /> Secure checkout · 256-bit encrypted
              </div>
              <a
                href="#cta"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700 hover:text-gold-600"
              >
                Continue <Arrow small />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Feature({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-gold-50 text-gold-700">
        <Check />
      </span>
      <span>{children}</span>
    </li>
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

function Arrow({ small = false }: { small?: boolean }) {
  const s = small ? 14 : 16;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
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

function Lock() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="4"
        y="11"
        width="16"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M8 11V7a4 4 0 1 1 8 0v4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
