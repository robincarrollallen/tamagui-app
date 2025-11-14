import { Stack } from 'expo-router'
import { DepositScreen } from 'app/features/deposit'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { useResponsiveStore, useRem } from 'app/store'
import { useTheme, XStack } from 'tamagui'
import { Segment } from '@my/ui'
import { useCallback, useState } from 'react'

export default function Screen() {
  const rem = useRem()
  const theme = useTheme()
  const safeAreaInsets = useSafeArea()
  const screenWidth = useResponsiveStore(state => state.screenWidth)
  const [activeTab, setActiveTab] = useState('tab1')
  
  /** 切换回调事件 tab */
  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value)
  }, [])

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          header: ({}) => (
            <XStack
              paddingTop={safeAreaInsets.top}
              backgroundColor="$topNavSecondary"
              justifyContent="center"
              width="100%"
            >
              <Segment
                block
                shrink
                tabs={[
                  { label: 'Tab 1', value: 'tab1' },
                  { label: 'Tab 2', value: 'tab2' },
                  { label: 'Tab 3', value: 'tab3' },
                ]}
                height={rem(32)}
                fontSize={rem(12)}
                active={activeTab}
                background="$surfaceLowered"
                borderTopLeftRadius={rem(6)}
                borderTopRightRadius={rem(6)}
                activeColor="$surfaceRaisedL2"
                onValueChange={handleTabChange}
                borderBottomLeftRadius={rem(6)}
                borderBottomRightRadius={rem(6)}
                activeTextColor="$borderSelected"
                activeTextWeight="700"
              />
            </XStack>
          )
        }}
      />
      <DepositScreen />
    </>
  )
}