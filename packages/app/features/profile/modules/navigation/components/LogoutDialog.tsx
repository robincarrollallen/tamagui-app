import { useRem } from 'app/store'
import { delay } from 'app/utils/time'
import { Loader } from '@tamagui/lucide-icons'
import { Animated, Easing, StyleSheet } from 'react-native'
import { AlertDialog, Button, XStack, YStack } from 'tamagui'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'

export const LogoutDialog = memo(({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) => {
  const rem = useRem()

  /** 退出登录回调事件 */
  const onLogout = useCallback(async () => {
    setOpen(false)
  }, [])

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          key="overlay"
          opacity={0.5}
          animation="100ms"
          exitStyle={{ opacity: 0 }}
          enterStyle={{ opacity: 0 }}
        />
        <AlertDialog.Content
          x={0}
          y={0}
          elevate
          bordered
          scale={1}
          opacity={1}
          key="content"
          borderWidth={0}
          width={rem(366)}
          bg="$surfaceRaisedL1"
          borderColor="transparent"
          borderTopLeftRadius={rem(10)}
          borderTopRightRadius={rem(10)}
          borderBottomLeftRadius={rem(10)}
          borderBottomRightRadius={rem(10)}
          animateOnly={['opacity', 'transform']}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          animation={[
            '100ms',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
        >
          <YStack gap={rem(32)}>
            <AlertDialog.Title fontSize={rem(24)} fontWeight="bold" text={"center" as any}>Log out</AlertDialog.Title>
            <AlertDialog.Description color="$textWeaker" text={"center" as any}>
              Are you sure you want to log out?
            </AlertDialog.Description>
            <XStack gap={rem(10)}>
              <AlertDialog.Cancel asChild>
                <Button flex={1} bg="$surfaceRaisedL2" aspectRatio={3/1}>Cancel</Button>
              </AlertDialog.Cancel>
              <LogoutButton onLogout={onLogout} />
            </XStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  )
})

/** 加载中图标 */
const LoadingIcon = memo(({ size = 24 }: { size?: number }) => {
  const spinAnim = useRef(new Animated.Value(0)).current // 创建动画值

  useEffect(() => {
    // 设置无限循环动画
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,  // 线性缓动，保证旋转匀速
        useNativeDriver: true,   // 使用原生驱动，性能最佳
      })
    ).start()
  }, [spinAnim])

  // 插值：0 -> 1 转换为 0deg -> 360deg
  const rotate = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  return (
    <Animated.View
      style={{
        transform: [{ rotate }],
      }}
    >
      <Loader size={size} color="$color" />
    </Animated.View>
  )
})

/** 退出登录按钮 */
const LogoutButton = memo(({ onLogout }: { onLogout: () => void }) => {
  const [loading, setLoading] = useState(false)

  const styles = useMemo(() => StyleSheet.create({
    buttonDisabled: {
      opacity: 0.5
    }
  }), [])

  /** 点击事件回调 */
  const onPress = useCallback(async () => {
    setLoading(true)
    await delay(2000)
    onLogout()
  }, [])
  
  return (
    <Button flex={1} bg="$gradientsPrimaryB" disabledStyle={styles.buttonDisabled} disabled={loading} icon={loading ? LoadingIcon : undefined} aspectRatio={3/1} onPress={onPress}>Logout</Button>
  )
})