'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type LucideIcon, Mic, GraduationCap, Building2, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/lib/i18n/TranslationContext';

type PersonaId = 'contributor' | 'academic' | 'enterprise';

type FlowNode = {
  icon: string;
  labelKey: string;
};

type PersonaData = {
  id: PersonaId;
  labelKey: string;
  color: string;
  bgColor: string;
  borderColor: string;
  headlineKey: string;
  bodyKey: string;
  nodes: FlowNode[];
  guaranteesKey: string[];
};

const PERSONAS: PersonaData[] = [
  {
    id: 'contributor',
    labelKey: 'pact.matrix.tab.contributor',
    color: '#F5A623',
    bgColor: 'rgba(245,166,35,0.12)',
    borderColor: 'rgba(245,166,35,0.25)',
    headlineKey: 'pact.matrix.contributor.headline',
    bodyKey: 'pact.matrix.contributor.body',
    nodes: [
      { icon: '🎙️', labelKey: 'pact.matrix.contributor.node1' },
      { icon: '🔒', labelKey: 'pact.matrix.contributor.node2' },
      { icon: '📱', labelKey: 'pact.matrix.contributor.node3' },
    ],
    guaranteesKey: [
      'pact.matrix.contributor.g1',
      'pact.matrix.contributor.g2',
      'pact.matrix.contributor.g3',
    ],
  },
  {
    id: 'academic',
    labelKey: 'pact.matrix.tab.academic',
    color: '#00E5FF',
    bgColor: 'rgba(0,229,255,0.08)',
    borderColor: 'rgba(0,229,255,0.25)',
    headlineKey: 'pact.matrix.academic.headline',
    bodyKey: 'pact.matrix.academic.body',
    nodes: [
      { icon: '🗄️', labelKey: 'pact.matrix.academic.node1' },
      { icon: '🔑', labelKey: 'pact.matrix.academic.node2' },
      { icon: '🌍', labelKey: 'pact.matrix.academic.node3' },
    ],
    guaranteesKey: [
      'pact.matrix.academic.g1',
      'pact.matrix.academic.g2',
      'pact.matrix.academic.g3',
    ],
  },
  {
    id: 'enterprise',
    labelKey: 'pact.matrix.tab.enterprise',
    color: '#E07A5F',
    bgColor: 'rgba(224,122,95,0.08)',
    borderColor: 'rgba(224,122,95,0.25)',
    headlineKey: 'pact.matrix.enterprise.headline',
    bodyKey: 'pact.matrix.enterprise.body',
    nodes: [
      { icon: '🏢', labelKey: 'pact.matrix.enterprise.node1' },
      { icon: '💳', labelKey: 'pact.matrix.enterprise.node2' },
      { icon: '🤝', labelKey: 'pact.matrix.enterprise.node3' },
    ],
    guaranteesKey: [
      'pact.matrix.enterprise.g1',
      'pact.matrix.enterprise.g2',
      'pact.matrix.enterprise.g3',
    ],
  },
];

const TAB_ICONS: Record<PersonaId, LucideIcon> = {
  contributor: Mic,
  academic: GraduationCap,
  enterprise: Building2,
};

function AnimatedPath({ color }: { color: string }) {
  return (
    <div className="relative flex-1 h-px mx-1 overflow-hidden rounded-full" style={{ backgroundColor: `${color}20` }}>
      <motion.div
        className="absolute top-0 left-0 h-full w-1/2 rounded-full"
        style={{ backgroundColor: color }}
        animate={{ x: ['-100%', '200%'] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: 'linear' }}
        aria-hidden="true"
      />
    </div>
  );
}

function FlowNode({ icon, label, color }: { icon: string; label: string; color: string }) {
  return (
    <div className="flex flex-col items-center gap-2 z-10">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border"
        style={{ backgroundColor: `${color}10`, borderColor: `${color}30` }}
        aria-hidden="true"
      >
        {icon}
      </div>
      <span
        className="text-[10px] font-mono uppercase tracking-widest text-center leading-tight max-w-[80px]"
        style={{ color }}
      >
        {label}
      </span>
    </div>
  );
}

export function DataPactMatrix() {
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);
  const [active, setActive] = useState<PersonaId>('enterprise');
  const tabRefs = useRef<Record<PersonaId, HTMLButtonElement | null>>({ contributor: null, academic: null, enterprise: null });

  useEffect(() => { setIsMounted(true); }, []);

  const handleTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, id: PersonaId) => {
    const ids = PERSONAS.map((p) => p.id);
    const idx = ids.indexOf(id);
    if (e.key === 'ArrowRight') {
      const next = ids[(idx + 1) % ids.length];
      setActive(next);
      tabRefs.current[next]?.focus();
    } else if (e.key === 'ArrowLeft') {
      const prev = ids[(idx - 1 + ids.length) % ids.length];
      setActive(prev);
      tabRefs.current[prev]?.focus();
    }
  };
  if (!isMounted) return null;

  const persona = PERSONAS.find((p) => p.id === active)!;
  const TabIcon = TAB_ICONS[active];

  return (
    <div className="w-full glass-card overflow-hidden">
      <div className="px-6 pt-6 pb-5 border-b border-white/8">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary mb-1">
          {t('pact.matrix.eyebrow', 'Interactive Data Flow Matrix')}
        </p>
        <p className="text-text-secondary text-sm max-w-2xl">
          {t('pact.matrix.subtitle', 'Select your role to see exactly how data and capital flow through the Locale Data Pact ecosystem.')}
        </p>
      </div>

      <div className="p-6 md:p-8">
        <div
          className="flex rounded-xl overflow-hidden border border-white/10 bg-brand-elevated mb-8 w-full"
          role="tablist"
          aria-label={t('pact.matrix.tablist_aria', 'Select persona')}
        >
          {PERSONAS.map((p) => {
            const Icon = TAB_ICONS[p.id];
            const isActive = active === p.id;
            return (
              <button
                key={p.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`pact-panel-${p.id}`}
                ref={(el) => { tabRefs.current[p.id] = el; }}
                onClick={() => setActive(p.id)}
                onKeyDown={(e) => handleTabKeyDown(e, p.id)}
                aria-label={t(p.labelKey)}
                tabIndex={isActive ? 0 : -1}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 py-3 px-3 text-xs sm:text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-cyan',
                )}
                style={isActive
                  ? { backgroundColor: p.bgColor, color: p.color }
                  : { color: '#52525B' }
                }
              >
                <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span className="sr-only sm:not-sr-only sm:inline">{t(p.labelKey)}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            id={`pact-panel-${active}`}
            role="tabpanel"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="flex items-center justify-center gap-3 mb-10 flex-wrap sm:flex-nowrap">
              {persona.nodes.map((node, i) => (
                <div key={node.labelKey} className="flex items-center gap-3">
                  <FlowNode
                    icon={node.icon}
                    label={t(node.labelKey)}
                    color={persona.color}
                  />
                  {i < persona.nodes.length - 1 && (
                    <AnimatedPath color={persona.color} />
                  )}
                </div>
              ))}
            </div>

            <div
              className="rounded-2xl p-6 border"
              style={{ backgroundColor: persona.bgColor, borderColor: persona.borderColor }}
            >
              <div className="flex items-start gap-3 mb-3">
                <TabIcon className="w-5 h-5 mt-0.5 shrink-0" style={{ color: persona.color }} aria-hidden="true" />
                <h3
                  className="text-lg font-bold leading-snug"
                  style={{ color: persona.color }}
                >
                  {t(persona.headlineKey)}
                </h3>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed mb-5">
                {t(persona.bodyKey)}
              </p>
              <ul className="grid sm:grid-cols-3 gap-3">
                {persona.guaranteesKey.map((gk) => (
                  <li key={gk} className="flex items-start gap-2 text-text-secondary text-xs">
                    <ArrowRight className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: persona.color }} aria-hidden="true" />
                    {t(gk)}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
