import type { Metadata, Viewport } from 'next';
import './globals.css';
import ClientLayout from '@/components/layout/ClientLayout';
import Scripts from '@/components/layout/Scripts';
import { warmup } from '@/lib/db';

/* Warm up Neon DB once per server process */
declare global {
  var _msaWarmedUp: boolean | undefined;
}
if (typeof window === 'undefined' && !global._msaWarmedUp) {
  global._msaWarmedUp = true;
  warmup().catch(() => {});
}

export const metadata: Metadata = {
  metadataBase: new URL('https://msasouthsudan.org'),
  title: {
    default: 'Mission for Sustainable Advancement (MSA) | South Sudan',
    template: '%s | MSA South Sudan',
  },
  description:
    'Mission for Sustainable Advancement (MSA) — Empowering communities and Local Governments in South Sudan through Education, Health, Resilience and Recovery, Governance, Protection and Media programmes for a sustainable future.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#078930',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
        <Scripts />
      </body>
    </html>
  );
}