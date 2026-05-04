const items = [
  { label: 'LBMA Certified' },
  { label: 'Insured Delivery' },
  { label: '0% Interest Plans' },
  { label: 'Lifetime Buy-Back' },
];

export default function TrustStrip() {
  return (
    <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 md:px-8">
      {items.map((it, i) => (
        <div key={it.label} className="flex items-center gap-2">
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gold-400"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-400">
            {it.label}
          </span>
          {i < items.length - 1 && (
            <span className="ml-4 hidden h-1 w-1 rounded-full bg-gold-400/30 md:inline-block" />
          )}
        </div>
      ))}
    </div>
  );
}
