import { Tabs } from 'expo-router'
import { useTheme } from 'tamagui'
import { StatusBar } from 'expo-status-bar'
import { CustomTabBar } from 'app/features/tabbar'

export default function TabLayout() {
  const theme = useTheme()

  return (
    <>
      <StatusBar style="light" backgroundColor="transparent" />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { height: 0 },
          sceneStyle: { backgroundColor: theme.topNavSecondary?.get() }
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