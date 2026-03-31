'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const STEPS = [
  {
    number: '01',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" aria-hidden="true">
        <circle cx="20" cy="20" r="18" stroke="#F5A623" strokeWidth="1.5" strokeDasharray="4 2" />
        <path d="M13 20 Q20 12 27 20 Q20 28 13 20Z" stroke="#F5A623" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="20" cy="20" r="3" fill="#F5A623" />
        <path d="M20 8 L20 5M20 35 L20 32M8 20 L5 20M35 20 L32 20" stroke="#F5A623" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
    title: 'Receive a prompt',
    body: 'Lughatna sends you a short phrase or sentence in your native dialect — via SMS or the app. No internet required for offline-capable communities.',
  },
  {
    number: '02',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" aria-hidden="true">
        <circle cx="20" cy="20" r="18" stroke="#00E5FF" strokeWidth="1.5" />
        <rect x="11" y="14" width="18" height="12" rx="3" stroke="#00E5FF" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="3.5" fill="#00E5FF" fillOpacity="0.25" stroke="#00E5FF" strokeWidth="1.5" />
        <path d="M20 16.5 L20 14M20 26 L20 23.5" stroke="#00E5FF" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        <path d="M14 24 L11 28M26 24 L29 28" stroke="#00E5FF" strokeWidth="1" strokeLinecap="round" opacity="0.35" />
      </svg>
    ),
    title: 'Record or validate',
    body: 'Speak the phrase into your phone or validate another contributor\'s recording with a thumbs-up or flag. Every annotation is peer-reviewed for quality.',
  },
  {
    number: '03',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10" aria-hidden="true">
        <circle cx="20" cy="20" r="18" stroke="#E07A5F" strokeWidth="1.5" />
        <path d="M14 20 L18 24 L26 16" stroke="#E07A5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 10 L22 7 L24 10" stroke="#E07A5F" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        <rect x="18" y="27" width="4" height="6" rx="1" fill="#E07A5F" fillOpacity="0.3" stroke="#E07A5F" strokeWidth="1" />
        <path d="M15 30 L25 30" stroke="#E07A5F" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
    title: 'Get paid instantly',
    body: 'Once the community reaches consensus on your contribution, payment is released automatically via mobile money — M-Pesa, Wave, or Orange Money.',
  },
];

export function ContributorStepper() {
  const [visible, setVisible] = useState<boolean[]>([false, false, false]);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = STEPS.map((_, i) => {
      const el = refs.current[i];
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible((prev) => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
            obs.unobserve(el);
          }
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.18 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  return (
    <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
      {STEPS.map((step, i) => (
        <div
          key={step.number}
          ref={(el) => { refs.current[i] = el; }}
          className={cn(
            'glass-card p-8 flex flex-col gap-5 relative overflow-hidden',
            'transition-all duration-700',
            visible[i]
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          )}
          style={{ transitionDelay: `${i * 120}ms` }}
        >
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-[0.04]"
            style={{ background: i === 0 ? '#F5A623' : i === 1 ? '#00E5FF' : '#E07A5F', filter: 'blur(32px)', transform: 'translate(25%, -25%)' }}
            aria-hidden="true"
          />

          <div className="flex items-center justify-between">
            {step.icon}
            <span className="font-mono text-4xl font-bold text-ink-monument/8 select-none leading-none">
              {step.number}
            </span>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-text-primary mb-2">
              {step.title}
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              {step.body}
            </p>
          </div>

          <div className="mt-auto pt-4 border-t border-ink-monument/10">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary">
              {i === 0 ? 'PROMPT DELIVERY' : i === 1 ? 'CONTRIBUTION LAYER' : 'ESCROW RELEASE'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
