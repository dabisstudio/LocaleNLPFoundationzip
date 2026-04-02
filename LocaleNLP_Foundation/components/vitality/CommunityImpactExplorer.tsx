'use client';

import { useState, useEffect, useRef } from 'react';
import { Users, Stethoscope, GraduationCap, Tractor, Globe, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlowButton } from '@/components/ui/glow-button';

// ─── Data ─────────────────────────────────────────────────────────────────────

interface BeneficiarySegment {
  id: string;
  label: string;
  sector: 'Healthcare' | 'Education' | 'Agriculture' | 'All';
  Icon: React.ComponentType<{ className?: string }>;
  color: string;
  glow: string;
  count: number;
  countLabel: string;
  language: string;
  region: string;
  story: string;
  gain: string;
  gainUnit: string;
}

const SEGMENTS: BeneficiarySegment[] = [
  {
    id: 'nurses',
    label: 'Rural Nurses',
    sector: 'Healthcare',
    Icon: Stethoscope,
    color: '#F5A623',
    glow: 'rgba(245,166,35,0.2)',
    count: 15_000,
    countLabel: 'Nurses Equipped',
    language: 'Swahili + Hausa',
    region: 'East & West Africa',
    story: 'Rural health posts log patient data in local language via voice — no English UI required.',
    gain: '40%',
    gainUnit: 'fewer misdiagnoses',
  },
  {
    id: 'teachers',
    label: 'Primary Teachers',
    sector: 'Education',
    Icon: GraduationCap,
    color: '#00E5FF',
    glow: 'rgba(0,229,255,0.15)',
    count: 12_000,
    countLabel: 'Teachers Supported',
    language: 'Bambara + Pulaar',
    region: 'West Africa',
    story: 'Lesson plans are auto-translated from national curricula into mother-tongue for grade 1–3.',
    gain: '31%',
    gainUnit: 'literacy improvement',
  },
  {
    id: 'farmers',
    label: 'Smallholder Farmers',
    sector: 'Agriculture',
    Icon: Tractor,
    color: '#E07A5F',
    glow: 'rgba(224,122,95,0.2)',
    count: 250_000,
    countLabel: 'Farmers Reached',
    language: 'Wolof + Bambara',
    region: 'Sahel',
    story: 'Voice advisories delivered via feature phone — no smartphone or data plan required.',
    gain: '22%',
    gainUnit: 'higher crop yields',
  },
  {
    id: 'midwives',
    label: 'Midwives & CHWs',
    sector: 'Healthcare',
    Icon: Stethoscope,
    color: '#8B5CF6',
    glow: 'rgba(139,92,246,0.2)',
    count: 6_200,
    countLabel: 'CHWs Equipped',
    language: 'Dinka + Amharic',
    region: 'East & Central Africa',
    story: 'Community health workers receive maternal health IVR prompts in their native dialect.',
    gain: '18%',
    gainUnit: 'improved maternal outcomes',
  },
  {
    id: 'students',
    label: 'Secondary Students',
    sector: 'Education',
    Icon: GraduationCap,
    color: '#4ADE80',
    glow: 'rgba(74,222,128,0.15)',
    count: 88_000,
    countLabel: 'Students Reached',
    language: 'Kinyarwanda + Luganda',
    region: 'Central & East Africa',
    story: 'STEM curricula provided with mother-tongue annotations to bridge national exam gaps.',
    gain: '26%',
    gainUnit: 'exam pass rate lift',
  },
  {
    id: 'pastoralists',
    label: 'Agropastoralists',
    sector: 'Agriculture',
    Icon: Globe,
    color: '#F97316',
    glow: 'rgba(249,115,22,0.15)',
    count: 42_000,
    countLabel: 'Pastoralists Served',
    language: 'Somali + Oromo',
    region: 'Horn of Africa',
    story: 'Drought alerts and grazing advisories delivered via offline-capable voice messages.',
    gain: '35%',
    gainUnit: 'fewer livestock losses',
  },
];

const SECTORS = ['All', 'Healthcare', 'Education', 'Agriculture'] as const;
type Sector = typeof SECTORS[number];

const SECTOR_META: Record<Sector, { icon: React.ComponentType<{ className?: string }>; accent: string }> = {
  All:          { icon: Users,         accent: 'text-text-secondary' },
  Healthcare:   { icon: Stethoscope,   accent: 'text-accent-ochre' },
  Education:    { icon: GraduationCap, accent: 'text-accent-cyan' },
  Agriculture:  { icon: Tractor,       accent: 'text-accent-clay' },
};

// ─── Animated bar ──────────────────────────────────────────────────────────────

function AnimatedBar({
  pct,
  color,
  glow,
  active,
}: {
  pct: number;
  color: string;
  glow: string;
  active: boolean;
}) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    started.current = false;
    setWidth(0);
    const id = setTimeout(() => {
      setWidth(pct);
    }, 80);
    return () => clearTimeout(id);
  }, [pct]);

  useEffect(() => {
    const el = ref.current;
    if (!el || started.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          setWidth(pct);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [pct]);

  return (
    <div
      ref={ref}
      className="h-2 rounded-full bg-ink-monument/8 overflow-hidden relative"
      role="progressbar"
      aria-valuenow={Math.round(pct)}
    >
      <div
        className="h-full rounded-full transition-[width] duration-700 ease-out"
        style={{
          width: `${width}%`,
          background: color,
          boxShadow: active ? `0 0 12px ${glow}` : 'none',
        }}
      />
    </div>
  );
}

// ─── Row card ─────────────────────────────────────────────────────────────────

function SegmentRow({
  seg,
  maxCount,
  active,
  onClick,
}: {
  seg: BeneficiarySegment;
  maxCount: number;
  active: boolean;
  onClick: () => void;
}) {
  const Icon = seg.Icon;
  const pct = (seg.count / maxCount) * 100;

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full text-left p-4 rounded-xl border transition-all duration-300 group',
        active
          ? 'border-opacity-60 bg-ink-monument/4'
          : 'border-ink-monument/10 hover:border-ink-monument/25 bg-transparent',
      )}
      style={{ borderColor: active ? seg.color : undefined }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300"
          style={{ backgroundColor: active ? `${seg.color}20` : 'rgba(0,0,0,0.04)' }}
        >
          <span style={{ color: seg.color }}>
            <Icon className="w-4 h-4" aria-hidden="true" />
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-display text-sm font-semibold text-text-primary truncate">{seg.label}</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary">{seg.sector}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="font-display font-bold text-sm" style={{ color: seg.color }}>
            {seg.count.toLocaleString()}
          </p>
        </div>
      </div>
      <AnimatedBar pct={pct} color={seg.color} glow={seg.glow} active={active} />
    </button>
  );
}

// ─── Detail panel ─────────────────────────────────────────────────────────────

function DetailCard({ seg }: { seg: BeneficiarySegment }) {
  const Icon = seg.Icon;

  return (
    <div
      className="h-full rounded-2xl border p-8 flex flex-col transition-all duration-500"
      style={{ borderColor: `${seg.color}30`, background: `linear-gradient(135deg, ${seg.glow} 0%, transparent 60%)` }}
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${seg.color}20` }}
        >
          <span style={{ color: seg.color }}>
            <Icon className="w-6 h-6" aria-hidden="true" />
          </span>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] mb-1" style={{ color: seg.color }}>
            {seg.sector} · {seg.region}
          </p>
          <h3 className="font-display text-xl font-bold text-text-primary">{seg.label}</h3>
        </div>
      </div>

      {/* Key stat */}
      <div
        className="rounded-xl p-5 mb-6 border"
        style={{ borderColor: `${seg.color}25`, backgroundColor: `${seg.color}08` }}
      >
        <p className="font-display text-4xl font-bold mb-1" style={{ color: seg.color }}>
          {seg.count.toLocaleString()}
        </p>
        <p className="font-mono text-[11px] uppercase tracking-widest text-text-tertiary">{seg.countLabel}</p>
      </div>

      {/* Story */}
      <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-1">"{seg.story}"</p>

      {/* Attributes */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono text-text-tertiary uppercase tracking-wider">Language(s)</span>
          <span className="font-medium text-text-primary">{seg.language}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono text-text-tertiary uppercase tracking-wider">Measured Gain</span>
          <span className="font-bold" style={{ color: seg.color }}>
            {seg.gain} {seg.gainUnit}
          </span>
        </div>
      </div>

      {/* CTA */}
      <GlowButton href="/bounties" variant="ghost" className="w-full justify-center">
        Fund Language Data for this Community
        <ChevronRight className="w-4 h-4" aria-hidden="true" />
      </GlowButton>
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────

export function CommunityImpactExplorer() {
  const [sector, setSector] = useState<Sector>('All');
  const [selected, setSelected] = useState<BeneficiarySegment>(SEGMENTS[0]);

  const filtered = sector === 'All' ? SEGMENTS : SEGMENTS.filter((s) => s.sector === sector);
  const maxCount = Math.max(...filtered.map((s) => s.count));

  // When filter changes, auto-select first result
  useEffect(() => {
    if (!filtered.find((s) => s.id === selected.id)) {
      setSelected(filtered[0]);
    }
  }, [sector, filtered, selected.id]);

  return (
    <section className="py-24 bg-brand-surface">
      <div className="container-wide section-padding">

        {/* Section header */}
        <div className="text-center mb-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent-ochre mb-4">
            [ WHO WE ACTUALLY SERVE ]
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Community Impact Explorer
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Behind every token in our corpus is a real person. Filter by sector to see exactly who
            benefits — nurses in rural clinics, teachers in village schools, and farmers with no smartphone.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {SECTORS.map((s) => {
            const meta = SECTOR_META[s];
            const Icon = meta.icon;
            return (
              <button
                key={s}
                onClick={() => setSector(s)}
                className={cn(
                  'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200',
                  sector === s
                    ? 'border-accent-ochre bg-accent-ochre/10 text-accent-ochre'
                    : 'border-ink-monument/15 text-text-secondary hover:border-ink-monument/30 hover:text-text-primary',
                )}
              >
                <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                {s}
              </button>
            );
          })}
        </div>

        {/* Explorer grid */}
        <div className="grid lg:grid-cols-[1fr_360px] gap-6 items-start">

          {/* Left: Bar list */}
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-4 px-1">
              <p className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary">
                Beneficiary Segment
              </p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary">
                Individuals Served
              </p>
            </div>
            {filtered.map((seg) => (
              <SegmentRow
                key={seg.id}
                seg={seg}
                maxCount={maxCount}
                active={selected.id === seg.id}
                onClick={() => setSelected(seg)}
              />
            ))}

            {/* Total */}
            <div className="pt-4 border-t border-ink-monument/10 flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-accent-ochre" aria-hidden="true" />
                <span className="font-mono text-xs text-text-secondary uppercase tracking-wider">
                  Total Lives Impacted
                </span>
              </div>
              <span className="font-display font-bold text-lg text-accent-ochre">
                {filtered.reduce((s, seg) => s + seg.count, 0).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Right: Detail card */}
          <div className="lg:sticky lg:top-28">
            <DetailCard seg={selected} />
          </div>
        </div>
      </div>
    </section>
  );
}
