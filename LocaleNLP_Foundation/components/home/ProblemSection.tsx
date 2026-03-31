'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { MonoLabel } from '@/components/ui/mono-label';

const CALLOUT_CARDS = [
  {
    stat: '2,000+',
    description: "African languages invisible to today's AI systems and training pipelines.",
    color: 'text-accent-ochre',
  },
  {
    stat: '500M+',
    description: 'speakers excluded from digital services, healthcare, and education in their mother tongue.',
    color: 'text-accent-clay',
  },
  {
    stat: '90%',
    description: 'of voice AI systems cannot reliably understand or generate African language speech.',
    color: 'text-accent-cyan',
  },
];

export default function ProblemSection() {
  const statRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(statRef, { once: true, margin: '-80px' });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #F5F5F3 0%, #FAFAFA 100%)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 25% 55%, rgba(107,31,119,0.06) 0%, transparent 50%)',
        }}
        aria-hidden="true"
      />

      <div className="container-wide section-padding relative z-10">
        <div className="text-center mb-4">
          <MonoLabel label="THE CHALLENGE" number="01" status="active" />
        </div>

        <h2 className="text-center text-ink-monument mt-4 mb-2">A Continent Left Behind</h2>

        {/* Large < 1% stat reveal */}
        <motion.div
          ref={statRef}
          initial={
            shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.55 }
          }
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ type: 'spring', damping: 22, stiffness: 140 }}
          className="text-center my-14"
          aria-label="Less than 1 percent of global AI training data represents Africa"
        >
          <p className="font-mono text-xs text-text-tertiary tracking-widest uppercase mb-5">
            of global AI training data represents Africa
          </p>
          <span
            className="block font-mono font-bold text-accent-ochre leading-none select-none"
            style={{ fontSize: 'clamp(5rem, 18vw, 13rem)' }}
            aria-hidden="true"
          >
            &lt;&nbsp;1%
          </span>
          <p className="text-text-secondary text-base md:text-lg mt-6 max-w-xl mx-auto">
            While AI reshapes how the world communicates and accesses services, Africa&apos;s 2,000+
            languages remain almost entirely absent from the datasets driving the revolution.
          </p>
        </motion.div>

        {/* Three callout cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {CALLOUT_CARDS.map((card, i) => (
            <motion.div
              key={i}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel rounded-xl p-6"
            >
              <div className={`font-mono text-3xl md:text-4xl font-bold ${card.color} mb-3`}>
                {card.stat}
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
