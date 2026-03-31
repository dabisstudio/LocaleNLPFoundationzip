'use client';

import { useState, useEffect, useRef, useCallback, useId } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Menu, X, ArrowRight,
  Mic, Microscope, Heart, Scale,
  Globe, Users, FileText, Newspaper,
  Code2, Database, Layers, BookOpen,
  Map, MessageSquare, BarChart2,
  HandHeart, Handshake, GraduationCap, Mail,
  FlaskConical, ScrollText, PenLine, ShieldCheck,
  Coins, Activity,
} from 'lucide-react';
import { GlowButton } from '@/components/ui/glow-button';
import { cn } from '@/lib/utils';
import LanguageSwitcher from './LanguageSwitcher';

type LucideIcon = React.ComponentType<{ className?: string }>;

type NavLink = {
  label: string;
  href: string;
  icon: LucideIcon;
  desc: string;
};

type FeatureCard = {
  stat: string;
  statLabel: string;
  cta: { label: string; href: string };
};

type NavSection = {
  label: string;
  href: string;
  accent: 'ochre' | 'cyan' | 'clay';
  links: NavLink[];
  feature: FeatureCard;
  viewAll?: { label: string; href: string };
};

const NAV_SECTIONS: NavSection[] = [
  {
    label: 'About',
    href: '/about',
    accent: 'cyan',
    links: [
      { label: 'Our Story',           href: '/about',        icon: Globe,        desc: 'Mission, vision & origin' },
      { label: 'The Team',            href: '/about#team',   icon: Users,        desc: 'Language researchers & changemakers' },
      { label: 'Annual Reports',      href: '/about',        icon: FileText,     desc: 'Transparency & impact data' },
      { label: 'Ethics & Governance', href: '/ethics',       icon: ShieldCheck,  desc: 'Data sovereignty & compliance dashboard' },
      { label: 'Press & Media',       href: '/about',        icon: Newspaper,    desc: 'Coverage & press kit' },
    ],
    feature: {
      stat: 'Est. 2021',
      statLabel: 'Pan-African language equity foundation',
      cta: { label: 'Read our story', href: '/about' },
    },
  },
  {
    label: 'Programs',
    href: '/programs',
    accent: 'ochre',
    links: [
      { label: 'OpenSpeech Initiative', href: '/programs/openspeech-initiative', icon: Mic,        desc: 'Open speech data for 200+ African languages' },
      { label: 'Language Futures Lab',  href: '/programs/language-futures-lab',  icon: Microscope, desc: 'Low-resource NLP models & benchmarks' },
      { label: 'Lughatna Platform',     href: '/programs/lughatna-platform',     icon: Heart,      desc: 'Self-hosted, offline-first NLP for communities' },
      { label: 'Policy & Governance',  href: '/programs/policy-governance',     icon: Scale,      desc: 'Embedding language equity in AI policy' },
    ],
    feature: {
      stat: '4 active',
      statLabel: 'Open programmes across Africa',
      cta: { label: 'Support our work', href: '/donate' },
    },
    viewAll: { label: 'View all programmes', href: '/programs' },
  },
  {
    label: 'Technology',
    href: '/technology',
    accent: 'cyan',
    links: [
      { label: 'API Sandbox',         href: '/technology#sandbox',      icon: Code2,    desc: 'Try live API calls — no signup required' },
      { label: 'Stack Architecture',  href: '/technology#architecture', icon: Layers,   desc: 'Interactive 4-node stack diagram' },
      { label: 'Nutrition Labels',    href: '/technology#nutrition',    icon: Database, desc: 'Ethical compliance for every dataset' },
      { label: 'Data Sovereignty',    href: '/technology#escrow',       icon: BookOpen, desc: 'Who owns the data — visualised' },
    ],
    feature: {
      stat: '2,000+',
      statLabel: 'African languages in our pipeline',
      cta: { label: 'Explore technology', href: '/technology' },
    },
  },
  {
    label: 'Impact',
    href: '/impact',
    accent: 'clay',
    links: [
      { label: 'Impact Map',        href: '/impact',              icon: Map,          desc: 'Track our reach across 47 countries' },
      { label: 'Vitality Index',    href: '/vitality',            icon: Activity,     desc: 'AI readiness audit for African languages' },
      { label: 'Field Stories',     href: '/impact#stories',      icon: MessageSquare, desc: 'Voices from communities we serve' },
      { label: 'Metrics & Data',    href: '/impact#metrics',      icon: BarChart2,    desc: 'Evidence-based progress reporting' },
      { label: 'Publications',      href: '/insights#publications', icon: FileText,   desc: 'Research, policy briefs & reports' },
    ],
    feature: {
      stat: '47 countries',
      statLabel: 'In our Pan-African impact network',
      cta: { label: 'View the map', href: '/impact' },
    },
  },
  {
    label: 'Get Involved',
    href: '/get-involved',
    accent: 'ochre',
    links: [
      { label: 'Volunteer',      href: '/get-involved#contributor', icon: HandHeart,   desc: 'Contribute voice data, earn via mobile money' },
      { label: 'Data Bounties', href: '/bounties',                icon: Coins,       desc: 'Fund specific language data deficits' },
      { label: 'Partner With Us', href: '/get-involved#pathways', icon: Handshake,   desc: 'For institutions & organisations' },
      { label: 'Fellowships',    href: '/get-involved',           icon: GraduationCap, desc: 'AI × Language research fellowships' },
      { label: 'Contact Us',     href: '/get-involved#contact',   icon: Mail,        desc: 'Get in touch with our team' },
    ],
    feature: {
      stat: '300+',
      statLabel: 'Contributors & community members',
      cta: { label: 'Join us today', href: '/get-involved' },
    },
  },
  {
    label: 'Insights',
    href: '/insights',
    accent: 'clay',
    links: [
      { label: 'Research Papers', href: '/insights',          icon: FlaskConical, desc: 'Peer-reviewed NLP research' },
      { label: 'Policy Briefs',   href: '/insights',          icon: ScrollText,   desc: 'Language equity in policy contexts' },
      { label: 'Field Notes',     href: '/insights#stories',  icon: PenLine,      desc: 'Dispatches from the field' },
      { label: 'Newsletter',      href: '#newsletter',        icon: Newspaper,    desc: 'Monthly updates from LocaleNLP' },
    ],
    feature: {
      stat: '120+',
      statLabel: 'Research papers & field reports',
      cta: { label: 'Browse insights', href: '/insights' },
    },
  },
];

const ACCENT = {
  ochre: {
    text:      'text-accent-ochre',
    bg:        'bg-accent-ochre/10',
    bgHover:   'group-hover:bg-accent-ochre/20',
    icon:      'text-accent-ochre',
    ring:      'focus-visible:ring-accent-ochre/60',
    border:    'border-accent-ochre/20',
    card:      'bg-accent-ochre/5',
    labelHov:  'group-hover:text-accent-ochre',
  },
  cyan: {
    text:      'text-accent-cyan',
    bg:        'bg-accent-cyan/10',
    bgHover:   'group-hover:bg-accent-cyan/20',
    icon:      'text-accent-cyan',
    ring:      'focus-visible:ring-accent-cyan/60',
    border:    'border-accent-cyan/20',
    card:      'bg-accent-cyan/5',
    labelHov:  'group-hover:text-accent-cyan',
  },
  clay: {
    text:      'text-accent-clay',
    bg:        'bg-accent-clay/10',
    bgHover:   'group-hover:bg-accent-clay/20',
    icon:      'text-accent-clay',
    ring:      'focus-visible:ring-accent-clay/60',
    border:    'border-accent-clay/20',
    card:      'bg-accent-clay/5',
    labelHov:  'group-hover:text-accent-clay',
  },
} as const;

function MegaPanel({ section, onClose }: { section: NavSection; onClose: () => void }) {
  const c = ACCENT[section.accent];
  return (
    <div className="container-wide section-padding py-8">
      <div className="grid grid-cols-[1fr_260px] gap-12">
        <div>
          <p className={cn('text-[10px] font-semibold uppercase tracking-widest mb-5', c.text)}>
            {section.label}
          </p>
          <div className="grid grid-cols-2 gap-1">
            {section.links.map(({ label, href, icon: Icon, desc }) => (
              <Link
                key={href + label}
                href={href}
                onClick={onClose}
                className={cn(
                  'group flex items-start gap-3 p-3 rounded-xl transition-colors duration-150 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2',
                  c.ring,
                )}
              >
                <span className={cn('mt-0.5 shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors', c.bg, c.bgHover)}>
                  <Icon className={cn('w-4 h-4', c.icon)} />
                </span>
                <span className="flex flex-col min-w-0">
                  <span className={cn('text-sm font-semibold text-white leading-snug transition-colors', c.labelHov)}>
                    {label}
                  </span>
                  <span className="text-xs text-text-secondary mt-0.5 leading-snug">
                    {desc}
                  </span>
                </span>
              </Link>
            ))}
          </div>
          {section.viewAll && (
            <Link
              href={section.viewAll.href}
              onClick={onClose}
              className={cn('inline-flex items-center gap-1.5 mt-5 text-xs font-medium transition-colors hover:opacity-75', c.text)}
            >
              {section.viewAll.label}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        <div className="flex flex-col justify-center">
          <div className={cn('p-5 rounded-2xl border', c.border, c.card)}>
            <p className={cn('font-display text-3xl font-bold mb-1 leading-none', c.text)}>
              {section.feature.stat}
            </p>
            <p className="text-sm text-text-secondary mt-2 mb-4 leading-snug">
              {section.feature.statLabel}
            </p>
            <Link
              href={section.feature.cta.href}
              onClick={onClose}
              className={cn('inline-flex items-center gap-1.5 text-xs font-semibold transition-colors hover:opacity-75', c.text)}
            >
              {section.feature.cta.label}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Navigation() {
  const [isMobileOpen, setIsMobileOpen]   = useState(false);
  const [openKey, setOpenKey]             = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);

  const megaPanelId     = useId();
  const activeTrigger   = useRef<HTMLButtonElement | null>(null);
  const leaveTimer      = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openSection = useCallback((key: string) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setOpenKey(key);
  }, []);

  const scheduleMegaClose = useCallback(() => {
    leaveTimer.current = setTimeout(() => setOpenKey(null), 120);
  }, []);

  const cancelMegaClose = useCallback(() => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
  }, []);

  const closeMenu = useCallback(() => setOpenKey(null), []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setIsMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  useEffect(() => {
    if (!openKey) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenKey(null);
        activeTrigger.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [openKey]);

  useEffect(() => {
    return () => { if (leaveTimer.current) clearTimeout(leaveTimer.current); };
  }, []);

  const activeSection = NAV_SECTIONS.find((s) => s.label === openKey) ?? null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/8">
      <nav className="container-wide section-padding">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            href="/"
            className="shrink-0 flex items-center"
            aria-label="LocaleNLP Foundation home"
            onClick={closeMenu}
          >
            <Image
              src="/logo-icon.png"
              alt="LocaleNLP Foundation"
              width={40}
              height={40}
              priority
              className="h-9 w-9 object-contain brightness-[1.2]"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_SECTIONS.map((section) => (
              <button
                key={section.label}
                ref={(el) => { if (openKey === section.label) activeTrigger.current = el; }}
                onMouseEnter={() => openSection(section.label)}
                onMouseLeave={scheduleMegaClose}
                onFocus={() => openSection(section.label)}
                onClick={() => setOpenKey((v) => (v === section.label ? null : section.label))}
                aria-expanded={openKey === section.label}
                aria-haspopup="true"
                aria-controls={openKey === section.label ? megaPanelId : undefined}
                className="px-3 py-2 text-sm font-medium text-text-secondary hover:text-white transition-colors duration-200 rounded-md hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ochre/60"
              >
                {section.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <LanguageSwitcher />
            <GlowButton href="/donate" variant="primary" className="text-sm" onClick={closeMenu}>
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

      {activeSection && (
        <div
          id={megaPanelId}
          className="hidden lg:block absolute left-0 right-0 top-full border-t border-white/8 animate-slide-down"
          style={{ background: '#09090E', boxShadow: '0 20px 60px rgba(0,0,0,0.7)' }}
          onMouseEnter={cancelMegaClose}
          onMouseLeave={scheduleMegaClose}
          role="region"
          aria-label={`${activeSection.label} navigation`}
        >
          <MegaPanel section={activeSection} onClose={closeMenu} />
        </div>
      )}

      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 top-16 md:top-20 z-40 glass-panel border-t border-white/8 overflow-y-auto animate-slide-down">
          <nav className="container-wide section-padding py-6 flex flex-col gap-1">
            {NAV_SECTIONS.map((section) => {
              const c = ACCENT[section.accent];
              const isOpen = mobileAccordion === section.label;
              return (
                <div key={section.label}>
                  <button
                    onClick={() => setMobileAccordion((v) => (v === section.label ? null : section.label))}
                    className="w-full flex items-center justify-between py-3 px-4 text-base font-medium text-white hover:bg-white/5 rounded-lg transition-colors"
                    aria-expanded={isOpen}
                  >
                    {section.label}
                    <span className={cn('text-text-secondary text-lg leading-none transition-transform duration-200 select-none', isOpen && 'rotate-90')}>
                      ›
                    </span>
                  </button>
                  {isOpen && (
                    <div className="pl-4 flex flex-col gap-0.5 mt-1 mb-2">
                      {section.links.map(({ label, href, icon: Icon }) => (
                        <Link
                          key={href + label}
                          href={href}
                          onClick={() => setIsMobileOpen(false)}
                          className="flex items-center gap-2.5 py-2 px-4 text-sm text-text-secondary hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        >
                          <Icon className={cn('w-4 h-4 shrink-0', c.icon)} />
                          {label}
                        </Link>
                      ))}
                      {section.viewAll && (
                        <Link
                          href={section.viewAll.href}
                          onClick={() => setIsMobileOpen(false)}
                          className={cn('flex items-center gap-2 py-2 px-4 text-sm font-medium hover:bg-white/5 rounded-lg transition-colors', c.text)}
                        >
                          {section.viewAll.label}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
            <div className="mt-3 pt-4 border-t border-white/8 flex flex-col gap-3">
              <LanguageSwitcher mobile />
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
