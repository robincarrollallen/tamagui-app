import { create } from 'zustand'
import { createPersistStore } from '../middleware/persist'
import homeList from 'app/data/homeList.json'
import type { BaseStore } from '../types'

interface GameState extends BaseStore {
  homeList: typeof homeList
}

const initialState = {
  homeList: homeList,
  _hasHydrated: false,
}

export const useGameStore = create<GameState>()(
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