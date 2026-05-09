'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  categories,
  categoryLabel,
  featuredProducts,
} from '@/lib/products';

gsap.registerPlugin(ScrollTrigger);

export default function ProductsShowcase() {
  const rootRef = useRef<HTMLElement>(null);
  const featured = featuredProducts();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ps-eyebrow, .ps-title, .ps-sub', {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 78%',
          once: true,
        },
      });

      gsap.from('.ps-cat', {
        y: 36,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: '.ps-cat-grid',
          start: 'top 80%',
          once: true,
        },
      });

      gsap.from('.ps-feat-head > *', {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.06,
        scrollTrigger: {
          trigger: '.ps-feat-head',
          start: 'top 82%',
          once: true,
        },
      });

      gsap.from('.ps-product', {
        y: 36,
        opacity: 0,
        duration: 0.95,
        ease: 'expo.out',
        stagger: 0.07,
        scrollTrigger: {
          trigger: '.ps-feat-grid',
          start: 'top 82%',
          once: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="cash"
      className="relative isolate pb-28 pt-14 md:pb-36 md:pt-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-gold-soft opacity-60 blur-2xl"
      />

      <div className="mx-auto max-w-7xl px-6">
        {/* Browse by category */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="ps-eyebrow flex justify-center">
            <span className="eyebrow">Catalog</span>
          </div>
          <h2 className="ps-title font-display mt-5 text-balance text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
            Browse by category.
          </h2>
          <p className="ps-sub mt-5 text-pretty text-base text-ink-soft md:text-lg">
            Find the perfect gold investment for your portfolio.
          </p>
        </div>

        <div className="ps-cat-grid mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {categories.map((c) => (
            <a
              key={c.id}
              href="#products-feat"
              className="ps-cat halo group relative block aspect-[3/4] overflow-hidden rounded-3xl border border-hairline bg-pearl"
            >
              <Image
                src={c.image}
                alt={c.label}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-display text-xl font-semibold tracking-tight text-white md:text-2xl">
                  {c.label}
                </h3>
                <p className="mt-1 text-xs font-medium text-white/75">
                  {c.count} products
                </p>
              </div>
              <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:right-5 group-hover:opacity-100">
                <Arrow />
              </span>
            </a>
          ))}
        </div>

        {/* Featured products */}
        <div
          id="products-feat"
          className="ps-feat-head mt-28 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <span className="eyebrow">Curated</span>
            <h3 className="font-display mt-4 text-balance text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
              Featured products.
            </h3>
          </div>
          <a
            href="#"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-gold-700 hover:text-gold-600"
          >
            View all
            <span className="inline-flex transition-transform duration-500 group-hover:translate-x-1">
              <Arrow />
            </span>
          </a>
        </div>

        <div className="ps-feat-grid mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <article
              key={p.id}
              className="ps-product group relative overflow-hidden rounded-3xl border border-hairline bg-pearl transition-transform duration-500 hover:-translate-y-1.5"
            >
              <div className="relative aspect-square overflow-hidden bg-canvas">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
                {p.outOfStock && (
                  <div className="absolute inset-0 flex items-center justify-center bg-ink/55 backdrop-blur-[2px]">
                    <span className="rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white">
                      Out of stock
                    </span>
                  </div>
                )}
                <span className="absolute left-4 top-4 rounded-full border border-hairline bg-pearl/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-700 backdrop-blur">
                  {categoryLabel(p.category)}
                </span>
              </div>

              <div className="p-6 md:p-7">
                <h4 className="font-display text-lg font-semibold tracking-tight text-ink md:text-xl">
                  {p.name}
                </h4>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">
                  {p.description}
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="font-display text-xl font-extrabold tabular text-ink md:text-2xl">
                    ${p.price.toLocaleString('en-US')}
                  </span>
                  <a
                    href="#cta"
                    aria-disabled={p.outOfStock}
                    className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${
                      p.outOfStock
                        ? 'pointer-events-none text-ink-mute'
                        : 'text-gold-700 hover:text-gold-600'
                    }`}
                  >
                    {p.outOfStock ? 'Notify me' : 'Buy now'}
                    <Arrow />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
