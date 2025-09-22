import { ActivityScreen } from 'app/features/activity/screen'
import { Stack } from 'expo-router'
import { useTheme } from 'tamagui'

export default function Screen() {
  const theme = useTheme()

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