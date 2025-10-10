import { useState } from 'react'
import { Platform } from 'react-native'
import { useLink } from 'solito/navigation'
import { useStatusStore } from '../../store/modules/status'
import { useRem, useResponsiveSize } from 'app/hooks/ResponsiveSize'
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import { SwitchLanguageButton } from '@my/ui/src/SwitchLanguageButton'
import { Sign, Banner, Marquee, HomeHeader, Bonus, Sticky } from './modules'
import { SwitchRouterButton, SwitchThemeButton, useToastController } from '@my/ui'
import { Button, H1, Paragraph, Separator, XStack, YStack, ScrollView, isWeb, } from 'tamagui'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'

const tabs = [
  { label: 'Profile', value: 'tab1' },
  { label: 'Connections', value: 'tab2' },
  { label: 'Notifications', value: 'tab3' },
  // { label: 'Settings', value: 'tab4' },
  // { label: 'Help', value: 'tab5' },
  // { label: 'Logout', value: 'tab6' },
]

export function HomeScreen({ pagesMode = false }: { pagesMode?: boolean }) {
  const linkTarget = pagesMode ? '/pages-example-activity' : '/activity'
  const linkProps = useLink({
    href: `${linkTarget}/nate`,
  })


  const rem = useRem()
  const safeArea = useSafeArea()

  return (
    <YStack flex={1} bg="$background" pt={safeArea.top}>
      <HomeHeader />
      <ScrollView flex={1} pt={rem(12)} showsVerticalScrollIndicator={false}>
        <Sign />
        <Banner />
        <Marquee />
        <Bonus />
        <Sticky />
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
      </ScrollView>
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
