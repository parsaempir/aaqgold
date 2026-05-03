const items = [
  {
    t: 'Authentic Certified Gold',
    d: 'Every bar is LBMA-accredited with assay certificate and unique serial number.',
  },
  {
    t: 'Secure Transactions',
    d: 'Bank-grade encryption, escrow service, and multi-factor authentication.',
  },
  {
    t: 'Fast Insured Delivery',
    d: 'Discreet, fully insured shipping arriving within 2–5 business days.',
  },
  {
    t: '24/7 Customer Support',
    d: 'Real human specialists available around the clock via chat, phone, and email.',
  },
  {
    t: 'Lifetime Buy-Back',
    d: 'We buy back any bar we sold at the prevailing market rate — no questions asked.',
  },
  {
    t: 'Transparent Pricing',
    d: 'Live spot pricing with a clear, fixed premium. No hidden fees ever.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-14 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-400">
            Why Choose Us
          </span>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-white md:text-5xl">
            Built on <span className="text-gold-gradient">Trust</span>
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <div
              key={it.t}
              className="glass group rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-gold-400/40"
            >
              <div className="text-gold-gradient font-serif text-3xl">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="mt-4 text-lg font-medium text-white">{it.t}</div>
              <div className="mt-2 text-sm leading-relaxed text-neutral-400">
                {it.d}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
