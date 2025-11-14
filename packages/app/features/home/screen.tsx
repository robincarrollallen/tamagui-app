import { Platform } from 'react-native'
import { useLink } from 'solito/navigation'
import { useEffect, useState } from 'react'
import { GameList } from './modules/gameList'
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import { IOScrollView } from 'react-native-intersection-observer'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { SwitchLanguageButton } from '@my/ui/src/SwitchLanguageButton'
import { useGameStore, useStatusStore, useResponsiveStore, useStyleStore } from 'app/store'
import { Button, H1, Paragraph, Separator, XStack, YStack, isWeb } from 'tamagui'
import { SwitchRouterButton, SwitchThemeButton, useToastController } from '@my/ui'
import { Sign, Banner, Marquee, HomeHeader, Bonus, Sticky, Ranking } from './modules'
import homeListData from 'app/data/homeList.json'
import gameListData from 'app/data/gameList.json'

export function HomeScreen({ pagesMode = false }: { pagesMode?: boolean }) {
  const linkTarget = pagesMode ? '/pages-example-activity' : '/activity'
  const linkProps = useLink({
    href: `${linkTarget}/nate`,
  })

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
