'use client';

import { useEffect, useMemo, useState } from 'react';

type Point = { x: number; y: number };

function seedSeries(n = 24, base = 2380): Point[] {
  return Array.from({ length: n }, (_, i) => ({
    x: i,
    y: +(base + Math.sin(i / 2) * 6).toFixed(2),
  }));
}

function randomSeries(n = 24, base = 2380): Point[] {
  let v = base;
  return Array.from({ length: n }, (_, i) => {
    v += (Math.random() - 0.45) * 6;
    return { x: i, y: +v.toFixed(2) };
  });
}

export default function LiveGoldPrice() {
  const [data, setData] = useState<Point[]>(() => seedSeries());
  const [now, setNow] = useState<string>('');

  useEffect(() => {
    setData(randomSeries());
    setNow(new Date().toLocaleTimeString());
    const id = setInterval(() => {
      setData((d) => {
        const last = d[d.length - 1].y + (Math.random() - 0.45) * 4;
        return [
          ...d.slice(1),
          { x: d[d.length - 1].x + 1, y: +last.toFixed(2) },
        ];
      });
      setNow(new Date().toLocaleTimeString());
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const { last, change, pct, up, max, min, path, area } = useMemo(() => {
    const last = data[data.length - 1].y;
    const first = data[0].y;
    const change = last - first;
    const pct = ((change / first) * 100).toFixed(2);
    const up = change >= 0;
    const w = 600;
    const h = 160;
    const min = Math.min(...data.map((d) => d.y));
    const max = Math.max(...data.map((d) => d.y));
    const span = max - min || 1;
    const pts = data.map((d, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((d.y - min) / span) * (h - 20) - 10;
      return [x, y] as const;
    });
    const path =
      'M ' + pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' L ');
    const area = `${path} L ${w},${h} L 0,${h} Z`;
    return { last, change, pct, up, max, min, path, area };
  }, [data]);

  return (
    <section id="price" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="glass grid items-center gap-10 rounded-3xl p-8 md:p-12 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gold-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />{' '}
              Live
            </div>
            <div className="mt-3 text-sm text-neutral-400">
              XAU / USD · per troy oz
            </div>
            <div className="text-gold-gradient mt-2 font-serif text-5xl md:text-6xl">
              ${last.toFixed(2)}
            </div>
            <div
              className={`mt-2 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm ${
                up
                  ? 'bg-emerald-400/10 text-emerald-300'
                  : 'bg-red-400/10 text-red-300'
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
                strokeLinejoin="round"
              >
                {up ? (
                  <>
                    <path d="M7 17l9.2-9.2" />
                    <path d="M17 17V7H7" />
                  </>
                ) : (
                  <>
                    <path d="M7 7l9.2 9.2" />
                    <path d="M17 7v10H7" />
                  </>
                )}
              </svg>
              {up ? '+' : ''}
              {change.toFixed(2)} ({pct}%)
            </div>
            <div className="mt-6 text-xs text-neutral-500" suppressHydrationWarning>
              Last update {now || '—'}
            </div>
          </div>

          <div className="lg:col-span-2">
            <svg viewBox="0 0 600 160" className="h-44 w-full">
              <defs>
                <linearGradient id="goldFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="goldStroke" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="#F7EDC4" />
                  <stop offset="100%" stopColor="#D4AF37" />
                </linearGradient>
              </defs>
              <path d={area} fill="url(#goldFill)" />
              <path
                d={path}
                fill="none"
                stroke="url(#goldStroke)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { l: '24h High', v: `$${max.toFixed(2)}` },
                { l: '24h Low', v: `$${min.toFixed(2)}` },
                { l: 'Volume', v: '184.2K oz' },
              ].map((s) => (
                <div
                  key={s.l}
                  className="rounded-xl border border-gold-400/10 bg-ink-800/60 p-4"
                >
                  <div className="text-xs uppercase tracking-widest text-neutral-500">
                    {s.l}
                  </div>
                  <div className="mt-1 font-serif text-lg text-white">
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
