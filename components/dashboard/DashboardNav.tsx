'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDashboard } from './DashboardProvider';

const navItems = [
  { href: '#overview', label: 'Overview' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#activity', label: 'Activity' },
  { href: '#plans', label: 'Plans' },
];

type Props = {
  email?: string;
  firstName?: string;
};

type MenuItem = {
  label: string;
  modal: 'account' | 'vault' | 'help';
};

const menuItems: MenuItem[] = [
  { label: 'Account settings', modal: 'account' },
  { label: 'Vault & insurance', modal: 'vault' },
  { label: 'Help center', modal: 'help' },
];

export default function DashboardNav({ email, firstName }: Props) {
  const router = useRouter();
  const { setModal } = useDashboard();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const initials = (firstName?.[0] ?? email?.[0] ?? 'U').toUpperCase();
  const handle = firstName || email?.split('@')[0] || 'Vault holder';

  const signOut = () => {
    try {
      sessionStorage.removeItem('placeholder_user');
    } catch {}
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50">
      <div className={`transition-[padding] duration-500 ${scrolled ? 'pt-2.5' : 'pt-4'}`}>
        <div className="mx-auto max-w-7xl px-4">
          <div
            className={`relative flex items-center justify-between rounded-full px-3 py-2 transition-all duration-500 sm:px-5 sm:py-3 ${
              scrolled
                ? 'glass-strong border border-hairline'
                : 'border border-transparent bg-transparent'
            }`}
          >
            <Link
              href="/"
              className="group flex items-center gap-2.5 px-1 text-ink"
              aria-label="Placeholder — home"
            >
              <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gold-gradient shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] transition-transform duration-700 group-hover:rotate-[18deg]">
                <span className="font-display text-[13px] font-extrabold text-[#1A1306]">
                  Ph
                </span>
              </span>
              <span className="font-display hidden text-[1.05rem] font-extrabold tracking-tight sm:inline">
                Placeholder
              </span>
            </Link>

            <nav className="hidden items-center lg:flex">
              {navItems.map((l) => (
                <a key={l.href} href={l.href} className="nav-link">
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Notifications"
                className="hidden h-9 w-9 items-center justify-center rounded-full border border-hairline bg-pearl/70 text-ink-soft transition-colors hover:border-gold-300/60 hover:bg-gold-50 sm:flex"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M6 8a6 6 0 1 1 12 0c0 3.7.9 5.3 1.8 6.5.4.5 0 1.5-.8 1.5H5c-.8 0-1.2-1-.8-1.5C5.1 13.3 6 11.7 6 8z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 19a2 2 0 0 0 4 0"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setMenuOpen((v) => !v)}
                  className="flex items-center gap-2 rounded-full border border-hairline bg-pearl/80 py-1 pl-1 pr-2.5 backdrop-blur transition-all hover:border-gold-300/55 sm:pr-3"
                  aria-haspopup="menu"
                  aria-expanded={menuOpen}
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-gradient text-[12px] font-extrabold text-[#1A1306] shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]">
                    {initials}
                  </span>
                  <span className="hidden max-w-[10rem] truncate text-sm font-medium text-ink sm:inline">
                    {handle}
                  </span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    aria-hidden
                    className={`text-ink-mute transition-transform duration-300 ${
                      menuOpen ? 'rotate-180' : ''
                    }`}
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </button>

                {menuOpen ? (
                  <>
                    <button
                      type="button"
                      aria-hidden
                      tabIndex={-1}
                      onClick={() => setMenuOpen(false)}
                      className="fixed inset-0 z-10 cursor-default"
                    />
                    <div
                      role="menu"
                      className="glass-strong absolute right-0 top-[calc(100%+0.5rem)] z-20 w-56 overflow-hidden rounded-2xl border border-hairline shadow-[0_30px_80px_-30px_rgba(86,60,0,0.25)]"
                    >
                      <div className="border-b border-hairline px-4 py-3">
                        <div className="text-xs font-medium uppercase tracking-[0.16em] text-ink-mute">
                          Signed in
                        </div>
                        <div className="mt-0.5 truncate text-sm font-semibold text-ink">
                          {email ?? handle}
                        </div>
                      </div>
                      <div className="py-1.5">
                        {menuItems.map((item) => (
                          <button
                            key={item.label}
                            type="button"
                            onClick={() => {
                              setMenuOpen(false);
                              setModal(item.modal);
                            }}
                            className="block w-full px-4 py-2 text-left text-sm text-ink-soft transition-colors hover:bg-gold-50 hover:text-ink"
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                      <div className="border-t border-hairline py-1.5">
                        <button
                          type="button"
                          onClick={signOut}
                          className="block w-full px-4 py-2 text-left text-sm font-medium text-ink-soft transition-colors hover:bg-gold-50 hover:text-ink"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>

          <nav className="mt-2 flex items-center gap-1 overflow-x-auto rounded-full border border-hairline bg-pearl/60 px-2 py-1.5 no-scrollbar lg:hidden">
            {navItems.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="shrink-0 rounded-full px-3 py-1.5 text-[0.82rem] font-medium text-ink-soft transition-colors hover:bg-gold-50 hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
