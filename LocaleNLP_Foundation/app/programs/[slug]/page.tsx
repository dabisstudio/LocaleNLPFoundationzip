import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { supabase, Program } from '@/lib/supabase';
import { ArrowLeft, Microscope, Mic, Heart, GraduationCap, Scale, CheckCircle } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Microscope,
  Mic,
  Heart,
  GraduationCap,
  Scale,
};

const colorMap: Record<string, string> = {
  royal: 'from-royal-500 to-royal-600',
  ochre: 'from-ochre-500 to-ochre-600',
  forest: 'from-forest-500 to-forest-600',
  midnight: 'from-midnight-500 to-midnight-600',
};

async function getProgram(slug: string): Promise<Program | null> {
  const { data, error } = await supabase
    .from('programs')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error || !data) return null;
  return data;
}

export default async function ProgramDetailPage({ params }: { params: { slug: string } }) {
  const program = await getProgram(params.slug);

  if (!program) {
    notFound();
  }

  const Icon = iconMap[program.icon || 'Microscope'] || Microscope;
  const gradientClass = colorMap[program.color] || colorMap.royal;

  const highlights = [
    'Open-source models and datasets',
    'Community-driven development',
    'Ethical AI principles',
    'Scalable solutions',
  ];

  return (
    <>
      <Navigation />
      <main className="pt-20">
        <section className="py-24 bg-hero-gradient relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-royal-500/10 rounded-full blur-3xl" />
          </div>

          <div className="container-wide section-padding relative z-10">
            <Link
              href="/programs"
              className="inline-flex items-center text-midnight-300 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              All Programs
            </Link>

            <div className="max-w-3xl">
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradientClass} flex items-center justify-center mb-6`}
              >
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-white mb-6">{program.title}</h1>
              <p className="text-lg text-midnight-200">{program.short_description}</p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-midnight-900">
          <div className="container-wide section-padding">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-royal-500/10 text-royal-400 text-sm font-medium mb-4">
                  The Challenge
                </span>
                <h2 className="text-white mb-6">Why This Matters</h2>
                <p className="text-midnight-200 text-lg">{program.problem_statement}</p>
              </div>

              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-forest-500/10 text-forest-400 text-sm font-medium mb-4">
                  Our Approach
                </span>
                <h2 className="text-white mb-6">How We Solve It</h2>
                <p className="text-midnight-200 text-lg">{program.solution}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-midnight-950">
          <div className="container-wide section-padding">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-ochre-500/10 text-ochre-400 text-sm font-medium mb-4">
                  What We Deliver
                </span>
                <h2 className="text-white mb-6">Program Highlights</h2>
                <ul className="space-y-4">
                  {highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-forest-400 mt-0.5 flex-shrink-0" />
                      <span className="text-midnight-200">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-card p-8">
                <h3 className="text-xl font-sora font-semibold text-white mb-4">Get Involved</h3>
                <p className="text-midnight-300 mb-6">
                  Interested in contributing to {program.title}? There are many ways to participate
                  whether as a researcher, developer, or community partner.
                </p>
                <div className="space-y-3">
                  <Link href="/get-involved#partner" className="btn-primary w-full justify-center">
                    Partner With Us
                  </Link>
                  <Link href="/donate" className="btn-outline w-full justify-center">
                    Support This Program
                  </Link>
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
