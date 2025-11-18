import { create } from 'zustand'
import { createPersistStore } from '../middleware/persist'
import type { DialogConfig } from '../types/dialog'
import type { BaseStore } from '../types'

interface DialogState extends BaseStore {
  queue: DialogConfig[]
  addDialog: (config: DialogConfig) => void
  removeDialog: (id: string) => void
  clearQueue: () => void
  currentDialog: DialogConfig | null
}

const initialState = {
  queue: [],
  currentDialog: null,
  _hasHydrated: false,
}

export const useDialogStore = create<DialogState>()(
  createPersistStore(
    (set, get) => ({
      ...initialState,

      addDialog: (config: DialogConfig) =>
        set((state) => {
          const newQueue = [...state.queue, config]
          return {
            queue: newQueue,
            currentDialog: newQueue[0] || null,
          }
        }),
    
      removeDialog: (id: string) =>
        set((state) => {
          const newQueue = state.queue.filter((dialog) => dialog.id !== id)
          return {
            queue: newQueue,
            currentDialog: newQueue[0] || null,
          }
        }),
    
      clearQueue: () =>
        set(() => ({
          queue: [],
          currentDialog: null,
        })),
      
      setHasHydrated: (hasHydrated: boolean) => set({ _hasHydrated: hasHydrated }),
      
      reset: () => set(initialState),
    }),
    {
      name: 'dialog-store',
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