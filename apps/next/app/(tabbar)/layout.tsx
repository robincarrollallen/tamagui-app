// apps/next/app/(tabbar)/layout.tsx
'use client'

import { usePathname, useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import {
  YStack,
  XStack,
  styled,
  Text,
  Circle,
  useTheme,
} from 'tamagui'
import {
  Home,
  User,
  Plus,
  Search,
  Heart,
} from '@tamagui/lucide-icons'

// 保持你原来的样式组件
const TabBarBackground = styled(YStack, {
  position: 'fixed',
  left: 0,
  right: 0,
  bottom: 0,
  height: 80,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  overflow: 'hidden',
  backgroundColor: '$background',
  backdropFilter: 'blur(10px)',
  borderTopWidth: 1,
  borderTopColor: '$borderColor',
  boxShadow: '0 -2px 20px rgba(0,0,0,0.1)',
  zIndex: 1000,
})

const CenterButton = styled(Circle, {
  position: 'absolute',
  size: 60,
  backgroundColor: '$blue10',
  borderWidth: 4,
  borderColor: '$background',
  zIndex: 10,
  top: -30,
  left: '50%',
  marginLeft: -30,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  
  pressStyle: {
    scale: 0.95,
  },
  
  hoverStyle: {
    backgroundColor: '$blue11',
    scale: 1.02,
  },
})

const TabButton = styled(YStack, {
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: '$2',
  paddingHorizontal: '$3',
  minHeight: 50,
  flex: 1,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  userSelect: 'none',
  
  variants: {
    focused: {
      true: {
        opacity: 1,
        scale: 1.1,
      },
      false: {
        opacity: 0.6,
        scale: 1,
      }
    }
  },
  
  pressStyle: {
    opacity: 0.8,
    scale: 0.98,
  },
  
  hoverStyle: {
    backgroundColor: '$backgroundHover',
    opacity: 1,
  },
})

// Tab 配置
const tabs = [
  { name: 'home', label: '首页', icon: Home, path: '/home' },
  { name: 'search', label: '搜索', icon: Search, path: '/search' },
  { name: 'profile', label: '我的', icon: User, path: '/profile' },
  { name: 'favorites', label: '收藏', icon: Heart, path: '/favorites' },
]

const CustomTabButton = ({ 
  focused, 
  icon: Icon, 
  label, 
  onPress 
}: {
  focused: boolean
  icon: any
  label: string
  onPress: () => void
}) => {
  const theme = useTheme()
  
  return (
    <TabButton
      focused={focused}
      onPress={onPress}
    >
      <Icon
        size={24}
        color={focused ? theme.blue10.val : theme.color.val}
      />
      <Text
        fontSize={12}
        fontWeight={focused ? "600" : "400"}
        color={focused ? "$blue10" : "$color"}
        marginTop="$1"
        userSelect="none"
      >
        {label}
      </Text>
    </TabButton>
  )
}

const NextTabBar = () => {
  const pathname = usePathname()
  const router = useRouter()
  
  return (
    <TabBarBackground>
      <XStack
        height={80}
        alignItems="center"
        justifyContent="space-around"
        paddingHorizontal="$4"
        zIndex={5}
      >
        {tabs.map((tab, index) => {
          const isFocused = pathname.includes(tab.name)
          
          // 中间位置占位符
          if (index === Math.floor(tabs.length / 2)) {
            return <YStack key={`spacer-${index}`} flex={1} />
          }

          return (
            <CustomTabButton
              key={tab.name}
              focused={isFocused}
              icon={tab.icon}
              label={tab.label}
              onPress={() => router.push(tab.path)}
            />
          )
        })}
      </XStack>

      {/* 中间按钮 */}
      <CenterButton
        onPress={() => {
          console.log('Center button pressed')
          // router.push('/add')
        }}
      >
        <Plus size={28} color="white" />
      </CenterButton>
    </TabBarBackground>
  )
}

export default function TabLayout({ children }: { children: ReactNode }) {
  return (
    <YStack flex={1}>
      {/* 主内容区域 */}
      <YStack flex={1} paddingBottom={80}>
        {children}
      </YStack>
      
      {/* TabBar */}
      <NextTabBar />
    </YStack>
  )
}