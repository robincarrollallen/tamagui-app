import { useEffect, useRef, useState, useCallback } from 'react'
import { Animated, Platform } from 'react-native'
import { styled, XStack, useTheme } from 'tamagui'

interface MarqueeProps {
  children: React.ReactNode
  speed?: number
  direction?: 'left' | 'right'
  pauseOnHover?: boolean
  gradient?: boolean
  gradientColor?: string
  gap?: number
  clone?: boolean
}

const MarqueeWrapper = styled(XStack, {
  overflow: 'hidden',
  width: '100%',
  position: 'relative',
})

const GradientOverlay = styled(XStack, {
  position: 'absolute',
  t: 0,
  b: 0,
  z: 1,
  pointerEvents: 'none',
})

export function MarqueeComponent({
  children,
  speed = 50,
  direction = 'left',
  pauseOnHover = true,
  gradient = false,
  gradientColor,
  gap = 20,
  clone = true,
}: MarqueeProps) {
  const theme = useTheme()
  const animatedValue = useRef(new Animated.Value(0)).current
  const [contentWidth, setContentWidth] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const animationRef = useRef<Animated.CompositeAnimation | null>(null)

  const onContentLayout = useCallback((event: any) => {
    const { width } = event.nativeEvent.layout
    setContentWidth(width)
  }, [])

  const onContainerLayout = useCallback((event: any) => {
    const { width } = event.nativeEvent.layout
    setContainerWidth(width)
  }, [])

  const startAnimation = useCallback(() => {
    if (contentWidth <= containerWidth && !clone) return

    const totalWidth = clone ? contentWidth * 2 + gap : contentWidth + containerWidth
    const duration = (totalWidth / speed) * 1000
    const startValue = direction === 'left' ? 0 : -contentWidth - gap
    const endValue = direction === 'left' ? -contentWidth - gap : 0

    animatedValue.setValue(startValue)
    
    animationRef.current = Animated.loop(
      Animated.timing(animatedValue, {
        toValue: endValue,
        duration,
        useNativeDriver: true,
      })
    )
    
    if (!isPaused) {
      animationRef.current.start()
    }
  }, [contentWidth, containerWidth, speed, direction, gap, clone, isPaused])

  useEffect(() => {
    if (animationRef.current) {
      if (isPaused) {
        animationRef.current.stop()
      } else {
        startAnimation()
      }
    }
  }, [isPaused, startAnimation])

  useEffect(() => {
    if (contentWidth > 0 && containerWidth > 0) {
      startAnimation()
    }
    
    return () => {
      if (animationRef.current) {
        animationRef.current.stop()
      }
    }
  }, [startAnimation])

  const hoverProps = Platform.OS === 'web' && pauseOnHover ? {
    onMouseEnter: () => setIsPaused(true),
    onMouseLeave: () => setIsPaused(false),
  } : {}

  const gradientStyle = gradient ? {
    background: `linear-gradient(90deg, ${gradientColor || theme.background.val} 0%, transparent 10%, transparent 90%, ${gradientColor || theme.background.val} 100%)`,
  } : {}

  return (
    <MarqueeWrapper onLayout={onContainerLayout} {...hoverProps}>
      <Animated.View
        style={{
          transform: [{ translateX: animatedValue }],
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <XStack onLayout={onContentLayout} gap={gap}>
          {children}
        </XStack>
        {clone && (
          <XStack ml={gap}>
            {children}
          </XStack>
        )}
      </Animated.View>
      
      {gradient && Platform.OS === 'web' && (
        <GradientOverlay
          l={0}
          r={0}
          style={gradientStyle}
        />
      )}
    </MarqueeWrapper>
  )
}