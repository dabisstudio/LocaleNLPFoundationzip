'use client';

import dynamic from 'next/dynamic';
import {
  VITALITY_SUMMARY,
  VITALITY_STATUS_COLORS,
  VITALITY_STATUS_LABELS,
  type LanguageVitalityRecord,
} from '@/lib/vitality-data';

const SovereignGlobe = dynamic(() => import('./SovereignGlobe'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-accent-cyan/40 border-t-accent-cyan rounded-full animate-spin" />
        <span className="font-mono text-[11px] text-white/40 uppercase tracking-widest">
          Initializing Globe...
        </span>
      </div>
    </div>
  ),
});

/* ═══════════════════════════════════════════════════════════════════════════
 * FORMAT HELPERS
 * ═══════════════════════════════════════════════════════════════════════════ */

function fmtBig(n: number): string {
  if (n >= 1e12) return `${(n / 1e12).toFixed(1)}T`;
  if (n >= 1e9) return `${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(0)}M`;
  return String(n);
}

/* ═══════════════════════════════════════════════════════════════════════════
 * COMPONENT
 * ═══════════════════════════════════════════════════════════════════════════ */

interface GlobeSectionProps {
  onSelect?: (lang: LanguageVitalityRecord) => void;
  selected?: LanguageVitalityRecord | null;
  interactive?: boolean;
  showMetrics?: boolean;
  compact?: boolean;
}

export default function GlobeSection({
  onSelect,
  selected,
  interactive = true,
  showMetrics = true,
  compact = false,
}: GlobeSectionProps) {
  const height = compact ? 'h-[420px]' : 'h-[560px] lg:h-[640px]';

  return (
    <div className="relative w-full rounded-2xl overflow-hidden" style={{ background: '#09090E' }}>

      {/* ── Metrics Overlay ──────────────────────────────────────────── */}
      {showMetrics && (
        <div className="absolute top-0 left-0 right-0 z-20 p-4">
          <div
            className="mx-auto max-w-3xl rounded-xl border border-white/8 px-5 py-3"
            style={{
              background: 'rgba(11,15,25,0.75)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <MetricPill label="Languages Audited" value={String(VITALITY_SUMMARY.totalLanguages)} color="#00E5FF" />
              <MetricPill label="Total Open Tokens" value={fmtBig(VITALITY_SUMMARY.totalTokens)} color="#00E5FF" />
              <MetricPill
                label="Speech Hours"
                value={`${(VITALITY_SUMMARY.totalSpeechHours / 1000).toFixed(0)}K+`}
                color="#00E5FF"
              />
              <span className="hidden sm:block w-px h-5 bg-white/10" />
              <MetricPill label="Deployable" value={String(VITALITY_SUMMARY.deployable)} color="#00E5FF" />
              <MetricPill label="Emerging" value={String(VITALITY_SUMMARY.emerging)} color="#F5A623" />
              <MetricPill label="Critical" value={String(VITALITY_SUMMARY.critical)} color="#E07A5F" />
            </div>
          </div>
        </div>
      )}

      {/* ── Globe Canvas ─────────────────────────────────────────────── */}
      <div className={height}>
        <SovereignGlobe
          onSelect={onSelect}
          selected={selected}
          interactive={interactive}
          className="h-full"
        />
      </div>

      {/* ── Legend ────────────────────────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {(Object.entries(VITALITY_STATUS_COLORS) as [string, string][]).map(([key, color]) => (
            <span key={key} className="flex items-center gap-1.5 text-[11px] font-mono text-white/50">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
              {VITALITY_STATUS_LABELS[key as keyof typeof VITALITY_STATUS_LABELS]}
            </span>
          ))}
        </div>
        {interactive && (
          <p className="text-center text-[10px] text-white/25 font-mono uppercase tracking-widest mt-2">
            Click a spike to explore · Drag to orbit · Scroll to zoom
          </p>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * SUB-COMPONENTS
 * ═══════════════════════════════════════════════════════════════════════════ */

function MetricPill({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="text-center">
      <p className="font-mono text-[9px] uppercase tracking-widest text-white/35 mb-0.5">{label}</p>
      <p className="font-display text-sm font-bold" style={{ color }}>{value}</p>
    </div>
  );
}
