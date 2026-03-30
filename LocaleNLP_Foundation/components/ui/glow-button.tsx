'use client';

import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

type GlowButtonVariant = 'primary' | 'ghost';

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: GlowButtonVariant;
  showArrow?: boolean;
  asChild?: boolean;
  href?: string;
}

const variantClasses: Record<GlowButtonVariant, string> = {
  primary: [
    'bg-white text-[#04040A]',
    'hover:shadow-glow-ochre hover:-translate-y-0.5',
    'focus-visible:ring-accent-ochre',
  ].join(' '),
  ghost: [
    'glass-panel text-white',
    'hover:border-accent-ochre/40 hover:shadow-[0_0_16px_rgba(245,166,35,0.15)]',
    'focus-visible:ring-accent-ochre',
  ].join(' '),
};

export function GlowButton({
  variant = 'primary',
  showArrow = true,
  className,
  children,
  href,
  ...props
}: GlowButtonProps) {
  const classes = cn(
    'group inline-flex items-center justify-center gap-2',
    'px-6 py-3 rounded-lg font-medium text-sm',
    'transition-all duration-300',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#04040A]',
    'disabled:pointer-events-none disabled:opacity-50',
    variantClasses[variant],
    className
  );

  const content = (
    <>
      {children}
      {showArrow && (
        <ArrowRight
          className="w-4 h-4 shrink-0 transition-transform duration-300 ease-apple-ease group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}
