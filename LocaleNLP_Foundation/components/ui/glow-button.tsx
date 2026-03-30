'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

type GlowButtonVariant = 'primary' | 'ghost';

type BaseProps = {
  variant?: GlowButtonVariant;
  showArrow?: boolean;
};

type AsButton = BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
type AsAnchor = BaseProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type GlowButtonProps = AsButton | AsAnchor;

export function GlowButton({
  variant = 'primary',
  showArrow = true,
  className,
  children,
  ...props
}: GlowButtonProps) {
  const classes = cn(
    'group inline-flex items-center justify-center gap-2',
    'px-6 py-3 rounded-lg font-medium text-sm',
    'transition-all duration-300 ease-apple-ease',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#04040A]',
    'disabled:pointer-events-none disabled:opacity-50',
    variant === 'primary' && [
      'bg-white text-[#04040A]',
      'ring-1 ring-transparent',
      'hover:ring-accent-ochre/50 hover:animate-glow-pulse hover:-translate-y-0.5',
      'focus-visible:ring-accent-ochre',
    ],
    variant === 'ghost' && [
      'bg-transparent text-white border border-white/15',
      'hover:border-accent-ochre/40 hover:bg-white/5',
      'hover:shadow-[0_0_16px_rgba(245,166,35,0.15)]',
      'focus-visible:ring-accent-ochre',
    ],
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

  if ('href' in props && props.href) {
    const { href, ...anchorProps } = props as AsAnchor;
    const isInternal = href.startsWith('/') || href.startsWith('#');

    if (isInternal) {
      return (
        <Link href={href} className={classes} onClick={(anchorProps as { onClick?: React.MouseEventHandler }).onClick}>
          {content}
        </Link>
      );
    }

    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...anchorProps}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} {...(props as AsButton)}>
      {content}
    </button>
  );
}
