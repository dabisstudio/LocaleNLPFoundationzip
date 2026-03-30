import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { PageHeader } from '@/components/ui/page-header';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { MonoLabel } from '@/components/ui/mono-label';
import { GlowButton } from '@/components/ui/glow-button';
import { supabase, Publication, CaseStudy } from '@/lib/supabase';
import { ArrowRight, FileText, BookOpen, Newspaper, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';

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

const TYPE_SPOTS: Record<string, string> = {
  paper: 'rgba(245,166,35,0.1)',
  brief: 'rgba(0,229,255,0.08)',
  report: 'rgba(224,122,95,0.1)',
};

const READ_TIME: Record<string, string> = {
  paper: '8–12 min',
  brief: '3–5 min',
  report: '10–20 min',
};

export default async function InsightsPage() {
  const { publications, caseStudies } = await getData();

  return (
    <>
      <Navigation />
      <main className="pt-24">
        <PageHeader
          label="INSIGHTS"
          number="00"
          title="Research, Stories &"
          titleGradient="Policy Perspectives"
          subtitle="Explore our publications, field stories, and policy briefs shaping the future of African language technology — from lab to community."
          accentColor="ochre"
        >
          <GlowButton href="#publications" variant="primary" showArrow={false}>
            Browse Publications
          </GlowButton>
          <GlowButton href="#stories" variant="ghost" showArrow={false}>
            Field Stories
          </GlowButton>
        </PageHeader>

        <section id="publications" className="py-20 bg-brand-surface">
          <div className="container-wide section-padding">
            <div className="flex items-start justify-between mb-12 flex-wrap gap-4">
              <div>
                <MonoLabel label="RESEARCH & PUBLICATIONS" number="01" className="mb-3" />
                <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary">
                  Our Latest Work
                </h2>
              </div>
            </div>

            {publications.length > 0 ? (
              <div
                className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
                style={{ columnGap: '1.5rem' }}
              >
                {publications.map((pub) => {
                  const spot = TYPE_SPOTS[pub.publication_type] || 'rgba(245,166,35,0.1)';
                  const readTime = READ_TIME[pub.publication_type] || '5 min';
                  const typeLabel =
                    pub.publication_type.charAt(0).toUpperCase() + pub.publication_type.slice(1);

                  return (
                    <div key={pub.id} className="break-inside-avoid mb-6">
                      <SpotlightCard spotlightColor={spot} className="p-6 group">
                        <div className="flex items-center gap-3 mb-4 flex-wrap">
                          <MonoLabel label={typeLabel.toUpperCase()} />
                          {pub.publication_date && (
                            <span className="inline-flex items-center gap-1 font-mono text-xs text-text-tertiary">
                              <Calendar className="w-3 h-3" aria-hidden="true" />
                              {new Date(pub.publication_date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                              })}
                            </span>
                          )}
                          <span className="inline-flex items-center gap-1 font-mono text-xs text-text-tertiary">
                            <Clock className="w-3 h-3" aria-hidden="true" />
                            {readTime}
                          </span>
                        </div>

                        <h3 className="font-display text-base font-semibold text-text-primary mb-2 group-hover:text-accent-ochre transition-colors leading-snug">
                          {pub.title}
                        </h3>

                        {pub.authors && (
                          <p className="font-mono text-xs text-text-tertiary mb-3">{pub.authors}</p>
                        )}

                        {pub.abstract && (
                          <p className="text-text-secondary text-sm leading-relaxed mb-5 line-clamp-4">
                            {pub.abstract}
                          </p>
                        )}

                        <div className="flex items-center gap-4 pt-4 border-t border-white/8">
                          {pub.pdf_url && (
                            <a
                              href={pub.pdf_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-accent-ochre hover:opacity-80 transition-opacity font-medium"
                            >
                              <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                              PDF
                            </a>
                          )}
                          {pub.external_url && (
                            <a
                              href={pub.external_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-accent-cyan hover:opacity-80 transition-opacity font-medium"
                            >
                              Read More
                              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                            </a>
                          )}
                        </div>
                      </SpotlightCard>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="glass-card p-12 text-center max-w-lg mx-auto">
                <BookOpen className="w-10 h-10 text-text-tertiary mx-auto mb-4" aria-hidden="true" />
                <h3 className="font-display text-lg font-semibold text-text-primary mb-2">
                  Publications Coming Soon
                </h3>
                <p className="text-text-secondary text-sm">
                  We are preparing research publications for release. Check back soon for our latest
                  papers and policy briefs.
                </p>
              </div>
            )}
          </div>
        </section>

        <section id="stories" className="py-20 bg-brand-deep">
          <div className="container-wide section-padding">
            <div className="flex items-start justify-between mb-12 flex-wrap gap-4">
              <div>
                <MonoLabel label="STORIES FROM THE FIELD" number="02" className="mb-3" />
                <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary">
                  Real Impact, Real Communities
                </h2>
              </div>
            </div>

            {caseStudies.length > 0 ? (
              <div
                className="columns-1 md:columns-2 lg:columns-3 gap-6"
                style={{ columnGap: '1.5rem' }}
              >
                {caseStudies.map((story) => (
                  <div key={story.id} className="break-inside-avoid mb-6">
                    <SpotlightCard
                      spotlightColor="rgba(245,166,35,0.08)"
                      className="overflow-hidden group"
                    >
                      <div className="h-44 bg-gradient-to-br from-brand-elevated to-brand-surface relative">
                        {story.image_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={story.image_url}
                            alt={story.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <BookOpen className="w-10 h-10 text-white/10" aria-hidden="true" />
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary px-2 py-0.5 rounded bg-white/5">
                            Field Story
                          </span>
                          <span className="inline-flex items-center gap-1 font-mono text-xs text-text-tertiary">
                            <Clock className="w-3 h-3" aria-hidden="true" />
                            5–8 min
                          </span>
                        </div>
                        <h3 className="font-display text-base font-semibold text-text-primary mb-2 group-hover:text-accent-ochre transition-colors">
                          {story.title}
                        </h3>
                        {story.summary && (
                          <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
                            {story.summary}
                          </p>
                        )}
                        <Link
                          href={`/insights/${story.slug}`}
                          className="inline-flex items-center gap-1.5 text-sm text-accent-ochre font-medium hover:opacity-80 transition-opacity"
                        >
                          Read Full Story
                          <ArrowRight
                            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                            aria-hidden="true"
                          />
                        </Link>
                      </div>
                    </SpotlightCard>
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass-card p-12 text-center max-w-lg mx-auto">
                <Newspaper className="w-10 h-10 text-text-tertiary mx-auto mb-4" aria-hidden="true" />
                <h3 className="font-display text-lg font-semibold text-text-primary mb-2">
                  Stories Coming Soon
                </h3>
                <p className="text-text-secondary text-sm">
                  We are documenting impact stories from communities across Africa. Check back soon.
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="py-20 bg-brand-surface">
          <div className="container-wide section-padding">
            <div className="glass-card p-10 md:p-14 text-center max-w-3xl mx-auto">
              <MonoLabel label="STAY UPDATED" status="active" className="mb-5" />
              <h2 className="font-display text-3xl font-bold text-text-primary mb-4">
                Never Miss a Publication
              </h2>
              <p className="text-text-secondary mb-8 max-w-lg mx-auto">
                Get our latest research, impact stories, and policy updates delivered to your inbox.
                No spam — just important work.
              </p>
              <form
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                aria-label="Newsletter signup"
              >
                <label htmlFor="insights-email" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  id="insights-email"
                  autoComplete="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 rounded-lg text-text-primary placeholder:text-text-tertiary text-sm bg-brand-elevated border border-white/8 focus:outline-none focus:border-accent-ochre/50 focus:ring-1 focus:ring-accent-ochre/20 transition-colors"
                />
                <GlowButton type="submit" variant="primary" showArrow={false}>
                  Subscribe
                </GlowButton>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
