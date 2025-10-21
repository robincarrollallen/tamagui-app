import { useState } from 'react'
import { useAppStore } from 'app/store'
import { useTranslation } from 'react-i18next'
import { Button, useIsomorphicLayoutEffect } from 'tamagui'

export const SwitchLanguageButton = () => {
  const setLanguage = useAppStore.getState().setLanguage
  const { i18n: i18next, t } = useTranslation()
  const language = useAppStore((state) => state.language)

  const changeLang = (lang: string) => {
    console.log('changeLang >>>>>>>>>>', lang)
    setLanguage(lang)
  }

  return (
    <Button onPress={() => changeLang(language === 'en-US' ? 'zh-CN' : 'en-US')}>
      Change language: {i18next.language}
          {t('greeting')}
    </Button>
  )
}
