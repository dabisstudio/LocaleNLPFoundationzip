'use client';

import { useState, useEffect } from 'react';
import { supabase, Country } from '@/lib/supabase';

interface ImpactMapSectionProps {
  initialCountries?: Country[];
}

export default function ImpactMapSection({ initialCountries = [] }: ImpactMapSectionProps) {
  const [countries, setCountries] = useState<Country[]>(initialCountries);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isLoading, setIsLoading] = useState(initialCountries.length === 0);

  useEffect(() => {
    if (initialCountries.length === 0) {
      fetchCountries();
    }
  }, [initialCountries.length]);

  async function fetchCountries() {
    if (!supabase) {
      setIsLoading(false);
      return;
    }
    const { data, error } = await supabase
      .from('countries')
      .select('*')
      .order('active_projects', { ascending: false });

    if (!error && data) {
      setCountries(data);
    }
    setIsLoading(false);
  }

  const africaViewBox = { x: -20, y: -38, width: 85, height: 95 };

  const countryPaths: Record<string, { d: string; cx: number; cy: number }> = {
    NG: { d: 'M10,5 L15,3 L18,8 L15,12 L8,10 Z', cx: 12, cy: 7 },
    KE: { d: 'M45,8 L50,5 L52,10 L48,14 L43,12 Z', cx: 47, cy: 10 },
    ZA: { d: 'M25,45 L35,42 L38,52 L28,55 L22,50 Z', cx: 30, cy: 48 },
    GH: { d: 'M2,5 L6,3 L8,8 L5,11 L1,9 Z', cx: 5, cy: 7 },
    ET: { d: 'M42,2 L50,0 L52,6 L46,10 L40,7 Z', cx: 46, cy: 5 },
    TZ: { d: 'M42,12 L48,10 L50,18 L44,22 L40,18 Z', cx: 45, cy: 16 },
    RW: { d: 'M38,12 L41,11 L42,14 L39,15 L37,14 Z', cx: 39, cy: 13 },
    SN: { d: 'M-8,2 L-3,0 L-1,4 L-5,6 L-10,4 Z', cx: -5, cy: 3 },
    MA: { d: 'M-5,-30 L5,-32 L8,-25 L0,-22 L-7,-26 Z', cx: 0, cy: -27 },
    EG: { d: 'M30,-25 L40,-28 L43,-18 L35,-15 L28,-20 Z', cx: 35, cy: -22 },
  };

  return (
    <section className="py-24 bg-midnight-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(45,106,79,0.1),transparent_50%)]" />

      <div className="container-wide section-padding relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-forest-500/10 text-forest-400 text-sm font-medium mb-4">
            Our Reach
          </span>
          <h2 className="text-white mb-4">Impact Across Africa</h2>
          <p className="text-midnight-200 max-w-2xl mx-auto">
            From Lagos to Nairobi, from Cape Town to Cairo, our work touches communities across the
            continent.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 relative">
            <div className="aspect-[4/3] relative bg-midnight-800/30 rounded-2xl overflow-hidden border border-midnight-700/50">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-royal-400 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <svg
                  viewBox={`${africaViewBox.x} ${africaViewBox.y} ${africaViewBox.width} ${africaViewBox.height}`}
                  className="w-full h-full"
                >
                  <defs>
                    <radialGradient id="pulseGradient">
                      <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
                      <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  <path
                    d="M-10,-30 Q20,-35 40,-25 Q55,-15 50,10 Q48,25 35,50 Q25,60 10,55 Q-5,45 -15,20 Q-20,0 -10,-30 Z"
                    fill="none"
                    stroke="rgba(107,31,119,0.3)"
                    strokeWidth="0.5"
                  />

                  {countries.map((country) => {
                    const pathData = countryPaths[country.code];
                    if (!pathData) return null;

                    const isSelected = selectedCountry?.id === country.id;
                    const pulseSize = Math.min(3, 1 + country.active_projects / 4);

                    return (
                      <g
                        key={country.id}
                        className="cursor-pointer"
                        onMouseEnter={() => setSelectedCountry(country)}
                        onMouseLeave={() => setSelectedCountry(null)}
                      >
                        <circle
                          cx={pathData.cx}
                          cy={pathData.cy}
                          r={pulseSize * 2}
                          className="text-ochre-400 animate-pulse-glow"
                          fill="url(#pulseGradient)"
                          opacity={0.3}
                        />

                        <circle
                          cx={pathData.cx}
                          cy={pathData.cy}
                          r={pulseSize}
                          className={`transition-all duration-300 ${
                            isSelected ? 'fill-ochre-400' : 'fill-royal-400'
                          }`}
                        />

                        {isSelected && (
                          <g>
                            <rect
                              x={pathData.cx + 3}
                              y={pathData.cy - 8}
                              width="25"
                              height="12"
                              rx="2"
                              fill="rgba(10,10,20,0.9)"
                              stroke="rgba(107,31,119,0.5)"
                              strokeWidth="0.3"
                            />
                            <text
                              x={pathData.cx + 5}
                              y={pathData.cy - 1}
                              fontSize="3"
                              fill="white"
                              fontFamily="sans-serif"
                            >
                              {country.name}
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })}
                </svg>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-white mb-4">Active Countries</h3>
            {countries.slice(0, 6).map((country) => (
              <div
                key={country.id}
                className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                  selectedCountry?.id === country.id
                    ? 'bg-royal-500/10 border-royal-500/50'
                    : 'bg-midnight-800/50 border-midnight-700/50 hover:border-midnight-600'
                }`}
                onMouseEnter={() => setSelectedCountry(country)}
                onMouseLeave={() => setSelectedCountry(null)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">{country.name}</h4>
                    <p className="text-xs text-midnight-400">{country.region} Africa</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-sora font-bold text-ochre-400">
                      {country.active_projects}
                    </div>
                    <p className="text-xs text-midnight-400">projects</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
