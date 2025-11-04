
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const pathname = req.nextUrl.pathname

    // If user is authenticated and tries to access auth pages, redirect to appropriate dashboard
    if (token && pathname.startsWith('/auth')) {
      const userType = token.userType as string
      const dashboardUrl = userType ? `/dashboard/${userType}` : '/dashboard/student'
      return NextResponse.redirect(new URL(dashboardUrl, req.url))
    }

    // Redirect authenticated users from root to their dashboard
    if (token && pathname === '/') {
      const userType = token.userType as string
      const dashboardUrl = userType ? `/dashboard/${userType}` : '/dashboard/student'
      return NextResponse.redirect(new URL(dashboardUrl, req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname

        // Allow access to public routes (home, auth pages)
        if (pathname === '/' || pathname.startsWith('/auth')) {
          return true
        }
        
        // Require authentication for protected routes
        if (pathname.startsWith('/dashboard') || pathname.startsWith('/activity')) {
          if (!token) {
            return false
          }
          
          // Check if user is accessing the correct dashboard
          const userType = token.userType as string
          if (pathname.startsWith('/dashboard') && userType) {
            const expectedPath = `/dashboard/${userType}`
            if (!pathname.startsWith(expectedPath)) {
              return false
            }
          }
          
          return true
        }
        
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/activity/:path*',
    '/auth/:path*'
  ]
}
