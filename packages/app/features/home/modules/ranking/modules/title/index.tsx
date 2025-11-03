import { XStack, Text } from 'tamagui'
import { StarFull } from '@tamagui/lucide-icons'

export function HomeRankingTitle() {
  return (
    <XStack gap={8} items="center" justify="center" py={24}>
      <StarFull size={12} color="$iconBrandSecondary" />
      <Text fontSize={20} color="$textBrandPrimary" fontWeight="bold">Betting Rank</Text>
      <StarFull size={12} color="$iconBrandSecondary" />
    </XStack>
  )
}