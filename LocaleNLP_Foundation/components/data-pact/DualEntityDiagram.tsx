'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/TranslationContext';

const W = 600;
const H = 280;
const CX = W / 2;
const CY = H / 2;
const RX = 180;
const RY = 90;

function ellipsePoint(cx: number, cy: number, rx: number, ry: number, t: number) {
  const angle = t * 2 * Math.PI;
  return {
    x: cx + rx * Math.cos(angle),
    y: cy + ry * Math.sin(angle),
  };
}

const LEFT_CX = CX - RX * 0.82;
const RIGHT_CX = CX + RX * 0.82;

function buildLoopPath(cx: number) {
  const pts: string[] = [];
  const steps = 64;
  for (let i = 0; i <= steps; i++) {
    const { x, y } = ellipsePoint(cx, CY, RX * 0.82, RY, i / steps);
    pts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`);
  }
  pts.push('Z');
  return pts.join(' ');
}

const LEFT_PATH = buildLoopPath(LEFT_CX);
const RIGHT_PATH = buildLoopPath(RIGHT_CX);

function AnimatedDot({ cx, rx, ry, color, duration, offset }: {
  cx: number; rx: number; ry: number; color: string; duration: number; offset: number;
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const startRef = useRef<number>(-1);

  useAnimationFrame((t) => {
    if (startRef.current < 0) startRef.current = t;
    const elapsed = (t - startRef.current) / 1000;
    const raw = ((elapsed / duration) + offset) % 1;
    const p = ellipsePoint(cx, CY, rx, ry, raw);
    setPos(p);
  });

  return (
    <motion.circle
      cx={pos.x}
      cy={pos.y}
      r={5}
      fill={color}
      aria-hidden="true"
      style={{ filter: `drop-shadow(0 0 6px ${color})` }}
    />
  );
}

type LoopEntry = { label: string; color: string };

function LoopLabel({ entries, x, y, align }: { entries: LoopEntry[]; x: number; y: number; align: 'start' | 'end' }) {
  return (
    <g>
      {entries.map((e, i) => (
        <g key={i} transform={`translate(${x},${y + i * 22})`}>
          <circle cx={align === 'start' ? -10 : 10} cy={0} r={3.5} fill={e.color} />
          <text
            x={align === 'start' ? 0 : 0}
            y={4}
            textAnchor={align}
            fontSize="11"
            fill="rgba(255,255,255,0.65)"
            fontFamily="JetBrains Mono, monospace"
          >
            {e.label}
          </text>
        </g>
      ))}
    </g>
  );
}

export function DualEntityDiagram() {
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);

  const foundationEntries: LoopEntry[] = [
    { label: t('pact.dual.foundation.n1', 'Philanthropy & Grants'), color: '#00E5FF' },
    { label: t('pact.dual.foundation.n2', 'Community Collection'), color: '#F5A623' },
    { label: t('pact.dual.foundation.n3', 'Open Data Release'), color: '#4ADE80' },
  ];

  const forProfitEntries: LoopEntry[] = [
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
        <div
          className="rounded-2xl overflow-hidden relative"
          style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
          role="img"
          aria-label={t('pact.dual.diagram_aria', 'Figure-eight diagram showing the LocaleNLP Foundation and For-Profit entity loops connected at a central ethics firewall node')}
        >
          <svg
            viewBox={`0 0 ${W} ${H}`}
            width="100%"
            preserveAspectRatio="xMidYMid meet"
            style={{ display: 'block', maxHeight: 320 }}
            aria-hidden="true"
          >
            <defs>
              <filter id="glow-cyan">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="glow-clay">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            <path d={LEFT_PATH} fill="rgba(0,229,255,0.04)" stroke="rgba(0,229,255,0.25)" strokeWidth="1.5" />
            <path d={RIGHT_PATH} fill="rgba(224,122,95,0.04)" stroke="rgba(224,122,95,0.25)" strokeWidth="1.5" />

            <text x={LEFT_CX} y={CY - RY - 14} textAnchor="middle" fontSize="10" fill="rgba(0,229,255,0.7)" fontFamily="JetBrains Mono, monospace" letterSpacing="2">
              {t('pact.dual.foundation.label', 'FOUNDATION')}
            </text>
            <text x={RIGHT_CX} y={CY - RY - 14} textAnchor="middle" fontSize="10" fill="rgba(224,122,95,0.7)" fontFamily="JetBrains Mono, monospace" letterSpacing="2">
              {t('pact.dual.forprofit.label', 'FOR-PROFIT')}
            </text>

            <LoopLabel entries={foundationEntries} x={LEFT_CX - RX * 0.82 - 14} y={CY - 22} align="end" />
            <LoopLabel entries={forProfitEntries} x={RIGHT_CX + RX * 0.82 + 14} y={CY - 22} align="start" />

            <circle cx={CX} cy={CY} r={28} fill="rgba(12,12,20,0.95)" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
            <text x={CX} y={CY - 9} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.5)" fontFamily="JetBrains Mono, monospace">⚖️</text>
            <text x={CX} y={CY + 5} textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.4)" fontFamily="JetBrains Mono, monospace">
              {t('pact.dual.center.line1', 'ETHICS')}
            </text>
            <text x={CX} y={CY + 14} textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.4)" fontFamily="JetBrains Mono, monospace">
              {t('pact.dual.center.line2', 'FIREWALL')}
            </text>
            <text x={CX} y={CY + 23} textAnchor="middle" fontSize="6.5" fill="rgba(255,255,255,0.3)" fontFamily="JetBrains Mono, monospace">
              {t('pact.dual.center.line3', '& ROYALTY')}
            </text>

            {isMounted && (
              <>
                <AnimatedDot cx={LEFT_CX} rx={RX * 0.82} ry={RY} color="#00E5FF" duration={4.2} offset={0} />
                <AnimatedDot cx={LEFT_CX} rx={RX * 0.82} ry={RY} color="#F5A623" duration={4.2} offset={0.5} />
                <AnimatedDot cx={RIGHT_CX} rx={RX * 0.82} ry={RY} color="#E07A5F" duration={3.8} offset={0.25} />
                <AnimatedDot cx={RIGHT_CX} rx={RX * 0.82} ry={RY} color="#A78BFA" duration={3.8} offset={0.75} />
              </>
            )}
          </svg>
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
