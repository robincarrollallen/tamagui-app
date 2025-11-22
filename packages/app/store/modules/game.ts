import { create } from 'zustand'
import { createPersistStore } from '../middleware/persist'
import type { BaseStore } from '../types'

interface GameState extends BaseStore {
  rawHomeList: Recordable[]
  homeList: Recordable[]
  gameList: Recordable[]
  hotList: Recordable[]
  noHot: boolean
  setGameList: (gameList: Recordable[]) => void
  setHomeList: (list: Recordable[]) => void
  setHotList: (list: Recordable[]) => void
  setNoHot: (noHot: boolean) => void
}

const initialState = {
  rawHomeList: [],
  homeList: [],
  gameList: [],
  hotList: [],
  noHot: true,
  _hasHydrated: false,
}

export const useGameStore = create<GameState>()(
  createPersistStore(
    (set, get) => ({
      ...initialState,

      setHomeList: (list: Recordable[]) => {
        set({ rawHomeList: list })

        const { noHot, gameList } = get()

        const hotTab = {
          id: 'POPULAR',
          code: "ONE_API_HOT",
          name: 'POPULAR',
          platformList: [{
            id: 'POPULAR',
            code: "ONE_API_HOT",
            gameList: [],
          }]
        }

        const newList = [...list].sort((a, b) => (b.gameTypeSort ?? 0) - (a.gameTypeSort ?? 0)).map((item) => {
          const { gameType } = item
          return {
            ...item,
            id: gameType,
            code: gameType,
            name: `${gameType}`,
            platformList: item.platformList.map(platform => {
              return {
                ...platform,
                id: platform.name,
                code: platform.name,
                gameList: gameList.flatMap(game => game.gameList.filter(game => game.gameType === gameType && game.platformId === platform.id))
              }
            })
          }
        })
        if (noHot) {
          set({ homeList: newList })
        }
        else {
          set({ homeList: [hotTab, ...newList] })
        }
      },

      setHotList: (list: Recordable[]) => {
        set({ hotList: list })
      },

      setNoHot: (noHot: boolean) => {
        const state = get()

        set({ noHot })
        if (state.rawHomeList.length > 0) {
          state.setHomeList(state.rawHomeList)
        }
      },

      setGameList: (gameList: Recordable[]) => {
        const state = get()

        set({ gameList })
        state.setNoHot(state.noHot)
      },
      
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