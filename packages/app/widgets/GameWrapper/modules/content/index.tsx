import { LazyImage } from "@my/ui"
import { forwardRef } from "react"
import { useSizeTokens } from "app/store"
import { XStack, YStack, XStackProps, TamaguiElement } from "tamagui"
import { GameCard } from "app/widgets/GameCard"

export const GameWrapperContent = forwardRef<TamaguiElement, XStackProps & { showAll?: boolean, platform?: Recordable }>((
  {
    showAll,
    platform = {},
    ...props
  },
  ref
) => {

  const rem = useSizeTokens()
  
  return (
    <XStack p={12} gap={10} flexWrap="wrap" ref={ref} {...props}>
      {
        platform.target === 'hall'
        ? <LazyImage width="100%" height={100} borderRadius={6} uri={platform.background} lazy/>
        : platform.gameList.map((game: Recordable, index: number) => (
          (showAll || index < 12) && (
            <YStack
              key={game.id}
              width={rem[78]}
              aspectRatio={57/77}
            >
              <GameCard item={game} borderRadius={rem[10]} gap={0} p={0} lazy={index < 12}/>
            </YStack>
          )
        ))
      }
      </XStack>
  )
})