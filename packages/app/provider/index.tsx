import { LoadingProvider } from './LoadingProvider'
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
  defaultTheme = 'Layout2:SupremeGreen', // 默认主题
  ...rest
}: Omit<TamaguiProviderProps, 'config'> & { defaultTheme?: string }) {
  const colorScheme = useColorScheme()
  const theme = defaultTheme || (colorScheme === 'dark' ? 'dark' : defaultTheme)

  return (
    <TamaguiProvider config={config} defaultTheme={theme} {...rest}>
      <StoreProvider>
        <LoadingProvider>
          <ToastProvider swipeDirection="horizontal" duration={6000} native={isWeb ? [] : ['mobile']}>
            {children}
            <CustomToast />
            <ToastViewport />
          </ToastProvider>
        </LoadingProvider>
      </StoreProvider>
    </TamaguiProvider>
  )
}
