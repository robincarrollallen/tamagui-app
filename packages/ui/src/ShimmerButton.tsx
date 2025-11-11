import { useRem } from 'app/store'
import { useState, useEffect, memo } from "react"
import { Button, ButtonProps, Stack } from "tamagui"

interface ShimmerEffectProps {
  enabled: boolean
  interval?: number
}

/** 闪烁效果 */
const ShimmerEffect = memo(({ 
  enabled, 
  interval = 3000 
}: ShimmerEffectProps) => {
  const [animationKey, setAnimationKey] = useState(0)

  useEffect(() => {
    if (!enabled) return

    const intervalId = setInterval(() => {
      setAnimationKey(prev => prev + 1)
    }, interval)
    
    return () => clearInterval(intervalId)
  }, [enabled, interval])

  if (!enabled) return null

  return (
      <Stack
        key={animationKey}
        animateOnly={['transform', 'opacity']}
        position="absolute"
        b={0}
        width="100%"
        aspectRatio={1}
        rotate={`45deg`}
        bg="rgba(255,255,255, 0.8)"
        x={"-100%"}
        z={1}
        scale={4}
        opacity={0}
        animation="shimmer"
        enterStyle={{ scale: 0, opacity: 1 }}
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