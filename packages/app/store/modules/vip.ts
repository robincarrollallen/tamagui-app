import { create } from 'zustand'
import { createPersistStore } from '../middleware/persist'
import type { BaseStore } from '../types'

interface VipState extends BaseStore {
  vipInfo: Recordable
  setVipInfo: (vipInfo: Recordable) => void
}

const initialState = {
  vipInfo: {},
  _hasHydrated: false,
}

export const useVipStore = create<VipState>()(
  createPersistStore(
    (set, get) => ({
      ...initialState,

      setVipInfo: (vipInfo: Recordable) => {
        set({ vipInfo })
      },
      
      setHasHydrated: (hasHydrated: boolean) => set({ _hasHydrated: hasHydrated }),
      
      reset: () => set(initialState),
    }),
    {
      name: 'app-store',
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