'use client';

import { useState } from 'react';
import Modal from '../Modal';
import { useDashboard } from '../DashboardProvider';
import { fmtGrams, fmtUsd } from '@/lib/dashboard-store';
import { AmountInput, SummaryRow, Success } from './BuyGoldModal';

export default function SellGoldModal() {
  const { openModal, setModal, sellGold, grams, spotGram, spotOz } = useDashboard();
  const [amount, setAmount] = useState('0.5');
  const [done, setDone] = useState(false);

  const parsed = parseFloat(amount) || 0;
  const payout = parsed * spotGram;
  const valid = parsed > 0 && parsed <= grams;

  const close = () => {
    setModal(null);
    setTimeout(() => {
      setAmount('0.5');
      setDone(false);
    }, 250);
  };

  const submit = () => {
    if (!valid) return;
    sellGold(parsed);
    setDone(true);
    setTimeout(close, 900);
  };

  return (
    <Modal
      open={openModal === 'sell'}
      onClose={close}
      title="Sell gold"
      subtitle={`Live spot · ${fmtUsd(spotOz)} / oz`}
    >
      {done ? (
        <Success
          line1={`+${fmtUsd(payout)} added to balance`}
          line2={`Sold ${fmtGrams(parsed)} at spot`}
        />
      ) : (
        <div className="flex flex-col gap-5">
          <AmountInput
            value={amount}
            onChange={setAmount}
            suffix="g"
            quickValues={['0.5', '1', '2', 'Max']}
          />

          {amount === 'Max' ? (
            <button
              type="button"
              onClick={() => setAmount(grams.toFixed(2))}
              className="-mt-2 self-start text-xs font-semibold text-gold-600 underline underline-offset-2"
            >
              Use max ({fmtGrams(grams)})
            </button>
          ) : null}

          <SummaryRow label="You sell">
            <span className="tabular font-semibold text-ink">
              {fmtGrams(parsed || 0)}
            </span>
          </SummaryRow>
          <SummaryRow label="You receive">
            <span className="tabular font-semibold text-ink">
              {fmtUsd(payout || 0)}
            </span>
          </SummaryRow>
          <SummaryRow label="Holdings after">
            <span
              className={`tabular font-semibold ${
                parsed > grams ? 'text-red-500' : 'text-ink'
              }`}
            >
              {fmtGrams(Math.max(0, grams - parsed))}
            </span>
          </SummaryRow>

          {parsed > grams ? (
            <div className="rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
              You only hold {fmtGrams(grams)}. Lower the amount.
            </div>
          ) : null}

          <button className="btn-gold w-full" disabled={!valid} onClick={submit}>
            Confirm sell
            <span aria-hidden>→</span>
          </button>
        </div>
      )}
    </Modal>
  );
}
