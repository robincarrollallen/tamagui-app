import { YStack } from 'tamagui'
import { useEffect} from 'react'
import { GameList } from './modules/gameList'
import { IOScrollView } from 'react-native-intersection-observer'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { useGameStore, useResponsiveStore, useStyleStore } from 'app/store'
import { Sign, Banner, Marquee, HomeHeader, Bonus, Sticky, Ranking } from './modules'
import homeListData from 'app/data/homeList.json'
import gameListData from 'app/data/gameList.json'

export function HomeScreen() {
  const safeArea = useSafeArea()
  const tabbarLayout = useStyleStore(state => state.tabbarLayout)
  const screenWidth = useResponsiveStore(state => state.screenWidth)
  const screenHeight = useResponsiveStore(state => state.screenHeight)
  const setHomeList = useGameStore.getState().setHomeList
  const setGameList = useGameStore.getState().setGameList

  useEffect(() => {
    setHomeList(homeListData)
    setGameList(gameListData)
  }, [])

  return (
    <YStack flex={1} pt={safeArea.top} pb={tabbarLayout.height}>
      <HomeHeader />
      <YStack flex={1}>
        <IOScrollView
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[4]}
          scrollEventThrottle={16}
          rootMargin={{ top: screenHeight, bottom: screenHeight, left: screenWidth, right: screenWidth }}
        >
          <Sign />
          <Banner autoPlay />
          <Marquee />
          <Bonus />
          <Sticky />
          <GameList />
          <Ranking />
        </IOScrollView>
      </YStack>
    </YStack>
  )
}
