import { NextResponse } from 'next/server';

export const noCacheHeaders = {
  'Cache-Control': 'no-store, max-age=0, must-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0',
  'CDN-Cache-Control': 'no-store',
  'Vercel-CDN-Cache-Control': 'no-store',
};

export const createApiResponse = <T = any>(
  data: T,
  status: number = 200,
  options: {
    headers?: Record<string, string>;
  } = {}
) => {
  return new NextResponse(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...noCacheHeaders,
      ...(options.headers || {}),
    },
  });
};

export const createApiError = (
  message: string,
  status: number = 500,
  details?: any
) => {
  return createApiResponse(
    {
      error: message,
      ...(details ? { details } : {}),
    },
    status
  );
};
