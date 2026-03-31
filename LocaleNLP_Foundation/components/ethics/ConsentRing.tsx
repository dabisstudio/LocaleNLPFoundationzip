'use client';

import { useEffect, useRef, useState } from 'react';

export function ConsentRing() {
  const [pct, setPct] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          let start: number | null = null;
          const duration = 1400;

          const step = (ts: number) => {
            if (start === null) start = ts;
            const elapsed = ts - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setPct(Math.round(eased * 100));
            if (progress < 1) requestAnimationFrame(step);
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div ref={ref} className="flex flex-col sm:flex-row items-center gap-6">
      <div className="relative shrink-0" aria-hidden="true">
        <svg width="136" height="136" viewBox="0 0 136 136">
          <circle
            cx="68" cy="68" r={radius}
            fill="none"
            stroke="rgba(0,229,255,0.1)"
            strokeWidth="8"
          />
          <circle
            cx="68" cy="68" r={radius}
            fill="none"
            stroke="#00E5FF"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 68 68)"
            style={{ transition: 'stroke-dashoffset 0.05s linear', filter: 'drop-shadow(0 0 6px rgba(0,229,255,0.5))' }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-mono text-3xl font-bold text-accent-cyan">
          {pct}%
        </span>
      </div>

      <div>
        <p className="font-display text-xl font-semibold text-text-primary mb-2">
          100% Opt-In Consent
        </p>
        <p className="text-text-secondary text-sm leading-relaxed">
          Every voice on Lughatna is explicitly consented, heavily anonymized, and revocable
          by the user at any time. Consent is embedded at the API level — not bolted on.
        </p>
      </div>
    </div>
  );
}
