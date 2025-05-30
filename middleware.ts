import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export function middleware(request: NextRequest) {
const path = request.nextUrl.pathname

const isPublicPath = path === '/login' || path === '/sign-up' || path === '/'

const token = request.cookies.get('token')?.value || ''

if(isPublicPath && token && path!=='/') {
    return NextResponse.redirect(new URL('/', request.nextUrl))
}
if(isPublicPath && token && path==='/') {
    return NextResponse.redirect(new URL('/home', request.nextUrl))
}


if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
}

}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/','/social-share','/video-upload','/home','/dashboard','/background']
}