import { useStyleStore } from 'app/store/modules/style'
import { MOBILE_MAX_WIDTH } from 'app/constant'
import { throttle } from 'app/utils/library'
import { useState, useEffect } from 'react'
import { isWeb } from '@my/ui'

interface ResponsiveSizeOptions {
  baseWidth?: number
  minScale?: number
  maxScale?: number
}

export function useResponsiveSize(options: ResponsiveSizeOptions = {}) {
  const { baseWidth = 390, minScale = 0.8, maxScale = 1.2 } = options
  
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
        if (window.innerWidth > MOBILE_MAX_WIDTH) {
          useStyleStore.setState({ screenSpace: (window.innerWidth - MOBILE_MAX_WIDTH) / 2 })
        } else {
          useStyleStore.setState({ screenSpace: 0 })
        }
      }

      const throttledResize = throttle(handleResize, 100)

      handleResize()
      window.addEventListener('resize', throttledResize)
      return () => window.removeEventListener('resize', throttledResize)
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