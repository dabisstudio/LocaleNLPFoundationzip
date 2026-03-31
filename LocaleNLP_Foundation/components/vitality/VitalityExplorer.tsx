'use client';

import { useState, useCallback } from 'react';
import { VitalityMap } from './VitalityMap';
import { DetailPanel } from './DetailPanel';
import { VitalityTable } from './VitalityTable';
import {
  VITALITY_STATUS_LABELS,
  VITALITY_STATUS_COLORS,
  type LanguageVitalityRecord,
} from '@/lib/vitality-data';

interface VitalityExplorerProps {
  data: LanguageVitalityRecord[];
}

function fmtTokens(n: number): string {
  if (n >= 1e9) return `${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(0)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(0)}K`;
  return String(n);
}

const STATUS_BG: Record<string, string> = {
  CRITICAL_DATA_DEBT: 'bg-accent-clay/15 text-accent-clay border-accent-clay/30',
  EMERGING_CORPUS:    'bg-accent-ochre/15 text-accent-ochre border-accent-ochre/30',
  DEPLOYABLE:         'bg-accent-cyan/15 text-accent-cyan border-accent-cyan/30',
};

function InlineMetrics({ lang }: { lang: LanguageVitalityRecord }) {
  const color = VITALITY_STATUS_COLORS[lang.vitalityStatus];
  const r = 30;
  const circ = 2 * Math.PI * r;
  const dash = (lang.aiReadinessScore / 100) * circ;

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="col-span-2 flex items-center gap-4 p-3 rounded-xl bg-white/4 border border-white/6">
        <svg viewBox="0 0 68 68" className="w-16 h-16 shrink-0" aria-hidden="true">
          <circle cx="34" cy="34" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
          <circle
            cx="34" cy="34" r={r}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circ}`}
            transform="rotate(-90 34 34)"
          />
          <text x="34" y="38" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white" fontFamily="monospace">
            {lang.aiReadinessScore}
          </text>
        </svg>
        <div>
          <p className="font-mono text-[10px] text-text-tertiary uppercase tracking-widest mb-1">AI Readiness Score</p>
          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold border uppercase tracking-wide ${STATUS_BG[lang.vitalityStatus]}`}>
            {VITALITY_STATUS_LABELS[lang.vitalityStatus]}
          </span>
        </div>
      </div>
      <div className="p-3 rounded-xl bg-white/4 border border-white/6">
        <p className="font-mono text-[10px] text-text-tertiary uppercase tracking-widest mb-1">Open Tokens</p>
        <p className="font-display text-xl font-bold text-white">{fmtTokens(lang.totalTokens)}</p>
      </div>
      <div className="p-3 rounded-xl bg-white/4 border border-white/6">
        <p className="font-mono text-[10px] text-text-tertiary uppercase tracking-widest mb-1">Speech Hours</p>
        <p className="font-display text-xl font-bold text-white">{lang.speechHoursValidated.toLocaleString()}h</p>
      </div>
      <div className="col-span-2 p-3 rounded-xl bg-white/4 border border-white/6">
        <p className="font-mono text-[10px] text-text-tertiary uppercase tracking-widest mb-1">Last Audited</p>
        <p className="font-semibold text-white text-sm">
          {new Date(lang.lastAudited).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>
    </div>
  );
}

export function VitalityExplorer({ data }: VitalityExplorerProps) {
  const [selected, setSelected] = useState<LanguageVitalityRecord | null>(null);

  const handleSelect = useCallback((lang: LanguageVitalityRecord) => {
    setSelected((prev) => (prev?.isoCode === lang.isoCode ? null : lang));
  }, []);

  const handleClose = useCallback(() => setSelected(null), []);

  return (
    <>
      <section className="container-wide section-padding py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 items-start">
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="mb-4">
              <span className="font-mono text-[10px] text-text-tertiary uppercase tracking-widest">
                [ INTERACTIVE MAP // CLICK A LANGUAGE ]
              </span>
            </div>
            <VitalityMap onSelect={handleSelect} selected={selected} />
          </div>

          <div className="flex flex-col gap-4">
            {selected ? (
              <div className="rounded-2xl border border-white/8 bg-brand-surface p-6 flex flex-col gap-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-[10px] text-text-tertiary uppercase tracking-widest mb-1">
                      {selected.countryName} · {selected.region}
                    </p>
                    <h2 className="font-display text-2xl font-bold text-white">{selected.languageName}</h2>
                    {selected.nativeName !== selected.languageName && (
                      <p className="text-text-secondary text-sm mt-0.5">{selected.nativeName}</p>
                    )}
                    <p className="font-mono text-[11px] text-text-tertiary mt-0.5 uppercase tracking-widest">
                      ISO {selected.isoCode}
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="text-text-secondary hover:text-white text-2xl leading-none shrink-0 mt-0.5"
                    aria-label="Close selection"
                  >
                    ×
                  </button>
                </div>
                <InlineMetrics lang={selected} />
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-white/12 bg-brand-surface/30 p-10 text-center flex flex-col items-center gap-3">
                <span className="font-mono text-[11px] text-text-tertiary uppercase tracking-widest">
                  Select a language
                </span>
                <p className="text-text-secondary text-sm max-w-xs">
                  Click any dot on the map or a row in the table below to explore its AI readiness data.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="container-wide section-padding pb-20">
        <VitalityTable data={data} onSelect={handleSelect} selected={selected} />
      </section>

      <DetailPanel language={selected} onClose={handleClose} />
    </>
  );
}
