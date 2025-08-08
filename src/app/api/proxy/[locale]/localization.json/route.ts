import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:44385';

export async function GET(
  request: Request,
  { params }: { params: { locale: string } }
) {
  try {
    // Explicitly await params resolution
    const { locale } = await Promise.resolve(params);
    
    // Debugging logs
    console.log('Proxying localization request for locale:', locale);
    console.log('Full API URL:', `${API_BASE_URL}/api/${locale}/localization.json`);

    const response = await fetch(`${API_BASE_URL}/api/${locale}/localization.json`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Backend responded with:', response.status, errorText);
      return NextResponse.json([], { status: 200 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json([], { status: 200 });
  }
}