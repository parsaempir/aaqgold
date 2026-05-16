'use client';

import {
  ChangeEvent,
  ClipboardEvent,
  KeyboardEvent,
  useEffect,
  useRef,
} from 'react';

type Props = {
  value: string;
  onChange: (v: string) => void;
  length?: number;
  hasError?: boolean;
  autoFocus?: boolean;
};

export default function OTPInput({
  value,
  onChange,
  length = 4,
  hasError = false,
  autoFocus = true,
}: Props) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const digits = Array.from({ length }, (_, i) => value[i] ?? '');

  useEffect(() => {
    if (autoFocus) inputsRef.current[0]?.focus();
  }, [autoFocus]);

  const focusAt = (i: number) => {
    const el = inputsRef.current[i];
    if (el) {
      el.focus();
      el.select();
    }
  };

  const writeFrom = (start: number, chars: string) => {
    const next = digits.slice();
    let pos = start;
    for (const c of chars) {
      if (pos >= length) break;
      next[pos++] = c;
    }
    onChange(next.join('').slice(0, length));
    focusAt(Math.min(pos, length - 1));
  };

  const onInput = (i: number, e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    if (!raw) {
      const next = digits.slice();
      next[i] = '';
      onChange(next.join(''));
      return;
    }
    writeFrom(i, raw);
  };

  const onKeyDown = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!digits[i] && i > 0) {
        e.preventDefault();
        const next = digits.slice();
        next[i - 1] = '';
        onChange(next.join(''));
        focusAt(i - 1);
      }
    } else if (e.key === 'ArrowLeft' && i > 0) {
      e.preventDefault();
      focusAt(i - 1);
    } else if (e.key === 'ArrowRight' && i < length - 1) {
      e.preventDefault();
      focusAt(i + 1);
    }
  };

  const onPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '');
    if (!text) return;
    e.preventDefault();
    writeFrom(0, text);
  };

  return (
    <div
      className="flex items-center justify-center gap-2.5 sm:gap-3"
      onPaste={onPaste}
    >
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          value={d}
          onChange={(e) => onInput(i, e)}
          onKeyDown={(e) => onKeyDown(i, e)}
          onFocus={(e) => e.target.select()}
          className={`font-display h-14 w-12 rounded-2xl border bg-pearl/80 text-center text-2xl font-extrabold text-ink backdrop-blur transition-all duration-300 focus:outline-none sm:h-16 sm:w-14 sm:text-3xl ${
            hasError
              ? 'border-red-400/80 shadow-[0_0_0_4px_rgba(239,68,68,0.15)]'
              : d
                ? 'border-gold-300 shadow-[0_0_0_4px_rgba(241,206,108,0.18)]'
                : 'border-hairline focus:border-gold-300 focus:shadow-[0_0_0_4px_rgba(241,206,108,0.18)]'
          }`}
        />
      ))}
    </div>
  );
}
