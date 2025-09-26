// 持久化配置类型
export interface PersistConfig<T> {
  name: string
  storage?: any
  version?: number
  migrate?: (persistedState: unknown, version: number) => T | Promise<T>
  onRehydrateStorage?: (state: T) => ((state?: T, error?: Error) => void) | void
  partialize?: (state: T) => Partial<T>
}

// Store 状态类型
export interface StoreState {
  _hasHydrated: boolean
  setHasHydrated: (hasHydrated: boolean) => void
}

// 基础 Store 接口
export interface BaseStore extends StoreState {
  reset: () => void
}