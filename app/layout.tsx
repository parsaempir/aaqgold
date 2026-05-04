import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'AaqGold — Buy Gold Bars Safely & Smartly',
  description:
    'Premium certified gold bullion. Pay in full or via flexible 0% installment plans. LBMA-accredited, fully insured, lifetime buy-back.',
  keywords: [
    'buy gold bars',
    'gold bullion',
    'gold investment',
    'installment gold',
    'certified gold',
    'physical gold',
  ],
  openGraph: {
    title: 'AaqGold — Buy Gold Bars Safely & Smartly',
    description:
      'Premium certified gold bullion with cash or 0% installment plans.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${spaceGrotesk.variable}`}
    >
      <body className="bg-ink-900 text-neutral-200 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
