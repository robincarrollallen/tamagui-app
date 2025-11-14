import { VipTag } from '@my/ui'
import { IMAGES } from '@my/assets'
import { useCopy } from 'app/hooks/message'
import { Copy } from '@tamagui/lucide-icons'
import { ImageBackground } from 'expo-image'
import { YStack, XStack, Avatar, Text } from 'tamagui'
import { useRem, useUserStore, useVipStore } from 'app/store'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'

export function UserInfo() {
  const safeAreaInsets = useSafeArea()
  const vipInfo = useVipStore(state => state.vipInfo)
  const userInfo = useUserStore(state => state.userInfo)
  const copy= useCopy()
  const rem = useRem()
  
  return (
    <ImageBackground
      source={IMAGES.yellow_dark_top_bg}
      style={{ width: '100%', paddingTop: safeAreaInsets.top }}
    >
      <XStack px={rem(12)} gap={rem(12)}>
        <Avatar circular size={rem(56)}>
          <Avatar.Image src={userInfo.avatar} />
        </Avatar>
        <YStack gap={rem(4)} justify="center">
          <XStack items="center" gap={rem(10)}>
            <Text>{userInfo.userName}</Text>
            <VipTag level={vipInfo.currentVipLevel?.level ?? 0} />
          </XStack>
          <XStack items="center" gap={rem(10)}>
            <Text color="$textWeaker">ID: {userInfo.id}</Text>
            <Copy size={rem(16)} color="$iconBrandPrimary" onPress={() => copy(userInfo.id)} />
          </XStack>
        </YStack>
      </XStack>
    </ImageBackground>
  )
}