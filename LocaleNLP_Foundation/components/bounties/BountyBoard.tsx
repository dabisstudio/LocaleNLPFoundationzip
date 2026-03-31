'use client';

import { useState, useTransition } from 'react';
import { cn } from '@/lib/utils';
import { BountyCard } from './BountyCard';
import type { LanguageBounty } from '@/lib/supabase';
import { useTranslation } from '@/lib/i18n/TranslationContext';

type FilterKey = 'all' | 'critical' | 'funding' | 'active' | 'fulfilled';

const FILTER_KEYS: FilterKey[] = ['all', 'critical', 'funding', 'active', 'fulfilled'];

function applyFilter(bounties: LanguageBounty[], filter: FilterKey): LanguageBounty[] {
  switch (filter) {
    case 'critical':  return bounties.filter((b) => b.urgency_level === 'critical');
    case 'funding':   return bounties.filter((b) => b.bounty_status === 'funding');
    case 'active':    return bounties.filter((b) => b.bounty_status === 'active_collection');
    case 'fulfilled': return bounties.filter((b) => b.bounty_status === 'fulfilled');
    default:          return bounties;
  }
}

function filterCount(bounties: LanguageBounty[], filter: FilterKey): number {
  return applyFilter(bounties, filter).length;
}

export function BountyBoard({ bounties }: { bounties: LanguageBounty[] }) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [fading, setFading] = useState(false);
  const [, startTransition] = useTransition();
  const { t } = useTranslation();

  const FILTER_LABELS: Record<FilterKey, string> = {
    all:       t('bounty.filter_all', 'All'),
    critical:  t('bounty.filter_critical', 'Critical'),
    funding:   t('bounty.filter_funding', 'Funding'),
    active:    t('bounty.filter_active', 'Active Collection'),
    fulfilled: t('bounty.filter_fulfilled', 'Fulfilled'),
  };

  function switchFilter(next: FilterKey) {
    if (next === activeFilter) return;
    setFading(true);
    setTimeout(() => {
      startTransition(() => setActiveFilter(next));
      setFading(false);
    }, 150);
  }

  const filtered = applyFilter(bounties, activeFilter);

  return (
    <section className="container-wide section-padding py-16">
      <div
        className="flex flex-wrap gap-2 mb-10"
        role="tablist"
        aria-label={t('bounty.filter_aria', 'Filter bounties')}
      >
        {FILTER_KEYS.map((f) => {
          const count = filterCount(bounties, f);
          const isActive = activeFilter === f;
          return (
            <button
              key={f}
              role="tab"
              aria-selected={isActive}
              onClick={() => switchFilter(f)}
              className={cn(
                'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium',
                'border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ochre/60',
                isActive
                  ? 'border-accent-ochre/60 bg-accent-ochre/15 text-accent-ochre'
                  : 'border-white/10 bg-white/4 text-text-secondary hover:border-white/20 hover:text-white',
              )}
            >
              {FILTER_LABELS[f]}
              <span className={cn(
                'text-[11px] font-mono rounded-full px-1.5 py-0.5',
                isActive ? 'bg-accent-ochre/20 text-accent-ochre' : 'bg-white/8 text-text-tertiary',
              )}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div
        className={cn(
          'transition-opacity duration-150',
          fading ? 'opacity-0' : 'opacity-100',
        )}
        aria-live="polite"
        aria-atomic="true"
      >
        {filtered.length === 0 ? (
          <div className="py-24 text-center text-text-secondary">
            <p className="text-lg font-medium mb-2">{t('bounty.no_match', 'No bounties match this filter.')}</p>
            <p className="text-sm">{t('bounty.no_match_hint', 'Try selecting a different category above.')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((bounty) => (
              <BountyCard key={bounty.id} bounty={bounty} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
