'use client';

import Modal from '../Modal';
import { useDashboard } from '../DashboardProvider';
import {
  fmtGrams,
  fmtUsd,
  formatDate,
  gramsFromUsd,
} from '@/lib/dashboard-store';

export default function ManagePlanModal() {
  const {
    openModal,
    setModal,
    modalContext,
    store,
    usd,
    chargePlanNow,
    pausePlan,
    resumePlan,
    cancelPlan,
  } = useDashboard();

  const plan = store.plans.find((p) => p.id === modalContext);
  const open = openModal === 'manage-plan' && !!plan;

  const close = () => setModal(null);

  if (!plan) {
    return (
      <Modal open={open} onClose={close} title="Plan not found">
        <p className="text-sm text-ink-soft">This plan no longer exists.</p>
      </Modal>
    );
  }

  const progress = (plan.monthsPaid / plan.monthsTotal) * 100;
  const remaining = plan.monthsTotal - plan.monthsPaid;
  const remainingUsd = remaining * plan.monthlyUsd;
  const earnedGrams = gramsFromUsd(plan.monthsPaid * plan.monthlyUsd);
  const enoughCash = usd >= plan.monthlyUsd;
  const isActive = plan.status === 'active';
  const isPaused = plan.status === 'paused';
  const isDone =
    plan.status === 'completed' || plan.monthsPaid >= plan.monthsTotal;

  return (
    <Modal
      open={open}
      onClose={close}
      title={plan.name}
      subtitle={`${fmtUsd(plan.monthlyUsd)} / month · ${plan.monthsTotal} months`}
      size="lg"
    >
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <span
            className={`rounded-full px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wider ring-1 ${
              isActive
                ? 'bg-gold-50 text-gold-700 ring-gold-200'
                : isPaused
                  ? 'bg-pearl text-ink-soft ring-hairline'
                  : plan.status === 'cancelled'
                    ? 'bg-red-50 text-red-700 ring-red-200'
                    : 'bg-pearl text-ink-soft ring-hairline'
            }`}
          >
            {plan.status}
          </span>
          <span className="text-xs text-ink-mute">
            Started {formatDate(plan.startDate)}
          </span>
        </div>

        <div>
          <div className="flex items-baseline justify-between gap-3">
            <div className="font-display text-2xl font-extrabold tracking-tight text-ink">
              <span className="tabular">{plan.monthsPaid}</span>
              <span className="text-ink-mute">
                {' '}
                / {plan.monthsTotal} months
              </span>
            </div>
            <div className="tabular text-sm font-semibold text-gold-700">
              {progress.toFixed(0)}%
            </div>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-mist">
            <div
              className="h-full rounded-full bg-gold-gradient transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Stat label="Gold accumulated" value={fmtGrams(earnedGrams)} />
          <Stat
            label="Remaining"
            value={`${remaining} mo · ${fmtUsd(remainingUsd)}`}
          />
          <Stat
            label={isDone ? 'Completed' : 'Next charge'}
            value={isDone ? '—' : formatDate(plan.nextChargeDate)}
          />
        </div>

        <div className="rounded-2xl border border-hairline bg-pearl/60 p-4 text-[0.88rem] text-ink-soft">
          <div className="font-display mb-1 text-base font-extrabold text-ink">
            How it works
          </div>
          Every month on the 1st we use{' '}
          <span className="font-semibold text-ink">{fmtUsd(plan.monthlyUsd)}</span>{' '}
          from your USD balance to buy gold at the live spot price. Pause or
          cancel anytime.
        </div>

        {!isDone ? (
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <button
              onClick={() => chargePlanNow(plan.id)}
              disabled={!isActive || !enoughCash}
              className="btn-gold w-full !text-sm"
            >
              Charge this month now
              <span aria-hidden>→</span>
            </button>
            {isActive ? (
              <button
                onClick={() => pausePlan(plan.id)}
                className="btn-ghost w-full justify-center !text-sm"
              >
                Pause plan
              </button>
            ) : isPaused ? (
              <button
                onClick={() => resumePlan(plan.id)}
                className="btn-ghost w-full justify-center !text-sm"
              >
                Resume plan
              </button>
            ) : (
              <span />
            )}
          </div>
        ) : null}

        {!isDone && !enoughCash && isActive ? (
          <div className="rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Balance is below the monthly charge.{' '}
            <button
              onClick={() => setModal('deposit')}
              className="font-semibold underline underline-offset-2"
            >
              Deposit funds
            </button>{' '}
            to keep the plan active.
          </div>
        ) : null}

        {plan.status !== 'cancelled' && plan.status !== 'completed' ? (
          <button
            onClick={() => {
              if (confirm('Cancel this plan? Future charges will stop.')) {
                cancelPlan(plan.id);
                close();
              }
            }}
            className="self-start text-sm font-medium text-red-600 transition-colors hover:text-red-700"
          >
            Cancel plan
          </button>
        ) : null}
      </div>
    </Modal>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-hairline bg-pearl/60 p-4">
      <div className="text-[0.72rem] font-medium uppercase tracking-[0.14em] text-ink-mute">
        {label}
      </div>
      <div className="font-display mt-1 text-lg font-extrabold tracking-tight text-ink">
        {value}
      </div>
    </div>
  );
}
