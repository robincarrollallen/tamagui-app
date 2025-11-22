import { ComponentProps, forwardRef, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Pressable, Animated, StyleSheet, LayoutChangeEvent } from 'react-native'
import { Stack, styled, isWeb, Text } from 'tamagui'
import type { View } from 'react-native'

// 单个波纹效果
interface Ripple {
  x: number
  y: number
  id: number
  animated: Animated.Value
  scale: Animated.AnimatedInterpolation<number>    // ✅ 预创建
  opacity: Animated.AnimatedInterpolation<number>  // ✅ 预创建
}

// 组件类型定义
export type RippleButtonProps = Omit<ComponentProps<typeof StyledButton>, 'children'> & {
  children?: ReactNode | string
  rippleColor?: string
  rippleDuration?: number
  rippleOpacity?: number
  onPress?: () => void
  asChild?: boolean
  disabled?: boolean
  maxRipples?: number
  fontSize?: number
  fontWeight?: string | number
}

/** 按钮样式 */
const StyledButton = styled(Stack, {
  name: 'RippleButton',
  position: 'relative',
  overflow: 'hidden',
  bg: '$blue10',
  items: 'center',
  justify: 'center',
  cursor: 'pointer',
  
  hoverStyle: {
    background: 'rgba(255, 255, 255, 0.1)',
  },
  
  variants: {
    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },
  } as const,
})

/** 波纹按钮(使用 forwardRef 转发 ref) */
export const RippleButton = forwardRef<View, RippleButtonProps>(
  (
    {
      children,
      rippleColor = '#FFF',
      rippleDuration = 600,
      rippleOpacity = 0.3,
      onPress,
      disabled,
      maxRipples = 1,
      asChild= false,
      fontSize = 14,
      fontWeight = 'bold',
      ...props
    },
    ref // 接收转发的 ref
  ) => {
    const [ripples, setRipples] = useState<Ripple[]>([])
    const [layout, setLayout] = useState({ width: 0, height: 0 })
    const activeAnimations = useRef<Animated.CompositeAnimation[]>([])
    const rippleCount = useRef(0)

    useEffect(() => {
      return () => {
        activeAnimations.current.forEach(anim => anim.stop())
        activeAnimations.current = []
      }
    }, [])

    const handleLayout = useCallback((event: LayoutChangeEvent) => {
      const { width, height } = event.nativeEvent.layout
      setLayout({ width, height })
    }, [])

    const maxRadius = useMemo(
      () => Math.sqrt(Math.pow(layout.width, 2) + Math.pow(layout.height, 2)),
      [layout.width, layout.height]
    )

    /** 按下时添加波纹 */
    const handlePressIn = useCallback((event: any) => {
      if (disabled) return

      const { locationX, locationY } = event.nativeEvent
      const animatedValue = new Animated.Value(0)
      
      const newRipple: Ripple = {
        id: rippleCount.current++,
        x: locationX || layout.width / 2,
        y: locationY || layout.height / 2,
        animated: animatedValue,
        scale: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, maxRadius / 25],
        }),
        opacity: animatedValue.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [rippleOpacity as number, rippleOpacity as number * 0.5, 0],
        }),
      }

      setRipples(prev => {
        const updated = [...prev, newRipple]
        if (updated.length > (maxRipples as number) * 2) {
          return updated.slice(-maxRipples)
        }
        return updated
      })

      const animation = Animated.timing(newRipple.animated, {
        toValue: 1,
        duration: rippleDuration as number,
        useNativeDriver: !isWeb,
      })

      activeAnimations.current.push(animation)

      animation.start(() => {
        activeAnimations.current = activeAnimations.current.filter(a => a !== animation)
        /** 延迟执行，避免执行时获取不到Store (比 Promise.resolve().then() 更直接, 比 setTimeout(0) 更快) */
        queueMicrotask(() => {
          setRipples(prev => prev.filter(r => r.id !== newRipple.id))
        })
      })
    }, [disabled, layout.width, layout.height, maxRipples, rippleDuration, rippleOpacity, maxRadius])

    const handlePress = useCallback(() => {
      if (disabled) return
      (onPress as () => void)?.()
    }, [disabled, onPress])

    return (
      <Pressable
        ref={ref} // ✅ 将 ref 转发到 Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        disabled={disabled as boolean}
        style={{ position: 'relative' }}
        pointerEvents={asChild ? 'none' : 'auto'}
      >
        <StyledButton
          onLayout={handleLayout}
          pointerEvents="none"
          disabled={disabled as boolean}
          {...props}
        >
          {/* 波纹容器 */}
          <Stack
            t={0}
            l={0}
            r={0}
            b={0}
            overflow="hidden"
            position="absolute"
          >
            {ripples.map((ripple) => {
              return (
                <Animated.View
                  key={ripple.id}
                  style={[
                    rippleStyles.ripple,
                    {
                      backgroundColor: rippleColor as string,
                      left: ripple.x - 25,
                      top: ripple.y - 25,
                      opacity: ripple.opacity,
                      transform: [{ scale: ripple.scale }],
                    },
                  ]}
                />
              )
            })}
          </Stack>

          {/* 按钮内容 */}
          {typeof children === 'string' ? <Text fontSize={fontSize as number} fontWeight={fontWeight as any}>{children}</Text> : children}
        </StyledButton>
      </Pressable>
    )
  }
)

/** 波纹样式 */
const rippleStyles = StyleSheet.create({
  ripple: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
})

RippleButton.displayName = 'RippleButton'