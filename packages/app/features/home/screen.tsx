import { Platform } from 'react-native'
import { useLink } from 'solito/navigation'
import { useEffect, useState } from 'react'
import { GameList } from './modules/gameList'
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import { IOScrollView } from 'react-native-intersection-observer'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { SwitchLanguageButton } from '@my/ui/src/SwitchLanguageButton'
import { useGameStore, useStatusStore, useResponsiveStore } from 'app/store'
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
  const setHomeList = useGameStore.getState().setHomeList
  const setGameList = useGameStore.getState().setGameList
  const screenWidth = useResponsiveStore(state => state.screenWidth)
  const screenHeight = useResponsiveStore(state => state.screenHeight)

  useEffect(() => {
    setHomeList(homeListData)
    setGameList(gameListData)
  }, [])

  return (
    <YStack flex={1} bg="$background" pt={safeArea.top}>
      <HomeHeader />
      <YStack flex={1}>
        <IOScrollView
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[4]}
          scrollEventThrottle={16}
          rootMargin={{ top: screenHeight, bottom: screenHeight, left: screenWidth, right: screenWidth }}
        >
          <Sign />
          <Banner />
          <Marquee />
          <Bonus />
          <Sticky />
          <GameList />
          <Ranking />
          <YStack justify="center" items="center" gap="$8" p="$4">
            <XStack
              position="absolute"
              width="100%"
              t="$6"
              gap="$6"
              justify="center"
              flexWrap="wrap"
              $sm={{ position: 'relative', t: 0 }}
            >
              {isWeb && (
                <>
                  <SwitchRouterButton pagesMode={pagesMode} />
                  <SwitchThemeButton />
                  <SwitchLanguageButton />
                </>
              )}
            </XStack>

            <YStack gap="$4">
              <H1 text="center" color="$color12">
                Welcome to Tamagui.
              </H1>
              <Paragraph color="$color10" text="center">
                Here's a basic starter to show navigating from one screen to another.
              </Paragraph>
              <Separator />
              <Paragraph text="center">
                This screen uses the same code on Next.js and React Native.
              </Paragraph>
              <Separator />
            </YStack>

            <Button {...linkProps}>Link to user</Button>

            <SheetDemo />
          </YStack>
          <YStack justify="center" items="center" gap="$8" p="$4">
            <XStack
              position="absolute"
              width="100%"
              t="$6"
              gap="$6"
              justify="center"
              flexWrap="wrap"
              $sm={{ position: 'relative', t: 0 }}
            >
              {Platform.OS === 'web' && (
                <>
                  <SwitchRouterButton pagesMode={pagesMode} />
                  <SwitchThemeButton />
                </>
              )}
            </XStack>

            <SwitchLanguageButton />
            <YStack gap="$4">
              <H1 text="center" color="$color12">
                Welcome to Tamagui.
              </H1>
              <Paragraph color="$color10" text="center">
                Here's a basic starter to show navigating from one screen to another.
              </Paragraph>
              <Separator />
              <Paragraph text="center">
                This screen uses the same code on Next.js and React Native.
              </Paragraph>
              <Separator />
            </YStack>

            <Button {...linkProps}>Link to user</Button>

            <SheetDemo />
          </YStack>
        </IOScrollView>
      </YStack>
    </YStack>
  )
}

function SheetDemo() {
  const toast = useToastController()
  const { showLoginPopup } = useStatusStore()

  const [open, setOpen] = useState(false)

  const openLoginPopup = () => {
    setOpen(true)
    showLoginPopup()
  }
  return (
    <>
      <Button
        size="$6"
        icon={open ? ChevronDown : ChevronUp}
        circular
        onPress={openLoginPopup}
      />
    </>
  )
}
