import { useMemo, ReactNode } from 'react'
import { useIsomorphicLayoutEffect } from 'tamagui'
import { useStatusStore, useUserStore, useRouterStore, useThemeStore } from 'app/store'

interface StoreProviderProps {
  children: ReactNode
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const userHydrated = useUserStore(state => state._hasHydrated) // 用户 store 是否水合
  const themeHydrated = useThemeStore(state => state._hasHydrated) // 主题 store 是否水合
  const statusHydrated = useStatusStore(state => state._hasHydrated) // 状态 store 是否水合
  const routerHydrated = useRouterStore(state => state._hasHydrated) // 路由 store 是否水合

  /** 是否所有 store 都已水合 */
  const isHydrated = useMemo(
    () => themeHydrated && userHydrated && statusHydrated && routerHydrated,
    [themeHydrated, userHydrated, statusHydrated, routerHydrated]
  )
  
  /** 水合完成后的逻辑 */
  useIsomorphicLayoutEffect(() => {
    if (isHydrated) {
      console.log('All stores hydrated')
    }
  }, [isHydrated])
  
  return <>{isHydrated && children}</>
}