import { Stack } from 'expo-router'
import { TransactionPinScreen } from 'app/features/transaction/pin/index'

export default function Screen() {
  
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <TransactionPinScreen />
    </>
  )
}
