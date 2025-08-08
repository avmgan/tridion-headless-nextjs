// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7138';
  
  // Skip middleware for certain paths
  if (!request.nextUrl.pathname.endsWith('.html')) {
    return NextResponse.next();
  }

  try {
    // First try to get the original page
    const apiUrl = new URL(`/api/page${request.nextUrl.pathname}`, baseUrl);
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'Cookie': request.headers.get('Cookie') || '',
      }
    });

    // Check for empty or invalid responses
    const contentLength = response.headers.get('content-length');
    if (contentLength === '0' || response.status === 204 || !response.ok) {
      // Try to get the error page from backend first
      const errorPageResponse = await fetch(new URL('/api/page/error-404.html', baseUrl), {
        headers: {
          'Accept': 'application/json',
          'Cookie': request.headers.get('Cookie') || '',
        }
      });

      if (errorPageResponse.ok) {
        const errorPageData = await errorPageResponse.json();
        if (errorPageData && Object.keys(errorPageData).length > 0) {
          // Return the backend error page
          return NextResponse.json(errorPageData, {
            status: 404,
            headers: {
              'Cache-Control': 'no-store, max-age=0'
            }
          });
        }
      }
      
      // Fallback to static error page if backend error page fails
      return NextResponse.rewrite(
        new URL('/error-404', request.url),
        { status: 404 }
      );
    }

    // Return original page if found
    const data = await response.json();
    if (!data || Object.keys(data).length === 0) {
      throw new Error('Empty response data');
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error('Middleware error:', error);
    
    // Final fallback to static error page
    return NextResponse.rewrite(
      new URL('/error-404', request.url),
      { status: 500 }
    );
  }
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico|media/|error-404).*)',
};