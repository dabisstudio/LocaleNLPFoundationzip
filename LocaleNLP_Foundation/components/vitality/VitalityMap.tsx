'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import {
  VITALITY_DATA,
  VITALITY_STATUS_COLORS,
  VITALITY_STATUS_LABELS,
  type LanguageVitalityRecord,
} from '@/lib/vitality-data';

const AFRICA_OUTLINE =
  'M 202,72 L 218,68 L 250,65 L 285,68 L 345,80 L 360,90 L 370,115 L 385,148 L 408,178 L 415,205 L 395,252 L 385,295 L 370,352 L 355,390 L 338,408 L 312,412 L 290,408 L 260,392 L 232,348 L 228,282 L 248,238 L 258,215 L 278,180 L 252,177 L 230,183 L 205,185 L 198,165 L 208,132 L 200,100 Z';

interface TooltipState {
  x: number;
  y: number;
  language: LanguageVitalityRecord;
}

interface VitalityMapProps {
  onSelect: (lang: LanguageVitalityRecord) => void;
  selected: LanguageVitalityRecord | null;
}

export function VitalityMap({ onSelect, selected }: VitalityMapProps) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const handleMouseEnter = useCallback((
    e: React.MouseEvent<SVGGElement>,
    lang: LanguageVitalityRecord,
  ) => {
    const svg = (e.currentTarget.ownerSVGElement as SVGSVGElement);
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const svgPt = pt.matrixTransform(svg.getScreenCTM()!.inverse());
    setTooltip({ x: svgPt.x, y: svgPt.y - 14, language: lang });
  }, []);

  const handleMouseLeave = useCallback(() => setTooltip(null), []);

  const STATUS_RING: Record<string, string> = {
    CRITICAL_DATA_DEBT: 'rgba(224,122,95,0.3)',
    EMERGING_CORPUS:    'rgba(245,166,35,0.3)',
    DEPLOYABLE:         'rgba(0,229,255,0.3)',
  };

  return (
    <div className="relative">
      <svg
        viewBox="150 60 290 375"
        className="w-full"
        role="img"
        aria-label="Interactive Language Vitality Map of Africa"
      >
        <defs>
          <style>{`
            @keyframes vm-pulse {
              0%, 100% { opacity: 0.25; r: 9; }
              50%       { opacity: 0.5;  r: 12; }
            }
            .vm-pulse { animation: vm-pulse 2.2s ease-in-out infinite; }
            @media (prefers-reduced-motion: reduce) { .vm-pulse { animation: none; } }
          `}</style>
        </defs>

        <path
          d={AFRICA_OUTLINE}
          fill="rgba(255,255,255,0.025)"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {VITALITY_DATA.map((lang) => {
          const color = VITALITY_STATUS_COLORS[lang.vitalityStatus];
          const isSelected = selected?.isoCode === lang.isoCode;

          return (
            <g
              key={lang.isoCode}
              role="button"
              tabIndex={0}
              aria-label={`${lang.languageName}: ${VITALITY_STATUS_LABELS[lang.vitalityStatus]}, AI readiness ${lang.aiReadinessScore}/100`}
              className="cursor-pointer"
              onClick={() => onSelect(lang)}
              onMouseEnter={(e) => handleMouseEnter(e, lang)}
              onMouseLeave={handleMouseLeave}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelect(lang);
                }
              }}
            >
              <circle
                cx={lang.mapX}
                cy={lang.mapY}
                r={9}
                fill={color}
                fillOpacity="0.12"
                className="vm-pulse"
              />
              <circle
                cx={lang.mapX}
                cy={lang.mapY}
                r={isSelected ? 7 : 5}
                fill={color}
                fillOpacity={isSelected ? 1 : 0.8}
                stroke={isSelected ? 'white' : color}
                strokeWidth={isSelected ? 1.5 : 0.5}
                style={{ transition: 'r 0.2s, fill-opacity 0.2s' }}
              />
            </g>
          );
        })}

        {tooltip && (
          <g style={{ pointerEvents: 'none' }}>
            <rect
              x={tooltip.x - 52}
              y={tooltip.y - 28}
              width={104}
              height={40}
              rx={4}
              fill="#09090E"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="0.8"
            />
            <text
              x={tooltip.x}
              y={tooltip.y - 12}
              textAnchor="middle"
              fontSize="9"
              fill="white"
              fontFamily="monospace"
              fontWeight="bold"
            >
              {tooltip.language.languageName}
            </text>
            <circle
              cx={tooltip.x - 30}
              cy={tooltip.y + 3}
              r="3"
              fill={VITALITY_STATUS_COLORS[tooltip.language.vitalityStatus]}
            />
            <text
              x={tooltip.x - 22}
              y={tooltip.y + 7}
              fontSize="7.5"
              fill="rgba(255,255,255,0.6)"
              fontFamily="monospace"
            >
              {VITALITY_STATUS_LABELS[tooltip.language.vitalityStatus]}
            </text>
          </g>
        )}
      </svg>

      <div className="flex flex-wrap gap-3 mt-4 justify-center" aria-label="Map legend">
        {(Object.entries(VITALITY_STATUS_COLORS) as [string, string][]).map(([key, color]) => (
          <span key={key} className="flex items-center gap-1.5 text-[11px] font-mono text-text-secondary">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
            {VITALITY_STATUS_LABELS[key as keyof typeof VITALITY_STATUS_LABELS]}
          </span>
        ))}
      </div>
    </div>
  );
}
