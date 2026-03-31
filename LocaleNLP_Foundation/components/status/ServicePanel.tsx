import { cn } from '@/lib/utils';

export type UptimeBlockStatus = 'operational' | 'degraded' | 'maintenance' | 'outage';
export type ServiceStatus = 'operational' | 'degraded' | 'maintenance' | 'outage';

export interface ServicePanelProps {
  name: string;
  description: string;
  status: ServiceStatus;
  uptimePercent: string;
  blocks: UptimeBlockStatus[];
}

const STATUS_CONFIG: Record<ServiceStatus, { label: string; dot: string; badge: string; text: string }> = {
  operational: {
    label: 'Operational',
    dot:   'bg-green-400',
    badge: 'bg-green-400/12 border-green-400/30 text-green-400',
    text:  'text-green-400',
  },
  degraded: {
    label: 'Degraded Performance',
    dot:   'bg-accent-ochre',
    badge: 'bg-accent-ochre/12 border-accent-ochre/30 text-accent-ochre',
    text:  'text-accent-ochre',
  },
  maintenance: {
    label: 'Under Maintenance',
    dot:   'bg-accent-cyan',
    badge: 'bg-accent-cyan/12 border-accent-cyan/30 text-accent-cyan',
    text:  'text-accent-cyan',
  },
  outage: {
    label: 'Major Outage',
    dot:   'bg-accent-clay',
    badge: 'bg-accent-clay/12 border-accent-clay/30 text-accent-clay',
    text:  'text-accent-clay',
  },
};

const BLOCK_COLORS: Record<UptimeBlockStatus, string> = {
  operational: 'bg-green-500',
  degraded:    'bg-accent-ochre',
  maintenance: 'bg-accent-cyan',
  outage:      'bg-accent-clay',
};

const BLOCK_TITLES: Record<UptimeBlockStatus, string> = {
  operational: 'Operational',
  degraded:    'Degraded',
  maintenance: 'Maintenance',
  outage:      'Outage',
};

export function ServicePanel({ name, description, status, uptimePercent, blocks }: ServicePanelProps) {
  const cfg = STATUS_CONFIG[status];

  return (
    <div className="rounded-2xl border border-white/8 bg-brand-surface p-6">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <h3 className="font-display text-base font-semibold text-white mb-1">
            {name}
          </h3>
          <p className="text-text-secondary text-sm">{description}</p>
        </div>
        <span className={cn(
          'shrink-0 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold border',
          cfg.badge,
        )}>
          <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', cfg.dot)} aria-hidden="true" />
          {cfg.label}
        </span>
      </div>

      <div
        className="flex gap-0.5 mb-3"
        role="img"
        aria-label={`90-day uptime history for ${name}`}
      >
        {blocks.map((b, i) => (
          <div
            key={i}
            title={BLOCK_TITLES[b]}
            aria-label={BLOCK_TITLES[b]}
            className={cn(
              'flex-1 h-8 rounded-sm transition-opacity hover:opacity-80',
              BLOCK_COLORS[b],
            )}
          />
        ))}
      </div>

      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] text-text-tertiary uppercase tracking-widest">
          90-day uptime
        </span>
        <span className={cn('font-mono text-sm font-bold', cfg.text)}>
          {uptimePercent}%
        </span>
      </div>
    </div>
  );
}
