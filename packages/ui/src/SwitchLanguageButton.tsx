import { setLanguage } from 'app/i18n/client'
import { useTranslation } from 'react-i18next'
import { Button, useIsomorphicLayoutEffect } from 'tamagui'

export const SwitchLanguageButton = () => {
  const { i18n: i18next, t } = useTranslation()
  const language = i18next.language

  const changeLang = (lang: string) => {
    setLanguage(lang)
  }

  return (
    <Button onPress={() => changeLang(language === 'en-US' ? 'zh-CN' : 'en-US')}>
      Change language: {i18next.language}
        {t('greeting')}
    </Button>
  )
}
