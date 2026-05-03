import Image from 'next/image';

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=2400&q=80"
          alt=""
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/90 to-ink-900/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/60 via-transparent to-ink-900" />
      </div>
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
        <span className="text-xs uppercase tracking-[0.3em] text-gold-400">
          Get Started
        </span>
        <h2 className="mt-4 font-serif text-4xl leading-[1.05] text-white md:text-6xl">
          Start Investing in{' '}
          <span className="text-gold-gradient">Gold Today</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-300">
          Open an account in under two minutes. No fees to join. Pay in cash or
          build your position monthly — your wealth, your pace.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="#products"
            className="bg-gold-gradient gold-shine rounded-full px-8 py-4 font-semibold text-ink-900 transition-all hover:shadow-xl hover:shadow-gold-400/30"
          >
            Buy Gold Now
          </a>
          <a
            href="#installment"
            className="rounded-full border border-gold-400/40 px-8 py-4 font-medium text-gold-200 transition-all hover:border-gold-400 hover:bg-gold-400/10"
          >
            Start Installment
          </a>
        </div>
      </div>
    </section>
  );
}
