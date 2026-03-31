import { supabase } from '@/lib/supabase';

type PartnerDisplay = { id: string; name: string; logo_url: string | null };

const FALLBACK_PARTNERS: PartnerDisplay[] = [
  { id: 'p1', name: 'Google AI', logo_url: null },
  { id: 'p2', name: 'Mozilla Foundation', logo_url: null },
  { id: 'p3', name: 'Masakhane NLP', logo_url: null },
  { id: 'p4', name: 'AI4D Africa', logo_url: null },
  { id: 'p5', name: 'African Union', logo_url: null },
  { id: 'p6', name: 'Lacuna Fund', logo_url: null },
  { id: 'p7', name: 'DataKind', logo_url: null },
  { id: 'p8', name: 'Microsoft Research', logo_url: null },
];

async function getPartners(): Promise<PartnerDisplay[]> {
  const { data, error } = await supabase
    .from('partners')
    .select('id, name, logo_url')
    .eq('is_featured', true)
    .order('order_index');
  if (error || !data?.length) return FALLBACK_PARTNERS;
  return data;
}

function PartnerItem({ partner }: { partner: PartnerDisplay }) {
  return (
    <div className="inline-flex items-center justify-center mx-10 opacity-50 hover:opacity-90 transition-opacity duration-300 shrink-0">
      {partner.logo_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={partner.logo_url}
          alt={partner.name}
          className="h-7 w-auto object-contain"
        />
      ) : (
        <span className="font-display font-semibold text-ink-monument text-sm whitespace-nowrap">
          {partner.name}
        </span>
      )}
    </div>
  );
}

export default async function PartnersSection() {
  const partners = await getPartners();

  return (
    <section className="py-16 border-t border-b border-ink-monument/8 bg-base-paper overflow-hidden" aria-label="Our partners">
      <p className="text-center font-mono text-xs text-ink-muted tracking-widest uppercase mb-10">
        Trusted by leading organizations
      </p>

      <div className="relative overflow-hidden motion-safe:block motion-reduce:hidden">
        <div
          className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, #FAFAFA 0%, transparent 100%)' }}
          aria-hidden="true"
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(270deg, #FAFAFA 0%, transparent 100%)' }}
          aria-hidden="true"
        />
        <div className="marquee-track" aria-hidden="true">
          {[...partners, ...partners].map((partner, i) => (
            <PartnerItem key={`${partner.id}-${i}`} partner={partner} />
          ))}
        </div>
      </div>

      <div
        className="hidden motion-reduce:flex flex-wrap justify-center gap-x-10 gap-y-4 px-8"
        aria-hidden="true"
      >
        {partners.map((partner) => (
          <PartnerItem key={partner.id} partner={partner} />
        ))}
      </div>

      <ul className="sr-only">
        {partners.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </section>
  );
}
