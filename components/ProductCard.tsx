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

      <div className="p-4">
        <div className="flex items-baseline justify-between gap-3">
          <div>
            <div className="font-serif text-2xl text-white">{p.weight}</div>
            <div className="mt-0.5 text-[10px] uppercase tracking-widest text-neutral-500">
              {p.refinery}
            </div>
          </div>
          <div className="text-right">
            <div className="text-gold-gradient font-serif text-lg leading-none">
              ${p.price.toLocaleString()}
            </div>
            <div className="mt-1 text-[10px] text-neutral-500">
              ${p.monthly}/mo
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button className="bg-gold-gradient gold-shine rounded-full px-3 py-2 text-xs font-semibold text-ink-900 transition-shadow hover:shadow-lg hover:shadow-gold-400/25">
            Buy Now
          </button>
          <button className="rounded-full border border-gold-400/30 px-3 py-2 text-xs font-medium text-gold-200 transition-all hover:border-gold-400 hover:bg-gold-400/10">
            Installment
          </button>
        </div>
      </div>
    </motion.article>
  );
}
