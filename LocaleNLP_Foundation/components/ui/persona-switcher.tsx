'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Building, GraduationCap, Code, Mic, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlowButton } from '@/components/ui/glow-button';
import { useTranslation } from '@/lib/i18n/TranslationContext';

const PERSONA_IDS = ['researcher', 'developer', 'community', 'partner'] as const;
type PersonaId = typeof PERSONA_IDS[number];

const PERSONA_ICONS: Record<PersonaId, React.ComponentType<{ className?: string }>> = {
  researcher: GraduationCap,
  developer: Code,
  community: Mic,
  partner: Building,
};

const PERSONA_HREFS: Record<PersonaId, string> = {
  researcher: '#contact',
  developer: 'https://github.com/localenlp',
  community: '#contact',
  partner: '#contact',
};

const APPLE_EASE = [0.16, 1, 0.3, 1] as const;

export function PersonaSwitcher() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const shouldReduceMotion = useReducedMotion();
  const { t } = useTranslation();

  const personaId = PERSONA_IDS[active];
  const Icon = PERSONA_ICONS[personaId];

  const switchTo = (i: number) => {
    setDirection(i > active ? 1 : -1);
    setActive(i);
  };

  const persona = {
    id: personaId,
    label: t(`persona.${personaId}.label`, personaId),
    audience: t(`persona.${personaId}.audience`, personaId),
    title: t(`persona.${personaId}.title`, personaId),
    description: t(`persona.${personaId}.desc`, personaId),
    benefits: [
      t(`persona.${personaId}.benefit1`, ''),
      t(`persona.${personaId}.benefit2`, ''),
      t(`persona.${personaId}.benefit3`, ''),
      t(`persona.${personaId}.benefit4`, ''),
    ].filter(Boolean),
    ctaLabel: t(`persona.${personaId}.cta`, personaId),
    ctaHref: PERSONA_HREFS[personaId],
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label={t('persona.tab_aria', 'Participation pathways')}
        className="relative flex flex-wrap gap-2 mb-10"
      >
        {PERSONA_IDS.map((pid, i) => (
          <button
            key={pid}
            role="tab"
            aria-selected={active === i}
            aria-controls={`panel-${pid}`}
            id={`tab-${pid}`}
            onClick={() => switchTo(i)}
            className={cn(
              'relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 z-10',
              'border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ochre',
              active === i
                ? 'border-accent-ochre/40 text-accent-ochre'
                : 'bg-transparent border-ink-monument/12 text-text-secondary hover:border-ink-monument/20 hover:text-text-primary'
            )}
          >
            {active === i && (
              <motion.span
                layoutId="persona-tab-bg"
                className="absolute inset-0 rounded-lg bg-accent-ochre/10"
                style={{ zIndex: -1 }}
                transition={shouldReduceMotion ? { duration: 0 } : { type: 'spring', damping: 28, stiffness: 320 }}
              />
            )}
            {t(`persona.${pid}.label`, pid)}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`panel-${persona.id}`}
        aria-labelledby={`tab-${persona.id}`}
        className="glass-card p-8 md:p-10 overflow-hidden"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={persona.id}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * -20 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.28, ease: APPLE_EASE }}
            className="grid md:grid-cols-2 gap-8 items-start"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent-ochre/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-accent-ochre" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-mono text-xs tracking-widest uppercase text-text-tertiary">
                    {persona.audience}
                  </p>
                  <h3 className="font-display text-xl font-semibold text-text-primary">
                    {persona.title}
                  </h3>
                </div>
              </div>

              <p className="text-text-secondary leading-relaxed mb-6">{persona.description}</p>

              <GlowButton href={persona.ctaHref} variant="primary">
                {persona.ctaLabel}
              </GlowButton>
            </div>

            <div>
              <p className="font-mono text-xs tracking-widest uppercase text-text-tertiary mb-4">
                {t('persona.what_you_get', '[ WHAT YOU GET ]')}
              </p>
              <ul className="space-y-3">
                {persona.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle
                      className="w-4 h-4 text-accent-ochre mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-text-secondary text-sm leading-relaxed">{benefit}</span>
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
