'use client';

import { useEffect, useRef, useState } from 'react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { MonoLabel } from '@/components/ui/mono-label';
import { PersonaSwitcher } from '@/components/ui/persona-switcher';
import { ContactForm } from '@/components/ui/contact-form';
import { GlowButton } from '@/components/ui/glow-button';
import { ContributorStepper } from '@/components/get-involved/ContributorStepper';
import { MicroCommitForm } from '@/components/get-involved/MicroCommitForm';
import { Users, GraduationCap, Heart } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/TranslationContext';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1400;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(ease * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function GetInvolvedPage() {
  const { t } = useTranslation();

  const CONTACT_CHANNELS = [
    { icon: Users,          labelKey: 'involved.contact_partnerships',  labelFallback: 'Partnerships',           email: 'partnerships@localenlp.org' },
    { icon: GraduationCap, labelKey: 'involved.contact_fellowship',     labelFallback: 'Fellowship Applications', email: 'fellowship@localenlp.org' },
    { icon: Heart,         labelKey: 'involved.contact_general',        labelFallback: 'General Inquiries',       email: 'hello@localenlp.org' },
  ];

  const FEATURES = [
    { color: '#F5A623', titleKey: 'involved.feature_flexible_title', bodyKey: 'involved.feature_flexible_body', titleFallback: 'Flexible hours', bodyFallback: 'Contribute whenever suits you — no shifts, no minimums.' },
    { color: '#00E5FF', titleKey: 'involved.feature_payment_title',  bodyKey: 'involved.feature_payment_body',  titleFallback: 'Instant payment',   bodyFallback: 'M-Pesa, Wave, or Orange Money paid on consensus.' },
    { color: '#E07A5F', titleKey: 'involved.feature_ownership_title', bodyKey: 'involved.feature_ownership_body', titleFallback: 'Cultural ownership', bodyFallback: 'You retain moral rights over your linguistic contribution.' },
  ];

  const STATS = [
    { value: 4700, suffix: '+', labelKey: 'involved.stat_contributors', labelFallback: 'Contributors active' },
    { value: 200,  suffix: '+', labelKey: 'involved.stat_languages',    labelFallback: 'Languages supported' },
    { value: 47,   suffix: '',  labelKey: 'involved.stat_countries',    labelFallback: 'Countries reached' },
  ];

  return (
    <>
      <Navigation />
      <main id="main-content" className="pt-24">

        <section
          id="contributor"
          className="relative overflow-hidden py-24 md:py-32"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(217,92,20,0.07) 0%, transparent 70%), #F5F5F3' }}
        >
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-[-10%] left-[60%] w-[500px] h-[500px] rounded-full opacity-[0.04]"
              style={{ background: '#F5A623', filter: 'blur(80px)' }} />
            <div className="absolute bottom-0 left-[10%] w-[300px] h-[300px] rounded-full opacity-[0.03]"
              style={{ background: '#00E5FF', filter: 'blur(60px)' }} />
          </div>

          <div className="container-wide section-padding relative z-10">
            <div className="max-w-3xl">
              <MonoLabel label={t('involved.contact_label', 'GET INVOLVED')} number="00" className="mb-6" />

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-[1.08]">
                {t('involved.h1', 'Preserve your heritage.')}{' '}
                <span className="text-accent-ochre">{t('involved.h1_accent', 'Earn for your voice.')}</span>
              </h1>

              <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
                {t('involved.subtitle', 'Join the Lughatna Contributor Network to digitize your native dialect, ensuring your culture thrives in the AI era while receiving instant mobile money payouts.')}
              </p>

              <div className="flex flex-wrap gap-4 mb-16">
                <GlowButton href="#micro-form" variant="primary">
                  {t('involved.cta_join', 'Join the Lughatna Network')}
                </GlowButton>
                <GlowButton href="#pathways" variant="ghost" showArrow={false}>
                  {t('involved.cta_pathways', 'See all pathways')}
                </GlowButton>
              </div>

              <div className="flex flex-wrap gap-10">
                {STATS.map(({ value, suffix, labelKey, labelFallback }) => (
                  <div key={labelKey}>
                    <p className="font-display text-3xl md:text-4xl font-bold text-accent-ochre leading-none">
                      <AnimatedCounter target={value} suffix={suffix} />
                    </p>
                    <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-tertiary mt-1.5">
                      {t(labelKey, labelFallback)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Live Community Validation Ticker */}
              <div className="mt-16 w-full max-w-2xl border border-ink-monument/10 bg-white/40 backdrop-blur-md rounded-xl p-4 flex items-center overflow-hidden">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-4 shrink-0 shadow-[0_0_8px_rgba(34,197,94,0.6)]" title="Live Network Monitor"/>
                 <div className="font-mono text-xs text-ink-monument font-medium flex gap-8 animate-marquee whitespace-nowrap">
                    <span>Aisha [Dakar] validated 50 Wolof tokens</span>
                    <span className="text-accent-ochre">/</span>
                    <span>Olu [Lagos] submitted 120s of Yoruba speech</span>
                    <span className="text-accent-ochre">/</span>
                    <span>Fatima [Kano] verified Hausa corpus batch</span>
                    <span className="text-accent-ochre">/</span>
                    <span>Sipho [Johannesburg] translated 15 Zulu prompts</span>
                 </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-brand-surface">
          <div className="container-wide section-padding">
            <div className="mb-12">
              <MonoLabel label={t('involved.how_label', 'HOW IT WORKS')} number="01" className="mb-5" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
                {t('involved.how_title', 'Three steps to your first payout')}
              </h2>
              <p className="text-text-secondary max-w-xl">
                {t('involved.how_body', 'No technical skills required — just your voice, your language, and ten minutes.')}
              </p>
            </div>
            <ContributorStepper />
          </div>
        </section>

        <section id="micro-form" className="py-20 bg-brand-deep">
          <div className="container-wide section-padding">
            <div className="grid lg:grid-cols-2 gap-14 items-start">
              <div>
                <MonoLabel label={t('involved.form_label', 'JOIN THE NETWORK')} number="02" className="mb-5" />
                <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-5">
                  {t('involved.form_title', 'Start contributing today')}
                </h2>
                <p className="text-text-secondary leading-relaxed mb-8 max-w-md">
                  {t('involved.form_body', "Enter your number and native language. We'll send you a prompt via SMS — no app download required. Your first session takes under 10 minutes and earns you an instant mobile money transfer upon consensus.")}
                </p>

                <div className="space-y-5">
                  {FEATURES.map(({ color, titleKey, bodyKey, titleFallback, bodyFallback }) => (
                    <div key={titleKey} className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ background: color }} />
                      <div>
                        <p className="text-text-primary font-medium text-sm mb-0.5">{t(titleKey, titleFallback)}</p>
                        <p className="text-text-secondary text-sm">{t(bodyKey, bodyFallback)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary mb-6">
                  {t('involved.signup_label', '[ QUICK SIGN-UP — 2 FIELDS ONLY ]')}
                </p>
                <MicroCommitForm />
              </div>
            </div>
          </div>
        </section>

        <section id="pathways" className="py-20 bg-brand-surface">
          <div className="container-wide section-padding">
            <div className="mb-12">
              <MonoLabel label={t('involved.pathways_label', 'PARTICIPATION PATHWAYS')} number="03" className="mb-5" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
                {t('involved.pathways_title', 'More ways to contribute')}
              </h2>
              <p className="text-text-secondary max-w-2xl">
                {t('involved.pathways_body', 'From technical contributions to community data collection — select your role to see how you can make an impact.')}
              </p>
            </div>
            <PersonaSwitcher />
          </div>
        </section>

        <section id="contact" className="py-20 bg-brand-deep">
          <div className="container-wide section-padding">
            <div className="grid lg:grid-cols-2 gap-14">
              <div>
                <MonoLabel label={t('involved.contact_label', 'CONTACT')} number="04" className="mb-5" />
                <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-6">
                  {t('involved.contact_title', "Let's Talk")}
                </h2>
                <p className="text-text-secondary leading-relaxed mb-10">
                  {t('involved.contact_body', 'Ready to get involved or have questions about our programs? Our team responds within 48 hours. Fill out the form or reach us directly at the addresses below.')}
                </p>

                <div className="space-y-6">
                  {CONTACT_CHANNELS.map(({ icon: Icon, labelKey, labelFallback, email }) => (
                    <div key={labelKey} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent-ochre/10 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-accent-ochre" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="font-display font-medium text-text-primary text-sm mb-0.5">{t(labelKey, labelFallback)}</p>
                        <a
                          href={`mailto:${email}`}
                          className="text-sm text-text-secondary hover:text-accent-ochre transition-colors"
                        >
                          {email}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
