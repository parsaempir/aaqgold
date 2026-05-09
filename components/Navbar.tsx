'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const links = [
  { href: '#cash', label: 'Shop' },
  { href: '#story', label: 'The Placeholder way' },
  { href: '#calc', label: 'Calculator' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('');
  const progressRef = useRef<HTMLSpanElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const sheetLinksRef = useRef<HTMLUListElement>(null);
  const sheetCtaRef = useRef<HTMLDivElement>(null);
  const sheetTl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? window.scrollY / max : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${Math.min(1, Math.max(0, ratio))})`;
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Section spy for animated underline
  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Mobile sheet animation timeline
  useEffect(() => {
    if (!sheetRef.current) return;
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } });
    tl.set(sheetRef.current, { display: 'flex' })
      .fromTo(
        sheetRef.current,
        { clipPath: 'inset(0 0 100% 0)', opacity: 1 },
        { clipPath: 'inset(0 0 0% 0)', duration: 0.85 }
      )
      .from(
        sheetLinksRef.current?.children ?? [],
        { yPercent: 130, opacity: 0, duration: 0.9, stagger: 0.06 },
        '-=0.55'
      )
      .from(
        sheetCtaRef.current?.children ?? [],
        { y: 18, opacity: 0, duration: 0.7, stagger: 0.07 },
        '-=0.45'
      );
    sheetTl.current = tl;
    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const tl = sheetTl.current;
    if (!tl) return;
    if (open) {
      document.body.style.overflow = 'hidden';
      tl.play();
    } else {
      document.body.style.overflow = '';
      tl.reverse();
    }
  }, [open]);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <div className="scroll-progress" aria-hidden>
        <span ref={progressRef} style={{ transform: 'scaleX(0)' }} />
      </div>

      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={`transition-[padding] duration-500 ${
            scrolled ? 'pt-2.5' : 'pt-4'
          }`}
        >
          <div className="mx-auto max-w-7xl px-4">
            <div
              className={`relative flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 md:px-5 md:py-3 ${
                scrolled
                  ? 'glass-strong border border-hairline'
                  : 'border border-transparent bg-transparent'
              }`}
            >
              <a
                href="#hero"
                className="group flex items-center gap-2.5 px-1 text-ink"
                aria-label="Placeholder — home"
              >
                <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gold-gradient shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] transition-transform duration-700 group-hover:rotate-[18deg]">
                  <span className="font-display text-[13px] font-extrabold text-[#1A1306]">
                    Ph
                  </span>
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/65 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                </span>
                <span className="font-display text-[1.05rem] font-extrabold tracking-tight">
                  Placeholder
                </span>
              </a>

              <nav className="hidden items-center md:flex">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className={`nav-link ${active === l.href ? 'is-active' : ''}`}
                  >
                    {l.label}
                  </a>
                ))}
              </nav>

              <div className="hidden items-center gap-2 md:flex">
                <a href="#cta" className="nav-link">
                  Sign in
                </a>
                <a href="#cash" className="btn-gold !py-2.5 !px-4 !text-sm">
                  Get started
                </a>
              </div>

              <button
                onClick={() => setOpen((v) => !v)}
                className="relative flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-pearl/70 text-ink md:hidden"
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
              >
                <span className="relative flex h-3 w-[18px] flex-col items-center justify-between">
                  <span
                    className="burger-line"
                    style={{
                      transform: open
                        ? 'translateY(5px) rotate(45deg)'
                        : 'translateY(0) rotate(0)',
                    }}
                  />
                  <span
                    className="burger-line"
                    style={{
                      width: open ? '0px' : '14px',
                      opacity: open ? 0 : 1,
                      alignSelf: 'flex-end',
                    }}
                  />
                  <span
                    className="burger-line"
                    style={{
                      transform: open
                        ? 'translateY(-5px) rotate(-45deg)'
                        : 'translateY(0) rotate(0)',
                      width: open ? '18px' : '12px',
                      alignSelf: 'flex-start',
                    }}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Premium full-screen mobile sheet */}
      <div
        ref={sheetRef}
        className="fixed inset-0 z-40 hidden flex-col bg-canvas-fade md:!hidden"
        style={{ display: 'none' }}
        role="dialog"
        aria-modal="true"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gold-soft opacity-60"
        />
        <div className="relative flex h-full flex-col px-6 pb-8 pt-24">
          <div className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-gold-600">
            Menu
          </div>
          <ul ref={sheetLinksRef} className="flex flex-col">
            {links.map((l, i) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="sheet-link"
                >
                  <span>{l.label}</span>
                  <span className="sheet-num tabular">
                    0{i + 1}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div ref={sheetCtaRef} className="mt-auto grid grid-cols-2 gap-3">
            <a
              href="#cta"
              onClick={() => setOpen(false)}
              className="btn-ghost justify-center"
            >
              Sign in
            </a>
            <a
              href="#cash"
              onClick={() => setOpen(false)}
              className="btn-gold justify-center"
            >
              Get started
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
