import type { Metadata } from 'next'
import { initI18nServer } from 'app/i18n/server'
import { NextTamaguiProvider } from 'app/provider/NextTamaguiProvider'
import { fetchDefaultThemeFromBackend } from 'service/fetchDefaultTheme'

export const metadata: Metadata = {
  title: 'Tamagui • App Router',
  description: 'Tamagui, Solito, Expo & Next.js',
  icons: '/favicon.ico',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const defaultTheme = await fetchDefaultThemeFromBackend()

  const i18n = await initI18nServer()

  return (
    // You can use `suppressHydrationWarning` to avoid the warning about mismatched content during hydration in dev mode
    <html lang={i18n.language} suppressHydrationWarning>
      <body>
        <NextTamaguiProvider defaultTheme={defaultTheme}>{children}</NextTamaguiProvider>
      </body>
    </html>
  )
}
