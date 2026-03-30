'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Building, GraduationCap, Code, Mic, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlowButton } from '@/components/ui/glow-button';

const PERSONAS = [
  {
    id: 'researcher',
    label: 'As a Researcher',
    icon: GraduationCap,
    audience: 'Researchers & Engineers',
    title: 'AIxLanguage Fellowship',
    description:
      'A fully-funded 12-month program for African researchers and engineers to specialize in NLP and language AI. Work alongside leading practitioners, publish open research, and receive career support after the fellowship.',
    benefits: [
      'Monthly stipend plus hardware allowance',
      'Mentorship from leading NLP researchers',
      'Peer-reviewed publication support',
      'Network access and direct job placement',
    ],
    cta: { label: 'Apply for Fellowship', href: '#contact' },
  },
  {
    id: 'developer',
    label: 'As a Developer',
    icon: Code,
    audience: 'Developers',
    title: 'Open Source Contributor',
    description:
      'Help build the next generation of African language models. All skill levels are welcome — from first-time open-source contributors to experienced ML engineers. Work on meaningful problems with real-world deployment.',
    benefits: [
      'Work on high-impact NLP projects',
      'Learn from domain experts and researchers',
      'Build a portfolio of production-level work',
      'Join a global contributor community',
    ],
    cta: { label: 'View Open Issues', href: 'https://github.com/localenlp' },
  },
  {
    id: 'community',
    label: 'As a Community Member',
    icon: Mic,
    audience: 'Community Members',
    title: 'Community Data Contributor',
    description:
      'Help preserve your language by contributing speech and text data. No technical skills required — just your voice and knowledge. Contributors are compensated fairly and retain moral rights over their linguistic heritage.',
    benefits: [
      'Fair compensation per recording session',
      'Fully remote and flexible scheduling',
      'Preserve your language for future generations',
      'No technical background required',
    ],
    cta: { label: 'Start Contributing', href: '#contact' },
  },
  {
    id: 'partner',
    label: 'As a Partner',
    icon: Building,
    audience: 'Organizations & NGOs',
    title: 'Partner With Us',
    description:
      'Join our network of research institutions, governments, and civil-society organizations building language technology across Africa. Access our open APIs, co-publish research, and deliver measurable impact in your target communities.',
    benefits: [
      'Full access to open models and APIs',
      'Joint research and publication opportunities',
      'Impact reporting and co-branding',
      'Technical support and onboarding',
    ],
    cta: { label: 'Apply for Partnership', href: '#contact' },
  },
];

const APPLE_EASE = [0.16, 1, 0.3, 1] as const;

export function PersonaSwitcher() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const shouldReduceMotion = useReducedMotion();
  const persona = PERSONAS[active];
  const Icon = persona.icon;

  const switchTo = (i: number) => {
    setDirection(i > active ? 1 : -1);
    setActive(i);
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Participation pathways"
        className="relative flex flex-wrap gap-2 mb-10"
      >
        {PERSONAS.map((p, i) => (
          <button
            key={p.id}
            role="tab"
            aria-selected={active === i}
            aria-controls={`panel-${p.id}`}
            id={`tab-${p.id}`}
            onClick={() => switchTo(i)}
            className={cn(
              'relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 z-10',
              'border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ochre',
              active === i
                ? 'border-accent-ochre/40 text-accent-ochre'
                : 'bg-transparent border-white/10 text-text-secondary hover:border-white/20 hover:text-text-primary'
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
            {p.label}
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

              <GlowButton href={persona.cta.href} variant="primary">
                {persona.cta.label}
              </GlowButton>
            </div>

            <div>
              <p className="font-mono text-xs tracking-widest uppercase text-text-tertiary mb-4">
                [ WHAT YOU GET ]
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
