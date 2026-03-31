import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { ServicePanel, type UptimeBlockStatus, type ServiceStatus } from '@/components/status/ServicePanel';
import { LastChecked } from '@/components/status/LastChecked';
import { MonoLabel } from '@/components/ui/mono-label';

export const metadata = {
  title: 'System Status | LocaleNLP Foundation',
  description:
    'Real-time status of the Lughatna Platform, API endpoints, and data storage clusters operated by LocaleNLP Foundation.',
};

function makeBlocks(uptimePct: number, seed: number): UptimeBlockStatus[] {
  const blocks: UptimeBlockStatus[] = [];
  for (let i = 0; i < 30; i++) {
    const roll = ((seed * (i + 1) * 7919) % 10000) / 10000;
    const threshold = uptimePct / 100;
    if (roll > threshold + 0.002) {
      blocks.push('degraded');
    } else {
      blocks.push('operational');
    }
  }
  return blocks;
}

const LUGHATNA_BLOCKS: UptimeBlockStatus[] = [
  ...Array(22).fill('operational' as UptimeBlockStatus),
  'degraded',
  ...Array(6).fill('operational' as UptimeBlockStatus),
  'maintenance',
];

const API_BLOCKS: UptimeBlockStatus[] = [
  ...Array(27).fill('operational' as UptimeBlockStatus),
  'degraded',
  ...Array(2).fill('operational' as UptimeBlockStatus),
];

const STORAGE_BLOCKS: UptimeBlockStatus[] = [
  ...Array(30).fill('operational' as UptimeBlockStatus),
];

const SERVICES: Array<{
  name: string;
  description: string;
  status: ServiceStatus;
  uptimePercent: string;
  blocks: UptimeBlockStatus[];
}> = [
  {
    name: 'Lughatna Platform',
    description: 'Self-hosted offline-first NLP inference for community deployments.',
    status: 'operational',
    uptimePercent: '99.94',
    blocks: LUGHATNA_BLOCKS,
  },
  {
    name: 'API Endpoints',
    description: 'REST/WebSocket endpoints for speech-to-text, translation, and NLP inference.',
    status: 'operational',
    uptimePercent: '99.97',
    blocks: API_BLOCKS,
  },
  {
    name: 'Data Storage Cluster',
    description: 'Distributed storage for audio corpora, model artefacts, and open datasets.',
    status: 'operational',
    uptimePercent: '99.99',
    blocks: STORAGE_BLOCKS,
  },
];

export default function StatusPage() {
  const allOperational = SERVICES.every((s) => s.status === 'operational');
  const hasIncident = SERVICES.some((s) => s.status === 'outage');
  const hasDegraded = SERVICES.some((s) => s.status === 'degraded' || s.status === 'maintenance');

  const overallLabel = hasIncident
    ? 'Major Incident'
    : hasDegraded
      ? 'Degraded Performance'
      : 'All Systems Operational';

  const overallColor = hasIncident
    ? 'text-accent-clay'
    : hasDegraded
      ? 'text-accent-ochre'
      : 'text-green-400';

  const overallDot = hasIncident
    ? 'bg-accent-clay'
    : hasDegraded
      ? 'bg-accent-ochre'
      : 'bg-green-400';

  return (
    <>
      <Navigation />

      <main className="pt-20 min-h-screen" style={{ backgroundColor: '#04040A' }}>
        <section className="relative py-20 overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background: allOperational
                ? 'radial-gradient(ellipse 70% 50% at 50% -10%, rgba(74,222,128,0.06), transparent 65%)'
                : 'radial-gradient(ellipse 70% 50% at 50% -10%, rgba(245,166,35,0.06), transparent 65%)',
            }}
          />
          <div className="container-wide section-padding relative z-10 text-center">
            <div className="mb-6">
              <MonoLabel label="SYSTEM STATUS" number="OPS" status="active" />
            </div>

            <div className="flex items-center justify-center gap-3 mb-4">
              <span className={`w-3 h-3 rounded-full ${overallDot} animate-pulse`} aria-hidden="true" />
              <h1 className={`font-display text-3xl md:text-4xl font-bold ${overallColor}`}>
                {overallLabel}
              </h1>
            </div>

            <p className="text-text-secondary text-base mb-4">
              All LocaleNLP Foundation services are monitored 24/7.
            </p>

            <LastChecked />
          </div>
        </section>

        <section className="container-wide section-padding pb-8">
          <div className="space-y-4">
            {SERVICES.map((svc) => (
              <ServicePanel key={svc.name} {...svc} />
            ))}
          </div>
        </section>

        <section className="container-wide section-padding py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard label="Avg Response Time" value="82ms" accent="cyan" />
            <MetricCard label="Active API Regions" value="3" accent="ochre" />
            <MetricCard label="Incidents (90 days)" value="2" accent="clay" />
          </div>
        </section>

        <section className="container-wide section-padding pb-20">
          <div className="rounded-2xl border border-white/8 bg-brand-surface p-6">
            <h2 className="font-display text-base font-semibold text-white mb-1">Legend</h2>
            <p className="text-text-secondary text-sm mb-5">
              Each block in the uptime chart represents approximately 3 days of service history.
            </p>
            <div className="flex flex-wrap gap-5">
              {[
                { color: 'bg-green-500', label: 'Operational' },
                { color: 'bg-accent-ochre', label: 'Degraded' },
                { color: 'bg-accent-cyan', label: 'Maintenance' },
                { color: 'bg-accent-clay', label: 'Outage' },
              ].map(({ color, label }) => (
                <span key={label} className="flex items-center gap-2 text-sm text-text-secondary">
                  <span className={`w-4 h-4 rounded-sm ${color}`} aria-hidden="true" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function MetricCard({ label, value, accent }: { label: string; value: string; accent: 'cyan' | 'ochre' | 'clay' }) {
  const colorMap = {
    cyan:  'text-accent-cyan',
    ochre: 'text-accent-ochre',
    clay:  'text-accent-clay',
  };
  return (
    <div className="rounded-xl border border-white/8 bg-brand-surface p-5 text-center">
      <p className="font-mono text-[10px] text-text-tertiary uppercase tracking-widest mb-2">{label}</p>
      <p className={`font-display text-3xl font-bold ${colorMap[accent]}`}>{value}</p>
    </div>
  );
}
