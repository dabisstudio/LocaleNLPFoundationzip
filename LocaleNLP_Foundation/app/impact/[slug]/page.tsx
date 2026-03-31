import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { MonoLabel } from '@/components/ui/mono-label';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { GlowButton } from '@/components/ui/glow-button';
import { DeploymentAudio } from '@/components/impact/DeploymentAudio';
import { DEPLOYMENT_STORIES, getStoryBySlug } from '@/lib/deploymentStories';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function generateStaticParams() {
  return DEPLOYMENT_STORIES.map((s) => ({ slug: s.slug }));
}

const ACCENT_CLASSES = {
  ochre: {
    text:   'text-accent-ochre',
    border: 'border-accent-ochre/25',
    bg:     'bg-accent-ochre/8',
    spot:   'rgba(245,166,35,0.1)',
    line:   '#F5A623',
  },
  cyan: {
    text:   'text-accent-cyan',
    border: 'border-accent-cyan/25',
    bg:     'bg-accent-cyan/8',
    spot:   'rgba(0,229,255,0.08)',
    line:   '#00E5FF',
  },
  clay: {
    text:   'text-accent-clay',
    border: 'border-accent-clay/25',
    bg:     'bg-accent-clay/8',
    spot:   'rgba(224,122,95,0.1)',
    line:   '#E07A5F',
  },
} as const;

export default async function DeploymentStoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const story = getStoryBySlug(params.slug);
  if (!story) notFound();

  const c = ACCENT_CLASSES[story.accentColor];

  return (
    <>
      <Navigation />
      <main className="pt-24">

        <section
          className="relative py-16 md:py-24 overflow-hidden"
          style={{
            background: `radial-gradient(ellipse 70% 50% at 60% 0%, ${story.accentColor === 'ochre' ? 'rgba(245,166,35,0.06)' : story.accentColor === 'cyan' ? 'rgba(0,229,255,0.05)' : 'rgba(224,122,95,0.06)'} 0%, transparent 70%), #04040A`,
          }}
        >
          <div className="container-wide section-padding">
            <Link
              href="/impact"
              className="inline-flex items-center gap-2 text-sm text-text-tertiary hover:text-text-secondary transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" aria-hidden="true" />
              Back to Impact
            </Link>

            <MonoLabel
              label={`DEPLOYMENT STORY // ${story.country.toUpperCase()} // ${story.sector.toUpperCase()}`}
              className="mb-6"
            />

            <h1 className="font-display text-3xl md:text-5xl font-bold text-text-primary mb-5 max-w-3xl leading-[1.08]">
              {story.headline}
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl leading-relaxed">
              {story.tagline}
            </p>
          </div>
        </section>

        <section className="py-10 bg-brand-surface border-y border-white/8">
          <div className="container-wide section-padding">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {story.metrics.map((m) => (
                <AnimatedCounter
                  key={m.label}
                  value={m.value}
                  label={m.label}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-brand-deep">
          <div className="container-wide section-padding">
            <MonoLabel label="THE CHALLENGE & SOLUTION" number="01" className="mb-10" />
            <div className="grid lg:grid-cols-2 gap-8">
              <SpotlightCard spotlightColor="rgba(224,122,95,0.08)" className="p-8 md:p-10">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-2 h-2 rounded-full bg-accent-clay shrink-0" aria-hidden="true" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent-clay">
                    The Friction
                  </p>
                </div>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-4">
                  The Problem
                </h2>
                <p className="text-text-secondary leading-relaxed text-sm">
                  {story.problem}
                </p>
              </SpotlightCard>

              <SpotlightCard spotlightColor={c.spot} className="p-8 md:p-10">
                <div className="flex items-center gap-2 mb-5">
                  <div className={cn('w-2 h-2 rounded-full shrink-0', story.accentColor === 'ochre' ? 'bg-accent-ochre' : story.accentColor === 'cyan' ? 'bg-accent-cyan' : 'bg-accent-clay')} aria-hidden="true" />
                  <p className={cn('font-mono text-[10px] uppercase tracking-[0.14em]', c.text)}>
                    The API Solution
                  </p>
                </div>
                <h2 className="font-display text-xl font-semibold text-text-primary mb-4">
                  How We Solved It
                </h2>
                <p className="text-text-secondary leading-relaxed text-sm">
                  {story.solution}
                </p>
              </SpotlightCard>
            </div>
          </div>
        </section>

        <section className="py-20 bg-brand-surface">
          <div className="container-wide section-padding">
            <MonoLabel label="AUDIO PROOF" number="02" className="mb-8" />
            <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary mb-8">
              Hear it in Action
            </h2>
            <div className="max-w-2xl">
              <DeploymentAudio
                audioUrl={story.audioUrl}
                transcript={story.transcript}
                sector={story.sector}
              />
            </div>
          </div>
        </section>

        <section className="py-20 bg-brand-deep">
          <div className="container-wide section-padding">
            <MonoLabel label="DEPLOYMENT TIMELINE" number="03" className="mb-10" />
            <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary mb-12">
              Key Milestones
            </h2>

            <div className="relative max-w-2xl">
              <div
                className="absolute left-3 top-0 bottom-0 w-px"
                style={{ background: 'rgba(255,255,255,0.08)' }}
                aria-hidden="true"
              />

              <div className="space-y-10">
                {story.milestones.map((ms, i) => {
                  const mc = ACCENT_CLASSES[ms.accent];
                  return (
                    <div key={i} className="relative pl-12">
                      <div
                        className={cn(
                          'absolute left-0 top-1 w-7 h-7 rounded-full border flex items-center justify-center',
                          mc.bg, mc.border
                        )}
                        aria-hidden="true"
                      >
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: mc.line }} />
                      </div>

                      <div className={cn('inline-block font-mono text-[10px] uppercase tracking-[0.14em] mb-2', mc.text)}>
                        {ms.date}
                      </div>
                      <h3 className="font-display text-base font-semibold text-text-primary mb-1">
                        {ms.title}
                      </h3>
                      <p className="text-text-secondary text-sm leading-relaxed">
                        {ms.body}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-brand-surface">
          <div className="container-wide section-padding">
            <MonoLabel label="RELATED PROGRAMME" number="04" className="mb-8" />

            <div className="grid md:grid-cols-2 gap-8 max-w-3xl">
              <SpotlightCard spotlightColor={c.spot} className="p-8">
                <p className={cn('font-mono text-[10px] uppercase tracking-[0.14em] mb-3', c.text)}>
                  This work is part of
                </p>
                <h3 className="font-display text-xl font-semibold text-text-primary mb-3">
                  {story.relatedProgram}
                </h3>
                <p className="text-text-secondary text-sm mb-6 leading-relaxed">
                  Explore the full programme scope, open datasets, model access, and how to get
                  involved.
                </p>
                <GlowButton href={`/programs/${story.relatedProgramSlug}`} variant="primary" showArrow>
                  View Programme
                </GlowButton>
              </SpotlightCard>

              <div className="glass-card p-8 flex flex-col justify-between">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary mb-3">
                    Read more stories
                  </p>
                  <h3 className="font-display text-xl font-semibold text-text-primary mb-3">
                    More Deployments
                  </h3>
                  <div className="space-y-3 mb-6">
                    {DEPLOYMENT_STORIES.filter((s) => s.slug !== story.slug).map((other) => (
                      <Link
                        key={other.slug}
                        href={`/impact/${other.slug}`}
                        className="flex items-center gap-2 group text-sm text-text-secondary hover:text-text-primary transition-colors"
                      >
                        <ArrowRight className="w-3.5 h-3.5 shrink-0 text-text-tertiary group-hover:text-accent-ochre transition-colors" aria-hidden="true" />
                        {other.headline}
                      </Link>
                    ))}
                  </div>
                </div>
                <GlowButton href="/impact" variant="ghost" showArrow={false}>
                  ← All Deployment Stories
                </GlowButton>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
