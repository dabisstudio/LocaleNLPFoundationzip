'use client';

import { useState } from 'react';
import { ExternalLink } from 'lucide-react';

const MONTHLY_TIERS = [
  {
    amount: 10,
    name: 'The Voice Tier',
    copy: 'Funds 1 hour of secure transcription work, preserving endangered dialects block by block.',
  },
  {
    amount: 25,
    name: 'The Equipment Tier',
    copy: 'Deploys field-ready audio gear to 1 local contributor, turning their community into a data sovereign.',
  },
  {
    amount: 50,
    name: 'The Compute Tier',
    copy: 'Powers 1 full week of ethical model training on our open server architecture.',
  },
  {
    amount: 100,
    name: 'The Hub Tier',
    copy: 'Sponsors an entire community data collection session, directly employing local linguists.',
  },
];

export function MonthlyGiving() {
  const [selected, setSelected] = useState<number>(50);

  return (
    <div>
      <div className="space-y-3 mb-8">
        {MONTHLY_TIERS.map((tier) => {
          const isActive = selected === tier.amount;
          return (
            <button
              key={tier.amount}
              type="button"
              onClick={() => setSelected(tier.amount)}
              aria-pressed={isActive}
              className={[
                'w-full text-left p-4 rounded-xl border transition-all duration-200 ease-apple-ease cursor-pointer',
                isActive
                  ? 'border-accent-ochre/40 bg-accent-ochre/5 ring-1 ring-accent-ochre/40 scale-[1.01]'
                  : 'border-ink-monument/10 bg-base-stone hover:border-accent-ochre/20 hover:bg-accent-ochre/3',
              ].join(' ')}
            >
              <div className="flex items-start gap-4">
                <div
                  className={[
                    'mt-0.5 w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors duration-200',
                    isActive ? 'border-accent-ochre' : 'border-text-tertiary',
                  ].join(' ')}
                >
                  {isActive && (
                    <span className="w-2.5 h-2.5 rounded-full bg-accent-ochre block" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-mono text-base font-bold text-accent-ochre">
                      ${tier.amount}/mo
                    </span>
                    {isActive && (
                      <span className="px-2 py-0.5 rounded-full bg-accent-ochre/15 text-accent-ochre font-mono text-xs font-semibold">
                        {tier.name}
                      </span>
                    )}
                  </div>
                  <p
                    className={[
                      'text-sm leading-relaxed transition-colors duration-200',
                      isActive ? 'text-text-secondary' : 'text-text-tertiary',
                    ].join(' ')}
                  >
                    {tier.copy}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <a
        href="https://donate.localenlp.org/monthly"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent-ochre text-brand-deep font-medium text-sm hover:bg-accent-ochre/90 transition-colors duration-200"
      >
        Start ${selected}/mo — {MONTHLY_TIERS.find((t) => t.amount === selected)?.name}
        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
      </a>

      <p className="font-mono text-xs text-text-tertiary mt-3">
        🔒 256-bit encrypted via Stripe · 501(c)(3) verified · No account required
      </p>
    </div>
  );
}
