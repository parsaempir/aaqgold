'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SPOT_24K_USD_PER_G = 84.95;
const G_PER_OZ = 31.1035;

const purities = [
  { id: '18K', label: '18K', ratio: 0.75 },
  { id: '21K', label: '21K', ratio: 0.875 },
  { id: '24K', label: '24K', ratio: 1.0 },
] as const;
type PurityId = (typeof purities)[number]['id'];

type Unit = 'g' | 'oz';

const fmtUSD = (n: number) =>
  n.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

export default function GoldCalculator() {
  const [weight, setWeight] = useState<number>(50);
  const [unit, setUnit] = useState<Unit>('g');
  const [purityId, setPurityId] = useState<PurityId>('24K');

  const rootRef = useRef<HTMLElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);
  const lastValue = useRef(0);

  const purity = purities.find((p) => p.id === purityId)!;
  const grams = unit === 'g' ? weight : weight * G_PER_OZ;
  const ratePerGram = SPOT_24K_USD_PER_G * purity.ratio;
  const total = Math.max(0, grams * ratePerGram);

  // Subtle reveal on viewport entry.
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gm-fade', {
        y: 22,
        opacity: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 82%',
          once: true,
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // Smooth tween of the displayed value when inputs change.
  useEffect(() => {
    const obj = { v: lastValue.current };
    const tw = gsap.to(obj, {
      v: total,
      duration: 0.5,
      ease: 'power2.out',
      onUpdate() {
        if (valueRef.current) valueRef.current.textContent = fmtUSD(obj.v);
      },
      onComplete() {
        lastValue.current = total;
      },
    });
    return () => {
      tw.kill();
    };
  }, [total]);

  return (
    <section
      ref={rootRef}
      id="calc"
      className="relative isolate py-20 md:py-24"
    >
      <div className="mx-auto max-w-xl px-6">
        <div className="text-center">
          <div className="gm-fade flex justify-center">
            <span className="eyebrow">Gold Measurement</span>
          </div>
          <h2 className="gm-fade font-display mt-4 text-balance text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
            Weigh &amp; estimate your gold.
          </h2>
          <p className="gm-fade mt-3 text-sm text-ink-soft md:text-base">
            Quickly understand weight units and estimate your gold value.
          </p>
        </div>

        <div className="gm-fade mt-10">
          <div className="card halo p-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_30px_60px_-28px_rgba(86,60,0,0.22)] md:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gold-50 text-gold-700">
                <ScaleIcon />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-mute">
                Estimator
              </span>
            </div>

            {/* Weight row */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <label
                htmlFor="gm-weight"
                className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-mute"
              >
                Weight
              </label>
              <div className="flex items-center gap-3">
                <input
                  id="gm-weight"
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step={unit === 'g' ? 1 : 0.01}
                  value={weight}
                  onChange={(e) =>
                    setWeight(Math.max(0, Number(e.target.value) || 0))
                  }
                  className="w-24 border-b border-hairline bg-transparent pb-1 text-right font-display text-xl font-bold tabular text-ink outline-none transition-colors focus:border-gold-400"
                />
                <UnitToggle unit={unit} onChange={setUnit} />
              </div>
            </div>

            {/* Purity row */}
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-mute">
                Purity
              </span>
              <div className="flex gap-2">
                {purities.map((p) => {
                  const active = p.id === purityId;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setPurityId(p.id)}
                      className={`rounded-full border px-3.5 py-1.5 text-xs font-bold tabular tracking-tight transition-colors ${
                        active
                          ? 'border-gold-300 bg-gold-50 text-gold-700'
                          : 'border-hairline bg-canvas text-ink-soft hover:border-gold-300/60 hover:text-ink'
                      }`}
                      aria-pressed={active}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="hairline-soft my-7" />

            {/* Result */}
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-mute">
                  Estimated value
                </div>
                <span
                  ref={valueRef}
                  className="font-display mt-2 block text-3xl font-extrabold tabular text-ink md:text-4xl"
                >
                  {fmtUSD(total)}
                </span>
              </div>
              <div className="text-right text-[10px] font-medium uppercase tracking-[0.18em] text-ink-mute">
                Rate
                <div className="font-display mt-1 text-sm font-semibold tabular normal-case tracking-normal text-ink">
                  ${ratePerGram.toFixed(2)}/g
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────── helpers ────────── */

function UnitToggle({
  unit,
  onChange,
}: {
  unit: Unit;
  onChange: (u: Unit) => void;
}) {
  return (
    <div className="relative inline-flex rounded-full border border-hairline bg-pearl p-0.5 text-xs font-bold">
      <span
        aria-hidden
        className="absolute top-0.5 bottom-0.5 rounded-full bg-gold-gradient shadow-[0_6px_18px_-8px_rgba(176,127,30,0.55)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          width: 'calc(50% - 2px)',
          left: 2,
          transform: `translateX(${unit === 'g' ? 0 : 100}%)`,
        }}
      />
      {(['g', 'oz'] as Unit[]).map((u) => (
        <button
          key={u}
          onClick={() => onChange(u)}
          className={`relative z-10 px-3 py-1 transition-colors duration-300 ${
            unit === u ? 'text-[#1A1306]' : 'text-ink-mute hover:text-ink'
          }`}
          aria-pressed={unit === u}
        >
          {u}
        </button>
      ))}
    </div>
  );
}

function ScaleIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* center post */}
      <path d="M12 4v16" />
      {/* horizontal beam */}
      <path d="M5 7h14" />
      {/* left pan */}
      <path d="M2 7l3 5 3-5" />
      {/* right pan */}
      <path d="M16 7l3 5 3-5" />
      {/* base */}
      <path d="M8 20h8" />
    </svg>
  );
}
