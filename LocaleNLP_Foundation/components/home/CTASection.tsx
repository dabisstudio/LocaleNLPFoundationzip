import { MonoLabel } from '@/components/ui/mono-label';
import { GlowButton } from '@/components/ui/glow-button';

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container-wide section-padding">
        <div className="glass-panel rounded-2xl p-10 md:p-16 lg:p-20 relative overflow-hidden">
          {/* Grid-line depth overlay */}
          <div className="absolute inset-0 grid-lines rounded-2xl opacity-60" aria-hidden="true" />

          {/* Subtle ochre glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at top, rgba(245,166,35,0.07) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <div className="mb-8 flex justify-center">
              <MonoLabel label="GET INVOLVED" number="06" status="active" />
            </div>

            <h2 className="text-white mb-4">
              Be Part of the{' '}
              <span className="text-gradient">Language Revolution</span>
            </h2>

            <p className="text-text-secondary text-lg mb-10 max-w-xl mx-auto">
              Every language preserved is a culture saved. Every voice enabled is a barrier broken.
              Join us in building the infrastructure for the next billion speakers.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <GlowButton href="/donate" variant="primary">
                Donate
              </GlowButton>
              <GlowButton href="/get-involved" variant="ghost">
                Partner With Us
              </GlowButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
