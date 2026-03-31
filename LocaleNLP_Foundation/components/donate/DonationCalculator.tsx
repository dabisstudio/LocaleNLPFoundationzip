'use client';

import { useState } from 'react';

const ALLOCATIONS = [
  { label: 'Research & Development', percent: 45, color: 'bg-accent-ochre' },
  { label: 'Community Programs', percent: 30, color: 'bg-accent-clay' },
  { label: 'Operations', percent: 15, color: 'bg-accent-cyan' },
  { label: 'Policy Advocacy', percent: 10, color: 'bg-text-tertiary' },
];

function getImpact(amount: number): { tier: string; copy: string } {
  if (amount < 25) {
    const hours = Math.floor(amount / 10);
    return {
      tier: 'The Voice Tier',
      copy: `Funds ${hours} hour${hours !== 1 ? 's' : ''} of secure transcription work, preserving endangered dialects block by block.`,
    };
  }
  if (amount < 50) {
    const contributors = Math.floor(amount / 25);
    return {
      tier: 'The Equipment Tier',
      copy: `Deploys field-ready audio gear to ${contributors} local contributor${contributors !== 1 ? 's' : ''}, turning their community into a data sovereign.`,
    };
  }
  if (amount < 100) {
    const weeks = Math.floor(amount / 50);
    return {
      tier: 'The Compute Tier',
      copy: `Powers ${weeks} full week${weeks !== 1 ? 's' : ''} of ethical model training on our open server architecture.`,
    };
  }
  const sessions = Math.floor(amount / 100);
  return {
    tier: 'The Hub Tier',
    copy: `Sponsors ${sessions} full community data collection session${sessions !== 1 ? 's' : ''}, directly employing local linguists.`,
  };
}

export function DonationCalculator() {
  const [amount, setAmount] = useState(50);
  const impact = getImpact(amount);

  return (
    <section className="py-20 bg-base-stone">
      <div className="container-wide section-padding">
        <div className="text-center mb-12">
          <span className="font-mono text-xs tracking-[0.18em] text-text-tertiary uppercase">
            RADICAL TRANSPARENCY
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mt-3 mb-4">
            See Exactly Where Your Money Goes
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Move the slider. Watch your specific contribution translate into infrastructure, people,
            and data — to the cent.
          </p>
        </div>

        <div className="max-w-3xl mx-auto glass-card p-8 md:p-10">
          <div className="mb-10">
            <div className="flex items-end justify-between mb-4">
              <span className="text-text-tertiary text-sm font-mono">Monthly amount</span>
              <span className="font-mono text-4xl font-bold text-accent-ochre">
                ${amount}
                <span className="text-text-tertiary text-base font-normal">/mo</span>
              </span>
            </div>

            <div className="relative">
              <input
                type="range"
                min={10}
                max={500}
                step={5}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                aria-label="Monthly donation amount"
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #F5A623 0%, #F5A623 ${((amount - 10) / 490) * 100}%, #12121A ${((amount - 10) / 490) * 100}%, #12121A 100%)`,
                }}
              />
              <div className="flex justify-between mt-2">
                <span className="font-mono text-xs text-text-tertiary">$10</span>
                <span className="font-mono text-xs text-text-tertiary">$500</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl bg-base-stone border border-ink-monument/10 p-6">
              <p className="font-mono text-xs tracking-[0.14em] text-accent-ochre uppercase mb-3">
                Your Impact
              </p>
              <p className="font-display text-sm font-semibold text-text-secondary mb-1">
                {impact.tier}
              </p>
              <p className="text-text-secondary text-sm leading-relaxed">{impact.copy}</p>
            </div>

            <div className="rounded-xl bg-base-stone border border-ink-monument/10 p-6">
              <p className="font-mono text-xs tracking-[0.14em] text-accent-ochre uppercase mb-4">
                Where ${amount} Goes
              </p>
              <div className="space-y-3">
                {ALLOCATIONS.map((alloc) => {
                  const dollars = ((alloc.percent / 100) * amount).toFixed(2);
                  return (
                    <div key={alloc.label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-text-secondary text-xs">{alloc.label}</span>
                        <span className="font-mono text-xs font-bold text-text-primary">
                          ${dollars}
                        </span>
                      </div>
                      <div className="h-1 bg-base-stone rounded-full overflow-hidden">
                        <div
                          className={`h-full ${alloc.color} rounded-full transition-all duration-300 ease-apple-ease`}
                          style={{ width: `${alloc.percent}%` }}
                          role="progressbar"
                          aria-valuenow={alloc.percent}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`${alloc.label}: $${dollars}`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-ink-monument/10 text-center">
            <p className="font-mono text-xs text-text-tertiary">
              🔒 256-bit encrypted via Stripe · 501(c)(3) verified · No account required
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
