import { Square } from 'tamagui'
import { useRem } from 'app/store'
import { useRouter } from 'app/hooks/router'
import { Search } from '@tamagui/lucide-icons'

export function MarqueeSearch() {
  const rem = useRem()
  const router = useRouter()

  return (
    <Square size={rem(38)} bg="$surfaceRaisedL2" borderWidth={rem(1)} borderColor="$borderDefault" style={{ borderRadius: rem(6) }} onPress={() => router.push('/game/search')}>
      <Search size={rem(20)} color="$iconBrandPrimary" />
    </Square>
  )
}