export const SPOT_PRICE_USD_PER_OZ = 2418;
export const GRAMS_PER_OZ = 31.1035;
export const SPOT_PRICE_USD_PER_GRAM = SPOT_PRICE_USD_PER_OZ / GRAMS_PER_OZ;
export const DELIVERY_FEE_USD = 25;

export const STORAGE_KEY = 'placeholder_dashboard_v1';

export type TransactionType =
  | 'buy'
  | 'sell'
  | 'deposit'
  | 'plan-buy'
  | 'delivery';

export type Transaction = {
  id: string;
  type: TransactionType;
  grams: number;
  usd: number;
  pricePerOz?: number;
  date: string;
  label: string;
};

export type Plan = {
  id: string;
  name: string;
  monthlyUsd: number;
  monthsTotal: number;
  monthsPaid: number;
  startDate: string;
  nextChargeDate: string;
  status: 'active' | 'paused' | 'completed' | 'cancelled';
};

export type Delivery = {
  id: string;
  grams: number;
  product: string;
  address: string;
  status: 'requested' | 'shipped' | 'delivered';
  trackingNumber?: string;
  date: string;
};

export type UserProfile = {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  twoFactor?: boolean;
  notifications?: {
    marketAlerts?: boolean;
    transactionEmails?: boolean;
    monthlyStatements?: boolean;
  };
};

export type Store = {
  user: UserProfile;
  transactions: Transaction[];
  plans: Plan[];
  deliveries: Delivery[];
};

export function gramsFromUsd(usd: number): number {
  return usd / SPOT_PRICE_USD_PER_GRAM;
}

export function usdFromGrams(grams: number): number {
  return grams * SPOT_PRICE_USD_PER_GRAM;
}

export function computeBalance(store: Store): { usd: number; grams: number } {
  let usd = 0;
  let grams = 0;
  for (const t of store.transactions) {
    usd += t.usd;
    grams += t.grams;
  }
  return { usd, grams };
}

export function fmtUsd(n: number): string {
  return n.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  });
}

export function fmtGrams(n: number): string {
  return `${n.toFixed(2)} g`;
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diff = (now.getTime() - d.getTime()) / 86400000;
  if (diff < 1 && d.getDate() === now.getDate()) {
    return `Today, ${d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
  }
  if (diff < 2) {
    return 'Yesterday';
  }
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

function addMonths(iso: string, months: number): string {
  const d = new Date(iso);
  d.setMonth(d.getMonth() + months);
  return d.toISOString();
}

export function seedStore(): Store {
  const now = new Date();
  const ago = (days: number) =>
    new Date(now.getTime() - days * 86400000).toISOString();
  const planMonthly = 210;
  const planGramsPerCharge = planMonthly / SPOT_PRICE_USD_PER_GRAM;

  const planStart = ago(120);
  const txs: Transaction[] = [
    {
      id: uid(),
      type: 'deposit',
      grams: 0,
      usd: 1000,
      date: ago(125),
      label: 'Initial deposit · Card',
    },
    {
      id: uid(),
      type: 'plan-buy',
      grams: planGramsPerCharge,
      usd: -planMonthly,
      pricePerOz: 2380,
      date: ago(120),
      label: 'Auto-installment · Saver plan',
    },
    {
      id: uid(),
      type: 'buy',
      grams: 2,
      usd: -2 * (2390 / GRAMS_PER_OZ),
      pricePerOz: 2390,
      date: ago(95),
      label: 'Vault buy · 2g bar',
    },
    {
      id: uid(),
      type: 'plan-buy',
      grams: planGramsPerCharge,
      usd: -planMonthly,
      pricePerOz: 2395,
      date: ago(88),
      label: 'Auto-installment · Saver plan',
    },
    {
      id: uid(),
      type: 'deposit',
      grams: 0,
      usd: 500,
      date: ago(70),
      label: 'Top-up · Bank transfer',
    },
    {
      id: uid(),
      type: 'plan-buy',
      grams: planGramsPerCharge,
      usd: -planMonthly,
      pricePerOz: 2400,
      date: ago(58),
      label: 'Auto-installment · Saver plan',
    },
    {
      id: uid(),
      type: 'sell',
      grams: -0.5,
      usd: 0.5 * (2410 / GRAMS_PER_OZ),
      pricePerOz: 2410,
      date: ago(35),
      label: 'Sold · 0.5g coin',
    },
    {
      id: uid(),
      type: 'buy',
      grams: 1,
      usd: -1 * (2415 / GRAMS_PER_OZ),
      pricePerOz: 2415,
      date: ago(22),
      label: 'Vault buy · 1g bar',
    },
    {
      id: uid(),
      type: 'plan-buy',
      grams: planGramsPerCharge,
      usd: -planMonthly,
      pricePerOz: SPOT_PRICE_USD_PER_OZ,
      date: ago(7),
      label: 'Auto-installment · Saver plan',
    },
  ];

  const plans: Plan[] = [
    {
      id: uid(),
      name: 'Saver plan',
      monthlyUsd: 210,
      monthsTotal: 12,
      monthsPaid: 4,
      startDate: planStart,
      nextChargeDate: addMonths(planStart, 4),
      status: 'active',
    },
  ];

  return {
    user: {},
    transactions: txs,
    plans,
    deliveries: [],
  };
}

export function nextChargeAfter(plan: Plan): string {
  return addMonths(plan.startDate, plan.monthsPaid + 1);
}
