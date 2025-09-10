import { useState, useEffect } from 'react'

interface ResponsiveSizeOptions {
  baseWidth?: number
  minScale?: number
  maxScale?: number
}

// 更安全的平台检测
const isWeb = typeof window !== 'undefined' && typeof window.document !== 'undefined'

export function useResponsiveSize(options: ResponsiveSizeOptions = {}) {
  const { baseWidth = 375, minScale = 0.8, maxScale = 1.2 } = options
  
  const getInitialDimensions = () => {
    if (isWeb) {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      }
    } else {
      try {
        // 延迟导入，避免 Web 环境报错
        const { Dimensions } = require('react-native')
        return Dimensions.get('window')
      } catch {
        return { width: baseWidth, height: 667 }
      }
    }
  }
  
  const [dimensions, setDimensions] = useState(getInitialDimensions)
  
  useEffect(() => {
    if (isWeb) {
      const handleResize = () => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }
      
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    } else {
      try {
        const { Dimensions } = require('react-native')
        const subscription = Dimensions.addEventListener('change', ({ window }) => {
          setDimensions(window)
        })
        
        return () => subscription?.remove()
      } catch {
        // 静默处理错误
      }
    }
  }, [])
  
  const scale = Math.min(Math.max(dimensions.width / baseWidth, minScale), maxScale)
  const rem = (size: number) => Math.round(size * scale)
  
  const screenInfo = {
    width: dimensions.width,
    height: dimensions.height,
    scale,
    isSmallScreen: dimensions.width < 350,
    isMediumScreen: dimensions.width >= 350 && dimensions.width < 768,
    isLargeScreen: dimensions.width >= 768,
  }
  
  return {
    rem,
    scale,
    screenInfo,
    spacing: {
      xs: rem(4),
      sm: rem(8),
      md: rem(16),
      lg: rem(24),
      xl: rem(32),
    }
  }
}