/** Theme type */
export const THEME = {
	STYLE_1: 'Layout2:DarkGreen',
	STYLE_2: 'Layout2:GoldenYellow',
	STYLE_3: 'Layout2:BluePurple',
	STYLE_4: 'Layout3:AmberPurple',
	STYLE_5: 'Layout1:Blue',
	STYLE_6: 'Layout1:Green',
	STYLE_7: 'Layout1:BlueV01',
	STYLE_8: 'Layout1:GreenV01',
	STYLE_9: 'Layout1:GreenV02',
	STYLE_10: 'Layout1:Blue_V01',
	STYLE_11: 'Layout1:AmberPurple',
	STYLE_12: 'Layout1:PineGreenV01',
	STYLE_13: 'Layout1:PineGreenV02',
	STYLE_14: 'Layout1:BlueV02',
	STYLE_15: 'Layout1:AmberPurpleV01',
	STYLE_16: 'Layout1:AuroraYellow',
	STYLE_17: 'Layout2:PhantomBlue',
	STYLE_18: 'Layout2:NeoBlue',
	STYLE_19: 'Layout2:MystLightBlue',
	STYLE_20: 'Layout2:MidnightPurple',
	STYLE_25: 'Layout2:SupremeGreen'
} as const

/** Theme type */
export type ThemeType = typeof THEME[keyof typeof THEME]

export type ThemeKEY = Lowercase<keyof typeof THEME>;

/** Theme style map type */
export type ThemeStyleMapType = {
  readonly [K in ThemeType]: Lowercase<keyof typeof THEME>
}

/** Theme key map type */
export type ThemeKeyMapType = {
  readonly [K in keyof typeof THEME]: Lowercase<K & string>
}

/** Theme value map type */
export type ThemeValueMapType = {
  readonly [K in keyof typeof THEME]: `t_${typeof THEME[K]}`
}

/** Supported themes array [Layout2:SupremeGreen, ...] */
export const ThemeSupport = Object.values(THEME)

/** Theme Style { Layout2:SupremeGreen: style_25, ... } */
export const THEME_STYLE = Object.fromEntries(
	Object.entries(THEME).map(([key, value]) => [value, key.toLowerCase()])
) as ThemeStyleMapType

/** Theme key { STYLE_25: style_25, ... } */
export const THEME_KEY = Object.fromEntries(
	Object.entries(THEME).map(([key, _value]) => [key, key.toLowerCase()])
) as ThemeKeyMapType

/** Theme value { STYLE_25: t_Layout2:SupremeGreen, ... } */
export const THEME_VALUE = Object.fromEntries(
	Object.entries(THEME).map(([key, value]) => [key, `t_${value}`])
) as ThemeValueMapType
