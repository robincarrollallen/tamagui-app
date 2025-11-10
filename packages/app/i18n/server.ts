import { createInstance } from 'i18next'
import { fetchDefaultLanguageFromBackend } from 'next-app/service/fetchDefaultLanguage'
import { getCookie, getHeaderLanguage } from 'next-app/utils/context'
import { initReactI18next } from 'react-i18next/initReactI18next'
import { resources } from './resources'

export const initI18nServer = async () => {
  const defaultLang = await fetchDefaultLanguageFromBackend()

  const instance = createInstance()
  const cookieLang = getCookie('lang')
  const headerLang = getHeaderLanguage()

  console.log('Server default language...', defaultLang)
  console.log('Server cookies......', cookieLang)
  console.log('Server header.......', headerLang)

  const lang = cookieLang || defaultLang || headerLang || 'en-US'

  await instance.use(initReactI18next).init({
    lng: lang,
    fallbackLng: defaultLang,
    resources: { [lang]: resources[lang], [defaultLang]: resources[defaultLang] },
    interpolation: {
      escapeValue: false,
    },
  })

  return instance
}
