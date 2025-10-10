import { Button, ButtonProps, Stack, AnimatePresence } from "tamagui"
import { useState, useEffect } from "react"
import { useResponsiveSize } from "app/hooks/ResponsiveSize"

interface ShimmerButtonProps extends ButtonProps {
  enableShimmer?: boolean
  shimmerInterval?: number
}

export const ShimmerButton = ({ 
  children, 
  enableShimmer = false,
  shimmerInterval = 3000,
  ...props 
}: ShimmerButtonProps) => {
  const { rem } = useResponsiveSize()
  const [shimmerKey, setShimmerKey] = useState(0)

  useEffect(() => {
    if (!enableShimmer) return

    const interval = setInterval(() => {
      setShimmerKey(prev => prev + 1)
    }, shimmerInterval)

    return () => clearInterval(interval)
  }, [enableShimmer, shimmerInterval])

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
      
      {enableShimmer && (
        <AnimatePresence>
          <Stack
            key={shimmerKey}
            position="absolute"
            t={0}
            width="100%"
            height="100%"
            transform={[{ skewX: `-45deg` }]}
            bg="rgba(255,255,255, 0.8)"
            z={1}
            enterStyle={{
              scale: 1,
              opacity: 1,
            }}
            exitStyle={{
              scale: 5,
              opacity: 0
            }}
            animation="shimmer"
            x={"-120%"}
          />
        </AnimatePresence>
      )}
    </Stack>
  )
}