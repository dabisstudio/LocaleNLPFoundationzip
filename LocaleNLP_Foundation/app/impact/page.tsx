import Link from 'next/link';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import ImpactMapSection from '@/components/home/ImpactMapSection';
import { supabase, ImpactMetric, CaseStudy, Country } from '@/lib/supabase';
import { ArrowRight, Heart, Stethoscope, GraduationCap, Tractor } from 'lucide-react';

async function getData() {
  const [metricsRes, caseStudiesRes, countriesRes] = await Promise.all([
    supabase.from('impact_metrics').select('*').order('order_index'),
    supabase.from('case_studies').select('*').eq('is_featured', true),
    supabase.from('countries').select('*').order('active_projects', { ascending: false }),
  ]);

  return {
    metrics: (metricsRes.data || []) as ImpactMetric[],
    caseStudies: (caseStudiesRes.data || []) as CaseStudy[],
    countries: (countriesRes.data || []) as Country[],
  };
}

const useCases = [
  {
    icon: Stethoscope,
    sector: 'Healthcare',
    title: 'Medical Hotlines in Local Languages',
    description:
      'Our speech recognition enables health hotlines to serve patients in Yoruba, Swahili, and 10 other languages.',
    impact: '50,000+ calls processed monthly',
    color: 'from-forest-500 to-forest-600',
  },
  {
    icon: GraduationCap,
    sector: 'Education',
    title: 'Mother-Tongue Learning Apps',
    description:
      'Children learn to read using apps that understand and respond in their native language.',
    impact: '25,000+ students reached',
    color: 'from-royal-500 to-royal-600',
  },
  {
    icon: Tractor,
    sector: 'Agriculture',
    title: 'Farming Advisories via SMS & Voice',
    description:
      'Farmers receive weather and crop advice through automated voice calls in local languages.',
    impact: '100,000+ farmers served',
    color: 'from-ochre-500 to-ochre-600',
  },
];

export default async function ImpactPage() {
  const { metrics, caseStudies, countries } = await getData();

  return (
    <>
      <Navigation />
      <main className="pt-20">
        <section className="py-24 bg-hero-gradient relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-forest-500/10 rounded-full blur-3xl" />
          </div>

          <div className="container-wide section-padding relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-forest-500/10 text-forest-400 text-sm font-medium mb-6">
                Our Impact
              </span>
              <h1 className="text-white mb-6">
                Real Technology.
                <br />
                <span className="text-gradient">Real Lives Changed.</span>
              </h1>
              <p className="text-lg text-midnight-200">
                We measure our success not in papers published, but in communities empowered and
                barriers broken.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-midnight-950">
          <div className="container-wide section-padding">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {metrics.map((metric) => (
                <div key={metric.id} className="stat-card">
                  <div className="stat-number">{metric.value}</div>
                  <div className="stat-label">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ImpactMapSection initialCountries={countries} />

        <section className="py-20 bg-midnight-950">
          <div className="container-wide section-padding">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-ochre-500/10 text-ochre-400 text-sm font-medium mb-4">
                Use Cases
              </span>
              <h2 className="text-white mb-4">Technology in Action</h2>
              <p className="text-midnight-200 max-w-2xl mx-auto">
                From healthcare to education to agriculture, our technology is deployed where it
                matters most.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {useCases.map((useCase) => (
                <div key={useCase.sector} className="glass-card p-8">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${useCase.color} flex items-center justify-center mb-6`}
                  >
                    <useCase.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-xs uppercase tracking-wider text-midnight-400 mb-2 block">
                    {useCase.sector}
                  </span>
                  <h3 className="text-xl font-sora font-semibold text-white mb-3">
                    {useCase.title}
                  </h3>
                  <p className="text-midnight-300 text-sm mb-4">{useCase.description}</p>
                  <div className="pt-4 border-t border-midnight-700">
                    <p className="text-sm font-medium text-ochre-400">{useCase.impact}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-midnight-900">
          <div className="container-wide section-padding">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-royal-500/10 text-royal-400 text-sm font-medium mb-4">
                Case Studies
              </span>
              <h2 className="text-white mb-4">Stories of Change</h2>
              <p className="text-midnight-200 max-w-2xl mx-auto">
                Behind every statistic is a community transformed.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {caseStudies.map((study) => (
                <div
                  key={study.id}
                  className="glass-card overflow-hidden group hover:border-midnight-500 transition-all"
                >
                  <div className="h-48 bg-gradient-to-br from-midnight-700 to-midnight-800 flex items-center justify-center">
                    <Heart className="w-12 h-12 text-midnight-500" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-sora font-semibold text-white mb-2 group-hover:text-ochre-400 transition-colors">
                      {study.title}
                    </h3>
                    <p className="text-sm text-midnight-300 mb-4">{study.summary}</p>
                    <Link
                      href={`/insights/${study.slug}`}
                      className="inline-flex items-center text-sm text-royal-400 font-medium"
                    >
                      Read Full Story
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-midnight-950">
          <div className="container-wide section-padding text-center">
            <h2 className="text-white mb-4">Help Us Scale Our Impact</h2>
            <p className="text-midnight-200 max-w-lg mx-auto mb-8">
              Every contribution helps us reach more communities, digitize more languages, and
              build a more inclusive future.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/donate" className="btn-primary">
                Donate Now
              </Link>
              <Link href="/get-involved" className="btn-outline">
                Partner With Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
