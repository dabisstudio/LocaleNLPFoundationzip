import { cn } from '@/lib/utils';

type Status = 'active' | 'beta' | 'legacy';

interface MonoLabelProps {
  label: string;
  number?: string;
  status?: Status;
  className?: string;
}

const dotColors: Record<Status, string> = {
  active: 'bg-accent-ochre',
  beta: 'bg-accent-navy',
  legacy: 'bg-ink-muted',
};

const textColors: Record<Status, string> = {
  active: 'text-accent-ochre',
  beta: 'text-accent-navy',
  legacy: 'text-ink-muted',
};

export function MonoLabel({ label, number, status = 'active', className }: MonoLabelProps) {
  const parts = [label, number, status.toUpperCase()].filter(Boolean);
  const bracketContent = parts.join(' // ');

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase select-none',
        textColors[status],
        className
      )}
    >
      <span
        className={cn(
          'w-1.5 h-1.5 rounded-full shrink-0',
          dotColors[status],
          status === 'active' && 'animate-pulse-glow',
        )}
        aria-hidden="true"
      />
      <span>[ {bracketContent} ]</span>
    </div>
  );
}
