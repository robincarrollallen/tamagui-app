import { Picker } from '@my/ui'
import { List } from 'app/widgets/List'
import { useUnclaimedLogic } from './logic'
import { useRangeTimeOptions } from 'app/enums'
import { useRem } from 'app/hooks/ResponsiveSize'
import { ChevronDown } from '@tamagui/lucide-icons'
import { YStack, Text, Card, XStack } from 'tamagui'

export const Unclaimed = () => {
  const { date, recordList, tabbarLayout, safeArea, rem, onChange, onEndReached } = useUnclaimedLogic()
  const items = useRangeTimeOptions()

  return (
    <YStack flex={1} width="100%" px={12} pt={12}>
      <XStack justify="space-between">
        <Picker items={items} onChange={onChange} value={date}>
          <Card bg="$surfaceRaisedL1" px={rem(12)} py={rem(6)} borderRadius={rem(4)} flexDirection="row" items="center" gap={2}>
            <Text fontSize={rem(12)} color="$textWeaker">See the date: </Text>
            <Text fontSize={rem(12)} fontWeight="700">{items.find(item => item.value === date)?.label}</Text>
            <ChevronDown size={rem(12)} color="$textWeaker" />
          </Card>
        </Picker>
        <XStack>
          <Text>Bonus: </Text>
          <Text fontWeight="700" color="$textWarning">0.00</Text>
        </XStack>
      </XStack>
      <List
        data={recordList}
        itemHeight={rem(130)}
        onEndReached={onEndReached}
        renderFooter={() => <Text />}
        footerHeight={tabbarLayout.height - safeArea.bottom} 
        renderItem={
          ({ item, index }) => <RenderItem item={item} index={index} />
        }
      />
    </YStack>
  )
}

/** 历史取记录列表项 */
const RenderItem = ({ item, index }) => {
  const rem = useRem()

  return (
    <Card bg="$surfaceRaisedL1" px={rem(12)} py={rem(6)} borderRadius={rem(4)} flexDirection="row" items="center" gap={2}>
      <Text fontSize={rem(12)}>{item.name}</Text>
    </Card>
  )
}