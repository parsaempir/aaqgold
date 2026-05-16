'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import AuthShell from '@/components/auth/AuthShell';
import Field from '@/components/auth/Field';
import SocialRow from '@/components/auth/SocialRow';
import OTPInput from '@/components/auth/OTPInput';

const TEST_CODE = '2222';
const CODE_LENGTH = TEST_CODE.length;

export default function SignUpPage() {
  const router = useRouter();
  const [step, setStep] = useState<'details' | 'verify'>('details');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const onDetails = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setStep('verify');
    }, 550);
  };

  const onVerify = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (code.length < CODE_LENGTH) {
      setError(`Please enter the ${CODE_LENGTH}-digit code.`);
      return;
    }
    if (code !== TEST_CODE) {
      setError(`That code isn’t right. For this demo, the code is ${TEST_CODE}.`);
      return;
    }
    setSuccess(true);
    try {
      sessionStorage.setItem(
        'placeholder_user',
        JSON.stringify({ email, firstName, lastName, mode: 'signup' })
      );
    } catch {}
    setTimeout(() => router.push('/dashboard'), 600);
  };

  if (step === 'details') {
    return (
      <AuthShell
        eyebrow="Create your account"
        title={
          <>
            Start owning <span className="text-gold-shine">real gold.</span>
          </>
        }
        subtitle="Open a free vault account in under two minutes. No fees to join — pay only when you buy."
        footer={
          <span>
            Already have an account?{' '}
            <Link
              href="/signin"
              className="font-semibold text-ink underline decoration-gold-300 decoration-2 underline-offset-4 transition-colors hover:text-gold-600"
            >
              Sign in
            </Link>
            .
          </span>
        }
      >
        <form onSubmit={onDetails} className="flex flex-col gap-5">
          <SocialRow />

          <div className="flex items-center gap-3 py-1 text-[0.72rem] uppercase tracking-[0.22em] text-ink-mute">
            <span className="hairline-soft flex-1" />
            or
            <span className="hairline-soft flex-1" />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field
              label="First name"
              name="firstName"
              autoComplete="given-name"
              placeholder="Ada"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Field
              label="Last name"
              name="lastName"
              autoComplete="family-name"
              placeholder="Lovelace"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <Field
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@email.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Field
            label="Password"
            type={showPw ? 'text' : 'password'}
            name="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            required
            minLength={1}
            hint={<span className="text-ink-dim">8+ characters</span>}
            trailing={
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="rounded-full px-2 py-1 text-xs font-medium text-ink-mute transition-colors hover:text-ink"
                aria-label={showPw ? 'Hide password' : 'Show password'}
              >
                {showPw ? 'Hide' : 'Show'}
              </button>
            }
          />

          <label className="flex cursor-pointer select-none items-start gap-2.5 text-sm leading-relaxed text-ink-soft">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 rounded border-hairline accent-gold-500"
              required
            />
            <span>
              I agree to the{' '}
              <Link
                href="/"
                className="font-medium text-ink underline decoration-gold-300 underline-offset-4 hover:text-gold-700"
              >
                Terms
              </Link>{' '}
              and{' '}
              <Link
                href="/"
                className="font-medium text-ink underline decoration-gold-300 underline-offset-4 hover:text-gold-700"
              >
                Privacy Policy
              </Link>
              .
            </span>
          </label>

          <button
            type="submit"
            className="btn-gold mt-1 w-full"
            disabled={submitting}
          >
            {submitting ? 'Sending code…' : 'Create account'}
            <span aria-hidden>→</span>
          </button>
        </form>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      eyebrow="One last step"
      title={
        <>
          Verify your <span className="text-gold-shine">email</span>
        </>
      }
      subtitle={
        email
          ? `We sent a ${CODE_LENGTH}-digit code to ${email}. Enter it below to finish setting up your vault.`
          : `Enter the ${CODE_LENGTH}-digit code we just sent you.`
      }
      footer={
        <span>
          Wrong details?{' '}
          <button
            type="button"
            onClick={() => {
              setStep('details');
              setCode('');
              setError('');
            }}
            className="font-semibold text-ink underline decoration-gold-300 decoration-2 underline-offset-4 transition-colors hover:text-gold-600"
          >
            Go back
          </button>
          .
        </span>
      }
    >
      <form onSubmit={onVerify} className="flex flex-col gap-6">
        <div className="rounded-2xl border border-gold-200/70 bg-gold-50/60 px-4 py-3 text-[0.82rem] leading-relaxed text-gold-700">
          <span className="font-semibold">Demo mode:</span> use code{' '}
          <span className="font-display text-base font-extrabold tracking-wider text-ink">
            {TEST_CODE}
          </span>{' '}
          to continue.
        </div>

        <OTPInput
          value={code}
          onChange={(v) => {
            setCode(v);
            if (error) setError('');
          }}
          length={CODE_LENGTH}
          hasError={!!error}
        />

        {error ? (
          <div className="-mt-2 text-center text-sm font-medium text-red-500">
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          className="btn-gold w-full"
          disabled={submitting || success}
        >
          {success
            ? 'Vault ready…'
            : submitting
              ? 'Verifying…'
              : 'Verify and open vault'}
          <span aria-hidden>{success ? '✓' : '→'}</span>
        </button>

        <div className="text-center text-sm text-ink-mute">
          Didn&apos;t get it?{' '}
          <button
            type="button"
            onClick={() => {
              setCode('');
              setError('');
            }}
            className="font-medium text-gold-600 transition-colors hover:text-gold-700"
          >
            Resend code
          </button>
        </div>
      </form>
    </AuthShell>
  );
}
