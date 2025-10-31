import { forwardRef, useState } from "react"
import { GameWrapperFooter } from "./modules/footer"
import { GameWrapperHeader } from "./modules/header"
import { GameWrapperContent } from "./modules/content"
import { YStack, YStackProps, TamaguiElement } from "tamagui"

export const GameWrapperWidget = forwardRef<TamaguiElement, YStackProps & { platform?: Recordable }>((
  {
    platform = {},
    ...props
  },
  ref
) => {
  const [showAll, setShowAll] = useState(false)

  return platform.target === 'hall' || platform.gameList?.length > 0
  ? <YStack key={platform.id} bg="$surfaceRaisedL1" overflow="hidden" style={{ borderRadius: 10 }} ref={ref} {...props}>
      {/* 头部 */}
      <GameWrapperHeader platform={platform} />
      {/* 内容 */}
      <GameWrapperContent showAll={showAll} platform={platform} />
      {/* 底部 */}
      {platform.gameList?.length > 0 && <GameWrapperFooter showAll={showAll} onPress={() => setShowAll(!showAll)} />}
    </YStack>
  : null
})