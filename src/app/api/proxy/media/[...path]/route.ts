import { NextRequest, NextResponse } from 'next/server';
import http from 'http';
import https from 'https';
import { PassThrough } from 'stream';

const baseUrl = process.env.API_BASE_URL || 'https://localhost:7138';

export async function GET(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;

  const targetPath = path.join('/');
  const languageParts = targetPath.split('/');
  let basePath = '/media/';

  if (
    languageParts.length > 1 &&
    /^[a-z]{2}-[a-z]{2}$/i.test(languageParts[0])
  ) {
    basePath = `/${languageParts[0]}/media/`;
  }

  const targetUrl = `${baseUrl}${basePath}${targetPath}`;
  console.log('Proxying to:', targetUrl);

  // Decide protocol dynamically
  const isHttps = targetUrl.startsWith('https:');
  const agent = isHttps
    ? new https.Agent({ rejectUnauthorized: process.env.NODE_ENV !== 'development' })
    : undefined;
  const client = isHttps ? https : http;

  const response = await new Promise<Response>((resolve, reject) => {
    client.get(targetUrl, { agent }, (res) => {
      const headers = new Headers();
      const allowedHeaders = ['content-type', 'content-length', 'cache-control'];

      for (const [key, value] of Object.entries(res.headers)) {
        if (value && allowedHeaders.includes(key.toLowerCase())) {
          headers.set(key, Array.isArray(value) ? value.join(', ') : value.toString());
        }
      }

      const stream = new PassThrough();
      res.pipe(stream);

      resolve(
        new NextResponse(stream as any, {
          status: res.statusCode || 200,
          headers: Object.fromEntries(headers.entries()),
        })
      );
    }).on('error', (err) => {
      console.error('Proxy failed:', err.message);
      reject(err);
    });
  });

  return response;
}
