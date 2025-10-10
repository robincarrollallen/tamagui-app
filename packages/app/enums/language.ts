/**
 * Supported language enum
 */
export const LANGUAGE_TYPE = {
	/** English */
	'en-US': 'English',
	/** Portuguese */
	'pt-BR': 'Português',
	/** Chinese */
	'zh-CN': '中文',
	/** Indonesian */
	'id-ID': 'Bahasa Indonesia',
	/** Hindi */
	'hi-IN': 'हिंदी',
	/** Vietnamese */
	'vi-VN': 'Tiếng Việt',
	/** English (Philippines) */
	'en-PH': 'English (Philippines)',
} as const

// Supported language type
export type LanguageType = keyof typeof LANGUAGE_TYPE;
export type LanguageValue = typeof LANGUAGE_TYPE[LanguageType]

// Supported languages array
export const LanguageSupport = Object.keys(LANGUAGE_TYPE) as LanguageType[]
export const LanguageSupportValue = Object.values(LANGUAGE_TYPE)

// Reverse mapping for language values
export const LANGUAGE_REVERSE = Object.fromEntries(
	Object.entries(LANGUAGE_TYPE).map(([key, value]) => [value, key])
) as Record<LanguageValue, LanguageType>
