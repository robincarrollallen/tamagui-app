import { YStack, XStack, Text, Circle, Image, View } from 'tamagui'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { ImageBackground, LayoutChangeEvent } from 'react-native'
import { usePathname } from 'app/hooks/usePathname'
import { memo, useEffect, useState } from 'react'
import { useRem, useStyleStore } from 'app/store'
import { ICONS, SVG, IMAGES } from '@my/assets'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'app/hooks/router'
import { SvgXml } from 'react-native-svg'
import { Pressable } from 'react-native'

/** 中间特殊按钮 */
const CenterButton = () => {
  const [rotateAngle, setRotateAngle] = useState(0)
  const { tabbarLayout } = useStyleStore()
  const router = useRouter()
  
  useEffect(() => {
    setRotateAngle(360)
    const interval = setInterval(() => {
      setRotateAngle(prev => prev + 360) // 累加角度
    }, 2000) // 每2秒增加360度
    return () => clearInterval(interval)
  }, [])
  
  return (
    <View width="100%" onPress={() => { router.push('/activity/invite') }}>
      <ImageBackground
        source={IMAGES.tabbar_bg_flexible_25}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: 1,
          alignItems: 'center',
          justifyContent: 'center',
          transform: [{
            scale: 1.2
          }]
        }}
      >
        <Circle position="absolute" aspectRatio={1} animation="spin" rotate={`${rotateAngle}deg`}>
          <SvgXml xml={SVG.tabbar_ring_inside_25 } width={tabbarLayout.width * 0.1} height={tabbarLayout.width * 0.1} />
        </Circle>
        <Circle position="absolute" aspectRatio={1} animation="spin" rotate={`${-rotateAngle}deg`}>
          <SvgXml xml={SVG.tabbar_ring_outside_25 } width={tabbarLayout.width * 0.12} height={tabbarLayout.width * 0.12} />
        </Circle>
        <Circle position="absolute" width="40%" aspectRatio={1} pressStyle={{ scale: 0.95 }} pointerEvents='none'>
          <Image source={ICONS.tabbar_flexible_25} style={{ width: '100%', height: '100%' }} />
        </Circle>
      </ImageBackground>
    </View>
  )
}

/** 自定义 Tab 按钮 */
const CustomTabButton = ({
  focused,
  icon,
  label,
  onPress
}: {
  focused: boolean
  icon: any
  label: string
  onPress: () => void
}) => {
  const rem = useRem()
  const { t } = useTranslation()
  
  return (
    <Pressable onPress={onPress}>
      <YStack
        animation="quick"
        items="center"
        justify="flex-end"
        opacity={focused ? 1 : 1}
        scale={focused ? 1 : 1}
      >
        <SvgXml xml={icon} preserveAspectRatio="none" width={rem(30)} height={rem(30)} />
        <Text
          fontSize={rem(10)}
          fontWeight={focused ? "600" : "600"}
          color={focused ? "$navigationSelected" : "$navigationText"}
        >
          {t(label)}
        </Text>
      </YStack>
    </Pressable>
  )
}

/** 自定义 TabBar 组件 */
export const CustomTabBar = memo(() => {
  const router = useRouter()
  const pathname = usePathname()
  const safeAreaInsets = useSafeArea()
  const setTabbarLayout = useStyleStore(state => state.setTabbarLayout)
  const rem = useRem()
  
  /** 布局变化回调 */
  const onLayout = (event: LayoutChangeEvent) => {
    setTabbarLayout(event.nativeEvent.layout)
  }

  return (
    <YStack onLayout={onLayout} style={{ position: 'absolute', bottom: 0, width: '100%', height: rem(80) + safeAreaInsets.bottom }}>
      <SvgXml xml={SVG.tabbar_background_25} preserveAspectRatio="none" width="100%" height="100%" style={{ position: 'absolute' }} />
      {/* Tab 按钮容器 */}
      <XStack
        height="100%"
        items="flex-end"
        pb={safeAreaInsets.bottom * .75 + rem(4)}
      >
        {routes.map((route: any, index: number) => {
          const isFocused = pathname.includes(route.name)
          const onPress = () => {
            if (pathname !== route.name) {
              router.push(route.name)
            }
          }

          // 如果是中间位置，渲染占位符
          if (index === Math.floor(routes.length / 2)) {
            return (
              <YStack key={route.label} width="20%" items="center" justify="center" position="relative" z={1}>
                <CenterButton />
              </YStack>
            )
          }

          return (
            <YStack key={route.label} width="20%" items="center" justify="center" position="relative" z={1}>
              <CustomTabButton
                focused={isFocused}
                icon={isFocused ? route.activeIcon : route.icon}
                label={route.label}
                onPress={onPress}
              />
            </YStack>
          )
        })}
      </XStack>
    </YStack>
  )
})

const routes = [
  { name: '/home', label: 'home', icon: SVG.tabbar_home_25, activeIcon: SVG.tabbar_home_active_25 },
  { name: '/activity', label: 'activity', icon: SVG.tabbar_activity_25, activeIcon: SVG.tabbar_activity_active_25 },
  { name: '/search', label: 'search' },
  { name: '/deposit', label: 'deposit', icon: SVG.tabbar_deposit_25, activeIcon: SVG.tabbar_deposit_active_25 },
  { name: '/profile', label: 'profile', icon: SVG.tabbar_profile_25, activeIcon: SVG.tabbar_profile_active_25 },
]