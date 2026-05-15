import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600"],
});

const SITE_URL = 'https://anti-federalists.com';
const SITE_NAME = 'The Anti-Federalist Party';
const SITE_DESCRIPTION = 'The government closest to the people serves the people best. A national political movement restoring the founders\' vision of decentralized power — Access, Agency, Accountability.';

export const metadata: Metadata = {
  // ─── Core ───
  title: {
    default: 'The Anti-Federalist Party | Access. Agency. Accountability.',
    template: '%s | Anti-Federalist Party',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'Anti-Federalist Party', 'political party', 'decentralization',
    'local governance', 'third party', 'anti-federalism', 'new political movement',
    'community self-determination', 'individual sovereignty', 'civic engagement',
    'county politics', 'grassroots movement', 'anti-federalist papers',
    'access agency accountability',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  generator: 'Next.js',

  // ─── Canonical / Base ───
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },

  // ─── Favicon / Icons (Next.js auto-detects icon.png + apple-icon.png) ───
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', type: 'image/png' },
    ],
  },

  // ─── Web App Manifest ───
  manifest: '/manifest.json',

  // ─── OpenGraph (Facebook, LinkedIn, Discord, Slack, Telegram, iMessage, WhatsApp) ───
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'The Anti-Federalist Party — Access. Agency. Accountability.',
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'The Anti-Federalist Party — The government closest to the people serves the people best.',
        type: 'image/png',
      },
    ],
  },

  // ─── Twitter / X ───
  twitter: {
    card: 'summary_large_image',
    title: 'The Anti-Federalist Party',
    description: 'Access. Agency. Accountability. The government closest to the people serves the people best.',
    images: ['/twitter-image.png'],
    creator: '@antifederalists',
    site: '@antifederalists',
  },

  // ─── Robots / Indexing ───
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // ─── Verification (placeholders — fill when accounts are set up) ───
  // verification: {
  //   google: 'your-google-site-verification',
  //   yandex: 'your-yandex-verification',
  // },

  // ─── Apple iOS / Safari ───
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: SITE_NAME,
  },

  // ─── Theme ───
  applicationName: SITE_NAME,
  category: 'politics',
  other: {
    'msapplication-TileColor': '#0A0A12',
    'msapplication-TileImage': '/icon.png',
    'theme-color': '#0A0A12',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0A0A12' },
    { media: '(prefers-color-scheme: light)', color: '#0A0A12' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} ${jetbrains.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
