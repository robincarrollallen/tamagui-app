import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  const cookieLang = request.cookies.get('lang')?.value
  const acceptLang = request.headers.get('accept-language')?.split(',')[0] || 'en-US'

  console.log('Middleware cookies......', cookieLang)
  console.log('Middleware header.......', acceptLang)

  // if (!cookieLang && acceptLang) {
  //   response.cookies.set('lang', acceptLang)
  // }
  return response
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'], // 跳过静态资源
}
