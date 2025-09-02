import React from 'react'
import { YStack } from 'tamagui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface CustomTabBarProps {
  activeTab: string
  backgroundType?: 'color' | 'gradient' | 'image'
  backgroundColor?: string
  gradientColors?: string[]
  backgroundImage?: string
  customContainerStyle?: any
}

export const CustomTabBar: React.FC<CustomTabBarProps> = ({
 
}) => {
  const insets = useSafeAreaInsets()
  
  return (
    <YStack>
      
    </YStack>
  )
}