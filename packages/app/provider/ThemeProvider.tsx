import { useTheme } from 'tamagui'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { usePlatformStore } from 'app/store'
import { LoginScreen } from 'app/features/login'
import { NativeToast } from '@my/ui/src/NativeToast'
import { DarkTheme, DefaultTheme, ThemeProvider as RNThemeProvider } from '@react-navigation/native'

export const ThemeProvider = () => {
  const theme = useTheme()
  const isIOS = usePlatformStore(state => state.isIOS)
  const colorScheme = theme.colorScheme?.get()
  const isDark = colorScheme === 'dark'

  return (
    <RNThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <StatusBar style={isDark ? 'light' : 'dark'} backgroundColor="transparent" />
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: theme.background?.get() },
          animation: isIOS ? 'simple_push' : 'fade_from_bottom',
        }}
      >
        <Stack.Screen
          name="(tabbar)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <NativeToast />
      <LoginScreen />
    </RNThemeProvider>
  )
}