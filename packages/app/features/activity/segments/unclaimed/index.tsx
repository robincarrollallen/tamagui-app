import { Picker } from '@my/ui'
import { useMemo, memo } from 'react'
import { List } from 'app/widgets/List'
import { useUnclaimedLogic } from './logic'
import { useRangeTimeOptions } from 'app/enums'
import { useRem } from 'app/hooks/ResponsiveSize'
import { ChevronDown } from '@tamagui/lucide-icons'
import { YStack, Text, Card, XStack } from 'tamagui'
import { formatTimeByDay } from 'app/utils/format/time'

export const Unclaimed = () => {
  const { date, recordList, tabbarLayout, loadingMore, rem, onChange, onEndReached, refreshing, onRefresh } = useUnclaimedLogic()
  const items = useRangeTimeOptions() // 日期选项

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
        itemHeight={rem(46)}
        onRefresh={onRefresh}
        refreshing={refreshing}
        loadingMore={loadingMore}
        onEndReached={onEndReached}
        footerHeight={tabbarLayout.height} 
        renderItem={
          ({ item, index }) => <RenderItem item={item} index={index} />
        }
      />
    </YStack>
  )
}

/** 历史取记录列表项 */
const RenderItem = memo<{ item: any; index: number }>(({ item, index }) => {
  const rem = useRem()

  // 缓存格式化结果
  const formattedTime = useMemo(
    () => formatTimeByDay(item.time),
    [item.time]
  )

  return (
    <Card height="100%" bg={index % 2 === 0 ? '$surfaceLowered' : 'transparent'} px={rem(12)} py={rem(6)} borderRadius={rem(4)} flexDirection="row" items="center" gap={2}>
      <Text width="25%" text="center" fontSize={rem(12)} color="$textWeak">{formattedTime}</Text>
      <Text width="25%" text="center" fontSize={rem(12)} color="$textWeaker">{item.activityName}</Text>
      <Text width="25%" text="center" fontSize={rem(12)} color="$textWarning">{item.minAwardCount && item.maxAwardCount ? `${item.minAwardCount} ~ ${item.maxAwardCount}` : item.awardCount}</Text>
      <Text width="25%" text="center" fontSize={rem(12)} color="$textWeaker">{item.awardType}</Text>
    </Card>
  )
}, (prevProps, nextProps) => {
  return prevProps.item.remake === nextProps.item.remake
})