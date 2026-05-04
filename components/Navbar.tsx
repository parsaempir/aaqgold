'use client';

import { useEffect, useState } from 'react';
import LivePriceCompact from './LivePriceCompact';

const links = [
  { href: '#bars', label: 'Bars' },
  { href: '#installment', label: 'Installment' },
  { href: '#help', label: 'Help' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-gold-400/10 bg-ink-900/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-ink-900/40 backdrop-blur-md'
      }`}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 md:h-16 md:px-8">
        <a href="#top" className="group flex items-center gap-2">
          <div className="bg-gold-gradient flex h-7 w-7 items-center justify-center rounded-full font-serif text-sm font-bold text-ink-900 transition-transform group-hover:scale-110">
            P
          </div>
          <span className="font-serif text-base tracking-wide text-white">
            Place<span className="text-gold-400">holder</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-neutral-300 transition-colors hover:text-gold-300"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LivePriceCompact />
          <a
            href="#bars"
            className="bg-gold-gradient gold-shine rounded-full px-4 py-1.5 text-xs font-semibold text-ink-900 md:px-5 md:text-sm"
          >
            Buy
          </a>
        </div>
      </div>
    </header>
  );
}
