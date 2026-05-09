'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const reviews = [
  {
    name: 'سارا محمدی',
    role: 'طراح UX',
    quote:
      'تجربه‌ای کاملاً متفاوت از فروشگاه‌های سنتی طلا. اپلیکیشن، شفاف و خوش‌دست؛ تأیید هویت در کمتر از ۲ دقیقه.',
    avatar: 'S',
  },
  {
    name: 'علی رستمی',
    role: 'سرمایه‌گذار',
    quote:
      'با پلن اقساطی توانستم ماهانه طلا تهیه کنم بدون هیچ بهره‌ای. روند ساده و قابل اعتماد.',
    avatar: 'A',
  },
  {
    name: 'مریم آذری',
    role: 'پزشک',
    quote:
      'کیفیت و گواهی اصالت محصولات بی‌نظیره. بسته‌بندی و تحویل با امنیت کامل انجام شد.',
    avatar: 'M',
  },
  {
    name: 'پرهام شایان',
    role: 'مدیر استارتاپ',
    quote:
      'هشدارهای قیمت دقیق و فروش لحظه‌ای فوق‌العاده‌ست. دقیقاً مثل یک فین‌تک حرفه‌ای.',
    avatar: 'P',
  },
  {
    name: 'نگار افشار',
    role: 'مدرس دانشگاه',
    quote:
      'برای هدیه‌ی مادرم سفارش دادم. کیفیت طلا و طراحی قطعه واقعاً لوکس بود.',
    avatar: 'N',
  },
  {
    name: 'حامد کاظمی',
    role: 'تحلیل‌گر مالی',
    quote:
      'از معدود پلتفرم‌های ایرانی که با استانداردهای جهانی هم‌خوانی داره. عالی.',
    avatar: 'H',
  },
];

export default function Testimonials() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-anim="testi-head"]', {
        scrollTrigger: { trigger: '[data-anim="testi-head"]', start: 'top 85%' },
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // Duplicate the list to make a seamless marquee
  const row1 = [...reviews, ...reviews];
  const row2 = [...reviews.slice().reverse(), ...reviews.slice().reverse()];

  return (
    <section
      id="testimonials"
      ref={rootRef}
      className="relative isolate overflow-hidden py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div data-anim="testi-head" className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/5 px-4 py-1.5 text-[10px] uppercase tracking-[0.32em] text-gold-200">
            مشتریان ما
          </span>
          <h2 className="mt-6 font-display text-4xl font-black leading-tight text-pearl md:text-6xl">
            تجربه‌ای که با
            <span className="text-gold-shine"> اعتماد </span>
            ساخته شده
          </h2>
        </div>
      </div>

      <div className="relative mt-14 space-y-5">
        <FadeMask />
        <Row data={row1} className="animate-marquee" />
        <Row data={row2} className="animate-marqueeSlow [animation-direction:reverse]" />
      </div>
    </section>
  );
}

function Row({
  data,
  className,
}: {
  data: typeof reviews;
  className?: string;
}) {
  return (
    <div className="overflow-hidden">
      <div className={`flex w-max gap-5 will-change-transform ${className ?? ''}`}>
        {data.map((r, i) => (
          <article
            key={`${r.name}-${i}`}
            className="halo glass w-[320px] shrink-0 rounded-3xl p-6 sm:w-[380px]"
          >
            <div className="flex items-center gap-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold-gradient font-display text-base font-extrabold text-obsidian">
                {r.avatar}
              </div>
              <div>
                <p className="font-display font-bold text-pearl">{r.name}</p>
                <p className="text-xs text-pearl-mute">{r.role}</p>
              </div>
              <span className="ms-auto flex gap-0.5 text-gold-300">
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg key={j} width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
                  </svg>
                ))}
              </span>
            </div>
            <p className="mt-4 leading-relaxed text-pearl-soft">{r.quote}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function FadeMask() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-obsidian to-transparent md:w-40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-obsidian to-transparent md:w-40"
      />
    </>
  );
}
