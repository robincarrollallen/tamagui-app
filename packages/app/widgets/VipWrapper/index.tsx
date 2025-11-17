import { useTheme, YStack, Text, XStack } from "tamagui"
import { LinearGradient } from "tamagui/linear-gradient"
import { ImageBackground } from "expo-image"
import { useVipStore } from "app/store"
import { ProgressBar } from "@my/ui"
import { IMAGES } from "@my/assets"
import { useRem } from "app/store"
import { VipTag } from "@my/ui"

export function VipWrapper() {
  const rem = useRem()
  const theme = useTheme()
  const vipInfo = useVipStore(state => state.vipInfo)

  return (
    <YStack pt={rem(12)}>
      <ImageBackground source={IMAGES.bg_card_level_1} contentPosition="top" contentFit="fill" style={{ paddingTop: rem(16), paddingBottom: rem(14), paddingInline: rem(12) }}>
        <VipTag level={vipInfo.currentVipLevel?.level ?? 0} size={rem(36)} fontSize={rem(12)} />
        <XStack pt={rem(16)} pb={rem(12)} px={rem(4)} items="center" justify="space-between">
          <YStack flex={1} pr={rem(8)}>
            <ProgressBar value={rem(50)} size={rem(4)} indicatorColor={theme.$iconBrandPrimary?.get()} backgroundColor="#ffffff33" />
          </YStack>
          <VipTag level={(vipInfo.currentVipLevel?.level ?? 0) + 1} />
        </XStack>
        <YStack gap={rem(8)} px={rem(4)}>
          <Text fontSize={rem(12)} color="$textHighlightWhiteWeaker" fontWeight="bold">Promotion Criteria</Text>
          <XStack gap={rem(6)}>
            <Text fontSize={rem(10)} color="$textHighlightWhiteWeaker">{`‧  Deposit Required:`}</Text>
            <Text fontSize={rem(10)} color="$textWarning">0.00</Text>
            <Text fontSize={rem(10)} color="$textHighlightWhite">{`(0.00 / 1.00)`}</Text>
          </XStack>
          <XStack gap={rem(6)}>
            <Text fontSize={rem(10)} color="$textHighlightWhiteWeaker">{`‧  Required Bet:`}</Text>
            <Text fontSize={rem(10)} color="$textWarning">0.00</Text>
            <Text fontSize={rem(10)} color="$textHighlightWhite">{`(0.00 / 1.00)`}</Text>
          </XStack>
        </YStack>
    </ImageBackground>
    <YStack position="absolute" t={0} r={0} width="32%" aspectRatio={57/23} >
      <LinearGradient
        bg="#1E1E1C"
        width="100%"
        height="100%"
        start={[.5, 0]}
        items="center"
        justify="center"
        end={[.5, 1]}
        borderTopLeftRadius={rem(390)}
        borderTopRightRadius={rem(390)}
        borderBottomLeftRadius={rem(390)}
        borderBottomRightRadius={rem(390)}
        colors={['#000', 'rgba(252, 209, 126, 0.05)']}
      >
        <Text fontSize={rem(12)}>VIP Details</Text>
      </LinearGradient>
    </YStack>
    </YStack>
  )
}