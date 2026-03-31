'use client';

import { useEffect, useState } from 'react';

const CIRCLE_R = 28;
const CIRCLE_C = 2 * Math.PI * CIRCLE_R;
const CHECK_LENGTH = 38;

interface SuccessCheckProps {
  visible: boolean;
  size?: number;
}

export function SuccessCheck({ visible, size = 72 }: SuccessCheckProps) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (visible) {
      const id = setTimeout(() => setActive(true), 50);
      return () => clearTimeout(id);
    } else {
      setActive(false);
    }
  }, [visible]);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        cx="32"
        cy="32"
        r={CIRCLE_R}
        stroke="#00E5FF"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray={CIRCLE_C}
        strokeDashoffset={active ? 0 : CIRCLE_C}
        style={{
          transition: active
            ? `stroke-dashoffset 0.45s cubic-bezier(0.65, 0, 0.45, 1)`
            : 'none',
          transformOrigin: '32px 32px',
          transform: 'rotate(-90deg)',
        }}
      />
      <path
        d="M18 33 L27 43 L46 22"
        stroke="#00E5FF"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={CHECK_LENGTH}
        strokeDashoffset={active ? 0 : CHECK_LENGTH}
        style={{
          transition: active
            ? `stroke-dashoffset 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.3s`
            : 'none',
        }}
      />
    </svg>
  );
}
