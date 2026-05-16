'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

type Props = {
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
};

export default function AuthShell({
  eyebrow,
  title,
  subtitle,
  children,
  footer,
}: Props) {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-canvas-fade">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gold-soft opacity-70"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-40 h-[520px] w-[520px] rounded-full bg-gold-200/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full bg-gold-100/40 blur-3xl"
      />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <header className="flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-2.5 text-ink"
            aria-label="Placeholder — home"
          >
            <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gold-gradient shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] transition-transform duration-700 group-hover:rotate-[18deg] sm:h-9 sm:w-9">
              <span className="font-display text-[12px] font-extrabold text-[#1A1306] sm:text-[14px]">
                Ph
              </span>
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/65 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            </span>
            <span className="font-display text-[1.02rem] font-extrabold tracking-tight sm:text-[1.15rem]">
              Placeholder
            </span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-ink-mute transition-colors hover:text-ink"
            aria-label="Back to site"
          >
            <span aria-hidden className="mr-1.5 sm:mr-2">
              ←
            </span>
            <span className="hidden sm:inline">Back to site</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </header>

        <div className="grid flex-1 grid-cols-1 items-center gap-8 py-8 sm:gap-10 sm:py-12 lg:grid-cols-2 lg:gap-16 lg:py-16">
          {/* Form column */}
          <div className="order-2 mx-auto w-full max-w-md lg:order-1 lg:mx-0 lg:ml-auto lg:mr-0 lg:pr-6 xl:pr-12">
            <span className="eyebrow">{eyebrow}</span>
            <h1 className="font-display mt-3 text-balance text-[2rem] font-extrabold leading-[1.05] tracking-tight text-ink sm:mt-4 sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="mt-2.5 text-pretty text-[0.95rem] leading-relaxed text-ink-soft sm:mt-3 sm:text-[0.98rem]">
              {subtitle}
            </p>

            <div className="mt-6 sm:mt-8">{children}</div>

            <div className="mt-6 text-sm text-ink-mute sm:mt-8">{footer}</div>
          </div>

          {/* Visual column */}
          <div className="order-1 hidden lg:order-2 lg:block">
            <BrandPanel />
          </div>
        </div>

        <footer className="mt-4 flex flex-col items-start justify-between gap-2 text-xs text-ink-mute sm:mt-6 sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} Placeholder Gold Inc.</div>
          <div className="flex items-center gap-4 sm:gap-5">
            <Link href="/" className="transition-colors hover:text-ink">
              Terms
            </Link>
            <Link href="/" className="transition-colors hover:text-ink">
              Privacy
            </Link>
            <Link href="/" className="transition-colors hover:text-ink">
              Help
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}

function BrandPanel() {
  return (
    <div className="card halo relative grain overflow-hidden p-8 xl:p-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gold-gradient opacity-25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-gold-100/60 blur-3xl"
      />

      <span className="eyebrow">Trusted vaults</span>
      <h2 className="font-display mt-4 text-balance text-3xl font-extrabold leading-[1.1] tracking-tight text-ink">
        Real gold,{' '}
        <span className="text-gold-shine">allocated to your name.</span>
      </h2>
      <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed text-ink-soft">
        Buy in seconds, sell anytime, or take delivery. Every gram is
        vault-stored, fully insured, and independently audited.
      </p>

      <ul className="mt-8 space-y-3.5">
        {[
          'LBMA-certified bars & coins',
          'Lloyd’s of London insured',
          'Withdraw or redeem anytime',
        ].map((line) => (
          <li
            key={line}
            className="flex items-center gap-3 text-[0.95rem] text-ink-soft"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-50 text-gold-600 ring-1 ring-gold-200">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M5 12.5l4 4 10-10"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            {line}
          </li>
        ))}
      </ul>

      <div className="hairline mt-10" />

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="dot-pulse">
            <span className="relative inline-block h-2 w-2 rounded-full bg-gold-400" />
          </span>
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-ink-mute">
            Live spot price
          </span>
        </div>
        <div className="tabular font-display text-xl font-extrabold text-ink">
          $2,418
          <span className="ml-1 text-xs font-medium text-ink-mute">/oz</span>
        </div>
      </div>
    </div>
  );
}
