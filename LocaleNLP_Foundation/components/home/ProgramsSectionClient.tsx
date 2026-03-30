'use client';

import { useEffect, useRef } from 'react';

export function ProgramsSectionStagger({ children }: { children: React.ReactNode }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const setup = async () => {
      const gsapModule = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      const gsap = gsapModule.default ?? gsapModule.gsap ?? gsapModule;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        if (!gridRef.current) return;
        const cards = gridRef.current.querySelectorAll(':scope > div, :scope > a');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.55,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }, gridRef);

      return () => ctx.revert();
    };

    let cleanup: (() => void) | undefined;
    setup().then((fn) => { cleanup = fn; });
    return () => { cleanup?.(); };
  }, []);

  return (
    <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {children}
    </div>
  );
}
