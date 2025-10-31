import { ICONS } from '@my/assets'
import { XStack, Image } from 'tamagui'
import { MarqueeComponent } from '@my/ui'
import { useRem, useTenantStore } from 'app/store';

export function MarqueeMessage() {
  const marqueeList= useTenantStore(state => state.marqueeList)
  const rem = useRem()
  
  return (
    <XStack gap={rem(8)} flex={1} height="100%" p={rem(8)} bg="$surfaceRaisedL2" borderWidth={rem(1)} borderColor="$borderDefault" style={{ borderRadius: rem(6) }}>
      <Image width={rem(20)} aspectRatio={1} source={ICONS.broadcast_25} />
      <MarqueeComponent color="$textSuccess" flex={1} messages={marqueeList} />
    </XStack>
  )
}