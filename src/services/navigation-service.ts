// src/services/navigation-service.ts
// src/services/navigation-service.ts
export async function fetchNavigationData(localizationPath: string = '') {
  // Determine if we're in browser or server environment
  const isBrowser = typeof window !== 'undefined';
  
  // Construct the proper URL based on environment
  let url: string;
  if (isBrowser) {
    // Client-side: use relative path
    url = localizationPath 
      ? `/api/proxy${localizationPath}/navigation.json`
      : '/api/proxy/navigation.json';
  } else {
    // Server-side: use absolute URL to your API route handler
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    url = localizationPath
      ? `${baseUrl}/api/proxy${localizationPath}/navigation.json`
      : `${baseUrl}/api/proxy/navigation.json`;
  }

  try {
    console.log(`Fetching navigation from: ${url}`);
    const response = await fetch(url, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid navigation data format');
    }

    return data;
  } catch (error) {
    console.error('Navigation fetch error:', {
      error,
      url,
      timestamp: new Date().toISOString()
    });
    // Return empty navigation as fallback
    return { items: [] };
  }
}