'use client'

import { useResponsiveSize } from 'app/hooks/ResponsiveSize'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { SvgUri } from 'react-native-svg'
import { ReactNode, useEffect, useState } from 'react'
import { ICONS, SVG } from '@my/assets'
import {
  YStack,
  XStack,
  styled,
  Text,
  Circle,
  Image,
  Square,
} from 'tamagui'

// tabbar组件
const TabBarBackground = styled(YStack, {
  l: 0,
  r: 0,
  b: 0,
  position: 'absolute',
  aspectRatio: '390/91',
  backgroundSize: '100% auto',
  backgroundPosition: 'bottom',
  backgroundRepeat: 'no-repeat',
  backgroundImage: `url(${SVG.tabbar_background_25})`,
  style: {
    justifyContent: 'flex-end',
  },
})

const CenterButton = ({ onPress }: { onPress: () => void }) => {
  const { rem } = useResponsiveSize()
  const [rotateAngle, setRotateAngle] = useState(0)
  
  useEffect(() => {
    setRotateAngle(360)
    const interval = setInterval(() => {
      setRotateAngle(prev => prev + 360) // 累加角度
    }, 2000) // 每2秒增加360度
    
    return () => clearInterval(interval)
  }, [])

  const styles = {
    height: '100%',
    minWidth: '20%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  } as const

  return  <Circle {...styles}>
            <Square style={{ position: 'relative', width: rem(30), aspectRatio: 1 }}>
              <Image source={{ uri: SVG.tabbar_bg_flexible_25 }} style={{ position: 'absolute', width: '300%',  aspectRatio: 1 }} />
              <Image source={{ uri: ICONS.tabbar_flexible_25 }} style={{ position: 'absolute', inset: 0 }} />
              <Circle style={{ position: 'absolute', width: '170%', aspectRatio: 1 }} animation="spin" rotate={`${rotateAngle}deg`}>
                <SvgUri uri={SVG.tabbar_ring_inside_25 } style={{ width: '100%', height: '100%' }} />
              </Circle>
              <Circle style={{ position: 'absolute', width: '200%', aspectRatio: 1 }} animation="spin" rotate={`${-rotateAngle}deg`}>
                <SvgUri uri={SVG.tabbar_ring_outside_25 } style={{ width: '100%', height: '100%' }} />
              </Circle>
            </Square>
          </Circle>
}

const TabButton = ({ 
  focused, 
  onPress, 
  children,
  ...props 
}: {
  focused?: boolean
  onPress?: () => void
  children?: React.ReactNode
  [key: string]: any
}) => {
  const { rem } = useResponsiveSize()

  const baseStyles = {
    py: rem(10),
    px: rem(3),
    minH: '20%',
    flex: 1,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    style: {
      alignItems: 'center',
      justifyContent: 'center',
      userSelect: 'none',
    },
    pressStyle: {
      opacity: 0.8,
      scale: 0.98,
    },
    hoverStyle: {
      background: '$backgroundHover',
      opacity: 1,
    },
  } as const

  // Apply focused variant manually
  const focusedStyles = focused ? {
    opacity: 1,
    scale: 1,
  } : {
    opacity: 0.6,
    scale: 1,
  }

  return (
    <YStack 
      {...baseStyles} 
      {...focusedStyles}
      onPress={onPress}
      {...props}
    >
      {children}
    </YStack>
  )
}

const CustomTabButton = ({ 
  focused, 
  icon, 
  activeIcon,
  label, 
  onPress 
}: {
  focused: boolean
  icon: string
  activeIcon: string
  label: string
  onPress: () => void
}) => {
  const { rem } = useResponsiveSize()

  return (
    <TabButton
      focused={focused}
      onPress={onPress}
    >
      <SvgUri width={rem(32)} height={rem(32)}  uri={focused ? activeIcon : icon}/>
      <Text
        fontSize={12}
        fontWeight={focused ? "600" : "400"}
        color={focused ? "$blue10" : "$color"}
        mt="$1"
        style={{
          userSelect: 'none',
        }}
      >
        {label}
      </Text>
    </TabButton>
  )
}

const NextTabBar = () => {
  const { t } = useTranslation()
  const pathname = usePathname()
  const router = useRouter()
  const { rem } = useResponsiveSize()


  // Tab 配置
  const tabs = [
    { name: 'home', label: t('home'), icon: SVG.tabbar_home_25, activeIcon: SVG.tabbar_home_active_25, path: '/home' },
    { name: 'search', label: t('search'), icon: SVG.tabbar_activity_25, activeIcon: SVG.tabbar_activity_active_25, path: '/search' },
    { name: 'add', label: t('add'), icon: '', path: '/add' }, // 中间特殊按钮
    { name: 'favorites', label: t('favorites'), icon: SVG.tabbar_deposit_25, activeIcon: SVG.tabbar_deposit_active_25, path: '/favorites' },
    { name: 'profile', label: t('profile'), icon: SVG.tabbar_profile_25, activeIcon: SVG.tabbar_profile_active_25, path: '/profile' },
  ]
  
  return (
    <TabBarBackground>
      <XStack
        style={{
          alignItems: 'flex-end',
          justifyContent: 'space-around',
        }}
        height='100%'
        px={rem(10)}
        z={5}
      >
        {tabs.map((tab, index) => {
          const isFocused = pathname?.includes(tab.name) || false
          
          // 中间位置占位符
          if (index === Math.floor(tabs.length / 2)) {
            return <CenterButton
              key={tab.name}
              onPress={() => {
                console.log('Center button pressed')
                // router.push('/add')
              }}
            />
          }

          return (
            <CustomTabButton
              key={tab.name}
              focused={isFocused}
              activeIcon={tab.activeIcon}
              icon={tab.icon}
              label={tab.label}
              onPress={() => router.push(tab.path)}
            />
          )
        })}
      </XStack>
    </TabBarBackground>
  )
}

export default function TabLayout({ children }: { children: ReactNode }) {
  return (
    <YStack flex={1}>
      {/* 主内容区域 */}
      <YStack flex={1} pb={80}>
        {children}
      </YStack>
      
      {/* TabBar */}
      <NextTabBar />
    </YStack>
  )
}
