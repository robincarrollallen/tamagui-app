import { create } from 'zustand'
import { isWeb, isServer } from 'tamagui'
import { createPersistStore } from '../middleware/persist'
import type { BaseStore } from '../types'
import i18n from 'i18next'

interface AppState extends BaseStore {
  language: string
  setLanguage: (language: string) => void
}

const initialState = {
  language: 'en-US',
  _hasHydrated: false,
}

export const useAppStore = create<AppState>()(
  createPersistStore(
    (set, get) => ({
      ...initialState,
      
      setHasHydrated: (hasHydrated: boolean) => set({ _hasHydrated: hasHydrated }),
      
      reset: () => set(initialState),

      setLanguage: (language: string) => {
        i18n.changeLanguage(language)
        set({ language })
        if (isWeb && !isServer) {
          document.cookie = `lang=${language}; path=/; max-age=${60 * 60 * 24 * 30}`
        }
      },
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