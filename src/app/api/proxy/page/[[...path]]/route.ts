// src/app/api/proxy/page/[[...path]]/route.ts
import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    context: { params: Promise<{ path?: string[] }> }
) {
    const baseUrl = process.env.API_BASE_URL;
    if (!baseUrl) {
        return NextResponse.json(
            { error: 'API_BASE_URL not configured' },
            { status: 500 }
        );
    }

    // Await the params object from the Promise
    const params = await context.params;
    const pathSegments = params?.path;

    // Handle index route
    if (!pathSegments || pathSegments.length === 0) {
        return NextResponse.json(
            { error: 'Path parameter required' },
            { status: 400 }
        );
    }

    const path = pathSegments.join('/');
    const apiUrl = `${baseUrl}/api/page/${path}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            return NextResponse.json(
                { error: 'Backend API error' },
                { status: response.status }
            );
        }
        return NextResponse.json(await response.json());
    } catch (error) {
        console.error('Proxy error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}