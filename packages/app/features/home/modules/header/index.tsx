import { useTheme, Image, Button, XStack, YStack, Dialog} from "tamagui";
import { useResponsiveSize } from 'app/hooks/ResponsiveSize'
import { LinearGradient } from 'tamagui/linear-gradient'
import { useTenantStore } from 'app/store'
import { SvgXml } from 'react-native-svg'
import { SVG } from '@my/assets'

/** 首页 Header 组件 */
export const HomeHeader = () => {
  const theme = useTheme()
  const { rem } = useResponsiveSize()
  const { tenantInfo } = useTenantStore()

  return (
    <YStack style={{ backgroundColor: '#121713' }}>
      <LinearGradient
        end={[0.45, 1]} // 近似125度角
        start={[0, 0]}
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
        locations={[0, 0.08, 0.08, 0.3, 0.3, 0.52, 0.52, 0.74, 0.74, 0.96, 0.96, 1.18, 1.18, 1.38, 1.6]}
      >
        <XStack items="center" justify="space-between" height={rem(50)} py={rem(10)} px={rem(5)}>
          <Image source={{ uri: tenantInfo.siteLogo }} objectFit='contain' height='100%' width={rem(140)} />
          
          <XStack gap={rem(10)}>
            <Button chromeless bg="$surfaceRaisedL2" height={rem(36)} variant="outlined" aspectRatio={1} borderColor="$borderDefault" {...({ borderRadius: rem(4) } as any)}>
              <SvgXml xml={SVG.earth} width={rem(20)} height={rem(20)} color={theme.iconDefault?.get()}/>
            </Button>
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

  return (
    <Dialog>
      <Dialog.Trigger asChild>
      <Button chromeless bg="$surfaceRaisedL2" height={rem(36)} variant="outlined" aspectRatio={1} borderColor="$borderDefault" {...({ borderRadius: rem(4) } as any)}>
        <SvgXml xml={SVG.menu} width={rem(16)} height={rem(16)} color={theme.iconDefault?.get()} />
      </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay 
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
          animation="quick"
          key="overlay"
          opacity={0.5}
        />
        <Dialog.Content
          animateOnly={['transform', 'opacity']}
          enterStyle={{ x: '100%', opacity: 0 }} // 从右边进入
          exitStyle={{ x: '100%', opacity: 0 }} // 向右边退出
          borderBottomLeftRadius={rem(12)}
          borderTopLeftRadius={rem(12)}
          position="absolute"
          animation="100ms"
          key="content"
          bg="$color2"
          width="80%"
          opacity={1}
          scale={1}
          elevate
          r={0} // 定位在右边
          t={0}
          b={0}
          x={0}
        >
          {/* 对话框内容 */}
          <Dialog.Title>标题</Dialog.Title>
          <Dialog.Description>描述内容</Dialog.Description>
          <XStack gap="$3" justify="flex-end">
            <Dialog.Close asChild>
              <Button variant="outlined">取消</Button>
            </Dialog.Close>
            <Button>确认</Button>
          </XStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}