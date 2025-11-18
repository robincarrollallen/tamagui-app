import { Icon } from "./Icon"
import { JSX, memo } from "react"
import { useRem } from "app/store"
import { ChevronRight } from '@tamagui/lucide-icons'
import { Text, useTheme, XStack, XStackProps } from "tamagui"

interface NavigationProps extends Omit<XStackProps, 'content'> {
  icon?: string
  title: string
  iconSize?: number
  iconColor?: string
  content?: JSX.Element
  onPress?: () => void
}

export const Navigation = memo(({
  icon,
  title,
  content,
  iconSize = 24,
  iconColor,
  onPress = () => {},
  ...props
}: NavigationProps) => {
  const rem = useRem()
  const theme = useTheme()

  return (
    <XStack
      p={rem(12)}
      gap={rem(8)}
      items="center"
      bg="$surfaceRaisedL1"
      borderTopLeftRadius={rem(6)}
      borderTopRightRadius={rem(6)}
      borderBottomLeftRadius={rem(6)}
      borderBottomRightRadius={rem(6)}
      onPress={onPress}
      {...props}
    >
      <Icon uri={icon} color={iconColor || theme.$iconWeaker?.get()} width={iconSize} height={iconSize} />
      <Text flex={content ? 0 : 1} fontSize={rem(12)}>{title}</Text>
      {content && <XStack flex={1} justify="flex-end">{content}</XStack>}
      <ChevronRight size={rem(20)} />
    </XStack>
  )
})