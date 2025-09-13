export { useThemeStore } from './modules/theme'
export { useStyleStore } from './modules/style'
export { useTenantStore } from './modules/tenant'
export { usePlatformStore } from './modules/platform'

export type { BaseStore, PersistConfig } from './types'

export { createPersistStore } from './middleware/persist'