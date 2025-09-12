import { useResponsiveSize } from 'app/hooks/ResponsiveSize'
import { ICONS, SVG, IMAGES } from '@my/assets'
import { ImageBackground } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'solito/navigation'
import { SvgXml } from 'react-native-svg'
import { Pressable } from 'react-native'
import { Tabs } from 'expo-router'
import {
  YStack,
  XStack,
  styled,
  Text,
  Circle,
  useTheme,
  Image,
} from 'tamagui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

// 中间特殊按钮
// const CenterButton = styled(Circle, {
//   position: 'absolute',
//   size: 60,
//   backgroundColor: '$blue10',
//   borderWidth: 4,
//   borderColor: '$background',
//   shadowColor: '$shadowColor',
//   shadowOffset: { width: 0, height: 4 },
//   shadowOpacity: 0.3,
//   shadowRadius: 8,
//   elevation: 8,
//   zIndex: 10,
//   left: '50%',
//   bottom: 8,
//   transform: [{ translateX: '-50%' }],
  
//   pressStyle: {
//     scale: 0.95,
//   },
  
//   hoverStyle: {
//     backgroundColor: '$blue11',
//   },
// })

const CenterButton = () => {
  const { rem } = useResponsiveSize()
  
  return (
    <ImageBackground style={{ position: 'absolute', width: rem(100), aspectRatio: 1, alignItems: 'center', justifyContent: 'center' }} source={IMAGES.tabbar_bg_flexible_25} width={rem(60)} height={rem(60)}>
      <Circle style={{ position: 'absolute', width: rem(40), aspectRatio: 1 }}>
        <Image source={ICONS.tabbar_flexible_25} style={{ width: '100%', height: '100%' }} />
      </Circle>
    </ImageBackground>
  )
}

// 自定义 Tab 按钮
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
  const theme = useTheme()
  const { rem } = useResponsiveSize()
  const { t } = useTranslation()
  
  return (
    <Pressable onPress={onPress}>
      <YStack
        alignItems="center"
        justifyContent="flex-end"
        animation="quick"
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

// 自定义 TabBar 组件
const CustomTabBar = ({ state, }: any) => {
  const safeAreaInsets = useSafeAreaInsets()
  const { rem } = useResponsiveSize()
  const router = useRouter()
  
  return (
    <YStack style={{ position: 'absolute', bottom: 0, width: '100%', height: rem(80) }}>
      <SvgXml xml={SVG.tabbar_background_25} preserveAspectRatio="none" width="100%" height="100%" style={{ position: 'absolute' }} />
      {/* Tab 按钮容器 */}
      <XStack
        height="100%"
        alignItems="flex-end"
        paddingBottom={safeAreaInsets.bottom}
      >
        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index

          const onPress = () => {
            router.push(`/${route.name}`)
          }

          // 如果是中间位置，渲染占位符
          if (index === Math.floor(state.routes.length / 2)) {
            return (
              <YStack key={route.label} flex={1} style={{ height: '100%', alignItems: 'center', justifyContent: 'flex-start' }}>
                <CenterButton />
              </YStack>
            )
          }

          return (
            <YStack key={route.label} flex={1} style={{ alignItems: 'center', justifyContent: 'center' }}>
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

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { height: 0 },
        }}
      >
        <Tabs.Screen
          name="home/index"
        />
        <Tabs.Screen
          name="activity/index"
        />
        <Tabs.Screen
          name="search/index"
        />
        <Tabs.Screen
          name="profile/index"
        />
        {/* 可以添加更多标签页 */}
        <Tabs.Screen
          name="favorites/index"
        />
      </Tabs>

      <CustomTabBar state={{ routes, index: 0, routeNames: [] }} />
    </>
  )
}

const routes = [
  { name: 'home', label: 'home', icon: SVG.tabbar_home_25, activeIcon: SVG.tabbar_home_active_25 },
  { name: 'activity', label: 'activity', icon: SVG.tabbar_activity_25 },
  { name: 'search', label: 'search', icon: SVG.tabbar_home_25 },
  { name: 'profile', label: 'profile', icon: SVG.tabbar_deposit_25 },
  { name: 'favorites', label: 'favorites', icon: SVG.tabbar_profile_25 },
]