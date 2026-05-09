'use client';

import { useEffect, useState } from 'react';

const BASE = 4_312_000; // IRT/گرم — placeholder live ticker

export default function LivePriceCompact() {
  const [price, setPrice] = useState(BASE);
  const [prev, setPrev] = useState(BASE);

  useEffect(() => {
    const id = setInterval(() => {
      setPrice((cur) => {
        setPrev(cur);
        return Math.round(cur + (Math.random() - 0.45) * 4500);
      });
    }, 3500);
    return () => clearInterval(id);
  }, []);

  const up = price >= prev;

  return (
    <div className="hidden items-center gap-2 rounded-full border border-gold-400/25 bg-onyx/70 px-3 py-1.5 backdrop-blur-md md:inline-flex">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
      <span className="text-[10px] uppercase tracking-[0.2em] text-pearl-mute">
        طلا / گرم
      </span>
      <span
        className="font-num text-sm font-medium text-pearl tabular"
        suppressHydrationWarning
      >
        {price.toLocaleString('fa-IR')}
      </span>
      <span
        className={`font-num text-[10px] tabular ${
          up ? 'text-emerald-400' : 'text-rose-400'
        }`}
      >
        {up ? '▲' : '▼'}
      </span>
    </div>
  );
}
