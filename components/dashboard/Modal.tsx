'use client';

import { ReactNode, useEffect } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
};

export default function Modal({
  open,
  onClose,
  title,
  subtitle,
  children,
  size = 'md',
}: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const widthCls =
    size === 'sm' ? 'max-w-sm' : size === 'lg' ? 'max-w-2xl' : 'max-w-md';

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-4">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-ink/45 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        className={`card relative w-full ${widthCls} animate-[modalIn_320ms_cubic-bezier(0.22,1,0.36,1)] !rounded-3xl !rounded-b-none p-0 sm:!rounded-3xl`}
        style={{ maxHeight: 'calc(100vh - 1rem)' }}
      >
        <div className="flex items-start justify-between gap-4 border-b border-hairline px-6 py-5 sm:px-7">
          <div>
            <div className="font-display text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
              {title}
            </div>
            {subtitle ? (
              <div className="mt-1 text-[0.92rem] text-ink-mute">{subtitle}</div>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-hairline bg-pearl text-ink-soft transition-colors hover:border-gold-300/60 hover:bg-gold-50 hover:text-ink"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div
          className="overflow-y-auto px-6 py-6 sm:px-7"
          style={{ maxHeight: 'calc(100vh - 8rem)' }}
        >
          {children}
        </div>
      </div>
      <style>{`@keyframes modalIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}
