import { Svg } from "@my/ui"
import { useStatusStore, useRem } from "app/store"
import { LinearGradient } from "tamagui/linear-gradient"
import { XStack, Text, Square, XStackProps } from "tamagui"

export function Sign(props: XStackProps) {
  const rem = useRem()
  const { showLoginPopup, showRegisterPopup } = useStatusStore()

  return (
    <XStack pl={rem(38)} pr={rem(18)} mt={rem(12)} mb={rem(24)} position='relative' {...props}>
      <XStack flex={1} items='center' justify='space-between' height={rem(60)}>
        <Svg.SkewBorder position='absolute' z={-1}/>
        <XStack gap={rem(12)} items='center' m={-rem(16)}>
          <Square overflow="hidden" style={{ borderRadius: rem(16) }}>
            <LinearGradient
              start={[0, 0]}
              end={[1, 1]}
              p={rem(9)}
              colors={['$gradientsPrimaryA', '$gradientsPrimaryB']}
            >
              <Svg.UserIcon size={rem(18)} style={{ zIndex: 1 }}/>
            </LinearGradient>
          </Square>
          <Text fontSize={rem(16)}>Welcome</Text>
        </XStack>
        <XStack gap={4} pr={rem(12)}>
          <Svg.SkewButton height={rem(30)} minW={rem(74)} onPress={showLoginPopup}>
            <Text fontSize={rem(12)}>Login</Text>
          </Svg.SkewButton>
          <Svg.SkewButton
            minW={rem(74)}
            height={rem(30)}
            primaryColor="$inverse600"
            secondaryColor="$inverse500"
            strokeColor="$btnBorderLevel3"
            onPress={showRegisterPopup}
          >
            <Text fontSize={rem(12)}>Register</Text>
          </Svg.SkewButton>
        </XStack>
      </XStack>
    </XStack>
  )
}