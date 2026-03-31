'use client';

import { useState, useEffect, useRef } from 'react';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { useTranslation } from '@/lib/i18n/TranslationContext';

type LedgerStat = {
  valueKey: string;
  labelKey: string;
  subKey: string;
  color: string;
  spotlightColor: string;
};

const STATS: LedgerStat[] = [
  {
    valueKey: 'pact.ledger.stat1.value',
    labelKey: 'pact.ledger.stat1.label',
    subKey: 'pact.ledger.stat1.sub',
    color: '#00E5FF',
    spotlightColor: 'rgba(0,229,255,0.1)',
  },
  {
    valueKey: 'pact.ledger.stat2.value',
    labelKey: 'pact.ledger.stat2.label',
    subKey: 'pact.ledger.stat2.sub',
    color: '#F5A623',
    spotlightColor: 'rgba(245,166,35,0.1)',
  },
  {
    valueKey: 'pact.ledger.stat3.value',
    labelKey: 'pact.ledger.stat3.label',
    subKey: 'pact.ledger.stat3.sub',
    color: '#4ADE80',
    spotlightColor: 'rgba(74,222,128,0.1)',
  },
];

function AnimatedValue({ value }: { value: string }) {
  const [displayed, setDisplayed] = useState('0');
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    const numStr = value.replace(/[^0-9]/g, '');
    const prefix = value.match(/^[^0-9]*/)?.[0] ?? '';
    const suffix = value.match(/[^0-9]*$/)?.[0] ?? '';
    const target = parseInt(numStr, 10);
    if (isNaN(target)) { setDisplayed(value); return; }

    const duration = 1800;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setDisplayed(`${prefix}${current.toLocaleString()}${suffix}`);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value]);

  return <>{displayed}</>;
}

export function ContributorLedger() {
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);

  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-6">
        {STATS.map((stat) => (
          <SpotlightCard
            key={stat.labelKey}
            spotlightColor={stat.spotlightColor}
            className="p-6"
          >
            <div
              className="w-8 h-1 rounded-full mb-5"
              style={{ backgroundColor: stat.color }}
              aria-hidden="true"
            />
            <p
              className="font-display text-4xl font-bold mb-1 leading-none tabular-nums"
              style={{ color: stat.color }}
              aria-label={t(stat.labelKey)}
            >
              {isMounted ? <AnimatedValue value={t(stat.valueKey)} /> : t(stat.valueKey)}
            </p>
            <p className="text-white text-sm font-semibold mt-2 mb-1">
              {t(stat.labelKey)}
            </p>
            <p className="text-text-tertiary text-xs leading-snug">
              {t(stat.subKey)}
            </p>
          </SpotlightCard>
        ))}
      </div>

      <div
        className="mt-6 rounded-xl border p-4 flex flex-col sm:flex-row items-center gap-4"
        style={{ borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.02)' }}
      >
        <div
          className="w-2 h-2 rounded-full shrink-0 animate-pulse"
          style={{ backgroundColor: '#4ADE80' }}
          aria-hidden="true"
        />
        <p className="text-text-secondary text-xs leading-relaxed">
          {t('pact.ledger.note', 'Ledger updated quarterly. All revenue routing is verified by third-party audit under the Locale Data Pact v1.0, Article IV.')}
        </p>
      </div>
    </div>
  );
}
