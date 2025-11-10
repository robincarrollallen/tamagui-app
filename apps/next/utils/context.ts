/**
 * get Context value
 * in SSR mode, use Next.js API
 * in CSR mode, use browser API
 */

import { LANGUAGE_CODE } from 'app/enums'
import Cookies from 'js-cookie'
import { cookies, headers } from 'next/headers'

export const isSSR = process.env.NEXT_PUBLIC_SSR !== 'false'
export const isClient = typeof window !== 'undefined'

/** get Cookie value */
export function getCookie(name: string) {
  if (!isClient && isSSR) {
    try {
      const value = cookies().get(name)?.value
      return value || LANGUAGE_CODE.English
    } catch (error) {
      console.warn('Failed to access server cookies:', error)
      return LANGUAGE_CODE.English
    }
  } else {
    return Cookies.get(name) || LANGUAGE_CODE.English
  }
}

/** get Header value */
export function getHeaderLanguage() {
  if (!isClient && isSSR) {
    try {
      const headerLang = headers().get('accept-language')?.split(',')[0]
      return headerLang || LANGUAGE_CODE.English
    } catch (error) {
      console.warn('Failed to access server headers:', error)
      return LANGUAGE_CODE.English
    }
  } else if (typeof navigator !== 'undefined') {
    return navigator.language || navigator.languages?.[0] || LANGUAGE_CODE.English
  }
  return LANGUAGE_CODE.English
}