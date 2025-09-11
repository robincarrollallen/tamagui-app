import { create } from 'zustand'
import { createPersistStore } from '../middleware/persist'
import type { BaseStore } from '../types'

type ThemeMode = 'light' | 'dark' | 'system'

interface ThemeState extends BaseStore {
  mode: ThemeMode
  systemTheme: 'light' | 'dark'
  
  // Actions
  setTheme: (mode: ThemeMode) => void
  setSystemTheme: (theme: 'light' | 'dark') => void
  getCurrentTheme: () => 'light' | 'dark'
}

const initialState = {
  mode: 'system' as ThemeMode,
  systemTheme: 'light' as 'light' | 'dark',
  _hasHydrated: false,
}

export const useThemeStore = create<ThemeState>()(
  createPersistStore(
    (set, get) => ({
      ...initialState,
      
      setHasHydrated: (hasHydrated: boolean) => set({ _hasHydrated: hasHydrated }),
      
      setTheme: (mode: ThemeMode) => set({ mode }),
      
      setSystemTheme: (systemTheme: 'light' | 'dark') => set({ systemTheme }),
      
      getCurrentTheme: () => {
        const state = get()
        return state.mode === 'system' ? state.systemTheme : state.mode
      },
      
      reset: () => set(initialState),
    }),
    {
      name: 'theme-store',
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