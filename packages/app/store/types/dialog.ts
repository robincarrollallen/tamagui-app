export type DialogType = 'alert' | 'confirm' | 'notice'

export interface DialogButton {
  label: string
  onPress: () => void
  color?: string
  disabled?: boolean
}

export interface DialogConfig {
  id: string
  type: DialogType
  title?: string
  message?: string
  content?: React.ReactNode // 自定义内容
  buttons?: DialogButton[]
  cancelable?: boolean // 是否点击背景可关闭
  onClose?: () => void
  duration?: number // toast 显示时长（ms）
}