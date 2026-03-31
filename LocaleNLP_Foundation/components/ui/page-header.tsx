import { MonoLabel } from '@/components/ui/mono-label';
import { KernHeading } from '@/components/ui/kern-heading';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  label: string;
  number?: string;
  status?: 'active' | 'beta' | 'legacy';
  title: string;
  titleGradient?: string;
  subtitle: string;
  cta?: React.ReactNode;
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

  return (
    <section
      className={cn(
        'relative py-28 overflow-hidden bg-base-stone border-b border-ink-monument/8',
        className
      )}
    >
      {/* Subtle structural grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-lines opacity-60"
      />

      <div className="container-wide section-padding relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-6">
            <MonoLabel label={label} number={number} status={status} />
          </div>

          <KernHeading
            as="h1"
            className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-ink-monument leading-tight mb-6 tracking-tighter"
          >
            {title}
            {titleGradient && (
              <>
                <br />
                <span className="text-accent-ochre">{titleGradient}</span>
              </>
            )}
          </KernHeading>

          <p className="text-lg text-ink-steel leading-relaxed mb-8 max-w-2xl mx-auto">
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
