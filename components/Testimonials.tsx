const reviews = [
  {
    name: 'Daniel R.',
    role: 'Private Investor',
    q: 'The installment plan let me build a 100g position over six months without timing the market. Bars arrived sealed and certified.',
  },
  {
    name: 'Aisha K.',
    role: 'Family Office',
    q: 'Onboarding was painless and the vault custody during the plan gave us total peace of mind. The buy-back guarantee sealed it.',
  },
  {
    name: 'Marco T.',
    role: 'Entrepreneur',
    q: 'I compared seven bullion dealers. AaqGold had the tightest premium and the cleanest UX, period.',
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-gold-400">
              Testimonials
            </span>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-white md:text-5xl">
              Trusted by <span className="text-gold-gradient">Investors</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="#D4AF37"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-neutral-400">
              4.9 · 2,400+ reviews
            </span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <div key={r.name} className="glass rounded-2xl p-7">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="#D4AF37"
                opacity="0.6"
              >
                <path d="M7 7h4v4H7zm0 6h4v4H7zM13 7h4v4h-4zm0 6h4v4h-4z" />
              </svg>
              <p className="mt-4 leading-relaxed text-neutral-300">
                &ldquo;{r.q}&rdquo;
              </p>
              <div className="mt-6 border-t border-gold-400/10 pt-6">
                <div className="font-medium text-white">{r.name}</div>
                <div className="mt-0.5 text-xs text-neutral-500">{r.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
