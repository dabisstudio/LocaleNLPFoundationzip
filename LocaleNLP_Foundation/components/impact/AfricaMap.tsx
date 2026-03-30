'use client';

import { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { cn } from '@/lib/utils';

interface CountryNode {
  id: string;
  x: number;
  y: number;
  name: string;
  languages: number;
  programs: number;
  active: boolean;
}

const NODES: CountryNode[] = [
  { id: 'sn', x: 220, y: 120, name: 'Senegal', languages: 36, programs: 2, active: true },
  { id: 'gn', x: 240, y: 150, name: 'Guinea', languages: 40, programs: 1, active: true },
  { id: 'sl', x: 200, y: 175, name: 'Sierra Leone', languages: 23, programs: 0, active: false },
  { id: 'ci', x: 255, y: 165, name: 'Ivory Coast', languages: 78, programs: 2, active: true },
  { id: 'gh', x: 285, y: 140, name: 'Ghana', languages: 79, programs: 3, active: true },
  { id: 'ng', x: 310, y: 150, name: 'Nigeria', languages: 524, programs: 4, active: true },
  { id: 'ne', x: 345, y: 120, name: 'Niger', languages: 20, programs: 0, active: false },
  { id: 'td', x: 360, y: 160, name: 'Chad', languages: 130, programs: 0, active: false },
  { id: 'et', x: 375, y: 200, name: 'Ethiopia', languages: 90, programs: 3, active: true },
  { id: 'ke', x: 390, y: 250, name: 'Kenya', languages: 68, programs: 3, active: true },
  { id: 'tz', x: 370, y: 290, name: 'Tanzania', languages: 126, programs: 2, active: true },
  { id: 'mz', x: 355, y: 340, name: 'Mozambique', languages: 43, programs: 0, active: false },
  { id: 'za', x: 330, y: 380, name: 'South Africa', languages: 24, programs: 3, active: true },
  { id: 'zw', x: 295, y: 340, name: 'Zimbabwe', languages: 16, programs: 0, active: false },
  { id: 'zm', x: 275, y: 290, name: 'Zambia', languages: 72, programs: 0, active: false },
  { id: 'cd', x: 285, y: 230, name: 'DRC', languages: 215, programs: 2, active: true },
  { id: 'cm', x: 260, y: 220, name: 'Cameroon', languages: 274, programs: 2, active: true },
  { id: 'ga', x: 250, y: 200, name: 'Gabon', languages: 41, programs: 0, active: false },
  { id: 'ug', x: 305, y: 195, name: 'Uganda', languages: 43, programs: 2, active: true },
  { id: 'ss', x: 295, y: 170, name: 'South Sudan', languages: 80, programs: 0, active: false },
  { id: 'eg', x: 340, y: 85, name: 'Egypt', languages: 10, programs: 0, active: false },
  { id: 'sd', x: 305, y: 95, name: 'Sudan', languages: 70, programs: 0, active: false },
  { id: 'dz', x: 250, y: 75, name: 'Algeria', languages: 18, programs: 0, active: false },
  { id: 'ma', x: 215, y: 70, name: 'Morocco', languages: 8, programs: 0, active: false },
  { id: 'mw', x: 310, y: 340, name: 'Malawi', languages: 14, programs: 0, active: false },
];

const AFRICA_OUTLINE =
  'M 202,72 L 218,68 L 250,65 L 285,68 L 345,80 L 360,90 L 370,115 L 385,148 L 408,178 L 415,205 L 395,252 L 385,295 L 370,352 L 355,390 L 338,408 L 312,412 L 290,408 L 260,392 L 232,348 L 228,282 L 248,238 L 258,215 L 278,180 L 252,177 L 230,183 L 205,185 L 198,165 L 208,132 L 200,100 Z';

export function AfricaMap() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <svg
      viewBox="150 60 280 360"
      className="w-full max-w-sm"
      role="img"
      aria-label="Interactive map of Africa showing active countries"
    >
      <defs>
        <radialGradient id="am-glow-active" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F5A623" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#F5A623" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="am-glow-inactive" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#52525B" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#52525B" stopOpacity="0" />
        </radialGradient>
        <style>{`
          @keyframes am-pulse {
            0%, 100% { opacity: 0.35; r: 10; }
            50% { opacity: 0.55; r: 13; }
          }
          .am-pulse { animation: am-pulse 2.4s ease-in-out infinite; }
          @media (prefers-reduced-motion: reduce) {
            .am-pulse { animation: none; }
          }
        `}</style>
      </defs>

      <path
        d={AFRICA_OUTLINE}
        fill="rgba(255,255,255,0.025)"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
        strokeLinejoin="round"
      />

      {NODES.map((node) => (
        <Popover.Root
          key={node.id}
          open={open === node.id}
          onOpenChange={(v) => setOpen(v ? node.id : null)}
        >
          <Popover.Trigger asChild>
            <g
              className="cursor-pointer focus:outline-none"
              role="button"
              aria-label={`${node.name}: ${node.languages} languages, ${node.programs} programs`}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setOpen(open === node.id ? null : node.id);
                }
              }}
            >
              {node.active && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="10"
                  fill="url(#am-glow-active)"
                  className="am-pulse"
                />
              )}
              <circle
                cx={node.x}
                cy={node.y}
                r={node.active ? 4 : 2.5}
                fill={open === node.id ? '#F5A623' : node.active ? '#00E5FF' : '#52525B'}
                className={cn(
                  'transition-colors duration-200',
                  node.active && 'hover:fill-[#F5A623]'
                )}
                style={{
                  outline: 'none',
                  filter: open === node.id ? 'drop-shadow(0 0 4px #F5A623)' : 'none',
                }}
              />
            </g>
          </Popover.Trigger>

          <Popover.Portal>
            <Popover.Content
              className="z-50 rounded-lg bg-brand-elevated border border-white/12 p-3 shadow-xl text-left w-44"
              sideOffset={6}
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <p className="font-display text-sm font-semibold text-text-primary mb-1.5">
                {node.name}
              </p>
              <div className="space-y-1">
                <p className="font-mono text-[11px] text-accent-ochre">
                  {node.languages} languages
                </p>
                <p className="font-mono text-[11px] text-accent-cyan">
                  {node.programs} active {node.programs === 1 ? 'program' : 'programs'}
                </p>
                {!node.active && (
                  <p className="font-mono text-[10px] text-text-tertiary uppercase tracking-wide mt-1">
                    Coming soon
                  </p>
                )}
              </div>
              <Popover.Arrow className="fill-brand-elevated" />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      ))}
    </svg>
  );
}
