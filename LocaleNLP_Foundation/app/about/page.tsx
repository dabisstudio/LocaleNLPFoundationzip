import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { supabase, TeamMember } from '@/lib/supabase';
import { Target, Eye, Heart, Linkedin, Twitter } from 'lucide-react';

async function getTeamMembers(): Promise<TeamMember[]> {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .order('order_index');

  if (error) return [];
  return data || [];
}

export default async function AboutPage() {
  const teamMembers = await getTeamMembers();

  const boardMembers = teamMembers.filter((m) => m.member_type === 'board');
  const teamStaff = teamMembers.filter((m) => m.member_type === 'team');
  const advisors = teamMembers.filter((m) => m.member_type === 'advisor');

  return (
    <>
      <Navigation />
      <main className="pt-20">
        <section className="py-24 bg-hero-gradient relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-royal-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-ochre-500/10 rounded-full blur-3xl" />
          </div>

          <div className="container-wide section-padding relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-royal-500/10 text-royal-400 text-sm font-medium mb-6">
                About Us
              </span>
              <h1 className="text-white mb-6">
                Language Technology
                <br />
                <span className="text-gradient">For All of Africa</span>
              </h1>
              <p className="text-lg text-midnight-200">
                We believe that the future of AI should include every voice, every language, and
                every community on the African continent.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-midnight-900">
          <div className="container-wide section-padding">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="glass-card p-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-royal-500 to-royal-600 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-sora font-semibold text-white mb-4">Our Mission</h3>
                <p className="text-midnight-300">
                  To ensure that African languages are not left behind in the AI revolution by
                  building open, ethical, and community-centered language technology.
                </p>
              </div>

              <div className="glass-card p-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-ochre-500 to-ochre-600 flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-sora font-semibold text-white mb-4">Our Vision</h3>
                <p className="text-midnight-300">
                  A world where every African can access technology, information, and opportunity
                  in their mother tongue, and where African expertise leads global AI development.
                </p>
              </div>

              <div className="glass-card p-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-forest-500 to-forest-600 flex items-center justify-center mb-6">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-sora font-semibold text-white mb-4">Our Values</h3>
                <p className="text-midnight-300">
                  Community ownership, ethical AI development, open collaboration, and deep respect
                  for the linguistic and cultural heritage of African communities.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-midnight-950">
          <div className="container-wide section-padding">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-ochre-500/10 text-ochre-400 text-sm font-medium mb-4">
                  Why Language Equity Matters
                </span>
                <h2 className="text-white mb-6">The Stakes Are High</h2>
                <div className="space-y-4 text-midnight-200">
                  <p>
                    Language is not just a tool for communication. It carries identity, knowledge,
                    and centuries of wisdom. When a language is excluded from technology, its
                    speakers are excluded from the digital future.
                  </p>
                  <p>
                    Africa is home to over 2,000 languages, representing nearly a third of all
                    human languages. Yet fewer than 1% of AI training data represents African
                    languages. This is not just a technical gap; it is a crisis of equity.
                  </p>
                  <p>
                    Without intervention, entire communities will be locked out of healthcare
                    information, educational resources, financial services, and civic participation.
                    We are working to change that.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-6 text-center">
                  <div className="text-3xl font-sora font-bold text-ochre-400 mb-2">2,000+</div>
                  <p className="text-sm text-midnight-300">African Languages</p>
                </div>
                <div className="glass-card p-6 text-center">
                  <div className="text-3xl font-sora font-bold text-royal-400 mb-2">30%</div>
                  <p className="text-sm text-midnight-300">of Global Languages</p>
                </div>
                <div className="glass-card p-6 text-center">
                  <div className="text-3xl font-sora font-bold text-forest-400 mb-2">&lt;1%</div>
                  <p className="text-sm text-midnight-300">AI Training Data</p>
                </div>
                <div className="glass-card p-6 text-center">
                  <div className="text-3xl font-sora font-bold text-ochre-400 mb-2">500M</div>
                  <p className="text-sm text-midnight-300">People Underserved</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-midnight-900">
          <div className="container-wide section-padding">
            <div className="max-w-3xl mx-auto">
              <span className="inline-block px-4 py-1.5 rounded-full bg-forest-500/10 text-forest-400 text-sm font-medium mb-4">
                Our Story
              </span>
              <h2 className="text-white mb-8">How We Got Here</h2>
              <div className="space-y-6 text-midnight-200">
                <p>
                  LocaleNLP was founded in 2019 by a group of African AI researchers who were
                  frustrated by the lack of language resources for their own communities. They had
                  built successful careers at top tech companies and research institutions, but
                  every time they tried to apply cutting-edge NLP to African languages, they hit the
                  same wall: no data, no tools, no models.
                </p>
                <p>
                  Rather than accept this as an immutable fact, they decided to change it. They
                  started small working with community volunteers to collect speech data in Yoruba,
                  Swahili, and Amharic. They published papers, released datasets, and built
                  open-source tools. Word spread.
                </p>
                <p>
                  Today, LocaleNLP is a registered non-profit with a team of 30+ researchers,
                  engineers, and community organizers working across 18 African countries. We have
                  partnered with governments, universities, and NGOs to deploy language technology
                  that serves millions.
                </p>
                <p>
                  But we are just getting started. There are still 2,000 languages waiting to be
                  digitized, millions of people waiting to be included. Join us.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="team" className="py-20 bg-midnight-950">
          <div className="container-wide section-padding">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-royal-500/10 text-royal-400 text-sm font-medium mb-4">
                Our People
              </span>
              <h2 className="text-white mb-4">Leadership Team</h2>
              <p className="text-midnight-200 max-w-2xl mx-auto">
                Experts in AI, linguistics, and community development working together to build a
                more inclusive digital future.
              </p>
            </div>

            {teamStaff.length > 0 && (
              <div className="mb-16">
                <h3 className="text-xl font-sora font-semibold text-white mb-8 text-center">
                  Executive Team
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {teamStaff.map((member) => (
                    <div key={member.id} className="glass-card p-6 text-center">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-royal-500 to-ochre-500 mx-auto mb-4 flex items-center justify-center text-2xl font-sora font-bold text-white">
                        {member.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <h4 className="text-lg font-semibold text-white">{member.name}</h4>
                      <p className="text-sm text-ochre-400 mb-3">{member.role}</p>
                      <p className="text-sm text-midnight-300 mb-4">{member.bio}</p>
                      <div className="flex items-center justify-center gap-3">
                        {member.linkedin_url && (
                          <a
                            href={member.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-midnight-400 hover:text-white transition-colors"
                          >
                            <Linkedin className="w-5 h-5" />
                          </a>
                        )}
                        {member.twitter_url && (
                          <a
                            href={member.twitter_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-midnight-400 hover:text-white transition-colors"
                          >
                            <Twitter className="w-5 h-5" />
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
                <h3 className="text-xl font-sora font-semibold text-white mb-8 text-center">
                  Board of Directors
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {boardMembers.map((member) => (
                    <div key={member.id} className="glass-card p-6 text-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-forest-500 to-forest-600 mx-auto mb-4 flex items-center justify-center text-xl font-sora font-bold text-white">
                        {member.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <h4 className="text-lg font-semibold text-white">{member.name}</h4>
                      <p className="text-sm text-forest-400 mb-3">{member.role}</p>
                      <p className="text-sm text-midnight-300">{member.bio}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {advisors.length > 0 && (
              <div>
                <h3 className="text-xl font-sora font-semibold text-white mb-8 text-center">
                  Advisors
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {advisors.map((member) => (
                    <div key={member.id} className="glass-card p-6 text-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-midnight-600 to-midnight-700 mx-auto mb-4 flex items-center justify-center text-lg font-sora font-bold text-white">
                        {member.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <h4 className="text-lg font-semibold text-white">{member.name}</h4>
                      <p className="text-sm text-midnight-400 mb-2">{member.role}</p>
                      <p className="text-sm text-midnight-300">{member.bio}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
