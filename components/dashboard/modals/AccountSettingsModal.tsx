'use client';

import { useEffect, useState } from 'react';
import Modal from '../Modal';
import { useDashboard } from '../DashboardProvider';
import { Success } from './BuyGoldModal';

export default function AccountSettingsModal() {
  const { openModal, setModal, store, updateUser } = useDashboard();
  const open = openModal === 'account';

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [twoFactor, setTwoFactor] = useState(false);
  const [marketAlerts, setMarketAlerts] = useState(true);
  const [transactionEmails, setTransactionEmails] = useState(true);
  const [monthlyStatements, setMonthlyStatements] = useState(true);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!open) return;
    const u = store.user;
    // Reset form fields when the modal opens so it reflects the latest stored values.
    /* eslint-disable react-hooks/set-state-in-effect */
    setFirstName(u.firstName ?? '');
    setLastName(u.lastName ?? '');
    setEmail(u.email ?? '');
    setPhone(u.phone ?? '');
    setTwoFactor(u.twoFactor ?? false);
    setMarketAlerts(u.notifications?.marketAlerts ?? true);
    setTransactionEmails(u.notifications?.transactionEmails ?? true);
    setMonthlyStatements(u.notifications?.monthlyStatements ?? true);
    setDone(false);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [open, store.user]);

  const close = () => setModal(null);

  const submit = () => {
    updateUser({
      firstName: firstName.trim() || undefined,
      lastName: lastName.trim() || undefined,
      email: email.trim() || undefined,
      phone: phone.trim() || undefined,
      twoFactor,
      notifications: {
        marketAlerts,
        transactionEmails,
        monthlyStatements,
      },
    });
    setDone(true);
    setTimeout(close, 900);
  };

  return (
    <Modal
      open={open}
      onClose={close}
      title="Account settings"
      subtitle="Manage your profile and notifications"
      size="lg"
    >
      {done ? (
        <Success line1="Saved" line2="Your settings have been updated." />
      ) : (
        <div className="flex flex-col gap-6">
          <Section title="Profile">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <TextField label="First name" value={firstName} onChange={setFirstName} placeholder="Ada" />
              <TextField label="Last name" value={lastName} onChange={setLastName} placeholder="Lovelace" />
            </div>
            <TextField label="Email" value={email} onChange={setEmail} placeholder="you@email.com" type="email" />
            <TextField label="Phone (optional)" value={phone} onChange={setPhone} placeholder="+1 555 010 1234" type="tel" />
          </Section>

          <Section title="Security">
            <Toggle
              checked={twoFactor}
              onChange={setTwoFactor}
              title="Two-factor authentication"
              desc="Require a code from your authenticator app on sign in."
            />
            <button
              type="button"
              className="self-start rounded-2xl border border-hairline bg-pearl/70 px-4 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:border-gold-300/55 hover:bg-gold-50 hover:text-ink"
              onClick={() =>
                alert('Password reset link sent to ' + (email || 'your email') + '.')
              }
            >
              Change password
            </button>
          </Section>

          <Section title="Notifications">
            <Toggle
              checked={marketAlerts}
              onChange={setMarketAlerts}
              title="Market alerts"
              desc="Get a ping when gold moves more than 1.5%."
            />
            <Toggle
              checked={transactionEmails}
              onChange={setTransactionEmails}
              title="Transaction receipts"
              desc="Email me after every buy, sell, or installment charge."
            />
            <Toggle
              checked={monthlyStatements}
              onChange={setMonthlyStatements}
              title="Monthly statement"
              desc="PDF summary of your vault, mailed on the 1st."
            />
          </Section>

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button onClick={close} className="btn-ghost justify-center sm:!py-2.5">
              Cancel
            </button>
            <button onClick={submit} className="btn-gold sm:!py-2.5">
              Save changes
              <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-ink-mute">
        {title}
      </div>
      {children}
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[0.78rem] font-medium text-ink-soft">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-hairline bg-pearl/80 px-4 py-3 text-[0.95rem] text-ink placeholder:text-ink-dim focus:border-gold-300 focus:outline-none focus:shadow-[0_0_0_4px_rgba(241,206,108,0.18)]"
      />
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  title,
  desc,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  title: string;
  desc: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex w-full items-start justify-between gap-4 rounded-2xl border border-hairline bg-pearl/60 p-4 text-left transition-colors hover:border-gold-300/55"
    >
      <div>
        <div className="text-[0.92rem] font-semibold text-ink">{title}</div>
        <div className="mt-0.5 text-[0.82rem] text-ink-mute">{desc}</div>
      </div>
      <span
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
          checked ? 'bg-gold-gradient' : 'bg-mist'
        }`}
        aria-hidden
      >
        <span
          className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform duration-300 ${
            checked ? 'translate-x-[1.4rem]' : 'translate-x-0.5'
          }`}
        />
      </span>
    </button>
  );
}
