'use client';

import { useEffect, useRef } from 'react';
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

export default function ProblemSectionGSAP() {
  const sectionRef = useRef<HTMLElement>(null);
  const statRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const setup = async () => {
      const gsapModule = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      const gsap = gsapModule.default ?? gsapModule.gsap ?? gsapModule;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        if (prefersReduced) return;

        // Scrub the <1% stat from small to full size
        if (statRef.current) {
          const bigNum = statRef.current.querySelector('.stat-number');
          if (bigNum) {
            gsap.fromTo(
              bigNum,
              { scale: 0.4, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: statRef.current,
                  start: 'top 80%',
                  end: 'center 50%',
                  scrub: 0.8,
                },
              }
            );
          }

          // Sub-text fades in after scale reaches ~1
          const subText = statRef.current.querySelector('.stat-subtext');
          if (subText) {
            gsap.fromTo(
              subText,
              { opacity: 0, y: 12 },
              {
                opacity: 1,
                y: 0,
                ease: 'none',
                scrollTrigger: {
                  trigger: statRef.current,
                  start: 'center 60%',
                  end: 'bottom 40%',
                  scrub: 0.6,
                },
              }
            );
          }
        }

        // Stagger callout cards
        if (cardsRef.current) {
          const cards = cardsRef.current.querySelectorAll('.callout-card');
          gsap.fromTo(
            cards,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.12,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: cardsRef.current,
                start: 'top 82%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      }, sectionRef);

      return () => ctx.revert();
    };

    let cleanup: (() => void) | undefined;
    setup().then((fn) => { cleanup = fn; });
    return () => { cleanup?.(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #04040A 0%, #060610 100%)' }}
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

        <h2 className="text-center text-white mt-4 mb-2">A Continent Left Behind</h2>

        <div
          ref={statRef}
          className="text-center my-14"
          aria-label="Less than 1 percent of global AI training data represents Africa"
        >
          <p className="stat-subtext font-mono text-xs text-text-tertiary tracking-widest uppercase mb-5">
            of global AI training data represents Africa
          </p>
          <span
            className="stat-number block font-mono font-bold text-accent-ochre leading-none select-none"
            style={{ fontSize: 'clamp(5rem, 18vw, 13rem)' }}
            aria-hidden="true"
          >
            &lt;&nbsp;1%
          </span>
          <p className="stat-subtext text-text-secondary text-base md:text-lg mt-6 max-w-xl mx-auto">
            While AI reshapes how the world communicates and accesses services, Africa&apos;s 2,000+
            languages remain almost entirely absent from the datasets driving the revolution.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-5">
          {CALLOUT_CARDS.map((card, i) => (
            <div key={i} className="callout-card glass-panel rounded-xl p-6">
              <div className={`font-mono text-3xl md:text-4xl font-bold ${card.color} mb-3`}>
                {card.stat}
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
