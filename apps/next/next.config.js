/** @type {import('next').NextConfig} */
const { withTamagui } = require('@tamagui/next-plugin')
const { join } = require('node:path')

const boolVals = {
  true: true,
  false: false,
}

const disableExtraction =
  boolVals[process.env.DISABLE_EXTRACTION] ?? process.env.NODE_ENV === 'development'

const plugins = [
  withTamagui({
    config: '../../packages/config/src/tamagui.config.ts',
    components: ['tamagui', '@my/ui'],
    appDir: true,
    importsWhitelist: ['constants.js', 'colors.js'],
    outputCSS: process.env.NODE_ENV === 'production' ? './public/tamagui.css' : null,
    logTimings: true,
    disableExtraction,
    shouldExtract: (path) => {
      if (path.includes(join('packages', 'app'))) {
        return true
      }
    },
    disableThemesBundleOptimize: true,
    excludeReactNativeWebExports: ['Switch', 'ProgressBar', 'Picker', 'CheckBox', 'Touchable'],
  }),
]

const isSSR = process.env.NEXT_PUBLIC_SSR !== 'false'

console.log('📦 [next.config.js] NEXT_PUBLIC_SSR:', process.env.NEXT_PUBLIC_SSR, typeof process.env.NEXT_PUBLIC_SSR)
console.log('📦 [next.config.js] isSSR:', isSSR)

module.exports = () => {
  /** @type {import('next').NextConfig} */
  let config = {
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
    typescript: {
      ignoreBuildErrors: true,
    },
    transpilePackages: [
      'expo',
      'solito',
      'expo-image',
      'expo-linking',
      'expo-clipboard',
      'expo-constants',
      'react-native-web',
      'expo-modules-core',
    ],
    experimental: {
      scrollRestoration: true,
    },
  }

  if (!isSSR) {
    config.output = 'export'  // 静态导出，纯客户端渲染
    config.images = {
      unoptimized: true,  // 静态导出需要禁用图片优化
    }
    config.trailingSlash = true // 所有路由 URL 末尾都会添加斜杠
  }

  for (const plugin of plugins) {
    config = {
      ...config,
      ...plugin(config),
    }
  }

  return config
}
