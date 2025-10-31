import { XStack, Text, XStackProps, View, Image, YStack } from "tamagui"
import { useState, useRef, useEffect } from "react"
import { AnimatedNumber } from "@my/ui"
import { useRem } from "app/store"
import { ICONS } from "@my/assets"

export function Bonus(props: XStackProps) {
  const [targetCount, setTargetCount] = useState(0)
  const amountInterval = useRef<NodeJS.Timeout>(null)
  const rem = useRem()

  useEffect(() => {
    amountInterval.current = setInterval(() => {
      setTargetCount(parseInt(Date.now().toString().slice(-9)) / 100)
    }, 3000)

    return () => {
      if (amountInterval.current) {
        clearInterval(amountInterval.current)
        amountInterval.current = null
      }
    }
  }, [])

  return (
    <YStack p={rem(12)} position="relative" {...props}>
      <View height={rem(2)} bg="#FF8743" position="absolute" t={0} l={rem(12)} r={rem(12)} boxShadow="0 2.51px 2.54px rgba(255,162,0,.196),0 6.34px 6.43px rgba(255,162,0,.28),0 12.94px 13.11px rgba(255,162,0,.35),0 26.65px 27.01px rgba(255,162,0,.435),0 73px 74px rgba(255,162,0,.63)" />
      <XStack gap={rem(6)}>
        <Image source={ICONS.bonus_jackpot_25} width={rem(88)} height={rem(88)} />
        <YStack flex={1} justify="center">
          <Text color="$textWeak" fontSize={rem(14)}>Jackpot</Text>
          <AnimatedNumber value={targetCount} decimal={2} fontSize={rem(38)} fontWeight="600" lineHeight={rem(58)} color="$textBrandPrimary" />
        </YStack>
      </XStack>
    </YStack>
  )
}