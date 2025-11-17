import { JSX } from "react"
import { SVG } from "@my/assets"
import { useRem } from "app/store"
import { Icon, Navigation } from "@my/ui"
import { useTranslation } from "react-i18next"
import { useTheme, YStack, Text, XStack } from "tamagui"
import { getLanguageName } from "app/utils/language"

export function NavigationWrapper() {
  const rem = useRem()
  const theme = useTheme()

  const items: Array<{ title: string, icon: string, iconSize: number, content?: JSX.Element }> = [
    { title: "Report", icon: SVG.report, iconSize: rem(24) },
    { title: "Invite", icon: SVG.invite, iconSize: rem(24) },
    { title: "Redeem", icon: SVG.redeem, iconSize: rem(24) },
    { title: "Security Center", icon: SVG.security, iconSize: rem(24) },
    { title: "Language", icon: SVG.language, iconSize: rem(24), content: <LanguageContent /> },
    { title: "Logout", icon: SVG.logout, iconSize: rem(24) },
  ]

  return (
    <YStack gap={rem(12)} p={rem(12)}>
      <Navigation title="Support" icon={SVG.support} iconSize={rem(24)} iconColor={theme.textSuccess?.get()} />
      <YStack bg="$surfaceRaisedL1" borderTopLeftRadius={rem(6)} borderTopRightRadius={rem(6)} borderBottomLeftRadius={rem(6)} borderBottomRightRadius={rem(6)}>
        {items.map((item) => (
          <Navigation key={item.title} title={item.title} icon={item.icon} iconSize={item.iconSize} content={item.content} />
        ))}
      </YStack>
    </YStack>
  )
}

function LanguageContent() {
  const { i18n } = useTranslation()
  const flag = i18n.language.split('-')[1]
  const rem = useRem()
  const languageName = getLanguageName(i18n.language, i18n.language)

  return (
    <XStack items="center" gap={rem(8)}>
      <Icon uri={SVG[flag]} width={rem(20)} height={rem(20)} style={{ borderRadius: '50%' }} />
      <Text fontSize={rem(12)} fontWeight="bold">{languageName}</Text>
    </XStack>
  )
}