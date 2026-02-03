
import { NextResponse } from 'next/server';

const API_BASE = 'https://openapi.ai-studio.me';

async function handleProxy(request, { params }) {
    const path = params.path.join('/');
    const url = `${API_BASE}/api/${path}${request.nextUrl.search}`;

    console.log(`[Proxy] Forwarding to: ${url}`);

    try {
        const headers = new Headers(request.headers);
        headers.delete('host'); // Avoid host mismatch issues

        // Ensure we don't pass implementation-specific headers unless needed
        // But we MUST pass Authorization

        const body = request.method !== 'GET' && request.method !== 'HEAD'
            ? await request.blob()
            : null;

        const response = await fetch(url, {
            method: request.method,
            headers: headers,
            body: body,
            duplex: 'half' // Required for streaming or some fetch implementations in node
        });

        const data = await response.blob();

        return new NextResponse(data, {
            status: response.status,
            headers: response.headers
        });
    } catch (error) {
        console.error('[Proxy Error]', error);
        return NextResponse.json({ error: 'Proxy failed', details: error.message }, { status: 500 });
    }
}

export const GET = handleProxy;
export const POST = handleProxy;
export const PUT = handleProxy;
export const DELETE = handleProxy;
