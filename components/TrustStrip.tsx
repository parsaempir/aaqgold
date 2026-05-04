const items = [
  { label: 'LBMA Certified' },
  { label: 'Insured Delivery' },
  { label: '0% Interest Plans' },
  { label: 'Lifetime Buy-Back' },
];

export default function TrustStrip() {
  return (
    <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-1.5 px-3 sm:gap-x-4 sm:px-4 md:gap-x-6 md:px-8">
      {items.map((it, i) => (
        <div key={it.label} className="flex items-center gap-1.5 sm:gap-2">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gold-400 md:h-[13px] md:w-[13px]"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-[10px] uppercase tracking-[0.15em] text-neutral-400 sm:tracking-[0.2em] md:text-[11px]">
            {it.label}
          </span>
          {i < items.length - 1 && (
            <span className="ml-3 hidden h-1 w-1 rounded-full bg-gold-400/30 md:ml-4 md:inline-block" />
          )}
        </div>
      ))}
    </div>
  );
}
