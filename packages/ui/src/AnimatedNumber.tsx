'use client'

import { Text, TextProps } from 'tamagui'
import { useState, useEffect, useRef } from 'react'

interface AnimatedNumberProps extends TextProps {
  value?: number
  duration?: number
  decimal?: number
  format?: boolean
}

export function AnimatedNumber({ value = 0, duration = 2000, decimal = 0, format = true, ...props }: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(value)
  const frameRef = useRef<number>(0)
  const startValueRef = useRef(value)

  useEffect(() => {
    const startValue = startValueRef.current
    const targetValue = value

    if (startValue === targetValue) return // 如果目标值没有变化，不需要动画

    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress) // 缓动函数 - easeOutExpo
      
      const currentValue = startValue + (targetValue - startValue) * easeOutExpo

      const roundedValue = decimal > 0 ? Number(currentValue.toFixed(decimal)) : Math.floor(currentValue)
      
      setDisplayValue(roundedValue)
      
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      } else {
        startValueRef.current = targetValue // 动画结束时更新起始值引用
      }
    }
    
    frameRef.current = requestAnimationFrame(animate)
    
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [value, duration])

  return (
    <Text {...props}>
      {format ? displayValue.toLocaleString() : displayValue}
    </Text>
  )
}