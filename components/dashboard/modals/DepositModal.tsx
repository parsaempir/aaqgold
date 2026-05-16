'use client';

import { useState } from 'react';
import Modal from '../Modal';
import { useDashboard } from '../DashboardProvider';
import { fmtUsd } from '@/lib/dashboard-store';
import { AmountInput, SummaryRow, Success } from './BuyGoldModal';

export default function DepositModal() {
  const { openModal, setModal, deposit, usd } = useDashboard();
  const [amount, setAmount] = useState('250');
  const [method, setMethod] = useState<'card' | 'bank'>('card');
  const [done, setDone] = useState(false);

  const parsed = parseFloat(amount) || 0;
  const valid = parsed > 0;

  const close = () => {
    setModal(null);
    setTimeout(() => {
      setAmount('250');
      setMethod('card');
      setDone(false);
    }, 250);
  };

  const submit = () => {
    if (!valid) return;
    deposit(parsed);
    setDone(true);
    setTimeout(close, 900);
  };

  return (
    <Modal
      open={openModal === 'deposit'}
      onClose={close}
      title="Deposit funds"
      subtitle="Top up your USD balance to buy gold"
    >
      {done ? (
        <Success
          line1={`+${fmtUsd(parsed)} added to balance`}
          line2={method === 'card' ? 'Via card on file' : 'Bank transfer queued'}
        />
      ) : (
        <div className="flex flex-col gap-5">
          <AmountInput
            value={amount}
            onChange={setAmount}
            suffix="USD"
            quickValues={['100', '250', '500', '1000']}
          />

          <div>
            <div className="mb-2 text-[0.72rem] font-medium uppercase tracking-[0.14em] text-ink-mute">
              Payment method
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <MethodCard
                active={method === 'card'}
                onClick={() => setMethod('card')}
                title="Card · 4242"
                desc="Instant · 0% fee"
              />
              <MethodCard
                active={method === 'bank'}
                onClick={() => setMethod('bank')}
                title="Bank transfer"
                desc="1–2 business days"
              />
            </div>
          </div>

          <SummaryRow label="Current balance">
            <span className="tabular font-semibold text-ink">{fmtUsd(usd)}</span>
          </SummaryRow>
          <SummaryRow label="After deposit">
            <span className="tabular font-semibold text-ink">
              {fmtUsd(usd + parsed)}
            </span>
          </SummaryRow>

          <button className="btn-gold w-full" disabled={!valid} onClick={submit}>
            Confirm deposit
            <span aria-hidden>→</span>
          </button>
        </div>
      )}
    </Modal>
  );
}

function MethodCard({
  active,
  onClick,
  title,
  desc,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  desc: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex flex-col items-start gap-1 rounded-2xl border p-3.5 text-left transition-all duration-300 ${
        active
          ? 'border-gold-300/80 bg-gold-50/70 shadow-[0_0_0_4px_rgba(241,206,108,0.15)]'
          : 'border-hairline bg-pearl/70 hover:border-gold-300/55 hover:bg-gold-50/40'
      }`}
    >
      <span className="text-[0.92rem] font-semibold text-ink">{title}</span>
      <span className="text-[0.78rem] text-ink-mute">{desc}</span>
    </button>
  );
}
