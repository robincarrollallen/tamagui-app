import { create } from 'zustand'
import { createPersistStore } from '../middleware/persist'
import type { BaseStore } from '../types'

interface UserState extends BaseStore {
  token: string
  userInfo: Recordable
  clearToken: () => void
  setToken: (token: string) => void
  setUserInfo: (userInfo: Recordable) => void
}

const initialState = {
  token: '',
  userInfo: {} as Recordable,
  _hasHydrated: false,
}

export const useUserStore = create<UserState>()(
  createPersistStore(
    (set, get) => ({
      ...initialState,

      setToken: (token: string) => set({ token }),

      clearToken: () => set({ token: '', userInfo: {} }),

      /** Set User Information */
      setUserInfo: (userInfo: Recordable) => {
        set({ userInfo })
      },
      
      setHasHydrated: (hasHydrated: boolean) => set({ _hasHydrated: hasHydrated }),
      
      reset: () => set(initialState),
    }),
    {
      name: 'user-store',
      partialize: (state) => ({
        token: state.token,
        userInfo: state.userInfo,
      }),
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