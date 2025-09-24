'use client'

import { YStack} from 'tamagui'
import { ReactNode } from 'react'
import { CustomTabBar } from 'app/features/tabbar'
import { LoginScreen } from 'app/features/login'

export default function TabLayout({ children }: { children: ReactNode }) {
  return (
    <YStack flex={1} width="100%" position='relative'>
      {/* 主内容区域 */}
      <YStack flex={1}>
        {children}
      </YStack>
      {/* 登录弹窗 */}
      <LoginScreen />
      {/* TabBar */}
      <CustomTabBar />
    </YStack>
  )
}
