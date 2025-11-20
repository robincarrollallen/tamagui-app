import { create } from 'zustand'
import { createPersistStore } from '../middleware/persist'
import type { BaseStore } from '../types'

interface RouterState extends BaseStore {
  previousPath: string
  currentPath: string
  setCurrent: (current: string) => void
  setPrevious: (pathname: string) => void
}

const initialState = {
  previousPath: '/',
  currentPath: '/',
  _hasHydrated: false,
}

export const useRouterStore = create<RouterState>()(
  createPersistStore(
    (set, get) => ({
      ...initialState,
      
      /** 设置当前路由 */
      setCurrent: (currentPath: string) => set({ currentPath }),

      /** 设置上一个路由 */
      setPrevious: (previousPath: string) => set({ previousPath }),

      setHasHydrated: (hasHydrated: boolean) => set({ _hasHydrated: hasHydrated }),
      
      reset: () => set(initialState),
    }),
    {
      name: 'router-store',
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