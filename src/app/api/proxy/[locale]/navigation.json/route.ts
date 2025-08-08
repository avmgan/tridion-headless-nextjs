// src/app/api/proxy/[locale]/navigation.json/route.ts
import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:44385';

export async function GET(
  request: Request,
  { params }: { params: { locale: string } }
) {
  try {
    // Proper async parameter handling
    const { locale } = await Promise.resolve(params);
    
    const targetUrl = `${API_BASE_URL}/api/${locale}/navigation.json`;
    const response = await fetch(targetUrl, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      // Return empty navigation instead of error
      return NextResponse.json({ items: [] }, { status: 200 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Navigation fetch error:', error);
    // Fallback to empty navigation
    return NextResponse.json({ items: [] }, { status: 200 });
  }
}