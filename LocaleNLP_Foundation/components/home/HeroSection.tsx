'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Play } from 'lucide-react';
import { MonoLabel } from '@/components/ui/mono-label';
import { GlowButton } from '@/components/ui/glow-button';

const LINE1 = ['Every', 'African', 'Language'];
const LINE2 = ['Deserves', 'a', 'Digital', 'Future'];

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

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Placeholder slot for Three.js particle background (Task #5) */}
      <div id="hero-canvas" className="absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Ochre radial glow behind headline */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 50% 42%, rgba(245,166,35,0.08) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Grid texture */}
      <div className="absolute inset-0 grid-lines pointer-events-none opacity-40" aria-hidden="true" />

      <div className="relative z-10 container-wide section-padding pt-28 pb-20 text-center">
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : 0.1 }}
          className="mb-8 flex justify-center"
        >
          <MonoLabel label="DIGITAL SOVEREIGNTY" status="active" />
        </motion.div>

        <h1 className="mb-6">
          {/* Line 1 — white, word-level stagger */}
          <span className="block">
            {LINE1.map((word, i) => (
              <motion.span
                key={word + i}
                initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : wordSpring(0.2 + i * 0.07)}
                className="inline-block mr-[0.28em] text-white"
              >
                {word}
              </motion.span>
            ))}
          </span>

          {/* Line 2 — gradient per-word: inline styles bypass bg-clip-text + stacking-context conflict */}
          <span className="block">
            {LINE2.map((word, i) => (
              <motion.span
                key={word + i}
                initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : wordSpring(0.2 + (LINE1.length + i) * 0.07)
                }
                className="inline-block mr-[0.28em] last:mr-0"
                style={{
                  background: 'linear-gradient(90deg, #F5A623, #E07A5F, #00E5FF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
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
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10"
        >
          We are building the language technology that will give over 2,000 African languages a
          voice in the AI revolution. Because digital sovereignty starts with your mother tongue.
        </motion.p>

        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.82 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <GlowButton href="/programs" variant="primary">
            Explore Our Work
          </GlowButton>
          <GlowButton href="/about" variant="ghost" showArrow={false}>
            <Play className="w-4 h-4 shrink-0" aria-hidden="true" />
            Watch Our Story
          </GlowButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2" aria-hidden="true">
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5"
        >
          <div className="w-1 h-2.5 rounded-full bg-white/40" />
        </motion.div>
      </div>
    </section>
  );
}
