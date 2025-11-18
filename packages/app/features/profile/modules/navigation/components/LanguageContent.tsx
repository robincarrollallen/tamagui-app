import { Icon } from "@my/ui"
import { SVG } from "@my/assets"
import { Selection } from '@my/ui'
import { useCallback } from "react"
import { Text, XStack, Stack } from "tamagui"
import { setLanguage } from 'app/i18n/client'
import { useTranslation } from "react-i18next"
import { getLanguageName } from "app/utils/language"
import { useRem, useLanguageStore } from "app/store"

/** 语言选择内容 */
export function LanguageContent() {
  const { i18n } = useTranslation()
  const supportedLanguages = useLanguageStore(state => state.supportedLanguages)
  const languageName = getLanguageName(i18n.language)
  const flag = i18n.language.split('-')[1]
  const rem = useRem()

  /** 选择回调事件 */
  const onChange = useCallback((value: string) => {
    setLanguage(value)
  }, [])

  return (
    <Selection value={i18n.language} items={supportedLanguages} onChange={onChange}>
      <XStack items="center" gap={rem(8)}>
        <Stack style={{ borderRadius: '50%', overflow: "hidden" }}>
          <Icon uri={SVG[flag]} width={rem(20)} height={rem(20)} />
        </Stack>
        <Text fontSize={rem(12)} fontWeight="bold">{languageName}</Text>
      </XStack>
    </Selection>
  )
}