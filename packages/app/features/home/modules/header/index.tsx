import { useTenantStore, usePlatformStore, useScreenSpace, useRem, useLanguageStore } from 'app/store'
import { useTheme, Image, XStack, YStack, Dialog, VisuallyHidden} from "tamagui"
import { LinearGradient } from 'tamagui/linear-gradient'
import { RippleButton } from '@my/ui/src/RippleButton'
import { SidebarWidget } from 'app/widgets/Sidebar'
import { useTranslation } from 'react-i18next'
import { setLanguage } from 'app/i18n/client'
import { useCallback, useState } from "react"
import { SvgXml } from 'react-native-svg'
import { Selection } from '@my/ui'
import { SVG } from '@my/assets'

/** 首页 Header 组件 */
export const HomeHeader = () => {
  const theme = useTheme()
  const isNative = usePlatformStore(state => state.isNative)
  const tenantInfo = useTenantStore(state => state.tenantInfo)
  const supportedLanguages = useLanguageStore(state => state.supportedLanguages)
  const rem = useRem()

  const { i18n } = useTranslation()
  const language = i18n.language

  /** 选择回调事件 */
  const onChange = useCallback((value: string) => {
    setLanguage(value)
  }, [])

  return (
    <YStack bg="$topNavSecondary">
      <LinearGradient
        start={[0, 0]}
        end={isNative ? [.8, 4] : [.1, .5]} // 近似125度角
        width="100%"
        colors={[
          'transparent',              // 8%
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
        ]}
        locations={[0.08, 0.08, 0.2, 0.2, 0.32, 0.32, 0.44, 0.44, 0.56, 0.56, 0.68, 0.68, 0.80]}
      >
        <XStack items="center" justify="space-between" height={rem(50)} py={rem(10)} px={rem(5)}>
          <Image source={{ uri: tenantInfo.siteLogo }} objectFit='contain' height='100%' width={rem(140)} />
          
          <XStack gap={rem(10)}>
            <Selection value={language} items={supportedLanguages} onChange={onChange}>
              <RippleButton asChild bg="$surfaceRaisedL2" height={rem(36)} aspectRatio={1} borderColor="$borderDefault" borderWidth={2} {...({ borderRadius: rem(4) } as any)}>
                <SvgXml xml={SVG.earth} width={rem(20)} height={rem(20)} color={theme.iconDefault?.get()} />
              </RippleButton>
            </Selection>
            <RightSlideDialog />
          </XStack>
        </XStack>
      </LinearGradient>
    </YStack>
  );
};

/** 右侧抽屉 */
export function RightSlideDialog() {
  const theme = useTheme()
  const screenSpace = useScreenSpace()
  const [open, setOpen] = useState(false)
  const rem = useRem()
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <RippleButton bg="$surfaceRaisedL2" height={rem(36)} aspectRatio={1} borderColor="$borderDefault" borderWidth={2} {...({ borderRadius: rem(4) } as any)}>
          <SvgXml xml={SVG.menu} width={rem(16)} height={rem(16)} color={theme.iconDefault?.get()} />
        </RippleButton>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay
          opacity={0.5}
          animation="100ms" // [slow, lazy, medium, slow, bouncy, tooltip, spin, 100ms]
          key="RightSlideOverlay"
          exitStyle={{ opacity: 0 }}
          enterStyle={{ opacity: 0 }}
        />
        <Dialog.Content
          animateOnly={screenSpace ? ['opacity'] : ['transform', 'opacity']}
          enterStyle={{ x: '100%', opacity: 0 }} // 从右边进入
          exitStyle={{ x: '100%', opacity: 0 }} // 向右边退出
          borderBottomLeftRadius={rem(12)}
          borderTopLeftRadius={rem(12)}
          borderBottomRightRadius={0}
          borderTopRightRadius={0}
          key="RightSlideContent"
          position="absolute"
          animation="100ms"
          width={rem(300)}
          bg="$color2"
          p={rem(10)}
          opacity={1}
          scale={1}
          elevate
          t={0}
          b={0}
          x={0}
          y={0}
          r={screenSpace ? screenSpace : 0} // 定位在右边
        >
          <VisuallyHidden>
            <Dialog.Title>title</Dialog.Title>
          </VisuallyHidden>
          {/* 对话框内容 */}
          <SidebarWidget />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}