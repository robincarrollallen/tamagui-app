import { Square } from 'tamagui'
import { Search } from '@tamagui/lucide-icons'
import { useResponsiveSize } from 'app/hooks/ResponsiveSize'

export function MarqueeSearch() {
  const { rem } = useResponsiveSize()

  return (
    <Square size={rem(38)} bg="$surfaceRaisedL2" borderWidth={rem(1)} borderColor="$borderDefault" style={{ borderRadius: rem(6) }}>
      <Search size={rem(20)} color="$iconBrandPrimary" />
    </Square>
  )
}