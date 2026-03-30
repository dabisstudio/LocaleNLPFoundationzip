import Link from 'next/link';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { supabase, Program } from '@/lib/supabase';
import { ArrowRight, Microscope, Mic, Heart, GraduationCap, Scale } from 'lucide-react';

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

async function getPrograms(): Promise<Program[]> {
  const { data, error } = await supabase.from('programs').select('*').order('order_index');

  if (error) return [];
  return data || [];
}

export default async function ProgramsPage() {
  const programs = await getPrograms();

  return (
    <>
      <Navigation />
      <main className="pt-20">
        <section className="py-24 bg-hero-gradient relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-ochre-500/10 rounded-full blur-3xl" />
          </div>

          <div className="container-wide section-padding relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-ochre-500/10 text-ochre-400 text-sm font-medium mb-6">
                Our Programs
              </span>
              <h1 className="text-white mb-6">
                From Research
                <br />
                <span className="text-gradient">to Real-World Impact</span>
              </h1>
              <p className="text-lg text-midnight-200">
                Our programs span the full lifecycle of language technology: from foundational
                research to community deployment, from policy advocacy to talent development.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-midnight-900">
          <div className="container-wide section-padding">
            <div className="space-y-8">
              {programs.map((program, i) => {
                const Icon = iconMap[program.icon || 'Microscope'] || Microscope;
                const gradientClass = colorMap[program.color] || colorMap.royal;

                return (
                  <div
                    key={program.id}
                    className="glass-card p-8 md:p-10 hover:border-midnight-500 transition-all duration-300"
                  >
                    <div className="grid lg:grid-cols-3 gap-8 items-start">
                      <div className="lg:col-span-1">
                        <div
                          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradientClass} flex items-center justify-center mb-4`}
                        >
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <h2 className="text-2xl font-sora font-bold text-white mb-2">
                          {program.title}
                        </h2>
                        <p className="text-midnight-300 text-sm mb-4">
                          {program.short_description}
                        </p>
                        <Link
                          href={`/programs/${program.slug}`}
                          className="inline-flex items-center text-sm font-medium text-ochre-400 hover:text-ochre-300 transition-colors"
                        >
                          Learn more
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                      </div>

                      <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
                        <div className="bg-midnight-800/50 rounded-lg p-6">
                          <h4 className="text-sm font-medium text-midnight-400 uppercase tracking-wider mb-3">
                            The Problem
                          </h4>
                          <p className="text-midnight-200 text-sm">{program.problem_statement}</p>
                        </div>
                        <div className="bg-midnight-800/50 rounded-lg p-6">
                          <h4 className="text-sm font-medium text-midnight-400 uppercase tracking-wider mb-3">
                            Our Solution
                          </h4>
                          <p className="text-midnight-200 text-sm">{program.solution}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 bg-midnight-950">
          <div className="container-wide section-padding text-center">
            <h2 className="text-white mb-4">Ready to Get Involved?</h2>
            <p className="text-midnight-200 max-w-lg mx-auto mb-8">
              Whether you are a researcher, developer, funder, or community member, there is a
              place for you in our mission.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/get-involved" className="btn-primary">
                Join Us
              </Link>
              <Link href="/donate" className="btn-outline">
                Support Our Work
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
