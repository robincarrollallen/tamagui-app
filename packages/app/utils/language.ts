/**
 * @description 获取指定语言的语言名称
 * @param language 语言标记
 * @param showLanguage 显示的语言
 */
export function getLanguageName(language: string, showLanguage: string): string {
	const lang = showLanguage.split('-')[0]
	const languageNames = new Intl.DisplayNames([lang], { type: 'language' })
	return languageNames.of(language) ?? 'Unknown'
}