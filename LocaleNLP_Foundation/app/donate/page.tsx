import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { PageHeader } from '@/components/ui/page-header';
import { TranslatedPageHeader } from '@/components/ui/translated-page-header';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { MonoLabel } from '@/components/ui/mono-label';
import { GlowButton } from '@/components/ui/glow-button';
import { DonationCalculator } from '@/components/donate/DonationCalculator';
import { MonthlyGiving } from '@/components/donate/MonthlyGiving';
import { Heart, Globe, Users, CheckCircle, Shield, FileText, ExternalLink } from 'lucide-react';

const TIERS = [
  {
    name: 'Supporter',
    amount: '$50',
    period: 'one-time',
    description:
      'Digitizes one full hour of endangered speech — a dialect preserved for every generation that follows.',
    features: [
      'Named in our community supporters list',
      'Quarterly impact newsletter',
      'Early access to research publications',
    ],
    highlighted: false,
    accent: 'text-accent-cyan',
    spot: 'rgba(0,229,255,0.08)',
  },
  {
    name: 'Sustainer',
    amount: '$500',
    period: 'one-time',
    description:
      'Funds a full week of community data collection — linguists paid, gear deployed, data returned to the community.',
    features: [
      'Everything in Supporter',
      'Personal thank-you from our team',
      'Invitation to virtual town halls',
      'Recognition on our website',
    ],
    highlighted: true,
    accent: 'text-accent-ochre',
    spot: 'rgba(245,166,35,0.12)',
  },
  {
    name: 'Partner',
    amount: '$5,000',
    period: 'one-time',
    description:
      'Sponsors an entire language for a month — from community mobilisation to dataset release under an open licence.',
    features: [
      'Everything in Sustainer',
      'Choose a language to sponsor',
      'Quarterly detailed impact reports',
      'Direct line to our research team',
      'Logo placement on materials',
    ],
    highlighted: false,
    accent: 'text-accent-clay',
    spot: 'rgba(224,122,95,0.08)',
  },
];

const INSTITUTIONAL = [
  {
    icon: Globe,
    title: 'Sponsor a Language',
    description:
      'Fund the complete digitization of a specific African language — from community engagement to model deployment.',
    price: 'From $50,000',
    spot: 'rgba(245,166,35,0.1)',
    accent: 'text-accent-ochre',
  },
  {
    icon: Users,
    title: 'Fund a Fellowship',
    description:
      'Support an African researcher through our 12-month AIxLanguage Fellowship programme.',
    price: '$35,000 per fellow',
    spot: 'rgba(0,229,255,0.08)',
    accent: 'text-accent-cyan',
  },
  {
    icon: Heart,
    title: 'Multi-Year Commitment',
    description:
      'Partner with us on a multi-year grant to support long-term research and community programs.',
    price: 'Custom partnership',
    spot: 'rgba(224,122,95,0.1)',
    accent: 'text-accent-clay',
  },
];

export default function DonatePage({
  searchParams,
}: {
  searchParams?: { bounty?: string; lang?: string };
}) {
  const bountyTitle = searchParams?.bounty ?? null;
  const bountyLang  = searchParams?.lang  ?? null;

  return (
    <>
      <Navigation />
      <main id="main-content" className="pt-24">
        {bountyTitle ? (
          <PageHeader
            label="BOUNTY DONATION"
            number="00"
            status="active"
            title="Fund a Language Bounty"
            titleGradient={bountyLang ? bountyLang.toUpperCase() : undefined}
            subtitle={`You are funding: "${bountyTitle}". Every dollar goes directly to the community voice collectors, transcribers, and annotators working on this language.`}
            accentColor="clay"
          >
            <GlowButton href="#give" variant="primary" showArrow={false}>
              Choose an Amount
            </GlowButton>
            <GlowButton href="/bounties" variant="ghost" showArrow={false}>
              ← Back to Bounties
            </GlowButton>
          </PageHeader>
        ) : (
          <TranslatedPageHeader
            label="SUPPORT OUR MISSION"
            number="00"
            titleKey="donate.page_title"
            titleGradientKey="donate.page_title_gradient"
            subtitleKey="donate.page_subtitle"
            accentColor="ochre"
            ctaButtons={[
              { labelKey: 'cta.give_now', labelFallback: 'Give Now', href: '#give', variant: 'primary', showArrow: false },
              { labelKey: 'cta.institutional_giving', labelFallback: 'Institutional Giving', href: '#institutional', variant: 'ghost', showArrow: false },
            ]}
          />
        )}

        <DonationCalculator />

        <section id="give" className="py-20 bg-brand-surface">
          <div className="container-wide section-padding">
            <div className="text-center mb-14">
              <MonoLabel label="ONE-TIME GIVING" number="01" className="mb-5" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Make an Immediate Impact
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                A single contribution triggers real infrastructure — transcription hours, compute
                cycles, and linguist stipends begin the moment your payment clears.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {TIERS.map((tier) => (
                <SpotlightCard
                  key={tier.name}
                  spotlightColor={tier.spot}
                  className={`p-8 relative ${tier.highlighted ? 'ring-1 ring-accent-ochre/30' : ''}`}
                >
                  {tier.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-3 py-1 bg-accent-ochre text-brand-deep text-xs font-mono font-bold rounded-full uppercase tracking-wide">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="mb-5">
                    <h3 className="font-display text-xl font-semibold text-text-primary mb-1">
                      {tier.name}
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className={`font-mono text-4xl font-bold ${tier.accent}`}>
                        {tier.amount}
                      </span>
                      <span className="text-text-tertiary text-sm">{tier.period}</span>
                    </div>
                  </div>

                  <p className="text-text-secondary text-sm leading-relaxed mb-6">
                    {tier.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <CheckCircle
                          className={`w-4 h-4 ${tier.accent} mt-0.5 shrink-0`}
                          aria-hidden="true"
                        />
                        <span className="text-text-secondary text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="https://donate.localenlp.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                      tier.highlighted
                        ? 'bg-accent-ochre text-brand-deep hover:bg-accent-ochre/90'
                        : 'bg-white/5 border border-white/10 text-text-primary hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    Donate {tier.amount}
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </SpotlightCard>
              ))}
            </div>

            <div className="text-center mb-20">
              <GlowButton
                href="https://donate.localenlp.org"
                variant="ghost"
                showArrow={false}
              >
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
                Open Donation Portal
              </GlowButton>
              <p className="font-mono text-xs text-text-tertiary mt-3">
                🔒 256-bit encrypted via Stripe · 501(c)(3) verified · No account required
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <MonoLabel label="MONTHLY GIVING" number="02" className="mb-5" />
                <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary mb-4">
                  Become a Sustaining Supporter
                </h2>
                <p className="text-text-secondary mb-8 leading-relaxed">
                  Monthly donors are the backbone of long-term language preservation. Select your
                  tier and see the exact outcome your recurring contribution creates.
                </p>

                <MonthlyGiving />
              </div>

              <div className="glass-card p-8">
                <h3 className="font-display text-xl font-semibold text-text-primary mb-2">
                  Use of Funds
                </h3>
                <p className="text-text-secondary text-sm mb-8">
                  Cryptographically secure, community-owned, and globally compliant. Here is
                  exactly how every dollar is allocated.
                </p>

                <div className="space-y-5">
                  {[
                    { label: 'Research & Development', percent: 45, color: 'bg-accent-ochre' },
                    { label: 'Community Programs', percent: 30, color: 'bg-accent-clay' },
                    { label: 'Operations', percent: 15, color: 'bg-accent-cyan' },
                    { label: 'Policy Advocacy', percent: 10, color: 'bg-text-tertiary' },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-text-secondary text-sm">{item.label}</span>
                        <span className="font-mono text-sm font-bold text-text-primary">
                          {item.percent}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-brand-elevated rounded-full overflow-hidden">
                        <div
                          className={`h-full ${item.color} rounded-full`}
                          style={{ width: `${item.percent}%` }}
                          role="progressbar"
                          aria-valuenow={item.percent}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`${item.label}: ${item.percent}%`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/8 flex items-start gap-4">
                  <Shield className="w-7 h-7 text-accent-ochre shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-display text-sm font-semibold text-text-primary">
                      Verified Non-Profit
                    </p>
                    <p className="text-xs text-text-tertiary mt-0.5">
                      501(c)(3) registered. All donations are tax-deductible in the United States.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="institutional" className="py-20 bg-brand-deep">
          <div className="container-wide section-padding">
            <div className="text-center mb-14">
              <MonoLabel label="INSTITUTIONAL GIVING" number="03" className="mb-5" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Large-Scale Impact
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                For foundations, corporations, and governments looking to make a transformative,
                long-term commitment to African language equity.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {INSTITUTIONAL.map((item) => (
                <SpotlightCard
                  key={item.title}
                  spotlightColor={item.spot}
                  className="p-8 text-center"
                >
                  <item.icon
                    className={`w-8 h-8 ${item.accent} mx-auto mb-5`}
                    aria-hidden="true"
                  />
                  <h3 className="font-display text-lg font-semibold text-text-primary mb-3">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <p className={`font-mono text-sm font-bold ${item.accent}`}>{item.price}</p>
                </SpotlightCard>
              ))}
            </div>

            <div className="text-center">
              <GlowButton href="/get-involved#contact" variant="ghost">
                <FileText className="w-4 h-4" aria-hidden="true" />
                Request a Proposal
              </GlowButton>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
