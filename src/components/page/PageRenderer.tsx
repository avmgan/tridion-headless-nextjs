// src/components/PageRenderer.tsx
'use client';

import { PageData } from '@/types/page-types'; // Import your PageData type
import { lazy, Suspense } from 'react';
import DefaultPage from '@/components/page/GeneralPage'; // Your fallback page component

export default function PageRenderer({ pageData }: { pageData: PageData }) {
  const viewName = pageData?.pageTemplate?.view || 'GeneralPage';

  const PageTemplate = lazy(() =>
    import(`@/components/page/${viewName}`)
      .then((module) => ({ default: module.default }))
      .catch((error) => {
        console.error(`Failed to load page template "${viewName}":`, error);
        return { default: DefaultPage };
      })
  );

  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <PageTemplate pageData={pageData} />
    </Suspense>
  );
}