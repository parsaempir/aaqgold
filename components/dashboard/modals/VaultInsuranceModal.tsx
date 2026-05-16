'use client';

import Modal from '../Modal';
import { useDashboard } from '../DashboardProvider';
import { fmtGrams, fmtUsd, usdFromGrams } from '@/lib/dashboard-store';

export default function VaultInsuranceModal() {
  const { openModal, setModal, grams } = useDashboard();
  const open = openModal === 'vault';
  const close = () => setModal(null);

  const holdingsUsd = usdFromGrams(grams);
  const policyNumber = 'LL-2026-049182';
  const auditDate = 'March 18, 2026';

  // Break holdings into nominal bar denominations for display
  const bars = breakIntoBars(grams);

  return (
    <Modal
      open={open}
      onClose={close}
      title="Vault & insurance"
      subtitle="Where your gold lives, and how it’s protected"
      size="lg"
    >
      <div className="flex flex-col gap-5">
        {/* Vault card */}
        <div className="card halo grain relative overflow-hidden p-5 sm:p-6">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-16 -right-16 h-44 w-44 rounded-full bg-gold-gradient opacity-20 blur-3xl"
          />
          <span className="eyebrow">Storage</span>
          <div className="font-display mt-2 text-2xl font-extrabold tracking-tight text-ink">
            Brink&rsquo;s Zurich Vault
          </div>
          <div className="mt-1 text-[0.92rem] text-ink-mute">
            Industriestrasse 60, 8302 Kloten · Switzerland
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <Info label="Allocated to you" value={fmtGrams(grams)} />
            <Info label="Market value" value={fmtUsd(holdingsUsd)} />
            <Info label="Storage tier" value="Segregated" />
            <Info label="Refiner" value="PAMP Suisse" />
            <Info label="Bar form" value="Cast & minted" />
            <Info label="Last audit" value={auditDate} />
          </div>
        </div>

        {/* Bars breakdown */}
        <div className="card p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <span className="eyebrow">Your bars</span>
            <span className="text-xs text-ink-mute">
              {bars.reduce((s, b) => s + b.qty, 0)} pieces
            </span>
          </div>
          {bars.length === 0 ? (
            <p className="mt-4 text-sm text-ink-mute">
              No allocated bars yet. Buy gold to see your holdings broken down here.
            </p>
          ) : (
            <ul className="mt-4 divide-y divide-hairline">
              {bars.map((b) => (
                <li
                  key={b.size}
                  className="flex items-center justify-between gap-3 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-12 items-center justify-center rounded-md bg-gold-gradient text-[10px] font-extrabold text-[#1A1306] shadow-[inset_0_1px_0_rgba(255,247,224,0.6)]">
                      {b.label}
                    </span>
                    <div>
                      <div className="text-[0.92rem] font-semibold text-ink">
                        {b.label} bar
                      </div>
                      <div className="text-xs text-ink-mute">
                        PAMP Suisse · 999.9 fine
                      </div>
                    </div>
                  </div>
                  <div className="tabular text-right text-[0.92rem] font-semibold text-ink">
                    × {b.qty}
                  </div>
                </li>
              ))}
              {bars[bars.length - 1].remainderGrams > 0.01 ? (
                <li className="flex items-center justify-between gap-3 py-3 text-sm text-ink-mute">
                  <span>Fractional balance</span>
                  <span className="tabular">
                    {fmtGrams(bars[bars.length - 1].remainderGrams)}
                  </span>
                </li>
              ) : null}
            </ul>
          )}
        </div>

        {/* Insurance card */}
        <div className="card p-5 sm:p-6">
          <span className="eyebrow">Insurance</span>
          <div className="font-display mt-2 text-xl font-extrabold tracking-tight text-ink">
            Lloyd&rsquo;s of London
          </div>
          <p className="mt-1 text-[0.92rem] text-ink-mute">
            Underwritten by Lloyd&rsquo;s syndicates. Full replacement value, in
            transit and at rest.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <Info label="Policy number" value={policyNumber} />
            <Info label="Coverage" value="Up to $50M / vault" />
            <Info label="Status" value="Active" tone="ok" />
          </div>

          <button
            onClick={() =>
              alert(
                'Certificate of insurance has been sent to your email on file.'
              )
            }
            className="btn-ghost mt-5 w-full justify-center !py-2.5 !text-sm sm:w-auto"
          >
            Email me the certificate
          </button>
        </div>
      </div>
    </Modal>
  );
}

function Info({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: 'ok';
}) {
  return (
    <div>
      <div className="text-[0.72rem] font-medium uppercase tracking-[0.14em] text-ink-mute">
        {label}
      </div>
      <div
        className={`font-display mt-1 truncate text-[0.98rem] font-extrabold tracking-tight ${
          tone === 'ok' ? 'text-gold-700' : 'text-ink'
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function breakIntoBars(totalGrams: number) {
  const sizes = [
    { size: 31.1035, label: '1 oz' },
    { size: 10, label: '10g' },
    { size: 5, label: '5g' },
    { size: 1, label: '1g' },
  ];
  let remaining = totalGrams;
  const result: { size: number; label: string; qty: number; remainderGrams: number }[] = [];
  for (const s of sizes) {
    const qty = Math.floor(remaining / s.size);
    if (qty > 0) {
      result.push({ size: s.size, label: s.label, qty, remainderGrams: 0 });
      remaining -= qty * s.size;
    }
  }
  if (result.length === 0 && totalGrams > 0) {
    result.push({
      size: 0,
      label: '< 1g',
      qty: 1,
      remainderGrams: 0,
    });
    remaining = 0;
  }
  if (result.length > 0) {
    result[result.length - 1].remainderGrams = remaining;
  }
  return result;
}
