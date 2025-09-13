import { HomeHeader } from 'app/features/home/modules/header'
import { HomeScreen } from 'app/features/home/screen'
import { Stack } from 'expo-router'
import { useTheme } from 'tamagui'

export default function Screen() {
  const theme = useTheme()
  
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
          header: () => <HomeHeader />,
          headerStyle: {
            backgroundColor: theme.backgroundHover?.get(), // 设置背景色(自定义header失效)
          },
        }}
      />
      <HomeScreen />
    </>
  )
}