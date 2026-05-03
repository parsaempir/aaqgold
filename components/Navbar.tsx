'use client';

import { useEffect, useState } from 'react';

const links = [
  { href: '#products', label: 'Products' },
  { href: '#installment', label: 'Installment' },
  { href: '#price', label: 'Live Price' },
  { href: '#calculator', label: 'Calculator' },
  { href: '#faq', label: 'FAQ' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-gold-400/10 bg-ink-900/80 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20 lg:px-10">
        <a href="#top" className="group flex items-center gap-2">
          <div className="bg-gold-gradient flex h-9 w-9 items-center justify-center rounded-full font-serif font-bold text-ink-900 transition-transform group-hover:scale-110">
            A
          </div>
          <span className="font-serif text-xl tracking-wide text-white">
            Aaq<span className="text-gold-400">Gold</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-neutral-300 transition-colors hover:text-gold-400"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#products"
            className="bg-gold-gradient gold-shine rounded-full px-5 py-2 text-sm font-medium text-ink-900 transition-all hover:shadow-lg hover:shadow-gold-400/20"
          >
            Buy Now
          </a>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="p-2 text-neutral-200 md:hidden"
          aria-label="Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <>
                <path d="M6 6L18 18" />
                <path d="M6 18L18 6" />
              </>
            ) : (
              <>
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-gold-400/10 bg-ink-800/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-4 px-6 py-5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-neutral-300 transition-colors hover:text-gold-400"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#products"
              onClick={() => setOpen(false)}
              className="bg-gold-gradient mt-2 rounded-full px-5 py-2.5 text-center text-sm font-medium text-ink-900"
            >
              Buy Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
