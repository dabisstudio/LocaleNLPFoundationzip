import { supabase, Partner } from '@/lib/supabase';

const FALLBACK_PARTNERS = [
  { id: 'p1', name: 'Google AI', logo_url: null },
  { id: 'p2', name: 'Mozilla Foundation', logo_url: null },
  { id: 'p3', name: 'Masakhane NLP', logo_url: null },
  { id: 'p4', name: 'AI4D Africa', logo_url: null },
  { id: 'p5', name: 'African Union', logo_url: null },
  { id: 'p6', name: 'Lacuna Fund', logo_url: null },
  { id: 'p7', name: 'DataKind', logo_url: null },
  { id: 'p8', name: 'Microsoft Research', logo_url: null },
];

async function getPartners(): Promise<Partner[]> {
  try {
    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .eq('is_featured', true)
      .order('order_index');

    if (error || !data?.length) return FALLBACK_PARTNERS as Partner[];
    return data;
  } catch {
    return FALLBACK_PARTNERS as Partner[];
  }
}

export default async function PartnersSection() {
  const partners = await getPartners();
  const doubled = [...partners, ...partners];

  return (
    <section className="py-16 border-y border-white/6 overflow-hidden" aria-label="Our partners">
      <p className="text-center font-mono text-xs text-text-tertiary tracking-widest uppercase mb-10">
        Trusted by leading organizations
      </p>

      {/* Infinite scroll marquee — CSS-only, pauses on hover */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div
          className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, #04040A 0%, transparent 100%)' }}
          aria-hidden="true"
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(270deg, #04040A 0%, transparent 100%)' }}
          aria-hidden="true"
        />

        <div className="marquee-track" aria-hidden="true">
          {doubled.map((partner, i) => (
            <div
              key={`${partner.id}-${i}`}
              className="inline-flex items-center justify-center mx-10 opacity-60 hover:opacity-100 transition-opacity duration-300 shrink-0"
            >
              {partner.logo_url ? (
                <img
                  src={partner.logo_url}
                  alt={partner.name}
                  className="h-7 w-auto object-contain brightness-0 invert"
                />
              ) : (
                <span className="font-display font-semibold text-white text-sm whitespace-nowrap">
                  {partner.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Static accessible list (hidden visually, available to screen readers) */}
      <ul className="sr-only">
        {partners.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </section>
  );
}
