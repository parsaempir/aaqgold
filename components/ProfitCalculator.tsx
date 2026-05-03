'use client';

import { useMemo, useState } from 'react';

const RATE = 0.084;

export default function ProfitCalculator() {
  const [amount, setAmount] = useState(5000);
  const [years, setYears] = useState(5);

  const { future, profit, pct } = useMemo(() => {
    const future = Math.round(amount * Math.pow(1 + RATE, years));
    const profit = future - amount;
    const pct = ((profit / amount) * 100).toFixed(1);
    return { future, profit, pct };
  }, [amount, years]);

  return (
    <section id="calculator" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <div className="mb-14 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-400">
            Profit Calculator
          </span>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-white md:text-5xl">
            Project Your{' '}
            <span className="text-gold-gradient">Future Value</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-neutral-400">
            Based on gold&apos;s 10-year average annualized return of 8.4%. Past
            performance is not a guarantee of future results.
          </p>
        </div>

        <div className="glass grid items-center gap-10 rounded-3xl p-8 md:grid-cols-2 md:p-10">
          <div className="space-y-8">
            <div>
              <label className="text-sm text-neutral-400">
                Investment amount
              </label>
              <div className="mt-2 font-serif text-3xl text-white">
                ${amount.toLocaleString()}
              </div>
              <input
                type="range"
                min={500}
                max={50000}
                step={100}
                value={amount}
                onChange={(e) => setAmount(+e.target.value)}
                className="mt-3 w-full"
              />
              <div className="mt-1 flex justify-between text-xs text-neutral-500">
                <span>$500</span>
                <span>$50,000</span>
              </div>
            </div>
            <div>
              <label className="text-sm text-neutral-400">Hold for</label>
              <div className="mt-2 font-serif text-3xl text-white">
                {years} {years === 1 ? 'year' : 'years'}
              </div>
              <input
                type="range"
                min={1}
                max={20}
                value={years}
                onChange={(e) => setYears(+e.target.value)}
                className="mt-3 w-full"
              />
              <div className="mt-1 flex justify-between text-xs text-neutral-500">
                <span>1y</span>
                <span>20y</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gold-400/15 bg-ink-800 p-7">
            <div className="text-xs uppercase tracking-[0.25em] text-gold-300">
              Projected Future Value
            </div>
            <div className="text-gold-gradient mt-3 font-serif text-5xl md:text-6xl">
              ${future.toLocaleString()}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs uppercase tracking-widest text-neutral-400">
                  Profit
                </div>
                <div className="mt-1 font-serif text-xl text-emerald-300">
                  +${profit.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-neutral-400">
                  Return
                </div>
                <div className="mt-1 font-serif text-xl text-emerald-300">
                  +{pct}%
                </div>
              </div>
            </div>
            <button className="bg-gold-gradient gold-shine mt-7 w-full rounded-full py-3.5 font-semibold text-ink-900 transition-all hover:shadow-xl hover:shadow-gold-400/20">
              Invest This Amount
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
