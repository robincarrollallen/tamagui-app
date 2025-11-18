import { useRem } from 'app/store'
import { Animated, Easing } from 'react-native'
import { useRef, useEffect, memo } from "react"
import { Button, ButtonProps, Stack } from "tamagui"

interface ShimmerEffectProps {
  enabled: boolean
  interval?: number
  duration ?: number
}

/** 闪烁效果 */
const ShimmerEffect = memo(({ 
  enabled, 
  interval = 3000,
  duration  = 1500,
}: ShimmerEffectProps) => {
  const scaleAnim = useRef(new Animated.Value(0)).current
  const opacityAnim = useRef(new Animated.Value(1)).current
  const animationRef = useRef<Animated.CompositeAnimation | null>(null)

  useEffect(() => {
    if (!enabled) {
      if (animationRef.current) {
        animationRef.current.stop()
        animationRef.current = null
      }
      return
    }

    scaleAnim.setValue(0)
    opacityAnim.setValue(1)

    const createAnimation = () => {
      return Animated.sequence([
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 4,
            duration: duration,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration: duration,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
        Animated.delay(interval),
      ])
    }

    animationRef.current = Animated.loop(createAnimation())
    animationRef.current.start()

    return () => {
      if (animationRef.current) {
        animationRef.current.stop()
        animationRef.current = null
      }
    }
  }, [enabled, interval, scaleAnim, opacityAnim])

  if (!enabled) return null

  const animatedStyle = {
    transform: [{ scale: scaleAnim }, { rotate: '45deg' }],
    opacity: opacityAnim,
  }

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          bottom: 0,
          left: '-100%',
          width: '100%',
          aspectRatio: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          zIndex: 1,
        },
        animatedStyle,
      ]}
    />
  )
})

interface ShimmerButtonProps extends ButtonProps {
  enableShimmer?: boolean
  shimmerInterval?: number
}

export const ShimmerButton = memo(({ 
  children, 
  enableShimmer = false,
  shimmerInterval = 3000,
  ...props 
}: ShimmerButtonProps) => {
  const rem = useRem()

  return (
    <Stack position="relative" overflow="hidden" width="100%" style={{ borderRadius: rem(6) }}>
      <Button
        width="100%"
        borderWidth={0}
        height={rem(48)}
        bg="$activePrimary"
        disabledStyle={{ bg: "$disabled" }}
        hoverStyle={{ bg: "$activeActive" }}
        pressStyle={{ bg: "$surfaceRaisedL2" }}
        {...props}
      >
        {children}
      </Button>
      
      {enableShimmer && <ShimmerEffect enabled={enableShimmer} interval={shimmerInterval} />}
    </Stack>
  )
})