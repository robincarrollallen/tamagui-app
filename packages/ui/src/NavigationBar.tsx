import { forwardRef } from "react";
import { Pressable } from "react-native";
import { useRouter } from 'solito/navigation'
import { useRem } from 'app/hooks/ResponsiveSize'
import { ChevronLeft } from '@tamagui/lucide-icons'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { YStack, YStackProps, XStack, Text, useTheme } from "tamagui";

export const NavigationBar = forwardRef<
  React.ComponentRef<typeof YStack>,
  YStackProps & { title?: string }
>(({ title = "", ...props }, ref) => {
  const rem = useRem()
  const router = useRouter()
  const safeArea = useSafeArea()

  return (
    <YStack ref={ref} width="100%" {...props} pt={safeArea.top} bg="$topNavSecondary">
      <XStack items="center" px={rem(12)} height={rem(50)}>
        <Pressable onPress={() => router.back()}>
          <ChevronLeft size={rem(20)} />
        </Pressable>
        <Text flex={1} fontSize={rem(14)} items="center" fontWeight="600" text="center">{title}</Text>
      </XStack>
    </YStack>
  )
})