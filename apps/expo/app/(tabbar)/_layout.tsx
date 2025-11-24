import { Tabs } from 'expo-router'
import { useTheme } from 'tamagui'
import { CustomTabBar } from 'app/features/tabbar'

export default function TabLayout() {
  const theme = useTheme()

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          freezeOnBlur: true, // 在切换Tab时，保持当前Tab的组件状态
          tabBarStyle: { height: 0 },
          sceneStyle: { backgroundColor: theme.topNavSecondary?.get() },
          animation: 'fade',
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
          name="deposit/index"
        />
        <Tabs.Screen
          name="profile/index"
        />
      </Tabs>

      <CustomTabBar />
    </>
  )
}