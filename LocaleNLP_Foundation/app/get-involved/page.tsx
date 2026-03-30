import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { PageHeader } from '@/components/ui/page-header';
import { MonoLabel } from '@/components/ui/mono-label';
import { PersonaSwitcher } from '@/components/ui/persona-switcher';
import { ContactForm } from '@/components/ui/contact-form';
import { GlowButton } from '@/components/ui/glow-button';
import { Users, GraduationCap, Heart } from 'lucide-react';

const CONTACT_CHANNELS = [
  {
    icon: Users,
    label: 'Partnerships',
    email: 'partnerships@localenlp.org',
  },
  {
    icon: GraduationCap,
    label: 'Fellowship Applications',
    email: 'fellowship@localenlp.org',
  },
  {
    icon: Heart,
    label: 'General Inquiries',
    email: 'hello@localenlp.org',
  },
];

export default function GetInvolvedPage() {
  return (
    <>
      <Navigation />
      <main className="pt-24">
        <PageHeader
          label="GET INVOLVED"
          number="00"
          title="Join the Movement"
          titleGradient="for Language Equity"
          subtitle="Whether you are a researcher, developer, funder, or native speaker, there is a meaningful place for you in our mission to bring every African language into the digital age."
          accentColor="ochre"
        >
          <GlowButton href="#pathways" variant="primary" showArrow={false}>
            Find Your Path
          </GlowButton>
          <GlowButton href="#contact" variant="ghost" showArrow={false}>
            Contact Us
          </GlowButton>
        </PageHeader>

        <section id="pathways" className="py-20 bg-brand-surface">
          <div className="container-wide section-padding">
            <div className="mb-12">
              <MonoLabel label="PARTICIPATION PATHWAYS" number="01" className="mb-5" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Ways to Contribute
              </h2>
              <p className="text-text-secondary max-w-2xl">
                From technical contributions to community data collection — select your role to see
                how you can make an impact.
              </p>
            </div>

            <PersonaSwitcher />
          </div>
        </section>

        <section id="contact" className="py-20 bg-brand-deep">
          <div className="container-wide section-padding">
            <div className="grid lg:grid-cols-2 gap-14">
              <div>
                <MonoLabel label="CONTACT" number="02" className="mb-5" />
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
                        <p className="font-display font-medium text-text-primary text-sm mb-0.5">
                          {label}
                        </p>
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
