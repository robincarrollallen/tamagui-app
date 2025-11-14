import { YStack } from 'tamagui'
import { useRem } from 'app/store'
import { TeamLevel } from './modules/teamLevel'

export const MyReward = () => {
  const rem = useRem()

  return (
    <YStack flex={1} width="100%" pt={rem(12)}>
      <TeamLevel />
    </YStack>
  )
}