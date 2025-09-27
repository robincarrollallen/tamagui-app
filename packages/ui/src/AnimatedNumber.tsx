'use client'

import { Text, TextProps } from 'tamagui'
import { useState, useEffect, useRef } from 'react'

interface AnimatedNumberProps extends TextProps {
  targetValue?: number
  duration?: number
}

export function AnimatedNumber({ targetValue = 0, duration = 2000, ...props }: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(targetValue)
  const frameRef = useRef<number>(0)
  const startValueRef = useRef(targetValue)

  useEffect(() => {
    const startValue = startValueRef.current
    const endValue = targetValue

    if (startValue === endValue) return // 如果目标值没有变化，不需要动画

    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress) // 缓动函数 - easeOutExpo
      
      const currentValue = startValue + (endValue - startValue) * easeOutExpo
      const roundedValue = Math.floor(currentValue)
      
      setDisplayValue(roundedValue)
      
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      } else {
        startValueRef.current = endValue // 动画结束时更新起始值引用
      }
    }
    
    frameRef.current = requestAnimationFrame(animate)
    
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [targetValue, duration])

  return (
    <Text {...props}>
      {displayValue}
    </Text>
  )
}