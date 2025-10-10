import { useTheme, Image, Button, XStack, YStack, Dialog} from "tamagui";
import { useResponsiveSize } from '../../../../hooks/ResponsiveSize'
import { usePlatformStore, useStyleStore } from '../../../../store'
import { LinearGradient } from 'tamagui/linear-gradient'
import { RippleButton } from '@my/ui/src/RippleButton'
import { SidebarWidget } from 'app/widgets/sidebar'
import { useTenantStore } from '../../../../store'
import { SvgXml } from 'react-native-svg'
import { SVG } from '@my/assets'

/** 首页 Header 组件 */
export const HomeHeader = () => {
  const theme = useTheme()
  const { rem } = useResponsiveSize()
  const { tenantInfo } = useTenantStore()
  const { isReactNative } = usePlatformStore()

  return (
    <YStack style={{ backgroundColor: '#121713' }}>
      <LinearGradient
        start={[0, 0]}
        end={isReactNative ? [0.45, 1] : [0.1, 0.5]} // 近似125度角
        width="100%"
        colors={[
          '#121713',                  // 0%
          '#121713',                  // 8%
          'rgba(255,255,255,0.06)', // 8%
          'rgba(255,255,255,0)',    // 20%
          'rgba(255,255,255,0.05)', // 20%
          'rgba(255,255,255,0)',    // 32%
          'rgba(255,255,255,0.04)', // 32%
          'rgba(255,255,255,0)',    // 44%
          'rgba(255,255,255,0.03)', // 44%
          'rgba(255,255,255,0)',    // 56%
          'rgba(255,255,255,0.02)', // 56%
          'rgba(255,255,255,0)',    // 68%
          'rgba(255,255,255,0.01)', // 68%
          'rgba(255,255,255,0)',    // 80%
          '#121713'                   // 100%
        ]}
        locations={
          isReactNative
          ? [0, 0.08, 0.08, 0.3, 0.3, 0.52, 0.52, 0.74, 0.74, 0.96, 0.96, 1.18, 1.18, 1.38, 1.6]
          : [0, 0.08, 0.08, 0.2, 0.2, 0.32, 0.32, 0.44, 0.44, 0.56, 0.56, 0.68, 0.68, 0.80, 0.80, 1.00]
        }
      >
        <XStack items="center" justify="space-between" height={rem(50)} py={rem(10)} px={rem(5)}>
          <Image source={{ uri: tenantInfo.siteLogo }} objectFit='contain' height='100%' width={rem(140)} />
          
          <XStack gap={rem(10)}>
            <RippleButton onPress={() => console.log('Clicked!')} bg="$surfaceRaisedL2" height={rem(36)} aspectRatio={1} borderColor="$borderDefault" borderWidth={2} {...({ borderRadius: rem(4) } as any)}>
              <SvgXml xml={SVG.earth} width={rem(20)} height={rem(20)} color={theme.iconDefault?.get()} />
             </RippleButton>
            <RightSlideDialog />
          </XStack>
        </XStack>
      </LinearGradient>
    </YStack>
  );
};

export function RightSlideDialog() {
  const theme = useTheme()
  const { rem } = useResponsiveSize()
  const { screenSpace } = useStyleStore()

  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <RippleButton bg="$surfaceRaisedL2" height={rem(36)} aspectRatio={1} borderColor="$borderDefault" borderWidth={2} {...({ borderRadius: rem(4) } as any)}>
          <SvgXml xml={SVG.menu} width={rem(16)} height={rem(16)} color={theme.iconDefault?.get()} />
        </RippleButton>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
          animation="quick" // [slow, lazy, medium, slow, bouncy, tooltip, spin, 100ms]
          key="overlay"
          opacity={0.5}
        />
        <Dialog.Content
          p={rem(10)}
          animateOnly={screenSpace ? ['opacity'] : ['transform', 'opacity']}
          enterStyle={{ x: '100%', opacity: 0 }} // 从右边进入
          exitStyle={{ x: '100%', opacity: 0 }} // 向右边退出
          borderBottomLeftRadius={rem(12)}
          borderTopLeftRadius={rem(12)}
          position="absolute"
          animation="sheet"
          key="content"
          bg="$color2"
          width={rem(300)}
          opacity={1}
          scale={1}
          elevate
          r={screenSpace ? screenSpace : 0} // 定位在右边
          t={0}
          b={0}
          x={0}
          y={0}
        >
          {/* 对话框内容 */}
          <SidebarWidget />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}