'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, Leaf, DollarSign } from 'lucide-react';

const DATASETS = [
  'Wolof Speech Corpus v2.1',
  'Darija Medical Instruct v1.0',
  'Bambara Text-Pair Baseline',
] as const;
type Dataset = typeof DATASETS[number];

interface NutritionData {
  lineage: string;
  consent: string;
  validation: string;
  avgPayout: string;
  carbon: string;
  totalRecords: string;
  speechHours: string;
  demographics: {
    gender: { female: number; male: number; nonBinary: number };
    region: { west: number; north: number; east: number; central: number };
  };
  lastAudit: string;
  hfLink: string;
}

const DATA: Record<Dataset, NutritionData> = {
  'Wolof Speech Corpus v2.1': {
    lineage: '100% Community-Sourced via Lughatna Web-App. Zero Web-Scraping.',
    consent: 'Explicit, Revocable Opt-In (CC-BY-4.0 compliant).',
    validation: 'Multi-node Community Consensus (Min. 3 human validations per token).',
    avgPayout: '$0.82 / hr',
    carbon: '100% Offset',
    totalRecords: '73,412',
    speechHours: '187.3 hrs',
    demographics: {
      gender: { female: 52, male: 46, nonBinary: 2 },
      region: { west: 78, north: 14, east: 5, central: 3 },
    },
    lastAudit: 'Jan 30, 2026',
    hfLink: 'https://huggingface.co/datasets/localenlp/wolof-speech-v2',
  },
  'Darija Medical Instruct v1.0': {
    lineage: '100% Community-Sourced via Lughatna Web-App. Zero Web-Scraping.',
    consent: 'Explicit, Revocable Opt-In (CC-BY-4.0 compliant). Medical domain double-consent.',
    validation: 'Expert + Community Consensus (Min. 5 validations for medical terminology).',
    avgPayout: '$1.14 / hr',
    carbon: '100% Offset',
    totalRecords: '41,890',
    speechHours: '98.6 hrs',
    demographics: {
      gender: { female: 48, male: 50, nonBinary: 2 },
      region: { west: 12, north: 74, east: 8, central: 6 },
    },
    lastAudit: 'Feb 14, 2026',
    hfLink: 'https://huggingface.co/datasets/localenlp/darija-medical-v1',
  },
  'Bambara Text-Pair Baseline': {
    lineage: '100% Community-Sourced via Lughatna Web-App. Zero Web-Scraping.',
    consent: 'Explicit, Revocable Opt-In (CC-BY-4.0 compliant).',
    validation: 'Multi-node Community Consensus (Min. 3 human validations per token).',
    avgPayout: '$0.74 / hr',
    carbon: '100% Offset',
    totalRecords: '58,240',
    speechHours: '128.7 hrs',
    demographics: {
      gender: { female: 55, male: 43, nonBinary: 2 },
      region: { west: 62, north: 18, east: 9, central: 11 },
    },
    lastAudit: 'Mar 8, 2026',
    hfLink: 'https://huggingface.co/datasets/localenlp/bambara-text-baseline',
  },
};

const SELECT_STYLE = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2352525B' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat' as const,
  backgroundPosition: 'right 14px center',
};

function DemographicBar({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="mb-2">
      <div className="flex justify-between mb-1">
        <span className="font-mono text-[10px] text-text-tertiary uppercase tracking-wide">{label}</span>
        <span className="font-mono text-[10px] text-text-secondary">{value}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

function Badge({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div
      className="flex items-start gap-3 p-3 rounded-lg border"
      style={{ borderColor: `${color}30`, backgroundColor: `${color}08` }}
    >
      <div
        className="w-8 h-8 rounded-md flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${color}15`, color }}
      >
        <Icon className="w-4 h-4" aria-hidden="true" />
      </div>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest mb-0.5" style={{ color }}>
          {label}
        </p>
        <p className="text-text-primary text-xs font-medium leading-snug">{value}</p>
      </div>
    </div>
  );
}

export function NutritionLabel() {
  const [isMounted, setIsMounted] = useState(false);
  const [dataset, setDataset] = useState<Dataset>('Wolof Speech Corpus v2.1');

  useEffect(() => { setIsMounted(true); }, []);
  if (!isMounted) return null;

  const d = DATA[dataset];

  return (
    <div className="glass-card overflow-hidden">
      <div className="px-6 pt-6 pb-5 border-b border-white/8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary mb-1">
              Model Nutrition Label
            </p>
            <p className="text-text-secondary text-sm">Select a dataset to view its ethical compliance report</p>
          </div>
          <div className="sm:w-72">
            <select
              value={dataset}
              onChange={(e) => setDataset(e.target.value as Dataset)}
              className="w-full bg-brand-deep border border-white/10 text-text-primary text-sm font-medium rounded-lg px-4 py-2.5 focus:outline-none focus:border-accent-ochre/40 focus:ring-1 focus:ring-accent-ochre/20 transition-colors cursor-pointer appearance-none"
              style={SELECT_STYLE}
              aria-label="Select dataset"
            >
              {DATASETS.map((ds) => (
                <option key={ds} value={ds}>{ds}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent-cyan mb-3">
                Lineage & Provenance
              </p>
              <div className="rounded-lg bg-accent-cyan/5 border border-accent-cyan/20 p-3.5 flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-text-secondary text-xs leading-relaxed">{d.lineage}</p>
              </div>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent-ochre mb-3">
                Consent Protocol
              </p>
              <div className="rounded-lg bg-accent-ochre/5 border border-accent-ochre/20 p-3.5 flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-accent-ochre shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-text-secondary text-xs leading-relaxed">{d.consent}</p>
              </div>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent-clay mb-3">
                Validation Standard
              </p>
              <div className="rounded-lg bg-accent-clay/5 border border-accent-clay/20 p-3.5 flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-accent-clay shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-text-secondary text-xs leading-relaxed">{d.validation}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Badge icon={DollarSign} label="Avg. Payout" value={d.avgPayout} color="#F5A623" />
              <Badge icon={Leaf} label="Carbon Footprint" value={d.carbon} color="#4ADE80" />
            </div>

            <div className="flex gap-4">
              <div className="flex-1 glass-card p-3.5 text-center">
                <p className="font-mono text-[10px] text-text-tertiary uppercase tracking-widest mb-1">Records</p>
                <p className="font-display text-lg font-bold text-text-primary">{d.totalRecords}</p>
              </div>
              <div className="flex-1 glass-card p-3.5 text-center">
                <p className="font-mono text-[10px] text-text-tertiary uppercase tracking-widest mb-1">Speech</p>
                <p className="font-display text-lg font-bold text-text-primary">{d.speechHours}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary mb-4">
                Demographic Parity — Gender Balance
              </p>
              <div className="space-y-1">
                <DemographicBar label="Female" value={d.demographics.gender.female} color="#E07A5F" />
                <DemographicBar label="Male" value={d.demographics.gender.male} color="#00E5FF" />
                <DemographicBar label="Non-Binary / Other" value={d.demographics.gender.nonBinary} color="#8B5CF6" />
              </div>
              <p className="font-mono text-[9px] text-text-tertiary mt-2">
                Audited for variance tolerance &lt; 5% from parity target
              </p>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary mb-4">
                Demographic Parity — Regional Coverage
              </p>
              <div className="space-y-1">
                <DemographicBar label="West Africa" value={d.demographics.region.west} color="#F5A623" />
                <DemographicBar label="North Africa" value={d.demographics.region.north} color="#00E5FF" />
                <DemographicBar label="East Africa" value={d.demographics.region.east} color="#E07A5F" />
                <DemographicBar label="Central Africa" value={d.demographics.region.central} color="#8B5CF6" />
              </div>
            </div>

            <div className="pt-4 border-t border-white/8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono text-[10px] text-text-tertiary uppercase tracking-widest mb-0.5">Last Audited</p>
                  <p className="text-text-secondary text-sm">{d.lastAudit}</p>
                </div>
                <a
                  href={d.hfLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] text-accent-ochre hover:opacity-75 transition-opacity border border-accent-ochre/30 rounded px-3 py-1.5 uppercase tracking-widest"
                >
                  HuggingFace →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
