'use client';

import { InputHTMLAttributes, ReactNode, useId, useState } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: ReactNode;
  trailing?: ReactNode;
};

export default function Field({
  label,
  hint,
  trailing,
  type = 'text',
  className = '',
  ...rest
}: Props) {
  const reactId = useId();
  const id = rest.id ?? reactId;
  const [focused, setFocused] = useState(false);

  return (
    <div className="w-full">
      <div className="mb-1.5 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <label
          htmlFor={id}
          className="text-[0.72rem] font-medium uppercase tracking-[0.14em] text-ink-mute sm:text-[0.78rem]"
        >
          {label}
        </label>
        {hint ? <div className="text-xs text-ink-mute">{hint}</div> : null}
      </div>

      <div
        className={`relative flex items-center rounded-2xl border bg-pearl/80 backdrop-blur transition-all duration-300 ${
          focused
            ? 'border-gold-300 shadow-[0_0_0_4px_rgba(241,206,108,0.18)]'
            : 'border-hairline hover:border-gold-200'
        }`}
      >
        <input
          id={id}
          type={type}
          onFocus={(e) => {
            setFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            rest.onBlur?.(e);
          }}
          className={`peer w-full min-w-0 bg-transparent px-3.5 py-3 text-base text-ink placeholder:text-ink-dim focus:outline-none sm:px-4 sm:py-3.5 sm:text-[0.98rem] ${className}`}
          {...rest}
        />
        {trailing ? <div className="shrink-0 pr-2">{trailing}</div> : null}
      </div>
    </div>
  );
}
