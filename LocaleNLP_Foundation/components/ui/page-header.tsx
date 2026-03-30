import { MonoLabel } from '@/components/ui/mono-label';
import { cn } from '@/lib/utils';

/**
 * Full-bleed page hero used on every interior page.
 *
 * Prop contract:
 * - `label` / `number` / `status` — forwarded to MonoLabel as the eyebrow tag.
 * - `title` — plain white headline text (line 1).
 * - `titleGradient` — optional gradient text (line 2); rendered via `.text-gradient` class.
 * - `subtitle` — body copy below the headline.
 * - `cta` — alias for `children`; either prop accepts CTA button nodes (e.g. GlowButton).
 *   Both are rendered in a centred flex row. `cta` takes precedence if both are provided.
 * - `children` — alternative to `cta` (backward-compatible).
 * - `accentColor` — controls the radial glow colour behind the headline.
 */
interface PageHeaderProps {
  label: string;
  number?: string;
  status?: 'active' | 'beta' | 'legacy';
  title: string;
  titleGradient?: string;
  subtitle: string;
  /** Explicit CTA prop — accepts GlowButton nodes rendered below the subtitle. */
  cta?: React.ReactNode;
  /** Backward-compatible alias for `cta`. */
  children?: React.ReactNode;
  accentColor?: 'ochre' | 'cyan' | 'clay';
  className?: string;
}

export function PageHeader({
  label,
  number,
  status = 'active',
  title,
  titleGradient,
  subtitle,
  cta,
  children,
  accentColor = 'ochre',
  className,
}: PageHeaderProps) {
  const ctaContent = cta ?? children;
  const glowMap = {
    ochre: 'rgba(245,166,35,0.06)',
    cyan: 'rgba(0,229,255,0.06)',
    clay: 'rgba(224,122,95,0.06)',
  };

  return (
    <section className={cn('relative py-28 overflow-hidden bg-brand-deep', className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 60% -10%, ${glowMap[accentColor]}, transparent 70%)`,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px]"
      />

      <div className="container-wide section-padding relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-6">
            <MonoLabel label={label} number={number} status={status} />
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-text-primary leading-tight tracking-tight mb-6">
            {title}
            {titleGradient && (
              <>
                <br />
                <span className="text-gradient">{titleGradient}</span>
              </>
            )}
          </h1>

          <p className="text-lg text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto">
            {subtitle}
          </p>

          {ctaContent && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {ctaContent}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
