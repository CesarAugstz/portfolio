import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { NextRequest, NextResponse } from 'next/server'

const locales = ['en-US', 'pt-BR']
const defaultLocale = 'en-US'

function getLocale(request: NextRequest): string {
  // Get the preferred locale from the request headers
  const headers = {
    'accept-language':
      request.headers.get('accept-language') || 'en-US,en;q=0.5',
  }
  const languages = new Negotiator({ headers }).languages()

  return match(languages, locales, defaultLocale)
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl

  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|_vercel|.*\\..*).*)',
  ],
}