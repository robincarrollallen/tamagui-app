'use client'

import i18n from 'i18next'
import Cookies from 'js-cookie'
import { fetchDefaultLanguageFromBackend } from 'next-app/service/fetchDefaultLanguage'
import { resources } from './resources'
import { initReactI18next } from 'react-i18next'

export const initI18nClient = async () => {
  const defaultLang = await fetchDefaultLanguageFromBackend()

  if (!i18n.isInitialized) {
    const lang = Cookies.get('lang') || defaultLang || navigator.language || 'en-US'

    i18n.use(initReactI18next).init({
      resources,
      lng: lang,
      fallbackLng: defaultLang,
      interpolation: {
        escapeValue: false,
      },
    })
  }
}

export default i18n
