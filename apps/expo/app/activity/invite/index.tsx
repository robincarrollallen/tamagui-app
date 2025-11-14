import { Stack } from 'expo-router'
import { InviteScreen } from 'app/features/activity/invite/screen'

export default function Screen() {
  
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <InviteScreen />
    </>
  )
}
