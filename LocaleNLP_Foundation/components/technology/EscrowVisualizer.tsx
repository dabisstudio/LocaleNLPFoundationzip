'use client';

import { useState } from 'react';
import { Lock, Building2, ArrowRight } from 'lucide-react';

type Persona = 'contributor' | 'enterprise';

const CONTRIBUTOR_STEPS = [
  {
    id: 'record',
    label: 'Voice Recording',
    desc: 'Contributor records in native dialect via Lughatna app',
    color: '#F5A623',
    icon: '🎙',
  },
  {
    id: 'encrypt',
    label: 'Cryptographic Hash',
    desc: 'SHA-256 hash generated on-device. Raw audio never leaves your control.',
    color: '#00E5FF',
    icon: '🔐',
  },
  {
    id: 'vault',
    label: 'Secure Vault',
    desc: 'Anonymised record stored in encrypted community data vault. PII stripped.',
    color: '#8B5CF6',
    icon: '🏛',
  },
  {
    id: 'consensus',
    label: 'Consensus Validation',
    desc: 'Min. 3 peers validate. Community retains full moral rights.',
    color: '#E07A5F',
    icon: '✅',
  },
  {
    id: 'payout',
    label: 'Mobile Money Payout',
    desc: 'Instant payment upon consensus. M-Pesa, Orange Money, Wave.',
    color: '#4ADE80',
    icon: '💸',
  },
];

const ENTERPRISE_STEPS = [
  {
    id: 'request',
    label: 'License Request',
    desc: 'Commercial entity submits API licence application and use-case declaration.',
    color: '#00E5FF',
    icon: '📋',
  },
  {
    id: 'review',
    label: 'Ethics Review',
    desc: 'LocaleNLP governance board reviews use-case against community consent scope.',
    color: '#F5A623',
    icon: '⚖️',
  },
  {
    id: 'pipeline',
    label: 'API Access Granted',
    desc: 'Read-only access to validated dataset via rate-limited commercial endpoint.',
    color: '#8B5CF6',
    icon: '🔌',
  },
  {
    id: 'fee',
    label: 'Licensing Fee',
    desc: 'Usage-based commercial licence fee collected per API call volume.',
    color: '#E07A5F',
    icon: '💳',
  },
  {
    id: 'reinvest',
    label: 'Fellowship Reinvestment',
    desc: '60% of net licensing revenue returns to Lughatna contributor payouts and fellowships.',
    color: '#4ADE80',
    icon: '♻️',
  },
];

function FlowStep({
  step,
  index,
  total,
  visible,
}: {
  step: { id: string; label: string; desc: string; color: string; icon: string };
  index: number;
  total: number;
  visible: boolean;
}) {
  return (
    <div
      className="flex items-start gap-0 group"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: `opacity 0.35s ease ${index * 80}ms, transform 0.35s ease ${index * 80}ms`,
      }}
    >
      <div className="flex flex-col items-center mr-4 shrink-0">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 border"
          style={{
            backgroundColor: `${step.color}12`,
            borderColor: `${step.color}30`,
          }}
          aria-hidden="true"
        >
          {step.icon}
        </div>
        {index < total - 1 && (
          <div
            className="w-px flex-1 mt-2 mb-2"
            style={{
              minHeight: '28px',
              backgroundColor: `${step.color}30`,
            }}
            aria-hidden="true"
          />
        )}
      </div>
      <div className="pb-5 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="font-mono text-[10px] uppercase tracking-widest"
            style={{ color: step.color }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <p className="text-text-primary text-sm font-semibold leading-snug">{step.label}</p>
        </div>
        <p className="text-text-secondary text-xs leading-relaxed">{step.desc}</p>
      </div>
    </div>
  );
}

export function EscrowVisualizer() {
  const [persona, setPersona] = useState<Persona>('contributor');
  const [visible, setVisible] = useState(true);

  function switchPersona(p: Persona) {
    if (p === persona) return;
    setVisible(false);
    setTimeout(() => {
      setPersona(p);
      setVisible(true);
    }, 220);
  }

  const steps = persona === 'contributor' ? CONTRIBUTOR_STEPS : ENTERPRISE_STEPS;

  const summaryText =
    persona === 'contributor'
      ? 'Your voice data is encrypted, anonymised, and vaulted. You retain moral rights. You get paid.'
      : 'Commercial access is gated by ethics review. Licence fees flow directly back to community contributors.';

  const summaryColor = persona === 'contributor' ? '#F5A623' : '#00E5FF';

  return (
    <div className="glass-card overflow-hidden">
      <div className="px-6 pt-6 pb-5 border-b border-white/8">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary mb-1">
          Data Escrow & Licensing — Select your perspective
        </p>
        <p className="text-text-secondary text-sm">
          Community ownership visualised. Zero opacity — this is how your data actually moves.
        </p>
      </div>

      <div className="p-6 md:p-8">
        <div className="flex rounded-xl overflow-hidden border border-white/10 bg-brand-elevated mb-8 w-full max-w-md">
          <button
            type="button"
            onClick={() => switchPersona('contributor')}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium transition-all duration-200"
            style={persona === 'contributor'
              ? { backgroundColor: 'rgba(245,166,35,0.15)', color: '#F5A623' }
              : { color: '#52525B' }}
            aria-pressed={persona === 'contributor'}
          >
            <Lock className="w-4 h-4" aria-hidden="true" />
            I am a Contributor
          </button>
          <button
            type="button"
            onClick={() => switchPersona('enterprise')}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium transition-all duration-200"
            style={persona === 'enterprise'
              ? { backgroundColor: 'rgba(0,229,255,0.12)', color: '#00E5FF' }
              : { color: '#52525B' }}
            aria-pressed={persona === 'enterprise'}
          >
            <Building2 className="w-4 h-4" aria-hidden="true" />
            I am a Commercial Enterprise
          </button>
        </div>

        <div className="grid lg:grid-cols-[1fr_280px] gap-8 items-start">
          <div>
            {steps.map((step, i) => (
              <FlowStep
                key={`${persona}-${step.id}`}
                step={step}
                index={i}
                total={steps.length}
                visible={visible}
              />
            ))}
          </div>

          <div
            className="rounded-2xl p-6 border sticky top-24"
            style={{
              backgroundColor: `${summaryColor}08`,
              borderColor: `${summaryColor}25`,
              opacity: visible ? 1 : 0,
              transition: 'opacity 0.35s ease',
            }}
          >
            <p
              className="font-mono text-[10px] uppercase tracking-widest mb-4"
              style={{ color: summaryColor }}
            >
              {persona === 'contributor' ? 'Your Guarantees' : 'Commercial Terms'}
            </p>
            <p className="text-text-primary text-sm leading-relaxed mb-5">{summaryText}</p>

            {persona === 'contributor' ? (
              <ul className="space-y-3">
                {[
                  'Full data anonymisation before storage',
                  'Revoke consent at any time',
                  'Community retains moral rights',
                  'Instant mobile money payment',
                ].map((g) => (
                  <li key={g} className="flex items-center gap-2 text-text-secondary text-xs">
                    <ArrowRight className="w-3 h-3 shrink-0" style={{ color: summaryColor }} aria-hidden="true" />
                    {g}
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="space-y-3">
                {[
                  'Ethics board review required',
                  'Read-only API access only',
                  'Usage-based licensing tiers',
                  '60% of fees fund contributors',
                  'Annual compliance reporting',
                ].map((g) => (
                  <li key={g} className="flex items-center gap-2 text-text-secondary text-xs">
                    <ArrowRight className="w-3 h-3 shrink-0" style={{ color: summaryColor }} aria-hidden="true" />
                    {g}
                  </li>
                ))}
              </ul>
            )}

            <div
              className="mt-6 pt-4 border-t"
              style={{ borderColor: `${summaryColor}20` }}
            >
              <a
                href="/ethics"
                className="font-mono text-[10px] uppercase tracking-widest hover:opacity-75 transition-opacity flex items-center gap-1.5"
                style={{ color: summaryColor }}
              >
                View Governance Hub
                <ArrowRight className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
