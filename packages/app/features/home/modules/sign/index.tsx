import { Svg } from "@my/ui"
import { XStack, Text, YStack, Square } from "tamagui"
import { LinearGradient } from "tamagui/linear-gradient"
import { useResponsiveSize } from "app/hooks/ResponsiveSize"


export function Sign() {
  const { rem } = useResponsiveSize()

  return (
    <YStack pl={rem(38)} pr={rem(18)} position='relative' flexDirection='row' justify='flex-start'>
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
          <Svg.SkewButton height={rem(30)} minW={rem(74)}>
            <Text fontSize={rem(12)}>Login</Text>
          </Svg.SkewButton>
          <Svg.SkewButton height={rem(30)} minW={rem(74)} primaryColor="$inverse600" secondaryColor="$inverse500" strokeColor="$btnBorderLevel3">
            <Text fontSize={rem(12)}>Register</Text>
          </Svg.SkewButton>
        </XStack>
      </XStack>
    </YStack>
  )
}