import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // For now, let's bypass authentication checks to fix the loop
  return NextResponse.next()

  /* 
  // Original authentication logic - commented out to fix the loop
  const isAuthenticated = request.cookies.has("murmur_user")
  const publicPaths = ["/welcome", "/login", "/signup", "/forgot-password"]
  const isPublicPath = publicPaths.some(
    (path) => request.nextUrl.pathname === path || request.nextUrl.pathname.startsWith(`${path}/`),
  )

  if (!isAuthenticated && !isPublicPath && request.nextUrl.pathname !== "/") {
    return NextResponse.redirect(new URL("/welcome", request.url))
  }

  if (isAuthenticated && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url))
  }
  */
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icons).*)"],
}

