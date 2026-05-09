'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTABanner() {
  const rootRef = useRef<HTMLElement>(null);
  const primaryRef = useRef<HTMLAnchorElement>(null);
  const secondaryRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-fade', {
        y: 28,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const buttons = [primaryRef.current, secondaryRef.current].filter(
      Boolean
    ) as HTMLElement[];
    const cleanups: Array<() => void> = [];

    buttons.forEach((btn) => {
      const move = (e: PointerEvent) => {
        const r = btn.getBoundingClientRect();
        const relX = e.clientX - (r.left + r.width / 2);
        const relY = e.clientY - (r.top + r.height / 2);
        gsap.to(btn, {
          x: relX * 0.18,
          y: relY * 0.28,
          duration: 0.5,
          ease: 'power3.out',
        });
      };
      const leave = () =>
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
      btn.addEventListener('pointermove', move);
      btn.addEventListener('pointerleave', leave);
      cleanups.push(() => {
        btn.removeEventListener('pointermove', move);
        btn.removeEventListener('pointerleave', leave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section
      ref={rootRef}
      id="cta"
      className="relative isolate px-6 pb-28 pt-10 md:pb-36"
    >
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[36px] border border-hairline bg-pearl px-7 py-16 md:px-16 md:py-24">
          {/* Backdrops */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gold-soft opacity-90"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-gold-gradient opacity-30 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-gold-gradient opacity-20 blur-3xl"
          />

          <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="cta-fade eyebrow !text-gold-600">Start today</div>
              <h2 className="cta-fade font-display mt-3 max-w-2xl text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-[3.4rem]">
                Your gold journey starts in <span className="text-gold-shine">60 seconds</span>.
              </h2>
              <p className="cta-fade mt-5 max-w-xl text-pretty text-base text-ink-soft md:text-lg">
                Open an account, verify your identity and own real, allocated
                gold today — or set a plan and let it stack quietly in the
                background.
              </p>
            </div>

            <div className="cta-fade lg:col-span-5">
              <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap lg:flex-col">
                <a
                  ref={primaryRef}
                  href="#cash"
                  className="btn-gold w-full justify-center"
                >
                  Start Buying Gold
                  <Arrow />
                </a>
                <a
                  ref={secondaryRef}
                  href="#story"
                  className="btn-ghost w-full justify-center"
                >
                  Discover the Placeholder way
                </a>

                <div className="mt-3 flex items-center gap-2 text-xs text-ink-mute">
                  <Lock /> 256-bit encryption · KYC in 60s · No credit check
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
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

function Lock() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="4"
        y="11"
        width="16"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M8 11V7a4 4 0 1 1 8 0v4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
