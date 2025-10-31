import { ChevronDown, ChevronUp } from "@tamagui/lucide-icons"
import { forwardRef } from "react"

import { XStack, YStack, Text, XStackProps, TamaguiElement } from "tamagui"

export const GameWrapperFooter = forwardRef<TamaguiElement, XStackProps & { showAll?: boolean, onPress?: () => void }>((
  {
    showAll,
    onPress,
    ...props
  },
  ref
) => {
  return (
    <XStack gap={10} justify="center" items="center" py={12} ref={ref} {...props}>
      <Text fontSize={12}>{showAll ? 'Collapse' : 'Display All'}</Text>
      <YStack height={10} width={10} bg="$iconBrandSecondary" style={{ borderRadius: '50%'}} onPress={onPress}>
        {showAll ? <ChevronUp size={10} color="$background" /> : <ChevronDown size={10} color="$background" />}
      </YStack>
    </XStack>
  )
})