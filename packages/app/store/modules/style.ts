import { create } from 'zustand'
import { LayoutRectangle } from 'react-native'
import { createPersistStore } from '../middleware/persist'
import type { BaseStore } from '../types'

interface StyleState extends BaseStore {
  /** 屏幕与内容间距 */
  screenSpace: number,
  /** TabBar 宽高 */
  tabbarLayout: LayoutRectangle,
  /** 设置 TabBar 高度 */
  setTabbarLayout: (layout: LayoutRectangle) => void,
}

const initialState = {
  screenSpace: 0,
  tabbarLayout: { height: 0, width: 0, x: 0, y: 0 },
  _hasHydrated: false,
}

export const useStyleStore = create<StyleState>()(
  createPersistStore(
    (set, get) => ({
      ...initialState,
      
      setHasHydrated: (hasHydrated: boolean) => set({ _hasHydrated: hasHydrated }),
      
      reset: () => set(initialState),

      setTabbarLayout: (layout: LayoutRectangle) => set({ tabbarLayout: layout }),
    }),
    {
      name: 'style-store',
      onRehydrateStorage: (state) => {
        return (state, error) => {
          if (!error && state) {
            state.setHasHydrated(true)
          }
        }
      },
    }
  )
)