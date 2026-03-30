import { supabase, Partner } from '@/lib/supabase';
import { Building2 } from 'lucide-react';

async function getPartners(): Promise<Partner[]> {
  const { data, error } = await supabase
    .from('partners')
    .select('*')
    .eq('is_featured', true)
    .order('order_index');

  if (error) {
    console.error('Error fetching partners:', error);
    return [];
  }
  return data || [];
}

export default async function PartnersSection() {
  const partners = await getPartners();

  return (
    <section className="py-20 bg-midnight-950 border-t border-b border-midnight-800">
      <div className="container-wide section-padding">
        <div className="text-center mb-12">
          <p className="text-sm text-midnight-400 uppercase tracking-wider mb-2">
            Trusted By Leading Organizations
          </p>
          <h3 className="text-xl text-white">Our Partners</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex items-center justify-center p-4 opacity-60 hover:opacity-100 transition-opacity group"
            >
              {partner.logo_url ? (
                <img
                  src={partner.logo_url}
                  alt={partner.name}
                  className="h-8 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all"
                />
              ) : (
                <div className="flex items-center gap-2 text-midnight-300 group-hover:text-white transition-colors">
                  <Building2 className="w-5 h-5" />
                  <span className="text-sm font-medium whitespace-nowrap">{partner.name}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
