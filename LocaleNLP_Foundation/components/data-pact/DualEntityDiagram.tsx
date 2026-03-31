'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/TranslationContext';

type LoopNode = { label: string; color: string };

function OrbitalDot({ color, duration, delay, radius }: { color: string; duration: number; delay: number; radius: number }) {
  return (
    <motion.div
      className="absolute w-2.5 h-2.5 rounded-full"
      style={{ backgroundColor: color, top: '50%', left: '50%', marginTop: -5, marginLeft: -5 }}
      animate={{
        x: [radius, 0, -radius, 0, radius],
        y: [0, -radius * 0.5, 0, radius * 0.5, 0],
      }}
      transition={{ repeat: Infinity, duration, delay, ease: 'linear' }}
      aria-hidden="true"
    />
  );
}

function LoopCard({
  titleKey,
  nodes,
  color,
  side,
}: {
  titleKey: string;
  nodes: LoopNode[];
  color: string;
  side: 'left' | 'right';
}) {
  const { t } = useTranslation();
  return (
    <div
      className="relative flex-1 rounded-2xl border p-5 flex flex-col gap-3 overflow-hidden"
      style={{ borderColor: `${color}25`, backgroundColor: `${color}06` }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background: side === 'left'
            ? `radial-gradient(ellipse 80% 60% at 20% 50%, ${color}30, transparent 70%)`
            : `radial-gradient(ellipse 80% 60% at 80% 50%, ${color}30, transparent 70%)`,
        }}
      />
      <p className="font-mono text-[10px] uppercase tracking-widest relative z-10" style={{ color }}>
        {t(titleKey)}
      </p>
      <div className="space-y-2 relative z-10">
        {nodes.map((node, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: node.color }} aria-hidden="true" />
            <span className="text-text-secondary text-xs">{node.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DualEntityDiagram() {
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);

  const foundationNodes: LoopNode[] = [
    { label: t('pact.dual.foundation.n1', 'Philanthropy & Grants'), color: '#00E5FF' },
    { label: t('pact.dual.foundation.n2', 'Community Collection'), color: '#F5A623' },
    { label: t('pact.dual.foundation.n3', 'Open Data Release'), color: '#4ADE80' },
  ];

  const forProfitNodes: LoopNode[] = [
    { label: t('pact.dual.forprofit.n1', 'API Licensing Revenue'), color: '#E07A5F' },
    { label: t('pact.dual.forprofit.n2', 'Enterprise Contracts'), color: '#A78BFA' },
    { label: t('pact.dual.forprofit.n3', 'Venture Capital'), color: '#00E5FF' },
  ];

  return (
    <div className="glass-card overflow-hidden">
      <div className="px-6 pt-6 pb-5 border-b border-white/8">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary mb-1">
          {t('pact.dual.eyebrow', 'Dual-Entity Structure')}
        </p>
        <p className="text-text-secondary text-sm max-w-2xl">
          {t('pact.dual.subtitle', 'The Foundation guards ethics and community ownership. The For-Profit scales the commercial infrastructure. A royalty bridge connects them permanently.')}
        </p>
      </div>

      <div className="p-6 md:p-8">
        <div className="flex flex-col sm:flex-row items-stretch gap-4">
          <LoopCard
            titleKey="pact.dual.foundation.title"
            nodes={foundationNodes}
            color="#00E5FF"
            side="left"
          />

          <div className="flex flex-col items-center justify-center gap-3 shrink-0 px-2 py-4 sm:py-0">
            {isMounted && (
              <div className="relative w-20 h-20">
                <div
                  className="absolute inset-0 rounded-full border-2"
                  style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                  aria-hidden="true"
                />
                <OrbitalDot color="#00E5FF" duration={3.2} delay={0} radius={30} />
                <OrbitalDot color="#F5A623" duration={3.2} delay={1.6} radius={30} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-10 h-10 rounded-full border-2 flex items-center justify-center"
                    style={{ borderColor: 'rgba(255,255,255,0.15)', backgroundColor: 'rgba(255,255,255,0.04)' }}
                  >
                    <span className="text-xs text-white/60" aria-hidden="true">⚖️</span>
                  </div>
                </div>
              </div>
            )}
            <div className="text-center max-w-[120px]">
              <p className="text-white text-[10px] font-bold uppercase tracking-wider leading-snug">
                {t('pact.dual.bridge.title', 'Ethics Firewall')}
              </p>
              <p className="text-text-tertiary text-[9px] mt-0.5 leading-snug">
                {t('pact.dual.bridge.sub', '& Royalty Bridge')}
              </p>
            </div>
          </div>

          <LoopCard
            titleKey="pact.dual.forprofit.title"
            nodes={forProfitNodes}
            color="#E07A5F"
            side="right"
          />
        </div>

        <div
          className="mt-6 rounded-xl border p-4 text-center"
          style={{ borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.02)' }}
        >
          <p className="text-text-secondary text-xs leading-relaxed max-w-2xl mx-auto">
            {t('pact.dual.footer', '10–15% of gross API licensing revenue from LocaleNLP Commercial is legally ring-fenced and routed back to the Foundation — permanently funding community contributor payouts, fellowships, and open dataset releases.')}
          </p>
        </div>
      </div>
    </div>
  );
}
