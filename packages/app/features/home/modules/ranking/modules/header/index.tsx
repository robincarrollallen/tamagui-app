import { YStack, XStack, Text, useTheme } from 'tamagui'
import { useRem } from 'app/store'
import { SPRITE_NAME } from '@my/assets'
import { LazyImage, Sprite } from '@my/ui'

export function HomeRankingHeader({ list = [] }: { list?: Recordable[] }) {
  const rem = useRem()
  const theme = useTheme()

  return (
    <YStack px={rem(12)}>
      <XStack
        gap={rem(16)}
        py={rem(32)}
        bg="$surfaceRaisedL1"
        justify="center"
        borderTopLeftRadius={rem(12)}
        borderTopRightRadius={rem(12)}
        style={{ boxShadow: `0 ${rem(-1)}px 0 0 ${theme.borderDefault?.get()}` }}
      >
        {list.map((item) => (
          <YStack key={item.rank} pt={rem(22)} mt={item.rank !== 1 ? rem(32) : 0} width={rem(94)} height={rem(188)} items="center">
            <LazyImage
              width={rem(64)}
              height={rem(64)}
              uri={item.avatar}
              borderRadius="50%"
            />
            <Sprite
              source={SPRITE_NAME.RANK_AVATAR_BORDER_25}
              iconName={item.rank}
              position='absolute'
              height={rem(188)}
              width={rem(94)}
              inset={0}
            />
            <Text z={1} fontSize={rem(12)} mt={rem(16)} color="$textHighlightWhite">{item.userId}</Text>
            <Text z={1} fontSize={rem(12)} fontWeight="bold" color="$textWarning">{item.rankValue}</Text>
          </YStack>
        ))}
      </XStack>
    </YStack>
  )
}