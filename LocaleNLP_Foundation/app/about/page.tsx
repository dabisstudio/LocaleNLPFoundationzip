import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { TranslatedPageHeader } from '@/components/ui/translated-page-header';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { GlowButton } from '@/components/ui/glow-button';
import { MonoLabel } from '@/components/ui/mono-label';
import { KernHeading } from '@/components/ui/kern-heading';
import { supabase, TeamMember } from '@/lib/supabase';
import { Target, Eye, Globe, Shield, BookOpen, Users, Linkedin, Twitter, MapPin } from 'lucide-react';

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
  {
    id: "01",
    date: "Mid 2025",
    title: "Foundation Established",
    event: "LocaleNLP Foundation is incorporated in Ghana as a Company Limited by Guarantee, establishing the Sovereign Data Pact.",
  },
  {
    id: "02",
    date: "Late 2025",
    title: "Lughatna App Deployed",
    event: "Launch of Africa's first gamified, community-powered linguistic crowdsourcing application to begin ethical data collection.",
  },
  {
    id: "03",
    date: "Early 2026",
    title: "OpenSpeech Milestone",
    event: "Surpassed initial targets, collecting thousands of hours of fully-consented, demographically balanced speech data.",
  },
  {
    id: "04",
    date: "2027 - 2028",
    title: "Pan-African Scale",
    event: "Expanding the Regional Advisory Councils and launching Civic AI tools for healthcare and education across 50+ languages.",
  },
  {
    id: "05",
    date: "5-Year Vision",
    title: "Global Language Justice",
    event: "Achieving digital sovereignty for 200+ African languages and exporting our framework to Indigenous communities worldwide.",
  },
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
            { labelKey: 'cta.read_manifesto', labelFallback: 'Read Our Manifesto', href: '/manifesto', variant: 'primary' },
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
                  To democratize access to artificial intelligence by enabling equitable, ethical, and inclusive language technologies for African and Indigenous communities, transforming underserved dialects into digitally alive assets.
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
                  To be Africa's leading open language AI foundation, unlocking the full spectrum of human knowledge and opportunity for every African, no matter what language they speak.
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
                    We go far beyond NLP model development. Through a hybrid structure, we build continent-wide infrastructure—from the community-powered Lughatna app to open-source public APIs—balancing grassroots cultural preservation with enterprise-grade deployment.
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

        <section className="py-24 bg-brand-deep">
          <div className="container-wide section-padding">
            <div className="mb-16">
              <MonoLabel label="OUR STORY" number="03" className="mb-4" />
              <h2 className="text-4xl md:text-5xl font-display font-medium text-text-primary">
                How We Got Here
              </h2>
            </div>

            <div className="relative">
              {/* Horizontal Connecting Line (Desktop) */}
              <div className="hidden lg:block absolute top-6 left-6 right-6 h-[1px] bg-text-primary/10 z-0"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 relative z-10">
                {MILESTONES.map((milestone, index) => (
                  <div key={milestone.id} className="relative flex flex-col items-start px-1">
                    
                    {/* Fixed Circle Node (ID only to prevent overflow) */}
                    <div className="w-12 h-12 rounded-full border border-text-primary/20 bg-brand-deep flex items-center justify-center font-mono text-sm text-text-primary mb-6 shadow-sm shrink-0">
                      {milestone.id}
                    </div>

                    {/* Content Block */}
                    <div className="flex flex-col pr-4">
                      <span className="font-mono text-xs uppercase tracking-widest text-text-tertiary mb-3">
                        {milestone.date}
                      </span>
                      <h3 className="text-lg font-semibold text-text-primary mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-text-secondary text-sm leading-relaxed">
                        {milestone.event}
                      </p>
                    </div>
                    
                    {/* Vertical Connecting Line (Mobile) */}
                    {index < MILESTONES.length - 1 && (
                      <div className="md:hidden absolute top-12 left-6 w-[1px] h-10 bg-text-primary/10 -z-10" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-brand-surface">
          <div className="container-wide section-padding">
            <div className="text-center mb-14">
              <MonoLabel label="PHYSICAL PRESENCE" number="04" className="mb-5" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Our Pan-African Footprint
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                We are grounded on the continent. Our governance, operations, and community outreach are physically distributed to ensure local context drives our AI development.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { city: 'Accra, Ghana', role: 'Foundation HQ & Governance', icon: Shield, desc: 'The legal domicile and center for governance and Pan-African policy advocacy.' },
                { city: 'Casablanca, Morocco', role: 'Operational Headquarters', icon: Globe, desc: 'The central hub for day-to-day foundation operations, infrastructure deployment, and scaling.' },
                { city: 'Dakar, Senegal', role: 'Linguistic Partnerships Hub', icon: Users, desc: 'The command center for community data collection, cultural preservation, and grassroots contributor onboarding.' }
              ].map((loc) => (
                <div key={loc.city} className="glass-card p-8 border border-ink-monument/10 flex flex-col items-start hover:border-accent-ochre/30 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-accent-ochre/10 flex items-center justify-center mb-6">
                    <MapPin className="w-5 h-5 text-accent-ochre" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-ink-monument mb-2">{loc.city}</h3>
                  <p className="font-mono text-xs uppercase tracking-widest text-ink-muted mb-4">{loc.role}</p>
                  <p className="text-xs text-text-tertiary leading-relaxed">{loc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="team" className="py-20 bg-brand-deep">
          <div className="container-wide section-padding">
            <div className="text-center mb-14">
              <MonoLabel label="OUR PEOPLE" number="05" className="mb-5" />
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
              {/* Regional Advisory Councils */}
              <div className="mt-24 pt-20 border-t border-ink-monument/10">
                  <div className="text-center mb-12">
                     <p className="font-mono text-xs tracking-widest uppercase text-accent-ochre mb-4">
                       [ COMMUNITY GOVERNANCE ]
                     </p>
                     <h3 className="font-display font-bold text-3xl text-ink-monument mb-4">Regional Advisory Councils</h3>
                     <p className="text-text-secondary max-w-2xl mx-auto">
                        To guarantee our infrastructure serves the people, all foundation initiatives are ratified by our Regional Advisory Councils, ensuring grassroots community leaders and local specialists guide our growth.
                     </p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                     { [
                        { name: 'West Africa', countries: 'Senegal, Ghana, Nigeria, and The Gambia' },
                        { name: 'North Africa', countries: 'Morocco and Egypt' },
                        { name: 'East Africa', countries: 'Kenya, Uganda, and Ethiopia' },
                        { name: 'Southern Africa', countries: 'South Africa and Zambia' }
                      ].map((region) => (
                        <div key={region.name} className="glass-card p-6 border border-ink-monument/5 bg-white/50">
                           <h4 className="font-mono text-sm font-bold text-ink-monument mb-4 border-b border-ink-monument/10 pb-4">{region.name} Council</h4>
                           <p className="text-[11px] text-text-tertiary mb-4 leading-relaxed">Representing {region.countries}.</p>
                           <ul className="space-y-3">
                              <li className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-ink-monument/5 flex items-center justify-center"><Users className="w-3 h-3 text-ink-muted"/></div>
                                <span className="text-sm text-text-secondary">3 Elected Linguists</span>
                              </li>
                              <li className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-ink-monument/5 flex items-center justify-center"><Shield className="w-3 h-3 text-ink-muted"/></div>
                                <span className="text-sm text-text-secondary">1 Data Ethicist</span>
                              </li>
                              <li className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-ink-monument/5 flex items-center justify-center"><Target className="w-3 h-3 text-ink-muted"/></div>
                                <span className="text-sm text-text-secondary">2 Community Reps</span>
                              </li>
                           </ul>
                        </div>
                     ))}
                  </div>
              </div>
            </div>
            )}
          </div>
        </section>

        <section className="py-20 bg-brand-surface">
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
