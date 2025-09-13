import { Tabs } from 'expo-router'
import { CustomTabBar } from 'app/features/tabbar'

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
        <Tabs.Screen
          name="favorites/index"
        />
      </Tabs>

      <CustomTabBar />
    </>
  )
}