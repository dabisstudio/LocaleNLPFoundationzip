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

// 47 supported countries with approximate SVG positions within the viewBox
const NODES: CountryNode[] = [
  { id: 'sn', x: 218, y: 118, name: 'Senegal', languages: 36, programs: 2, active: true },
  { id: 'gm', x: 220, y: 126, name: 'Gambia', languages: 10, programs: 0, active: false },
  { id: 'gn', x: 232, y: 144, name: 'Guinea', languages: 40, programs: 1, active: true },
  { id: 'gw', x: 222, y: 140, name: 'Guinea-Bissau', languages: 21, programs: 0, active: false },
  { id: 'sl', x: 228, y: 158, name: 'Sierra Leone', languages: 23, programs: 0, active: false },
  { id: 'lr', x: 238, y: 168, name: 'Liberia', languages: 31, programs: 0, active: false },
  { id: 'ci', x: 252, y: 162, name: 'Ivory Coast', languages: 78, programs: 2, active: true },
  { id: 'gh', x: 270, y: 154, name: 'Ghana', languages: 79, programs: 3, active: true },
  { id: 'tg', x: 282, y: 154, name: 'Togo', languages: 44, programs: 0, active: false },
  { id: 'bj', x: 290, y: 148, name: 'Benin', languages: 54, programs: 0, active: false },
  { id: 'ng', x: 308, y: 148, name: 'Nigeria', languages: 524, programs: 4, active: true },
  { id: 'ml', x: 248, y: 112, name: 'Mali', languages: 61, programs: 1, active: true },
  { id: 'bf', x: 268, y: 128, name: 'Burkina Faso', languages: 68, programs: 0, active: false },
  { id: 'ne', x: 305, y: 115, name: 'Niger', languages: 20, programs: 0, active: false },
  { id: 'mr', x: 222, y: 96, name: 'Mauritania', languages: 6, programs: 0, active: false },
  { id: 'ma', x: 218, y: 76, name: 'Morocco', languages: 8, programs: 0, active: false },
  { id: 'dz', x: 252, y: 76, name: 'Algeria', languages: 18, programs: 0, active: false },
  { id: 'tn', x: 272, y: 72, name: 'Tunisia', languages: 5, programs: 0, active: false },
  { id: 'ly', x: 295, y: 82, name: 'Libya', languages: 7, programs: 0, active: false },
  { id: 'eg', x: 340, y: 84, name: 'Egypt', languages: 10, programs: 0, active: false },
  { id: 'sd', x: 322, y: 104, name: 'Sudan', languages: 70, programs: 0, active: false },
  { id: 'er', x: 355, y: 120, name: 'Eritrea', languages: 9, programs: 0, active: false },
  { id: 'dj', x: 366, y: 138, name: 'Djibouti', languages: 4, programs: 0, active: false },
  { id: 'so', x: 375, y: 168, name: 'Somalia', languages: 13, programs: 0, active: false },
  { id: 'et', x: 355, y: 152, name: 'Ethiopia', languages: 90, programs: 3, active: true },
  { id: 'ss', x: 320, y: 148, name: 'South Sudan', languages: 80, programs: 0, active: false },
  { id: 'td', x: 310, y: 128, name: 'Chad', languages: 130, programs: 0, active: false },
  { id: 'cf', x: 315, y: 165, name: 'Central African Republic', languages: 74, programs: 0, active: false },
  { id: 'cm', x: 294, y: 170, name: 'Cameroon', languages: 274, programs: 2, active: true },
  { id: 'gq', x: 278, y: 185, name: 'Equatorial Guinea', languages: 11, programs: 0, active: false },
  { id: 'ga', x: 278, y: 195, name: 'Gabon', languages: 41, programs: 0, active: false },
  { id: 'cg', x: 292, y: 202, name: 'Republic of Congo', languages: 62, programs: 0, active: false },
  { id: 'cd', x: 308, y: 218, name: 'DRC', languages: 215, programs: 2, active: true },
  { id: 'ug', x: 335, y: 188, name: 'Uganda', languages: 43, programs: 2, active: true },
  { id: 'ke', x: 352, y: 208, name: 'Kenya', languages: 68, programs: 3, active: true },
  { id: 'rw', x: 330, y: 210, name: 'Rwanda', languages: 4, programs: 1, active: true },
  { id: 'bi', x: 328, y: 220, name: 'Burundi', languages: 4, programs: 0, active: false },
  { id: 'tz', x: 345, y: 248, name: 'Tanzania', languages: 126, programs: 2, active: true },
  { id: 'ao', x: 288, y: 248, name: 'Angola', languages: 46, programs: 1, active: true },
  { id: 'zm', x: 318, y: 268, name: 'Zambia', languages: 72, programs: 0, active: false },
  { id: 'mw', x: 338, y: 278, name: 'Malawi', languages: 14, programs: 0, active: false },
  { id: 'mz', x: 348, y: 308, name: 'Mozambique', languages: 43, programs: 0, active: false },
  { id: 'zw', x: 322, y: 298, name: 'Zimbabwe', languages: 16, programs: 0, active: false },
  { id: 'bw', x: 306, y: 318, name: 'Botswana', languages: 28, programs: 0, active: false },
  { id: 'na', x: 288, y: 318, name: 'Namibia', languages: 28, programs: 0, active: false },
  { id: 'za', x: 312, y: 356, name: 'South Africa', languages: 24, programs: 3, active: true },
  { id: 'mg', x: 382, y: 278, name: 'Madagascar', languages: 16, programs: 0, active: false },
];

const AFRICA_OUTLINE =
  'M 202,72 L 218,68 L 250,65 L 285,68 L 345,80 L 360,90 L 370,115 L 385,148 L 408,178 L 415,205 L 395,252 L 385,295 L 370,352 L 355,390 L 338,408 L 312,412 L 290,408 L 260,392 L 232,348 L 228,282 L 248,238 L 258,215 L 278,180 L 252,177 L 230,183 L 205,185 L 198,165 L 208,132 L 200,100 Z';

export function AfricaMap() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <svg
      viewBox="150 60 290 370"
      className="w-full max-w-sm"
      role="img"
      aria-label="Interactive map of Africa showing active countries"
    >
      <defs>
        <radialGradient id="am-glow-active" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F5A623" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#F5A623" stopOpacity="0" />
        </radialGradient>
        <style>{`
          @keyframes am-pulse {
            0%, 100% { opacity: 0.35; }
            50% { opacity: 0.6; }
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
              className="cursor-pointer group"
              role="button"
              aria-label={`${node.name}: ${node.languages} languages, ${node.programs} active programs`}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setOpen(open === node.id ? null : node.id);
                }
              }}
            >
              {/* Keyboard focus ring — always visible on focus */}
              <circle
                cx={node.x}
                cy={node.y}
                r="8"
                fill="none"
                stroke="#F5A623"
                strokeWidth="1.5"
                strokeDasharray="2.5 2"
                className={cn(
                  'opacity-0 transition-opacity duration-150',
                  open === node.id && 'opacity-100'
                )}
                style={{ outline: 'none' }}
                aria-hidden="true"
              />
              {/* Hover glow */}
              {node.active && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="9"
                  fill="url(#am-glow-active)"
                  className="am-pulse"
                />
              )}
              {/* Core dot: cyan → ochre on hover/focus */}
              <circle
                cx={node.x}
                cy={node.y}
                r={node.active ? 3.5 : 2}
                fill={open === node.id ? '#F5A623' : node.active ? '#00E5FF' : '#52525B'}
                className={cn(
                  'transition-colors duration-200',
                  node.active && 'group-hover:fill-[#F5A623]'
                )}
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
