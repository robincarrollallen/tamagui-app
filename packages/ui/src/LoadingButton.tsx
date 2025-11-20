import { memo, useMemo, useRef, useEffect } from 'react'
import { Animated, Easing } from 'react-native'
import { Loader } from '@tamagui/lucide-icons'
import { Button, ButtonProps } from 'tamagui'
import { StyleSheet } from 'react-native'
import { useSizeTokens } from 'app/store'

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean
  iconSize?: number
  onPress: () => void
}

export const LoadingButton = memo(({
  onPress,
  children,
  color="$textInverse",
  bg="$gradientsPrimaryB",
  disabled = false,
  loading = false,
  iconSize = 24,
  ...props
}: LoadingButtonProps) => {
  const size = useSizeTokens()

  const styles = useMemo(() => StyleSheet.create({
    buttonDisabled: {
      opacity: 0.5
    }
  }), [])
  
  return (
    <Button
      bg={bg}
      color={color}
      onPress={onPress}
      disabled={disabled || loading}
      borderTopLeftRadius={size[6]}
      borderTopRightRadius={size[6]}
      borderBottomLeftRadius={size[6]}
      borderBottomRightRadius={size[6]}
      disabledStyle={styles.buttonDisabled}
      icon={loading ? <LoadingIcon iconSize={iconSize} /> : undefined}
      {...props}
    >
      {children}
    </Button>
  )
})

const LoadingIcon = memo(({ iconSize = 24 }: { iconSize?: number }) => {
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
      <Loader size={iconSize} color="$color" />
    </Animated.View>
  )
})