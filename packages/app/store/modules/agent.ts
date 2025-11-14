import { create } from 'zustand'
import { createPersistStore } from '../middleware/persist'
import type { BaseStore } from '../types'

interface AgentState extends BaseStore {
  agencyConfig: Recordable
  setAgencyConfig: (agencyConfig: Recordable) => void
}

const initialState = {
  agencyConfig: {} as Recordable,
  _hasHydrated: false,
}

export const useAgentStore = create<AgentState>()(
  createPersistStore(
    (set, get) => ({
      ...initialState,

      setAgencyConfig: (agencyConfig: Recordable[]) => {
        set({ agencyConfig })
      },
      
      setHasHydrated: (hasHydrated: boolean) => set({ _hasHydrated: hasHydrated }),
      
      reset: () => set(initialState),
    }),
    {
      name: 'agent-store',
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