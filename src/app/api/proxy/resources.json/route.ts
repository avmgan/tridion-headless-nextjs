// src/app/api/proxy/resources.json/route.ts
import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:44385';

export async function GET(request: Request) {
  try {
    const targetUrl = `${API_BASE_URL}/api/resources.json`;
    const response = await fetch(targetUrl);

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch default resources' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching default resources:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}