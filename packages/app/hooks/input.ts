import { useTranslation } from "react-i18next"

/** 获取输入错误信息 */
export const useInputErrorMessage = () => {
	const { t } = useTranslation()

	return {
		account: t('hint.invalidUsername'),
		password: t('hint.invalidPassword')
	}
}