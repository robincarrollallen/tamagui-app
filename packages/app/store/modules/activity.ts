import { create } from 'zustand'
import { LanguageType } from 'app/enums'
import { ZNameType } from 'app/enums/activity'
import { createPersistStore } from '../middleware/persist'
import { generatePreviewText, getActivityDefaultName } from 'app/utils/activity'
import type { BaseStore } from '../types'

interface ActivityState extends BaseStore {
  activityList: Recordable[]
  setActivityList: (activityList: Recordable[], language: LanguageType) => void
}

const initialState = {
  activityList: [],
  _hasHydrated: false,
}

export const useActivityStore = create<ActivityState>()(
  createPersistStore(
    (set, get) => ({
      ...initialState,
      
      setHasHydrated: (hasHydrated: boolean) => set({ _hasHydrated: hasHydrated }),
      
      reset: () => set(initialState),

      setActivityList: (activityList: Recordable[], language: LanguageType) => {
        const newActivityList = activityList.map((item) => {

          if (item.nameType === ZNameType.enum.DEFAULT && item.nameParams) {
            try {
              const nameParams = JSON.parse(`${item.nameParams}`)
              item.name = getActivityDefaultName(language, item.type, nameParams.variablesValue)
            } catch (error) {
              console.warn(error)
            }
          }
          if (item.previewText) {
            try {
              let preTextParams = JSON.parse(`${item.previewText}`)
              item.previewText = generatePreviewText(language, preTextParams.variablesValue)
            } catch (error) {
              console.warn(item.previewText)
            }
          }
          return item
        })

        set({ activityList: newActivityList })
      },
    }),
    {
      name: 'activity-store',
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

export const selectActivityList = (state: ActivityState) => 
  state.activityList.filter(item => item.status === 'active')