import { isWeb } from 'tamagui'
import { create } from 'zustand'
import { useStyleStore } from './style'
import { Dimensions } from 'react-native'
import type { BaseStore } from '../types'
import { MOBILE_DESIGN_WIDTH, MOBILE_MAX_WIDTH } from 'app/constant'
import { createPersistStore } from '../middleware/persist'
import { throttle } from 'app/utils/library'

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
  rem: (size: number) => number
  updateScreenSpace: () => void
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

      rem: (size: number) => {
        const windowInnerWidth = get().screenWidth
        const scale = windowInnerWidth / MOBILE_DESIGN_WIDTH
        return Math.round(size * scale)
      },

      updateScreenSpace: () => {
        const windowInnerWidth = get().screenWidth
        if (windowInnerWidth > MOBILE_MAX_WIDTH) {
          useStyleStore.setState({ screenSpace: (windowInnerWidth - MOBILE_MAX_WIDTH) / 2 })
        } else {
          useStyleStore.setState({ screenSpace: 0 })
        }
      }
    }),
    {
      name: 'responsive-store',
      onRehydrateStorage: (_state) => {
        return (state, error) => {
          if (!error && state) {
            if (!state._hasHydrated) {
              responsiveSize()
            }
            state.setHasHydrated(true)
          }
        }
      },
    }
  )
)

function responsiveSize() {
  setTimeout(() => {
    if (isWeb) {
      const handleResize = throttle(() => {
        useResponsiveStore.setState({ screenWidth: window.innerWidth, screenHeight: window.innerHeight })
          if (window.innerWidth > MOBILE_MAX_WIDTH) {
            useStyleStore.setState({ screenSpace: (window.innerWidth - MOBILE_MAX_WIDTH) / 2 })
          } else {
            useStyleStore.setState({ screenSpace: 0 })
          }
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
  }, 0)
}