// app/api/navigation/route.ts
import { NextResponse } from 'next/server';
import { fetchNavigationData } from '@/services/navigation-service';

export async function GET() {
  try {
    const data = await fetchNavigationData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch navigation data' },
      { status: 500 }
    );
  }
}