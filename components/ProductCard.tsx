'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export type Product = {
  weight: string;
  price: number;
  monthly: number;
  image: string;
  popular?: boolean;
};

export default function ProductCard({ p, i }: { p: Product; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: i * 0.08 }}
      className="glass group relative overflow-hidden rounded-3xl transition-all duration-500 hover:border-gold-400/40 hover:shadow-xl hover:shadow-gold-400/5"
    >
      {p.popular && (
        <div className="bg-gold-gradient absolute right-4 top-4 z-10 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-ink-900">
          Most Popular
        </div>
      )}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={p.image}
          alt={`${p.weight} gold bar`}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent" />
      </div>
      <div className="p-6">
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-gold-300">
              Pure 999.9
            </div>
            <div className="mt-1 font-serif text-3xl text-white">{p.weight}</div>
          </div>
          <div className="text-right">
            <div className="text-gold-gradient font-serif text-2xl">
              ${p.price.toLocaleString()}
            </div>
            <div className="mt-0.5 text-xs text-neutral-400">
              or ${p.monthly}/mo
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2">
          <button className="bg-gold-gradient gold-shine rounded-full px-4 py-2.5 text-sm font-semibold text-ink-900 transition-all hover:shadow-lg hover:shadow-gold-400/20">
            Full Payment
          </button>
          <button className="rounded-full border border-gold-400/40 px-4 py-2.5 text-sm font-medium text-gold-200 transition-all hover:border-gold-400 hover:bg-gold-400/10">
            Installment
          </button>
        </div>
      </div>
    </motion.div>
  );
}
