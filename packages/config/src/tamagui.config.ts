import { defaultConfig } from '@tamagui/config/v4'
import { createTamagui } from 'tamagui'
import { bodyFont, headingFont } from './fonts'
import { animations } from './animations'
import { style_25 } from './themes'

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
    "Layout2:SupremeGreen": {
      ...defaultConfig.themes.dark,
      ...style_25,
    },
  },
})
