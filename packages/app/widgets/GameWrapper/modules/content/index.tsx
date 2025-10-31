import { Image } from "tamagui"
import { LazyImage } from "@my/ui"
import { forwardRef } from "react"
import { useRem } from "app/store"
import { XStack, YStack, XStackProps, TamaguiElement } from "tamagui"

export const GameWrapperContent = forwardRef<TamaguiElement, XStackProps & { showAll?: boolean, platform?: Recordable }>((
  {
    showAll,
    platform = {},
    ...props
  },
  ref
) => {

  const rem = useRem()
  
  return (
    <XStack p={12} gap={10} flexWrap="wrap" ref={ref} {...props}>
      {
        platform.target === 'hall'
        ? <LazyImage width="100%" height={100} borderRadius={6} uri={platform.background} />
        : platform.gameList.map((game: Recordable, index: number) => (
          (showAll || index < 12) && (
            <YStack
              key={game.id}
              width={rem(78)}
              aspectRatio={57/77}
            >
              {
                index < 12
                ? <LazyImage width="100%" height="100%" borderRadius={10} uri={game.logo} />
                : <Image width="100%" height="100%" borderRadius={10} source={{ uri: game.logo }} />
              }
            </YStack>
          )
        ))
      }
      </XStack>
  )
})