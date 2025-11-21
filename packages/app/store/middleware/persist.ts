import { isWeb } from 'tamagui'
import { persist, createJSONStorage, subscribeWithSelector } from 'zustand/middleware'
import type { StateCreator } from 'zustand'
import type { PersistConfig } from '../types'

// 获取平台特定的存储
const getStorage = () => {
  if (isWeb) {
    return createJSONStorage(() => localStorage) // Web / Next.js
  } else {
    const AsyncStorage = require('@react-native-async-storage/async-storage').default
    return createJSONStorage(() => AsyncStorage) // React Native / Expo
  }
}

// 创建持久化 store
export const createPersistStore = <T>(
  stateCreator: StateCreator<T>,
  config: PersistConfig<T>
) => {
  return persist(
    subscribeWithSelector(stateCreator),
    {
      name: config.name,
      storage: getStorage(),
      version: config.version || 1,
      migrate: config.migrate,
      onRehydrateStorage: config.onRehydrateStorage,
      partialize: config.partialize || (() => {}),
    }
  )
}