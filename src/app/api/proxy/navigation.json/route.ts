import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:44385';

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/navigation.json`);
    
    if (!response.ok) {
      throw new Error(`Failed with status ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Navigation fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch navigation' },
      { status: 500 }
    );
  }
}