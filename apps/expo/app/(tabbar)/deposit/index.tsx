import { DepositScreen } from 'app/features/deposit'
import { Stack } from 'expo-router'
import { useTheme } from 'tamagui'

export default function Screen() {
  const theme = useTheme()
  
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Deposit',
          headerTintColor: theme.color?.get(),
          headerStyle: {
            backgroundColor: theme.topNavSecondary?.get(),
          },
        }}
      />
      <DepositScreen />
    </>
  )
}