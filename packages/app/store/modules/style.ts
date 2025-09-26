import { create } from 'zustand'
import { createPersistStore } from '../middleware/persist'
import type { BaseStore } from '../types'

interface StyleState extends BaseStore {
  /** 屏幕与内容间距 */
  screenSpace: number,
  /** TabBar 高度 */
  tabbarHeight: number,
  /** 设置 TabBar 高度 */
  setTabbarHeight: (height: number) => void,
}

const initialState = {
  screenSpace: 0,
  tabbarHeight: 0,
  _hasHydrated: false,
}

export const useStyleStore = create<StyleState>()(
  createPersistStore(
    (set, get) => ({
      ...initialState,
      
      setHasHydrated: (hasHydrated: boolean) => set({ _hasHydrated: hasHydrated }),
      
      reset: () => set(initialState),

      setTabbarHeight: (height = 0) => set({ tabbarHeight: height }),
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