'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Twitter, Linkedin, Github, Mail } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/TranslationContext';
import { BrandPattern } from '@/components/ui/BrandPattern';

const SITE_LINKS = [
  { labelKey: 'nav.about',        href: '/about' },
  { labelKey: 'nav.programs',     href: '/programs' },
  { labelKey: 'nav.technology',   href: '/technology' },
  { labelKey: 'nav.impact',       href: '/impact' },
  { labelKey: 'nav.insights',     href: '/insights' },
  { labelKey: 'nav.get_involved', href: '/get-involved' },
  { labelKey: 'nav.donate',       href: '/donate' },
];

const RESOURCE_LINKS = [
  { labelKey: 'footer.resource.open_models', href: '/technology' },
  { labelKey: 'footer.resource.datasets',    href: '/technology#datasets' },
  { labelKey: 'footer.resource.vitality_index', href: '/vitality' },
  { labelKey: 'footer.resource.bounty_board',   href: '/bounties' },
  { labelKey: 'footer.resource.publications',   href: '/insights' },
  { labelKey: 'footer.resource.documentation',  href: '/technology#docs' },
  { labelKey: 'footer.resource.partner',        href: '/get-involved#partner' },
  { labelKey: 'footer.resource.careers',        href: '/get-involved#careers' },
];

const SOCIAL_LINKS = [
  { icon: Twitter,  href: 'https://twitter.com/localenlp',            label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/company/localenlp',   label: 'LinkedIn' },
  { icon: Github,   href: 'https://github.com/localenlp',             label: 'GitHub' },
  { icon: Mail,     href: 'mailto:hello@localenlp.org',               label: 'Email' },
];

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="relative z-10 border-t border-white/8 overflow-hidden min-h-[400px]">
      {/* Background Color Layer */}
      <div 
        className="absolute inset-0 z-[-2]" 
        style={{ backgroundColor: '#0A1931' }} 
      />

      {/* Brand Pattern Layer */}
      <BrandPattern 
        variant="interactive" 
        isFixed={false} 
        opacity={0.15} 
        className="z-[-1]" 
      />

      <div className="relative z-10 container-wide section-padding py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-flex mb-5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ochre rounded"
              aria-label={t('a11y.logo_home', 'LocaleNLP Foundation home')}
            >
              <Image
                src="/FOOTER Logo LF.svg"
                alt={t('a11y.logo_home', 'LocaleNLP Foundation')}
                width={200}
                height={40}
                className="h-9 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              />
            </Link>
            <p style={{ color: 'rgba(255,255,255,0.55)' }} className="text-sm leading-relaxed max-w-xs">
              {t('footer.tagline', 'Building open, ethical language infrastructure for Africa and the Global South.')}
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4 tracking-wide">
              {t('footer.site', 'Site')}
            </h4>
            <ul className="space-y-2.5">
              {SITE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{ color: 'rgba(255,255,255,0.55)' }}
                    className="text-sm hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ochre rounded"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4 tracking-wide">
              {t('footer.resources', 'Resources')}
            </h4>
            <ul className="space-y-2.5">
              {RESOURCE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{ color: 'rgba(255,255,255,0.55)' }}
                    className="text-sm hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ochre rounded"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4 tracking-wide">
              {t('footer.connect', 'Connect')}
            </h4>
            <div className="flex flex-wrap gap-3 mb-6">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)' }}
                  className="w-9 h-9 rounded-lg flex items-center justify-center hover:text-white hover:border-accent-ochre/40 hover:bg-white/10 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ochre"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" aria-hidden="true" />
                </a>
              ))}
            </div>
            <ul className="space-y-2.5">
              <li>
                <Link href="/get-involved#contact" style={{ color: 'rgba(255,255,255,0.55)' }} className="text-sm hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ochre rounded">
                  {t('footer.contact_us', 'Contact Us')}
                </Link>
              </li>
              <li>
                <a href="#newsletter" style={{ color: 'rgba(255,255,255,0.55)' }} className="text-sm hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ochre rounded">
                  {t('footer.newsletter', 'Newsletter')}
                </a>
              </li>
              <li>
                <a href="mailto:hello@localenlp.org" style={{ color: 'rgba(255,255,255,0.55)' }} className="text-sm hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ochre rounded">
                  hello@localenlp.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p style={{ color: 'rgba(255,255,255,0.35)' }} className="font-mono text-xs tracking-wider">
            {t('footer.copyright', '© 2026 LocaleNLP Foundation. All rights reserved.')}
          </p>
          <div className="flex items-center gap-6">
            {[
              { key: 'footer.status', fallback: 'System Status', href: '/status' },
              { key: 'footer.privacy', fallback: 'Privacy Policy', href: '/privacy' },
              { key: 'footer.terms', fallback: 'Terms of Service', href: '/terms' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{ color: 'rgba(255,255,255,0.35)' }}
                className="font-mono text-xs hover:text-white transition-colors duration-200 tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ochre rounded"
              >
                {t(item.key, item.fallback)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
