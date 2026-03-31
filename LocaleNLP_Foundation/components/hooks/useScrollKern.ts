'use client';

import { useEffect, useRef } from 'react';

export function useScrollKern<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.letterSpacing = '0.05em';
    el.style.opacity = '0.8';
    el.style.transition = 'letter-spacing 0.6s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.5s ease';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.letterSpacing = '0em';
          el.style.opacity = '1';
          observer.unobserve(el);
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
