'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const chapters = [
  {
    n: '01',
    eyebrow: 'Cash purchase',
    title: 'Real gold,\nright now.',
    body: 'Pay at live LBMA spot. We allocate certified bullion to your name in seconds — no minimums, no hidden margins.',
  },
  {
    n: '02',
    eyebrow: 'Vault-stored',
    title: 'Locked in a\nLloyd’s vault.',
    body: 'Held with Brink’s in Zurich, London and Singapore. Insured at full market value. Audited monthly by a Big-Four firm.',
  },
  {
    n: '03',
    eyebrow: 'Always liquid',
    title: 'Sell, ship,\nor hold.',
    body: 'Sell back any portion at the live bid with same-day settlement, or redeem certified bars to your door. Always your choice.',
  },
];

export default function VisualStory() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chapterEls = gsap.utils.toArray<HTMLElement>('.story-chapter');
      const numEls = gsap.utils.toArray<HTMLElement>('.story-num');
      const decoEls = gsap.utils.toArray<HTMLElement>('.story-deco');
      const dotEls = gsap.utils.toArray<HTMLElement>('.story-dot');

      gsap.set(chapterEls, { autoAlpha: 0, y: 60 });
      gsap.set(chapterEls[0], { autoAlpha: 1, y: 0 });
      gsap.set(numEls, { autoAlpha: 0, yPercent: 100 });
      gsap.set(numEls[0], { autoAlpha: 1, yPercent: 0 });
      gsap.set(decoEls, { autoAlpha: 0, scale: 0.92 });
      gsap.set(decoEls[0], { autoAlpha: 1, scale: 1 });
      gsap.set(dotEls, { backgroundColor: '#E6E1D3', scale: 1 });
      gsap.set(dotEls[0], { backgroundColor: '#DCAE3D', scale: 1.4 });

      // Headline reveal on entry
      gsap.from('.story-eyebrow', {
        y: 16,
        opacity: 0,
        duration: 0.8,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 70%',
          once: true,
        },
      });

      const tl = gsap.timeline({
        defaults: { ease: 'sine.inOut' },
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.4,
        },
      });

      // Slow, deliberate rotation across the whole section.
      tl.to(visualRef.current, { rotate: 360, ease: 'none' }, 0);

      // Crossfade chapters / numbers / decos with wide overlap windows.
      const N = chapters.length;
      const win = 0.18; // crossfade duration as a fraction of the timeline
      for (let i = 1; i < N; i++) {
        const t = i / N;
        const start = t - win / 2;

        tl.to(
          chapterEls[i - 1],
          { autoAlpha: 0, y: -60, duration: win },
          start
        )
          .to(
            chapterEls[i],
            { autoAlpha: 1, y: 0, duration: win },
            start
          )
          .to(
            numEls[i - 1],
            { autoAlpha: 0, yPercent: -100, duration: win },
            start
          )
          .to(
            numEls[i],
            { autoAlpha: 1, yPercent: 0, duration: win },
            start
          )
          .to(
            decoEls[i - 1],
            { autoAlpha: 0, scale: 1.08, duration: win },
            start
          )
          .to(
            decoEls[i],
            { autoAlpha: 1, scale: 1, duration: win },
            start
          )
          .to(
            dotEls[i - 1],
            { backgroundColor: '#E6E1D3', scale: 1, duration: win },
            start
          )
          .to(
            dotEls[i],
            { backgroundColor: '#DCAE3D', scale: 1.4, duration: win },
            start
          );
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="story"
      className="relative"
      style={{ height: '380vh' }}
    >
      <div
        ref={stageRef}
        className="sticky top-0 flex h-screen items-center overflow-hidden"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-canvas-fade"
        />

        {/* Vertical chapter dots */}
        <div className="absolute left-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
          {chapters.map((_, i) => (
            <span
              key={i}
              className="story-dot block h-2 w-2 rounded-full transition-transform"
            />
          ))}
        </div>

        <div className="mx-auto grid h-full w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="story-eyebrow eyebrow mb-6">The Aurea way</div>

            <div className="relative min-h-[360px]">
              {chapters.map((c, i) => (
                <div key={i} className="story-chapter absolute inset-0">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-600">
                    {c.eyebrow}
                  </div>
                  <h2 className="font-display mt-4 whitespace-pre-line text-balance text-[clamp(2.4rem,5.6vw,4.8rem)] font-extrabold leading-[0.98] tracking-tight text-ink">
                    {c.title}
                  </h2>
                  <p className="mt-6 max-w-md text-pretty text-base text-ink-soft md:text-lg">
                    {c.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:col-span-7">
            {/* Giant chapter numeral, behind the visual */}
            <div className="pointer-events-none absolute inset-0 hidden items-start justify-end pr-2 pt-2 lg:flex">
              <div className="relative h-[180px] w-[180px] overflow-hidden">
                {chapters.map((c, i) => (
                  <span
                    key={i}
                    className="story-num font-display absolute inset-0 flex items-start justify-end text-[clamp(7rem,11vw,10rem)] font-extrabold leading-none tracking-tighter text-gold-gradient opacity-25"
                  >
                    {c.n}
                  </span>
                ))}
              </div>
            </div>

            <div
              ref={visualRef}
              className="relative mx-auto aspect-square w-full max-w-[560px]"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-8 -z-10 rounded-full bg-gold-soft opacity-80 blur-3xl"
              />

              <Deco>
                <CoinDeco />
              </Deco>
              <Deco>
                <VaultDeco />
              </Deco>
              <Deco>
                <FlowDeco />
              </Deco>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Deco({ children }: { children: React.ReactNode }) {
  return <div className="story-deco absolute inset-0">{children}</div>;
}

function CoinDeco() {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="coin-grad" cx="0.4" cy="0.35" r="0.85">
          <stop offset="0%" stopColor="#FFF7E0" />
          <stop offset="35%" stopColor="#F1CE6C" />
          <stop offset="75%" stopColor="#DCAE3D" />
          <stop offset="100%" stopColor="#8B5E14" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="180" fill="url(#coin-grad)" />
      <circle
        cx="200"
        cy="200"
        r="170"
        stroke="#5E3F0A"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />
      <circle
        cx="200"
        cy="200"
        r="148"
        stroke="#5E3F0A"
        strokeWidth="0.8"
        fill="none"
        opacity="0.28"
      />
      <circle
        cx="200"
        cy="200"
        r="124"
        stroke="#5E3F0A"
        strokeWidth="0.6"
        fill="none"
        opacity="0.22"
      />
      <text
        x="200"
        y="222"
        fontFamily="serif"
        fontSize="74"
        fontWeight="800"
        textAnchor="middle"
        fill="#5E3F0A"
        opacity="0.5"
        letterSpacing="-3"
      >
        AU
      </text>
    </svg>
  );
}

function VaultDeco() {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="vault-grad" cx="0.4" cy="0.35" r="0.85">
          <stop offset="0%" stopColor="#FFF7E0" />
          <stop offset="35%" stopColor="#F1CE6C" />
          <stop offset="75%" stopColor="#DCAE3D" />
          <stop offset="100%" stopColor="#8B5E14" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="180" fill="url(#vault-grad)" />
      <g
        stroke="#5E3F0A"
        fill="none"
        strokeWidth="1.6"
        opacity="0.55"
        strokeLinecap="round"
      >
        <circle cx="200" cy="200" r="92" />
        <circle cx="200" cy="200" r="68" />
        <circle cx="200" cy="200" r="44" strokeWidth="2.4" />
        <circle cx="200" cy="200" r="6" fill="#5E3F0A" stroke="none" opacity="0.6" />
        <line x1="200" y1="108" x2="200" y2="78" strokeWidth="2.2" />
        <line x1="200" y1="292" x2="200" y2="322" strokeWidth="2.2" />
        <line x1="108" y1="200" x2="78" y2="200" strokeWidth="2.2" />
        <line x1="292" y1="200" x2="322" y2="200" strokeWidth="2.2" />
        <line x1="135" y1="135" x2="115" y2="115" strokeWidth="1.4" />
        <line x1="265" y1="265" x2="285" y2="285" strokeWidth="1.4" />
        <line x1="135" y1="265" x2="115" y2="285" strokeWidth="1.4" />
        <line x1="265" y1="135" x2="285" y2="115" strokeWidth="1.4" />
      </g>
    </svg>
  );
}

function FlowDeco() {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="flow-grad" cx="0.4" cy="0.35" r="0.85">
          <stop offset="0%" stopColor="#FFF7E0" />
          <stop offset="35%" stopColor="#F1CE6C" />
          <stop offset="75%" stopColor="#DCAE3D" />
          <stop offset="100%" stopColor="#8B5E14" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="180" fill="url(#flow-grad)" />
      <g
        stroke="#5E3F0A"
        fill="none"
        strokeWidth="2.6"
        opacity="0.55"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M 200 100 A 100 100 0 0 1 300 200" />
        <path d="M 278 178 L 300 200 L 322 178" />
        <path d="M 200 300 A 100 100 0 0 1 100 200" />
        <path d="M 122 222 L 100 200 L 78 222" />
        <circle cx="200" cy="200" r="34" strokeWidth="1.6" opacity="0.4" />
      </g>
    </svg>
  );
}
