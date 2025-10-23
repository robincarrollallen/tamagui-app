import { YStack, Text, XStack, Input, InputProps } from 'tamagui'
import { forwardRef, useMemo, useState } from 'react'
import { X, EyeClosed, Eye, CircleAlert} from '@tamagui/lucide-icons'
import { useResponsiveSize } from 'app/hooks/ResponsiveSize'
import { validateInput } from 'app/utils/validate'
import { useInputErrorMessage } from "app/hooks/message"

export interface FormInputProps extends InputProps {
  type?: string
  border?: boolean
  label?: React.ReactNode
  errorMessage?: string
  required?: boolean
  error?: boolean
  clear?: boolean
  suffix?: React.ReactNode
}

export const Field = forwardRef<
  React.ComponentRef<typeof Input>,
  FormInputProps
>(({ label, errorMessage, required, error = false, suffix, border = true, clear = true, type = 'text', ...props }, ref) => {
  const { rem } = useResponsiveSize()
  const [showPassword, setShowPassword] = useState(false)
  const [emptyError, setEmptyError] = useState(false)
  const [errorText, setErrorText] = useState(errorMessage)
  const inputErrorMessage = useInputErrorMessage()

  /** 是否显示密码 */
  const secureTextEntry = useMemo(() => {
    return type === 'password' && !showPassword
  }, [type, showPassword])

  /** 是否显示错误 */
  const hasError = useMemo(() => {
    if (error) {
      if (errorMessage) {
        setErrorText(errorMessage)
        return true
      }

      if (props.value) {
        const result = validateInput(props.value, type)

        if (!result) {
          setErrorText(inputErrorMessage[type] || '')
          return true
        }
      }
    }

    return false
  }, [error, props.value, type])

  /** 失去焦点 */
  const onBlur = () => {
    if (required && !props.value) {
      setEmptyError(true)
    }
  }
  
  return (
    <>
      <XStack
        gap="$2"
        p={rem(12)}
        width="100%"
        items="center"
        bg="$surfaceLowered"
        borderColor="$borderDefault"
        style={{ borderRadius: rem(6) }}
        borderWidth={border ? rem(1) : 0}
      >
        { Label({ label }) }
        <Input
          p={0}
          flex={1}
          height={rem(22)}
          bg="transparent"
          borderWidth={0}
          secureTextEntry={secureTextEntry}
          focusStyle={{ outlineWidth: 0 }}
          placeholderTextColor={emptyError ? "$danger" : "$textWeaker"}
          onBlur={onBlur}
          {...props}
        />
        { clear && props.value
          ? <ClearButton onClear={() => props.onChangeText?.('')} />
          : null }
        { suffix ? suffix : null }
        { type === 'password'
          ? <YStack onPress={() => setShowPassword(!showPassword)}>{
              showPassword
              ? <Eye size={rem(20)} />
              : <EyeClosed size={rem(20)} />
            }</YStack>
          : null
        }
      </XStack>
      <XStack items="center" gap="$2" opacity={hasError ? 1 : 0}>
        {<CircleAlert size={rem(12)} color="$danger" />}
        <Text fontSize="$2" color="$danger">{errorText}</Text>
      </XStack>
    </>
  )
})

Field.displayName = 'Field'

const ClearButton = ({ onClear }: { onClear: () => void | undefined }) => {
  const { rem } = useResponsiveSize()

  return (
    <YStack aspectRatio={1} p={rem(5)} bg="$textWeakest" style={{ borderRadius: "50%" }} onPress={onClear}>
      <X size={rem(12)} />
    </YStack>
  )
}

const Label = ({ label }: { label?: React.ReactNode }) => {
  if (!label) return null
  
  if (typeof label === 'string') {
    return (
      <Text> {label} </Text>
    )
  }
  
  return label
}