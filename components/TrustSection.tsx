'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    title: 'Vaulted with Brink&rsquo;s',
    body: 'Stored in fully insured Brink&rsquo;s vaults across Zurich, London and Singapore — the same partners trusted by central banks.',
  },
  {
    title: 'Fully insured by Lloyd&rsquo;s',
    body: 'Every gram you own is insured at full market value by Lloyd&rsquo;s of London. Audited monthly by a Big-Four accountant.',
  },
  {
    title: 'Bank-grade security',
    body: 'SOC 2 Type II, PCI-DSS and ISO 27001 certified. Funds are held in segregated, regulated accounts.',
  },
  {
    title: 'Transparent on-chain audit',
    body: 'Live proof-of-reserves makes our holdings verifiable in real time, anywhere in the world.',
  },
];

export default function TrustSection() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.trust-fade', {
        y: 28,
        opacity: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.06,
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="trust"
      className="relative isolate py-28 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          <div className="trust-fade lg:col-span-5 lg:sticky lg:top-28">
            <div className="eyebrow">Trust &amp; security</div>
            <h2 className="font-display mt-3 text-balance text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
              Built like a bank. Calm like a vault.
            </h2>
            <p className="mt-5 max-w-md text-pretty text-base text-ink-soft md:text-lg">
              When you own gold with Aurea, it&rsquo;s yours — provably,
              physically, and protected by the most respected names in the
              industry.
            </p>

            <div className="mt-9 grid grid-cols-3 gap-4 max-w-md">
              <Metric value="$148M+" label="Vaulted" />
              <Metric value="100%" label="Allocated" />
              <Metric value="24 / 7" label="Audited" />
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {pillars.map((p) => (
                <div
                  key={p.title}
                  className="trust-fade halo rounded-3xl border border-hairline bg-pearl p-7 transition-transform duration-500 hover:-translate-y-1.5"
                >
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-gold-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                    Verified
                  </div>
                  <h3
                    className="font-display mt-4 text-xl font-semibold tracking-tight text-ink"
                    dangerouslySetInnerHTML={{ __html: p.title }}
                  />
                  <p
                    className="mt-2.5 text-[0.97rem] leading-relaxed text-ink-soft"
                    dangerouslySetInnerHTML={{ __html: p.body }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-hairline bg-pearl p-4">
      <div className="font-display text-2xl font-extrabold tracking-tight text-ink tabular">
        {value}
      </div>
      <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-mute">
        {label}
      </div>
    </div>
  );
}
