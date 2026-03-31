'use client';

import { useState, useCallback } from 'react';

const MAX_OFFSET = 8;
const TRANSITION = 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)';

export function useMagnetic(enabled = true) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!enabled) return;
      const el = e.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const halfW = rect.width / 2 || 1;
      const halfH = rect.height / 2 || 1;
      const x = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, (dx / halfW) * MAX_OFFSET));
      const y = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, (dy / halfH) * MAX_OFFSET));
      setOffset({ x, y });
    },
    [enabled]
  );

  const onMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  return {
    onMouseMove,
    onMouseLeave,
    style: {
      transform: `translate(${offset.x}px, ${offset.y}px)`,
      transition: TRANSITION,
    } as React.CSSProperties,
  };
}
