import { useEffect } from 'react'
import { LazyImage } from '@my/ui'
import { useRem } from 'app/store'
import { useActivityStore } from 'app/store'
import { Text, YStack, XStack } from 'tamagui'
import { LinearGradient } from 'tamagui/linear-gradient'
import sideBarActivityData from 'app/data/lobbySidebarBannerList.json'

export const SidebarActivity = () => {
  const rem = useRem()
  const sideBarActivityList = useActivityStore(state => state.sideBarActivityList)

  useEffect(() => {
    const setSideBarActivityList = useActivityStore.getState().setSideBarActivityList

    setSideBarActivityList(sideBarActivityData)
  }, [])

  return (
    <YStack py={rem(12)} gap={rem(12)}>
      <Text color="$textWeak" fontSize={rem(14)}>Hot Events</Text>
      <XStack gap={rem(12)} flexWrap="wrap">
        {sideBarActivityList.map((item) => (
          <YStack
            key={item.id}
            p={rem(6)}
            gap={rem(4)}
            width={rem(133)}
            bg="$surfaceRaisedL2"
            borderWidth={rem(1)}
            borderColor="$borderDefault"
            borderTopLeftRadius={rem(6)}
            borderTopRightRadius={rem(6)}
            borderBottomLeftRadius={rem(6)}
            borderBottomRightRadius={rem(6)}
          >
            <XStack items="center" gap={rem(4)}>
              <LazyImage uri={item.logoSrc} width={rem(24)} height={rem(24)} />
              <Text fontSize={rem(12)} fontWeight="bold">{item.name}</Text>
            </XStack>
            <XStack justify="flex-end">
              <LinearGradient
                py={rem(2)}
                px={rem(6)}
                borderWidth={rem(1)}
                borderColor="$borderBrand"
                borderTopLeftRadius={rem(4)}
                borderTopRightRadius={rem(4)}
                borderBottomLeftRadius={rem(4)}
                borderBottomRightRadius={rem(4)}
                colors={['$gradientsPrimaryA', '$gradientsPrimaryB']}
                locations={[0, 1]}
                start={[0, 0]}
                end={[1, 1]}
              >
                <YStack>
                  <Text fontSize={rem(10)} color="$color">Go!</Text>
                </YStack>
              </LinearGradient>
            </XStack>
          </YStack>
        ))}
      </XStack>
    </YStack>
  )
}