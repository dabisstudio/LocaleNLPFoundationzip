import Link from 'next/link';
import { ArrowRight, Microscope, Mic, Heart, GraduationCap, Scale } from 'lucide-react';
import { supabase, Program } from '@/lib/supabase';

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
  const { data, error } = await supabase
    .from('programs')
    .select('*')
    .eq('is_featured', true)
    .order('order_index');

  if (error) {
    console.error('Error fetching programs:', error);
    return [];
  }
  return data || [];
}

export default async function ProgramsSection() {
  const programs = await getPrograms();

  return (
    <section className="py-24 bg-midnight-950 relative">
      <div className="container-wide section-padding">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-ochre-500/10 text-ochre-400 text-sm font-medium mb-4">
            Our Programs
          </span>
          <h2 className="text-white mb-4">How We Are Building the Future</h2>
          <p className="text-midnight-200 max-w-2xl mx-auto">
            From foundational research to community deployment, our programs work together to create
            a complete ecosystem for African language technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {programs.map((program, i) => {
            const Icon = iconMap[program.icon || 'Globe'] || Microscope;
            const gradientClass = colorMap[program.color] || colorMap.royal;

            return (
              <Link
                key={program.id}
                href={`/programs/${program.slug}`}
                className="glass-card p-6 md:p-8 group hover:border-midnight-500 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity rounded-bl-full" />

                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradientClass} flex items-center justify-center mb-4`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl font-sora font-semibold text-white mb-2 group-hover:text-ochre-400 transition-colors">
                  {program.title}
                </h3>

                <p className="text-midnight-300 text-sm mb-4">{program.short_description}</p>

                <div className="flex items-center text-sm text-royal-400 font-medium">
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/programs" className="btn-outline">
            View All Programs
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
