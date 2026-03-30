import Link from 'next/link';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { supabase, Publication, CaseStudy } from '@/lib/supabase';
import { ArrowRight, FileText, BookOpen, Newspaper, Calendar } from 'lucide-react';

async function getData() {
  const [publicationsRes, caseStudiesRes] = await Promise.all([
    supabase.from('publications').select('*').order('publication_date', { ascending: false }),
    supabase.from('case_studies').select('*').order('created_at', { ascending: false }),
  ]);

  return {
    publications: (publicationsRes.data || []) as Publication[],
    caseStudies: (caseStudiesRes.data || []) as CaseStudy[],
  };
}

const typeIcons: Record<string, React.ElementType> = {
  paper: FileText,
  brief: BookOpen,
  report: Newspaper,
};

const typeColors: Record<string, string> = {
  paper: 'bg-royal-500/10 text-royal-400',
  brief: 'bg-ochre-500/10 text-ochre-400',
  report: 'bg-forest-500/10 text-forest-400',
};

export default async function InsightsPage() {
  const { publications, caseStudies } = await getData();

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
              <span className="inline-block px-4 py-1.5 rounded-full bg-royal-500/10 text-royal-400 text-sm font-medium mb-6">
                Insights
              </span>
              <h1 className="text-white mb-6">
                Research, Stories &
                <br />
                <span className="text-gradient">Policy Perspectives</span>
              </h1>
              <p className="text-lg text-midnight-200">
                Explore our publications, field stories, and policy briefs shaping the future of
                African language technology.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-midnight-900">
          <div className="container-wide section-padding">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-white mb-2">Research & Publications</h2>
                <p className="text-midnight-300">Our latest papers, briefs, and reports</p>
              </div>
            </div>

            {publications.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {publications.map((pub) => {
                  const Icon = typeIcons[pub.publication_type] || FileText;
                  const colorClass = typeColors[pub.publication_type] || typeColors.paper;

                  return (
                    <article
                      key={pub.id}
                      className="glass-card p-6 hover:border-midnight-500 transition-all group"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${colorClass}`}>
                          {pub.publication_type.charAt(0).toUpperCase() +
                            pub.publication_type.slice(1)}
                        </span>
                        {pub.publication_date && (
                          <span className="flex items-center gap-1 text-xs text-midnight-400">
                            <Calendar className="w-3 h-3" />
                            {new Date(pub.publication_date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                            })}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-sora font-semibold text-white mb-2 group-hover:text-ochre-400 transition-colors">
                        {pub.title}
                      </h3>

                      {pub.authors && (
                        <p className="text-xs text-midnight-400 mb-3">{pub.authors}</p>
                      )}

                      {pub.abstract && (
                        <p className="text-sm text-midnight-300 mb-4 line-clamp-3">
                          {pub.abstract}
                        </p>
                      )}

                      <div className="flex items-center gap-4">
                        {pub.pdf_url && (
                          <a
                            href={pub.pdf_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm text-royal-400 hover:text-royal-300 transition-colors"
                          >
                            <FileText className="w-4 h-4 mr-1" />
                            PDF
                          </a>
                        )}
                        {pub.external_url && (
                          <a
                            href={pub.external_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm text-ochre-400 hover:text-ochre-300 transition-colors"
                          >
                            Read More
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </a>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="glass-card p-12 text-center">
                <BookOpen className="w-12 h-12 text-midnight-500 mx-auto mb-4" />
                <h3 className="text-lg font-sora font-semibold text-white mb-2">
                  Publications Coming Soon
                </h3>
                <p className="text-midnight-300">
                  We are working on exciting research. Check back soon for our latest publications.
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="py-20 bg-midnight-950">
          <div className="container-wide section-padding">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-white mb-2">Stories from the Field</h2>
                <p className="text-midnight-300">
                  Real impact, real communities, real change
                </p>
              </div>
            </div>

            {caseStudies.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {caseStudies.map((story) => (
                  <article
                    key={story.id}
                    className="glass-card overflow-hidden group hover:border-midnight-500 transition-all"
                  >
                    <div className="h-48 bg-gradient-to-br from-midnight-700 to-midnight-800 relative">
                      {story.image_url ? (
                        <img
                          src={story.image_url}
                          alt={story.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <BookOpen className="w-12 h-12 text-midnight-500" />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-sora font-semibold text-white mb-2 group-hover:text-ochre-400 transition-colors">
                        {story.title}
                      </h3>
                      <p className="text-sm text-midnight-300 mb-4 line-clamp-2">{story.summary}</p>
                      <Link
                        href={`/insights/${story.slug}`}
                        className="inline-flex items-center text-sm text-royal-400 font-medium"
                      >
                        Read Full Story
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="glass-card p-12 text-center">
                <Newspaper className="w-12 h-12 text-midnight-500 mx-auto mb-4" />
                <h3 className="text-lg font-sora font-semibold text-white mb-2">
                  Stories Coming Soon
                </h3>
                <p className="text-midnight-300">
                  We are documenting impact stories from communities across Africa.
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="py-20 bg-midnight-900">
          <div className="container-wide section-padding">
            <div className="glass-card p-8 md:p-12 text-center">
              <h2 className="text-white mb-4">Stay Updated</h2>
              <p className="text-midnight-200 mb-6 max-w-lg mx-auto">
                Get our latest research, impact stories, and policy updates delivered to your inbox.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-midnight-800 border border-midnight-600 rounded-lg text-white placeholder:text-midnight-400 focus:outline-none focus:border-royal-500 transition-colors"
                />
                <button type="submit" className="btn-primary whitespace-nowrap">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
