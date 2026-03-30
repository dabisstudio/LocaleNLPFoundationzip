import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { MonoLabel } from '@/components/ui/mono-label';

interface ProgramCard {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  stat: string;
  monoNumber: string;
  initiative: string;
}

const PLACEHOLDER_PROGRAMS: ProgramCard[] = [
  {
    id: '1',
    title: 'Language Futures Lab',
    slug: 'language-futures-lab',
    short_description:
      'Research and development hub for low-resource African language models, benchmarks, and evaluation frameworks.',
    stat: '147 datasets',
    monoNumber: '01',
    initiative: 'RESEARCH',
  },
  {
    id: '2',
    title: 'OpenSpeech Initiative',
    slug: 'openspeech-initiative',
    short_description:
      'Community-led effort to collect, annotate, and release speech data for 200+ African languages under open licences.',
    stat: '12K hours',
    monoNumber: '02',
    initiative: 'COLLECTION',
  },
  {
    id: '3',
    title: 'NLP for Public Good',
    slug: 'nlp-public-good',
    short_description:
      'Deploying language AI in healthcare, civic participation, and financial services across 12 partner countries.',
    stat: '4M users',
    monoNumber: '03',
    initiative: 'DEPLOYMENT',
  },
  {
    id: '4',
    title: 'AIxLanguage Fellowship',
    slug: 'aixlanguage-fellowship',
    short_description:
      'Training the next generation of African computational linguists and ML engineers through paid fellowships.',
    stat: '240 fellows',
    monoNumber: '04',
    initiative: 'EDUCATION',
  },
];

async function getPrograms(): Promise<ProgramCard[]> {
  try {
    const { data, error } = await supabase
      .from('programs')
      .select('id, title, slug, short_description')
      .eq('is_featured', true)
      .order('order_index');

    if (error || !data?.length) return PLACEHOLDER_PROGRAMS;

    return data.map((p, i) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      short_description: p.short_description,
      stat: PLACEHOLDER_PROGRAMS[i % PLACEHOLDER_PROGRAMS.length]?.stat ?? '',
      monoNumber: String(i + 1).padStart(2, '0'),
      initiative: PLACEHOLDER_PROGRAMS[i % PLACEHOLDER_PROGRAMS.length]?.initiative ?? 'PROGRAM',
    }));
  } catch {
    return PLACEHOLDER_PROGRAMS;
  }
}

export default async function ProgramsSection() {
  const programs = await getPrograms();
  const [p0, p1, p2, p3] = programs;

  return (
    <section className="py-24 relative" style={{ backgroundColor: '#020205' }}>
      <div className="container-wide section-padding">
        <div className="text-center mb-4">
          <MonoLabel label="OUR PROGRAMS" number="03" status="active" />
        </div>
        <h2 className="text-center text-white mt-4 mb-3">How We Build the Future</h2>
        <p className="text-center text-text-secondary max-w-2xl mx-auto mb-12">
          From foundational research to community deployment, each program forms one layer
          of a complete language infrastructure for Africa.
        </p>

        {/* Asymmetric bento grid — CSS Grid only, no Flexbox */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Large card — spans 2 rows on md+ */}
          {p0 && (
            <div className="md:row-span-2">
              <SpotlightCard className="h-full p-8 flex flex-col justify-between min-h-[320px]">
                <div>
                  <MonoLabel label={p0.initiative} number={p0.monoNumber} status="active" className="mb-5" />
                  <h3 className="font-display text-xl md:text-2xl font-semibold text-white mb-3">
                    {p0.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {p0.short_description}
                  </p>
                </div>
                <div className="mt-6 flex items-end justify-between">
                  <div className="font-mono text-2xl font-bold text-accent-ochre">{p0.stat}</div>
                  <Link
                    href={`/programs/${p0.slug}`}
                    className="group inline-flex items-center gap-1 text-sm text-text-secondary hover:text-white transition-colors duration-200"
                    aria-label={`Learn more about ${p0.title}`}
                  >
                    Learn more
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 ease-apple-ease group-hover:translate-x-1" />
                  </Link>
                </div>
              </SpotlightCard>
            </div>
          )}

          {/* Small card — top right */}
          {p1 && (
            <SpotlightCard className="p-6 flex flex-col justify-between">
              <div>
                <MonoLabel label={p1.initiative} number={p1.monoNumber} status="active" className="mb-4" />
                <h3 className="font-display text-lg font-semibold text-white mb-2">{p1.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
                  {p1.short_description}
                </p>
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div className="font-mono text-xl font-bold text-accent-cyan">{p1.stat}</div>
                <Link
                  href={`/programs/${p1.slug}`}
                  className="group inline-flex items-center gap-1 text-sm text-text-secondary hover:text-white transition-colors duration-200"
                  aria-label={`Learn more about ${p1.title}`}
                >
                  Learn more
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 ease-apple-ease group-hover:translate-x-1" />
                </Link>
              </div>
            </SpotlightCard>
          )}

          {/* Small card — bottom right */}
          {p2 && (
            <SpotlightCard className="p-6 flex flex-col justify-between">
              <div>
                <MonoLabel label={p2.initiative} number={p2.monoNumber} status="active" className="mb-4" />
                <h3 className="font-display text-lg font-semibold text-white mb-2">{p2.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
                  {p2.short_description}
                </p>
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div className="font-mono text-xl font-bold text-accent-clay">{p2.stat}</div>
                <Link
                  href={`/programs/${p2.slug}`}
                  className="group inline-flex items-center gap-1 text-sm text-text-secondary hover:text-white transition-colors duration-200"
                  aria-label={`Learn more about ${p2.title}`}
                >
                  Learn more
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 ease-apple-ease group-hover:translate-x-1" />
                </Link>
              </div>
            </SpotlightCard>
          )}

          {/* Wide card — spans full width */}
          {p3 && (
            <div className="md:col-span-2">
              <SpotlightCard className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="flex-1">
                    <MonoLabel label={p3.initiative} number={p3.monoNumber} status="active" className="mb-3" />
                    <h3 className="font-display text-lg md:text-xl font-semibold text-white mb-2">
                      {p3.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed max-w-xl">
                      {p3.short_description}
                    </p>
                  </div>
                  <div className="flex items-center gap-8 shrink-0">
                    <div className="font-mono text-2xl font-bold text-accent-ochre">{p3.stat}</div>
                    <Link
                      href={`/programs/${p3.slug}`}
                      className="group inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-white transition-colors duration-200 whitespace-nowrap"
                      aria-label={`Learn more about ${p3.title}`}
                    >
                      Learn more
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 ease-apple-ease group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          )}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-white transition-colors duration-200 font-mono tracking-wide"
          >
            View all programs
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
