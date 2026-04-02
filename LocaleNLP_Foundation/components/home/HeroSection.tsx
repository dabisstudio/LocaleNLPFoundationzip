'use client';

import { motion, useReducedMotion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Play } from 'lucide-react';
import { MonoLabel } from '@/components/ui/mono-label';
import { GlowButton } from '@/components/ui/glow-button';
import { useTranslation } from '@/lib/i18n/TranslationContext';
import { BrandPattern } from '@/components/ui/BrandPattern';

const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false });

function wordSpring(delay: number) {
  return {
    type: 'spring' as const,
    damping: 25,
    stiffness: 200,
    delay,
  };
}

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useTranslation();

  const line1 = t('hero.headline_line1', 'Every African Language').split(' ');
  const line2 = t('hero.headline_line2', 'Deserves a Digital Future').split(' ');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-base-stone">
      {!shouldReduceMotion && (
        <HeroCanvas className="pointer-events-none opacity-60" />
      )}

      {/* Subtle grid texture */}
      <div className="absolute inset-0 grid-lines pointer-events-none opacity-50" aria-hidden="true" />
      
      {/* Interactive Brand Spotlight (Interactive Pattern) */}
      <BrandPattern variant="interactive" />

      <div className="relative z-10 container-wide section-padding pt-28 pb-20 text-center">
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : 0.1 }}
          className="mb-8 flex justify-center"
        >
          <MonoLabel label={t('hero.label', 'DIGITAL SOVEREIGNTY')} status="active" />
        </motion.div>

        <h1 className="mb-6 font-display font-bold leading-[0.92] tracking-[-0.04em] text-5xl md:text-7xl lg:text-8xl xl:text-[8rem]">
          {/* Line 1 — Monument Black */}
          <span className="block">
            {line1.map((word, i) => (
              <motion.span
                key={word + i}
                initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : wordSpring(0.2 + i * 0.07)}
                className="inline-block mr-[0.22em] text-ink-monument"
              >
                {word}
              </motion.span>
            ))}
          </span>

          {/* Line 2 — Sovereign Ochre accent */}
          <span className="block">
            {line2.map((word, i) => (
              <motion.span
                key={word + i}
                initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : wordSpring(0.2 + (line1.length + i) * 0.07)
                }
                className="inline-block mr-[0.22em] last:mr-0 text-ink-steel"
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-ink-steel max-w-2xl mx-auto mb-10"
        >
          {t('hero.subheadline', 'We are building the language technology that will give over 2,000 African languages a voice in the AI revolution. Because digital sovereignty starts with your mother tongue.')}
        </motion.p>

        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.82 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <GlowButton href="/programs" variant="primary">
            {t('hero.cta_primary', 'Explore Our Work')}
          </GlowButton>
          <GlowButton href="/about" variant="ghost" showArrow={false}>
            <Play className="w-4 h-4 shrink-0" aria-hidden="true" />
            {t('hero.cta_secondary', 'Watch Our Story')}
          </GlowButton>
        </motion.div>

        {/* Live ledger strip */}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: shouldReduceMotion ? 0 : 1.1 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 border-t border-ink-monument/10 pt-8"
        >
          {[
            { value: '2,000+', label: 'languages' },
            { value: '47', label: 'countries' },
            { value: '500M+', label: 'speakers served' },
            { value: '$0', label: 'paywalls' },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="font-mono text-xl font-bold text-accent-ochre">{item.value}</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-ink-muted mt-0.5">{item.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2" aria-hidden="true">
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-ink-monument/20 flex items-start justify-center p-1.5"
        >
          <div className="w-1 h-2.5 rounded-full bg-ink-monument/30" />
        </motion.div>
      </div>
    </section>
  );
}
