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
  Coins, Activity, Feather,
} from 'lucide-react';
import { GlowButton } from '@/components/ui/glow-button';
import { cn } from '@/lib/utils';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from '@/lib/i18n/TranslationContext';

type LucideIcon = React.ComponentType<{ className?: string }>;

type NavLink = {
  labelKey: string;
  href: string;
  icon: LucideIcon;
  descKey: string;
  descFallback: string;
};

type FeatureCard = {
  statKey: string;
  statLabelKey: string;
  cta: { labelKey: string; href: string };
};

type NavSection = {
  labelKey: string;
  href: string;
  accent: 'ochre' | 'cyan' | 'clay';
  links: NavLink[];
  feature: FeatureCard;
  viewAll?: { labelKey: string; href: string };
};

const NAV_SECTIONS: NavSection[] = [
  {
    labelKey: 'nav.about',
    href: '/about',
    accent: 'cyan',
    links: [
      { labelKey: 'nav.about.our_story', href: '/about',        icon: Globe,        descKey: 'nav.about.our_story_desc',  descFallback: 'Mission, vision & origin' },
      { labelKey: 'nav.about.manifesto', href: '/manifesto',    icon: Feather,      descKey: 'nav.about.manifesto_desc',  descFallback: 'Our founding statement on language equity' },
      { labelKey: 'nav.about.team',      href: '/about#team',   icon: Users,        descKey: 'nav.about.team_desc',       descFallback: 'Language researchers & changemakers' },
      { labelKey: 'nav.about.reports',   href: '/about',        icon: FileText,     descKey: 'nav.about.reports_desc',    descFallback: 'Transparency & impact data' },
      { labelKey: 'nav.about.ethics',    href: '/ethics',       icon: ShieldCheck,  descKey: 'nav.about.ethics_desc',     descFallback: 'Data sovereignty & compliance dashboard' },
      { labelKey: 'nav.about.press',     href: '/about',        icon: Newspaper,    descKey: 'nav.about.press_desc',      descFallback: 'Coverage & press kit' },
    ],
    feature: {
      statKey: 'nav.about.feature_stat',
      statLabelKey: 'nav.about.feature_label',
      cta: { labelKey: 'nav.about.feature_cta', href: '/about' },
    },
  },
  {
    labelKey: 'nav.programs',
    href: '/programs',
    accent: 'ochre',
    links: [
      { labelKey: 'nav.programs.openspeech',  href: '/programs/openspeech-initiative', icon: Mic,        descKey: 'nav.programs.openspeech_desc',  descFallback: 'Open speech data for 200+ African languages' },
      { labelKey: 'nav.programs.futures_lab', href: '/programs/language-futures-lab',  icon: Microscope, descKey: 'nav.programs.futures_lab_desc',  descFallback: 'Low-resource NLP models & benchmarks' },
      { labelKey: 'nav.programs.lughatna',    href: '/programs/lughatna-platform',     icon: Heart,      descKey: 'nav.programs.lughatna_desc',    descFallback: 'Self-hosted, offline-first NLP for communities' },
      { labelKey: 'nav.programs.policy',      href: '/programs/policy-governance',     icon: Scale,      descKey: 'nav.programs.policy_desc',      descFallback: 'Embedding language equity in AI policy' },
    ],
    feature: {
      statKey: 'nav.programs.feature_stat',
      statLabelKey: 'nav.programs.feature_label',
      cta: { labelKey: 'nav.programs.feature_cta', href: '/donate' },
    },
    viewAll: { labelKey: 'nav.programs.view_all', href: '/programs' },
  },
  {
    labelKey: 'nav.technology',
    href: '/technology',
    accent: 'cyan',
    links: [
      { labelKey: 'nav.technology.api',          href: '/technology#sandbox',      icon: Code2,    descKey: 'nav.technology.api_desc',          descFallback: 'Try live API calls — no signup required' },
      { labelKey: 'nav.technology.architecture', href: '/technology#architecture', icon: Layers,   descKey: 'nav.technology.architecture_desc', descFallback: 'Interactive 4-node stack diagram' },
      { labelKey: 'nav.technology.nutrition',    href: '/technology#nutrition',    icon: Database, descKey: 'nav.technology.nutrition_desc',    descFallback: 'Ethical compliance for every dataset' },
      { labelKey: 'nav.technology.sovereignty',  href: '/technology#escrow',       icon: BookOpen, descKey: 'nav.technology.sovereignty_desc',  descFallback: 'Who owns the data — visualised' },
    ],
    feature: {
      statKey: 'nav.technology.feature_stat',
      statLabelKey: 'nav.technology.feature_label',
      cta: { labelKey: 'nav.technology.feature_cta', href: '/technology' },
    },
  },
  {
    labelKey: 'nav.impact',
    href: '/impact',
    accent: 'clay',
    links: [
      { labelKey: 'nav.impact.map',          href: '/impact',               icon: Map,           descKey: 'nav.impact.map_desc',          descFallback: 'Track our reach across 47 countries' },
      { labelKey: 'nav.impact.vitality',     href: '/vitality',             icon: Activity,      descKey: 'nav.impact.vitality_desc',     descFallback: 'AI readiness audit for African languages' },
      { labelKey: 'nav.impact.stories',      href: '/impact#stories',       icon: MessageSquare, descKey: 'nav.impact.stories_desc',      descFallback: 'Voices from communities we serve' },
      { labelKey: 'nav.impact.metrics',      href: '/impact#metrics',       icon: BarChart2,     descKey: 'nav.impact.metrics_desc',      descFallback: 'Evidence-based progress reporting' },
      { labelKey: 'nav.impact.publications', href: '/insights#publications', icon: FileText,     descKey: 'nav.impact.publications_desc', descFallback: 'Research, policy briefs & reports' },
    ],
    feature: {
      statKey: 'nav.impact.feature_stat',
      statLabelKey: 'nav.impact.feature_label',
      cta: { labelKey: 'nav.impact.feature_cta', href: '/impact' },
    },
  },
  {
    labelKey: 'nav.get_involved',
    href: '/get-involved',
    accent: 'ochre',
    links: [
      { labelKey: 'nav.get_involved.volunteer',   href: '/get-involved#contributor', icon: HandHeart,    descKey: 'nav.get_involved.volunteer_desc',   descFallback: 'Contribute voice data, earn via mobile money' },
      { labelKey: 'nav.get_involved.bounties',    href: '/bounties',                 icon: Coins,        descKey: 'nav.get_involved.bounties_desc',    descFallback: 'Fund specific language data deficits' },
      { labelKey: 'nav.get_involved.partner',     href: '/get-involved#pathways',    icon: Handshake,    descKey: 'nav.get_involved.partner_desc',     descFallback: 'For institutions & organisations' },
      { labelKey: 'nav.get_involved.fellowships', href: '/get-involved',             icon: GraduationCap, descKey: 'nav.get_involved.fellowships_desc', descFallback: 'AI × Language research fellowships' },
      { labelKey: 'nav.get_involved.contact',     href: '/get-involved#contact',     icon: Mail,         descKey: 'nav.get_involved.contact_desc',     descFallback: 'Get in touch with our team' },
    ],
    feature: {
      statKey: 'nav.get_involved.feature_stat',
      statLabelKey: 'nav.get_involved.feature_label',
      cta: { labelKey: 'nav.get_involved.feature_cta', href: '/get-involved' },
    },
  },
  {
    labelKey: 'nav.insights',
    href: '/insights',
    accent: 'clay',
    links: [
      { labelKey: 'nav.insights.research',    href: '/insights',          icon: FlaskConical, descKey: 'nav.insights.research_desc',    descFallback: 'Peer-reviewed NLP research' },
      { labelKey: 'nav.insights.policy',      href: '/insights',          icon: ScrollText,   descKey: 'nav.insights.policy_desc',      descFallback: 'Language equity in policy contexts' },
      { labelKey: 'nav.insights.field_notes', href: '/insights#stories',  icon: PenLine,      descKey: 'nav.insights.field_notes_desc', descFallback: 'Dispatches from the field' },
      { labelKey: 'nav.insights.newsletter',  href: '#newsletter',        icon: Newspaper,    descKey: 'nav.insights.newsletter_desc',  descFallback: 'Monthly updates from LocaleNLP' },
    ],
    feature: {
      statKey: 'nav.insights.feature_stat',
      statLabelKey: 'nav.insights.feature_label',
      cta: { labelKey: 'nav.insights.feature_cta', href: '/insights' },
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
  const { t } = useTranslation();
  const c = ACCENT[section.accent];
  return (
    <div className="container-wide section-padding py-8">
      <div className="grid grid-cols-[1fr_260px] gap-12">
        <div>
          <p className={cn('text-[10px] font-semibold uppercase tracking-widest mb-5', c.text)}>
            {t(section.labelKey)}
          </p>
          <div className="grid grid-cols-2 gap-1">
            {section.links.map(({ labelKey, href, icon: Icon, descKey, descFallback }) => (
              <Link
                key={href + labelKey}
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
                    {t(labelKey)}
                  </span>
                  <span className="text-xs text-text-secondary mt-0.5 leading-snug">
                    {t(descKey, descFallback)}
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
              {t(section.viewAll.labelKey)}
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          )}
        </div>

        <div className="flex flex-col justify-center">
          <div className={cn('p-5 rounded-2xl border', c.border, c.card)}>
            <p className={cn('font-display text-3xl font-bold mb-1 leading-none', c.text)}>
              {t(section.feature.statKey)}
            </p>
            <p className="text-sm text-text-secondary mt-2 mb-4 leading-snug">
              {t(section.feature.statLabelKey)}
            </p>
            <Link
              href={section.feature.cta.href}
              onClick={onClose}
              className={cn('inline-flex items-center gap-1.5 text-xs font-semibold transition-colors hover:opacity-75', c.text)}
            >
              {t(section.feature.cta.labelKey)}
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Navigation() {
  const { t } = useTranslation();
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

  const activeSection = NAV_SECTIONS.find((s) => s.labelKey === openKey) ?? null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/8">
      <nav className="container-wide section-padding" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            href="/"
            className="shrink-0 flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-[#04040A] rounded"
            aria-label={t('a11y.logo_home', 'LocaleNLP Foundation home')}
            onClick={closeMenu}
          >
            <Image
              src="/logo-icon.png"
              alt={t('a11y.logo_home', 'LocaleNLP Foundation')}
              width={40}
              height={40}
              priority
              className="h-9 w-9 object-contain brightness-[1.2]"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_SECTIONS.map((section) => (
              <button
                key={section.labelKey}
                ref={(el) => { if (openKey === section.labelKey) activeTrigger.current = el; }}
                onMouseEnter={() => openSection(section.labelKey)}
                onMouseLeave={scheduleMegaClose}
                onFocus={() => openSection(section.labelKey)}
                onClick={() => setOpenKey((v) => (v === section.labelKey ? null : section.labelKey))}
                aria-expanded={openKey === section.labelKey}
                aria-haspopup="true"
                aria-controls={openKey === section.labelKey ? megaPanelId : undefined}
                className="px-3 py-2 text-sm font-medium text-text-secondary hover:text-white transition-colors duration-200 rounded-md hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-[#04040A]"
              >
                {t(section.labelKey)}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <LanguageSwitcher />
            <GlowButton href="/donate" variant="primary" className="text-sm" onClick={closeMenu}>
              {t('nav.donate', 'Donate')}
            </GlowButton>
          </div>

          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2 text-white rounded-md hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
            aria-label={isMobileOpen ? t('nav.close_menu', 'Close menu') : t('nav.open_menu', 'Open menu')}
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
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
          aria-label={`${t(activeSection.labelKey)} navigation`}
        >
          <MegaPanel section={activeSection} onClose={closeMenu} />
        </div>
      )}

      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 top-16 md:top-20 z-40 glass-panel border-t border-white/8 overflow-y-auto animate-slide-down">
          <nav
            className="container-wide section-padding py-6 flex flex-col gap-1"
            aria-label="Mobile navigation"
          >
            {NAV_SECTIONS.map((section) => {
              const c = ACCENT[section.accent];
              const isOpen = mobileAccordion === section.labelKey;
              return (
                <div key={section.labelKey}>
                  <button
                    onClick={() => setMobileAccordion((v) => (v === section.labelKey ? null : section.labelKey))}
                    className="w-full flex items-center justify-between py-3 px-4 text-base font-medium text-white hover:bg-white/5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
                    aria-expanded={isOpen}
                  >
                    {t(section.labelKey)}
                    <span className={cn('text-text-secondary text-lg leading-none transition-transform duration-200 select-none', isOpen && 'rotate-90')} aria-hidden="true">
                      ›
                    </span>
                  </button>
                  {isOpen && (
                    <div className="pl-4 flex flex-col gap-0.5 mt-1 mb-2">
                      {section.links.map(({ labelKey, href, icon: Icon }) => (
                        <Link
                          key={href + labelKey}
                          href={href}
                          onClick={() => setIsMobileOpen(false)}
                          className="flex items-center gap-2.5 py-2 px-4 text-sm text-text-secondary hover:text-white hover:bg-white/5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
                        >
                          <Icon className={cn('w-4 h-4 shrink-0', c.icon)} aria-hidden="true" />
                          {t(labelKey)}
                        </Link>
                      ))}
                      {section.viewAll && (
                        <Link
                          href={section.viewAll.href}
                          onClick={() => setIsMobileOpen(false)}
                          className={cn('flex items-center gap-2 py-2 px-4 text-sm font-medium hover:bg-white/5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan', c.text)}
                        >
                          {t(section.viewAll.labelKey)}
                          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
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
                {t('nav.donate', 'Donate')}
              </GlowButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
