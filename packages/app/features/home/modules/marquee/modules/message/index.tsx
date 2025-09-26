import { ICONS } from '@my/assets'
import { XStack, Image } from 'tamagui'
import { MarqueeComponent } from '@my/ui'
import { useTenantStore } from 'app/store';
import { useResponsiveSize } from 'app/hooks/ResponsiveSize';

export function MarqueeMessage() {
  const { rem } = useResponsiveSize()
  const { marqueeList } = useTenantStore()

  return (
    <XStack gap={rem(8)} flex={1} height="100%" p={rem(8)} bg="$surfaceRaisedL2" borderWidth={rem(1)} borderColor="$borderDefault" style={{ borderRadius: rem(6) }}>
      <Image width={rem(20)} aspectRatio={1} source={ICONS.broadcast_25} />
      <MarqueeComponent color="$textSuccess" flex={1} messages={marqueeList} />
    </XStack>
  )
}