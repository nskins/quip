import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const publicRoutes = ['/login', '/signup', '/']
 
export default async function middleware(req: NextRequest) {

  const path = req.nextUrl.pathname
  const isPublicRoute = publicRoutes.includes(path)

  const access_token = (await cookies()).get('access_token')?.value
  // TODO: we could try to decrypt the access token and make sure its valid.
  // There might be a way to inject the role, etc. into the UI from here.
 
  if (!isPublicRoute && !access_token) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  if (isPublicRoute && access_token) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }
 
  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.svg$).*)'],
}