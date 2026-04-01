'use client';

import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import * as THREE from 'three';
import * as d3 from 'd3-scale';
import {
  VITALITY_DATA,
  VITALITY_STATUS_COLORS,
  VITALITY_STATUS_LABELS,
  VITALITY_SUMMARY,
  type LanguageVitalityRecord,
  type VitalityStatus,
} from '@/lib/vitality-data';

/* ═══════════════════════════════════════════════════════════════════════════
 * Dynamic import of react-globe.gl (no SSR)
 * ═══════════════════════════════════════════════════════════════════════════ */
const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

/* ═══════════════════════════════════════════════════════════════════════════
 * COLOR SCALES — matching reference repo's d3 approach with our palette
 * ═══════════════════════════════════════════════════════════════════════════ */
const STATUS_COLORS: Record<VitalityStatus, string> = {
  DEPLOYABLE: 'rgba(0, 229, 255, 0.9)',
  EMERGING_CORPUS: 'rgba(245, 166, 35, 0.9)',
  CRITICAL_DATA_DEBT: 'rgba(224, 122, 95, 0.9)',
};

const STATUS_SIDE_COLORS: Record<VitalityStatus, string> = {
  DEPLOYABLE: 'rgba(0, 229, 255, 0.3)',
  EMERGING_CORPUS: 'rgba(245, 166, 35, 0.3)',
  CRITICAL_DATA_DEBT: 'rgba(224, 122, 95, 0.25)',
};

/* ═══════════════════════════════════════════════════════════════════════════
 * PREPARE HEX BIN DATA — transform VITALITY_DATA for react-globe.gl
 * ═══════════════════════════════════════════════════════════════════════════ */
const hexData = VITALITY_DATA.map((lang) => ({
  lat: lang.lat,
  lng: lang.lng,
  weight: lang.totalTokens,
  status: lang.vitalityStatus,
  lang, // keep full record for tooltips
}));

/* ═══════════════════════════════════════════════════════════════════════════
 * COMPONENT
 * ═══════════════════════════════════════════════════════════════════════════ */

interface SovereignGlobeProps {
  onSelect?: (lang: LanguageVitalityRecord) => void;
  selected?: LanguageVitalityRecord | null;
  interactive?: boolean;
  className?: string;
}

export default function SovereignGlobe({
  onSelect,
  selected,
  interactive = true,
  className = '',
}: SovereignGlobeProps) {
  const globeRef = useRef<any>();
  const [countries, setCountries] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Mark as mounted (client-side only)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fetch country borders for the polygon layer
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then((r) => r.json())
      .then((data) => setCountries(data.features))
      .catch(() => {}); // Silently fail if offline
  }, []);

  // Responsive sizing
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(() => {
      if (!containerRef.current) return;
      setDimensions({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight,
      });
    });
    ro.observe(containerRef.current);
    setDimensions({
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
    });
    return () => ro.disconnect();
  }, [isMounted]);

  // Setup controls, studio lighting, and initial camera
  useEffect(() => {
    if (!globeRef.current || !isMounted) return;

    const globe = globeRef.current as any;

    // Camera & controls
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.8;
    globe.controls().enablePan = false;
    globe.controls().minDistance = 150;
    globe.controls().maxDistance = 400;

    // Focus on Africa
    globe.pointOfView({ lat: 5, lng: 20, altitude: 2.0 }, 2000);

    // ── Premium Studio Lighting (from reference) ──────────────────────
    const scene = globe.scene();

    // Remove any previously injected lights (hot reload safe)
    const old = scene.children.filter((c: any) => c.name === 'studioLight');
    old.forEach((l: any) => scene.remove(l));

    // Key light — bright cool white, main specular highlight
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.0);
    keyLight.position.set(50, 50, 50);
    keyLight.name = 'studioLight';
    scene.add(keyLight);

    // Fill light — warm, fills shadows
    const fillLight = new THREE.DirectionalLight(0xffedd5, 1.0);
    fillLight.position.set(-50, 0, 50);
    fillLight.name = 'studioLight';
    scene.add(fillLight);

    // Rim light — strong greyish, creates glowing edge effect
    const rimLight = new THREE.DirectionalLight(0x6b7280, 4.0);
    rimLight.position.set(-50, -50, -50);
    rimLight.name = 'studioLight';
    scene.add(rimLight);

    // Pause rotation on interaction, resume after delay
    if (interactive) {
      let resumeTimer: ReturnType<typeof setTimeout>;
      globe.controls().addEventListener('start', () => {
        globe.controls().autoRotate = false;
        clearTimeout(resumeTimer);
      });
      globe.controls().addEventListener('end', () => {
        resumeTimer = setTimeout(() => {
          globe.controls().autoRotate = true;
        }, 4000);
      });
    }
  }, [isMounted, interactive]);

  // ── Glass globe material (from reference: MeshPhysicalMaterial) ──────
  const globeMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: '#0f172a',
      transparent: true,
      opacity: 0.15,
      roughness: 0.05,
      metalness: 0.3,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      transmission: 0.95,
      ior: 1.2,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
  }, []);

  // Max tokens for height normalization
  const maxTokens = useMemo(() => Math.max(...VITALITY_DATA.map((d) => d.totalTokens)), []);

  // Handle hex click
  const handleHexClick = useCallback(
    (d: any) => {
      if (!interactive || !onSelect || !d?.points?.length) return;
      const point = d.points[0];
      if (point?.lang) onSelect(point.lang);
    },
    [interactive, onSelect],
  );

  // Format helpers for tooltip
  const fmtTokens = (n: number) => {
    if (n >= 1e9) return `${(n / 1e9).toFixed(1)}B`;
    if (n >= 1e6) return `${(n / 1e6).toFixed(0)}M`;
    return n.toLocaleString();
  };

  if (!isMounted) {
    return (
      <div className={`w-full flex items-center justify-center bg-[#030409] ${className}`} style={{ minHeight: 500 }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
          <span className="text-cyan-400 text-sm font-mono tracking-[0.2em] animate-pulse">
            INITIALIZING GLOBE...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className}`}
      style={{ minHeight: 500, background: 'radial-gradient(circle at 50% 50%, #171717 0%, #000000 100%)' }}
    >
      <Globe
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        globeMaterial={globeMaterial}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        showAtmosphere={true}
        atmosphereColor="#00E5FF"
        atmosphereAltitude={0.15}
        showGraticules={true}
        // ── Country borders layer ──────────────────────────────────────
        polygonsData={countries}
        polygonCapColor={() => 'rgba(0,0,0,0)'}
        polygonSideColor={() => 'rgba(0,0,0,0)'}
        polygonStrokeColor={() => 'rgba(255, 255, 255, 0.3)'}
        polygonAltitude={0.001}
        // ── Data spikes (hexBin layer) ─────────────────────────────────
        hexBinPointsData={hexData}
        hexBinPointLat="lat"
        hexBinPointLng="lng"
        hexBinPointWeight="weight"
        hexAltitude={(d: any) =>
          Math.max(0.02, Math.min(Math.sqrt(d.sumWeight / maxTokens) * 0.6, 0.5))
        }
        hexBinResolution={4}
        hexMargin={0.35}
        hexTopColor={(d: any) => {
          const pt = d.points?.[0];
          return pt ? STATUS_COLORS[pt.status as VitalityStatus] : 'rgba(100,100,100,0.5)';
        }}
        hexSideColor={(d: any) => {
          const pt = d.points?.[0];
          return pt ? STATUS_SIDE_COLORS[pt.status as VitalityStatus] : 'rgba(100,100,100,0.1)';
        }}
        hexBinMerge={true}
        hexTransitionDuration={2000}
        // ── Surface dots layer ─────────────────────────────────────────
        pointsData={hexData}
        pointLat="lat"
        pointLng="lng"
        pointAltitude={0.001}
        pointRadius={0.25}
        pointColor={(d: any) => STATUS_COLORS[d.status as VitalityStatus] || 'rgba(100,100,100,0.3)'}
        pointsMerge={true}
        // ── Interaction ────────────────────────────────────────────────
        enablePointerInteraction={interactive}
        onHexClick={interactive ? handleHexClick : undefined}
        hexLabel={
          interactive
            ? (d: any) => {
                const pt = d.points?.[0];
                if (!pt?.lang) return '';
                const lang = pt.lang as LanguageVitalityRecord;
                const statusColor = VITALITY_STATUS_COLORS[lang.vitalityStatus];
                return `
                  <div style="background: rgba(5,5,5,0.92); padding: 14px 16px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.12); font-family: 'Inter', sans-serif; backdrop-filter: blur(8px); min-width: 180px;">
                    <div style="color: #8C8C9A; font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 4px;">${lang.countryName}</div>
                    <div style="color: #F0EDE6; font-size: 17px; font-weight: bold; margin-bottom: 2px;">${lang.languageName} <span style="font-size: 11px; font-weight: 400; opacity: 0.45;">(${lang.nativeName})</span></div>
                    <div style="display: flex; gap: 14px; margin-top: 8px; font-size: 12px;">
                      <div><span style="color: #8C8C9A;">Tokens </span><span style="color: #00E5FF; font-weight: 600;">${fmtTokens(lang.totalTokens)}</span></div>
                      <div><span style="color: #8C8C9A;">Hours </span><span style="color: #F5A623; font-weight: 600;">${lang.speechHoursValidated.toLocaleString()}</span></div>
                    </div>
                    <div style="margin-top: 8px; display: flex; align-items: center; gap: 6px;">
                      <span style="width: 7px; height: 7px; border-radius: 50%; background: ${statusColor}; box-shadow: 0 0 6px ${statusColor};"></span>
                      <span style="font-size: 10px; font-weight: 600; color: ${statusColor}; text-transform: uppercase; letter-spacing: 1px;">${VITALITY_STATUS_LABELS[lang.vitalityStatus]}</span>
                    </div>
                  </div>
                `;
              }
            : undefined
        }
      />
    </div>
  );
}
