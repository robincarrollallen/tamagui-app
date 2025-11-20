/** 未登录可访问的页面 */
export const NO_AUTH_ROUTES = {
  ROOT: '/',
  HOME: '/home',
  ACTIVITY: '/activity',
} as const

/** 支持的页面 */
export const NO_AUTH_PATHS = Object.values(NO_AUTH_ROUTES)