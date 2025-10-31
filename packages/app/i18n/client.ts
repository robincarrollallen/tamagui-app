'use client'

import i18n from 'i18next'
import Cookies from 'js-cookie'
import * as RNLocalize from 'react-native-localize'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchDefaultLanguageFromBackend } from 'next-app/service/fetchDefaultLanguage'
import { initReactI18next } from 'react-i18next'
import { usePlatformStore } from 'app/store'
import { isWeb, isServer } from 'tamagui'
import { changeLanguage } from 'i18next'
import { resources } from './resources'

export const initI18nClient = async () => {
  if (!i18n.isInitialized) {
    let lang: string | undefined = ''

    const storageLang = await getStorageLang()

    if (storageLang) {
      lang = storageLang
    }else {
      const defaultLang = await fetchDefaultLanguageFromBackend()

      if (defaultLang) {
        lang = defaultLang
      } else {
        lang = getLocalLang()
      }
    }

    i18n.use(initReactI18next).init({
      resources,
      lng: lang,
      fallbackLng: 'en-US',
      interpolation: {
        escapeValue: false,
      },
    })
  }
}

export const setLanguage = (language: string) => {
  changeLanguage(language)
  AsyncStorage.setItem('lang', language)
  if (isWeb && !isServer) {
    document.cookie = `lang=${language}; path=/; max-age=${60 * 60 * 24 * 30}`
  }
}

/** 获取本地设备语言 */
const getLocalLang = () => {
  const isNative = usePlatformStore.getState().isNative
  if (isNative) {
    return getLanguageCode(RNLocalize.getLocales()[0].languageTag, RNLocalize.getLocales()[0].languageCode)
  }
}

/** 获取本地存储的语言 */
const getStorageLang = async () => {
  const isNative = usePlatformStore.getState().isNative
  if (isNative) {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);

    return await AsyncStorage.getItem('lang')
  }
  return Cookies.get('lang')
}

/** 语言映射 */
const languageMap: Record<string, string> = {
  'zh': 'zh-CN',      // 中文 -> 简体中文
  'zh-hans': 'zh-CN', // 简体中文 -> zh-CN
  'zh-hant': 'zh-TW', // 繁体中文 -> zh-TW
  'en': 'en-US',      // 英文 -> 美式英文
}

/** 获取语言代码 */
const getLanguageCode = (languageTag: string, languageCode: string) => {
  const langTag= languageTag.split('-').slice(0, 2).join('-').toLowerCase()

  return languageMap[langTag] || languageMap[languageCode]
}

export default i18n
