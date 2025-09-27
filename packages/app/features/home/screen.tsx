import { useState } from 'react'
import { Platform } from 'react-native'
import { useLink } from 'solito/navigation'
import { useStatusStore } from '../../store/modules/status'
import { useResponsiveSize } from 'app/hooks/ResponsiveSize'
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import { Sign, Banner, Marquee, HomeHeader, Bonus } from './modules'
import { SwitchLanguageButton } from '@my/ui/src/SwitchLanguageButton'
import { SwitchRouterButton, SwitchThemeButton, useToastController } from '@my/ui'
import { Button, H1, Paragraph, Separator, XStack, YStack, ScrollView, isWeb, } from 'tamagui'

export function HomeScreen({ pagesMode = false }: { pagesMode?: boolean }) {
  const linkTarget = pagesMode ? '/pages-example-activity' : '/activity'
  const linkProps = useLink({
    href: `${linkTarget}/nate`,
  })

  const { rem } = useResponsiveSize()

  return (
    <YStack flex={1} bg="$background">
      <HomeHeader />
      <ScrollView flex={1} pt={rem(12)}>
        <Sign />
        <Banner />
        <Marquee />
        <Bonus />
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
