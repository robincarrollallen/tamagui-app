import { create } from 'zustand'
import { OptionsType } from 'app/types/options'
import { createPersistStore } from '../middleware/persist'
import type { BaseStore } from '../types'

interface LanguageState extends BaseStore {
  supportedLanguages: OptionsType[]
}

const initialState = {
  supportedLanguages: [{ label: 'English', value: 'en-US' }, { label: '中文', value: 'zh-CN' }],
  _hasHydrated: false,
}

export const useLanguageStore = create<LanguageState>()(
  createPersistStore(
    (set, get) => ({
      ...initialState,
      
      setHasHydrated: (hasHydrated: boolean) => set({ _hasHydrated: hasHydrated }),
      
      reset: () => set(initialState),
    }),
    {
      name: 'language-store',
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