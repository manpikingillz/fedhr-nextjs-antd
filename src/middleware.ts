// Middleware allows you to run code before a request is completed.
// Then, based on the incoming request, you can modify the response by rewriting, redirecting,
// modifying the request or response headers, or responding directly.

import { NextResponse } from 'next/server'
import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
)

export const config = { matcher: ["/hr/:path*"] }
