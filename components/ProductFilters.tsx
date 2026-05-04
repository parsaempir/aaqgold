'use client';

import { motion } from 'framer-motion';
import { filters, type FilterId } from '@/lib/products';

export default function ProductFilters({
  active,
  onChange,
}: {
  active: FilterId;
  onChange: (id: FilterId) => void;
}) {
  return (
    <div className="inline-flex rounded-full border border-gold-400/15 bg-ink-800/60 p-1 backdrop-blur-md">
      {filters.map((f) => {
        const isActive = active === f.id;
        return (
          <button
            key={f.id}
            onClick={() => onChange(f.id)}
            className="relative rounded-full px-4 py-1.5 text-xs font-medium transition-colors md:px-5 md:py-2 md:text-sm"
          >
            {isActive && (
              <motion.span
                layoutId="filter-pill"
                className="bg-gold-gradient absolute inset-0 rounded-full"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            <span
              className={`relative z-10 transition-colors ${
                isActive ? 'text-ink-900' : 'text-neutral-300 hover:text-gold-200'
              }`}
            >
              {f.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
