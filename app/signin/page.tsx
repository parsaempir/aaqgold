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

export default function SignInPage() {
  const router = useRouter();
  const [step, setStep] = useState<'credentials' | 'verify'>('credentials');
  const [email, setEmail] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const onCredentials = (e: FormEvent<HTMLFormElement>) => {
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
        JSON.stringify({ email, mode: 'signin' })
      );
    } catch {}
    setTimeout(() => router.push('/dashboard'), 600);
  };

  if (step === 'credentials') {
    return (
      <AuthShell
        eyebrow="Welcome back"
        title={
          <>
            Sign in to <span className="text-gold-shine">Placeholder</span>
          </>
        }
        subtitle="Access your gold portfolio, manage installments, and track live vault holdings."
        footer={
          <span>
            Don&apos;t have an account?{' '}
            <Link
              href="/signup"
              className="font-semibold text-ink underline decoration-gold-300 decoration-2 underline-offset-4 transition-colors hover:text-gold-600"
            >
              Click here to sign up
            </Link>
            .
          </span>
        }
      >
        <form onSubmit={onCredentials} className="flex flex-col gap-5">
          <SocialRow />

          <div className="flex items-center gap-3 py-1 text-[0.72rem] uppercase tracking-[0.22em] text-ink-mute">
            <span className="hairline-soft flex-1" />
            or
            <span className="hairline-soft flex-1" />
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
            autoComplete="current-password"
            placeholder="Enter your password"
            required
            minLength={1}
            hint={
              <Link
                href="/"
                className="font-medium text-gold-600 transition-colors hover:text-gold-700"
              >
                Forgot password?
              </Link>
            }
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

          <label className="flex cursor-pointer select-none items-center gap-2.5 text-sm text-ink-soft">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-hairline accent-gold-500"
              defaultChecked
            />
            Keep me signed in
          </label>

          <button
            type="submit"
            className="btn-gold mt-1 w-full"
            disabled={submitting}
          >
            {submitting ? 'Sending code…' : 'Continue'}
            <span aria-hidden>→</span>
          </button>
        </form>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      eyebrow="Verification"
      title={
        <>
          Enter the <span className="text-gold-shine">code</span> we sent
        </>
      }
      subtitle={
        email
          ? `We sent a ${CODE_LENGTH}-digit code to ${email}. It may take a moment to arrive.`
          : `Enter the ${CODE_LENGTH}-digit code we just sent you.`
      }
      footer={
        <span>
          Wrong email?{' '}
          <button
            type="button"
            onClick={() => {
              setStep('credentials');
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
            ? 'Welcome back…'
            : submitting
              ? 'Verifying…'
              : 'Verify and continue'}
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
