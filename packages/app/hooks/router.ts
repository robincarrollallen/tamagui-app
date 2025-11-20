import { useRef } from 'react'
import { throttle } from 'app/utils/library'
import { NO_AUTH_PATHS, NO_AUTH_ROUTES } from 'app/enums'
import { useRouterStore, useStatusStore } from 'app/store'
import { useRouter as useSolitoRouter } from 'solito/navigation'

export function useRouter() {
  const router = useSolitoRouter()

  const showLoginPopup = useRef(
    throttle(() => {
      const previousPath = useRouterStore.getState().previousPath // 上一个路由

      useStatusStore.getState().showLoginPopup() // 显示登录弹窗

      if (NO_AUTH_PATHS.includes(previousPath as any)) {
        router.replace(previousPath)
      } else {
        router.replace(NO_AUTH_ROUTES.ROOT)
      }
    }, 1000)
  ).current

  return {
    router,
    showLoginPopup
  }
}
