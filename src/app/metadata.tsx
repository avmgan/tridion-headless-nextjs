// app/metadata.tsx
'use client';

import { usePathname } from 'next/navigation';
import Head from 'next/head';

export default function DynamicMetadata({ pageData }: { pageData?: any }) {
  const pathname = usePathname();
  
  return (
    <Head>
      {/* Dynamic meta tags */}
      <meta name="sitemapKeyword" content={pageData?.pageCustomMetadata?.sitemapKeyword || ''} />
      <meta name="description" content={pageData?.description || ''} />
      
      {/* OpenGraph */}
      <meta property="og:title" content={pageData?.title || ''} />
      <meta property="og:description" content={pageData?.description || ''} />
      <meta property="og:url" content={`https://yoursite.com${pathname}`} />
      
      {/* Twitter */}
      <meta name="twitter:title" content={pageData?.title || ''} />
      <meta name="twitter:description" content={pageData?.description || ''} />
    </Head>
  );
}