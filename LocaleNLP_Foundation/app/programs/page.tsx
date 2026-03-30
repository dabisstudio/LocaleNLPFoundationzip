import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { PageHeader } from '@/components/ui/page-header';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { MonoLabel } from '@/components/ui/mono-label';
import { GlowButton } from '@/components/ui/glow-button';
import { supabase, Program } from '@/lib/supabase';
import { Microscope, Mic, Heart, GraduationCap, Scale, ArrowRight } from 'lucide-react';
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

const SPOTLIGHT_MAP: Record<string, string> = {
  ochre: 'rgba(245,166,35,0.1)',
  cyan: 'rgba(0,229,255,0.08)',
  clay: 'rgba(224,122,95,0.1)',
};

const PLACEHOLDER_PROGRAMS: Program[] = [
  {
    id: 'p1',
    slug: 'afrispeech',
    title: 'AfriSpeech',
    short_description: 'ASR & TTS for 100+ African languages',
    problem_statement:
      'Only ~25 African languages have any speech technology coverage. 2,000+ remain completely undigitized.',
    solution:
      'Community-led voice data collection pipelines paired with multilingual ASR/TTS model training at continental scale.',
    icon: 'Mic',
    color: 'ochre',
    is_featured: true,
    order_index: 1,
    full_description: null,
    created_at: '',
  },
  {
    id: 'p2',
    slug: 'afrimt',
    title: 'AfriMT',
    short_description: 'Neural machine translation across African language families',
    problem_statement:
      'Cross-language communication in Africa relies on colonial-era intermediary languages, excluding millions.',
    solution:
      'Direct African-to-African neural translation models trained on parallel corpora we collect and curate.',
    icon: 'Microscope',
    color: 'cyan',
    is_featured: true,
    order_index: 2,
    full_description: null,
    created_at: '',
  },
  {
    id: 'p3',
    slug: 'language-documentation',
    title: 'Documentation Initiative',
    short_description: 'Preserving endangered languages before they are lost',
    problem_statement:
      'Hundreds of African languages have fewer than 10,000 speakers. Without documentation, they will vanish within decades.',
    solution:
      'Rapid-documentation protocols co-designed with linguists and community elders for endangered language archiving.',
    icon: 'BookOpen',
    color: 'clay',
    is_featured: false,
    order_index: 3,
    full_description: null,
    created_at: '',
  },
  {
    id: 'p4',
    slug: 'aixlanguage-fellowship',
    title: 'AIxLanguage Fellowship',
    short_description: 'Growing African NLP research capacity',
    problem_statement:
      'The global NLP research community has almost no representation from African linguists and engineers.',
    solution:
      'Fully-funded 12-month fellowships placing African researchers in immersive NLP research and engineering roles.',
    icon: 'GraduationCap',
    color: 'ochre',
    is_featured: true,
    order_index: 4,
    full_description: null,
    created_at: '',
  },
  {
    id: 'p5',
    slug: 'language-policy',
    title: 'Language Policy Advocacy',
    short_description: 'Shaping national AI strategies for linguistic inclusion',
    problem_statement:
      'Governments deploy AI systems in English or French, ignoring the majority of their population.',
    solution:
      'Policy briefs, government partnerships, and capacity-building programs to embed language equity in national AI strategies.',
    icon: 'Scale',
    color: 'cyan',
    is_featured: false,
    order_index: 5,
    full_description: null,
    created_at: '',
  },
  {
    id: 'p6',
    slug: 'community-health',
    title: 'Health Communication',
    short_description: 'Deploying language AI in healthcare settings',
    problem_statement:
      'Patients cannot communicate symptoms or understand diagnoses in health systems that operate in foreign languages.',
    solution:
      'Tailored ASR + NMT pipelines deployed in clinic settings, enabling healthcare professionals to serve patients in local languages.',
    icon: 'Heart',
    color: 'clay',
    is_featured: false,
    order_index: 6,
    full_description: null,
    created_at: '',
  },
];

async function getPrograms(): Promise<Program[]> {
  const { data, error } = await supabase.from('programs').select('*').order('order_index');
  if (error || !data || data.length === 0) return PLACEHOLDER_PROGRAMS;
  return data;
}

export default async function ProgramsPage() {
  const programs = await getPrograms();
  const featured = programs.filter((p) => p.is_featured);
  const rest = programs.filter((p) => !p.is_featured);

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

        <section id="programs" className="py-20 bg-brand-surface">
          <div className="container-wide section-padding">
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
                  {rest.map((program) => {
                    const Icon = ICON_MAP[program.icon || 'Microscope'] || Microscope;
                    const accent = ACCENT_MAP[program.color] || 'text-accent-ochre';
                    return (
                      <SpotlightCard
                        key={program.id}
                        spotlightColor="rgba(255,255,255,0.04)"
                        className="p-6"
                      >
                        <Icon className={`w-6 h-6 ${accent} mb-4`} aria-hidden="true" />
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
