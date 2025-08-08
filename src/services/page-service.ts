// src/services/page-service.ts
export async function fetchPageData(path: string) {
  // Skip special paths that shouldn't be handled by CMS
  if (shouldSkipPath(path)) {
    console.debug('Skipping path:', path);
    throw new Error('PATH_SKIPPED');
  }

  // Normalize path for API requests - now just cleans the path without adding extensions
  const normalizedPath = normalizePath(path);
  const isServer = typeof window === 'undefined';
  const targetUrl = isServer 
    ? `${process.env.API_BASE_URL}/api/page${normalizedPath}`
    : `/api/proxy/page${normalizedPath}`;

  console.debug('Fetching page data:', { path, normalizedPath, targetUrl });

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(targetUrl, {
      cache: 'no-store',
      headers: { 
        'Content-Type': 'application/json',
        'X-Requested-Path': path // Helps with debugging
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'No error details');
      console.error('Page fetch failed:', {
        status: response.status,
        path,
        normalizedPath,
        error: errorText
      });

      if (response.status === 404) {
        throw new Error('PAGE_NOT_FOUND');
      }
      throw new Error(`HTTP_${response.status}`);
    }

    const data = await response.json();
    const validatedData = validatePageData(data);
    
    console.debug('Successfully fetched page data:', {
      path,
      itemId: validatedData.itemId || 'unknown'
    });
    
    return validatedData;
  } catch (error) {
    console.error('Page fetch error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      path,
      normalizedPath,
      targetUrl,
      stack: error instanceof Error ? error.stack : undefined
    });

    // Special handling for AbortError
    if (error.name === 'AbortError') {
      throw new Error('REQUEST_TIMEOUT');
    }

    throw error;
  }
}

// Enhanced helper functions
function shouldSkipPath(path: string): boolean {
  const skippedPaths = [
    '/.well-known/',
    '/system/',
    '/_next/',
    '/api/',
    '/404',
    '/error-404',
    '/media/'
  ];
  
  // Skip paths that start with any of the skipped prefixes
  return skippedPaths.some(skipPath => path.startsWith(skipPath));
}

function normalizePath(path: string): string {
  // Handle root path
  if (path === '/' || path === '/index') return '';
  
  // Remove trailing slash if present
  const cleanPath = path.replace(/\/$/, '');
  
  return cleanPath;
}

function validatePageData(data: unknown) {
  if (!data || typeof data !== 'object') {
    throw new Error('INVALID_PAGE_DATA');
  }
  
  // Additional validation if needed
  if (!('itemId' in data) || typeof (data as any).itemId !== 'string') {
    console.warn('Page data missing itemId:', data);
  }
  
  return data;
}