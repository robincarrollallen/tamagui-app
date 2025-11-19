import { YStack, Text } from 'tamagui'
import { useSizeTokens, useStyleStore } from 'app/store'
import { IOScrollView } from 'react-native-intersection-observer'
import { PasswordInput, NavigationBar, ShimmerButton } from '@my/ui'

export const TransactionPinScreen = () => {
  const tabbarLayout = useStyleStore(state => state.tabbarLayout)
  const size = useSizeTokens()

  const handleInput = (value: string) => {
    
  }

  return (
    <YStack flex={1} width="100%" bg="$background">
      <NavigationBar title="Transaction Pin" />
      <YStack flex={1}>
        <IOScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: size[16], paddingBottom: tabbarLayout.height, paddingTop: size[16] }}>
          <Text fontSize={size[14]} fontWeight="600">Set Withdraw Password</Text>
          <Text mt={size[16]} mb={size[10]} fontSize={size[12]} color="$textWeaker">New Withdraw Password</Text>
          <PasswordInput onInput={handleInput} />
          <Text mt={size[16]} mb={size[10]} fontSize={size[12]} color="$textWeaker">Confirm New Withdraw Password</Text>
          <PasswordInput onInput={handleInput} />
          <Text mt={size[16]} mb={size[28]} color="$textWarning" fontSize={size[10]}>The first withdrawal, you need to set the withdrawal password first</Text>
          <ShimmerButton enableShimmer>
            <Text fontSize={size[12]} fontWeight="600">Withdraw Now</Text>
          </ShimmerButton>
        </IOScrollView>
      </YStack>
    </YStack>
  )
}