import { ActivityScreen } from 'app/features/activity/screen'
import { Stack } from 'expo-router'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <ActivityScreen />
    </>
  )
}