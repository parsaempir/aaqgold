'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=2400&q=80"
          alt="Stack of gold bars"
          fill
          priority
          sizes="100vw"
          className="scale-105 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/85 to-ink-900/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/40 via-transparent to-ink-900" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-32 md:py-40 lg:grid-cols-12 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7"
        >
          <span className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-gold-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold-400" />
            Certified Gold Bullion
          </span>
          <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Buy Gold Bars
            <br />
            <span className="text-gold-gradient">Safely &amp; Smartly</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-neutral-300 md:text-xl">
            Cash or Installment Plans Available. Authenticated, insured, and
            delivered to your door — preserve wealth the timeless way.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#products"
              className="bg-gold-gradient gold-shine group inline-flex items-center gap-2 rounded-full px-8 py-4 font-semibold text-ink-900 transition-all hover:shadow-xl hover:shadow-gold-400/30"
            >
              Buy Now
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="transition-transform group-hover:translate-x-1"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a
              href="#installment"
              className="rounded-full border border-gold-400/40 px-8 py-4 font-medium text-gold-200 transition-all hover:border-gold-400 hover:bg-gold-400/10"
            >
              Installment Purchase
            </a>
          </div>

          <div className="mt-14 grid max-w-lg grid-cols-3 gap-6">
            {[
              { v: '99.99%', l: 'Pure Gold' },
              { v: '15K+', l: 'Investors' },
              { v: '24/7', l: 'Support' },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-gold-gradient font-serif text-2xl md:text-3xl">
                  {s.v}
                </div>
                <div className="mt-1 text-xs uppercase tracking-widest text-neutral-400">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:col-span-5 lg:block"
        >
          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-gold-400/10 blur-3xl" />
            <div className="relative animate-float overflow-hidden rounded-3xl border border-gold-400/20">
              <Image
                src="https://images.unsplash.com/photo-1605792657660-596af9009e82?auto=format&fit=crop&w=900&q=80"
                alt="Premium gold bar close-up"
                width={600}
                height={700}
                className="h-[520px] w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-900 via-ink-900/70 to-transparent p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-gold-300">
                      Today&apos;s Spot
                    </div>
                    <div className="mt-1 font-serif text-2xl text-white">
                      $2,387.42
                      <span className="ml-2 text-sm text-emerald-400">+0.84%</span>
                    </div>
                  </div>
                  <div className="rounded-full bg-gold-400/20 px-3 py-1.5 text-xs text-gold-300">
                    Live
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-widest text-neutral-500">
        <span>Scroll</span>
        <div className="h-10 w-px bg-gradient-to-b from-gold-400 to-transparent" />
      </div>
    </section>
  );
}
