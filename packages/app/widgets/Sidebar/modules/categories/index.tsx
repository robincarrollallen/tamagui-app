import { Sprite } from '@my/ui'
import { useEffect } from 'react'
import { useRem } from 'app/store'
import { SPRITE_NAME } from '@my/assets'
import { Text, YStack, XStack } from 'tamagui'
import { LinearGradient } from 'tamagui/linear-gradient'
import { useActivityStore, useGameStore, usePlatformStore } from 'app/store'
import sideBarActivityData from 'app/data/lobbySidebarBannerList.json'

export const SidebarCategories = () => {
  const rem = useRem()
  const homeList = useGameStore(state => state.homeList)

  const isNative = usePlatformStore(state => state.isNative)

  useEffect(() => {
    const setSideBarActivityList = useActivityStore.getState().setSideBarActivityList

    setSideBarActivityList(sideBarActivityData)
  }, [])

  return (
    <YStack py={rem(12)} gap={rem(12)}>
      <Text color="$textWeak" fontSize={rem(14)}>Hot Events</Text>
      <XStack gap={rem(12)} flexWrap="wrap">
        {homeList.map((item) => (
          <LinearGradient
            key={item.code}
            p={rem(6)}
            borderWidth={rem(1)}
            bg="$surfaceRaisedL2"
            borderColor="$borderDefault"
            borderTopLeftRadius={rem(6)}
            borderTopRightRadius={rem(6)}
            borderBottomLeftRadius={rem(6)}
            borderBottomRightRadius={rem(6)}
            start={[0, 0]}
            width={rem(133)}
            end={isNative ? [.85, 2] : [.1, .25]} // 近似125度角
            colors={[
              'transparent',              // 48%
              'rgba(255,255,255,0.06)', // 48%
              'rgba(255,255,255,0)',    // 58%
              'rgba(255,255,255,0.05)', // 58%
              'rgba(255,255,255,0)',    // 68%
              'rgba(255,255,255,0.04)', // 68%
            ]}
            locations={[0.68, 0.68, 0.78, 0.78, 0.88, 0.88]}
          >
            <XStack items="center" gap={rem(8)}>
              <Sprite iconName={item.code} source={SPRITE_NAME.CATEGORY_GAME_25} width={rem(24)} height={rem(24)} />
              <Text fontSize={rem(12)} fontWeight="bold">{item.name}</Text>
            </XStack>
          </LinearGradient>
        ))}
      </XStack>
    </YStack>
  )
}