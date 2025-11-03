import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ScrollView, ScrollViewProps } from 'tamagui'
import { Animated, Easing } from 'react-native'

export function MarqueeComponent({ 
  messages, 
  color,
  speed = 50,
  ...props 
}: { 
  messages: Recordable[]
  color?: any
  speed?: number
} & ScrollViewProps) {
  const [viewWidth, setViewWidth] = useState(0)
  const [textWidth, setTextWidth] = useState(0)
  const [currentMessage, setCurrentMessage] = useState(0)
  
  const translateX = useRef(new Animated.Value(0)).current

  const handleViewLayout = useCallback((event) => {
    const { width } = event.nativeEvent.layout
    setViewWidth(width)
  }, [])

  const handleTextLayout = useCallback((event) => {
    const { width } = event.nativeEvent.layout
    setTextWidth(width)
  }, [])

  const contentContainerStyle: Recordable = useMemo(() => ({
    items: 'center',
  }), [])

  const duration = useMemo(() => {
    return ((viewWidth + textWidth) / speed) * 1000
  }, [viewWidth, textWidth, speed])

  // 启动动画
  useEffect(() => {
    if (!viewWidth || !textWidth) return

    // 重置位置
    translateX.setValue(viewWidth)

    // 创建动画
    const animation = Animated.timing(translateX, {
      toValue: -textWidth,
      duration,
      useNativeDriver: true, // 使用原生驱动，性能最佳
      easing: Easing.linear,
    })

    // 监听动画完成
    animation.start(({ finished }) => {
      if (finished) {
        setCurrentMessage((prev) => (prev + 1) % messages.length)
      }
    })

    return () => {
      animation.stop()
    }
  }, [viewWidth, textWidth, currentMessage, duration, translateX, messages.length])

  return (
    <ScrollView
      horizontal
      height="100%"
      scrollEnabled={false}
      onLayout={handleViewLayout}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={contentContainerStyle}
      {...props}
    >
      <Animated.Text
        style={{
          color,
          opacity: viewWidth && textWidth ? 1 : 0,
          transform: [{ translateX }],
        }}
        onLayout={handleTextLayout}
      >
        {messages[currentMessage]?.content}
      </Animated.Text>
    </ScrollView>
  )
}