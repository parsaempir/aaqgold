export default function InstallmentBlurb() {
  return (
    <section
      id="installment"
      className="mx-auto mt-16 max-w-3xl px-4 text-center md:mt-24 md:px-8"
    >
      <div className="glass rounded-2xl p-6 md:p-8">
        <span className="text-[11px] uppercase tracking-[0.3em] text-gold-400">
          Installment
        </span>
        <p className="mt-3 text-base text-neutral-200 md:text-lg">
          Pay over <span className="text-white">3, 6, or 12 months</span> at{' '}
          <span className="text-white">0% interest</span>. Price locked at
          purchase, vault-stored until your final payment.
        </p>
        <a
          href="#"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-gold-300 transition-colors hover:text-gold-200"
        >
          See full plan details
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </section>
  );
}
