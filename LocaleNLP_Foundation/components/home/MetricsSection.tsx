'use client';

import { useEffect, useRef, useState } from 'react';
import { MonoLabel } from '@/components/ui/mono-label';

interface Metric {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
}

const METRICS: Metric[] = [
  { value: 2000, suffix: '+', label: 'African Languages' },
  { value: 500, suffix: 'M+', label: 'Speakers Underserved' },
  { value: 47, suffix: '', label: 'Languages Supported' },
  { value: 1, suffix: '%', prefix: '< ', label: 'of AI Training Data' },
];

function Counter({
  target,
  suffix,
  prefix = '',
  duration = 2200,
  start,
}: {
  target: number;
  suffix: string;
  prefix?: string;
  duration?: number;
  start: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      setCount(target);
      return;
    }

    let rafId: number;
    let startTime: number | null = null;

    const step = (ts: number) => {
      if (startTime === null) startTime = ts;
      const elapsed = ts - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [start, target, duration]);

  return (
    <span>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function MetricsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden bg-base-paper border-t border-ink-monument/8">
      <div className="container-wide section-padding relative z-10">
        <div className="text-center mb-4">
          <MonoLabel label="BY THE NUMBERS" number="04" status="active" />
        </div>
        <h2 className="text-center text-ink-monument mt-4 mb-3">Measuring Our Impact</h2>
        <p className="text-center text-ink-steel max-w-xl mx-auto mb-14">
          Real progress, transparent reporting. Every metric represents lives touched and
          communities empowered.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {METRICS.map((metric, i) => (
            <div key={i} className="glass-card p-6 md:p-8 text-center shadow-editorial">
              <div className="font-mono text-3xl md:text-4xl font-bold text-accent-ochre">
                <Counter
                  target={metric.value}
                  suffix={metric.suffix}
                  prefix={metric.prefix}
                  start={started}
                />
              </div>
              <p className="text-sm md:text-base text-ink-steel mt-2">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
