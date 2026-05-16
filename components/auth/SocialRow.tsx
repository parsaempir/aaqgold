'use client';

const buttonCls =
  'inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border border-ink/10 bg-pearl/75 px-3 py-2.5 text-[0.82rem] font-semibold tracking-[-0.01em] text-ink backdrop-blur transition-all duration-300 hover:-translate-y-px hover:border-gold-300/55 hover:bg-gold-50/70 sm:px-4 sm:py-3 sm:text-[0.88rem]';

export default function SocialRow() {
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
      <button type="button" className={buttonCls} aria-label="Continue with Google">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          aria-hidden
          className="shrink-0"
        >
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        <span className="sm:hidden">Google</span>
        <span className="hidden sm:inline">Continue with Google</span>
      </button>

      <button type="button" className={buttonCls} aria-label="Continue with Apple">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
          className="shrink-0"
        >
          <path d="M16.365 1.43c0 1.14-.42 2.2-1.12 3.02-.86.99-2.27 1.76-3.42 1.66-.13-1.1.43-2.27 1.16-3.07.84-.93 2.27-1.62 3.38-1.61zM20.5 17.06c-.6 1.39-.89 2.01-1.66 3.24-1.07 1.71-2.59 3.84-4.47 3.86-1.67.02-2.1-1.09-4.37-1.07-2.27.02-2.74 1.09-4.41 1.07-1.88-.02-3.32-1.94-4.39-3.65-3-4.78-3.32-10.39-1.47-13.37 1.31-2.11 3.39-3.35 5.34-3.35 1.99 0 3.24 1.09 4.89 1.09 1.6 0 2.58-1.09 4.88-1.09 1.74 0 3.58.95 4.9 2.59-4.3 2.36-3.6 8.5.76 10.68z" />
        </svg>
        <span className="sm:hidden">Apple</span>
        <span className="hidden sm:inline">Continue with Apple</span>
      </button>
    </div>
  );
}
