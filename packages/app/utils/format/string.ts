/**
 * Convert underscore to camel case
 * @param str - The string to convert
 */
export const toCamelCase = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/_([a-z0-9])/g, (_, letter) => letter.toUpperCase())
}

/**
 * Mask middle of the string
 * @param value - The string to mask
 * @param config - The config for the mask
 */
export const maskMiddle = (
	value: string | number,
	config: { visibleDigits: number, maskChar: string, fixedMaskCharacterLength: number } = { visibleDigits: 2, maskChar: '*', fixedMaskCharacterLength: 4 },
) => {
	// 将输入转换为字符串
	const str = value.toString()
	const { visibleDigits, maskChar, fixedMaskCharacterLength } = config
	// 输入验证
	if (!str || str.length <= 2 * visibleDigits) return str

	// 保留首尾，中间用 * 替换
	const start = str.slice(0, visibleDigits)
	const end = str.slice(-visibleDigits)
	const maskCharLength = fixedMaskCharacterLength || str.length - 2 * visibleDigits
	const maskedMiddle = maskChar.repeat(maskCharLength)

	return `${start}${maskedMiddle}${end}`
}

/**
 * @description 驼峰命名
 * @param str 字符串
 */
export function camelCase(str: string = ""): string {
  if (!str || typeof str !== "string")
    return ""
  return str
    .replace(/[^a-z0-9]+(.)/gi, (_match, chr) => chr.toUpperCase())
    .replace(/^[A-Z]/, char => char.toLowerCase())
}