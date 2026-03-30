'use client';
import { useEffect, useRef, useState } from 'react';

interface Line {
  type: string;
  text: string;
}

const LINE_COLORS: Record<string, string> = {
  comment: 'text-text-tertiary',
  blank: '',
  import: 'text-accent-cyan',
  code: 'text-text-primary',
  string: 'text-accent-ochre',
  output: 'text-text-tertiary',
  result: 'text-accent-clay',
  method: 'text-accent-cyan',
  param: 'text-accent-clay',
};

interface TerminalTypewriterProps {
  lines: Line[];
  filename: string;
  ariaLabel?: string;
  minHeight?: string;
}

export function TerminalTypewriter({
  lines,
  filename,
  ariaLabel,
  minHeight = '280px',
}: TerminalTypewriterProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const hasAnimated = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setVisibleCount(lines.length);
      return;
    }
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    let i = 0;
    const step = () => {
      i++;
      setVisibleCount(i);
      if (i < lines.length) {
        timerRef.current = setTimeout(step, 85);
      }
    };
    timerRef.current = setTimeout(step, 400);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [lines.length]);

  return (
    <div className="glass-card overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-3 border-b border-white/8 bg-brand-elevated">
        <div className="w-3 h-3 rounded-full bg-red-500/70" aria-hidden="true" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" aria-hidden="true" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" aria-hidden="true" />
        <span className="ml-3 font-mono text-xs text-text-tertiary">{filename}</span>
      </div>
      <pre
        className="p-6 text-sm leading-7 overflow-x-auto"
        style={{ minHeight }}
        aria-label={ariaLabel}
      >
        {lines.slice(0, visibleCount).map((line, i) => (
          <div key={i} className={LINE_COLORS[line.type] || ''}>
            {line.text || '\u00A0'}
          </div>
        ))}
        {visibleCount < lines.length && (
          <div className="text-text-secondary animate-pulse" aria-hidden="true">
            █
          </div>
        )}
      </pre>
    </div>
  );
}
