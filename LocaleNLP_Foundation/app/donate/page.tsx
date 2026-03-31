'use client';

import { Suspense } from 'react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { PageHeader } from '@/components/ui/page-header';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { MonoLabel } from '@/components/ui/mono-label';
import { GlowButton } from '@/components/ui/glow-button';
import { DonationCalculator } from '@/components/donate/DonationCalculator';
import { MonthlyGiving } from '@/components/donate/MonthlyGiving';
import { Heart, Globe, Users, CheckCircle, Shield, FileText, ExternalLink } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/TranslationContext';
import { useSearchParams } from 'next/navigation';

export default function DonatePage() {
  return (
    <Suspense>
      <DonatePageContent />
    </Suspense>
  );
}

function DonatePageContent() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const bountyTitle = searchParams.get('bounty');
  const bountyLang  = searchParams.get('lang');

  const TIERS = [
    {
      nameKey: 'donate.tier_supporter',
      amount: '$50',
      period: 'one-time',
      descKey: 'donate.tier_supporter_desc',
      features: [
        t('donate.tier_supporter_f1', 'Named in our community supporters list'),
        t('donate.tier_supporter_f2', 'Quarterly impact newsletter'),
        t('donate.tier_supporter_f3', 'Early access to research publications'),
      ],
      highlighted: false,
      accent: 'text-accent-cyan',
      spot: 'rgba(0,229,255,0.08)',
    },
    {
      nameKey: 'donate.tier_sustainer',
      amount: '$500',
      period: 'one-time',
      descKey: 'donate.tier_sustainer_desc',
      features: [
        t('donate.tier_sustainer_f1', 'Everything in Supporter'),
        t('donate.tier_sustainer_f2', 'Personal thank-you from our team'),
        t('donate.tier_sustainer_f3', 'Invitation to virtual town halls'),
        t('donate.tier_sustainer_f4', 'Recognition on our website'),
      ],
      highlighted: true,
      accent: 'text-accent-ochre',
      spot: 'rgba(245,166,35,0.12)',
    },
    {
      nameKey: 'donate.tier_partner',
      amount: '$5,000',
      period: 'one-time',
      descKey: 'donate.tier_partner_desc',
      features: [
        t('donate.tier_partner_f1', 'Everything in Sustainer'),
        t('donate.tier_partner_f2', 'Choose a language to sponsor'),
        t('donate.tier_partner_f3', 'Quarterly detailed impact reports'),
        t('donate.tier_partner_f4', 'Direct line to our research team'),
        t('donate.tier_partner_f5', 'Logo placement on materials'),
      ],
      highlighted: false,
      accent: 'text-accent-clay',
      spot: 'rgba(224,122,95,0.08)',
    },
  ];

  const INSTITUTIONAL = [
    {
      icon: Globe,
      titleKey: 'donate.inst_sponsor_title',
      titleFallback: 'Sponsor a Language',
      descKey: 'donate.inst_sponsor_desc',
      descFallback: 'Fund the complete digitization of a specific African language — from community engagement to model deployment.',
      priceKey: 'donate.inst_sponsor_price',
      priceFallback: 'From $50,000',
      spot: 'rgba(245,166,35,0.1)',
      accent: 'text-accent-ochre',
    },
    {
      icon: Users,
      titleKey: 'donate.inst_fellow_title',
      titleFallback: 'Fund a Fellowship',
      descKey: 'donate.inst_fellow_desc',
      descFallback: 'Support an African researcher through our 12-month AIxLanguage Fellowship programme.',
      priceKey: 'donate.inst_fellow_price',
      priceFallback: '$35,000 per fellow',
      spot: 'rgba(0,229,255,0.08)',
      accent: 'text-accent-cyan',
    },
    {
      icon: Heart,
      titleKey: 'donate.inst_multi_title',
      titleFallback: 'Multi-Year Commitment',
      descKey: 'donate.inst_multi_desc',
      descFallback: 'Partner with us on a multi-year grant to support long-term research and community programs.',
      priceKey: 'donate.inst_multi_price',
      priceFallback: 'Custom partnership',
      spot: 'rgba(224,122,95,0.1)',
      accent: 'text-accent-clay',
    },
  ];

  const FUND_BREAKDOWN = [
    { labelKey: 'donate.fund_research',   labelFallback: 'Research & Development', percent: 45, color: 'bg-accent-ochre' },
    { labelKey: 'donate.fund_community',  labelFallback: 'Community Programs',      percent: 30, color: 'bg-accent-clay' },
    { labelKey: 'donate.fund_ops',        labelFallback: 'Operations',              percent: 15, color: 'bg-accent-cyan' },
    { labelKey: 'donate.fund_policy',     labelFallback: 'Policy Advocacy',         percent: 10, color: 'bg-text-tertiary' },
  ];

  return (
    <>
      <Navigation />
      <main id="main-content" className="pt-24">
        {bountyTitle ? (
          <PageHeader
            label={t('donate.bounty_label', 'BOUNTY DONATION')}
            number="00"
            status="active"
            title={t('donate.bounty_title', 'Fund a Language Bounty')}
            titleGradient={bountyLang ? bountyLang.toUpperCase() : undefined}
            subtitle={`${t('donate.bounty_subtitle_prefix', 'You are funding:')} "${bountyTitle}". ${t('donate.bounty_subtitle_suffix', 'Every dollar goes directly to the community voice collectors, transcribers, and annotators working on this language.')}`}
            accentColor="clay"
          >
            <GlowButton href="#give" variant="primary" showArrow={false}>
              {t('donate.cta_choose_amount', 'Choose an Amount')}
            </GlowButton>
            <GlowButton href="/bounties" variant="ghost" showArrow={false}>
              {t('donate.cta_back_bounties', '← Back to Bounties')}
            </GlowButton>
          </PageHeader>
        ) : (
          <PageHeader
            label={t('nav.support.label', 'SUPPORT OUR MISSION')}
            number="00"
            title={t('donate.page_title', 'Every Voice')}
            titleGradient={t('donate.page_title_gradient', 'Deserves a Future')}
            subtitle={t('donate.page_subtitle', 'Your contribution powers real language infrastructure — from community data collection to open-source model release.')}
            accentColor="ochre"
          >
            <GlowButton href="#give" variant="primary" showArrow={false}>
              {t('cta.give_now', 'Give Now')}
            </GlowButton>
            <GlowButton href="#institutional" variant="ghost" showArrow={false}>
              {t('cta.institutional_giving', 'Institutional Giving')}
            </GlowButton>
          </PageHeader>
        )}

        <DonationCalculator />

        <section id="give" className="py-20 bg-brand-surface">
          <div className="container-wide section-padding">
            <div className="text-center mb-14">
              <MonoLabel label={t('donate.one_time_label', 'ONE-TIME GIVING')} number="01" className="mb-5" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
                {t('donate.one_time_title', 'Make an Immediate Impact')}
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                {t('donate.one_time_body', 'A single contribution triggers real infrastructure — transcription hours, compute cycles, and linguist stipends begin the moment your payment clears.')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {TIERS.map((tier) => (
                <SpotlightCard
                  key={tier.nameKey}
                  spotlightColor={tier.spot}
                  className={`p-8 relative ${tier.highlighted ? 'ring-1 ring-accent-ochre/30' : ''}`}
                >
                  {tier.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-3 py-1 bg-accent-ochre text-brand-deep text-xs font-mono font-bold rounded-full uppercase tracking-wide">
                        {t('donate.most_popular', 'Most Popular')}
                      </span>
                    </div>
                  )}

                  <div className="mb-5">
                    <h3 className="font-display text-xl font-semibold text-text-primary mb-1">
                      {t(tier.nameKey, tier.nameKey)}
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className={`font-mono text-4xl font-bold ${tier.accent}`}>
                        {tier.amount}
                      </span>
                      <span className="text-text-tertiary text-sm">{tier.period}</span>
                    </div>
                  </div>

                  <p className="text-text-secondary text-sm leading-relaxed mb-6">
                    {t(tier.descKey, tier.descKey)}
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
                    {t('donate.donate_cta_prefix', 'Donate')} {tier.amount}
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
                {t('donate.open_portal', 'Open Donation Portal')}
              </GlowButton>
              <p className="font-mono text-xs text-text-tertiary mt-3">
                {t('donate.secure_note', '🔒 256-bit encrypted via Stripe · 501(c)(3) verified · No account required')}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <MonoLabel label={t('donate.monthly_label', 'MONTHLY GIVING')} number="02" className="mb-5" />
                <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary mb-4">
                  {t('donate.monthly_title', 'Become a Sustaining Supporter')}
                </h2>
                <p className="text-text-secondary mb-8 leading-relaxed">
                  {t('donate.monthly_body', 'Monthly donors are the backbone of long-term language preservation. Select your tier and see the exact outcome your recurring contribution creates.')}
                </p>

                <MonthlyGiving />
              </div>

              <div className="glass-card p-8">
                <h3 className="font-display text-xl font-semibold text-text-primary mb-2">
                  {t('donate.use_of_funds', 'Use of Funds')}
                </h3>
                <p className="text-text-secondary text-sm mb-8">
                  {t('donate.use_of_funds_body', 'Cryptographically secure, community-owned, and globally compliant. Here is exactly how every dollar is allocated.')}
                </p>

                <div className="space-y-5">
                  {FUND_BREAKDOWN.map((item) => (
                    <div key={item.labelKey}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-text-secondary text-sm">{t(item.labelKey, item.labelFallback)}</span>
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
                          aria-label={`${t(item.labelKey, item.labelFallback)}: ${item.percent}%`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/8 flex items-start gap-4">
                  <Shield className="w-7 h-7 text-accent-ochre shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-display text-sm font-semibold text-text-primary">
                      {t('donate.nonprofit_title', 'Verified Non-Profit')}
                    </p>
                    <p className="text-xs text-text-tertiary mt-0.5">
                      {t('donate.nonprofit_body', '501(c)(3) registered. All donations are tax-deductible in the United States.')}
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
              <MonoLabel label={t('donate.institutional_label', 'INSTITUTIONAL GIVING')} number="03" className="mb-5" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
                {t('donate.institutional_title', 'Large-Scale Impact')}
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                {t('donate.institutional_body', 'For foundations, corporations, and governments looking to make a transformative, long-term commitment to African language equity.')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {INSTITUTIONAL.map((item) => (
                <SpotlightCard
                  key={item.titleKey}
                  spotlightColor={item.spot}
                  className="p-8 text-center"
                >
                  <item.icon
                    className={`w-8 h-8 ${item.accent} mx-auto mb-5`}
                    aria-hidden="true"
                  />
                  <h3 className="font-display text-lg font-semibold text-text-primary mb-3">
                    {t(item.titleKey, item.titleFallback)}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4">
                    {t(item.descKey, item.descFallback)}
                  </p>
                  <p className={`font-mono text-sm font-bold ${item.accent}`}>{t(item.priceKey, item.priceFallback)}</p>
                </SpotlightCard>
              ))}
            </div>

            <div className="text-center">
              <GlowButton href="/get-involved#contact" variant="ghost">
                <FileText className="w-4 h-4" aria-hidden="true" />
                {t('donate.request_proposal', 'Request a Proposal')}
              </GlowButton>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
