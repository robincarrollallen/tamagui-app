import { NO_AUTH_PATHS } from 'app/enums'
import { useMemo, ReactNode } from 'react'
import { usePathname } from 'app/hooks/usePathname'
import { useIsomorphicLayoutEffect } from 'tamagui'
import { useStatusStore, useUserStore, useRouterStore, useThemeStore } from 'app/store'

interface StoreProviderProps {
  children: ReactNode
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const pathname = usePathname() // 当前路由路径
  const token = useUserStore((state) => state.token) // 用户 token
  const userHydrated = useUserStore(state => state._hasHydrated) // 用户 store 是否水合
  const themeHydrated = useThemeStore(state => state._hasHydrated) // 主题 store 是否水合
  const statusHydrated = useStatusStore(state => state._hasHydrated) // 状态 store 是否水合
  const routerHydrated = useRouterStore(state => state._hasHydrated) // 路由 store 是否水合

  /** 是否已登录 */
  const authed = useMemo(
    () => !!token || NO_AUTH_PATHS.includes(pathname as any),
    [token, pathname]
  )

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
  
  // 可以显示加载状态直到水合完成
  useIsomorphicLayoutEffect(() => {
    if (!isHydrated) return
    
    if (authed) {
      useRouterStore.getState().setPrevious(pathname)
    } else {
      useRouterStore.getState().setCurrent(pathname)
      useStatusStore.getState().showLoginPopup()
    }
  }, [isHydrated, pathname, authed])
  
  return <>{isHydrated && children}</>
}