import { useEffect, useState } from 'react'
import { useColorScheme } from 'react-native'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { Provider } from 'app/provider'
import { NativeToast } from '@my/ui/src/NativeToast'
import { initI18nClient } from 'app/i18n/client'
import { LoginScreen } from 'app/features/login'

export const unstable_settings = {
  // Ensure that reloading on `/user` keeps a back button present.
  initialRouteName: 'Home',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function App() {
  const [isReady, setIsReady] = useState(false)
  const [interLoaded, interError] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  useEffect(() => {
    async function prepare() {
      try {
        await initI18nClient() // i18n init
        setIsReady(true)
      } catch (e) {
        console.warn(e)
      } finally {
        if (interLoaded || interError) {
          SplashScreen.hideAsync() // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
        }
      }
    }

    prepare()
  }, [interLoaded, interError])

  if ((!interLoaded && !interError) || !isReady) {
    return null
  }

  return <RootLayoutNav />
}

function RootLayoutNav() {
  const colorScheme = useColorScheme()

  return (
    <Provider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen
            name="(tabbar)"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
        <NativeToast />
        <LoginScreen />
      </ThemeProvider>
    </Provider>
  )
}
