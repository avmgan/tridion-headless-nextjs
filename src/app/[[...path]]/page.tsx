// src/app/[[...path]]/page.tsx
import { fetchPageData } from '@/services/page-service';
import ErrorDisplay from '@/components/ui/ErrorDisplay';
import PageRenderer from '@/components/page/PageRenderer';
import { notFound } from 'next/navigation';

export default async function DynamicPage({
  params
}: {
  params: { path?: string[] }
}) {
  try {
    // Proper async parameter handling
    const resolvedParams = await Promise.resolve(params);
    const pathSegments = resolvedParams?.path || [];
    const fullPath = pathSegments.length > 0
      ? `/${pathSegments.join('/')}`
      : '/';

    // Skip special paths
    if (shouldSkipPath(fullPath)) {
      notFound();
    }

    const pageData = await fetchPageData(fullPath);
    return <PageRenderer pageData={pageData} />;

  } catch (error) {
    return handlePageError(error);
  }
}

// Helper function to determine which paths to skip
function shouldSkipPath(path: string): boolean {
  const skippedPaths = [
    '/.well-known/',
    '/system/assets/',
    '/_next/',
    '/api/',
    '.map',
    '.json'
  ];
  return skippedPaths.some(skipPath => path.includes(skipPath));
}

// Centralized error handling
function handlePageError(error: unknown): React.ReactElement {
  if (error instanceof Error) {
    console.error('Page rendering error:', error.message);
    
    if (error.message === 'PAGE_NOT_FOUND') {
      notFound();
    }

    return (
      <ErrorDisplay
        message="Failed to load page"
        details={process.env.NODE_ENV === 'development' ? error.message : undefined}
      />
    );
  }

  return <ErrorDisplay message="An unexpected error occurred" />;
}