import { createInstance } from 'i18next'
import { fetchDefaultLanguageFromBackend } from 'next-app/service/fetchDefaultLanguage'
import { initReactI18next } from 'react-i18next/initReactI18next'
import { headers, cookies } from 'next/headers'
import { resources } from './resources'

export const initI18nServer = async () => {
  const defaultLang = await fetchDefaultLanguageFromBackend()

  const instance = createInstance()
  const cookieLang = cookies().get('lang')?.value
  const headerLang = headers().get('accept-language')?.split(',')[0]

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
