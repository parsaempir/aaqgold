'use client';

import { useState } from 'react';
import Modal from '../Modal';
import { useDashboard } from '../DashboardProvider';
import { fmtGrams, fmtUsd, gramsFromUsd } from '@/lib/dashboard-store';
import { SummaryRow, Success } from './BuyGoldModal';

const presets = [
  { months: 6, label: '6 mo' },
  { months: 12, label: '12 mo' },
  { months: 24, label: '24 mo' },
];

export default function NewPlanModal() {
  const { openModal, setModal, createPlan } = useDashboard();
  const [name, setName] = useState('Saver plan');
  const [monthly, setMonthly] = useState('150');
  const [months, setMonths] = useState(12);
  const [done, setDone] = useState(false);

  const parsedMonthly = Math.max(0, parseFloat(monthly) || 0);
  const totalCost = parsedMonthly * months;
  const totalGrams = gramsFromUsd(totalCost);
  const valid = name.trim().length > 0 && parsedMonthly >= 25;

  const close = () => {
    setModal(null);
    setTimeout(() => {
      setName('Saver plan');
      setMonthly('150');
      setMonths(12);
      setDone(false);
    }, 250);
  };

  const submit = () => {
    if (!valid) return;
    createPlan({
      name: name.trim(),
      monthlyUsd: parsedMonthly,
      months,
    });
    setDone(true);
    setTimeout(close, 1000);
  };

  return (
    <Modal
      open={openModal === 'new-plan'}
      onClose={close}
      title="New installment plan"
      subtitle="Automatically buy gold every month"
    >
      {done ? (
        <Success
          line1="Plan created"
          line2="First charge runs on the 1st of next month."
        />
      ) : (
        <div className="flex flex-col gap-5">
          <div>
            <label className="mb-1.5 block text-[0.72rem] font-medium uppercase tracking-[0.14em] text-ink-mute">
              Plan name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-2xl border border-hairline bg-pearl/80 px-4 py-3 text-[0.98rem] text-ink focus:border-gold-300 focus:outline-none focus:shadow-[0_0_0_4px_rgba(241,206,108,0.18)]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[0.72rem] font-medium uppercase tracking-[0.14em] text-ink-mute">
              Monthly contribution (USD)
            </label>
            <div className="relative flex items-center rounded-2xl border border-hairline bg-pearl/80 focus-within:border-gold-300 focus-within:shadow-[0_0_0_4px_rgba(241,206,108,0.18)]">
              <span className="pl-4 text-ink-mute">$</span>
              <input
                type="text"
                inputMode="decimal"
                value={monthly}
                onChange={(e) =>
                  setMonthly(e.target.value.replace(/[^\d.]/g, ''))
                }
                className="font-display w-full bg-transparent py-3 pl-2 pr-4 text-2xl font-extrabold tracking-tight text-ink focus:outline-none"
              />
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {['100', '150', '250', '500'].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setMonthly(v)}
                  className="rounded-full border border-hairline bg-pearl/70 px-3 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:border-gold-300/60 hover:bg-gold-50 hover:text-ink"
                >
                  ${v}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 text-[0.72rem] font-medium uppercase tracking-[0.14em] text-ink-mute">
              Duration
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              {presets.map((p) => (
                <button
                  key={p.months}
                  type="button"
                  onClick={() => setMonths(p.months)}
                  className={`rounded-2xl border px-3 py-3 text-center text-sm font-semibold transition-all ${
                    months === p.months
                      ? 'border-gold-300/80 bg-gold-50/70 text-ink shadow-[0_0_0_4px_rgba(241,206,108,0.15)]'
                      : 'border-hairline bg-pearl/70 text-ink-soft hover:border-gold-300/55 hover:bg-gold-50/40'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <SummaryRow label="Monthly">
            <span className="tabular font-semibold text-ink">
              {fmtUsd(parsedMonthly)}
            </span>
          </SummaryRow>
          <SummaryRow label="Total commitment">
            <span className="tabular font-semibold text-ink">
              {fmtUsd(totalCost)}
            </span>
          </SummaryRow>
          <SummaryRow label="Est. gold at maturity">
            <span className="tabular font-semibold text-ink">
              {fmtGrams(totalGrams)}
            </span>
          </SummaryRow>

          {parsedMonthly > 0 && parsedMonthly < 25 ? (
            <div className="rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
              Minimum monthly amount is $25.
            </div>
          ) : null}

          <button className="btn-gold w-full" disabled={!valid} onClick={submit}>
            Create plan
            <span aria-hidden>→</span>
          </button>
        </div>
      )}
    </Modal>
  );
}
