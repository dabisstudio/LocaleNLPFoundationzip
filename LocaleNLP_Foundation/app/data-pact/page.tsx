'use client';

import { useTranslation } from '@/lib/i18n/TranslationContext';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { PageHeader } from '@/components/ui/page-header';
import { MonoLabel } from '@/components/ui/mono-label';
import { GlowButton } from '@/components/ui/glow-button';
import { DataPactMatrix } from '@/components/data-pact/DataPactMatrix';
import { DataPactTiers } from '@/components/data-pact/DataPactTiers';
import { DualEntityDiagram } from '@/components/data-pact/DualEntityDiagram';
import { ContributorLedger } from '@/components/data-pact/ContributorLedger';
import { ExternalLink, FileText, Shield, Users, Building2 } from 'lucide-react';

const POLICY_ARTICLES = [
  {
    id: 'article-i',
    labelKey: 'pact.policy.art1.label',
    titleKey: 'pact.policy.art1.title',
    bodyKeys: [
      'pact.policy.art1.p1',
      'pact.policy.art1.p2',
      'pact.policy.art1.p3',
    ],
    icon: Users,
    color: '#F5A623',
  },
  {
    id: 'article-ii',
    labelKey: 'pact.policy.art2.label',
    titleKey: 'pact.policy.art2.title',
    bodyKeys: [
      'pact.policy.art2.p1',
      'pact.policy.art2.p2',
    ],
    icon: Shield,
    color: '#00E5FF',
  },
  {
    id: 'article-iii',
    labelKey: 'pact.policy.art3.label',
    titleKey: 'pact.policy.art3.title',
    bodyKeys: [
      'pact.policy.art3.p1',
      'pact.policy.art3.p2',
      'pact.policy.art3.p3',
    ],
    icon: Building2,
    color: '#E07A5F',
  },
  {
    id: 'article-iv',
    labelKey: 'pact.policy.art4.label',
    titleKey: 'pact.policy.art4.title',
    bodyKeys: [
      'pact.policy.art4.p1',
    ],
    icon: FileText,
    color: '#4ADE80',
  },
];

export default function DataPactPage() {
  const { t } = useTranslation();

  return (
    <>
      <Navigation />
      <main id="main-content">
        <PageHeader
          label={t('pact.header.label', 'THE LOCALE DATA PACT')}
          number="19"
          status="active"
          title={t('pact.header.title', 'Language data belongs to the people')}
          titleGradient={t('pact.header.title_gradient', 'who speak it.')}
          subtitle={t('pact.header.subtitle', 'We built the world\'s first Sovereign IP Licensing Model for African language data — proving that ethical AI and commercial viability are not in conflict, but mutually reinforcing.')}
          accentColor="cyan"
        >
          <GlowButton href="#tiers" variant="primary">
            {t('pact.header.cta1', 'Explore Access Tiers')}
          </GlowButton>
          <GlowButton href="#policy" variant="ghost">
            {t('pact.header.cta2', 'Read the Policy')}
          </GlowButton>
        </PageHeader>

        <section aria-labelledby="matrix-heading" className="py-20 bg-brand-deep">
          <div className="container-wide section-padding">
            <div className="max-w-2xl mb-12">
              <MonoLabel label={t('pact.matrix.section_label', 'DATA FLOW MATRIX')} number="01" className="mb-5" status="beta" />
              <h2
                id="matrix-heading"
                className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4"
              >
                {t('pact.matrix.section_title', 'How data and capital move')}
                <span className="text-gradient"> {t('pact.matrix.section_title2', 'through the ecosystem')}</span>
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed">
                {t('pact.matrix.section_body', 'The Locale Data Pact is not a disclaimer buried in fine print. It is a live, enforceable architecture. Select your role to see your exact journey.')}
              </p>
            </div>
            <DataPactMatrix />
          </div>
        </section>

        <section id="tiers" aria-labelledby="tiers-heading" className="py-20 bg-brand-surface">
          <div className="container-wide section-padding">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <MonoLabel label={t('pact.tier.section_label', 'ACCESS FRAMEWORK')} number="02" className="mb-5" status="active" />
              <h2
                id="tiers-heading"
                className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4"
              >
                {t('pact.tier.section_title', 'Three tiers.')}
                <span className="text-gradient"> {t('pact.tier.section_title2', 'One ecosystem.')}</span>
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed">
                {t('pact.tier.section_body', 'Governance must precede extraction. By defining who gets access and on what terms, we transform data from a commodity into a sovereign asset.')}
              </p>
            </div>
            <DataPactTiers />
          </div>
        </section>

        <section aria-labelledby="ledger-heading" className="py-20 bg-brand-deep">
          <div className="container-wide section-padding">
            <div className="max-w-2xl mb-12">
              <MonoLabel label={t('pact.ledger.section_label', 'TRANSPARENCY LEDGER')} number="03" className="mb-5" status="active" />
              <h2
                id="ledger-heading"
                className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4"
              >
                {t('pact.ledger.section_title', 'Revenue routed back')}
                <span className="text-gradient"> {t('pact.ledger.section_title2', 'to communities')}</span>
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed">
                {t('pact.ledger.section_body', 'Every commercial licensing fee collected is publicly reported and routed directly to the communities who created the data. This is not a promise — it is an audited guarantee.')}
              </p>
            </div>
            <ContributorLedger />
          </div>
        </section>

        <section aria-labelledby="dual-entity-heading" className="py-20 bg-brand-surface">
          <div className="container-wide section-padding">
            <div className="max-w-2xl mb-12">
              <MonoLabel label={t('pact.dual.section_label', 'DUAL-ENTITY MODEL')} number="04" className="mb-5" status="active" />
              <h2
                id="dual-entity-heading"
                className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4"
              >
                {t('pact.dual.section_title', 'The Foundation guards.')}
                <span className="text-gradient"> {t('pact.dual.section_title2', 'The For-Profit scales.')}</span>
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed">
                {t('pact.dual.section_body', 'The Mozilla Model. The original OpenAI structure. The Anthropic Public Benefit playbook. A dual-entity architecture is how you protect communities and raise the capital to serve them at scale.')}
              </p>
            </div>
            <DualEntityDiagram />
          </div>
        </section>

        <section id="policy" aria-labelledby="policy-heading" className="py-20 bg-brand-deep">
          <div className="container-wide section-padding">
            <div className="max-w-2xl mb-12">
              <MonoLabel label={t('pact.policy.section_label', 'LEGAL FRAMEWORK')} number="05" className="mb-5" status="active" />
              <h2
                id="policy-heading"
                className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4"
              >
                {t('pact.policy.section_title', 'The Locale Data Pact')}
                <span className="text-gradient"> {t('pact.policy.section_title2', 'v1.0')}</span>
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed">
                {t('pact.policy.section_body', 'This framework transforms the concept of "ethical AI" into a binding, unassailable operational standard.')}
              </p>
            </div>

            <div className="grid lg:grid-cols-[200px_1fr] gap-10">
              <nav aria-label={t('pact.policy.toc_aria', 'Policy table of contents')} className="hidden lg:block">
                <div className="sticky top-28 space-y-1">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary mb-3">
                    {t('pact.policy.toc_label', 'Contents')}
                  </p>
                  {[
                    { id: 'preamble', label: t('pact.policy.preamble_nav', 'Preamble') },
                    ...POLICY_ARTICLES.map((a) => ({
                      id: a.id,
                      label: t(a.labelKey),
                    })),
                  ].map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block text-xs text-ink-muted hover:text-ink-monument transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ochre rounded"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </nav>

              <div className="space-y-10">
                <div
                  id="preamble"
                  className="rounded-2xl border p-6"
                  style={{ borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.02)' }}
                >
                  <p className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary mb-4">
                    {t('pact.policy.preamble_label', 'Preamble')}
                  </p>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {t('pact.policy.preamble_body', 'The LocaleNLP Foundation recognizes that linguistic data generated by African and Arabic-speaking communities is a sovereign asset. Traditional data extraction methods violate the moral rights of creators and introduce structural bias. The Locale Data Pact establishes a definitive, enforceable framework to ensure data sovereignty, equitable compensation, and frictionless open-source innovation.')}
                  </p>
                </div>

                {POLICY_ARTICLES.map((article) => {
                  const Icon = article.icon;
                  return (
                    <div
                      key={article.id}
                      id={article.id}
                      className="rounded-2xl border p-6"
                      style={{ borderColor: `${article.color}20`, backgroundColor: `${article.color}04` }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${article.color}15` }}
                          aria-hidden="true"
                        >
                          <Icon className="w-4 h-4" style={{ color: article.color }} />
                        </div>
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: article.color }}>
                            {t(article.labelKey)}
                          </p>
                          <h3 className="text-ink-monument font-semibold text-sm">{t(article.titleKey)}</h3>
                        </div>
                      </div>
                      <ol className="space-y-3">
                        {article.bodyKeys.map((bk, i) => (
                          <li key={bk} className="flex items-start gap-3 text-text-secondary text-sm leading-relaxed">
                            <span
                              className="font-mono text-[10px] mt-1 shrink-0 opacity-60"
                              style={{ color: article.color }}
                            >
                              {String(i + 1).padStart(2, '0')}.
                            </span>
                            {t(bk)}
                          </li>
                        ))}
                      </ol>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="enterprise-cta-heading" className="py-20 bg-brand-surface">
          <div className="container-wide section-padding">
            <div
              className="rounded-3xl border p-10 md:p-14 relative overflow-hidden"
              style={{ borderColor: 'rgba(224,122,95,0.2)', backgroundColor: 'rgba(224,122,95,0.04)' }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-30"
                style={{ background: 'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(224,122,95,0.15), transparent 70%)' }}
              />
              <div className="relative z-10 grid md:grid-cols-[1fr_auto] gap-8 items-center">
                <div>
                  <MonoLabel label={t('pact.enterprise_cta.label', 'ENTERPRISE ACCESS')} status="active" className="mb-4" />
                  <h2
                    id="enterprise-cta-heading"
                    className="font-display text-2xl md:text-3xl font-bold text-text-primary mb-3"
                  >
                    {t('pact.enterprise_cta.title', 'Building commercial AI?')}
                  </h2>
                  <p className="text-text-secondary text-base leading-relaxed max-w-xl">
                    {t('pact.enterprise_cta.body', 'Access enterprise-grade African and Arabic language models and SLAs via LocaleNLP Commercial. Train proprietary LLMs without the legal risk of scraped data.')}
                  </p>
                </div>
                <div className="flex flex-col gap-3 shrink-0">
                  <GlowButton
                    href="https://localenlp.com"
                    variant="primary"
                    className="whitespace-nowrap"
                  >
                    {t('pact.enterprise_cta.cta1', 'LocaleNLP Commercial')}
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  </GlowButton>
                  <GlowButton
                    href="/get-involved#contact"
                    variant="ghost"
                    className="whitespace-nowrap"
                    showArrow={false}
                  >
                    {t('pact.enterprise_cta.cta2', 'Contact Enterprise Sales')}
                  </GlowButton>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
