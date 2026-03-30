import Link from 'next/link';
import { Globe, Twitter, Linkedin, Github, Mail } from 'lucide-react';

const footerLinks = {
  programs: [
    { label: 'Language Futures Lab', href: '/programs/language-futures-lab' },
    { label: 'OpenSpeech Initiative', href: '/programs/openspeech-initiative' },
    { label: 'NLP for Public Good', href: '/programs/nlp-public-good' },
    { label: 'AIxLanguage Fellowship', href: '/programs/aixlanguage-fellowship' },
  ],
  resources: [
    { label: 'Open Models & APIs', href: '/technology' },
    { label: 'Datasets', href: '/technology#datasets' },
    { label: 'Publications', href: '/insights' },
    { label: 'Documentation', href: '/technology#docs' },
  ],
  organization: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Team', href: '/about#team' },
    { label: 'Impact', href: '/impact' },
    { label: 'Careers', href: '/get-involved#careers' },
  ],
  connect: [
    { label: 'Partner With Us', href: '/get-involved#partner' },
    { label: 'Donate', href: '/donate' },
    { label: 'Newsletter', href: '#newsletter' },
    { label: 'Contact', href: '/get-involved#contact' },
  ],
};

const socialLinks = [
  { icon: Twitter, href: 'https://twitter.com/localenlp', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/company/localenlp', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/localenlp', label: 'GitHub' },
  { icon: Mail, href: 'mailto:hello@localenlp.org', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="bg-midnight-950 border-t border-midnight-800">
      <div className="container-wide section-padding py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-royal-500 to-ochre-500 flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span className="font-sora font-bold text-xl text-white">LocaleNLP</span>
            </Link>
            <p className="text-midnight-300 text-sm mb-6 max-w-sm">
              Building language technology that serves all of Africa. Every voice matters, every language counts.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-midnight-800 flex items-center justify-center text-midnight-300 hover:text-white hover:bg-midnight-700 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-sora font-semibold text-white text-sm mb-4">Programs</h4>
            <ul className="space-y-2">
              {footerLinks.programs.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-midnight-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sora font-semibold text-white text-sm mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-midnight-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sora font-semibold text-white text-sm mb-4">Organization</h4>
            <ul className="space-y-2">
              {footerLinks.organization.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-midnight-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sora font-semibold text-white text-sm mb-4">Connect</h4>
            <ul className="space-y-2">
              {footerLinks.connect.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-midnight-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-midnight-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-midnight-400">
            2024 LocaleNLP Foundation. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-midnight-400">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
