import { VipTag } from '@my/ui'
import { IMAGES, SVG } from '@my/assets'
import { useCopy } from 'app/hooks/message'
import { Copy } from '@tamagui/lucide-icons'
import { ImageBackground } from 'expo-image'
import { useRem, useUserStore, useVipStore } from 'app/store'
import { YStack, XStack, Avatar, Text, useTheme, isWeb } from 'tamagui'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { Svg, Defs, RadialGradient, Stop, Rect, SvgXml } from 'react-native-svg';

export function UserInfo() {
  const theme = useTheme()
  const safeAreaInsets = useSafeArea()
  const vipInfo = useVipStore(state => state.vipInfo)
  const userInfo = useUserStore(state => state.userInfo)
  const copy= useCopy()
  const rem = useRem()
  
  return (
    <ImageBackground
      source={IMAGES.yellow_dark_top_bg}
      style={{ width: '100%', paddingTop: safeAreaInsets.top + rem(32), paddingHorizontal: rem(12) }}
    >
      {/* 用户信息 */}
      <XStack gap={rem(12)}>
        <Avatar circular size={rem(56)}>
          <Avatar.Image src={userInfo.avatar} />
        </Avatar>
        <YStack gap={rem(4)} justify="center">
          <XStack items="center" gap={rem(10)}>
            <Text>{userInfo.userName}</Text>
            <VipTag level={vipInfo.currentVipLevel?.level ?? 0} />
          </XStack>
          <XStack items="center" gap={rem(10)}>
            <Text color="$textWeaker" fontSize={rem(12)}>ID: {userInfo.id}</Text>
            <Copy size={rem(12)} color="$iconBrandPrimary" onPress={() => copy(userInfo.id)} />
          </XStack>
        </YStack>
      </XStack>
      {/* 余额信息 */}
      <XStack width="100%" overflow="hidden" py={rem(16)} borderBottomColor="$borderDefault" borderBottomWidth={rem(1)}>
        <YStack width="50%" gap={rem(4)} items="center" justify="center">
          <Text color="$textWeaker" fontSize={rem(10)}>Balance</Text>
          <XStack items="center" gap={rem(4)}>
            <Text fontSize={rem(16)}>R$</Text>
            <Text fontSize={rem(16)}>10,000.00</Text>
          </XStack>
          <ShadowGradient />
        </YStack>
        <YStack width="50%" gap={rem(4)} items="center" justify="center">
          <Text color="$textWeaker" fontSize={rem(10)}>The bonus received today</Text>
          <Text fontSize={rem(16)}>0.00</Text>
          <ShadowGradient />
        </YStack>
      </XStack>
      {/* 资金操作 */}
      <XStack width="100%" overflow="hidden" gap={rem(12)} py={rem(18)}>
        <YStack
          flex={1}
          py={rem(8)}
          px={rem(16)}
          gap={rem(4)}
          items="center"
          justify="center"
          bg="$surfaceRaisedL2"
          style={{ borderRadius: rem(8) }}
          boxShadow={`0 ${rem(-26)}px ${rem(20)}px ${rem(-24)}px ${theme.glowPrimaryOpacity40?.get()} inset`}
        >
          <XStack items="center" gap={rem(4)}>
            <SvgXml xml={SVG.pig} width={rem(30)} height={rem(30)} color={theme.iconBrandPrimary?.get()} />
            <Text fontSize={rem(14)} fontWeight="600">{`Deposit`}</Text>
          </XStack>
        </YStack>
        <YStack
          flex={1}
          py={rem(8)}
          px={rem(16)}
          gap={rem(4)}
          items="center"
          justify="center"
          bg="$surfaceRaisedL2"
          style={{ borderRadius: rem(8) }}
          boxShadow={`0 ${rem(-26)}px ${rem(20)}px ${rem(-24)}px ${theme.glowPrimaryOpacity40?.get()} inset`}
        >
          <XStack items="center" gap={rem(4)}>
            <SvgXml xml={SVG.wallet} width={rem(30)} height={rem(30)} color={theme.iconBrandPrimary?.get()} />
            <Text fontSize={rem(14)} fontWeight="600">{`Withdraw`}</Text>
          </XStack>
        </YStack>
      </XStack>
    </ImageBackground>
  )
}

/** 阴影渐变 */
function ShadowGradient() {
  const theme = useTheme()
  const rem = useRem()

  return (
    <Svg width='100%' style={{ position: 'absolute', bottom: '-360%', aspectRatio: 1, zIndex: -1 }}>
      <Defs>
        <RadialGradient
          id="radialGradient"
          cx="50%"
          cy="50%"
          r="50%"
          fx="50%"
          fy="50%"
        >
          <Stop offset="0%" stopColor={theme.glowPrimaryOpacity40?.get()} stopOpacity={isWeb ? 1 : .4}/>
          <Stop offset="100%" stopColor="transparent" stopOpacity="0"/>
        </RadialGradient>
      </Defs>
      <Rect width="100%" height="100%" fill="url(#radialGradient)" />
    </Svg>
  )
}