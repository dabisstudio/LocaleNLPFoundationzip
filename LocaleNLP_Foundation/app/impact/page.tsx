import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { TranslatedPageHeader } from '@/components/ui/translated-page-header';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { MonoLabel } from '@/components/ui/mono-label';
import { GlowButton } from '@/components/ui/glow-button';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { AfricaMap } from '@/components/impact/AfricaMap';
import { supabase, ImpactMetric, CaseStudy } from '@/lib/supabase';
import { DEPLOYMENT_STORIES } from '@/lib/deploymentStories';
import { ArrowRight, Heart, Stethoscope, GraduationCap, Tractor, BookOpen, Newspaper, Download, MapPin, Radio } from 'lucide-react';
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


export default async function ImpactPage() {
  const { metrics, caseStudies } = await getData();
  const displayMetrics = (metrics.length > 0 ? metrics : STATIC_METRICS).slice(0, 4);

  return (
    <>
      <Navigation />
      <main id="main-content" className="pt-24">
        <TranslatedPageHeader
          label="IMPACT"
          number="00"
          titleKey="impact.page_title"
          titleGradientKey="impact.page_title_gradient"
          subtitleKey="impact.page_subtitle"
          accentColor="ochre"
          ctaButtons={[
            { labelKey: 'cta.see_numbers', labelFallback: 'See the Numbers', href: '#metrics', variant: 'primary', showArrow: false },
            { labelKey: 'cta.amplify_impact', labelFallback: 'Amplify Impact', href: '/donate', variant: 'ghost' },
          ]}
        />

        <section id="metrics" className="py-20 bg-brand-surface">
          <div className="container-wide section-padding">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
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
                  {[
                    'Senegal', 'Guinea', 'Ivory Coast', 'Ghana', 'Nigeria',
                    'Ethiopia', 'Kenya', 'Tanzania', 'South Africa', 'DRC',
                    'Cameroon', 'Uganda',
                  ].map((name) => (
                    <span
                      key={name}
                      className="font-mono text-xs uppercase tracking-wide px-2.5 py-1 rounded bg-accent-ochre/10 text-accent-ochre border border-accent-ochre/20"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>

              <div
                className="relative flex items-center justify-center"
                aria-label="Interactive map showing active countries across Africa"
              >
                <AfricaMap />
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
                  <div className="pt-4 border-t border-ink-monument/10">
                    <p className={`text-sm font-mono font-medium ${useCase.accent}`}>
                      {useCase.impact}
                    </p>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-brand-deep" id="stories">
          <div className="container-wide section-padding">
            <div className="text-center mb-14">
              <MonoLabel label="DEPLOYMENT STORIES" number="03" className="mb-5" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Real Deployments, Real Communities
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Behind every statistic is a community transformed. Each story includes metrics,
                problem/solution breakdown, audio proof, and a deployment timeline.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {DEPLOYMENT_STORIES.map((story) => {
                const spotColors = {
                  ochre: 'rgba(245,166,35,0.1)',
                  cyan:  'rgba(0,229,255,0.08)',
                  clay:  'rgba(224,122,95,0.1)',
                };
                const textColors = {
                  ochre: 'text-accent-ochre',
                  cyan:  'text-accent-cyan',
                  clay:  'text-accent-clay',
                };
                const sectorIcons = {
                  Agriculture: Tractor,
                  Healthcare:  Stethoscope,
                  Education:   GraduationCap,
                };
                const SectorIcon = sectorIcons[story.sector as keyof typeof sectorIcons] || Radio;
                return (
                  <SpotlightCard
                    key={story.slug}
                    spotlightColor={spotColors[story.accentColor]}
                    className="overflow-hidden group flex flex-col hover:scale-[1.015] transition-transform duration-300"
                  >
                    <div className="h-40 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-brand-elevated to-brand-surface transition-all duration-300 group-hover:shadow-[inset_0_0_40px_rgba(0,229,255,0.06)]">
                      <SectorIcon className={`w-10 h-10 ${textColors[story.accentColor]} opacity-20 group-hover:opacity-30 transition-opacity`} aria-hidden="true" />
                      <div className="absolute inset-0 border border-transparent group-hover:border-accent-cyan/20 transition-all duration-300 rounded-t-xl" aria-hidden="true" />
                      <div className="absolute bottom-3 left-4 flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-text-tertiary" aria-hidden="true" />
                        <span className="font-mono text-[9px] uppercase tracking-widest text-text-tertiary">
                          {story.country} · {story.region}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <p className={`font-mono text-[10px] uppercase tracking-[0.14em] mb-2 ${textColors[story.accentColor]}`}>
                        {story.sector}
                      </p>
                      <h3 className="font-display text-lg font-semibold text-text-primary mb-2 group-hover:text-accent-cyan transition-colors duration-300">
                        {story.headline}
                      </h3>
                      <p className="text-text-secondary text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
                        {story.tagline}
                      </p>
                      <div className="flex items-center gap-4 pt-4 border-t border-ink-monument/10">
                        {story.metrics.slice(0, 2).map((m) => (
                          <div key={m.label}>
                            <p className={`font-display text-lg font-bold ${textColors[m.accent]}`}>
                              {m.value}
                            </p>
                            <p className="font-mono text-[9px] uppercase tracking-wide text-text-tertiary">
                              {m.label}
                            </p>
                          </div>
                        ))}
                        <Link
                          href={`/impact/${story.slug}`}
                          className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-accent-cyan hover:opacity-80 transition-opacity group/link"
                          aria-label={`View deployment story: ${story.headline}`}
                        >
                          View Deployment
                          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </SpotlightCard>
                );
              })}
            </div>
          </div>
        </section>

        {caseStudies.length > 0 && (
          <section className="py-20 bg-brand-surface">
            <div className="container-wide section-padding">
              <div className="text-center mb-14">
                <MonoLabel label="CASE STUDIES" number="04" className="mb-5" />
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
                        <Heart className="w-10 h-10 text-ink-muted/20" aria-hidden="true" />
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
