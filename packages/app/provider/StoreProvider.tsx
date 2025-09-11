import React, { useEffect, type ReactNode } from 'react'
import { useThemeStore } from '../store/modules/theme'

interface StoreProviderProps {
  children: ReactNode
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const themeHydrated = useThemeStore(state => state._hasHydrated)
  
  // 等待所有 store 水合完成
  const isHydrated = themeHydrated
  
  useEffect(() => {
    // 可以在这里处理水合完成后的逻辑
    if (isHydrated) {
      console.log('All stores hydrated')
    }
  }, [isHydrated])
  
  // 可以显示加载状态直到水合完成
  if (!isHydrated) {
    return null // 或者返回加载组件
  }
  
  return <>{children}</>
}