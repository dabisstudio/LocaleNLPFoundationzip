'use client';

import { useEffect, useState } from 'react';
import { Mic, FileText, Headphones, Users, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlowButton } from '@/components/ui/glow-button';
import type { LanguageBounty } from '@/lib/supabase';
import { useTranslation } from '@/lib/i18n/TranslationContext';

const MODALITY_ICON: Record<LanguageBounty['modality'], React.ComponentType<{ className?: string }>> = {
  'Speech':        Mic,
  'Text-Pair':     FileText,
  'Transcription': Headphones,
};

const MODALITY_COLOR: Record<LanguageBounty['modality'], string> = {
  'Speech':        'text-accent-navy  bg-accent-navy/10',
  'Text-Pair':     'text-accent-ochre bg-accent-ochre/10',
  'Transcription': 'text-accent-clay  bg-accent-clay/10',
};

const STATUS_DOT: Record<LanguageBounty['bounty_status'], string> = {
  'funding':           'bg-accent-ochre animate-pulse',
  'active_collection': 'bg-accent-emerald animate-pulse',
  'fulfilled':         'bg-emerald-500',
};

function fmt(n: number): string {
  return `$${Math.round(n).toLocaleString('en-US')}`;
}

export function BountyCard({ bounty }: { bounty: LanguageBounty }) {
  const [barWidth, setBarWidth] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const pct = Math.min(100, (bounty.current_funding_usd / bounty.funding_goal_usd) * 100);
    const id = setTimeout(() => setBarWidth(pct), 80);
    return () => clearTimeout(id);
  }, [bounty.current_funding_usd, bounty.funding_goal_usd]);

  const ModalityIcon = MODALITY_ICON[bounty.modality];
  const isCritical    = bounty.urgency_level === 'critical';
  const isFulfilled   = bounty.bounty_status === 'fulfilled';
  const pct           = Math.min(100, (bounty.current_funding_usd / bounty.funding_goal_usd) * 100);

  const STATUS_LABEL: Record<LanguageBounty['bounty_status'], string> = {
    'funding':           t('bounty.status_funding', 'Open — Fundraising'),
    'active_collection': t('bounty.status_active',  'Active Collection'),
    'fulfilled':         t('bounty.status_fulfilled','Fulfilled'),
  };

  return (
    <article
      className={cn(
        'group relative flex flex-col gap-5 rounded-2xl border p-6 bg-base-pure',
        'transition-all duration-300 shadow-editorial hover:shadow-lg',
        isCritical
          ? 'border-accent-clay/30 hover:border-accent-clay/60'
          : 'border-ink-monument/10 hover:border-ink-monument/25',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-xs font-bold tracking-widest text-ink-steel uppercase px-2 py-0.5 rounded border border-ink-monument/12 bg-ink-monument/4">
            {bounty.language_code.toUpperCase()}
          </span>

          <span className={cn(
            'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold',
            MODALITY_COLOR[bounty.modality],
          )}>
            <ModalityIcon className="w-3 h-3" aria-hidden="true" />
            {bounty.modality}
          </span>
        </div>

        <span className={cn(
          'shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide',
          isCritical
            ? 'bg-accent-clay/15 text-accent-clay'
            : 'bg-accent-ochre/15 text-accent-ochre',
        )}>
          {isCritical
            ? t('bounty.urgency_critical', 'CRITICAL')
            : t('bounty.urgency_standard', 'STANDARD')}
        </span>
      </div>

      <div>
        <p className="font-mono text-xs text-ink-muted uppercase tracking-widest mb-1">
          {bounty.language_name}
        </p>
        <h3 className="font-display text-lg font-bold text-ink-monument leading-snug group-hover:text-accent-ochre transition-colors duration-200">
          {bounty.title}
        </h3>
      </div>

      <div className="flex items-center gap-4 text-xs text-ink-steel">
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          {t('bounty.hrs_target', '{n} hrs target').replace('{n}', String(bounty.target_hours))}
        </span>
        <span className="flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          {t('bounty.contributors', '{n} contributors').replace('{n}', String(bounty.contributors_engaged))}
        </span>
      </div>

      <div>
        <div className="flex items-baseline justify-between mb-2">
          <span className="font-mono text-sm font-bold text-ink-monument">
            {fmt(bounty.current_funding_usd)}
          </span>
          <span className="font-mono text-xs text-ink-muted">
            of {fmt(bounty.funding_goal_usd)}
          </span>
        </div>

        <div
          className="h-1.5 rounded-full bg-ink-monument/8 overflow-hidden"
          role="progressbar"
          aria-valuenow={Math.round(pct)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={t('bounty.progress_label', '{pct}% funded').replace('{pct}', String(Math.round(pct)))}
        >
          <div
            className={cn(
              'h-full rounded-full transition-[width] duration-700 ease-out',
              isFulfilled
                ? 'bg-emerald-500'
                : isCritical
                  ? 'bg-gradient-to-r from-accent-clay to-accent-ochre'
                  : 'bg-gradient-to-r from-accent-ochre to-accent-navy',
            )}
            style={{ width: `${barWidth}%` }}
          />
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="flex items-center gap-1.5 text-[11px] text-ink-muted">
            <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', STATUS_DOT[bounty.bounty_status])} />
            {STATUS_LABEL[bounty.bounty_status]}
          </span>
          <span className="font-mono text-[11px] text-ink-muted">
            {t('bounty.pct_funded', '{pct}% funded').replace('{pct}', String(Math.round(pct)))}
          </span>
        </div>
      </div>

      {isFulfilled ? (
        <GlowButton
          variant="ghost"
          disabled
          className="mt-auto w-full justify-center text-sm border-emerald-500/30 text-emerald-600"
          aria-label={`${bounty.title} is fully funded`}
          aria-disabled="true"
        >
          {t('bounty.fully_funded', 'Fully Funded')}
        </GlowButton>
      ) : (
        <GlowButton
          href={`/donate?bounty=${encodeURIComponent(bounty.title)}&lang=${bounty.language_code}`}
          variant="ghost"
          className="mt-auto w-full justify-center text-sm"
          aria-label={`Fund ${bounty.title} bounty`}
        >
          {t('bounty.fund_cta', 'Fund this Bounty')}
        </GlowButton>
      )}
    </article>
  );
}
