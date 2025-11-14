import { isWeb } from "tamagui"
import { useCallback } from "react"
import { useToastController } from "@my/ui"
import { useTranslation } from "react-i18next"
import { setStringAsync } from 'expo-clipboard'

/** 获取输入错误信息 */
export const useInputErrorMessage = () => {
	const { t } = useTranslation()

	return {
		account: t('hint.invalidUsername'),
		password: t('hint.invalidPassword')
	}
}

export const useCopy = () => {
  const toast = useToastController() // 提示框
	
	const copy = useCallback(async (text: string | number): Promise<boolean> => {
		const content = `${text}`

    try {
      if (isWeb) {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(content)
          return toast.show('Copy success!')
        } else {
          copyToClipboardLegacy(content) // 降级方案：使用旧的 document.execCommand
          return toast.show('Copy success!')
        }
      } else {
        await setStringAsync(content) // Native 使用 expo-clipboard
        return toast.show('Copy success!')
      }
    } catch (error) {
      console.error('复制失败:', error)
      return false
    }
  }, [])

	return copy
}

// 复制降级方案函数
const copyToClipboardLegacy = (text: string): boolean => {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  const success = document.execCommand('copy')
  document.body.removeChild(textarea)
  return success
}