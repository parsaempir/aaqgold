'use client';

import { useEffect, useState } from 'react';

const BASE = 2387.42;

export default function LivePriceCompact() {
  const [price, setPrice] = useState(BASE);
  const [prev, setPrev] = useState(BASE);

  useEffect(() => {
    const id = setInterval(() => {
      setPrev((p) => p);
      setPrice((cur) => {
        setPrev(cur);
        return +(cur + (Math.random() - 0.45) * 3).toFixed(2);
      });
    }, 3500);
    return () => clearInterval(id);
  }, []);

  const up = price >= prev;

  return (
    <div className="hidden items-center gap-2 rounded-full border border-gold-400/15 bg-ink-800/60 px-3 py-1.5 backdrop-blur-md md:inline-flex">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
      <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
        XAU/oz
      </span>
      <span className="font-serif text-sm text-white tabular-nums" suppressHydrationWarning>
        ${price.toFixed(2)}
      </span>
      <span
        className={`text-[10px] tabular-nums ${
          up ? 'text-emerald-400' : 'text-red-400'
        }`}
      >
        {up ? '▲' : '▼'}
      </span>
    </div>
  );
}
