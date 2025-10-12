/**
 * Convert underscore to camel case
 * @param str - The string to convert
 */
export const toCamelCase = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/_([a-z0-9])/g, (_, letter) => letter.toUpperCase())
}