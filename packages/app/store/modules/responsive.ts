import { isWeb } from 'tamagui'
import { useMemo } from 'react'
import { create } from 'zustand'
import { Dimensions } from 'react-native'
import { throttle } from 'app/utils/library'
import { createPersistStore } from '../middleware/persist'
import { MOBILE_DESIGN_WIDTH, MOBILE_MAX_WIDTH } from 'app/constant'
import type { BaseStore } from '../types'

interface ResponsiveState extends BaseStore {
  screenWidth: number
  screenHeight: number
  spacing: {
    xs: number
    sm: number
    md: number
    lg: number
    xl: number
  }
}

const initialState = {
  screenWidth: 0,
  screenHeight: 0,
  spacing: {
    xs: 0,
    sm: 0,
    md: 0,
    lg: 0,
    xl: 0,
  },
  _hasHydrated: false,
}

export const useResponsiveStore = create<ResponsiveState>()(
  createPersistStore(
    (set, get) => ({
      ...initialState,
    
      setHasHydrated: (hasHydrated: boolean) =>  set({ _hasHydrated: hasHydrated }),

      reset: () => set(initialState),
    }),
    {
      name: 'responsive-store',
      onRehydrateStorage: (_state) => {
        return (state, error) => {
          if (!error && state) {
            if (!state._hasHydrated) {
              initResponsive()
            }
            state.setHasHydrated(true)
          }
        }
      },
    }
  )
)

/** 初始化响应式 */
function initResponsive() {
  /** 延迟执行，避免执行时获取不到Store (比 Promise.resolve().then() 更直接, 比 setTimeout(0) 更快) */
  queueMicrotask(() => {
    if (isWeb) {
      const handleResize = throttle(() => {
        useResponsiveStore.setState({ screenWidth: window.innerWidth, screenHeight: window.innerHeight })
      }, 100)
      handleResize()
      window.addEventListener('resize', handleResize)
    } else {
      try {
        const window = Dimensions.get('window')
        useResponsiveStore.setState({ screenWidth: window.width, screenHeight: window.height })
        Dimensions.addEventListener('change', ({ window }) => {
          useResponsiveStore.setState({ screenWidth: window.width, screenHeight: window.height })
        })
      } catch {
        // 静默处理错误
      }
    }
  })
}

/** 响应式大小计算器 */
const remCalculator = (size: number) => {
  const screenWidth = useResponsiveStore.getState().screenWidth
  const resultWidth = screenWidth > MOBILE_MAX_WIDTH ? MOBILE_MAX_WIDTH : screenWidth
  const scale = resultWidth / MOBILE_DESIGN_WIDTH
  return Math.round(size * scale)
}

/** 响应式大小 */
export const useRem = () => {
  useResponsiveStore(state => state.screenWidth)
  return remCalculator
}

/** 屏幕与内容间距 */
export const useScreenSpace = () => {
  return useResponsiveStore((state) => {
    const width = state.screenWidth
    return width > MOBILE_MAX_WIDTH ? (width - MOBILE_MAX_WIDTH) / 2 : 0
  })
}

/** 响应式元素属性大小Token */
export const useSizeTokens = () => {
  const rem = useRem()
  const screenWidth = useResponsiveStore(state => state.screenWidth)
  
  return useMemo(() => {

    const tokens = {
      2: rem(2),
      3: rem(3),
      4: rem(4),
      5: rem(5),
      6: rem(6),
      8: rem(8),
      9: rem(9),
      10: rem(10),
      12: rem(12),
      14: rem(14),
      15: rem(15),
      16: rem(16),
      18: rem(18),
      20: rem(20),
      24: rem(24),
      28: rem(28),
      30: rem(30),
      32: rem(32),
      38: rem(38),
      40: rem(40),
      46: rem(46),
      50: rem(50),
      58: rem(58),
      60: rem(60),
      70: rem(70),
      74: rem(74),
      88: rem(88),
      100: rem(100),
      130: rem(130),
      150: rem(150),
      170: rem(170),
      340: rem(340),
      366: rem(366),
    }

    return tokens
  }, [screenWidth])
}