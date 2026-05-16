'use client';

import { useMemo, useState } from 'react';
import Modal from '../Modal';
import { useDashboard } from '../DashboardProvider';
import { fmtUsd, fmtGrams } from '@/lib/dashboard-store';

export default function BuyGoldModal() {
  const { openModal, setModal, buyGold, spotOz, spotGram, usd } = useDashboard();
  const [mode, setMode] = useState<'grams' | 'usd'>('grams');
  const [amount, setAmount] = useState('1');
  const [done, setDone] = useState(false);

  const parsed = parseFloat(amount) || 0;
  const { gramsToBuy, costUsd } = useMemo(() => {
    if (mode === 'grams') {
      return { gramsToBuy: parsed, costUsd: parsed * spotGram };
    }
    return { gramsToBuy: parsed / spotGram, costUsd: parsed };
  }, [parsed, mode, spotGram]);

  const enoughBalance = costUsd <= usd && gramsToBuy > 0;

  const close = () => {
    setModal(null);
    setTimeout(() => {
      setAmount('1');
      setMode('grams');
      setDone(false);
    }, 250);
  };

  const submit = () => {
    if (!enoughBalance) return;
    buyGold({ grams: gramsToBuy, usd: costUsd });
    setDone(true);
    setTimeout(close, 900);
  };

  return (
    <Modal
      open={openModal === 'buy'}
      onClose={close}
      title="Buy gold"
      subtitle={`Live spot · ${fmtUsd(spotOz)} / oz`}
    >
      {done ? (
        <Success
          line1={`+${fmtGrams(gramsToBuy)} added to your vault`}
          line2={`Paid ${fmtUsd(costUsd)} from balance`}
        />
      ) : (
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-1 rounded-2xl border border-hairline bg-pearl/60 p-1">
            <TabBtn active={mode === 'grams'} onClick={() => setMode('grams')}>
              By grams
            </TabBtn>
            <TabBtn active={mode === 'usd'} onClick={() => setMode('usd')}>
              By USD
            </TabBtn>
          </div>

          <AmountInput
            value={amount}
            onChange={setAmount}
            suffix={mode === 'grams' ? 'g' : 'USD'}
            quickValues={mode === 'grams' ? ['0.5', '1', '2', '5'] : ['50', '100', '250', '500']}
          />

          <SummaryRow label="You receive">
            <span className="tabular font-semibold text-ink">
              {fmtGrams(gramsToBuy || 0)}
            </span>
          </SummaryRow>
          <SummaryRow label="You pay">
            <span className="tabular font-semibold text-ink">
              {fmtUsd(costUsd || 0)}
            </span>
          </SummaryRow>
          <SummaryRow label="Available balance">
            <span
              className={`tabular font-semibold ${
                enoughBalance ? 'text-ink' : 'text-red-500'
              }`}
            >
              {fmtUsd(usd)}
            </span>
          </SummaryRow>

          {!enoughBalance && parsed > 0 ? (
            <div className="rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
              Not enough balance.{' '}
              <button
                onClick={() => setModal('deposit')}
                className="font-semibold underline underline-offset-2"
              >
                Deposit funds
              </button>
              .
            </div>
          ) : null}

          <button
            className="btn-gold w-full"
            disabled={!enoughBalance}
            onClick={submit}
          >
            Confirm buy
            <span aria-hidden>→</span>
          </button>
        </div>
      )}
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

export function AmountInput({
  value,
  onChange,
  suffix,
  quickValues,
}: {
  value: string;
  onChange: (v: string) => void;
  suffix: string;
  quickValues?: string[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex items-center rounded-2xl border border-hairline bg-pearl/80 transition-colors focus-within:border-gold-300 focus-within:shadow-[0_0_0_4px_rgba(241,206,108,0.18)]">
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => {
            const v = e.target.value.replace(/[^\d.]/g, '');
            onChange(v);
          }}
          className="font-display w-full bg-transparent px-4 py-3 text-2xl font-extrabold tracking-tight text-ink focus:outline-none sm:py-3.5 sm:text-3xl"
        />
        <span className="pr-4 text-sm font-semibold uppercase tracking-[0.18em] text-ink-mute">
          {suffix}
        </span>
      </div>
      {quickValues ? (
        <div className="flex flex-wrap gap-2">
          {quickValues.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => onChange(q)}
              className="rounded-full border border-hairline bg-pearl/70 px-3 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:border-gold-300/60 hover:bg-gold-50 hover:text-ink"
            >
              {q} {suffix}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function SummaryRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between border-t border-hairline pt-3 text-sm">
      <span className="text-ink-mute">{label}</span>
      {children}
    </div>
  );
}

export function Success({
  line1,
  line2,
}: {
  line1: string;
  line2?: string;
}) {
  return (
    <div className="flex flex-col items-center py-6 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-gradient text-[#1A1306] shadow-[inset_0_1px_0_rgba(255,247,224,0.7)]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M5 12.5l4 4 10-10"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <div className="font-display mt-4 text-xl font-extrabold tracking-tight text-ink">
        {line1}
      </div>
      {line2 ? (
        <div className="mt-1 text-sm text-ink-mute">{line2}</div>
      ) : null}
    </div>
  );
}
