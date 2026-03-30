import './globals.css';
import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LocaleNLP Foundation | Language Equity for Africa',
  description: 'Pan-African non-profit dedicated to language equity, digital sovereignty, and inclusive AI. Building language technology for over 2,000 African languages.',
  keywords: ['African NLP', 'Low-resource language AI', 'Digital Sovereignty Africa', 'Ethical AI datasets', 'Language technology'],
  openGraph: {
    title: 'LocaleNLP Foundation | Language Equity for Africa',
    description: 'Pan-African non-profit dedicated to language equity, digital sovereignty, and inclusive AI.',
    type: 'website',
    locale: 'en_US',
    siteName: 'LocaleNLP Foundation',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LocaleNLP Foundation | Language Equity for Africa',
    description: 'Pan-African non-profit dedicated to language equity, digital sovereignty, and inclusive AI.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
