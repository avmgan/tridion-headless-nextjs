// src/app/api/proxy/[locale]/resources.json/route.ts
import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:44385';

export async function GET(
  request: Request,
  { params }: { params: { locale: string } }
) {
  try {
    // Proper async parameter handling
    const { locale } = await Promise.resolve(params);
    
    const targetUrl = `${API_BASE_URL}/api/${locale}/resources.json`;
    const response = await fetch(targetUrl, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      // Return empty resources object for 404 instead of error
      if (response.status === 404) {
        return NextResponse.json({}, { status: 200 });
      }
      throw new Error(`Failed with status ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Resources fetch error:', error);
    // Fallback to empty resources
    return NextResponse.json({}, { status: 200 });
  }
}