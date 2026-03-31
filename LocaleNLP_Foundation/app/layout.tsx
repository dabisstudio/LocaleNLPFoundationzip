import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { Providers } from '@/lib/i18n/Providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LocaleNLP Foundation | Language Equity for Africa',
  description:
    'Pan-African non-profit dedicated to language equity, digital sovereignty, and inclusive AI. Building language technology for over 2,000 African languages.',
  keywords: [
    'African NLP',
    'Low-resource language AI',
    'Digital Sovereignty Africa',
    'Ethical AI datasets',
    'Language technology',
  ],
  openGraph: {
    title: 'LocaleNLP Foundation | Language Equity for Africa',
    description:
      'Pan-African non-profit dedicated to language equity, digital sovereignty, and inclusive AI.',
    type: 'website',
    locale: 'en_US',
    siteName: 'LocaleNLP Foundation',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LocaleNLP Foundation | Language Equity for Africa',
    description:
      'Pan-African non-profit dedicated to language equity, digital sovereignty, and inclusive AI.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-accent-ochre focus:text-[#04040A] focus:font-semibold focus:text-sm"
        >
          Skip to main content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
