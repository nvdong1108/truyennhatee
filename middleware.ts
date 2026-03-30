import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/hoan-thanh') {
    const url = request.nextUrl.clone();
    url.pathname = '/hatdaukhaai/hoan-thanh.html';
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/hoan-thanh'],
};
