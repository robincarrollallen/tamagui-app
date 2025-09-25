import { XStack } from 'tamagui'
import { MarqueeSearch } from './modules/search'
import { MarqueeMessage } from './modules/message'
import { useResponsiveSize } from 'app/hooks/ResponsiveSize'

export function Marquee() {
  const { rem } = useResponsiveSize()

  return (
    <XStack gap={rem(10)} p={rem(12)}>
      <MarqueeMessage/>
      <MarqueeSearch/>
    </XStack>
  )
}
