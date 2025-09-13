'use client'

import { YStack} from 'tamagui'
import { ReactNode } from 'react'
import { CustomTabBar } from 'app/features/tabbar'

export default function TabLayout({ children }: { children: ReactNode }) {
  return (
    <YStack flex={1} maxW={486} position='relative'>
      {/* 主内容区域 */}
      <YStack flex={1}>
        {children}
      </YStack>
      
      {/* TabBar */}
      <CustomTabBar />
    </YStack>
  )
}
