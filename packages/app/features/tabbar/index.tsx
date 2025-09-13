import { useSafeArea } from '../../../app/provider/safe-area/use-safe-area'
import { useResponsiveSize } from '../../../app/hooks/ResponsiveSize'
import { ICONS, SVG, IMAGES } from '@my/assets'
import { ImageBackground } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useRouter, usePathname } from 'solito/navigation'
import { useEffect, useState } from 'react'
import { SvgXml } from 'react-native-svg'
import { Pressable } from 'react-native'
import {
  YStack,
  XStack,
  Text,
  Circle,
  Image,
} from 'tamagui'

/** 中间特殊按钮 */
const CenterButton = () => {
  const { rem } = useResponsiveSize()
  const [rotateAngle, setRotateAngle] = useState(0)
  
  useEffect(() => {
    setRotateAngle(360)
    const interval = setInterval(() => {
      setRotateAngle(prev => prev + 360) // 累加角度
    }, 2000) // 每2秒增加360度
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <ImageBackground style={{ position: 'relative', width: rem(100), aspectRatio: 1, alignItems: 'center', justifyContent: 'center' }} source={IMAGES.tabbar_bg_flexible_25} width={rem(60)} height={rem(60)}>
      <Circle style={{ position: 'absolute', width: '170%', aspectRatio: 1 }} animation="spin" rotate={`${rotateAngle}deg`}>
        <SvgXml xml={SVG.tabbar_ring_inside_25 } style={{ width: '100%', height: '100%' }} />
      </Circle>
      <Circle style={{ position: 'absolute', width: '200%', aspectRatio: 1 }} animation="spin" rotate={`${-rotateAngle}deg`}>
        <SvgXml xml={SVG.tabbar_ring_outside_25 } style={{ width: '100%', height: '100%' }} />
      </Circle>
      <Circle style={{ position: 'absolute', width: rem(40), aspectRatio: 1 }} pressStyle={{ scale: 0.95 }} hoverStyle={{ bg: '$blue11' }}>
        <Image source={ICONS.tabbar_flexible_25} style={{ width: '100%', height: '100%' }} />
      </Circle>
    </ImageBackground>
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
  const { rem } = useResponsiveSize()
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
export const CustomTabBar = () => {
  const safeAreaInsets = useSafeArea()
  const { rem } = useResponsiveSize()
  const [currentRoute, setCurrentRoute] = useState('home')
  const router = useRouter()
  
  return (
    <YStack style={{ position: 'absolute', bottom: 0, width: '100%', height: rem(80) }}>
      <SvgXml xml={SVG.tabbar_background_25} preserveAspectRatio="none" width="100%" height="100%" style={{ position: 'absolute' }} />
      {/* Tab 按钮容器 */}
      <XStack
        height="100%"
        items="flex-end"
        pb={safeAreaInsets.bottom}
      >
        {routes.map((route: any, index: number) => {
          const isFocused = currentRoute === route.name
          const onPress = () => {
            setCurrentRoute(route.name)
            if (currentRoute !== route.name) {
              router.push(`/${route.name}`)
            }
          }

          // 如果是中间位置，渲染占位符
          if (index === Math.floor(routes.length / 2)) {
            return (
              <YStack key={route.label} flex={1} style={{ height: '100%', alignItems: 'center', justifyContent: 'flex-start' }}>
                <CenterButton />
              </YStack>
            )
          }

          return (
            <YStack key={route.label} flex={1} style={{ alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
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
}

const routes = [
  { name: 'home', label: 'home', icon: SVG.tabbar_home_25, activeIcon: SVG.tabbar_home_active_25 },
  { name: 'activity', label: 'activity', icon: SVG.tabbar_activity_25, activeIcon: SVG.tabbar_activity_active_25 },
  { name: 'search', label: 'search' },
  { name: 'profile', label: 'profile', icon: SVG.tabbar_deposit_25, activeIcon: SVG.tabbar_deposit_active_25 },
  { name: 'favorites', label: 'favorites', icon: SVG.tabbar_profile_25, activeIcon: SVG.tabbar_profile_active_25 },
]