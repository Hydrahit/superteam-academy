
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Strict Routing: Prevent infinite loops
  if (pathname === '/') return NextResponse.next();
  
  // If user is hitting dashboard without being logged in, we let the app handle it
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
