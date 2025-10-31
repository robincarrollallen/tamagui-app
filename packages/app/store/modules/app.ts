import { create } from 'zustand'
import { createPersistStore } from '../middleware/persist'
import type { BaseStore } from '../types'

interface AppState extends BaseStore {

}

const initialState = {
  _hasHydrated: false,
}

export const useAppStore = create<AppState>()(
  createPersistStore(
    (set, get) => ({
      ...initialState,
      
      setHasHydrated: (hasHydrated: boolean) => set({ _hasHydrated: hasHydrated }),
      
      reset: () => set(initialState),
    }),
    {
      name: 'game-store',
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