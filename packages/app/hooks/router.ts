import { useRef } from 'react'
import { throttle } from 'app/utils/library'
import { NO_AUTH_PATHS, NO_AUTH_ROUTES } from 'app/enums'
import { useRouter as useSolitoRouter } from 'solito/navigation'
import { useRouterStore, useStatusStore, useUserStore } from 'app/store'

const getPathname = (path: string) => {
  return path.replace(/[?#].*$/, '');
}

export function useRouter() {
  const router = useSolitoRouter()

  const login = useRef(
    throttle(() => {
      const previousPath = useRouterStore.getState().previousPath // 上一个路由

      if (NO_AUTH_PATHS.includes(previousPath as any)) {
        router.replace(previousPath)
      } else {
        router.replace(NO_AUTH_ROUTES.ROOT)
      }
      useStatusStore.getState().showLoginPopup() // 显示登录弹窗
    }, 1000)
  ).current

  /** 是否需要登录验证 */
  const authed = (path: string) => {
    const token = useUserStore.getState().token // 用户 token
    return !!token || NO_AUTH_PATHS.includes(path as any)
  }

  /** 跳转路由 */
  const push = (path: string) => {
    const pathname = getPathname(path)
    if (authed(pathname)) {
      useRouterStore.getState().setPrevious(pathname)
      router.push(pathname)
      useRouterStore.getState().setCurrent(pathname)
    } else {
      useStatusStore.getState().showLoginPopup()
    }
  }

  /** 替换路由 */
  const replace = (path: string) => {
    const pathname = getPathname(path)
    if (authed(pathname)) {
      router.replace(pathname)
      useRouterStore.getState().setCurrent(pathname)
    } else {
      useStatusStore.getState().showLoginPopup()
    }
  }

  /** 返回路由 */
  const back = () => {
    router.back()
  }

  return {
    push,
    replace,
    back,
    login,
  }
}
