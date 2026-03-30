import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { GlowButton } from '@/components/ui/glow-button';
import { MonoLabel } from '@/components/ui/mono-label';
import { Microscope } from 'lucide-react';

export default function ProgramNotFound() {
  return (
    <>
      <Navigation />
      <main className="pt-24">
        <div className="min-h-[60vh] flex items-center">
          <div className="container-wide section-padding text-center w-full">
            <div className="max-w-lg mx-auto">
              <Microscope
                className="w-14 h-14 text-text-tertiary mx-auto mb-6"
                aria-hidden="true"
              />
              <MonoLabel label="PROGRAM" number="404" className="mb-5 justify-center" />
              <h1 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Program Not Found
              </h1>
              <p className="text-text-secondary leading-relaxed mb-8">
                The program you are looking for doesn&apos;t exist or may have been moved. Explore
                our full list of programs to find what you&apos;re looking for.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <GlowButton href="/programs" variant="primary">
                  View All Programs
                </GlowButton>
                <GlowButton href="/" variant="ghost">
                  Go Home
                </GlowButton>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
