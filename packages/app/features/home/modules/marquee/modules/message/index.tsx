import { ICONS } from '@my/assets'
import { MarqueeComponent } from '@my/ui'
import { XStack, Image, useTheme } from 'tamagui'
import { useRem, useTenantStore } from 'app/store';

export function MarqueeMessage() {
  const marqueeList= useTenantStore(state => state.marqueeList)
  const theme = useTheme()
  const rem = useRem()
  
  return (
    <XStack
      flex={1}
      p={rem(8)}
      gap={rem(8)}
      height="100%"
      borderWidth={rem(1)}
      bg="$surfaceRaisedL2"
      borderColor="$borderDefault"
      style={{ borderRadius: rem(6) }}
    >
      <Image width={rem(20)} aspectRatio={1} source={ICONS.broadcast_25} />
      <MarqueeComponent color={theme?.textSuccess?.get()} flex={1} messages={marqueeList} />
    </XStack>
  )
}