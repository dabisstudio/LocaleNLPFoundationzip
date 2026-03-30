'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export default function HeroCanvas({ className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId: number;
    let mouse = { x: -9999, y: -9999 };

    const setup = async () => {
      const THREE = await import('three');

      let renderer: import('three').WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      } catch {
        // WebGL unavailable (e.g. sandboxed preview) — canvas stays hidden
        return;
      }

      const resize = () => {
        const w = canvas.parentElement?.clientWidth ?? window.innerWidth;
        const h = canvas.parentElement?.clientHeight ?? window.innerHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };

      const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 1000);
      camera.position.z = 80;
      const scene = new THREE.Scene();

      const N = 1800;
      const positions = new Float32Array(N * 3);
      const velocities = new Float32Array(N * 3);
      const origins = new Float32Array(N * 3);

      // Africa positional bias: cluster ~60% of particles in a
      // rough ellipse matching the continent position on screen.
      for (let i = 0; i < N; i++) {
        let x: number, y: number, z: number;
        const bias = Math.random() < 0.6;
        if (bias) {
          // Africa-shaped ellipse centred slightly right-of-centre
          const angle = Math.random() * Math.PI * 2;
          const rx = 18 + Math.random() * 14;
          const ry = 26 + Math.random() * 18;
          x = Math.cos(angle) * rx + 6;
          y = Math.sin(angle) * ry - 6;
        } else {
          x = (Math.random() - 0.5) * 100;
          y = (Math.random() - 0.5) * 100;
        }
        z = (Math.random() - 0.5) * 30;
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
        origins[i * 3] = x;
        origins[i * 3 + 1] = y;
        origins[i * 3 + 2] = z;
        velocities[i * 3] = (Math.random() - 0.5) * 0.006;
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.006;
        velocities[i * 3 + 2] = 0;
      }

      const geo = new THREE.BufferGeometry();
      const posAttr = new THREE.BufferAttribute(positions, 3);
      posAttr.setUsage(THREE.DynamicDrawUsage);
      geo.setAttribute('position', posAttr);

      const mat = new THREE.PointsMaterial({
        color: 0xf5a623,
        size: 0.45,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.55,
      });

      const points = new THREE.Points(geo, mat);
      scene.add(points);

      const mouseMoveHandler = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        mouse.x = nx * 60;
        mouse.y = ny * 40;
      };
      window.addEventListener('mousemove', mouseMoveHandler);

      const resizeObs = new ResizeObserver(resize);
      if (canvas.parentElement) resizeObs.observe(canvas.parentElement);
      resize();

      const animate = () => {
        animId = requestAnimationFrame(animate);
        const pos = posAttr.array as Float32Array;
        const REPEL = 18;
        const SPRING = 0.0025;
        const DAMP = 0.94;

        for (let i = 0; i < N; i++) {
          const ix = i * 3, iy = ix + 1, iz = ix + 2;
          const dx = pos[ix] - mouse.x;
          const dy = pos[iy] - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy) + 0.001;

          if (dist < REPEL) {
            const force = (REPEL - dist) / REPEL;
            velocities[ix] += (dx / dist) * force * 0.18;
            velocities[iy] += (dy / dist) * force * 0.18;
          }

          // Spring back to origin
          velocities[ix] += (origins[ix] - pos[ix]) * SPRING;
          velocities[iy] += (origins[iy] - pos[iy]) * SPRING;

          // Dampen
          velocities[ix] *= DAMP;
          velocities[iy] *= DAMP;

          pos[ix] += velocities[ix];
          pos[iy] += velocities[iy];
          pos[iz] += velocities[iz];
        }

        posAttr.needsUpdate = true;
        renderer.render(scene, camera);
      };
      animate();

      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('mousemove', mouseMoveHandler);
        resizeObs.disconnect();
        renderer.dispose();
        geo.dispose();
        mat.dispose();
      };
    };

    let mounted = true;
    let cleanup: (() => void) | undefined;
    setup().then((fn) => { if (mounted) cleanup = fn; });

    return () => {
      mounted = false;
      cleanup?.();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn('absolute inset-0 w-full h-full', className)}
      aria-hidden="true"
    />
  );
}
