'use client';

import { useState } from 'react';
import Modal from '../Modal';
import { useDashboard } from '../DashboardProvider';
import { DELIVERY_FEE_USD, fmtGrams, fmtUsd } from '@/lib/dashboard-store';
import { SummaryRow, Success } from './BuyGoldModal';

const products = [
  { id: '1g-bar', label: '1g bar', grams: 1 },
  { id: '5g-bar', label: '5g bar', grams: 5 },
  { id: '10g-bar', label: '10g bar', grams: 10 },
  { id: '1oz-coin', label: '1oz coin', grams: 31.1035 },
];

export default function DeliveryModal() {
  const { openModal, setModal, requestDelivery, grams, usd } = useDashboard();
  const [productId, setProductId] = useState(products[0].id);
  const [qty, setQty] = useState('1');
  const [address, setAddress] = useState('');
  const [done, setDone] = useState(false);

  const product = products.find((p) => p.id === productId)!;
  const parsedQty = Math.max(0, parseInt(qty, 10) || 0);
  const gramsOut = product.grams * parsedQty;
  const enoughGrams = gramsOut > 0 && gramsOut <= grams;
  const enoughCash = usd >= DELIVERY_FEE_USD;
  const valid = enoughGrams && enoughCash && address.trim().length > 5;

  const close = () => {
    setModal(null);
    setTimeout(() => {
      setQty('1');
      setProductId(products[0].id);
      setAddress('');
      setDone(false);
    }, 250);
  };

  const submit = () => {
    if (!valid) return;
    requestDelivery({
      grams: gramsOut,
      product: `${parsedQty} × ${product.label}`,
      address: address.trim(),
    });
    setDone(true);
    setTimeout(close, 1100);
  };

  return (
    <Modal
      open={openModal === 'delivery'}
      onClose={close}
      title="Take delivery"
      subtitle="Ship insured bars or coins from the vault"
      size="lg"
    >
      {done ? (
        <Success
          line1="Delivery request submitted"
          line2="You’ll get a tracking link by email within 24h."
        />
      ) : (
        <div className="flex flex-col gap-5">
          <div>
            <div className="mb-2 text-[0.72rem] font-medium uppercase tracking-[0.14em] text-ink-mute">
              Product
            </div>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {products.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setProductId(p.id)}
                  className={`flex flex-col items-start gap-1 rounded-2xl border p-3 text-left transition-all ${
                    productId === p.id
                      ? 'border-gold-300/80 bg-gold-50/70 shadow-[0_0_0_4px_rgba(241,206,108,0.15)]'
                      : 'border-hairline bg-pearl/70 hover:border-gold-300/55 hover:bg-gold-50/40'
                  }`}
                >
                  <span className="font-display text-base font-extrabold text-ink">
                    {p.label}
                  </span>
                  <span className="text-[0.76rem] text-ink-mute">
                    {fmtGrams(p.grams)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-1.5 text-[0.72rem] font-medium uppercase tracking-[0.14em] text-ink-mute">
              Quantity
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQty(String(Math.max(1, parsedQty - 1)))}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-pearl text-ink-soft transition-colors hover:border-gold-300/55 hover:text-ink"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <input
                type="text"
                inputMode="numeric"
                value={qty}
                onChange={(e) => setQty(e.target.value.replace(/\D/g, '') || '0')}
                className="font-display h-11 w-20 rounded-2xl border border-hairline bg-pearl/80 text-center text-xl font-extrabold text-ink focus:border-gold-300 focus:outline-none focus:shadow-[0_0_0_4px_rgba(241,206,108,0.18)]"
              />
              <button
                type="button"
                onClick={() => setQty(String(parsedQty + 1))}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-pearl text-ink-soft transition-colors hover:border-gold-300/55 hover:text-ink"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-[0.72rem] font-medium uppercase tracking-[0.14em] text-ink-mute">
              Shipping address
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="221B Baker Street, London NW1 6XE, UK"
              rows={3}
              className="w-full rounded-2xl border border-hairline bg-pearl/80 px-4 py-3 text-[0.95rem] text-ink placeholder:text-ink-dim focus:border-gold-300 focus:outline-none focus:shadow-[0_0_0_4px_rgba(241,206,108,0.18)]"
            />
          </div>

          <SummaryRow label="Gold deducted">
            <span className="tabular font-semibold text-ink">
              {fmtGrams(gramsOut)}
            </span>
          </SummaryRow>
          <SummaryRow label="Shipping fee (insured)">
            <span className="tabular font-semibold text-ink">
              {fmtUsd(DELIVERY_FEE_USD)}
            </span>
          </SummaryRow>
          <SummaryRow label="Holdings after">
            <span
              className={`tabular font-semibold ${
                enoughGrams ? 'text-ink' : 'text-red-500'
              }`}
            >
              {fmtGrams(Math.max(0, grams - gramsOut))}
            </span>
          </SummaryRow>

          {!enoughGrams && parsedQty > 0 ? (
            <div className="rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
              You only hold {fmtGrams(grams)}. Reduce quantity or buy more first.
            </div>
          ) : null}
          {!enoughCash ? (
            <div className="rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
              {fmtUsd(DELIVERY_FEE_USD)} shipping fee — deposit USD to cover it.
            </div>
          ) : null}

          <button className="btn-gold w-full" disabled={!valid} onClick={submit}>
            Request delivery
            <span aria-hidden>→</span>
          </button>
        </div>
      )}
    </Modal>
  );
}
