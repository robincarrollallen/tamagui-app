import { create } from 'zustand'
import { createPersistStore } from '../middleware/persist'
import marqueeList from 'app/data/marqueeList.json'
import bannerList from 'app/data/bannerList.json'
import tenantInfo from 'app/data/tenant.json'
import type { BaseStore } from '../types'

interface ThemeState extends BaseStore {
  tenantInfo: typeof tenantInfo
  bannerList: typeof bannerList
  marqueeList: typeof marqueeList
}

const initialState = {
  marqueeList: marqueeList,
  tenantInfo: tenantInfo,
  bannerList: bannerList,
  _hasHydrated: false,
}

export const useTenantStore = create<ThemeState>()(
  createPersistStore(
    (set, get) => ({
      ...initialState,
      
      setHasHydrated: (hasHydrated: boolean) => set({ _hasHydrated: hasHydrated }),

      /** 设置租户信息 */
      setTenantInfo: (info: typeof tenantInfo) => {
        set({ tenantInfo: info })
        return info
      },
      
      /** 获取租户信息 */
      getTenantInfo: () => {
        const state = get()
        return state.tenantInfo
      },
      
      reset: () => set(initialState),
    }),
    {
      name: 'tenant-store',
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