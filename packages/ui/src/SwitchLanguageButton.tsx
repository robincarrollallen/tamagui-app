import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, useIsomorphicLayoutEffect } from 'tamagui'

export const SwitchLanguageButton = () => {
  const { i18n: i18next, t } = useTranslation()

  const [clientLanguage, setClientLanguage] = useState<string | undefined>(i18next.language || 'en-US')

  const changeLang = async (lang: string) => {
    await i18next.changeLanguage(lang)
    document.cookie = `lang=${lang}; path=/; max-age=${60 * 60 * 24 * 30}`
    setClientLanguage(lang)
    // window.location.reload()
  }

  return (
    <Button onPress={() => changeLang(clientLanguage === 'en-US' ? 'zh-CN' : 'en-US')}>
      Change language: {clientLanguage}
          {t('greeting')}
    </Button>
  )
}
