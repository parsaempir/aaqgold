const badges = [
  { title: 'Secure Payment', desc: '256-bit encryption + escrow', icon: 'shield' },
  { title: 'Certified Gold', desc: 'LBMA-accredited refineries', icon: 'badge' },
  { title: 'Authenticity Guaranteed', desc: 'Serial number + assay card', icon: 'check' },
  { title: 'Insured Delivery', desc: 'Up to $250,000 coverage', icon: 'truck' },
];

const Icon = ({ name }: { name: string }) => {
  const props = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  switch (name) {
    case 'shield':
      return (
        <svg {...props}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case 'badge':
      return (
        <svg {...props}>
          <circle cx="12" cy="9" r="6" />
          <path d="M9 14l-2 7 5-3 5 3-2-7" />
        </svg>
      );
    case 'check':
      return (
        <svg {...props}>
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
          <path d="M22 4L12 14.01l-3-3" />
        </svg>
      );
    case 'truck':
      return (
        <svg {...props}>
          <rect x="1" y="3" width="15" height="13" />
          <path d="M16 8h4l3 3v5h-7" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      );
    default:
      return null;
  }
};

export default function TrustSection() {
  return (
    <section className="relative border-y border-gold-400/10 bg-ink-900 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {badges.map((b) => (
            <div
              key={b.title}
              className="glass group flex items-start gap-4 rounded-2xl p-5 transition-all hover:border-gold-400/40"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-400/10 text-gold-400 transition-all group-hover:[background-image:linear-gradient(135deg,#E6C45D_0%,#D4AF37_50%,#B8902A_100%)] group-hover:text-ink-900">
                <Icon name={b.icon} />
              </div>
              <div>
                <div className="text-sm font-medium text-white md:text-base">
                  {b.title}
                </div>
                <div className="mt-1 text-xs text-neutral-400 md:text-sm">
                  {b.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-12 max-w-3xl text-center text-sm text-neutral-400 md:text-base">
          Every gram is sourced from{' '}
          <span className="text-gold-300">LBMA-accredited refineries</span>,
          sealed in tamper-evident packaging, and shipped under fully insured
          chain-of-custody.
        </p>
      </div>
    </section>
  );
}
