import { create } from 'zustand'
import { createPersistStore } from '../middleware/persist'
import type { BaseStore } from '../types'

interface StatusState extends BaseStore {
  /** Login screen visible */
  loginScreenVisible: boolean,
  /** Login popup type: 0: login, 1: register */
  loginPopupType: number,
  /** Show login screen */
  showLoginPopup: () => void,    
  /** Show register screen */
  showRegisterPopup: () => void,
  /** Hide login screen */
  hideLoginPopup: () => void,
}

const initialState = {
  loginScreenVisible: false,
  loginPopupType: 0,
  _hasHydrated: false,
}

export const useStatusStore = create<StatusState>()(
  createPersistStore(
    (set, get) => ({
      ...initialState,
      
      setHasHydrated: (hasHydrated: boolean) => set({ _hasHydrated: hasHydrated }),
      
      reset: () => set(initialState),

      showLoginPopup: () => {
        set({ loginScreenVisible: true, loginPopupType: 0 })
      },
    
      /** Show register popup */
      showRegisterPopup: () => {
        set({ loginScreenVisible: true, loginPopupType: 1 })
      },
  
      hideLoginPopup: () => {
        set({ loginScreenVisible: false, loginPopupType: 0 })
      }
    }),
    {
      name: 'status-store',
      partialize: (state) => ({
        loginScreenVisible: state.loginScreenVisible,
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

export const statusSelectors = {
  isLogin: (state: StatusState) => state.loginPopupType === 0,
  isRegister: (state: StatusState) => state.loginPopupType === 1,
}