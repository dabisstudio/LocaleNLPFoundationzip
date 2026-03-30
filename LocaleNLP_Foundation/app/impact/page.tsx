import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { PageHeader } from '@/components/ui/page-header';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { MonoLabel } from '@/components/ui/mono-label';
import { GlowButton } from '@/components/ui/glow-button';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { supabase, ImpactMetric, CaseStudy } from '@/lib/supabase';
import { ArrowRight, Heart, Stethoscope, GraduationCap, Tractor, BookOpen, Newspaper, Download } from 'lucide-react';
import Link from 'next/link';

async function getData() {
  const [metricsRes, caseStudiesRes] = await Promise.all([
    supabase.from('impact_metrics').select('*').order('order_index'),
    supabase.from('case_studies').select('*').eq('is_featured', true),
  ]);
  return {
    metrics: (metricsRes.data || []) as ImpactMetric[],
    caseStudies: (caseStudiesRes.data || []) as CaseStudy[],
  };
}

const STATIC_METRICS = [
  { label: 'Languages Supported', value: '40+', unit: null },
  { label: 'Audio Hours Archived', value: '2,400', unit: 'hrs' },
  { label: 'Researchers Supported', value: '120+', unit: null },
  { label: 'Countries Active', value: '18', unit: null },
];

const USE_CASES = [
  {
    icon: Stethoscope,
    sector: 'Healthcare',
    title: 'Medical Hotlines in Local Languages',
    description:
      'Our speech recognition enables health hotlines to serve patients in Yoruba, Swahili, and 10 other languages — removing the language barrier from urgent care.',
    impact: '50,000+ calls processed monthly',
    accent: 'text-accent-ochre',
    spot: 'rgba(245,166,35,0.1)',
  },
  {
    icon: GraduationCap,
    sector: 'Education',
    title: 'Mother-Tongue Learning Apps',
    description:
      'Children learn to read using apps that understand and respond in their native language, dramatically improving early literacy outcomes.',
    impact: '25,000+ students reached',
    accent: 'text-accent-cyan',
    spot: 'rgba(0,229,255,0.08)',
  },
  {
    icon: Tractor,
    sector: 'Agriculture',
    title: 'Farming Advisories via SMS & Voice',
    description:
      'Farmers receive weather and crop advice through automated voice calls in local languages, improving harvests and food security.',
    impact: '100,000+ farmers served',
    accent: 'text-accent-clay',
    spot: 'rgba(224,122,95,0.1)',
  },
];

const COUNTRY_NODES = [
  { x: 220, y: 120, name: 'Senegal', active: true },
  { x: 240, y: 150, name: 'Guinea', active: true },
  { x: 200, y: 175, name: 'Sierra Leone', active: false },
  { x: 255, y: 165, name: 'Ivory Coast', active: true },
  { x: 285, y: 140, name: 'Ghana', active: true },
  { x: 310, y: 150, name: 'Nigeria', active: true },
  { x: 345, y: 120, name: 'Niger', active: false },
  { x: 360, y: 160, name: 'Chad', active: false },
  { x: 375, y: 200, name: 'Ethiopia', active: true },
  { x: 390, y: 250, name: 'Kenya', active: true },
  { x: 370, y: 290, name: 'Tanzania', active: true },
  { x: 355, y: 340, name: 'Mozambique', active: false },
  { x: 330, y: 380, name: 'South Africa', active: true },
  { x: 295, y: 340, name: 'Zimbabwe', active: false },
  { x: 275, y: 290, name: 'Zambia', active: false },
  { x: 285, y: 230, name: 'DRC', active: true },
  { x: 260, y: 220, name: 'Cameroon', active: true },
  { x: 250, y: 200, name: 'Gabon', active: false },
  { x: 305, y: 195, name: 'Uganda', active: true },
  { x: 295, y: 170, name: 'South Sudan', active: false },
  { x: 340, y: 85, name: 'Egypt', active: false },
  { x: 305, y: 95, name: 'Sudan', active: false },
  { x: 250, y: 75, name: 'Algeria', active: false },
  { x: 215, y: 70, name: 'Morocco', active: false },
  { x: 310, y: 340, name: 'Malawi', active: false },
];

const AFRICA_OUTLINE =
  'M 202,72 L 218,68 L 250,65 L 285,68 L 345,80 L 360,90 L 370,115 L 385,148 L 408,178 L 415,205 L 395,252 L 385,295 L 370,352 L 355,390 L 338,408 L 312,412 L 290,408 L 260,392 L 232,348 L 228,282 L 248,238 L 258,215 L 278,180 L 252,177 L 230,183 L 205,185 L 198,165 L 208,132 L 200,100 Z';

export default async function ImpactPage() {
  const { metrics, caseStudies } = await getData();
  const displayMetrics = metrics.length > 0 ? metrics : STATIC_METRICS;

  return (
    <>
      <Navigation />
      <main className="pt-24">
        <PageHeader
          label="IMPACT"
          number="00"
          title="Real Technology."
          titleGradient="Real Lives Changed."
          subtitle="We measure success not in papers published, but in communities empowered, languages preserved, and barriers broken across 18 African countries."
          accentColor="ochre"
        >
          <GlowButton href="#metrics" variant="primary" showArrow={false}>
            See the Numbers
          </GlowButton>
          <GlowButton href="/donate" variant="ghost">
            Amplify Impact
          </GlowButton>
        </PageHeader>

        <section id="metrics" className="py-20 bg-brand-surface">
          <div className="container-wide section-padding">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
              {displayMetrics.map((metric) => (
                <AnimatedCounter
                  key={metric.label}
                  value={String(metric.value)}
                  label={metric.label}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-brand-deep overflow-hidden">
          <div className="container-wide section-padding">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <MonoLabel label="GEOGRAPHIC REACH" number="01" className="mb-5" />
                <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-6">
                  Active Across the Continent
                </h2>
                <p className="text-text-secondary leading-relaxed mb-6">
                  We operate in 18 African countries — from language documentation projects in West
                  Africa to healthcare deployments in East Africa and policy advocacy in Southern
                  Africa.
                </p>
                <div className="flex flex-wrap gap-3">
                  {COUNTRY_NODES.filter((c) => c.active).map((c) => (
                    <span
                      key={c.name}
                      className="font-mono text-xs uppercase tracking-wide px-2.5 py-1 rounded bg-accent-ochre/10 text-accent-ochre border border-accent-ochre/20"
                    >
                      {c.name}
                    </span>
                  ))}
                </div>
              </div>

              <div
                className="relative flex items-center justify-center"
                aria-label="Map showing active countries across Africa"
              >
                <svg
                  viewBox="150 60 280 360"
                  className="w-full max-w-sm"
                  role="img"
                  aria-hidden="true"
                >
                  <defs>
                    <radialGradient id="glow-active" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#F5A623" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#F5A623" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="glow-inactive" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#52525B" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#52525B" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  <path
                    d={AFRICA_OUTLINE}
                    fill="rgba(255,255,255,0.025)"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="1"
                    strokeLinejoin="round"
                  />

                  {COUNTRY_NODES.map((node) => (
                    <g key={node.name}>
                      {node.active && (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r="12"
                          fill="url(#glow-active)"
                          opacity="0.4"
                        />
                      )}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={node.active ? 4 : 2.5}
                        fill={node.active ? '#F5A623' : '#52525B'}
                        className={node.active ? 'animate-pulse' : ''}
                      />
                    </g>
                  ))}
                </svg>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-brand-surface">
          <div className="container-wide section-padding">
            <div className="text-center mb-14">
              <MonoLabel label="TECHNOLOGY IN ACTION" number="02" className="mb-5" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Use Cases
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                From healthcare to education to agriculture, our technology is deployed where it
                matters most — on the frontlines of African development.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {USE_CASES.map((useCase) => (
                <SpotlightCard key={useCase.sector} spotlightColor={useCase.spot} className="p-8">
                  <useCase.icon className={`w-7 h-7 ${useCase.accent} mb-5`} aria-hidden="true" />
                  <p className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary mb-2">
                    {useCase.sector}
                  </p>
                  <h3 className="font-display text-lg font-semibold text-text-primary mb-3">
                    {useCase.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-5">
                    {useCase.description}
                  </p>
                  <div className="pt-4 border-t border-white/8">
                    <p className={`text-sm font-mono font-medium ${useCase.accent}`}>
                      {useCase.impact}
                    </p>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </section>

        {caseStudies.length > 0 && (
          <section className="py-20 bg-brand-deep">
            <div className="container-wide section-padding">
              <div className="text-center mb-14">
                <MonoLabel label="CASE STUDIES" number="03" className="mb-5" />
                <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
                  Stories of Change
                </h2>
                <p className="text-text-secondary max-w-2xl mx-auto">
                  Behind every statistic is a community transformed.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {caseStudies.map((study) => (
                  <SpotlightCard
                    key={study.id}
                    spotlightColor="rgba(245,166,35,0.08)"
                    className="overflow-hidden group"
                  >
                    <div className="h-44 bg-gradient-to-br from-brand-elevated to-brand-surface flex items-center justify-center relative overflow-hidden">
                      {study.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={study.image_url}
                          alt={study.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Heart className="w-10 h-10 text-white/10" aria-hidden="true" />
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-lg font-semibold text-text-primary mb-2 group-hover:text-accent-ochre transition-colors">
                        {study.title}
                      </h3>
                      {study.summary && (
                        <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
                          {study.summary}
                        </p>
                      )}
                      <Link
                        href={`/insights/${study.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm text-accent-ochre font-medium hover:opacity-80 transition-opacity"
                      >
                        Read Full Story
                        <ArrowRight
                          className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  </SpotlightCard>
                ))}
              </div>
            </div>
          </section>
        )}

        {caseStudies.length === 0 && (
          <section className="py-20 bg-brand-deep">
            <div className="container-wide section-padding">
              <div className="glass-card p-12 text-center max-w-lg mx-auto">
                <BookOpen className="w-10 h-10 text-text-tertiary mx-auto mb-4" aria-hidden="true" />
                <h3 className="font-display text-lg font-semibold text-text-primary mb-2">
                  Case Studies Coming Soon
                </h3>
                <p className="text-text-secondary text-sm">
                  We are documenting impact stories from communities across Africa. Check back soon.
                </p>
              </div>
            </div>
          </section>
        )}

        <section className="py-20 bg-brand-surface">
          <div className="container-wide section-padding">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="glass-card p-8 flex flex-col">
                <Download className="w-8 h-8 text-accent-ochre mb-5" aria-hidden="true" />
                <h3 className="font-display text-xl font-semibold text-text-primary mb-3">
                  Annual Impact Report
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-1">
                  Download our full 2023 Annual Impact Report — detailed metrics, community stories,
                  financial transparency, and our roadmap for the years ahead.
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-text-tertiary">PDF · 2023 · 48 pages</span>
                  <GlowButton
                    href="/reports/localenlp-annual-impact-2023.pdf"
                    variant="primary"
                    showArrow={false}
                  >
                    <Download className="w-3.5 h-3.5" aria-hidden="true" />
                    Download
                  </GlowButton>
                </div>
              </div>

              <div className="glass-card p-8 flex flex-col">
                <Newspaper className="w-8 h-8 text-accent-cyan mb-5" aria-hidden="true" />
                <h3 className="font-display text-xl font-semibold text-text-primary mb-3">
                  Scale Our Impact
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-1">
                  Every contribution helps us digitize more languages, deploy more tools, and build
                  a more inclusive future for African language communities.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <GlowButton href="/donate" variant="primary" showArrow={false}>
                    Donate Now
                  </GlowButton>
                  <GlowButton href="/get-involved" variant="ghost" showArrow={false}>
                    Partner With Us
                  </GlowButton>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
