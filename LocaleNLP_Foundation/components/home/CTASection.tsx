import { MonoLabel } from '@/components/ui/mono-label';
import { GlowButton } from '@/components/ui/glow-button';

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden bg-accent-navy">
      <div
        aria-hidden="true"
        className="absolute inset-0 grid-lines opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(217,92,20,0.2) 0%, transparent 70%)',
        }}
      />

      <div className="container-wide section-padding">
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <div className="mb-8 flex justify-center">
            <MonoLabel label="GET INVOLVED" number="06" status="active" className="text-white/60" />
          </div>

          <h2 className="text-white mb-4">
            Be Part of the{' '}
            <span className="text-accent-ochre">Language Revolution</span>
          </h2>

          <p style={{ color: 'rgba(255,255,255,0.65)' }} className="text-lg mb-10 max-w-xl mx-auto">
            Every language preserved is a culture saved. Every voice enabled is a barrier broken.
            Join us in building the infrastructure for the next billion speakers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <GlowButton href="/donate" variant="primary">
              Donate
            </GlowButton>
            <GlowButton href="/get-involved" variant="ghost" className="text-white border-white/25 hover:border-white hover:bg-white hover:text-accent-navy">
              Partner With Us
            </GlowButton>
          </div>
        </div>
      </div>
    </section>
  );
}
