// src/app/api/health/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://localhost:7138/api/page/health');
    if (!response.ok) throw new Error('API not healthy');
    return NextResponse.json(await response.json());
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'API connection failed' },
      { status: 500 }
    );
  }
}