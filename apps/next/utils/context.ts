/**
 * get Context value
 * in SSR mode, use Next.js API
 * in CSR mode, use browser API
 */

import Cookies from 'js-cookie'
import { isServer } from 'tamagui'
import { headers, cookies } from 'next/headers'


export const isSSR = process.env.NEXT_PUBLIC_SSR === 'true'

/** get Cookie value */
export function getCookie(name: string) {
  if (isServer) {
    try {
      const value = cookies().get(name)?.value
      return value || ''
    } catch (error) {
      console.warn('Failed to access server cookies:', error)
      return ''
    }
  } else {
    return Cookies.get(name) || ''
  }
}

/** get Header value */
export function getHeaderLanguage() {
  if (isServer) {
    try {
      const headerLang = headers().get('accept-language')?.split(',')[0]
      return headerLang || ''
    } catch (error) {
      console.warn('Failed to access server headers:', error)
      return ''
    }
  } else if (typeof navigator !== 'undefined') {
    return navigator.language || navigator.languages?.[0] || ''
  }
  return ''
}