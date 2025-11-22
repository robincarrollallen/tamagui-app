import { FlatList } from 'react-native'
import { GameCard } from 'app/widgets/GameCard'
import { useGameStore, useSizeTokens } from 'app/store'
import { View, YStack, Text, useIsomorphicLayoutEffect } from 'tamagui'
import hotListData from 'app/data/hotList.json'

export const Hot = ({ gap, numColumns = 4 }: { gap?: number, numColumns?: number }) => {
  const rem = useSizeTokens()
  const hotList = useGameStore(state => state.hotList)
  
  useIsomorphicLayoutEffect(() => {
    const list = hotListData.filter(item => item.type === 'game')
    useGameStore.getState().setHotList(list)
  }, [])

  return (
    <YStack p={rem[4]} width="100%" height="100%">
      <FlatList
        data={hotList}
        renderItem={({ item }) => <GameCard item={item} gap={gap} />}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        scrollEnabled={true}
        columnWrapperStyle={{
          flex: 1,
          justifyContent: 'space-between',
        }}
        ListEmptyComponent={
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>暂无数据</Text>
          </View>
        }
      />
    </YStack>
  );
};