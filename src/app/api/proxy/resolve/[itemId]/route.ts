// src/app/api/proxy/resolve/[itemId]/route.ts
import { NextRequest, NextResponse } from 'next/server';

const baseUrl = process.env.API_BASE_URL || 'http://localhost:44385';

export async function GET(
  request: NextRequest,
  { params }: { params: { itemId: string } }
) {
  try {
    // Explicitly await params resolution
    const resolvedParams = await Promise.resolve(params);
    const itemId = resolvedParams.itemId;
    
    if (!itemId) {
      return NextResponse.json(
        { error: 'Item ID is required' },
        { status: 400 }
      );
    }

    // Construct API URL
    const apiUrl = new URL(`${baseUrl}/api/resolve/${itemId}`);
    
    // Forward all query parameters
    request.nextUrl.searchParams.forEach((value, key) => {
      apiUrl.searchParams.append(key, value);
    });

    console.log('Proxying to:', apiUrl.toString());
    
    const response = await fetch(apiUrl.toString(), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Backend error:', errorText);
      throw new Error(`Backend responded with ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}