import Image from 'next/image';

const stats = [
  { v: '+8.4%', l: 'Annualized return (10y)' },
  { v: '5,000y', l: 'Of preserved value' },
  { v: '#1', l: 'Inflation hedge' },
];

export default function MarketInsight() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1606189934846-a527add8a77b?auto=format&fit=crop&w=2000&q=80"
          alt=""
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/90 to-ink-900/40" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:px-10">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-gold-400">
            Market Insight
          </span>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-white md:text-5xl">
            Why Gold? <span className="text-gold-gradient">Always.</span>
          </h2>
          <p className="mt-6 text-lg text-neutral-300">
            Through wars, recessions, and currency collapses, gold has remained
            the world&apos;s most durable store of value. It isn&apos;t tied to a balance
            sheet, can&apos;t be printed away, and grows scarcer every year.
          </p>
          <p className="mt-4 text-neutral-400">
            Owning physical bullion isn&apos;t speculation — it&apos;s diversification,
            sovereignty, and a hedge against the unpredictable.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {stats.map((s) => (
              <div key={s.l} className="glass rounded-2xl p-5">
                <div className="text-gold-gradient font-serif text-2xl md:text-3xl">
                  {s.v}
                </div>
                <div className="mt-2 text-xs text-neutral-400">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden lg:block" />
      </div>
    </section>
  );
}
