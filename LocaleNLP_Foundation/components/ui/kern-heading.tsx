'use client';

import { useScrollKern } from '@/components/hooks/useScrollKern';
import { cn } from '@/lib/utils';

type HeadingTag = 'h1' | 'h2' | 'h3';

interface KernHeadingProps {
  as?: HeadingTag;
  className?: string;
  children: React.ReactNode;
}

export function KernHeading({ as: Tag = 'h2', className, children }: KernHeadingProps) {
  const ref = useScrollKern<HTMLHeadingElement>();
  return (
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  );
}
