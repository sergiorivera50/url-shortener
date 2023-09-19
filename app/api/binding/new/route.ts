import { createURLBinding } from '../../../../utils/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const longURL: string = body['url'];
  const shortURL: string = await createURLBinding(longURL);
  console.log(`New URL binding created: ${shortURL} => ${longURL}`);
  return NextResponse.json({ binding: { longURL, shortURL } }, { status: 201 });
}
