'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;

      const waves = container.querySelectorAll('.wave-line');
      waves.forEach((wave, i) => {
        const element = wave as HTMLElement;
        element.style.transform = `translate(${x * (i + 1) * 0.1}px, ${y * (i + 1) * 0.1}px)`;
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient"
    >
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="wave-line absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-royal-500/20 to-transparent transition-transform duration-300 ease-out"
            style={{
              top: `${20 + i * 15}%`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-royal-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-ochre-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container-wide section-padding pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-midnight-800/50 border border-midnight-600/50 mb-8 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-forest-400 animate-pulse" />
            <span className="text-sm text-midnight-200">
              47 languages digitized and counting
            </span>
          </div>

          <h1 className="mb-6 text-white animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Every African Language
            <br />
            <span className="text-gradient">Deserves a Digital Future</span>
          </h1>

          <p
            className="text-lg md:text-xl text-midnight-200 max-w-2xl mx-auto mb-10 animate-fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            We are building the language technology that will give over 2,000 African languages
            a voice in the AI revolution. Because digital sovereignty starts with your mother tongue.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
            style={{ animationDelay: '0.3s' }}
          >
            <Link href="/programs" className="btn-primary group">
              Explore Our Work
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/about" className="btn-outline group">
              <Play className="w-4 h-4 mr-2" />
              Watch Our Story
            </Link>
          </div>

          <div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-up"
            style={{ animationDelay: '0.4s' }}
          >
            {[
              { value: '2,000+', label: 'African Languages' },
              { value: '500M+', label: 'Speakers Underserved' },
              { value: '< 1%', label: 'AI Training Data' },
              { value: '47', label: 'Languages We Support' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-sora font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-midnight-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-midnight-400 flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-midnight-400" />
        </div>
      </div>
    </section>
  );
}
