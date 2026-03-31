'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Menu, X, ChevronDown,
  Mic, Microscope, Heart, Scale,
  Info, Cpu, BarChart3, HandHeart, BookOpen, ArrowRight,
} from 'lucide-react';
import { GlowButton } from '@/components/ui/glow-button';
import { cn } from '@/lib/utils';

const PROGRAMS = [
  {
    label: 'OpenSpeech Initiative',
    href: '/programs/openspeech-initiative',
    icon: Mic,
    desc: 'Open speech data for 200+ African languages',
  },
  {
    label: 'Language Futures Lab',
    href: '/programs/language-futures-lab',
    icon: Microscope,
    desc: 'Low-resource NLP models & benchmarks',
  },
  {
    label: 'Lughatna Platform',
    href: '/programs/lughatna-platform',
    icon: Heart,
    desc: 'Self-hosted, offline-first NLP for communities',
  },
  {
    label: 'Policy & Governance',
    href: '/programs/policy-governance',
    icon: Scale,
    desc: 'Embedding language equity in AI policy',
  },
];

const QUICK_LINKS = [
  { label: 'About', href: '/about', icon: Info, desc: 'Our mission and story' },
  { label: 'Technology', href: '/technology', icon: Cpu, desc: 'How our systems work' },
  { label: 'Impact', href: '/impact', icon: BarChart3, desc: 'Measuring real-world change' },
];

const COMMUNITY_LINKS = [
  { label: 'Get Involved', href: '/get-involved', icon: HandHeart, desc: 'Volunteer, partner or contribute' },
  { label: 'Insights', href: '/insights', icon: BookOpen, desc: 'Research, field notes & policy' },
];

const TOP_NAV = [
  { label: 'About', href: '/about' },
  { label: 'Programs', href: '/programs', hasMega: true },
  { label: 'Technology', href: '/technology' },
  { label: 'Impact', href: '/impact' },
  { label: 'Get Involved', href: '/get-involved' },
  { label: 'Insights', href: '/insights' },
];

export default function Navigation() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);

  const headerRef = useRef<HTMLElement>(null);
  const megaTriggerRef = useRef<HTMLButtonElement>(null);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMega = useCallback(() => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    setIsMegaOpen(true);
  }, []);

  const scheduleMegaClose = useCallback(() => {
    leaveTimerRef.current = setTimeout(() => setIsMegaOpen(false), 120);
  }, []);

  const cancelMegaClose = useCallback(() => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
  }, []);

  const closeMega = useCallback(() => setIsMegaOpen(false), []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  useEffect(() => {
    if (!isMegaOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMegaOpen(false);
        megaTriggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMegaOpen]);

  useEffect(() => {
    return () => { if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current); };
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/8"
    >
      <nav className="container-wide section-padding">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            href="/"
            className="shrink-0 flex items-center"
            aria-label="LocaleNLP Foundation home"
            onClick={closeMega}
          >
            <Image
              src="/logo-white.png"
              alt="LocaleNLP Foundation"
              width={200}
              height={40}
              priority
              className="h-8 md:h-9 w-auto object-contain brightness-[1.15]"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-0.5">
            {TOP_NAV.map((item) =>
              item.hasMega ? (
                <button
                  key={item.label}
                  ref={megaTriggerRef}
                  onMouseEnter={openMega}
                  onMouseLeave={scheduleMegaClose}
                  onFocus={openMega}
                  onClick={() => setIsMegaOpen((v) => !v)}
                  aria-expanded={isMegaOpen}
                  aria-haspopup="true"
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-text-secondary hover:text-white transition-colors duration-200 rounded-md hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ochre/60"
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      'w-3.5 h-3.5 transition-transform duration-200',
                      isMegaOpen && 'rotate-180',
                    )}
                  />
                </button>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeMega}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-text-secondary hover:text-white transition-colors duration-200 rounded-md hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ochre/60"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          <div className="hidden lg:block shrink-0">
            <GlowButton href="/donate" variant="primary" className="text-sm" onClick={closeMega}>
              Donate
            </GlowButton>
          </div>

          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2 text-white rounded-md hover:bg-white/10 transition-colors"
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {isMegaOpen && (
        <div
          className="hidden lg:block absolute left-0 right-0 top-full border-t border-white/8 animate-slide-down"
          style={{ background: '#09090E', boxShadow: '0 20px 60px rgba(0,0,0,0.7)' }}
          onMouseEnter={cancelMegaClose}
          onMouseLeave={scheduleMegaClose}
          role="region"
          aria-label="Site navigation menu"
        >
          <div className="container-wide section-padding py-8">
            <div className="grid grid-cols-[2fr_1fr_1fr] gap-8 lg:gap-12">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-accent-ochre mb-5">
                  Our Programmes
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                  {PROGRAMS.map(({ label, href, icon: Icon, desc }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={closeMega}
                      className="group flex items-start gap-3 p-3 rounded-xl transition-colors duration-150 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ochre/60"
                    >
                      <span className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg bg-accent-ochre/10 flex items-center justify-center group-hover:bg-accent-ochre/20 transition-colors">
                        <Icon className="w-4 h-4 text-accent-ochre" />
                      </span>
                      <span className="flex flex-col">
                        <span className="text-sm font-semibold text-white leading-snug group-hover:text-accent-ochre transition-colors">
                          {label}
                        </span>
                        <span className="text-xs text-text-secondary mt-0.5 leading-snug">
                          {desc}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/programs"
                  onClick={closeMega}
                  className="inline-flex items-center gap-1.5 mt-5 text-xs font-medium text-accent-ochre hover:text-accent-clay transition-colors"
                >
                  View all programmes
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-accent-cyan mb-5">
                  Explore
                </p>
                <div className="flex flex-col gap-1">
                  {QUICK_LINKS.map(({ label, href, icon: Icon, desc }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={closeMega}
                      className="group flex items-start gap-3 p-3 rounded-xl transition-colors duration-150 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/60"
                    >
                      <span className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg bg-accent-cyan/10 flex items-center justify-center group-hover:bg-accent-cyan/20 transition-colors">
                        <Icon className="w-4 h-4 text-accent-cyan" />
                      </span>
                      <span className="flex flex-col">
                        <span className="text-sm font-semibold text-white leading-snug group-hover:text-accent-cyan transition-colors">
                          {label}
                        </span>
                        <span className="text-xs text-text-secondary mt-0.5 leading-snug">
                          {desc}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-accent-clay mb-5">
                  Community
                </p>
                <div className="flex flex-col gap-1">
                  {COMMUNITY_LINKS.map(({ label, href, icon: Icon, desc }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={closeMega}
                      className="group flex items-start gap-3 p-3 rounded-xl transition-colors duration-150 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-clay/60"
                    >
                      <span className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg bg-accent-clay/10 flex items-center justify-center group-hover:bg-accent-clay/20 transition-colors">
                        <Icon className="w-4 h-4 text-accent-clay" />
                      </span>
                      <span className="flex flex-col">
                        <span className="text-sm font-semibold text-white leading-snug group-hover:text-accent-clay transition-colors">
                          {label}
                        </span>
                        <span className="text-xs text-text-secondary mt-0.5 leading-snug">
                          {desc}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-xl border border-accent-ochre/20 bg-accent-ochre/5">
                  <p className="text-sm font-semibold text-white mb-1">Support our mission</p>
                  <p className="text-xs text-text-secondary mb-3">
                    Help us build language equity for 2,000+ African languages.
                  </p>
                  <GlowButton
                    href="/donate"
                    variant="primary"
                    className="text-xs px-4 py-2 h-auto"
                    onClick={closeMega}
                  >
                    Donate now
                  </GlowButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 top-16 md:top-20 z-40 glass-panel border-t border-white/8 overflow-y-auto animate-slide-down">
          <nav className="container-wide section-padding py-6 flex flex-col gap-1">
            {TOP_NAV.map((item) => (
              <div key={item.label}>
                {item.hasMega ? (
                  <>
                    <button
                      onClick={() =>
                        setMobileAccordion((v) => (v === item.label ? null : item.label))
                      }
                      className="w-full flex items-center justify-between py-3 px-4 text-base font-medium text-white hover:bg-white/5 rounded-lg transition-colors"
                      aria-expanded={mobileAccordion === item.label}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          'w-4 h-4 transition-transform duration-200',
                          mobileAccordion === item.label && 'rotate-180',
                        )}
                      />
                    </button>
                    {mobileAccordion === item.label && (
                      <div className="pl-4 flex flex-col gap-0.5 mt-1 mb-2">
                        {PROGRAMS.map(({ label, href, icon: Icon }) => (
                          <Link
                            key={href}
                            href={href}
                            onClick={() => setIsMobileOpen(false)}
                            className="flex items-center gap-2.5 py-2 px-4 text-sm text-text-secondary hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                          >
                            <Icon className="w-4 h-4 text-accent-ochre flex-shrink-0" />
                            {label}
                          </Link>
                        ))}
                        <Link
                          href="/programs"
                          onClick={() => setIsMobileOpen(false)}
                          className="flex items-center gap-2 py-2 px-4 text-sm font-medium text-accent-ochre hover:bg-white/5 rounded-lg transition-colors"
                        >
                          All programmes
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="block py-3 px-4 text-base font-medium text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="mt-4 pt-4 border-t border-white/8">
              <GlowButton
                href="/donate"
                variant="primary"
                className="w-full justify-center"
                onClick={() => setIsMobileOpen(false)}
              >
                Donate
              </GlowButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
