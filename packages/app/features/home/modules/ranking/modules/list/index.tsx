import { VerticalInfiniteScroll } from 'app/widgets/VerticalInfiniteScroll'
import { XStack, Text } from 'tamagui'
import { useRem } from 'app/store'
import { LazyImage } from '@my/ui'

export function HomeRankingList({ list = [] }: { list?: Recordable[] }) {
  const rem = useRem()
  
  const renderRankItem = (item: any, index: number) => (
    <XStack
      px={rem(15)}
      height="100%"
      items="center"
      justify="space-between"
      bg={index % 2 === 0 ? '$surfaceRaisedL1' : '$surfaceRaisedL2'}
    >
      <Text
        fontSize={rem(14)}
        fontWeight="600"
        color='$textBrandPrimary'
      >
        {item.rank}
      </Text>
      <XStack flex={1} justify="center" items="center" gap={rem(8)}>
        <LazyImage
          width={rem(20)}
          height={rem(20)}
          uri={item.avatar}
          borderRadius="50%"
        />
        <Text fontSize={rem(14)} color="$textWeak">{item.userId}</Text>
      </XStack>
      <Text fontSize={rem(14)} fontWeight="600">
        {item.rankValue}
      </Text>
    </XStack>
  )
  
  return (
    <>
      <XStack gap={8} items="center" justify="center" py={rem(4)}>
        <Text fontSize={12} color="$textWeakest" fontWeight="bold" text="center" width={rem(50)}>Rank</Text>
        <Text flex={1} fontSize={12} color="$textWeakest" fontWeight="bold" text="center">Member</Text>
        <Text fontSize={12} color="$textWeakest" fontWeight="bold" text="center" width={rem(100)}>Amount</Text>
      </XStack>
      <VerticalInfiniteScroll
        data={list}
        itemHeight={rem(50)}
        speed={30} // 每秒30像素
        renderItem={renderRankItem}
        bg="$background"
        width="100%"
      />
    </>
  )
}