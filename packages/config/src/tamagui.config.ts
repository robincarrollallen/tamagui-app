import { createTamagui } from 'tamagui'
import { animations } from './animations'
import { style_25, THEME } from './themes'
import { bodyFont, headingFont } from './fonts'
import { defaultConfig } from '@tamagui/config/v4'

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
      ...style_25,
    },
    dark: {
      ...defaultConfig.themes.dark,
      ...style_25,
    },
    [THEME.STYLE_25]: {
      ...defaultConfig.themes.dark,
      ...style_25,
    },
  },
})
