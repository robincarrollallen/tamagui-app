import { create } from 'zustand'
import { LanguageType } from 'app/enums'
import { ZNameType } from 'app/enums/activity'
import { camelCase } from 'app/utils/format/string'
import { createPersistStore } from '../middleware/persist'
import { generatePreviewText, getActivityDefaultName } from 'app/utils/activity'
import { handleInlineNavigation, handleSideValueType, handleSidebarJumpType } from 'app/utils/navigation'
import type { BaseStore } from '../types'
import i18n from 'i18next'

interface ActivityState extends BaseStore {
  activityList: Recordable[]
  sideBarActivityList: Recordable[]
  setActivityList: (activityList: Recordable[], language: LanguageType) => void
  setSideBarActivityList: (sideBarActivityData: Recordable[]) => void
}

const initialState = {
  activityList: [],
  sideBarActivityList: [],
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

      setSideBarActivityList: (sideBarActivityData: Recordable[]) => {
        const sideBarActivityList = sideBarActivityData.map((item) => {
          const { id, iconUrlType, defaultIconUrl, customIconUrl, imageUrl, name, targetType, targetValue: targetValueString, showName, shortName } = item
          let value: number | string = ""
          let valueType: string = ""
          if (targetType === "internal") {
            const targetValue = JSON.parse(targetValueString)
            value = handleInlineNavigation(targetValue)
            valueType = handleSideValueType(targetValue)
          }
          else {
            value = targetValueString
          }
      
          let newName = shortName
          if (valueType === "ACTIVITY") {
            const { activityList } = get()
            const activity = activityList?.find((item: any) => item.id === value)
            if (!activity) {
              return null
            }
          }
          if (["ACTIVITY", "CODE"].includes(valueType)) {
            newName = shortName || translateActivityName(valueType, value)
          }
      
          return {
            id,
            name,
            value,
            showName,
            valueType,
            image: imageUrl,
            shortName: newName,
            logoSrc: iconUrlType === "default" ? defaultIconUrl : customIconUrl,
            type: handleSidebarJumpType(targetType),
          }
        }).filter(item => !!item)
        set({ sideBarActivityList })
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

/** 获取活动列表 */
export const selectActivityList = (state: ActivityState) => 
  state.activityList.filter(item => item.status === 'active')

/** 翻译活动名称 */
const translateActivityName = (type: string, val: string | number) => {

  if (type === "ACTIVITY") {
    const { activityList } = useActivityStore.getState()
    const { type: activeType, name } = activityList?.find((item: any) => item.id === val) || {}
    if (activeType === "Custom")
      return name
    return activeType ? i18n.t(`activity1.${activeType}`) : ""
  }
  if (type === "CODE") {
    const code = camelCase(`${val}`) || "mainInicio"
    return i18n.t(`activity1.${code}`) || ""
  }
}