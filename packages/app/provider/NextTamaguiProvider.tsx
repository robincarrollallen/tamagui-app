'use client'

import '@tamagui/core/reset.css'
import '@tamagui/font-inter/css/400.css'
import '@tamagui/font-inter/css/700.css'
import '@tamagui/polyfill-dev'

import { config } from '@my/ui'
import { Provider } from 'app/provider'
import { initI18nClient } from 'app/i18n/client'
import { StyleSheet, Platform } from 'react-native'
import { themeValues } from '@my/config/src/themes'
import { useServerInsertedHTML } from 'next/navigation'
import { useEffect, useState, type ReactNode } from 'react'
import { NextThemeProvider, useRootTheme } from '@tamagui/next-theme'

export const NextTamaguiProvider = ({
  defaultTheme,
  children,
}: {
  defaultTheme: string
  children: ReactNode
}) => {
  const [theme, setTheme] = useRootTheme({ fallback: defaultTheme as any })

  const platform = Platform.OS

  console.log('NextTamaguiProvider', { theme, defaultTheme, platform })

  useServerInsertedHTML(() => {
    // @ts-ignore
    const rnwStyle = StyleSheet.getSheet()
    return (
      <>
        <link rel="stylesheet" href="/tamagui.css" />
        <style dangerouslySetInnerHTML={{ __html: rnwStyle.textContent }} id={rnwStyle.id} />
        <style
          dangerouslySetInnerHTML={{
            // the first time this runs you'll get the full CSS including all themes
            // after that, it will only return CSS generated since the last call
            __html: config.getNewCSS(),
          }}
        />

        <style
          dangerouslySetInnerHTML={{
            __html: config.getCSS({
              exclude: process.env.NODE_ENV === 'production' ? 'design-system' : null,
            }),
          }}
        />

        <script
          dangerouslySetInnerHTML={{
            // avoid flash of animated things on enter:
            __html: `document.documentElement.classList.add('t_unmounted')`,
          }}
        />
      </>
    )
  })

  const [i18nInited, setI18nInited] = useState(false)

  useEffect(() => {
    initI18nClient().then(() => {
      setI18nInited(true)
    })
  }, [])

  if (!i18nInited) {
    return null
  }

  return (
    <NextThemeProvider
      skipNextHead
      value={themeValues}
      defaultTheme={defaultTheme}
      onChangeTheme={(next) => {
        setTheme(next as any)
      }}
    >
      <Provider defaultTheme={theme}>{children}</Provider>
    </NextThemeProvider>
  )
}
