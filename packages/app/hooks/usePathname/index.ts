import { usePathname as useExpoPathname } from 'expo-router'

/** 全平台响应式路由名获取 Hook */
export function usePathname(): string {
  return useExpoPathname() || ''
}