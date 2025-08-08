// src/app/api/proxy/[[...path]]/route.ts
import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:44385';
const SKIPPED_PATHS = ['system/', '.well-known/', '_next/', 'api/'];

export async function GET(
  request: Request,
  { params }: { params: { path?: string[] } }
) {
  try {
    const { path = [] } = await Promise.resolve(params);
    const fullPath = path.join('/');

    // Skip system assets and special paths
    if (SKIPPED_PATHS.some(skipPath => fullPath.startsWith(skipPath))) {
      return new Response(null, { status: 404 });
    }

    const targetUrl = `${API_BASE_URL}/${fullPath}`;
    const response = await fetch(targetUrl);

    if (!response.ok) {
      return new Response(null, { status: response.status });
    }

    // Handle different response types
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await response.json();
      return NextResponse.json(data);
    }
    
    // For all other types (images, etc.)
    const data = await response.blob();
    return new Response(data, { headers: { 'Content-Type': contentType } });
    
  } catch (error) {
    console.error('Proxy error:', error);
    return new Response(null, { status: 404 });
  }
}