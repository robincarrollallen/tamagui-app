import { defaultConfig } from '@tamagui/config/v4'
import { createTamagui } from 'tamagui'
import { bodyFont, headingFont } from './fonts'
import { animations } from './animations'
import { darkCustomTheme, lightCustomTheme, purpleCustomTheme } from './themes'

export const config = createTamagui({
  ...defaultConfig,
  animations,
  fonts: {
    body: bodyFont,
    heading: headingFont,
  },
  // Custom themes
  themes: {
    ...defaultConfig.themes,
    light: {
      ...defaultConfig.themes.light,
      ...lightCustomTheme,
    },
    dark: {
      ...defaultConfig.themes.dark,
      ...darkCustomTheme,
    },
    purple_base: {
      ...defaultConfig.themes.dark,
      ...purpleCustomTheme,
    },
  },
})
