import { Square } from 'tamagui'
import { useRem } from 'app/store'
import { Search } from '@tamagui/lucide-icons'

export function MarqueeSearch() {
  const rem = useRem()

  return (
    <Square size={rem(38)} bg="$surfaceRaisedL2" borderWidth={rem(1)} borderColor="$borderDefault" style={{ borderRadius: rem(6) }}>
      <Search size={rem(20)} color="$iconBrandPrimary" />
    </Square>
  )
}