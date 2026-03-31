'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Mic, FileText, Headphones, Users, Clock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LanguageBounty } from '@/lib/supabase';

const MODALITY_ICON: Record<LanguageBounty['modality'], React.ComponentType<{ className?: string }>> = {
  'Speech':        Mic,
  'Text-Pair':     FileText,
  'Transcription': Headphones,
};

const MODALITY_COLOR: Record<LanguageBounty['modality'], string> = {
  'Speech':        'text-accent-cyan  bg-accent-cyan/10',
  'Text-Pair':     'text-accent-ochre bg-accent-ochre/10',
  'Transcription': 'text-accent-clay  bg-accent-clay/10',
};

const STATUS_LABEL: Record<LanguageBounty['bounty_status'], string> = {
  'funding':           'Open — Fundraising',
  'active_collection': 'Active Collection',
  'fulfilled':         'Fulfilled',
};

const STATUS_DOT: Record<LanguageBounty['bounty_status'], string> = {
  'funding':           'bg-accent-ochre animate-pulse',
  'active_collection': 'bg-accent-cyan  animate-pulse',
  'fulfilled':         'bg-emerald-400',
};

function fmt(n: number): string {
  return n >= 1000
    ? `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`
    : `$${Math.round(n).toLocaleString()}`;
}

export function BountyCard({ bounty }: { bounty: LanguageBounty }) {
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    const pct = Math.min(100, (bounty.current_funding_usd / bounty.funding_goal_usd) * 100);
    const id = setTimeout(() => setBarWidth(pct), 80);
    return () => clearTimeout(id);
  }, [bounty.current_funding_usd, bounty.funding_goal_usd]);

  const ModalityIcon = MODALITY_ICON[bounty.modality];
  const isCritical    = bounty.urgency_level === 'critical';
  const isFulfilled   = bounty.bounty_status === 'fulfilled';
  const pct           = Math.min(100, (bounty.current_funding_usd / bounty.funding_goal_usd) * 100);

  return (
    <article
      className={cn(
        'group relative flex flex-col gap-5 rounded-2xl border p-6',
        'bg-brand-surface hover:bg-brand-elevated',
        'transition-all duration-300',
        isCritical
          ? 'border-accent-clay/30 hover:border-accent-clay/60'
          : 'border-white/8 hover:border-white/16',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-xs font-bold tracking-widest text-text-secondary uppercase px-2 py-0.5 rounded border border-white/10 bg-white/4">
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
          {isCritical ? 'CRITICAL' : 'STANDARD'}
        </span>
      </div>

      <div>
        <p className="font-mono text-xs text-text-secondary uppercase tracking-widest mb-1">
          {bounty.language_name}
        </p>
        <h3 className="font-display text-lg font-bold text-white leading-snug group-hover:text-accent-ochre transition-colors duration-200">
          {bounty.title}
        </h3>
      </div>

      <div className="flex items-center gap-4 text-xs text-text-secondary">
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          {bounty.target_hours} hrs target
        </span>
        <span className="flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          {bounty.contributors_engaged} contributors
        </span>
      </div>

      <div>
        <div className="flex items-baseline justify-between mb-2">
          <span className="font-mono text-sm font-bold text-white">
            {fmt(bounty.current_funding_usd)}
          </span>
          <span className="font-mono text-xs text-text-tertiary">
            of {fmt(bounty.funding_goal_usd)}
          </span>
        </div>

        <div className="h-1.5 rounded-full bg-white/8 overflow-hidden" role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100} aria-label={`${Math.round(pct)}% funded`}>
          <div
            className={cn(
              'h-full rounded-full transition-[width] duration-700 ease-out',
              isFulfilled
                ? 'bg-emerald-400'
                : isCritical
                  ? 'bg-gradient-to-r from-accent-clay to-accent-ochre'
                  : 'bg-gradient-to-r from-accent-ochre to-accent-cyan',
            )}
            style={{ width: `${barWidth}%` }}
          />
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="flex items-center gap-1.5 text-[11px] text-text-tertiary">
            <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', STATUS_DOT[bounty.bounty_status])} />
            {STATUS_LABEL[bounty.bounty_status]}
          </span>
          <span className="font-mono text-[11px] text-text-tertiary">
            {Math.round(pct)}% funded
          </span>
        </div>
      </div>

      {!isFulfilled ? (
        <Link
          href={`/donate?bounty=${encodeURIComponent(bounty.title)}&lang=${bounty.language_code}`}
          className={cn(
            'group/btn mt-auto inline-flex items-center justify-center gap-2',
            'rounded-lg px-4 py-2.5 text-sm font-semibold',
            'transition-all duration-300',
            isCritical
              ? 'bg-accent-clay/15 text-accent-clay hover:bg-accent-clay/25 hover:shadow-[0_0_18px_rgba(224,122,95,0.3)]'
              : 'bg-accent-ochre/15 text-accent-ochre hover:bg-accent-ochre/25 hover:shadow-[0_0_18px_rgba(245,166,35,0.3)]',
          )}
          aria-label={`Fund ${bounty.title} bounty`}
        >
          Fund this Bounty
          <ArrowRight className="w-3.5 h-3.5 shrink-0 transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden="true" />
        </Link>
      ) : (
        <span className="mt-auto inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold bg-emerald-400/10 text-emerald-400 cursor-default select-none">
          Fully Funded
        </span>
      )}
    </article>
  );
}
