import { createContext, useContext, useRef, useState, type ReactNode } from 'react'
import { Portal, Spinner, YStack, Text } from 'tamagui'

type LoadingContextType = {
  show: (message?: string) => void
  hide: () => void
  isLoading: boolean
}

const LoadingContext = createContext<LoadingContextType | null>(null)

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<string>('')
  const countRef = useRef(0) // 引用计数

  const show = (msg = '') => {
    countRef.current++
    setMessage(msg)
    setIsLoading(true)
  }

  const hide = () => {
    countRef.current--
    if (countRef.current <= 0) {
      countRef.current = 0
      setIsLoading(false)
      setMessage('')
    }
  }

  return (
    <LoadingContext.Provider value={{ show, hide, isLoading }}>
      {children}
      {isLoading && (
        <Portal zIndex={999999}>
          <YStack
            t={0}
            l={0}
            r={0}
            b={0}
            items="center"
            justify="center"
            position="absolute"
            onPress={() => {}} // native 阻止穿透
            pointerEvents="auto" // web 阻止穿透
            background="rgba(0,0,0,0.0)" // 遮罩层
          >
            <YStack
              p="$4"
              gap="$3"
              items="center"
              borderTopLeftRadius="$4"
              borderTopRightRadius="$4"
              borderBottomLeftRadius="$4"
              borderBottomRightRadius="$4"
              background="rgba(0,0,0,0.0)" // 内容区域
            >
              <Spinner size="large" color="$color" />
              {message && <Text>{message}</Text>}
            </YStack>
          </YStack>
        </Portal>
      )}
    </LoadingContext.Provider>
  )
}

export const useGlobalLoading = () => {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error('useGlobalLoading must be used within GlobalLoadingProvider')
  }
  return context
}