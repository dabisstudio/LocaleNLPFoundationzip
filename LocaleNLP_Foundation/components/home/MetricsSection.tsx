import { supabase, ImpactMetric } from '@/lib/supabase';
import { Globe, Users, Database, Building, MapPin, Heart } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Globe,
  Users,
  Database,
  Building,
  MapPin,
  Heart,
};

async function getMetrics(): Promise<ImpactMetric[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('impact_metrics')
    .select('*')
    .order('order_index');

  if (error) {
    console.error('Error fetching metrics:', error);
    return [];
  }
  return data || [];
}

export default async function MetricsSection() {
  const metrics = await getMetrics();

  return (
    <section className="py-24 bg-gradient-to-b from-midnight-950 to-midnight-900">
      <div className="container-wide section-padding">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-royal-500/10 text-royal-400 text-sm font-medium mb-4">
            By The Numbers
          </span>
          <h2 className="text-white mb-4">Measuring Our Impact</h2>
          <p className="text-midnight-200 max-w-2xl mx-auto">
            Real progress, transparent reporting. Every metric represents lives touched and
            communities empowered.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {metrics.map((metric) => {
            const Icon = iconMap[metric.icon || 'Globe'] || Globe;

            return (
              <div key={metric.id} className="stat-card group">
                <div className="w-12 h-12 rounded-xl bg-midnight-700 flex items-center justify-center mb-4 mx-auto group-hover:bg-royal-500/20 transition-colors">
                  <Icon className="w-6 h-6 text-ochre-400" />
                </div>
                <div className="stat-number">{metric.value}</div>
                <div className="stat-label">{metric.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
