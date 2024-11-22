// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from 'next/server'

// const isPublicRoute = createRouteMatcher(['/login(.*)'])


export function middleware(request: NextRequest,) {


  // valida si tienen un token valido
  const token = request.headers.get('authorization')
  console.log(token)
  if (!request.url.includes('/login') && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }


  return NextResponse.next()



}

// export default clerkMiddleware(async (auth, request) => {

//   const { sessionId } = await auth()
//   if (!isPublicRoute(request) && !sessionId) {
//     return NextResponse.redirect(new URL('/login', request.url))
//     // await auth.protect()
//   }
// })

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}