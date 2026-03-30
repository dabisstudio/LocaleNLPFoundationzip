'use client';
import { useEffect, useRef, useState } from 'react';

function parseValue(val: string): { num: number; prefix: string; suffix: string } | null {
  const match = val.match(/^([^0-9]*)([0-9,]+)([^0-9]*)$/);
  if (!match) return null;
  const num = parseInt(match[2].replace(/,/g, ''), 10);
  if (isNaN(num)) return null;
  return { num, prefix: match[1], suffix: match[3] };
}

function formatNum(n: number): string {
  return n.toLocaleString('en-US');
}

interface AnimatedCounterProps {
  value: string;
  label: string;
  className?: string;
}

export function AnimatedCounter({ value, label, className = '' }: AnimatedCounterProps) {
  const [displayed, setDisplayed] = useState(value);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const parsed = parseValue(value);
    if (!parsed) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 1800;
          const start = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * parsed.num);
            setDisplayed(`${parsed.prefix}${formatNum(current)}${parsed.suffix}`);
            if (progress < 1) requestAnimationFrame(animate);
            else setDisplayed(value);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    const el = ref.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className={`stat-card ${className}`}>
      <div className="stat-number" aria-label={value}>
        {displayed}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
