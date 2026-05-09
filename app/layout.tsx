import type { Metadata, Viewport } from 'next';
import { Inter, Manrope, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Aurea — Buy Gold Today. Pay Your Way.',
  description:
    'Invest in real, vault-stored gold instantly or choose flexible installment plans designed for modern buyers. Certified, insured, and transparent.',
  keywords: [
    'buy gold',
    'gold investment',
    'gold installment',
    'digital gold',
    'cash gold',
    'gold savings plan',
  ],
  openGraph: {
    title: 'Aurea — Buy Gold Today. Pay Your Way.',
    description:
      'Real gold, instantly or in installments. Certified, insured, vault-stored.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#FBF8F2',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} ${jakarta.variable}`}
    >
      <body className="min-h-screen bg-canvas text-ink font-sans antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
