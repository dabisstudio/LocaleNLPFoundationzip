import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { TranslatedPageHeader } from '@/components/ui/translated-page-header';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { GlowButton } from '@/components/ui/glow-button';
import { MonoLabel } from '@/components/ui/mono-label';
import { KernHeading } from '@/components/ui/kern-heading';
import { supabase, TeamMember } from '@/lib/supabase';
import { Target, Eye, Globe, Shield, BookOpen, Users, Linkedin, Twitter } from 'lucide-react';

async function getTeamMembers(): Promise<TeamMember[]> {
  const { data, error } = await supabase.from('team_members').select('*').order('order_index');
  if (error) return [];
  return data || [];
}

const VALUES = [
  {
    icon: Users,
    title: 'Community Ownership',
    description:
      'Every dataset, model, and tool we build is shaped by the communities it serves. Speakers have authority over how their languages are used.',
  },
  {
    icon: Globe,
    title: 'Radical Openness',
    description:
      'All our research, models, and training data are published under permissive open-source licenses. Knowledge is a public good.',
  },
  {
    icon: Shield,
    title: 'Ethical AI',
    description:
      'We refuse to build surveillance tools. Privacy is non-negotiable. Consent precedes data collection, always.',
  },
  {
    icon: BookOpen,
    title: 'Scientific Rigor',
    description:
      'We meet the highest standards of reproducible research while staying grounded in real-world deployment constraints.',
  },
];

const MILESTONES = [
  { year: '2019', event: 'Founded by African AI researchers frustrated by missing language resources.' },
  { year: '2020', event: 'First open dataset released: 200 hours of Yoruba speech.' },
  { year: '2021', event: 'Registered as a non-profit. First institutional partnership signed.' },
  { year: '2022', event: 'AfriSpeech-ASR v1 released, covering 15 languages.' },
  { year: '2023', event: 'AIxLanguage Fellowship launches; first cohort of 8 fellows.' },
  { year: '2024', event: '30+ researchers across 18 countries. 2,400 hours of audio archived.' },
];

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default async function AboutPage() {
  const teamMembers = await getTeamMembers();
  const boardMembers = teamMembers.filter((m) => m.member_type === 'board');
  const teamStaff = teamMembers.filter((m) => m.member_type === 'team');
  const advisors = teamMembers.filter((m) => m.member_type === 'advisor');

  return (
    <>
      <Navigation />
      <main id="main-content" className="pt-24">
        <TranslatedPageHeader
          label="ABOUT US"
          number="00"
          status="active"
          titleKey="about.page_title"
          titleGradientKey="about.page_title_gradient"
          subtitleKey="about.page_subtitle"
          accentColor="ochre"
          ctaButtons={[
            { labelKey: 'cta.join_mission', labelFallback: 'Join the Mission', href: '/get-involved', variant: 'primary' },
            { labelKey: 'cta.explore_programs', labelFallback: 'Explore Programs', href: '/programs', variant: 'ghost' },
          ]}
        />

        <section className="py-20 bg-brand-surface">
          <div className="container-wide section-padding">
            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              <SpotlightCard className="p-10" spotlightColor="rgba(245,166,35,0.1)">
                <div className="w-12 h-12 rounded-xl bg-accent-ochre/10 flex items-center justify-center mb-5">
                  <Target className="w-6 h-6 text-accent-ochre" aria-hidden="true" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-text-primary mb-4">
                  Mission
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  To ensure African languages are not left behind in the AI revolution — by building
                  open, ethical, and community-centered language technology at scale.
                </p>
              </SpotlightCard>

              <SpotlightCard className="p-10" spotlightColor="rgba(0,229,255,0.08)">
                <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 flex items-center justify-center mb-5">
                  <Eye className="w-6 h-6 text-accent-cyan" aria-hidden="true" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-text-primary mb-4">
                  Vision
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  A world where every African accesses healthcare information, education, and civic
                  participation in their mother tongue — and where African expertise leads global AI
                  development.
                </p>
              </SpotlightCard>
            </div>

            <SpotlightCard className="p-10" spotlightColor="rgba(224,122,95,0.08)">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-accent-clay/10 flex items-center justify-center shrink-0">
                  <Globe className="w-6 h-6 text-accent-clay" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-semibold text-text-primary mb-4">
                    Our Approach
                  </h3>
                  <p className="text-text-secondary leading-relaxed max-w-3xl">
                    Open-source models. Ethical data collection. Community co-ownership. We measure
                    success not in papers published, but in communities empowered and barriers broken.
                    Every decision is guided by the principle that the people most affected by
                    language technology should be its primary beneficiaries — and its builders.
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </section>

        <section className="py-20 bg-brand-deep">
          <div className="container-wide section-padding">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <MonoLabel label="WHY IT MATTERS" number="01" className="mb-5" />
                <KernHeading as="h2" className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-6">
                  The Stakes Are High
                </KernHeading>
                <div className="space-y-4 text-text-secondary leading-relaxed">
                  <p>
                    Language is not just a tool for communication — it carries identity, knowledge,
                    and centuries of accumulated wisdom. When a language is excluded from
                    technology, its speakers are excluded from the digital future.
                  </p>
                  <p>
                    Africa is home to over 2,000 languages, representing nearly a third of all human
                    languages. Yet fewer than 1% of AI training data represents African languages.
                    This is not just a technical gap; it is a crisis of equity.
                  </p>
                  <p>
                    Without intervention, entire communities will be locked out of healthcare
                    information, educational resources, financial services, and civic participation.
                    We are working to change that — starting today.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '2,000+', label: 'African Languages', color: 'text-accent-ochre' },
                  { value: '30%', label: 'of Global Languages', color: 'text-accent-cyan' },
                  { value: '<1%', label: 'AI Training Data', color: 'text-accent-clay' },
                  { value: '500M', label: 'People Underserved', color: 'text-accent-ochre' },
                ].map(({ value, label, color }) => (
                  <div key={label} className="glass-card p-6 text-center">
                    <div
                      className={`font-mono text-3xl font-bold mb-2 ${color}`}
                      aria-label={`${value} — ${label}`}
                    >
                      {value}
                    </div>
                    <p className="text-text-secondary text-sm">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-brand-surface">
          <div className="container-wide section-padding">
            <div className="text-center mb-14">
              <MonoLabel label="OUR VALUES" number="02" className="mb-5" />
              <KernHeading as="h2" className="font-display text-3xl md:text-4xl font-bold text-text-primary">
                What We Stand For
              </KernHeading>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {VALUES.map((val) => (
                <SpotlightCard key={val.title} className="p-6" spotlightColor="rgba(245,166,35,0.08)">
                  <val.icon className="w-7 h-7 text-accent-ochre mb-4" aria-hidden="true" />
                  <h3 className="font-display font-semibold text-text-primary mb-2">{val.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{val.description}</p>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-brand-deep">
          <div className="container-wide section-padding">
            <div className="mb-12">
              <MonoLabel label="OUR STORY" number="03" className="mb-5" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary">
                How We Got Here
              </h2>
            </div>

            <div className="relative">
              <div
                className="hidden md:block absolute top-5 left-0 right-0 h-px bg-ink-monument/10"
                aria-hidden="true"
              />
              <div className="grid md:grid-cols-6 gap-y-8 md:gap-y-0">
                {MILESTONES.map((m, i) => (
                  <div key={m.year} className="relative flex md:flex-col gap-5 md:gap-0 md:pr-4">
                    <div className="flex md:flex-col items-center md:items-start gap-3 md:gap-0">
                      <div className="w-10 h-10 rounded-full bg-accent-ochre/10 border border-accent-ochre/30 flex items-center justify-center shrink-0 relative z-10">
                        <span className="font-mono text-xs text-accent-ochre font-bold">
                          {m.year.slice(2)}
                        </span>
                      </div>
                      {i < MILESTONES.length - 1 && (
                        <div className="w-px flex-1 bg-ink-monument/10 md:hidden" aria-hidden="true" />
                      )}
                    </div>
                    <div className="md:mt-6">
                      <p className="font-mono text-xs text-accent-ochre mb-2">{m.year}</p>
                      <p className="text-text-secondary text-sm leading-relaxed">{m.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="team" className="py-20 bg-brand-surface">
          <div className="container-wide section-padding">
            <div className="text-center mb-14">
              <MonoLabel label="OUR PEOPLE" number="04" className="mb-5" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Leadership Team
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Experts in AI, linguistics, and community development working together to build a
                more inclusive digital future.
              </p>
            </div>

            {teamStaff.length === 0 && boardMembers.length === 0 && advisors.length === 0 && (
              <div className="glass-card p-12 text-center max-w-lg mx-auto">
                <Users className="w-10 h-10 text-text-tertiary mx-auto mb-4" aria-hidden="true" />
                <h3 className="font-display text-lg font-semibold text-text-primary mb-2">
                  Team Profiles Coming Soon
                </h3>
                <p className="text-text-secondary text-sm mb-6">
                  We are updating our team profiles. In the meantime, reach out to learn more about
                  the people behind LocaleNLP Foundation.
                </p>
                <GlowButton href="/get-involved#contact" variant="ghost" showArrow={false}>
                  Get in Touch
                </GlowButton>
              </div>
            )}

            {(teamStaff.length > 0 || boardMembers.length > 0 || advisors.length > 0) && (
              <div>

              {teamStaff.length > 0 && (
                <div className="mb-16">
                  <p className="font-mono text-xs tracking-widest uppercase text-text-tertiary text-center mb-8">
                    [ EXECUTIVE TEAM ]
                  </p>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teamStaff.map((member) => (
                      <div key={member.id} className="glass-card p-6 text-center">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-ochre/20 to-accent-clay/20 border border-accent-ochre/20 mx-auto mb-4 flex items-center justify-center">
                          <span className="font-display text-lg font-bold text-accent-ochre">
                            {getInitials(member.name)}
                          </span>
                        </div>
                        <h4 className="font-display font-semibold text-text-primary">
                          {member.name}
                        </h4>
                        <p className="text-sm text-accent-ochre mb-3">{member.role}</p>
                        {member.bio && (
                          <p className="text-sm text-text-secondary mb-4">{member.bio}</p>
                        )}
                        <div className="flex items-center justify-center gap-3">
                          {member.linkedin_url && (
                            <a
                              href={member.linkedin_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${member.name} on LinkedIn`}
                              className="text-text-tertiary hover:text-text-primary transition-colors"
                            >
                              <Linkedin className="w-4 h-4" aria-hidden="true" />
                            </a>
                          )}
                          {member.twitter_url && (
                            <a
                              href={member.twitter_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${member.name} on Twitter`}
                              className="text-text-tertiary hover:text-text-primary transition-colors"
                            >
                              <Twitter className="w-4 h-4" aria-hidden="true" />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {boardMembers.length > 0 && (
                <div className="mb-16">
                  <p className="font-mono text-xs tracking-widest uppercase text-text-tertiary text-center mb-8">
                    [ BOARD OF DIRECTORS ]
                  </p>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {boardMembers.map((member) => (
                      <div key={member.id} className="glass-card p-6 text-center">
                        <div className="w-16 h-16 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 mx-auto mb-4 flex items-center justify-center">
                          <span className="font-display text-base font-bold text-accent-cyan">
                            {getInitials(member.name)}
                          </span>
                        </div>
                        <h4 className="font-display font-semibold text-text-primary">
                          {member.name}
                        </h4>
                        <p className="text-sm text-accent-cyan mb-3">{member.role}</p>
                        {member.bio && (
                          <p className="text-sm text-text-secondary">{member.bio}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {advisors.length > 0 && (
                <div>
                  <p className="font-mono text-xs tracking-widest uppercase text-text-tertiary text-center mb-8">
                    [ ADVISORS ]
                  </p>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {advisors.map((member) => (
                      <div key={member.id} className="glass-card p-6 text-center">
                        <div className="w-14 h-14 rounded-full bg-ink-monument/5 border border-ink-monument/12 mx-auto mb-4 flex items-center justify-center">
                          <span className="font-display text-sm font-bold text-text-secondary">
                            {getInitials(member.name)}
                          </span>
                        </div>
                        <h4 className="font-display font-semibold text-text-primary">
                          {member.name}
                        </h4>
                        <p className="text-sm text-text-tertiary mb-2">{member.role}</p>
                        {member.bio && (
                          <p className="text-sm text-text-secondary">{member.bio}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            )}
          </div>
        </section>

        <section className="py-20 bg-brand-deep">
          <div className="container-wide section-padding">
            <div className="glass-card p-10 md:p-14 text-center max-w-3xl mx-auto">
              <MonoLabel label="JOIN US" status="active" className="mb-5" />
              <h2 className="font-display text-3xl font-bold text-text-primary mb-4">
                Ready to Make History?
              </h2>
              <p className="text-text-secondary mb-8 max-w-lg mx-auto">
                There are still 2,000 languages waiting to be digitized, and millions of people
                waiting to be included. Come build with us.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <GlowButton href="/get-involved" variant="primary">
                  Get Involved
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
