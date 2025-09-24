'use client'

import { BlurView } from 'expo-blur'
import { X, SquareUser, KeyRound} from '@tamagui/lucide-icons'
import { useTenantStore } from 'app/store'
import { useResponsiveSize } from 'app/hooks/ResponsiveSize'
import { statusSelectors, useStatusStore } from '../../store/modules/status'
import { useToastController, Image, Sheet, XStack, YStack, Anchor, SizableText, Field } from '@my/ui'
import { useState } from 'react'

export function LoginScreen() {
  const { loginScreenVisible, hideLoginPopup, showRegisterPopup, showLoginPopup } = useStatusStore()
  const { tenantInfo } = useTenantStore()
  const { rem } = useResponsiveSize()
  const toast = useToastController()
  const isLogin = statusSelectors.isLogin(useStatusStore.getState())
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')

  return (
    <>
      <Sheet
        modal={false} // 是否模态框(全屏)
        snapPoints={[100]} // 弹窗高度(%)
        animation="medium" // 动画效果
        disableDrag={true} // 禁止拖拽手势
        open={loginScreenVisible} // 登录弹窗是否显示
        dismissOnSnapToBottom={false} // 禁止向下滑动关闭
        dismissOnOverlayPress={false} // 禁止点击遮罩关闭
      >
        <Sheet.Overlay
          bg="$shadow4"
          animation="lazy"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        >
          <BlurView
            intensity={40}
            tint="dark"
            style={{
              flex: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.1)', // 轻微背景色
            }}
          />
        </Sheet.Overlay>
        <Sheet.Handle bg="transparent" margin={0} width="100%" height={rem(100)}>
          <XStack width="100%" justify="space-between" items="flex-start" p={rem(10)}>
            <Image source={{ uri: tenantInfo.siteLogo }} objectFit='contain' height={rem(30)} width={rem(130)} />
            <YStack height={rem(30)} bg="$textWeakest" p={rem(5)} style={{ borderRadius: rem(15) }}>
              <X
                color="$iconDefault"
                onPress={() => {
                  hideLoginPopup()
                  toast.show('Sheet closed!', {
                    message: 'Just showing how toast works...',
                  })
                }}
              />
            </YStack>
          </XStack>
        </Sheet.Handle>
        <Sheet.Frame pt={rem(2)} borderTopLeftRadius={rem(20)} borderTopRightRadius={rem(20)} bg="$iconDefault">
          <YStack height="100%" width="100%" items="flex-start" px={rem(16)} bg="$surfaceRaisedL1" borderTopLeftRadius={rem(19)} borderTopRightRadius={rem(19)}>
            <YStack pt={rem(40)} pb={rem(32)}>
              { isLogin
                ? <SizableText text="center" fontSize={rem(24)} fontWeight="bold">Log in to your account</SizableText>
                : <SizableText text="center" fontSize={rem(24)} fontWeight="bold">Create a game account</SizableText>
              }
              <XStack gap="$3" style={{ fontSize: rem(14) }}>
                { isLogin
                  ? <SizableText color="$textWeaker" fontWeight="bold">Don't have an account?</SizableText>
                  : <SizableText color="$textWeaker" fontWeight="bold">Already have an account?</SizableText>
                }
                { isLogin
                  ? <Anchor color="$textHighlight" onPress={showRegisterPopup}>Register</Anchor>
                  : <Anchor color="$textHighlight" onPress={showLoginPopup}>Login</Anchor>
                }
              </XStack>
            </YStack>
            <Field value={account} onChangeText={setAccount} placeholder="Username" type="account" error required label={<SquareUser color="$textWeaker" />} />
            <Field value={password} onChangeText={setPassword} placeholder="Password" type="password" error required label={<KeyRound color="$textWeaker" />} />
          </YStack>
        </Sheet.Frame>
      </Sheet>
    </>
  )
}
