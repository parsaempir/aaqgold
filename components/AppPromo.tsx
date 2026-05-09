'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AppPromo() {
  const rootRef = useRef<HTMLElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ['start end', 'end start'],
  });
  const yPhone = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const rotPhone = useTransform(scrollYProgress, [0, 1], [-6, 6]);

  // Auto-cycling app screenshots inside the phone
  useEffect(() => {
    if (!phoneRef.current) return;
    const slides = phoneRef.current.querySelectorAll<HTMLDivElement>('[data-screen]');
    if (slides.length === 0) return;
    const tl = gsap.timeline({ repeat: -1 });
    slides.forEach((slide, i) => {
      tl.to(slide, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, i * 2.4);
      tl.to(
        slide,
        { opacity: 0, y: -20, duration: 0.6, ease: 'power3.in' },
        i * 2.4 + 1.8
      );
    });
    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-app-anim]', {
        scrollTrigger: { trigger: '[data-app-anim]', start: 'top 80%' },
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="app"
      ref={rootRef}
      className="relative isolate overflow-hidden py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute -left-40 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-gold-radial opacity-30 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          {/* Copy */}
          <div>
            <span data-app-anim className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/5 px-4 py-1.5 text-[10px] uppercase tracking-[0.32em] text-gold-200">
              اپلیکیشن AaqGold
            </span>
            <h2 data-app-anim className="mt-6 font-display text-4xl font-black leading-tight text-pearl md:text-6xl">
              کیف پول طلای شما،
              <br />
              <span className="text-gold-shine">همیشه همراه‌تان</span>
            </h2>
            <p data-app-anim className="mt-5 max-w-lg text-pearl-soft md:text-lg">
              قیمت لحظه‌ای، خرید نقدی و اقساطی، صندوق امانت دیجیتال و
              فروش هوشمند — همه در یک اپلیکیشن.
            </p>

            <ul data-app-anim className="mt-7 space-y-3 text-pearl-soft">
              {[
                'تأیید هویت در کمتر از ۲ دقیقه',
                'هشدارهای هوشمند قیمت طلا',
                'صندوق امانت رمزنگاری‌شده',
                'تبدیل آنی طلا به ریال',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-gold-400/15 text-gold-200">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div data-app-anim className="mt-9 flex flex-wrap gap-3">
              <a href="#cta" className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 transition-colors hover:border-gold-400/50 hover:bg-gold-400/5">
                <AppleIcon />
                <span>
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-pearl-mute">دانلود از</span>
                  <span className="block font-display text-base font-bold text-pearl">App Store</span>
                </span>
              </a>
              <a href="#cta" className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 transition-colors hover:border-gold-400/50 hover:bg-gold-400/5">
                <PlayIcon />
                <span>
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-pearl-mute">دانلود از</span>
                  <span className="block font-display text-base font-bold text-pearl">Google Play</span>
                </span>
              </a>
            </div>
          </div>

          {/* Phone mockup */}
          <div className="relative mx-auto flex w-full max-w-[420px] items-center justify-center">
            <motion.div
              style={{ y: yPhone, rotate: rotPhone }}
              className="relative"
            >
              <div className="absolute -inset-10 -z-10 rounded-[3rem] bg-gold-radial opacity-50 blur-3xl" />
              <div ref={phoneRef} className="relative h-[640px] w-[300px] rounded-[3rem] border border-white/15 bg-gradient-to-b from-graphite to-obsidian p-2 shadow-[0_60px_120px_-30px_rgba(0,0,0,0.9)] md:h-[680px] md:w-[320px]">
                {/* Notch */}
                <div className="absolute left-1/2 top-3 z-20 h-6 w-32 -translate-x-1/2 rounded-full bg-obsidian" />
                <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] bg-obsidian">
                  {/* Screens stack */}
                  <Screen
                    title="موجودی شما"
                    value="۲۴٫۸ گرم"
                    sub="ارزش لحظه‌ای: ۱۰۷٫۲ میلیون تومان"
                    accent="bg-gold-gradient"
                  />
                  <Screen
                    title="پلن اقساطی"
                    value="۱۲٫۷۵۰٫۰۰۰"
                    sub="قسط ماه چهارم از ۶ — تومان"
                    accent="bg-gradient-to-br from-emerald-400 to-emerald-600"
                  />
                  <Screen
                    title="هشدار قیمت"
                    value="▲ ٪۲٫۱"
                    sub="افزایش لحظه‌ای — هر گرم: ۴٫۳۱۲٫۰۰۰"
                    accent="bg-gradient-to-br from-rose-400 to-rose-600"
                  />
                </div>

                {/* Phone reflections */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[3rem]"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(255,255,255,0.08), transparent 35%, transparent 65%, rgba(255,255,255,0.05))',
                  }}
                />
              </div>
            </motion.div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -end-4 top-12 hidden md:block"
            >
              <div className="glass-strong flex items-center gap-3 rounded-2xl px-4 py-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-gold-gradient text-obsidian">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20M5 9l7-7 7 7" />
                  </svg>
                </span>
                <div>
                  <p className="text-[10px] text-pearl-mute">قیمت طلا</p>
                  <p className="font-display text-sm font-bold text-pearl">
                    ▲ ٪۰٫۸۲
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -start-4 bottom-16 hidden md:block"
            >
              <div className="glass-strong flex items-center gap-3 rounded-2xl px-4 py-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-gold-400/20 text-gold-200 ring-1 ring-inset ring-gold-400/30">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12l4-4 4 4 7-7M14 5h7v7" />
                  </svg>
                </span>
                <div>
                  <p className="text-[10px] text-pearl-mute">سود ماهانه</p>
                  <p className="font-display text-sm font-bold text-pearl">
                    +۴٫۲ میلیون
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Screen({
  title,
  value,
  sub,
  accent,
}: {
  title: string;
  value: string;
  sub: string;
  accent: string;
}) {
  return (
    <div
      data-screen
      className="absolute inset-0 flex flex-col p-6 opacity-0"
      style={{ transform: 'translateY(20px)' }}
    >
      <div className="mt-10 flex items-center justify-between">
        <span className="font-display text-sm text-pearl">AaqGold</span>
        <span className="text-[10px] text-pearl-mute">۱۰:۲۴</span>
      </div>
      <div className="mt-8">
        <p className="text-xs text-pearl-mute">{title}</p>
        <p className="mt-2 font-display text-3xl font-black tabular text-pearl">
          {value}
        </p>
        <p className="mt-2 text-[11px] text-pearl-soft">{sub}</p>
      </div>
      <div className={`mt-6 h-32 rounded-2xl ${accent} opacity-80 shadow-[0_20px_40px_-15px_rgba(212,175,55,0.6)]`} />
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl border border-white/8 bg-white/[0.02] p-3">
            <div className="h-2 w-8 rounded bg-gold-400/30" />
            <div className="mt-2 h-2 w-12 rounded bg-pearl-mute/20" />
          </div>
        ))}
      </div>
      <div className="mt-auto rounded-2xl border border-white/10 bg-white/[0.03] p-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gold-gradient" />
          <div className="flex-1">
            <div className="h-2 w-24 rounded bg-pearl/20" />
            <div className="mt-1.5 h-2 w-16 rounded bg-pearl-mute/20" />
          </div>
          <span className="text-xs text-gold-200">→</span>
        </div>
      </div>
    </div>
  );
}

function AppleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-pearl">
      <path d="M16.365 1.43c0 1.14-.421 2.27-1.262 3.058-.84.79-2.057 1.408-3.196 1.32-.165-1.137.4-2.32 1.176-3.078.866-.847 2.319-1.466 3.282-1.3zm4.214 16.13c-.69 1.51-1.024 2.184-1.91 3.523-1.234 1.875-2.972 4.21-5.128 4.231-1.918.018-2.41-1.249-5.014-1.235-2.604.014-3.143 1.255-5.062 1.235C2.31 25.295.668 23.196-.566 21.32-2.945 17.66-3.18 13.36-1.776 11.04c.992-1.642 2.557-2.598 4.025-2.598 1.495 0 2.434.819 3.671.819 1.198 0 1.93-.82 3.66-.82 1.305 0 2.69.71 3.677 1.94-3.232 1.766-2.706 6.385.572 7.181z" transform="translate(3 -1)"/>
    </svg>
  );
}
function PlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-pearl">
      <path d="M5 3l13 9-13 9z" fill="currentColor" />
    </svg>
  );
}
