'use client';

import { useState, useCallback } from 'react';
import GlobeSection from '@/components/globe/GlobeSection';
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
      {/* ── 3D Globe Section (dark island) ───────────────────────────── */}
      <section className="container-wide section-padding py-8">
        <div className="mb-4">
          <span className="font-mono text-[10px] text-text-tertiary uppercase tracking-widest">
            [ SOVEREIGN DATA GLOBE // CLICK A SPIKE TO EXPLORE ]
          </span>
        </div>
        <GlobeSection
          onSelect={handleSelect}
          selected={selected}
          interactive={true}
          showMetrics={false}
        />
        {selected && (
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="font-mono text-sm text-accent-cyan font-semibold">
              {selected.languageName}
            </span>
            <span className="text-text-tertiary text-xs">selected</span>
            <button
              onClick={handleClose}
              className="text-xs text-accent-ochre hover:opacity-75 transition-opacity font-semibold"
            >
              Clear ×
            </button>
          </div>
        )}
      </section>

      {/* ── Data Table ────────────────────────────────────────────────── */}
      <section className="container-wide section-padding pb-20">
        <VitalityTable data={data} onSelect={handleSelect} selected={selected} />
      </section>

      <DetailPanel language={selected} onClose={handleClose} />
    </>
  );
}
