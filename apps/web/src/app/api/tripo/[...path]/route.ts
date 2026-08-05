import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, { params }: { params: { path: string[] } }) {
  return handleTripoRequest(req, params);
}

export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
  return handleTripoRequest(req, params);
}

async function handleTripoRequest(req: NextRequest, params: { path: string[] }) {
  try {
    const apiPath = params.path.join('/');
    const targetUrl = `https://api.tripo3d.ai/v2/openapi/${apiPath}`;
    
    // Extract Authorization header
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ code: 10001, message: 'Authentication failed (missing token)' }, { status: 401 });
    }

    // Prepare headers for the outgoing request
    const headers = new Headers();
    headers.set('Authorization', authHeader);
    
    const contentType = req.headers.get('content-type');
    let body: any = null;

    if (req.method !== 'GET') {
      if (contentType?.includes('multipart/form-data')) {
        // Just forward the formData as is
        body = await req.formData();
      } else if (contentType?.includes('application/json')) {
        headers.set('Content-Type', 'application/json');
        body = await req.text(); // raw string to avoid parsing overhead
      }
    }

    const response = await fetch(targetUrl, {
      method: req.method,
      headers,
      body: req.method === 'GET' ? undefined : body,
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error('Tripo API Proxy Error:', error);
    return NextResponse.json({ code: 500, message: error.message }, { status: 500 });
  }
}
