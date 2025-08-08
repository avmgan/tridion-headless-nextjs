// app/layout.tsx
import type { Metadata } from 'next';
import Script from 'next/script';
import { fetchNavigationData } from '@/services/navigation-service';

export const metadata: Metadata = {
  metadataBase: new URL('http://site.tridiondemo.com'),
  title: {
    default: 'Home | My Site',
    template: '%s | My Site',
  },
  description: 'Default description for your site',
  openGraph: {
    title: 'My Site',
    description: 'Default description for your site',
    url: 'http://site.tridiondemo.com',
    siteName: 'Home | My Site',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Home | My Site',
    description: 'Default description for your site',
  },
  alternates: {
    canonical: '/',
  },
  other: {
    'X-UA-Compatible': 'IE=edge',
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let navigationData;
  
  try {
    navigationData = await fetchNavigationData();
  } catch (error) {
    console.error('Failed to fetch navigation data:', error);
    navigationData = { items: [] };
  }

  return (
    <html lang="en">
      <head>
       <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="stylesheet" href="/system/assets/css/main.css" />
        <link rel="stylesheet" href="/system/assets/css/bootstrap-select.min.css" />
        <Script src="/system/assets/scripts/header.js" strategy="afterInteractive" />
      </head>
      <body>
        {/* Pass data via script tag with proper encoding */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__NAVIGATION_DATA__ = ${JSON.stringify(navigationData)
              .replace(/</g, '\\u003c')};`,
          }}
        />
        {children}
        <Script src="/system/assets/scripts/main.js" strategy="afterInteractive" />
        <Script src="/system/assets/scripts/bootstrap-select.min.js" strategy="afterInteractive" />
       </body>
    </html>
  );
}