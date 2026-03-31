import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { TranslatedPageHeader } from '@/components/ui/translated-page-header';
import { MonoLabel } from '@/components/ui/mono-label';
import { GlowButton } from '@/components/ui/glow-button';
import { ConsentRing } from '@/components/ethics/ConsentRing';
import { Download, FileText, Shield, Users } from 'lucide-react';

const POLICIES = [
  {
    name: 'Data Sovereignty Policy',
    version: 'v3.1',
    updated: 'Jan 2026',
    pages: 18,
    description: 'Defines community ownership rights and the conditions under which data may be used, shared, or withheld.',
  },
  {
    name: 'Consent & Revocation Framework',
    version: 'v2.4',
    updated: 'Nov 2025',
    pages: 12,
    description: 'Specifies the technical and procedural mechanisms for obtaining, logging, and honouring consent revocation.',
  },
  {
    name: 'Bias Audit Methodology',
    version: 'v1.8',
    updated: 'Feb 2026',
    pages: 24,
    description: 'Outlines the demographic balancing approach, audit frequency, and remediation protocols for dataset bias.',
  },
  {
    name: 'Export Control Guidelines',
    version: 'v1.2',
    updated: 'Dec 2025',
    pages: 9,
    description: 'Governs cross-border data transfer, jurisdictional compliance, and third-party access restrictions.',
  },
];

const RADAR_AXES = [
  { label: 'Gender',      value: 0.97, angle: -90 },
  { label: 'Age',         value: 0.91, angle: -30 },
  { label: 'Urban/Rural', value: 0.88, angle: 30  },
  { label: 'Region',      value: 0.94, angle: 90  },
  { label: 'Dialect',     value: 0.86, angle: 150 },
  { label: 'Economic',    value: 0.90, angle: 210 },
];

function toXY(angle: number, radius: number, cx: number, cy: number) {
  const rad = (angle * Math.PI) / 180;
  return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
}

function RadarChart() {
  const cx = 100;
  const cy = 100;
  const maxR = 70;
  const rings = [0.25, 0.5, 0.75, 1.0];

  const axisPoints = RADAR_AXES.map((ax) => toXY(ax.angle, maxR, cx, cy));
  const dataPoints = RADAR_AXES.map((ax) => toXY(ax.angle, ax.value * maxR, cx, cy));
  const dataPolygon = dataPoints.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <div className="flex flex-col items-center gap-6">
      <svg
        viewBox="0 0 200 200"
        width="180"
        height="180"
        aria-label="Bias mitigation radar chart showing demographic balance across six axes"
        role="img"
      >
        {rings.map((r) => {
          const ringPts = RADAR_AXES.map((ax) => toXY(ax.angle, r * maxR, cx, cy));
          const poly = ringPts.map((p) => `${p.x},${p.y}`).join(' ');
          return (
            <polygon
              key={r}
              points={poly}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
            />
          );
        })}

        {axisPoints.map((pt, i) => (
          <line
            key={i}
            x1={cx} y1={cy}
            x2={pt.x} y2={pt.y}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
        ))}

        <polygon
          points={dataPolygon}
          fill="rgba(0,229,255,0.15)"
          stroke="#00E5FF"
          strokeWidth="1.5"
          strokeLinejoin="round"
          style={{ filter: 'drop-shadow(0 0 4px rgba(0,229,255,0.3))' }}
        />

        {dataPoints.map((pt, i) => (
          <circle key={i} cx={pt.x} cy={pt.y} r="3" fill="#00E5FF" />
        ))}

        {RADAR_AXES.map((ax, i) => {
          const labelPt = toXY(ax.angle, maxR + 16, cx, cy);
          const anchor =
            ax.angle < -45 ? 'end'
            : ax.angle > 45 && ax.angle < 135 ? 'start'
            : 'middle';
          return (
            <text
              key={i}
              x={labelPt.x}
              y={labelPt.y}
              textAnchor={anchor}
              dominantBaseline="middle"
              fill="#52525B"
              fontSize="8"
              fontFamily="monospace"
            >
              {ax.label}
            </text>
          );
        })}
      </svg>

      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
        {RADAR_AXES.map((ax) => (
          <div key={ax.label} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent-cyan shrink-0" />
            <span className="font-mono text-[10px] text-text-tertiary">
              {ax.label}: {Math.round(ax.value * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FlywheelDiagram() {
  const nodes = [
    { label: 'API', sublabel: 'Dataset access', color: '#F5A623', cx: 80,  cy: 36  },
    { label: 'Revenue', sublabel: 'Fair distribution', color: '#00E5FF', cx: 152, cy: 130 },
    { label: 'Contributors', sublabel: 'Paid in mobile money', color: '#E07A5F', cx: 8,   cy: 130 },
  ];

  return (
    <div className="flex justify-center">
      <div className="relative" style={{ width: 200, height: 180 }}>
        <svg viewBox="0 0 200 180" width="200" height="180" aria-label="Economic flywheel showing flow from API to Revenue to Contributors" role="img">
          <defs>
            <marker id="arrow-ochre" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 z" fill="#F5A623" opacity="0.7" />
            </marker>
            <marker id="arrow-cyan" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 z" fill="#00E5FF" opacity="0.7" />
            </marker>
            <marker id="arrow-clay" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 z" fill="#E07A5F" opacity="0.7" />
            </marker>
          </defs>

          <path
            d="M 90 48 Q 138 72 148 118"
            fill="none"
            stroke="#F5A623"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            markerEnd="url(#arrow-ochre)"
            opacity="0.7"
            style={{ animation: 'flywheel-dash 1.6s linear infinite' }}
          />
          <path
            d="M 140 130 Q 100 148 68 130"
            fill="none"
            stroke="#00E5FF"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            markerEnd="url(#arrow-cyan)"
            opacity="0.7"
            style={{ animation: 'flywheel-dash 1.6s linear 0.53s infinite' }}
          />
          <path
            d="M 20 118 Q 30 72 70 48"
            fill="none"
            stroke="#E07A5F"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            markerEnd="url(#arrow-clay)"
            opacity="0.7"
            style={{ animation: 'flywheel-dash 1.6s linear 1.07s infinite' }}
          />

          {nodes.map((n) => (
            <g key={n.label}>
              <circle cx={n.cx + 20} cy={n.cy + 8} r="22" fill={n.color} fillOpacity="0.1" stroke={n.color} strokeWidth="1" strokeOpacity="0.4" />
              <text x={n.cx + 20} y={n.cy + 5} textAnchor="middle" fill={n.color} fontSize="9" fontWeight="700" fontFamily="monospace">
                {n.label}
              </text>
              <text x={n.cx + 20} y={n.cy + 15} textAnchor="middle" fill="#52525B" fontSize="6.5" fontFamily="sans-serif">
                {n.sublabel}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

export default function EthicsPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="pt-24">
        <TranslatedPageHeader
          label="ETHICS & GOVERNANCE"
          number="00"
          titleKey="ethics.page_title"
          titleGradientKey="ethics.page_title_gradient"
          subtitleKey="ethics.page_subtitle"
          accentColor="cyan"
        >
          <GlowButton href="#governance" variant="primary" showArrow={false}>
            View our framework
          </GlowButton>
          <GlowButton href="#ledger" variant="ghost" showArrow={false}>
            Open Data Policies
          </GlowButton>
        </TranslatedPageHeader>

        <section id="governance" className="py-20 bg-brand-surface">
          <div className="container-wide section-padding">
            <div className="text-center mb-14">
              <MonoLabel label="COMPLIANCE DASHBOARD" number="01" className="mb-5" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Institutional-Grade Data Ethics
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Major funders and government partners scrutinise governance before committing.
                Every metric below is live — not aspirational.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 rounded-xl border border-white/8 bg-brand-elevated p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-accent-cyan/10 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-accent-cyan" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent-cyan">
                      Consent Ledger
                    </p>
                    <p className="text-text-tertiary text-xs">Verified via Lughatna platform</p>
                  </div>
                </div>
                <ConsentRing />
              </div>

              <div className="md:col-span-1 md:row-span-2 rounded-xl border border-white/8 bg-brand-elevated p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-accent-cyan/10 flex items-center justify-center">
                    <Users className="w-4 h-4 text-accent-cyan" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent-cyan">
                      Bias Mitigation
                    </p>
                    <p className="text-text-tertiary text-xs">Demographic balance matrix</p>
                  </div>
                </div>

                <RadarChart />

                <div className="mt-6 pt-5 border-t border-white/8">
                  <p className="text-text-secondary text-sm leading-relaxed">
                    We continuously audit our datasets to ensure rural and marginalized dialects
                    are weighted equally. Corpora are rebalanced quarterly.
                  </p>
                </div>
              </div>

              <div className="md:col-span-2 rounded-xl border border-white/8 bg-brand-elevated p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-accent-clay/10 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-accent-clay" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent-clay">
                      Economic Flywheel
                    </p>
                    <p className="text-text-tertiary text-xs">Fair Compensation Protocol</p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="shrink-0">
                    <FlywheelDiagram />
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: 'API access', detail: 'Researchers pay for commercial dataset use', textColor: 'text-accent-ochre', dotColor: 'bg-accent-ochre' },
                      { label: 'Revenue split', detail: '70% flows directly to contributor communities', textColor: 'text-accent-cyan', dotColor: 'bg-accent-cyan' },
                      { label: 'Mobile payouts', detail: 'Linguists paid via M-Pesa, Wave, and MTN Money', textColor: 'text-accent-clay', dotColor: 'bg-accent-clay' },
                    ].map((item) => (
                      <div key={item.label} className="flex items-start gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${item.dotColor}`} />
                        <div>
                          <p className={`text-sm font-semibold ${item.textColor}`}>{item.label}</p>
                          <p className="text-text-tertiary text-xs">{item.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="ledger" className="py-20 bg-brand-deep">
          <div className="container-wide section-padding">
            <div className="text-center mb-14">
              <MonoLabel label="OPEN DATA POLICIES" number="02" className="mb-5" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
                The Policy Ledger
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Every policy document governing how we collect, store, and share data is freely
                available — beautifully typeset, version-controlled, and publicly auditable.
              </p>
            </div>

            <div className="max-w-4xl mx-auto rounded-xl border border-white/8 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand-elevated border-b border-white/8">
                    <th scope="col" className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary text-left px-6 py-3">
                      Document
                    </th>
                    <th scope="col" className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary text-left px-4 py-3 hidden md:table-cell">
                      Version
                    </th>
                    <th scope="col" className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary text-left px-4 py-3 hidden sm:table-cell">
                      Updated
                    </th>
                    <th scope="col" className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary text-right px-4 py-3 hidden sm:table-cell">
                      Pages
                    </th>
                    <th scope="col" className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary text-right px-6 py-3">
                      Download
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {POLICIES.map((policy, i) => (
                    <tr
                      key={policy.name}
                      className={[
                        'group transition-colors hover:bg-accent-cyan/5',
                        i < POLICIES.length - 1 ? 'border-b border-white/6' : '',
                      ].join(' ')}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-accent-cyan/10 flex items-center justify-center shrink-0">
                            <FileText className="w-4 h-4 text-accent-cyan" aria-hidden="true" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-display text-sm font-semibold text-text-primary leading-tight">
                              {policy.name}
                            </p>
                            <p className="text-text-tertiary text-xs leading-relaxed mt-0.5 hidden sm:block">
                              {policy.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <span className="font-mono text-[10px] text-text-tertiary bg-white/5 px-2 py-1 rounded">
                          {policy.version}
                        </span>
                      </td>
                      <td className="px-4 py-4 hidden sm:table-cell">
                        <span className="font-mono text-xs text-text-tertiary">{policy.updated}</span>
                      </td>
                      <td className="px-4 py-4 text-right hidden sm:table-cell">
                        <span className="font-mono text-xs text-text-tertiary">{policy.pages}pp</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <a
                          href="#"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-text-secondary hover:border-accent-cyan/30 hover:text-accent-cyan transition-all duration-200 text-xs font-medium font-mono"
                          aria-label={`Download ${policy.name} PDF`}
                        >
                          <Download className="w-3.5 h-3.5" aria-hidden="true" />
                          PDF
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-center mt-12">
              <p className="text-text-tertiary text-sm mb-6 max-w-xl mx-auto">
                All policies are licensed under Creative Commons CC-BY 4.0. Organisations are free
                to adapt them for their own data governance frameworks.
              </p>
              <GlowButton href="/get-involved#contact" variant="ghost" showArrow={false}>
                Request a governance consultation
              </GlowButton>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
