import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({ 
    message: 'Test route with ID',
    id: params.id 
  });
}
