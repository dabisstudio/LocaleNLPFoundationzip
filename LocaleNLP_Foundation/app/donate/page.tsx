import Link from 'next/link';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { Heart, Globe, Users, CheckCircle, Shield, FileText } from 'lucide-react';

const tiers = [
  {
    name: 'Supporter',
    amount: '$50',
    period: 'one-time',
    description: 'Help us digitize one hour of speech data',
    features: [
      'Named in our community supporters list',
      'Quarterly impact newsletter',
      'Early access to research publications',
    ],
  },
  {
    name: 'Champion',
    amount: '$500',
    period: 'one-time',
    description: 'Fund a week of community data collection',
    features: [
      'Everything in Supporter',
      'Personal thank you from our team',
      'Invitation to virtual town halls',
      'Recognition on our website',
    ],
    highlighted: true,
  },
  {
    name: 'Patron',
    amount: '$5,000',
    period: 'one-time',
    description: 'Support a language for an entire month',
    features: [
      'Everything in Champion',
      'Choose a language to support',
      'Quarterly impact reports',
      'Direct line to our research team',
      'Logo placement on materials',
    ],
  },
];

const monthlyOptions = [
  { amount: 10, impact: 'Supports 1 hour of transcription work' },
  { amount: 25, impact: 'Funds audio equipment for 1 contributor' },
  { amount: 50, impact: 'Covers 1 week of model training compute' },
  { amount: 100, impact: 'Sponsors a community data collection session' },
];

const useOfFunds = [
  { label: 'Research & Development', percent: 45, color: 'bg-royal-500' },
  { label: 'Community Programs', percent: 30, color: 'bg-ochre-500' },
  { label: 'Operations', percent: 15, color: 'bg-forest-500' },
  { label: 'Advocacy', percent: 10, color: 'bg-midnight-500' },
];

export default function DonatePage() {
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
                Support Our Mission
              </span>
              <h1 className="text-white mb-6">
                Every Contribution
                <br />
                <span className="text-gradient">Preserves a Voice</span>
              </h1>
              <p className="text-lg text-midnight-200">
                Your donation directly funds the digitization of African languages, the development
                of open-source AI models, and the empowerment of communities across the continent.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-midnight-900">
          <div className="container-wide section-padding">
            <div className="text-center mb-16">
              <h2 className="text-white mb-4">One-Time Giving</h2>
              <p className="text-midnight-200 max-w-2xl mx-auto">
                Make a meaningful impact today with a one-time contribution.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`glass-card p-8 relative ${
                    tier.highlighted ? 'border-ochre-500/50 ring-2 ring-ochre-500/20' : ''
                  }`}
                >
                  {tier.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-3 py-1 bg-ochre-500 text-white text-xs font-medium rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <h3 className="text-xl font-sora font-semibold text-white mb-2">{tier.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-sora font-bold text-ochre-400">
                      {tier.amount}
                    </span>
                    <span className="text-midnight-400 ml-2">{tier.period}</span>
                  </div>
                  <p className="text-midnight-300 text-sm mb-6">{tier.description}</p>
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-midnight-200">
                        <CheckCircle className="w-4 h-4 text-forest-400 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-3 rounded-lg font-medium transition-all ${
                      tier.highlighted
                        ? 'bg-ochre-500 hover:bg-ochre-600 text-white'
                        : 'bg-midnight-700 hover:bg-midnight-600 text-white border border-midnight-500'
                    }`}
                  >
                    Donate {tier.amount}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-midnight-950">
          <div className="container-wide section-padding">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-forest-500/10 text-forest-400 text-sm font-medium mb-4">
                  Monthly Giving
                </span>
                <h2 className="text-white mb-6">Become a Sustaining Supporter</h2>
                <p className="text-midnight-200 mb-8">
                  Monthly donors provide the stable funding we need to plan long-term projects and
                  make lasting commitments to communities.
                </p>

                <div className="space-y-4">
                  {monthlyOptions.map((option) => (
                    <div
                      key={option.amount}
                      className="flex items-center justify-between p-4 bg-midnight-800/50 rounded-lg border border-midnight-700 hover:border-midnight-600 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-forest-500/10 flex items-center justify-center">
                          <span className="text-lg font-sora font-bold text-forest-400">
                            ${option.amount}
                          </span>
                        </div>
                        <p className="text-sm text-midnight-200">{option.impact}</p>
                      </div>
                      <div className="w-5 h-5 rounded-full border-2 border-midnight-500" />
                    </div>
                  ))}
                </div>

                <button className="btn-primary mt-8">Start Monthly Donation</button>
              </div>

              <div className="glass-card p-8">
                <h3 className="text-xl font-sora font-semibold text-white mb-6">Use of Funds</h3>
                <p className="text-midnight-300 text-sm mb-8">
                  We are committed to transparency. Here is how your donations are allocated:
                </p>

                <div className="space-y-4">
                  {useOfFunds.map((item) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-midnight-200">{item.label}</span>
                        <span className="text-sm font-medium text-white">{item.percent}%</span>
                      </div>
                      <div className="h-2 bg-midnight-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${item.color} rounded-full`}
                          style={{ width: `${item.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-midnight-700 flex items-center gap-4">
                  <Shield className="w-8 h-8 text-forest-400" />
                  <div>
                    <p className="text-sm font-medium text-white">Verified Non-Profit</p>
                    <p className="text-xs text-midnight-400">
                      501(c)(3) status. All donations are tax-deductible.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-midnight-900">
          <div className="container-wide section-padding">
            <div className="text-center mb-16">
              <h2 className="text-white mb-4">Institutional Giving</h2>
              <p className="text-midnight-200 max-w-2xl mx-auto">
                For foundations, corporations, and governments looking to make a larger impact.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="glass-card p-8 text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-royal-500 to-royal-600 flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-sora font-semibold text-white mb-3">
                  Sponsor a Language
                </h3>
                <p className="text-midnight-300 text-sm mb-4">
                  Fund the complete digitization of a specific African language from start to
                  deployment.
                </p>
                <p className="text-ochre-400 font-medium">Starting at $50,000</p>
              </div>

              <div className="glass-card p-8 text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-ochre-500 to-ochre-600 flex items-center justify-center mx-auto mb-6">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-sora font-semibold text-white mb-3">
                  Fund a Fellowship
                </h3>
                <p className="text-midnight-300 text-sm mb-4">
                  Support an African researcher through our 12-month AIxLanguage Fellowship program.
                </p>
                <p className="text-ochre-400 font-medium">$35,000 per fellow</p>
              </div>

              <div className="glass-card p-8 text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-forest-500 to-forest-600 flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-sora font-semibold text-white mb-3">
                  Multi-Year Commitment
                </h3>
                <p className="text-midnight-300 text-sm mb-4">
                  Partner with us on a multi-year grant to support long-term research and community
                  programs.
                </p>
                <p className="text-ochre-400 font-medium">Custom partnership</p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link href="/get-involved#contact" className="btn-outline">
                <FileText className="w-4 h-4 mr-2" />
                Request a Proposal
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
