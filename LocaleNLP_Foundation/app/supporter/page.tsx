'use client';

import { useState, useEffect, useRef } from 'react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { PageHeader } from '@/components/ui/page-header';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { GlowButton } from '@/components/ui/glow-button';
import { MonoLabel } from '@/components/ui/mono-label';
import { Download, Mic, Server, GraduationCap, MapPin } from 'lucide-react';

const TIERS = [
  { label: '$50/mo',    amount: 50  },
  { label: '$100/mo',   amount: 100 },
  { label: '$500/mo',   amount: 500 },
  { label: '$1,000/mo', amount: 1000 },
];

const ALLOCATION = [
  { label: 'Annotators in Senegal', pct: 0.45, icon: Mic,           color: 'text-accent-ochre', spotlight: 'rgba(245,166,35,0.1)' },
  { label: 'Server Compute',        pct: 0.30, icon: Server,         color: 'text-accent-cyan',  spotlight: 'rgba(0,229,255,0.08)' },
  { label: 'Fellowship Program',    pct: 0.25, icon: GraduationCap,  color: 'text-accent-clay',  spotlight: 'rgba(224,122,95,0.1)' },
];

const FIELD_NOTES = [
  {
    country: 'Senegal',
    dialect: 'Pulaar (Futa Toro)',
    date: 'Mar 2026',
    update: 'Our annotation team in Dakar finished validating 2,800 speech clips this week — the highest weekly throughput yet. Contributors are requesting expanded vocabulary domains covering agriculture and health.',
    accentColor: '#F5A623',
  },
  {
    country: 'Ethiopia',
    dialect: 'Amharic (Addis)',
    date: 'Feb 2026',
    update: 'A new cohort of 14 linguists joined the fellowship after completing their university exams. Corpus annotation for the Ge\'ez script extension is now 78% complete ahead of the Q2 deadline.',
    accentColor: '#00E5FF',
  },
  {
    country: 'Mali',
    dialect: 'Bambara (Bamako)',
    date: 'Jan 2026',
    update: 'Infrastructure upgrades funded last quarter enabled real-time ASR testing at 16 kHz for the first time. Model word-error rate dropped from 34% to 19% in eight weeks of fine-tuning.',
    accentColor: '#E07A5F',
  },
];

const TAX_ROWS = [
  { year: 2025, status: 'Verified' },
  { year: 2024, status: 'Verified' },
  { year: 2023, status: 'Verified' },
  { year: 2022, status: 'Archived' },
];

function useAnimatedCounter(target: number, duration = 900) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);
  const prevTarget = useRef(target);

  useEffect(() => {
    const start = prevTarget.current === target ? 0 : value;
    const startTime = performance.now();
    const from = start;
    const to = target;

    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(from + (to - from) * eased));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    rafRef.current = requestAnimationFrame(step);
    prevTarget.current = target;

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return value;
}

export default function SupporterPage() {
  const [tierIdx, setTierIdx] = useState(1);
  const [period, setPeriod] = useState<'month' | 'ytd'>('month');

  const tier = TIERS[tierIdx];
  const hoursPerMonth = tier.amount / 10;
  const hoursYTD = hoursPerMonth * 6;
  const displayHours = period === 'month' ? hoursPerMonth : hoursYTD;

  const animatedHours = useAnimatedCounter(displayHours);

  return (
    <>
      <Navigation />
      <main id="main-content" className="pt-24 pb-32">

        <PageHeader
          label="IMPACT PORTFOLIO"
          number="00"
          title="Your Investment,"
          titleGradient="Measured to the Hour"
          subtitle="Every dollar you commit is tracked, allocated, and reported in real time."
          accentColor="cyan"
        />

        <section className="py-16 bg-brand-surface">
          <div className="container-wide section-padding">

            <div className="max-w-2xl mx-auto mb-14">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary text-center mb-3">
                Select Your Giving Tier
              </p>
              <div className="flex rounded-xl overflow-hidden border border-white/10 bg-brand-deep">
                {TIERS.map((t, i) => (
                  <button
                    key={t.amount}
                    type="button"
                    onClick={() => setTierIdx(i)}
                    className={[
                      'flex-1 py-3 text-sm font-semibold font-mono transition-all duration-200',
                      tierIdx === i
                        ? 'bg-accent-cyan/15 text-accent-cyan'
                        : 'text-text-tertiary hover:text-text-secondary',
                    ].join(' ')}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-card p-10 md:p-14 text-center max-w-2xl mx-auto mb-12">
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="flex rounded-lg overflow-hidden border border-white/10 bg-brand-elevated">
                  {(['month', 'ytd'] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPeriod(p)}
                      className={[
                        'px-4 py-1.5 text-xs font-medium font-mono transition-all duration-200',
                        period === p ? 'bg-white/10 text-text-primary' : 'text-text-tertiary hover:text-text-secondary',
                      ].join(' ')}
                    >
                      {p === 'month' ? 'This Month' : 'Year to Date'}
                    </button>
                  ))}
                </div>
              </div>

              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary mb-3">
                Validated Speech Hours Funded
              </p>

              <div
                className="font-display font-bold text-text-primary leading-none mb-2"
                style={{ fontSize: 'clamp(3.5rem, 10vw, 6rem)' }}
                aria-live="polite"
                aria-atomic="true"
              >
                {animatedHours.toLocaleString()}
              </div>

              <p className="font-mono text-sm text-text-tertiary">
                hrs / {period === 'month' ? 'month' : 'year to date (×6)'}
              </p>

              <p className="mt-4 text-text-tertiary text-xs font-mono">
                at ${tier.amount}/mo · $10 = 1 validated hour
              </p>
            </div>

            <div className="mb-14">
              <div className="text-center mb-10">
                <MonoLabel label="ALLOCATION LEDGER" number="01" className="mb-3" />
                <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary">
                  Where Your Money Goes
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {ALLOCATION.map(({ label, pct, icon: Icon, color, spotlight }) => {
                  const dollars = Math.round(tier.amount * pct);
                  return (
                    <SpotlightCard key={label} spotlightColor={spotlight} className="p-6 text-center">
                      <div className={`w-10 h-10 rounded-xl mx-auto mb-4 flex items-center justify-center bg-white/5`}>
                        <Icon className={`w-5 h-5 ${color}`} aria-hidden="true" />
                      </div>
                      <div className={`font-display text-3xl font-bold ${color} mb-1`}>
                        ${dollars.toLocaleString()}
                      </div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-tertiary mb-2">
                        {Math.round(pct * 100)}%
                      </div>
                      <p className="text-text-secondary text-sm font-medium">{label}</p>
                    </SpotlightCard>
                  );
                })}
              </div>
            </div>

            <div className="mb-14 max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <MonoLabel label="FIELD NOTES FEED" number="02" className="mb-3" />
                <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary">
                  From the Ground
                </h2>
              </div>

              <div className="space-y-4">
                {FIELD_NOTES.map((note) => (
                  <div
                    key={note.dialect}
                    className="glass-card p-6 flex gap-5"
                    style={{ borderLeft: `3px solid ${note.accentColor}40` }}
                  >
                    <div className="shrink-0 pt-0.5">
                      <MapPin className="w-4 h-4" style={{ color: note.accentColor }} aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span
                          className="font-mono text-[10px] px-2 py-0.5 rounded uppercase tracking-[0.12em]"
                          style={{ color: note.accentColor, backgroundColor: `${note.accentColor}18` }}
                        >
                          {note.country}
                        </span>
                        <span className="font-mono text-[10px] text-text-tertiary">{note.dialect}</span>
                        <span className="font-mono text-[10px] text-text-tertiary ml-auto">{note.date}</span>
                      </div>
                      <p className="text-text-secondary text-sm leading-relaxed">{note.update}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <MonoLabel label="TAX & COMPLIANCE" number="03" className="mb-3" />
                <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary">
                  501(c)(3) Statements
                </h2>
              </div>

              <div className="glass-card overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/8 bg-brand-elevated">
                      <th scope="col" className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary text-left px-6 py-3">
                        Year
                      </th>
                      <th scope="col" className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary text-left px-4 py-3 hidden sm:table-cell">
                        Amount
                      </th>
                      <th scope="col" className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary text-left px-4 py-3">
                        501(c)(3) Statement
                      </th>
                      <th scope="col" className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary text-left px-4 py-3 hidden md:table-cell">
                        Status
                      </th>
                      <th scope="col" className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary text-right px-6 py-3">
                        Download
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {TAX_ROWS.map((row, i) => {
                      const yearAmount = tier.amount * 12 * (2026 - row.year);
                      return (
                        <tr
                          key={row.year}
                          className={[
                            'transition-colors hover:bg-white/3',
                            i < TAX_ROWS.length - 1 ? 'border-b border-white/6' : '',
                          ].join(' ')}
                        >
                          <td className="px-6 py-4 font-mono text-sm text-text-primary font-semibold">
                            {row.year}
                          </td>
                          <td className="px-4 py-4 font-mono text-sm text-text-secondary hidden sm:table-cell">
                            ${yearAmount.toLocaleString()}
                          </td>
                          <td className="px-4 py-4 text-sm text-text-secondary">
                            IRS Form 990-N · {row.year} Filing
                          </td>
                          <td className="px-4 py-4 hidden md:table-cell">
                            <span className={[
                              'inline-flex items-center gap-1.5 font-mono text-[10px] px-2 py-1 rounded uppercase tracking-[0.1em]',
                              row.status === 'Verified'
                                ? 'bg-accent-cyan/10 text-accent-cyan'
                                : 'bg-white/5 text-text-tertiary',
                            ].join(' ')}>
                              {row.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <a
                              href="#"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-text-secondary hover:border-accent-cyan/30 hover:text-accent-cyan transition-all duration-200 text-xs font-medium font-mono"
                              aria-label={`Download ${row.year} 501c3 statement`}
                            >
                              <Download className="w-3.5 h-3.5" aria-hidden="true" />
                              PDF
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </section>
      </main>

      <div className="fixed bottom-0 inset-x-0 z-50 border-t border-white/10 bg-brand-deep/95 backdrop-blur-md">
        <div className="container-wide section-padding py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-text-secondary text-center sm:text-left">
              <span className="font-semibold text-text-primary">This is a preview</span> of the Sustaining Supporter experience.
              Activate your dashboard by making a recurring donation.
            </p>
            <GlowButton href="/donate" variant="primary" showArrow={false} className="shrink-0 py-2 px-5 text-xs">
              Start Giving
            </GlowButton>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
