'use client'

import { BlurView } from 'expo-blur'
import { delay } from 'app/utils/time'
import { useMemo, useState } from 'react'
import { useSizeTokens, useTenantStore, useUserStore } from 'app/store'
import { statusSelectors, useStatusStore } from '../../store'
import { X, SquareUser, KeyRound} from '@tamagui/lucide-icons'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { useToastController, Field, LoadingButton, Segment } from '@my/ui'
import { Image, Sheet, XStack, YStack, Anchor, SizableText, Stack, useTheme } from 'tamagui'
import userInfoData from 'app/data/userInfo.json'
import loginInfo from 'app/data/loginInfo.json'

const tabs = [
  { label: 'Account', value: 0 },
  { label: 'Phone', value: 1 },
]

export function LoginScreen() {
  const { tenantInfo } = useTenantStore() // 租户信息
  const [account, setAccount] = useState('') // 账号
  const [password, setPassword] = useState('') // 密码
  const [activeTab, setActiveTab] = useState(0) // 账号类型
  const [loginLoading, setLoginLoading] = useState(false) // 登录加载中
  const [accountValid, setAccountValid] = useState(false) // 账号验证成功
  const [passwordValid, setPasswordValid] = useState(false) // 密码验证成功
  const { loginScreenVisible, hideLoginPopup, showRegisterPopup, showLoginPopup } = useStatusStore() // 状态管理
  const isLogin = statusSelectors.isLogin(useStatusStore.getState()) // 是否登录
  const toast = useToastController() // 提示框
  const safeArea = useSafeArea() // 安全区域
  const rem = useSizeTokens() // 响应式尺寸
  const theme = useTheme() // 主题
  
  /** 账号类型切换 */
  const handleTabChange = (value: number) => {
    setActiveTab(value)
  }

  /** 账号验证成功 */
  const handleAccountValidate = (value: boolean) => {
    setAccountValid(value)
  }

  /** 密码验证成功 */
  const handlePasswordValidate = (value: boolean) => {
    setPasswordValid(value)
  }

  /** 登录信息验证 */
  const loginValid = useMemo(() => {
    return accountValid && passwordValid && account && password
  }, [accountValid, passwordValid, account, password])

  /** Login handler */
  const loginHandler = async () => {
    setLoginLoading(true)
    try {
      await delay(1000)
      const res = loginInfo

      if (res.token) {
        useUserStore.getState().setToken(res.token) // 设置 token
        useUserStore.getState().setUserInfo(userInfoData) // 更新用户信息
        useStatusStore.getState().hideLoginPopup()
      }
    }
    catch (error) {
      console.error("Login failed:", error) // 添加错误处理
    }
    finally {
      setTimeout(() => {
        setAccount('') // 清空账号
        setPassword('') // 清空密码
        setLoginLoading(false)
      }, 500)
    }
  }

  return (
    <>
      <Sheet
        modal={false} // 是否模态框(全屏)
        animation="sheet" // 动画效果
        snapPoints={[100]} // 弹窗高度(%)
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
        {/* 头部/关闭按钮 */}
        <Sheet.Handle bg="transparent" margin={0} width="100%" height={rem[100]} pt={safeArea.top}>
          <XStack width="100%" justify="space-between" items="flex-start" p={rem[10]}>
            <Image source={{ uri: tenantInfo.siteLogo }} objectFit='contain' height={rem[30]} width={rem[130]} />
            <YStack height={rem[30]} bg="$textWeakest" p={rem[5]} style={{ borderRadius: rem[15] }}>
            <Stack
              pressStyle={{ opacity: 0.6 }}
              cursor="pointer"
              onPress={() => {
                hideLoginPopup()
                toast.show('Sheet closed!', {
                  message: 'Just showing how toast works...',
                })
              }}
            >
              <X color="$iconDefault"/>
            </Stack>
            </YStack>
          </XStack>
        </Sheet.Handle>
        {/* 内容 */}
        <Sheet.Frame
          pt={rem[2]}
          px={rem[12]}
          borderTopLeftRadius={rem[20]}
          borderTopRightRadius={rem[20]}
          bg="$surfaceRaisedL1"
          style={{ boxShadow: `0 ${-rem[3]}px 0 0 ${theme.iconDefault.get()}` }}
        >
            {/* 标题 */}
            <YStack gap={rem[4]} pt={rem[40]} pb={rem[32]}>
              { isLogin
                ? <SizableText fontSize={rem[24]} fontWeight="bold">Log in to your account</SizableText>
                : <SizableText fontSize={rem[24]} fontWeight="bold">Create a game account</SizableText>
              }
              <XStack gap="$3" style={{ fontSize: rem[14] }}>
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
            {/* 账号类型切换 */}
            <XStack width="100%" pb={rem[20]} justify="center">
              <Segment
                block
                shrink
                tabs={tabs}
                height={rem[32]}
                fontSize={rem[12]}
                active={activeTab}
                bg="$surfaceLowered"
                activeTextWeight="700"
                borderTopLeftRadius={rem[6]}
                borderTopRightRadius={rem[6]}
                activeColor="$surfaceRaisedL2"
                onValueChange={handleTabChange}
                borderBottomLeftRadius={rem[6]}
                borderBottomRightRadius={rem[6]}
                activeTextColor="$borderSelected"
              />
            </XStack>
            {/* 表单 */}
            <Field value={account} onValidate={handleAccountValidate} onChangeText={setAccount} placeholder="Username" type="account" error required label={<SquareUser color="$textWeaker" />} />
            <Field value={password} onValidate={handlePasswordValidate} onChangeText={setPassword} placeholder="Password" type="password" error required label={<KeyRound color="$textWeaker" />} />
            {/* 按钮 */}
            <LoadingButton loading={loginLoading} disabled={!loginValid} onPress={loginHandler}>Login</LoadingButton>
        </Sheet.Frame>
      </Sheet>
    </>
  )
}
