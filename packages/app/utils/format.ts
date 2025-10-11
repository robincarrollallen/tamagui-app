import { LanguageType } from 'app/enums'
import { useTranslation } from 'react-i18next'

const formatterCache = new Map() // Cache formatter

/**
 * Get cached formatter
 * @param locale - The locale to use
 * @param decimals - The number of decimal places
 */
function getCachedFormatter(locale: string, decimals: number) {
	const key = `${locale}-${decimals}`
	if (!formatterCache.has(key)) {
		formatterCache.set(key, new Intl.NumberFormat(locale, {
			useGrouping: true,
			minimumFractionDigits: decimals,
			maximumFractionDigits: decimals,
		}))
	}
	return formatterCache.get(key)
}

/**
 * Safely convert to number
 * @param value - The value to convert
 * @param defaultValue - Default value, defaults to 0
 */
export function safeNumber(value: number | string, defaultValue = 0) {
	const num = Number(value)
	return Number.isNaN(num) || num === 0 ? defaultValue : num
}

/**
 * Format number to thousands and truncate decimals
 * @param {number|string} value The number to be formatted
 * @param {number} decimals The number of decimal places, default 2
 */
export const formatMoney = (value: number | string, decimals: number = 2) => {
	const { i18n } = useTranslation()
	const language = i18n.language as LanguageType
  
	let num = safeNumber(value)

	// Handle negative number symbol
	const sign = num < 0 ? '-' : ''
	num = Math.abs(num)

	// Truncate decimals, not rounding
	const factor = Math.pow(10, decimals)
	num = Math.trunc(num * factor) / factor

	// Pad decimal places
	const numStr = num.toFixed(decimals)

	// Format integer part with Intl.NumberFormat
	const numberFormatter = getCachedFormatter(language, decimals)
	const formatted = numberFormatter.format(safeNumber(numStr))

	return `${sign}${formatted}`
}

/**
 * Convert underscore to camel case
 * @param str - The string to convert
 */
export const toCamelCase = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/_([a-z0-9])/g, (_, letter) => letter.toUpperCase())
}