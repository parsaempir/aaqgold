'use client';

import { useMemo, useState } from 'react';
import DashboardNav from '@/components/dashboard/DashboardNav';
import DashboardProvider, {
  useDashboard,
} from '@/components/dashboard/DashboardProvider';
import BuyGoldModal from '@/components/dashboard/modals/BuyGoldModal';
import SellGoldModal from '@/components/dashboard/modals/SellGoldModal';
import DepositModal from '@/components/dashboard/modals/DepositModal';
import DeliveryModal from '@/components/dashboard/modals/DeliveryModal';
import NewPlanModal from '@/components/dashboard/modals/NewPlanModal';
import ManagePlanModal from '@/components/dashboard/modals/ManagePlanModal';
import AccountSettingsModal from '@/components/dashboard/modals/AccountSettingsModal';
import VaultInsuranceModal from '@/components/dashboard/modals/VaultInsuranceModal';
import HelpCenterModal from '@/components/dashboard/modals/HelpCenterModal';
import {
  Delivery,
  GRAMS_PER_OZ,
  Plan,
  Transaction,
  fmtGrams,
  fmtUsd,
  formatDate,
  gramsFromUsd,
  usdFromGrams,
} from '@/lib/dashboard-store';

export default function DashboardPage() {
  return (
    <DashboardProvider>
      <DashboardInner />
      <BuyGoldModal />
      <SellGoldModal />
      <DepositModal />
      <DeliveryModal />
      <NewPlanModal />
      <ManagePlanModal />
      <AccountSettingsModal />
      <VaultInsuranceModal />
      <HelpCenterModal />
    </DashboardProvider>
  );
}

function DashboardInner() {
  const { store, ready, usd, grams, spotOz, setModal, resetDemo } = useDashboard();

  const greetingName =
    store.user.firstName ||
    store.user.email?.split('@')[0]?.replace(/[._-]/g, ' ') ||
    'there';

  const holdingsUsd = usdFromGrams(grams);
  const activePlans = useMemo(
    () => store.plans.filter((p) => p.status === 'active'),
    [store.plans]
  );
  const monthlyCommitted = activePlans.reduce((s, p) => s + p.monthlyUsd, 0);
  const totalInvested = useMemo(
    () =>
      store.transactions
        .filter((t) => t.type === 'buy' || t.type === 'plan-buy')
        .reduce((s, t) => s + Math.abs(t.usd), 0),
    [store.transactions]
  );
  const lifetimeReturnPct =
    totalInvested > 0 ? ((holdingsUsd - totalInvested) / totalInvested) * 100 : 0;

  if (!ready) {
    return (
      <div className="relative min-h-screen bg-canvas-fade">
        <DashboardNav />
        <div className="mx-auto flex max-w-7xl items-center justify-center px-4 pt-32 text-sm text-ink-mute">
          Loading your vault…
        </div>
      </div>
    );
  }

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-canvas-fade">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-[-20%] h-[520px] w-[520px] rounded-full bg-gold-200/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-[-20%] h-[520px] w-[520px] rounded-full bg-gold-100/40 blur-3xl"
      />

      <DashboardNav email={store.user.email} firstName={store.user.firstName} />

      <main className="relative mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 sm:pt-10 lg:px-8">
        {/* Greeting */}
        <section
          id="overview"
          className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end md:gap-6"
        >
          <div className="w-full md:w-auto">
            <span className="eyebrow">Vault overview</span>
            <h1 className="font-display mt-2.5 text-balance text-[1.8rem] font-extrabold leading-[1.05] tracking-tight text-ink sm:mt-3 sm:text-[2.5rem] md:text-4xl lg:text-5xl">
              Welcome back,{' '}
              <span className="text-gold-shine capitalize">{greetingName}</span>
            </h1>
            <p className="mt-2 max-w-xl text-pretty text-[0.92rem] leading-relaxed text-ink-soft sm:text-[0.98rem]">
              You hold{' '}
              <span className="font-semibold text-ink">{fmtGrams(grams)}</span>{' '}
              of gold (≈ {fmtUsd(holdingsUsd)}). Cash balance:{' '}
              <span className="font-semibold text-ink">{fmtUsd(usd)}</span>.
            </p>
          </div>
          <div className="flex w-full items-center gap-2.5 md:w-auto">
            <button
              onClick={() => setModal('deposit')}
              className="btn-ghost flex-1 !px-4 !py-3 !text-sm sm:!px-5 sm:!py-3.5 sm:!text-base md:flex-none"
            >
              Deposit
            </button>
            <button
              onClick={() => setModal('buy')}
              className="btn-gold flex-1 !px-4 !py-3 !text-sm sm:!px-5 sm:!py-3.5 sm:!text-base md:flex-none"
            >
              Buy gold
              <span aria-hidden>→</span>
            </button>
          </div>
        </section>

        {/* Stats row */}
        <section className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-4 lg:grid-cols-4">
          <StatCard
            label="Total holdings"
            primary={
              <span className="tabular">
                {grams.toFixed(2)}{' '}
                <span className="text-ink-mute text-base font-semibold">g</span>
              </span>
            }
            secondary={`≈ ${fmtUsd(holdingsUsd)}`}
            delta={
              lifetimeReturnPct >= 0
                ? `+${lifetimeReturnPct.toFixed(2)}%`
                : `${lifetimeReturnPct.toFixed(2)}%`
            }
            tone={lifetimeReturnPct >= 0 ? 'up' : 'down'}
          />
          <StatCard
            label="USD balance"
            primary={<span className="tabular">{fmtUsd(usd)}</span>}
            secondary="Available to buy gold"
            delta="Cash"
            tone="neutral"
          />
          <StatCard
            label="Spot price (oz)"
            primary={<span className="tabular">{fmtUsd(spotOz)}</span>}
            secondary="London PM fix"
            delta="+0.42%"
            tone="up"
            spark
          />
          <StatCard
            label="Active plans"
            primary={<span className="tabular">{activePlans.length}</span>}
            secondary={
              activePlans.length
                ? `${fmtUsd(monthlyCommitted)} / month`
                : 'No active plans'
            }
            delta={activePlans.length ? 'On track' : 'Start one'}
            tone="neutral"
          />
        </section>

        {/* Portfolio + Quick actions */}
        <section className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:gap-5 lg:grid-cols-3">
          <PortfolioCard
            grams={grams}
            holdingsUsd={holdingsUsd}
            transactions={store.transactions}
          />

          <div className="flex flex-col gap-5">
            <QuickActionsCard />
            <PlansSummaryCard plans={store.plans} />
          </div>
        </section>

        {/* All plans */}
        {store.plans.length > 0 ? (
          <section id="plans" className="mt-7 sm:mt-8">
            <SectionHeader
              title="Installment plans"
              eyebrow="Plans"
              action={{
                label: '+ New plan',
                onClick: () => setModal('new-plan'),
              }}
            />
            <div className="mt-3 grid grid-cols-1 gap-3 sm:mt-4 sm:gap-4 md:grid-cols-2">
              {store.plans.map((p) => (
                <PlanCard key={p.id} plan={p} />
              ))}
            </div>
          </section>
        ) : (
          <section id="plans" className="mt-7 sm:mt-8">
            <EmptyState
              title="No plans yet"
              desc="Set up a monthly installment plan to grow your vault on autopilot."
              ctaLabel="Create a plan"
              onCta={() => setModal('new-plan')}
            />
          </section>
        )}

        {/* Deliveries */}
        {store.deliveries.length > 0 ? (
          <section className="mt-7 sm:mt-8">
            <SectionHeader title="Deliveries" eyebrow="In transit" />
            <div className="mt-3 grid grid-cols-1 gap-3 sm:mt-4 sm:gap-4 md:grid-cols-2">
              {store.deliveries.map((d) => (
                <DeliveryCard key={d.id} delivery={d} />
              ))}
            </div>
          </section>
        ) : null}

        {/* Activity */}
        <section id="activity" className="mt-7 sm:mt-8">
          <ActivityCard transactions={store.transactions} />
        </section>

        {/* Trust strip */}
        <section className="mt-7 grid grid-cols-1 gap-3 sm:mt-8 sm:gap-4 sm:grid-cols-3">
          {[
            {
              title: 'LBMA-certified',
              desc: 'Bars & coins from approved refiners only.',
            },
            {
              title: 'Lloyd’s insured',
              desc: 'Every gram covered, in transit and at rest.',
            },
            {
              title: 'SOC 2 Type II',
              desc: 'Independent security audit on file annually.',
            },
          ].map((t) => (
            <div key={t.title} className="glass-gold rounded-2xl p-4 sm:p-5">
              <div className="font-display text-[0.95rem] font-extrabold tracking-tight text-ink sm:text-base">
                {t.title}
              </div>
              <div className="mt-1 text-[0.84rem] text-ink-soft sm:text-[0.88rem]">
                {t.desc}
              </div>
            </div>
          ))}
        </section>

        <div className="mt-8 flex flex-col items-start justify-between gap-2 text-[0.72rem] text-ink-mute sm:mt-10 sm:flex-row sm:items-center sm:text-xs">
          <span>Demo data is stored locally in your browser.</span>
          <button
            onClick={() => {
              if (confirm('Reset all demo data?')) resetDemo();
            }}
            className="font-medium transition-colors hover:text-ink"
          >
            Reset demo
          </button>
        </div>
      </main>
    </div>
  );
}

/* ───────── Sub-components ───────── */

function SectionHeader({
  title,
  eyebrow,
  action,
}: {
  title: string;
  eyebrow: string;
  action?: { label: string; onClick: () => void };
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div className="min-w-0">
        <span className="eyebrow">{eyebrow}</span>
        <div className="font-display mt-1 text-xl font-extrabold tracking-tight text-ink sm:text-2xl lg:text-3xl">
          {title}
        </div>
      </div>
      {action ? (
        <button
          onClick={action.onClick}
          className="text-[0.82rem] font-semibold text-gold-700 transition-colors hover:text-gold-600 sm:text-sm"
        >
          {action.label}
        </button>
      ) : null}
    </div>
  );
}

function EmptyState({
  title,
  desc,
  ctaLabel,
  onCta,
}: {
  title: string;
  desc: string;
  ctaLabel: string;
  onCta: () => void;
}) {
  return (
    <div className="card flex flex-col items-start gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:p-6 lg:p-8">
      <div>
        <div className="font-display text-lg font-extrabold tracking-tight text-ink sm:text-xl">
          {title}
        </div>
        <p className="mt-1 max-w-md text-[0.88rem] text-ink-soft sm:text-[0.92rem]">
          {desc}
        </p>
      </div>
      <button onClick={onCta} className="btn-gold w-full justify-center !text-sm sm:w-auto">
        {ctaLabel}
        <span aria-hidden>→</span>
      </button>
    </div>
  );
}

function QuickActionsCard() {
  const { setModal } = useDashboard();
  const actions: {
    key: 'buy' | 'sell' | 'delivery' | 'new-plan';
    label: string;
    desc: string;
    primary?: boolean;
    icon: React.ReactNode;
  }[] = [
    {
      key: 'buy',
      label: 'Buy gold',
      desc: 'Add grams instantly at the live spot price.',
      primary: true,
      icon: (
        <path
          d="M12 4v16M4 12h16"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      ),
    },
    {
      key: 'sell',
      label: 'Sell gold',
      desc: 'Convert holdings to cash in seconds.',
      icon: (
        <path
          d="M4 12h16M14 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ),
    },
    {
      key: 'delivery',
      label: 'Take delivery',
      desc: 'Ship insured bars or coins to your door.',
      icon: (
        <path
          d="M3 7h13l5 5v5h-3M3 7v10h2m1 0a2 2 0 1 0 4 0m0 0h6m0 0a2 2 0 1 0 4 0"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ),
    },
    {
      key: 'new-plan',
      label: 'New plan',
      desc: 'Set up a fixed monthly installment.',
      icon: (
        <path
          d="M4 7h16M4 12h16M4 17h10"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      ),
    },
  ];

  return (
    <div className="card relative overflow-hidden p-5 sm:p-6 lg:p-7">
      <span className="eyebrow">Quick actions</span>
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        {actions.map((a) => (
          <button
            key={a.key}
            onClick={() => setModal(a.key)}
            className={`group relative flex flex-col items-start gap-1.5 rounded-2xl border p-3 text-left transition-all duration-300 sm:gap-2 sm:p-3.5 ${
              a.primary
                ? 'border-gold-300/70 bg-gold-50/70 hover:-translate-y-0.5 hover:border-gold-400'
                : 'border-hairline bg-pearl/70 hover:-translate-y-0.5 hover:border-gold-300/55 hover:bg-gold-50/50'
            }`}
          >
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full sm:h-9 sm:w-9 ${
                a.primary
                  ? 'bg-gold-gradient text-[#1A1306] shadow-[inset_0_1px_0_rgba(255,247,224,0.6)]'
                  : 'bg-pearl text-ink ring-1 ring-hairline'
              }`}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                {a.icon}
              </svg>
            </span>
            <span className="text-[0.88rem] font-semibold text-ink sm:text-[0.92rem]">
              {a.label}
            </span>
            <span className="hidden text-[0.72rem] leading-snug text-ink-mute sm:block sm:text-[0.76rem]">
              {a.desc}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function PlansSummaryCard({ plans }: { plans: Plan[] }) {
  const { setModal } = useDashboard();
  const featured = plans.find((p) => p.status === 'active') ?? plans[0];

  if (!featured) {
    return (
      <div className="card p-5 sm:p-6 lg:p-7">
        <span className="eyebrow">No active plan</span>
        <div className="font-display mt-3 text-lg font-extrabold tracking-tight text-ink">
          Build your vault on autopilot
        </div>
        <p className="mt-1 text-[0.88rem] text-ink-mute">
          Set up a monthly installment plan in under a minute.
        </p>
        <button
          onClick={() => setModal('new-plan')}
          className="btn-gold mt-5 w-full justify-center !py-2.5 !text-sm"
        >
          Create a plan
          <span aria-hidden>→</span>
        </button>
      </div>
    );
  }

  const pct = (featured.monthsPaid / featured.monthsTotal) * 100;
  const remainingUsd =
    (featured.monthsTotal - featured.monthsPaid) * featured.monthlyUsd;

  return (
    <div className="card relative overflow-hidden p-5 sm:p-6 lg:p-7">
      <div className="flex items-center justify-between gap-2">
        <span className="eyebrow">Active plan</span>
        <span
          className={`rounded-full px-2 py-0.5 text-[0.66rem] font-semibold uppercase tracking-wider ring-1 sm:text-[0.7rem] ${
            featured.status === 'active'
              ? 'bg-gold-50 text-gold-700 ring-gold-200'
              : 'bg-pearl text-ink-soft ring-hairline'
          }`}
        >
          {featured.status === 'active' ? 'On track' : featured.status}
        </span>
      </div>
      <div className="font-display mt-3 text-balance text-[1.05rem] font-extrabold leading-tight tracking-tight text-ink sm:mt-4 sm:text-xl">
        {featured.name} · {fmtUsd(featured.monthlyUsd)} / month
      </div>
      <p className="mt-1 text-[0.85rem] text-ink-mute sm:text-[0.88rem]">
        {fmtUsd(remainingUsd)} left over{' '}
        {featured.monthsTotal - featured.monthsPaid} months.
      </p>

      <div className="mt-4">
        <div className="flex items-center justify-between text-[0.78rem] text-ink-mute">
          <span>
            Paid {featured.monthsPaid} / {featured.monthsTotal} months
          </span>
          <span className="font-semibold text-ink">{pct.toFixed(0)}%</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-mist">
          <div
            className="h-full rounded-full bg-gold-gradient transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <button
        onClick={() => setModal('manage-plan', featured.id)}
        className="btn-ghost mt-5 w-full justify-center !py-2.5 !text-sm"
      >
        Manage plan
      </button>
    </div>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const { setModal } = useDashboard();
  const pct = (plan.monthsPaid / plan.monthsTotal) * 100;
  const earnedGrams = gramsFromUsd(plan.monthsPaid * plan.monthlyUsd);

  return (
    <button
      onClick={() => setModal('manage-plan', plan.id)}
      className="card halo group flex flex-col items-start p-4 text-left transition-all duration-300 hover:-translate-y-0.5 sm:p-5 lg:p-6"
    >
      <div className="flex w-full flex-wrap items-center justify-between gap-2">
        <span
          className={`rounded-full px-2 py-0.5 text-[0.64rem] font-semibold uppercase tracking-wider ring-1 sm:text-[0.68rem] ${
            plan.status === 'active'
              ? 'bg-gold-50 text-gold-700 ring-gold-200'
              : plan.status === 'paused'
                ? 'bg-pearl text-ink-soft ring-hairline'
                : plan.status === 'completed'
                  ? 'bg-gold-50 text-gold-700 ring-gold-200'
                  : 'bg-red-50 text-red-700 ring-red-200'
          }`}
        >
          {plan.status}
        </span>
        <span className="text-[0.7rem] text-ink-mute sm:text-xs">
          Next:{' '}
          {plan.monthsPaid >= plan.monthsTotal
            ? '—'
            : formatDate(plan.nextChargeDate)}
        </span>
      </div>

      <div className="font-display mt-3 text-base font-extrabold tracking-tight text-ink sm:text-lg">
        {plan.name}
      </div>
      <div className="mt-0.5 text-[0.84rem] text-ink-mute sm:text-[0.88rem]">
        {fmtUsd(plan.monthlyUsd)} / month · {plan.monthsTotal} months
      </div>

      <div className="mt-4 w-full">
        <div className="flex items-center justify-between text-[0.76rem] text-ink-mute">
          <span>
            {plan.monthsPaid} / {plan.monthsTotal} paid
          </span>
          <span className="font-semibold text-ink tabular">
            {fmtGrams(earnedGrams)}
          </span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-mist">
          <div
            className="h-full rounded-full bg-gold-gradient transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </button>
  );
}

function DeliveryCard({ delivery }: { delivery: Delivery }) {
  return (
    <div className="card p-4 sm:p-5 lg:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span
          className={`rounded-full px-2 py-0.5 text-[0.64rem] font-semibold uppercase tracking-wider ring-1 sm:text-[0.68rem] ${
            delivery.status === 'delivered'
              ? 'bg-gold-50 text-gold-700 ring-gold-200'
              : delivery.status === 'shipped'
                ? 'bg-pearl text-ink-soft ring-hairline'
                : 'bg-gold-50 text-gold-700 ring-gold-200'
          }`}
        >
          {delivery.status}
        </span>
        <span className="text-[0.7rem] text-ink-mute sm:text-xs">
          {formatDate(delivery.date)}
        </span>
      </div>
      <div className="font-display mt-3 text-base font-extrabold tracking-tight text-ink sm:text-lg">
        {delivery.product}
      </div>
      <div className="mt-0.5 break-all text-[0.84rem] text-ink-mute sm:text-[0.88rem]">
        {fmtGrams(delivery.grams)} · Tracking{' '}
        <span className="font-medium text-ink">{delivery.trackingNumber}</span>
      </div>
      <div className="mt-3 line-clamp-2 text-[0.8rem] text-ink-soft sm:text-[0.82rem]">
        {delivery.address}
      </div>
    </div>
  );
}

function ActivityCard({ transactions }: { transactions: Transaction[] }) {
  const [limit, setLimit] = useState(6);
  const visible = transactions.slice(0, limit);
  const canShowMore = transactions.length > limit;

  return (
    <div className="card relative overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-hairline px-5 py-4 sm:px-6 sm:py-5 lg:px-8">
        <div className="min-w-0">
          <span className="eyebrow">Recent activity</span>
          <div className="font-display mt-1 text-lg font-extrabold tracking-tight text-ink sm:text-xl">
            Transactions
          </div>
        </div>
        <span className="shrink-0 text-[0.82rem] text-ink-mute sm:text-sm">
          {transactions.length} total
        </span>
      </div>

      {transactions.length === 0 ? (
        <div className="px-5 py-10 text-center text-sm text-ink-mute sm:px-6 lg:px-8">
          No transactions yet. Buy your first gram to get started.
        </div>
      ) : (
        <>
          <ul className="divide-y divide-hairline">
            {visible.map((t) => (
              <TransactionRow key={t.id} tx={t} />
            ))}
          </ul>
          {canShowMore ? (
            <div className="border-t border-hairline px-5 py-3.5 text-center sm:px-6 sm:py-4 lg:px-8">
              <button
                onClick={() => setLimit((l) => l + 6)}
                className="text-[0.82rem] font-semibold text-gold-700 transition-colors hover:text-gold-600 sm:text-sm"
              >
                Show more →
              </button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}

function TransactionRow({ tx }: { tx: Transaction }) {
  const isIn = tx.grams > 0 || (tx.grams === 0 && tx.usd > 0);
  const usdLabel =
    tx.type === 'deposit'
      ? `+${fmtUsd(tx.usd)}`
      : tx.usd === 0
        ? ''
        : tx.usd > 0
          ? `+${fmtUsd(tx.usd)}`
          : `−${fmtUsd(Math.abs(tx.usd))}`;
  const gramsLabel =
    tx.grams === 0
      ? ''
      : tx.grams > 0
        ? `+${fmtGrams(tx.grams)}`
        : `−${fmtGrams(Math.abs(tx.grams))}`;

  return (
    <li className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-gold-50/40 sm:gap-4 sm:px-6 sm:py-4 lg:px-8">
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-1 sm:h-10 sm:w-10 ${
          isIn
            ? 'bg-gold-50 text-gold-700 ring-gold-200'
            : 'bg-pearl text-ink-soft ring-hairline'
        }`}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
          {isIn ? (
            <path
              d="M6 14l6-6 6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            <path
              d="M6 10l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </svg>
      </span>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[0.88rem] font-semibold text-ink sm:text-[0.95rem]">
          {tx.label}
        </div>
        <div className="text-[0.7rem] text-ink-mute sm:text-xs">
          {formatDate(tx.date)}
        </div>
      </div>
      <div className="shrink-0 text-right">
        <div className="tabular text-[0.88rem] font-semibold text-ink sm:text-[0.95rem]">
          {gramsLabel || usdLabel}
        </div>
        {gramsLabel && usdLabel ? (
          <div className="tabular text-[0.7rem] text-ink-mute sm:text-xs">
            {usdLabel}
          </div>
        ) : null}
      </div>
    </li>
  );
}

function PortfolioCard({
  grams,
  holdingsUsd,
  transactions,
}: {
  grams: number;
  holdingsUsd: number;
  transactions: Transaction[];
}) {
  const ranges = ['1W', '1M', '3M', '1Y', 'All'] as const;
  type Range = (typeof ranges)[number];
  const [range, setRange] = useState<Range>('1M');

  const series = useMemo(
    () => buildSeries(transactions, range),
    [transactions, range]
  );

  return (
    <div
      id="portfolio"
      className="card halo grain relative overflow-hidden p-5 sm:p-7 lg:col-span-2 lg:p-8"
    >
      <div className="flex flex-wrap items-end justify-between gap-3 sm:gap-4">
        <div className="min-w-0">
          <span className="eyebrow">Portfolio</span>
          <div className="mt-2 flex flex-wrap items-baseline gap-x-2.5 gap-y-1 sm:gap-3">
            <div className="font-display text-[1.7rem] font-extrabold tracking-tight text-ink sm:text-3xl lg:text-4xl">
              <span className="tabular">{fmtUsd(holdingsUsd)}</span>
            </div>
            <span className="rounded-full bg-gold-50 px-2 py-0.5 text-[0.7rem] font-semibold text-gold-700 ring-1 ring-gold-200 sm:text-xs">
              {series.delta >= 0 ? '+' : ''}
              {fmtUsd(series.delta)}
            </span>
          </div>
          <div className="mt-1 text-[0.82rem] text-ink-mute sm:text-sm">
            {fmtGrams(grams)} · allocated, vault-stored
          </div>
        </div>
        <div className="-mx-1 flex shrink-0 items-center gap-1 self-start overflow-x-auto rounded-full border border-hairline bg-pearl/70 p-1 no-scrollbar sm:self-auto">
          {ranges.map((t) => (
            <button
              key={t}
              onClick={() => setRange(t)}
              className={`shrink-0 rounded-full px-2.5 py-1 text-[0.7rem] font-medium transition-colors sm:text-xs ${
                t === range
                  ? 'bg-gold-gradient text-[#1A1306] shadow-[inset_0_1px_0_rgba(255,247,224,0.6)]'
                  : 'text-ink-mute hover:text-ink'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <PortfolioChart points={series.points} />

      <div className="mt-2 grid grid-cols-3 gap-2 text-[0.7rem] text-ink-mute sm:gap-6 sm:text-xs">
        <div className="min-w-0">
          <div className="font-medium uppercase tracking-[0.12em] sm:tracking-[0.14em]">
            Allocated
          </div>
          <div className="font-display tabular mt-1 truncate text-[0.92rem] font-bold text-ink sm:text-base">
            {fmtGrams(grams)}
          </div>
        </div>
        <div className="min-w-0">
          <div className="font-medium uppercase tracking-[0.12em] sm:tracking-[0.14em]">
            Avg cost
          </div>
          <div className="font-display tabular mt-1 truncate text-[0.92rem] font-bold text-ink sm:text-base">
            {fmtUsd(2372)}/oz
          </div>
        </div>
        <div className="min-w-0">
          <div className="font-medium uppercase tracking-[0.12em] sm:tracking-[0.14em]">
            Insured
          </div>
          <div className="font-display mt-1 text-[0.92rem] font-bold text-ink sm:text-base">
            Lloyd&rsquo;s
          </div>
        </div>
      </div>
    </div>
  );
}

function buildSeries(
  transactions: Transaction[],
  range: '1W' | '1M' | '3M' | '1Y' | 'All'
): { points: number[]; delta: number } {
  const days = range === '1W' ? 7 : range === '1M' ? 30 : range === '3M' ? 90 : range === '1Y' ? 365 : 720;
  const now = Date.now();
  const start = now - days * 86400000;

  const sorted = [...transactions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  let runningGrams = 0;
  const beforeStart = sorted.filter((t) => new Date(t.date).getTime() < start);
  for (const t of beforeStart) runningGrams += t.grams;
  const startingGrams = runningGrams;

  const steps = Math.min(80, Math.max(20, Math.floor(days / 3)));
  const stepMs = (now - start) / steps;
  const points: number[] = [];
  let txIdx = beforeStart.length;
  for (let i = 0; i <= steps; i++) {
    const cutoff = start + i * stepMs;
    while (
      txIdx < sorted.length &&
      new Date(sorted[txIdx].date).getTime() <= cutoff
    ) {
      runningGrams += sorted[txIdx].grams;
      txIdx++;
    }
    const wobble = 1 + Math.sin(i * 0.32) * 0.012 + (i / steps) * 0.01;
    const oz = runningGrams / GRAMS_PER_OZ;
    points.push(oz * 2418 * wobble);
  }
  const startUsd = (startingGrams / GRAMS_PER_OZ) * 2418;
  const endUsd = points[points.length - 1] ?? 0;
  return { points, delta: endUsd - startUsd };
}

function PortfolioChart({ points }: { points: number[] }) {
  if (!points.length || points.every((p) => p === 0)) {
    return (
      <div className="mt-6 flex h-48 flex-col items-center justify-center rounded-2xl border border-dashed border-hairline text-sm text-ink-mute sm:h-56">
        Your portfolio chart will appear here after your first buy.
      </div>
    );
  }
  const w = 800;
  const h = 220;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = max - min || 1;
  const stepX = w / Math.max(1, points.length - 1);
  const toY = (v: number) => h - 20 - ((v - min) / span) * (h - 40);
  const path = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${(i * stepX).toFixed(1)} ${toY(p).toFixed(1)}`)
    .join(' ');
  const lastX = (points.length - 1) * stepX;
  const lastY = toY(points[points.length - 1]);

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="mt-6 h-48 w-full sm:h-56"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#DCAE3D" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#DCAE3D" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="chart-stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#B07F1E" />
          <stop offset="50%" stopColor="#DCAE3D" />
          <stop offset="100%" stopColor="#C9942C" />
        </linearGradient>
      </defs>

      {[40, 90, 140, 190].map((y) => (
        <line
          key={y}
          x1="0"
          x2={w}
          y1={y}
          y2={y}
          stroke="#E6E1D3"
          strokeDasharray="3 6"
          strokeWidth="1"
        />
      ))}

      <path
        d={path}
        stroke="url(#chart-stroke)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={`${path} L ${lastX.toFixed(1)} ${h} L 0 ${h} Z`}
        fill="url(#chart-fill)"
      />

      <circle cx={lastX} cy={lastY} r={6} fill="#DCAE3D" stroke="#FFF" strokeWidth="2" />
    </svg>
  );
}

function StatCard({
  label,
  primary,
  secondary,
  delta,
  tone,
  spark,
}: {
  label: string;
  primary: React.ReactNode;
  secondary: string;
  delta: string;
  tone: 'up' | 'down' | 'neutral';
  spark?: boolean;
}) {
  const toneCls =
    tone === 'up'
      ? 'bg-gold-50 text-gold-700 ring-gold-200'
      : tone === 'down'
        ? 'bg-red-50 text-red-600 ring-red-200'
        : 'bg-pearl text-ink-soft ring-hairline';

  return (
    <div className="card relative overflow-hidden p-4 sm:p-5 lg:p-6">
      <div className="flex flex-wrap items-start justify-between gap-x-2 gap-y-1">
        <span className="text-[0.66rem] font-medium uppercase tracking-[0.14em] text-ink-mute sm:text-[0.72rem] sm:tracking-[0.16em]">
          {label}
        </span>
        <span
          className={`rounded-full px-1.5 py-0.5 text-[0.62rem] font-semibold ring-1 sm:px-2 sm:text-[0.7rem] ${toneCls}`}
        >
          {delta}
        </span>
      </div>
      <div className="font-display mt-2.5 text-[1.35rem] font-extrabold tracking-tight text-ink sm:mt-3 sm:text-2xl lg:text-3xl">
        {primary}
      </div>
      <div className="mt-1 truncate text-[0.78rem] text-ink-mute sm:text-[0.82rem]">
        {secondary}
      </div>
      {spark ? <Sparkline /> : null}
    </div>
  );
}

function Sparkline() {
  return (
    <svg
      viewBox="0 0 200 40"
      className="mt-3 h-10 w-full"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#DCAE3D" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#DCAE3D" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 28 L18 24 L35 26 L52 18 L70 22 L90 14 L110 18 L130 10 L150 14 L172 8 L200 12"
        stroke="#B07F1E"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0 28 L18 24 L35 26 L52 18 L70 22 L90 14 L110 18 L130 10 L150 14 L172 8 L200 12 L200 40 L0 40 Z"
        fill="url(#spark-fill)"
      />
    </svg>
  );
}
