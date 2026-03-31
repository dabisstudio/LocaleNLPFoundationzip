'use client';

import { useEffect, useRef } from 'react';

export function useScrollKern<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.setAttribute('data-kern', '');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.setProperty('--kern', '0em');
          el.style.setProperty('--kern-opacity', '1');
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
