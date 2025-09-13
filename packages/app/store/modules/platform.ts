import { create } from 'zustand'
import { Platform } from 'react-native';
import { createPersistStore } from '../middleware/persist'
import type { BaseStore } from '../types'

interface PlatformState extends BaseStore {
  isReactNative: boolean
}

const initialState = {
  isReactNative: Platform.OS !== 'web',
  _hasHydrated: false,
}

export const usePlatformStore = create<PlatformState>()(
  createPersistStore(
    (set, get) => ({
      ...initialState,
      
      setHasHydrated: (hasHydrated: boolean) => set({ _hasHydrated: hasHydrated }),
      
      reset: () => set(initialState),
    }),
    {
      name: 'platform-store',
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