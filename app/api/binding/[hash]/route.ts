import { Request } from 'next/dist/compiled/@edge-runtime/primitives';
import { fetchLongURL } from '../../../../utils/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { hash: string } }) {
  let url: string;
  try {
    url = await fetchLongURL(params.hash);
  } catch (e) {
    return new Response(e.message, { status: 500 });
  }
  console.log(`Fetched binding from DB: ${params.hash} => ${url}`);
  return NextResponse.json({ url });
}
