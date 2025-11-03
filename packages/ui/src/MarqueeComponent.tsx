import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Text, ScrollView, ScrollViewProps } from 'tamagui'

export function MarqueeComponent({ messages, color, ...props }: { messages: Recordable[], color?: any } & ScrollViewProps) {
  const [textX, setTextX] = useState(0)
  const [viewWidth, setViewWidth] = useState(0)
  const [textWidth, setTextWidth] = useState(0)
  const [textOpacity, setTextOpacity] = useState(0)
  const [currentMessage, setCurrentMessage] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout>(undefined)
  const textXRef = useRef(0)

  /** 处理视图布局 */
  const handleViewLayout = useCallback((event) => {
    const { width } = event.nativeEvent.layout
    setViewWidth(width)
  }, [])

  /** 处理文本布局 */
  const handleTextLayout = useCallback((event) => {
    const { width } = event.nativeEvent.layout
    setTextWidth(width)
  }, [])

  /** 内容容器样式 */
  const contentContainerStyle: Recordable = useMemo(() => ({
    items: 'center',
  }), [])

  useEffect(() => {
    if (intervalRef.current) return

    if (viewWidth && textWidth) {
      textXRef.current = viewWidth
      setTextX(textXRef.current)
      setTextOpacity(1)

      intervalRef.current = setInterval(() => {
        textXRef.current -= 1
        setTextX(textXRef.current)

        if (textXRef.current <= -textWidth) {
          setTextOpacity(0)
          setCurrentMessage((prev) => (prev + 1) % messages.length)
        }
      }, 15)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = undefined
      }
    }
  }, [viewWidth, textWidth, messages.length])


  return (
    <>
      <ScrollView
        horizontal
        height="100%"
        scrollEnabled={false}
        onLayout={handleViewLayout}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={contentContainerStyle}
        {...props}
      >
        <Text
          color={color}
          onLayout={handleTextLayout}
          x={textX}
          opacity={textOpacity}
        >
          {messages[currentMessage].content}
        </Text>
      </ScrollView>
    </>
  )
}
