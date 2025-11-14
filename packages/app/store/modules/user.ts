import { create } from 'zustand'
import { createPersistStore } from '../middleware/persist'
import type { BaseStore } from '../types'

interface UserState extends BaseStore {
  userInfo: Recordable
  setUserInfo: (userInfo: Recordable) => void
}

const initialState = {
  userInfo: {} as Recordable,
  _hasHydrated: false,
}

export const useUserStore = create<UserState>()(
  createPersistStore(
    (set, get) => ({
      ...initialState,

      /** Set User Information */
      setUserInfo: (userInfo: Recordable) => {
        set({ userInfo })
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