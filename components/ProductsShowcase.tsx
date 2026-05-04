'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  filterProducts,
  products,
  type FilterId,
} from '@/lib/products';
import ProductCard from './ProductCard';
import ProductFilters from './ProductFilters';
import ProductSkeleton from './ProductSkeleton';

export default function ProductsShowcase() {
  const [active, setActive] = useState<FilterId>('all');
  const [loading, setLoading] = useState(false);

  const handleChange = (id: FilterId) => {
    if (id === active) return;
    setActive(id);
    setLoading(true);
    setTimeout(() => setLoading(false), 280);
  };

  const items = filterProducts(products, active);

  return (
    <section id="bars" className="relative pt-3">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <p className="text-sm text-neutral-400">
            Live spot pricing · Free insured shipping
          </p>
          <ProductFilters active={active} onChange={handleChange} />
        </div>

        <motion.div
          layout
          className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={`sk-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <ProductSkeleton />
                  </motion.div>
                ))
              : items.map((p, i) => (
                  <ProductCard key={p.id} p={p} i={i} />
                ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
