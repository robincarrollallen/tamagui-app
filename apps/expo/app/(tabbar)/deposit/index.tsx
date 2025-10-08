import { DepositScreen } from 'app/features/deposit'
import { Stack } from 'expo-router'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Deposit',
        }}
      />
      <DepositScreen />
    </>
  )
}