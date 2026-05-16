'use client';

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  GRAMS_PER_OZ,
  Plan,
  SPOT_PRICE_USD_PER_GRAM,
  SPOT_PRICE_USD_PER_OZ,
  STORAGE_KEY,
  Store,
  Transaction,
  computeBalance,
  nextChargeAfter,
  seedStore,
  uid,
} from '@/lib/dashboard-store';

type ModalKind =
  | 'buy'
  | 'sell'
  | 'deposit'
  | 'delivery'
  | 'new-plan'
  | 'manage-plan'
  | 'account'
  | 'vault'
  | 'help'
  | null;

type Ctx = {
  store: Store;
  ready: boolean;
  usd: number;
  grams: number;
  spotOz: number;
  spotGram: number;
  openModal: ModalKind;
  modalContext?: string;
  setModal: (m: ModalKind, ctx?: string) => void;
  buyGold: (input: { grams: number; usd: number }) => void;
  sellGold: (grams: number) => void;
  deposit: (usd: number) => void;
  requestDelivery: (input: {
    grams: number;
    product: string;
    address: string;
  }) => void;
  createPlan: (input: { name: string; monthlyUsd: number; months: number }) => void;
  chargePlanNow: (planId: string) => void;
  pausePlan: (planId: string) => void;
  resumePlan: (planId: string) => void;
  cancelPlan: (planId: string) => void;
  updateUser: (user: Store['user']) => void;
  resetDemo: () => void;
};

const DashboardContext = createContext<Ctx | null>(null);

export function useDashboard(): Ctx {
  const ctx = useContext(DashboardContext);
  if (!ctx)
    throw new Error('useDashboard must be used inside <DashboardProvider>');
  return ctx;
}

export default function DashboardProvider({ children }: { children: ReactNode }) {
  const [store, setStore] = useState<Store>(() => ({
    user: {},
    transactions: [],
    plans: [],
    deliveries: [],
  }));
  const [ready, setReady] = useState(false);
  const [openModal, setOpenModal] = useState<ModalKind>(null);
  const [modalContext, setModalContext] = useState<string | undefined>(undefined);

  useEffect(() => {
    let next: Store;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        next = JSON.parse(raw) as Store;
      } else {
        next = seedStore();
      }
      const sessRaw = sessionStorage.getItem('placeholder_user');
      if (sessRaw) {
        try {
          const sess = JSON.parse(sessRaw);
          next.user = { ...next.user, ...sess };
        } catch {}
      }
    } catch {
      next = seedStore();
    }
    // Hydrating client-only state from localStorage: setState here is intentional.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStore(next);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch {}
  }, [store, ready]);

  const { usd, grams } = useMemo(() => computeBalance(store), [store]);

  const setModal = useCallback((m: ModalKind, ctx?: string) => {
    setOpenModal(m);
    setModalContext(ctx);
  }, []);

  const pushTx = useCallback((tx: Transaction) => {
    setStore((s) => ({ ...s, transactions: [tx, ...s.transactions] }));
  }, []);

  const buyGold: Ctx['buyGold'] = useCallback(
    ({ grams: g, usd: cost }) => {
      pushTx({
        id: uid(),
        type: 'buy',
        grams: g,
        usd: -cost,
        pricePerOz: SPOT_PRICE_USD_PER_OZ,
        date: new Date().toISOString(),
        label: `Vault buy · ${g.toFixed(2)}g bar`,
      });
    },
    [pushTx]
  );

  const sellGold: Ctx['sellGold'] = useCallback(
    (g) => {
      pushTx({
        id: uid(),
        type: 'sell',
        grams: -g,
        usd: g * SPOT_PRICE_USD_PER_GRAM,
        pricePerOz: SPOT_PRICE_USD_PER_OZ,
        date: new Date().toISOString(),
        label: `Sold · ${g.toFixed(2)}g`,
      });
    },
    [pushTx]
  );

  const deposit: Ctx['deposit'] = useCallback(
    (amount) => {
      pushTx({
        id: uid(),
        type: 'deposit',
        grams: 0,
        usd: amount,
        date: new Date().toISOString(),
        label: 'Deposit · Card on file',
      });
    },
    [pushTx]
  );

  const requestDelivery: Ctx['requestDelivery'] = useCallback(
    ({ grams: g, product, address }) => {
      const id = uid();
      const trackingNumber = 'PHD-' + id.toUpperCase();
      const date = new Date().toISOString();
      setStore((s) => ({
        ...s,
        transactions: [
          {
            id: uid(),
            type: 'delivery',
            grams: -g,
            usd: -25,
            date,
            label: `Delivery requested · ${product}`,
          },
          ...s.transactions,
        ],
        deliveries: [
          {
            id,
            grams: g,
            product,
            address,
            status: 'requested',
            trackingNumber,
            date,
          },
          ...s.deliveries,
        ],
      }));
    },
    []
  );

  const createPlan: Ctx['createPlan'] = useCallback(
    ({ name, monthlyUsd, months }) => {
      const start = new Date().toISOString();
      const id = uid();
      setStore((s) => ({
        ...s,
        plans: [
          ...s.plans,
          {
            id,
            name,
            monthlyUsd,
            monthsTotal: months,
            monthsPaid: 0,
            startDate: start,
            nextChargeDate: start,
            status: 'active',
          },
        ],
      }));
    },
    []
  );

  const chargePlanNow: Ctx['chargePlanNow'] = useCallback((planId) => {
    setStore((s) => {
      const plan = s.plans.find((p) => p.id === planId);
      if (!plan || plan.status !== 'active') return s;
      if (plan.monthsPaid >= plan.monthsTotal) return s;
      const g = plan.monthlyUsd / SPOT_PRICE_USD_PER_GRAM;
      const updated: Plan = {
        ...plan,
        monthsPaid: plan.monthsPaid + 1,
        status: plan.monthsPaid + 1 >= plan.monthsTotal ? 'completed' : 'active',
      };
      updated.nextChargeDate = nextChargeAfter(updated);
      const tx: Transaction = {
        id: uid(),
        type: 'plan-buy',
        grams: g,
        usd: -plan.monthlyUsd,
        pricePerOz: SPOT_PRICE_USD_PER_OZ,
        date: new Date().toISOString(),
        label: `Auto-installment · ${plan.name}`,
      };
      return {
        ...s,
        plans: s.plans.map((p) => (p.id === planId ? updated : p)),
        transactions: [tx, ...s.transactions],
      };
    });
  }, []);

  const pausePlan: Ctx['pausePlan'] = useCallback((planId) => {
    setStore((s) => ({
      ...s,
      plans: s.plans.map((p) =>
        p.id === planId && p.status === 'active' ? { ...p, status: 'paused' } : p
      ),
    }));
  }, []);

  const resumePlan: Ctx['resumePlan'] = useCallback((planId) => {
    setStore((s) => ({
      ...s,
      plans: s.plans.map((p) =>
        p.id === planId && p.status === 'paused' ? { ...p, status: 'active' } : p
      ),
    }));
  }, []);

  const cancelPlan: Ctx['cancelPlan'] = useCallback((planId) => {
    setStore((s) => ({
      ...s,
      plans: s.plans.map((p) =>
        p.id === planId && p.status !== 'completed'
          ? { ...p, status: 'cancelled' }
          : p
      ),
    }));
  }, []);

  const updateUser: Ctx['updateUser'] = useCallback((user) => {
    setStore((s) => ({ ...s, user: { ...s.user, ...user } }));
  }, []);

  const resetDemo: Ctx['resetDemo'] = useCallback(() => {
    const fresh = seedStore();
    try {
      const sessRaw = sessionStorage.getItem('placeholder_user');
      if (sessRaw) fresh.user = JSON.parse(sessRaw);
    } catch {}
    setStore(fresh);
  }, []);

  const value: Ctx = {
    store,
    ready,
    usd,
    grams,
    spotOz: SPOT_PRICE_USD_PER_OZ,
    spotGram: SPOT_PRICE_USD_PER_GRAM,
    openModal,
    modalContext,
    setModal,
    buyGold,
    sellGold,
    deposit,
    requestDelivery,
    createPlan,
    chargePlanNow,
    pausePlan,
    resumePlan,
    cancelPlan,
    updateUser,
    resetDemo,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export { GRAMS_PER_OZ };
