import { useState } from 'react'
import { YStack, Text } from 'tamagui'
import { Picker } from '@my/ui'
import { Pressable } from 'react-native'

export const Unclaimed = () => {
  
  return (
    <YStack flex={1} width="100%" p={12}>
      <Picker renderContent={(close) => <Text onPress={close}>Picker</Text>}>
        <Text>Picker</Text>
      </Picker>
    </YStack>
  )
}