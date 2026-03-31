'use client';

import { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  VITALITY_STATUS_LABELS,
  VITALITY_STATUS_COLORS,
  type LanguageVitalityRecord,
  type VitalityStatus,
} from '@/lib/vitality-data';

type SortKey = 'languageName' | 'region' | 'totalTokens' | 'speechHoursValidated' | 'aiReadinessScore' | 'vitalityStatus';
type SortDir = 'asc' | 'desc';

const STATUS_BADGE: Record<VitalityStatus, string> = {
  CRITICAL_DATA_DEBT: 'bg-accent-clay/15 text-accent-clay border-accent-clay/30',
  EMERGING_CORPUS:    'bg-accent-ochre/15 text-accent-ochre border-accent-ochre/30',
  DEPLOYABLE:         'bg-accent-cyan/15 text-accent-cyan border-accent-cyan/30',
};

function fmtTokens(n: number): string {
  if (n >= 1e9) return `${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(0)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(0)}K`;
  return String(n);
}

interface VitalityTableProps {
  data: LanguageVitalityRecord[];
  onSelect: (lang: LanguageVitalityRecord) => void;
  selected: LanguageVitalityRecord | null;
}

export function VitalityTable({ data, onSelect, selected }: VitalityTableProps) {
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('aiReadinessScore');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  }

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return data.filter(
      (l) =>
        !q ||
        l.languageName.toLowerCase().includes(q) ||
        l.region.toLowerCase().includes(q) ||
        l.isoCode.toLowerCase().includes(q) ||
        l.countryName.toLowerCase().includes(q),
    );
  }, [data, query]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const cmp = typeof av === 'number'
        ? (av as number) - (bv as number)
        : String(av).localeCompare(String(bv));
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return <span className="w-3 h-3 opacity-0" />;
    return sortDir === 'asc'
      ? <ChevronUp className="w-3 h-3 shrink-0" aria-hidden="true" />
      : <ChevronDown className="w-3 h-3 shrink-0" aria-hidden="true" />;
  }

  const TH = ({ col, label, right }: { col: SortKey; label: string; right?: boolean }) => (
    <th
      scope="col"
      className={cn(
        'px-3 py-2.5 text-[10px] font-semibold uppercase tracking-widest text-text-tertiary cursor-pointer select-none hover:text-white transition-colors whitespace-nowrap',
        right ? 'text-right' : 'text-left',
        sortKey === col && 'text-accent-ochre',
      )}
      onClick={() => handleSort(col)}
      aria-sort={sortKey === col ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
    >
      <span className={cn('inline-flex items-center gap-1', right && 'justify-end w-full')}>
        {label}
        <SortIcon col={col} />
      </span>
    </th>
  );

  return (
    <section>
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-5">
        <div>
          <h2 className="font-display text-xl font-bold text-white">All Languages</h2>
          <p className="text-text-secondary text-sm mt-0.5">{sorted.length} of {data.length} records</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-tertiary pointer-events-none" aria-hidden="true" />
          <input
            type="search"
            placeholder="Filter languages…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-brand-surface border border-white/10 text-sm text-white placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-ochre/40 focus:border-accent-ochre/40 transition-colors"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/8">
        <table className="w-full text-sm" aria-label="Language vitality data table">
          <thead className="bg-white/4 border-b border-white/8">
            <tr>
              <TH col="languageName" label="Language" />
              <TH col="region"       label="Region" />
              <TH col="totalTokens"  label="Tokens"     right />
              <TH col="speechHoursValidated" label="Speech Hrs" right />
              <TH col="aiReadinessScore"     label="Score"      right />
              <TH col="vitalityStatus"       label="Status" />
            </tr>
          </thead>
          <tbody>
            {sorted.map((lang, i) => {
              const isSelected = selected?.isoCode === lang.isoCode;
              const statusColor = VITALITY_STATUS_COLORS[lang.vitalityStatus];
              return (
                <tr
                  key={lang.isoCode}
                  onClick={() => onSelect(lang)}
                  className={cn(
                    'border-b border-white/4 last:border-b-0 cursor-pointer transition-colors duration-150',
                    isSelected
                      ? 'bg-accent-ochre/8'
                      : i % 2 === 0
                        ? 'bg-transparent hover:bg-white/4'
                        : 'bg-white/2 hover:bg-white/4',
                  )}
                  aria-selected={isSelected}
                  tabIndex={0}
                  role="row"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelect(lang);
                    }
                  }}
                >
                  <td className="px-3 py-3">
                    <div className="font-semibold text-white">{lang.languageName}</div>
                    <div className="font-mono text-[10px] text-text-tertiary uppercase tracking-widest">{lang.isoCode}</div>
                  </td>
                  <td className="px-3 py-3 text-text-secondary whitespace-nowrap">{lang.region}</td>
                  <td className="px-3 py-3 text-right font-mono text-text-secondary">{fmtTokens(lang.totalTokens)}</td>
                  <td className="px-3 py-3 text-right font-mono text-text-secondary">{lang.speechHoursValidated.toLocaleString()}</td>
                  <td className="px-3 py-3 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <div className="w-14 h-1.5 rounded-full bg-white/8 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${lang.aiReadinessScore}%`, backgroundColor: statusColor }}
                        />
                      </div>
                      <span className="font-mono font-bold text-white w-6 text-right">{lang.aiReadinessScore}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <span className={cn(
                      'inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold border uppercase tracking-wide whitespace-nowrap',
                      STATUS_BADGE[lang.vitalityStatus],
                    )}>
                      {VITALITY_STATUS_LABELS[lang.vitalityStatus]}
                    </span>
                  </td>
                </tr>
              );
            })}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-text-secondary">
                  No languages match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
