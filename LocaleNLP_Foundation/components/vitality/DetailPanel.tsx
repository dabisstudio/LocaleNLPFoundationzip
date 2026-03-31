'use client';

import { useEffect, useRef } from 'react';
import { X, Calendar, Clock, Database, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  VITALITY_STATUS_LABELS,
  VITALITY_STATUS_COLORS,
  type LanguageVitalityRecord,
} from '@/lib/vitality-data';

function CircleRing({ score, color }: { score: number; color: string }) {
  const r = 40;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;

  return (
    <svg viewBox="0 0 100 100" className="w-28 h-28" aria-hidden="true">
      <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
      <circle
        cx="50"
        cy="50"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circ}`}
        strokeDashoffset={0}
        transform="rotate(-90 50 50)"
        style={{ transition: 'stroke-dasharray 0.8s cubic-bezier(0.4,0,0.2,1)' }}
      />
      <text x="50" y="46" textAnchor="middle" fontSize="18" fontWeight="bold" fill="white" fontFamily="monospace">
        {score}
      </text>
      <text x="50" y="62" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.45)" fontFamily="monospace">
        / 100
      </text>
    </svg>
  );
}

interface DetailPanelProps {
  language: LanguageVitalityRecord | null;
  onClose: () => void;
}

export function DetailPanel({ language, onClose }: DetailPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!language) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [language, onClose]);

  useEffect(() => {
    if (language) panelRef.current?.focus();
  }, [language]);

  const isOpen = !!language;
  const statusColor = language ? VITALITY_STATUS_COLORS[language.vitalityStatus] : '#F5A623';

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

  return (
    <>
      {isOpen && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={language ? `${language.languageName} vitality details` : 'Language vitality details'}
        className={cn(
          'fixed right-0 top-0 h-full z-40 w-full max-w-sm overflow-y-auto',
          'bg-brand-surface border-l border-white/10',
          'flex flex-col',
          'transition-transform duration-400 ease-out',
          'outline-none',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
        style={{ transitionDuration: '400ms' }}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/8 shrink-0">
          <span className="font-mono text-[10px] text-text-tertiary uppercase tracking-widest">
            [ LANGUAGE VITALITY RECORD ]
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-md flex items-center justify-center text-text-secondary hover:text-white hover:bg-white/8 transition-colors"
            aria-label="Close detail panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {language && (
          <div className="flex-1 p-6 flex flex-col gap-6">
            <div>
              <p className="font-mono text-xs text-text-tertiary uppercase tracking-widest mb-1">
                {language.countryName} · {language.region}
              </p>
              <h2 className="font-display text-2xl font-bold text-white leading-tight">
                {language.languageName}
              </h2>
              {language.nativeName !== language.languageName && (
                <p className="text-text-secondary text-sm mt-1">{language.nativeName}</p>
              )}
              <p className="font-mono text-[11px] text-text-tertiary mt-1 uppercase tracking-widest">
                ISO {language.isoCode}
              </p>
            </div>

            <div className="flex items-center gap-5">
              <CircleRing score={language.aiReadinessScore} color={statusColor} />
              <div>
                <p className="font-mono text-[10px] text-text-tertiary uppercase tracking-widest mb-1.5">
                  AI Readiness Score
                </p>
                <span className={cn(
                  'inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold border uppercase tracking-wide',
                  STATUS_BG[language.vitalityStatus],
                )}>
                  {VITALITY_STATUS_LABELS[language.vitalityStatus]}
                </span>
              </div>
            </div>

            <dl className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/4 border border-white/6">
                <Database className="w-4 h-4 text-accent-cyan shrink-0" aria-hidden="true" />
                <div className="min-w-0">
                  <dt className="font-mono text-[10px] text-text-tertiary uppercase tracking-widest mb-0.5">
                    Total Open Tokens
                  </dt>
                  <dd className="font-display text-xl font-bold text-white">
                    {fmtTokens(language.totalTokens)}
                  </dd>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/4 border border-white/6">
                <Clock className="w-4 h-4 text-accent-ochre shrink-0" aria-hidden="true" />
                <div className="min-w-0">
                  <dt className="font-mono text-[10px] text-text-tertiary uppercase tracking-widest mb-0.5">
                    Speech Hours Validated
                  </dt>
                  <dd className="font-display text-xl font-bold text-white">
                    {language.speechHoursValidated.toLocaleString('en-US')}h
                  </dd>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/4 border border-white/6">
                <Cpu className="w-4 h-4 text-accent-clay shrink-0" aria-hidden="true" />
                <div className="min-w-0">
                  <dt className="font-mono text-[10px] text-text-tertiary uppercase tracking-widest mb-0.5">
                    AI Readiness Score
                  </dt>
                  <dd
                    className="font-display text-xl font-bold"
                    style={{ color: statusColor }}
                  >
                    {language.aiReadinessScore} / 100
                  </dd>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/4 border border-white/6">
                <Calendar className="w-4 h-4 text-text-secondary shrink-0" aria-hidden="true" />
                <div className="min-w-0">
                  <dt className="font-mono text-[10px] text-text-tertiary uppercase tracking-widest mb-0.5">
                    Last Audited
                  </dt>
                  <dd className="font-display text-base font-semibold text-white">
                    {new Date(language.lastAudited).toLocaleDateString('en-US', {
                      month: 'long', day: 'numeric', year: 'numeric',
                    })}
                  </dd>
                </div>
              </div>
            </dl>

            <div className="mt-auto pt-4 border-t border-white/8 text-center">
              <p className="font-mono text-[10px] text-text-tertiary uppercase tracking-widest mb-3">
                Help improve this language
              </p>
              <a
                href={`/bounties`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-accent-ochre hover:opacity-80 transition-opacity"
              >
                View open bounties →
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
