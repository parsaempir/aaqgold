'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Product } from '@/lib/products';

export default function ProductCard({ p, i }: { p: Product; i: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(i, 6) * 0.04 }}
      className="group relative overflow-hidden rounded-2xl border border-gold-400/10 bg-ink-800/40 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-gold-400/40 hover:shadow-2xl hover:shadow-gold-400/10"
    >
      {p.popular && (
        <div className="bg-gold-gradient absolute right-3 top-3 z-10 rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-widest text-ink-900">
          Popular
        </div>
      )}

      <div className="relative aspect-square overflow-hidden">
        <Image
          src={p.image}
          alt={`${p.weight} gold bar — ${p.refinery}`}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent" />
        <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />
      </div>

      <div className="p-3 md:p-4">
        <div className="flex items-baseline justify-between gap-2 md:gap-3">
          <div className="min-w-0">
            <div className="font-num text-xl font-semibold tracking-tight text-white tabular-nums md:text-2xl">
              {p.weight}
            </div>
            <div className="mt-0.5 truncate text-[9px] uppercase tracking-widest text-neutral-500 md:text-[10px]">
              {p.refinery}
            </div>
          </div>
          <div className="shrink-0 text-right">
            <div className="text-gold-gradient font-num text-base font-semibold leading-none tabular-nums md:text-lg">
              ${p.price.toLocaleString()}
            </div>
            <div className="mt-1 font-num text-[10px] text-neutral-500 tabular-nums">
              ${p.monthly}/mo
            </div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-1.5 md:mt-4 md:gap-2">
          <button className="bg-gold-gradient gold-shine rounded-full px-2 py-1.5 text-[11px] font-semibold text-ink-900 transition-shadow hover:shadow-lg hover:shadow-gold-400/25 md:px-3 md:py-2 md:text-xs">
            <span className="md:hidden">Buy</span>
            <span className="hidden md:inline">Buy Now</span>
          </button>
          <button className="rounded-full border border-gold-400/30 px-2 py-1.5 text-[11px] font-medium text-gold-200 transition-all hover:border-gold-400 hover:bg-gold-400/10 md:px-3 md:py-2 md:text-xs">
            <span className="md:hidden">Plan</span>
            <span className="hidden md:inline">Installment</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}
