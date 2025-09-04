// apps/next/app/lib/fetchDefaultTheme.ts
import { LRUCache } from 'lru-cache'

const themeCache = new LRUCache<string, string>({
  max: 10, // 最大缓存10个key
  ttl: 1000 * 60 * 5, // 5分钟<不设置表示永久缓存>
})

export async function fetchDefaultLanguageFromBackend(): Promise<string> {
  const cacheKey = 'defaultLanguage'
  const cached = themeCache.get(cacheKey)
  if (cached) return cached

  // 这里替换为你的真实后端请求
  // const res = await fetch('https://your-backend/api/theme')
  // const theme = (await res.json()).theme
  const language = 'en-US' // 示例

  themeCache.set(cacheKey, language)
  return language
}
