'use client';

import { FormEvent, useState } from 'react';
import Modal from '../Modal';
import { useDashboard } from '../DashboardProvider';
import { Success } from './BuyGoldModal';

const faqs = [
  {
    q: 'How is my gold stored?',
    a: 'Every gram is allocated to your name and held in segregated storage at Brink’s Zurich. We never lend, lease, or rehypothecate. You can request delivery or sell at any time.',
  },
  {
    q: 'What happens to my plan if I miss a payment?',
    a: 'If your USD balance is too low when the monthly charge fires, the plan pauses automatically. We email you, and the plan resumes the moment you deposit funds — no penalties.',
  },
  {
    q: 'How fast can I sell?',
    a: 'Instantly. Click Sell gold, confirm the amount, and your USD balance is credited at the live spot price. Cash-out to your bank typically settles in 1–2 business days.',
  },
  {
    q: 'How does delivery work?',
    a: 'Choose a product (1g/5g/10g bar or 1oz coin), enter your address, and we ship via fully insured courier with signature on delivery. Tracking arrives by email within 24 hours.',
  },
  {
    q: 'Are there storage fees?',
    a: 'No annual storage fees on holdings under 1kg. Above that, a flat 0.12% / yr applies, prorated monthly. All insurance is included.',
  },
  {
    q: 'Is my gold insured?',
    a: 'Yes — fully insured by Lloyd’s of London at replacement value, in transit and at rest. Request a certificate of insurance anytime from the Vault & insurance panel.',
  },
];

export default function HelpCenterModal() {
  const { openModal, setModal, store } = useDashboard();
  const open = openModal === 'help';
  const close = () => setModal(null);

  const [query, setQuery] = useState('');
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [view, setView] = useState<'faq' | 'contact'>('faq');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const filtered = query.trim()
    ? faqs.filter(
        (f) =>
          f.q.toLowerCase().includes(query.toLowerCase()) ||
          f.a.toLowerCase().includes(query.toLowerCase())
      )
    : faqs;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setSubject('');
      setMessage('');
      setView('faq');
      close();
    }, 1100);
  };

  return (
    <Modal
      open={open}
      onClose={close}
      title="Help center"
      subtitle="Answers, then humans if you still need one"
      size="lg"
    >
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-1 rounded-2xl border border-hairline bg-pearl/60 p-1">
          <TabBtn active={view === 'faq'} onClick={() => setView('faq')}>
            FAQs
          </TabBtn>
          <TabBtn active={view === 'contact'} onClick={() => setView('contact')}>
            Contact us
          </TabBtn>
        </div>

        {view === 'faq' ? (
          <>
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-mute">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.7" />
                  <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
              </span>
              <input
                type="search"
                placeholder="Search articles…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-2xl border border-hairline bg-pearl/80 py-3 pl-11 pr-4 text-[0.95rem] text-ink placeholder:text-ink-dim focus:border-gold-300 focus:outline-none focus:shadow-[0_0_0_4px_rgba(241,206,108,0.18)]"
              />
            </div>

            <ul className="flex flex-col gap-2">
              {filtered.length === 0 ? (
                <li className="rounded-2xl border border-dashed border-hairline px-4 py-5 text-center text-sm text-ink-mute">
                  No articles match “{query}”. Try a different keyword or{' '}
                  <button
                    onClick={() => setView('contact')}
                    className="font-semibold text-gold-700 underline-offset-2 hover:underline"
                  >
                    contact us
                  </button>
                  .
                </li>
              ) : (
                filtered.map((f, i) => {
                  const isOpen = openIdx === i;
                  return (
                    <li
                      key={f.q}
                      className="overflow-hidden rounded-2xl border border-hairline bg-pearl/60"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenIdx(isOpen ? null : i)}
                        className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left transition-colors hover:bg-gold-50/40"
                        aria-expanded={isOpen}
                      >
                        <span className="text-[0.95rem] font-semibold text-ink">
                          {f.q}
                        </span>
                        <span
                          className={`shrink-0 text-ink-mute transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                          aria-hidden
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M6 9l6 6 6-6"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </button>
                      <div
                        className={`grid transition-all duration-300 ${
                          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="px-4 pb-4 text-[0.9rem] leading-relaxed text-ink-soft">
                            {f.a}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })
              )}
            </ul>

            <div className="rounded-2xl border border-gold-200/70 bg-gold-50/60 px-4 py-3 text-sm text-ink-soft">
              Still stuck?{' '}
              <button
                onClick={() => setView('contact')}
                className="font-semibold text-gold-700 underline-offset-2 hover:underline"
              >
                Talk to support →
              </button>
            </div>
          </>
        ) : sent ? (
          <Success
            line1="Message sent"
            line2="Our team replies within 4 hours, Mon–Fri."
          />
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <ContactCard
                icon={
                  <path
                    d="M4 6h16v12H4z M4 6l8 7 8-7"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                }
                title="Email"
                value="support@placeholder.gold"
              />
              <ContactCard
                icon={
                  <path
                    d="M5 4h4l2 5-2.5 2a11 11 0 0 0 5.5 5.5L16 14l5 2v4a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                }
                title="Phone"
                value="+1 (415) 555-0144"
              />
              <ContactCard
                icon={
                  <path
                    d="M21 12a9 9 0 1 1-3.6-7.2L21 3v6h-6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                }
                title="Live chat"
                value="Avg reply 2m"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[0.78rem] font-medium text-ink-soft">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="What can we help with?"
                className="w-full rounded-2xl border border-hairline bg-pearl/80 px-4 py-3 text-[0.95rem] text-ink placeholder:text-ink-dim focus:border-gold-300 focus:outline-none focus:shadow-[0_0_0_4px_rgba(241,206,108,0.18)]"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[0.78rem] font-medium text-ink-soft">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                required
                placeholder="Tell us what’s going on. Order numbers, screenshots — anything helps."
                className="w-full rounded-2xl border border-hairline bg-pearl/80 px-4 py-3 text-[0.95rem] text-ink placeholder:text-ink-dim focus:border-gold-300 focus:outline-none focus:shadow-[0_0_0_4px_rgba(241,206,108,0.18)]"
              />
            </div>

            <div className="text-xs text-ink-mute">
              We&rsquo;ll reply to{' '}
              <span className="font-medium text-ink">
                {store.user.email || 'your email on file'}
              </span>
              .
            </div>

            <button type="submit" className="btn-gold w-full">
              Send message
              <span aria-hidden>→</span>
            </button>
          </form>
        )}
      </div>
    </Modal>
  );
}

function TabBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl px-3 py-2 text-sm font-semibold transition-all ${
        active
          ? 'bg-gold-gradient text-[#1A1306] shadow-[inset_0_1px_0_rgba(255,247,224,0.6)]'
          : 'text-ink-mute hover:text-ink'
      }`}
    >
      {children}
    </button>
  );
}

function ContactCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-hairline bg-pearl/60 p-3.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-50 text-gold-700 ring-1 ring-gold-200">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          {icon}
        </svg>
      </span>
      <div className="mt-3 text-[0.72rem] font-medium uppercase tracking-[0.14em] text-ink-mute">
        {title}
      </div>
      <div className="mt-0.5 text-[0.88rem] font-semibold text-ink">{value}</div>
    </div>
  );
}
