import { XStack } from 'tamagui'
import { useRem } from 'app/store'
import { MarqueeSearch } from './modules/search'
import { MarqueeMessage } from './modules/message'

export function Marquee() {
  const rem = useRem()
  
  return (
    <XStack gap={rem(10)} p={rem(12)}>
      <MarqueeMessage/>
      <MarqueeSearch/>
    </XStack>
  )
}
