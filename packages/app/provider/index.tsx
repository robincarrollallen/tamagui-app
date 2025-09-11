import { ToastViewport } from './ToastViewport'
import { StoreProvider } from './StoreProvider'
import { useColorScheme } from 'react-native'
import {
  type TamaguiProviderProps,
  TamaguiProvider,
  ToastProvider,
  CustomToast,
  config,
  isWeb,
} from '@my/ui'

export function Provider({
  children,
  defaultTheme = 'purple_base', // 默认主题
  ...rest
}: Omit<TamaguiProviderProps, 'config'> & { defaultTheme?: string }) {
  const colorScheme = useColorScheme()
  const theme = defaultTheme || (colorScheme === 'dark' ? 'dark' : defaultTheme)

  return (
    <TamaguiProvider config={config} defaultTheme={theme} {...rest}>
      <StoreProvider>
        <ToastProvider swipeDirection="horizontal" duration={6000} native={isWeb ? [] : ['mobile']}>
          {children}
          <CustomToast />
          <ToastViewport />
        </ToastProvider>
      </StoreProvider>
    </TamaguiProvider>
  )
}
