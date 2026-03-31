'use client';

import { useState, useCallback } from 'react';
import { VitalityMap } from './VitalityMap';
import { DetailPanel } from './DetailPanel';
import { VitalityTable } from './VitalityTable';
import type { LanguageVitalityRecord } from '@/lib/vitality-data';

interface VitalityExplorerProps {
  data: LanguageVitalityRecord[];
}

export function VitalityExplorer({ data }: VitalityExplorerProps) {
  const [selected, setSelected] = useState<LanguageVitalityRecord | null>(null);

  const handleSelect = useCallback((lang: LanguageVitalityRecord) => {
    setSelected((prev) => (prev?.isoCode === lang.isoCode ? null : lang));
  }, []);

  const handleClose = useCallback(() => setSelected(null), []);

  return (
    <>
      <section className="container-wide section-padding py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-start">
          <div>
            <div className="mb-4">
              <span className="font-mono text-[10px] text-text-tertiary uppercase tracking-widest">
                [ INTERACTIVE MAP // CLICK A LANGUAGE NODE ]
              </span>
            </div>
            <div className="w-full max-w-md">
              <VitalityMap onSelect={handleSelect} selected={selected} />
            </div>
          </div>

          <div className="w-full lg:w-72 flex flex-col justify-center items-center py-8 px-6 rounded-2xl border border-dashed border-white/12 bg-brand-surface/30 text-center gap-3 self-center">
            <span className="font-mono text-[11px] text-text-tertiary uppercase tracking-widest">
              {selected ? selected.languageName : 'Select a language'}
            </span>
            <p className="text-text-secondary text-sm">
              {selected
                ? `Click a row in the table or another dot on the map to switch languages.`
                : 'Click any dot on the map or a row in the table below to explore its AI readiness details.'}
            </p>
            {selected && (
              <button
                onClick={handleClose}
                className="mt-1 text-xs text-accent-ochre hover:opacity-75 transition-opacity font-semibold"
              >
                Clear selection ×
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="container-wide section-padding pb-20">
        <VitalityTable data={data} onSelect={handleSelect} selected={selected} />
      </section>

      <DetailPanel language={selected} onClose={handleClose} />
    </>
  );
}
