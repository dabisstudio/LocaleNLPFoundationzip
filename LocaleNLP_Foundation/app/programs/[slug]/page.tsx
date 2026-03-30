import { notFound } from 'next/navigation';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { MonoLabel } from '@/components/ui/mono-label';
import { GlowButton } from '@/components/ui/glow-button';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { supabase, Program } from '@/lib/supabase';
import { PLACEHOLDER_PROGRAMS } from '@/lib/placeholder-programs';
import { Microscope, Mic, Heart, GraduationCap, Scale, ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const ICON_MAP: Record<string, React.ElementType> = {
  Microscope,
  Mic,
  Heart,
  GraduationCap,
  Scale,
};

const ACCENT_MAP: Record<string, string> = {
  ochre: 'text-accent-ochre',
  cyan: 'text-accent-cyan',
  clay: 'text-accent-clay',
};

const BG_MAP: Record<string, string> = {
  ochre: 'bg-accent-ochre/10',
  cyan: 'bg-accent-cyan/10',
  clay: 'bg-accent-clay/10',
};

async function getProgram(slug: string): Promise<Program | null> {
  const { data, error } = await supabase
    .from('programs')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  if (!error && data) return data;
  return PLACEHOLDER_PROGRAMS.find((p) => p.slug === slug) ?? null;
}

const HIGHLIGHTS = [
  'Open-source models and datasets released publicly',
  'Community-driven development with informed consent',
  'Ethical AI principles guiding every design decision',
  'Scalable infrastructure built for African network realities',
];

const PROGRAM_STATS = [
  { label: 'Languages Covered', value: '40+' },
  { label: 'Research Papers', value: '18' },
  { label: 'Communities Reached', value: '120+' },
  { label: 'Active Countries', value: '18' },
];

export default async function ProgramDetailPage({ params }: { params: { slug: string } }) {
  const program = await getProgram(params.slug);

  if (!program) {
    notFound();
  }

  const Icon = ICON_MAP[program.icon || 'Microscope'] || Microscope;
  const accent = ACCENT_MAP[program.color] || 'text-accent-ochre';
  const iconBg = BG_MAP[program.color] || 'bg-accent-ochre/10';

  return (
    <>
      <Navigation />
      <main className="pt-24">
        <section className="relative py-28 overflow-hidden bg-brand-deep">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 80% 60% at 60% -10%, rgba(245,166,35,0.06), transparent 70%)',
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px]"
          />

          <div className="container-wide section-padding relative z-10">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors mb-10"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              All Programs
            </Link>

            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 rounded-xl ${iconBg} flex items-center justify-center`}>
                  <Icon className={`w-7 h-7 ${accent}`} aria-hidden="true" />
                </div>
                <MonoLabel label="PROGRAM" status="active" />
              </div>

              <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary leading-tight mb-6">
                {program.title}
              </h1>

              {program.short_description && (
                <p className="text-lg text-text-secondary leading-relaxed max-w-2xl mb-10">
                  {program.short_description}
                </p>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {PROGRAM_STATS.map((stat) => (
                  <div key={stat.label} className="glass-card p-4 text-center">
                    <div
                      className="font-mono text-xl font-bold text-accent-ochre mb-1"
                      aria-label={stat.value}
                    >
                      {stat.value}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-text-tertiary">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-brand-surface">
          <div className="container-wide section-padding">
            <div className="grid lg:grid-cols-2 gap-10">
              <SpotlightCard spotlightColor="rgba(245,166,35,0.08)" className="p-8">
                <MonoLabel label="THE CHALLENGE" status="active" className="mb-5" />
                <h2 className="font-display text-2xl font-bold text-text-primary mb-4">
                  Why This Matters
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  {program.problem_statement || 'Details on the challenge this program addresses.'}
                </p>
              </SpotlightCard>

              <SpotlightCard spotlightColor="rgba(0,229,255,0.06)" className="p-8">
                <MonoLabel label="OUR APPROACH" status="active" className="mb-5" />
                <h2 className="font-display text-2xl font-bold text-text-primary mb-4">
                  How We Solve It
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  {program.solution || 'Details on the approach and solutions this program delivers.'}
                </p>
              </SpotlightCard>
            </div>
          </div>
        </section>

        <section className="py-20 bg-brand-deep">
          <div className="container-wide section-padding">
            <div className="max-w-3xl mx-auto">
              <MonoLabel label="IN DEPTH" className="mb-5" />
              <h2 className="font-display text-2xl font-bold text-text-primary mb-6">
                Program Details
              </h2>
              <div className="text-text-secondary leading-relaxed space-y-4">
                <p>
                  {program.full_description ||
                    program.short_description ||
                    `${program.title} is part of LocaleNLP Foundation's commitment to building open, ethical language technology for African communities. This program advances our mission of digital sovereignty and linguistic inclusion — ensuring that speakers of all African languages can participate fully in the digital future.`}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-brand-deep">
          <div className="container-wide section-padding">
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <div>
                <MonoLabel label="PROGRAM HIGHLIGHTS" className="mb-5" />
                <h2 className="font-display text-2xl font-bold text-text-primary mb-6">
                  What We Deliver
                </h2>
                <ul className="space-y-4">
                  {HIGHLIGHTS.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3">
                      <CheckCircle
                        className="w-5 h-5 text-accent-ochre mt-0.5 shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-text-secondary">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-card p-8">
                <h3 className="font-display text-xl font-semibold text-text-primary mb-3">
                  Get Involved with {program.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-6">
                  Interested in contributing? Whether you are a researcher, developer, or community
                  partner, there are many ways to participate.
                </p>
                <div className="flex flex-col gap-3">
                  <GlowButton href="/get-involved#contact" variant="primary">
                    Partner With Us
                  </GlowButton>
                  <GlowButton href="/donate" variant="ghost">
                    Support This Program
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
