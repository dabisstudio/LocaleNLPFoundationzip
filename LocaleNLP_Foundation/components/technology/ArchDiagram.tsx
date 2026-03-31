'use client';

import { useState } from 'react';

interface Node {
  id: string;
  label: string;
  sublabel: string;
  x: number;
  y: number;
  color: string;
  glowColor: string;
  description: string;
  details: string[];
}

const NODES: Node[] = [
  {
    id: 'lughatna',
    label: 'Lughatna',
    sublabel: 'Contributor App',
    x: 60,
    y: 200,
    color: '#F5A623',
    glowColor: 'rgba(245,166,35,0.35)',
    description: 'Community-First Data Collection',
    details: [
      'Offline-first mobile & web app',
      'Native-language recording interface',
      'Community consent management',
      'Instant mobile money payouts',
    ],
  },
  {
    id: 'validation',
    label: 'Validation',
    sublabel: 'Engine',
    x: 230,
    y: 200,
    color: '#00E5FF',
    glowColor: 'rgba(0,229,255,0.30)',
    description: 'Multi-Node Consensus Validation',
    details: [
      'Min. 3 human validations per token',
      'Differential privacy layer',
      'Demographic parity auditing',
      'On-chain provenance ledger',
    ],
  },
  {
    id: 'models',
    label: 'Open Models',
    sublabel: 'ASR · MT · TTS',
    x: 400,
    y: 200,
    color: '#E07A5F',
    glowColor: 'rgba(224,122,95,0.30)',
    description: 'Production-Ready African NLP',
    details: [
      'ONNX-quantised for edge devices',
      'Sub-5 Mbps inference ready',
      'HuggingFace model cards',
      'CC-BY-4.0 open licence',
    ],
  },
  {
    id: 'api',
    label: 'Public API',
    sublabel: 'REST · gRPC',
    x: 570,
    y: 200,
    color: '#8B5CF6',
    glowColor: 'rgba(139,92,246,0.30)',
    description: 'Developer-First API Surface',
    details: [
      'Free for non-commercial use',
      'Versioned & rate-limited',
      '< 180 ms median latency',
      'Self-hostable under open licence',
    ],
  },
];

const NODE_W = 110;
const NODE_H = 70;
const ARROW_COLOR = 'rgba(255,255,255,0.15)';
const ARROW_ACTIVE = 'rgba(255,255,255,0.45)';

function ArrowPath({ x1, x2, y, active }: { x1: number; x2: number; y: number; active: boolean }) {
  const mx = (x1 + x2) / 2;
  return (
    <g>
      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill={active ? ARROW_ACTIVE : ARROW_COLOR} />
        </marker>
      </defs>
      <path
        d={`M ${x1} ${y} C ${mx} ${y}, ${mx} ${y}, ${x2} ${y}`}
        fill="none"
        stroke={active ? ARROW_ACTIVE : ARROW_COLOR}
        strokeWidth={active ? 1.5 : 1}
        markerEnd="url(#arrowhead)"
        style={{ transition: 'stroke 0.25s, stroke-width 0.25s' }}
      />
    </g>
  );
}

export function ArchDiagram() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const activeId = selected ?? hovered;
  const activeNode = NODES.find((n) => n.id === activeId) ?? null;

  return (
    <div className="glass-card overflow-hidden">
      <div className="px-6 pt-6 pb-4 border-b border-white/8">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary mb-1">
          Interactive Architecture — Hover or click a node to explore
        </p>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 min-w-0 overflow-x-auto">
          <svg
            viewBox="0 55 640 290"
            className="w-full"
            style={{ minWidth: '380px', height: '200px' }}
            role="img"
            aria-label="LocaleNLP stack architecture diagram"
          >
            {NODES.map((node, i) => {
              if (i < NODES.length - 1) {
                const next = NODES[i + 1];
                const isActive = activeId === node.id || activeId === next.id;
                return (
                  <ArrowPath
                    key={`arrow-${i}`}
                    x1={node.x + NODE_W / 2}
                    x2={next.x - NODE_W / 2}
                    y={node.y + NODE_H / 2}
                    active={isActive}
                  />
                );
              }
              return null;
            })}

            {NODES.map((node) => {
              const isActive = activeId === node.id;
              const nx = node.x - NODE_W / 2;
              const ny = node.y - NODE_H / 2;
              return (
                <g
                  key={node.id}
                  onMouseEnter={() => setHovered(node.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setSelected((v) => (v === node.id ? null : node.id))}
                  style={{ cursor: 'pointer' }}
                  role="button"
                  aria-label={`${node.label}: ${node.description}`}
                  aria-pressed={selected === node.id}
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelected((v) => v === node.id ? null : node.id); }}
                >
                  {isActive && (
                    <rect
                      x={nx - 6}
                      y={ny - 6}
                      width={NODE_W + 12}
                      height={NODE_H + 12}
                      rx="16"
                      fill={node.glowColor}
                      style={{ filter: `blur(8px)`, transition: 'opacity 0.25s' }}
                    />
                  )}
                  <rect
                    x={nx}
                    y={ny}
                    width={NODE_W}
                    height={NODE_H}
                    rx="12"
                    fill={isActive ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)'}
                    stroke={isActive ? node.color : 'rgba(255,255,255,0.10)'}
                    strokeWidth={isActive ? 1.5 : 1}
                    style={{ transition: 'fill 0.25s, stroke 0.25s, stroke-width 0.25s' }}
                  />
                  <text
                    x={node.x}
                    y={node.y - 8}
                    textAnchor="middle"
                    fill={isActive ? node.color : '#FAFAFA'}
                    fontSize="12"
                    fontWeight="600"
                    fontFamily="'Inter', sans-serif"
                    style={{ transition: 'fill 0.25s' }}
                  >
                    {node.label}
                  </text>
                  <text
                    x={node.x}
                    y={node.y + 10}
                    textAnchor="middle"
                    fill={isActive ? node.color : '#52525B'}
                    fontSize="9.5"
                    fontFamily="'JetBrains Mono', monospace"
                    style={{ transition: 'fill 0.25s' }}
                  >
                    {node.sublabel}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div
          className="lg:w-72 border-t lg:border-t-0 lg:border-l border-white/8 flex flex-col"
          style={{ minHeight: '160px' }}
        >
          {activeNode ? (
            <div className="p-5 flex flex-col h-full">
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: activeNode.color }}
                  aria-hidden="true"
                />
                <p className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: activeNode.color }}>
                  {activeNode.label}
                </p>
              </div>
              <p className="text-text-primary text-sm font-semibold mb-3 leading-snug">
                {activeNode.description}
              </p>
              <ul className="space-y-2">
                {activeNode.details.map((d) => (
                  <li key={d} className="flex items-start gap-2 text-text-secondary text-xs leading-relaxed">
                    <span className="w-1 h-1 rounded-full bg-text-tertiary shrink-0 mt-1.5" aria-hidden="true" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="p-5 flex items-center justify-center h-full text-center">
              <p className="font-mono text-[11px] text-text-tertiary leading-relaxed">
                Hover or click a node<br />to explore the stack
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="px-6 py-4 border-t border-white/8 flex items-center gap-6 flex-wrap">
        {NODES.map((node) => (
          <button
            key={node.id}
            type="button"
            onClick={() => setSelected((v) => (v === node.id ? null : node.id))}
            className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest hover:opacity-80 transition-opacity"
            style={{ color: selected === node.id ? node.color : '#52525B' }}
            aria-pressed={selected === node.id}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: node.color }} aria-hidden="true" />
            {node.label}
          </button>
        ))}
      </div>
    </div>
  );
}
