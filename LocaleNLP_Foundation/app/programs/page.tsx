import { Suspense } from 'react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { PageHeader } from '@/components/ui/page-header';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { MonoLabel } from '@/components/ui/mono-label';
import { GlowButton } from '@/components/ui/glow-button';
import { SkeletonCard } from '@/components/ui/skeleton-card';
import { supabase, Program } from '@/lib/supabase';
import { PLACEHOLDER_PROGRAMS } from '@/lib/placeholder-programs';
import { Microscope, Mic, Heart, GraduationCap, Scale, BookOpen, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const ICON_MAP: Record<string, React.ElementType> = {
  Microscope,
  Mic,
  Heart,
  GraduationCap,
  Scale,
  BookOpen,
};

const ACCENT_MAP: Record<string, string> = {
  ochre: 'text-accent-ochre',
  cyan: 'text-accent-cyan',
  clay: 'text-accent-clay',
};

const SPOTLIGHT_MAP: Record<string, string> = {
  ochre: 'rgba(245,166,35,0.1)',
  cyan: 'rgba(0,229,255,0.08)',
  clay: 'rgba(224,122,95,0.1)',
};

async function getPrograms(): Promise<{ programs: Program[]; isPlaceholder: boolean }> {
  const { data, error } = await supabase.from('programs').select('*').order('order_index');
  if (error || !data || data.length === 0) {
    return { programs: PLACEHOLDER_PROGRAMS.slice(0, 4), isPlaceholder: true };
  }
  return { programs: data, isPlaceholder: false };
}

function ProgramsSkeleton() {
  return (
    <div className="py-20 bg-brand-surface">
      <div className="container-wide section-padding">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-40 h-4 rounded bg-white/5 animate-pulse" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

async function ProgramsGrid() {
  const { programs, isPlaceholder } = await getPrograms();
  const featured = programs.filter((p) => p.is_featured);
  const rest = programs.filter((p) => !p.is_featured);

  return (
    <section id="programs" className="py-20 bg-brand-surface">
      <div className="container-wide section-padding">
        {isPlaceholder && (
          <div className="mb-10 glass-card px-5 py-3 flex items-center gap-3 max-w-xl">
            <span className="w-2 h-2 rounded-full bg-accent-ochre/60 shrink-0" aria-hidden="true" />
            <p className="font-mono text-xs text-text-tertiary">
              Showing sample programs — live program data will appear once the database is seeded.
            </p>
          </div>
        )}
        {featured.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-10">
              <MonoLabel label="FLAGSHIP INITIATIVES" status="active" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((program, i) => {
                const Icon = ICON_MAP[program.icon || 'Microscope'] || Microscope;
                const accent = ACCENT_MAP[program.color] || 'text-accent-ochre';
                const spotlight = SPOTLIGHT_MAP[program.color] || 'rgba(245,166,35,0.1)';
                return (
                  <SpotlightCard key={program.id} spotlightColor={spotlight} className="p-6">
                    <div className="flex items-start justify-between mb-5">
                      <Icon className={`w-7 h-7 ${accent}`} aria-hidden="true" />
                      <MonoLabel
                        label="INITIATIVE"
                        number={String(i + 1).padStart(2, '0')}
                        status="active"
                      />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-text-primary mb-2">
                      {program.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-4">
                      {program.short_description}
                    </p>
                    {program.problem_statement && (
                      <div className="pt-4 border-t border-white/8">
                        <p className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary mb-1">
                          Challenge
                        </p>
                        <p className="text-text-secondary text-xs leading-relaxed line-clamp-2">
                          {program.problem_statement}
                        </p>
                      </div>
                    )}
                    <Link
                      href={`/programs/${program.slug}`}
                      className={`inline-flex items-center gap-1.5 text-sm font-medium mt-5 ${accent} hover:opacity-80 transition-opacity`}
                    >
                      Learn more
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </SpotlightCard>
                );
              })}
            </div>
          </div>
        )}

        {rest.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-10">
              <MonoLabel label="ALL PROGRAMS" status="active" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((program, i) => {
                const Icon = ICON_MAP[program.icon || 'Microscope'] || Microscope;
                const accent = ACCENT_MAP[program.color] || 'text-accent-ochre';
                const spotlight = SPOTLIGHT_MAP[program.color] || 'rgba(245,166,35,0.08)';
                return (
                  <SpotlightCard
                    key={program.id}
                    spotlightColor={spotlight}
                    className="p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <Icon className={`w-6 h-6 ${accent}`} aria-hidden="true" />
                      <MonoLabel
                        label="INITIATIVE"
                        number={String(i + 1).padStart(2, '0')}
                      />
                    </div>
                    <h3 className="font-display text-base font-semibold text-text-primary mb-2">
                      {program.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-4">
                      {program.short_description}
                    </p>
                    <Link
                      href={`/programs/${program.slug}`}
                      className={`inline-flex items-center gap-1.5 text-sm font-medium ${accent} hover:opacity-80 transition-opacity`}
                    >
                      Learn more
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </SpotlightCard>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default function ProgramsPage() {
  return (
    <>
      <Navigation />
      <main className="pt-24">
        <PageHeader
          label="PROGRAMS"
          number="00"
          title="From Research"
          titleGradient="to Real-World Impact"
          subtitle="Our programs span the full lifecycle of language technology — from foundational research to community deployment, from policy advocacy to talent development."
          accentColor="ochre"
        >
          <GlowButton href="#programs" variant="primary" showArrow={false}>
            Explore Programs
          </GlowButton>
          <GlowButton href="/get-involved" variant="ghost">
            Get Involved
          </GlowButton>
        </PageHeader>

        <Suspense fallback={<ProgramsSkeleton />}>
          <ProgramsGrid />
        </Suspense>

        <section className="py-20 bg-brand-deep">
          <div className="container-wide section-padding">
            <div className="glass-card p-10 md:p-14 text-center max-w-3xl mx-auto">
              <MonoLabel label="GET INVOLVED" status="active" className="mb-5" />
              <h2 className="font-display text-3xl font-bold text-text-primary mb-4">
                Ready to Contribute?
              </h2>
              <p className="text-text-secondary mb-8 max-w-lg mx-auto">
                Whether you are a researcher, developer, funder, or community member, there is a
                place for you in our mission.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <GlowButton href="/get-involved" variant="primary">
                  Join Us
                </GlowButton>
                <GlowButton href="/donate" variant="ghost">
                  Support Our Work
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
