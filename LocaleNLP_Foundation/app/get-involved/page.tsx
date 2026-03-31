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

const CONTACT_CHANNELS = [
  { icon: Users,          label: 'Partnerships',          email: 'partnerships@localenlp.org' },
  { icon: GraduationCap, label: 'Fellowship Applications', email: 'fellowship@localenlp.org' },
  { icon: Heart,         label: 'General Inquiries',       email: 'hello@localenlp.org' },
];

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
  return (
    <>
      <Navigation />
      <main id="main-content" className="pt-24">

        <section
          id="contributor"
          className="relative overflow-hidden py-24 md:py-32"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(245,166,35,0.07) 0%, transparent 70%), #04040A' }}
        >
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-[-10%] left-[60%] w-[500px] h-[500px] rounded-full opacity-[0.04]"
              style={{ background: '#F5A623', filter: 'blur(80px)' }} />
            <div className="absolute bottom-0 left-[10%] w-[300px] h-[300px] rounded-full opacity-[0.03]"
              style={{ background: '#00E5FF', filter: 'blur(60px)' }} />
          </div>

          <div className="container-wide section-padding relative z-10">
            <div className="max-w-3xl">
              <MonoLabel label="GET INVOLVED" number="00" className="mb-6" />

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-[1.08]">
                Own your language.{' '}
                <span className="text-accent-ochre">Earn for your expertise.</span>
              </h1>

              <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
                Lughatna connects native speakers across Africa with researchers and institutions
                who need their knowledge. Contribute voice data, translations, and annotations —
                and get paid instantly via mobile money, while preserving your language for generations.
              </p>

              <div className="flex flex-wrap gap-4 mb-16">
                <GlowButton href="#micro-form" variant="primary">
                  Join the Lughatna Network
                </GlowButton>
                <GlowButton href="#pathways" variant="ghost" showArrow={false}>
                  See all pathways
                </GlowButton>
              </div>

              <div className="flex flex-wrap gap-10">
                {[
                  { value: 4700, suffix: '+', label: 'Contributors active' },
                  { value: 200,  suffix: '+', label: 'Languages supported' },
                  { value: 47,   suffix: '',  label: 'Countries reached' },
                ].map(({ value, suffix, label }) => (
                  <div key={label}>
                    <p className="font-display text-3xl md:text-4xl font-bold text-accent-ochre leading-none">
                      <AnimatedCounter target={value} suffix={suffix} />
                    </p>
                    <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-tertiary mt-1.5">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-brand-surface">
          <div className="container-wide section-padding">
            <div className="mb-12">
              <MonoLabel label="HOW IT WORKS" number="01" className="mb-5" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Three steps to your first payout
              </h2>
              <p className="text-text-secondary max-w-xl">
                No technical skills required — just your voice, your language, and ten minutes.
              </p>
            </div>
            <ContributorStepper />
          </div>
        </section>

        <section id="micro-form" className="py-20 bg-brand-deep">
          <div className="container-wide section-padding">
            <div className="grid lg:grid-cols-2 gap-14 items-start">
              <div>
                <MonoLabel label="JOIN THE NETWORK" number="02" className="mb-5" />
                <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-5">
                  Start contributing today
                </h2>
                <p className="text-text-secondary leading-relaxed mb-8 max-w-md">
                  Enter your number and native language. We&apos;ll send you a prompt via SMS — no app
                  download required. Your first session takes under 10 minutes and earns you an
                  instant mobile money transfer upon consensus.
                </p>

                <div className="space-y-5">
                  {[
                    { color: '#F5A623', title: 'Flexible hours', body: 'Contribute whenever suits you — no shifts, no minimums.' },
                    { color: '#00E5FF', title: 'Instant payment', body: 'M-Pesa, Wave, or Orange Money paid on consensus.' },
                    { color: '#E07A5F', title: 'Cultural ownership', body: 'You retain moral rights over your linguistic contribution.' },
                  ].map(({ color, title, body }) => (
                    <div key={title} className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ background: color }} />
                      <div>
                        <p className="text-text-primary font-medium text-sm mb-0.5">{title}</p>
                        <p className="text-text-secondary text-sm">{body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary mb-6">
                  [ QUICK SIGN-UP — 2 FIELDS ONLY ]
                </p>
                <MicroCommitForm />
              </div>
            </div>
          </div>
        </section>

        <section id="pathways" className="py-20 bg-brand-surface">
          <div className="container-wide section-padding">
            <div className="mb-12">
              <MonoLabel label="PARTICIPATION PATHWAYS" number="03" className="mb-5" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
                More ways to contribute
              </h2>
              <p className="text-text-secondary max-w-2xl">
                From technical contributions to community data collection — select your role to
                see how you can make an impact.
              </p>
            </div>
            <PersonaSwitcher />
          </div>
        </section>

        <section id="contact" className="py-20 bg-brand-deep">
          <div className="container-wide section-padding">
            <div className="grid lg:grid-cols-2 gap-14">
              <div>
                <MonoLabel label="CONTACT" number="04" className="mb-5" />
                <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-6">
                  Let&apos;s Talk
                </h2>
                <p className="text-text-secondary leading-relaxed mb-10">
                  Ready to get involved or have questions about our programs? Our team responds
                  within 48 hours. Fill out the form or reach us directly at the addresses below.
                </p>

                <div className="space-y-6">
                  {CONTACT_CHANNELS.map(({ icon: Icon, label, email }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent-ochre/10 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-accent-ochre" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="font-display font-medium text-text-primary text-sm mb-0.5">{label}</p>
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
