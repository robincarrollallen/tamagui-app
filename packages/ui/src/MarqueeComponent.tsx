import { useEffect, useRef, useState } from 'react'
import { Text, ScrollView, ScrollViewProps } from 'tamagui'

export function MarqueeComponent({ messages, color, ...props }: { messages: Recordable[], color?: any } & ScrollViewProps) {
  const [textX, setTextX] = useState(0)
  const [viewWidth, setViewWidth] = useState(0)
  const [textWidth, setTextWidth] = useState(0)
  const [textOpacity, setTextOpacity] = useState(0)
  const [currentMessage, setCurrentMessage] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout>(undefined)
  const textXRef = useRef(0)

  const handleViewLayout = (event) => {
    const { width } = event.nativeEvent.layout
    setViewWidth(width)
  }

  const handleTextLayout = (event) => {
    const { width } = event.nativeEvent.layout
    setTextWidth(width)
  }

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
          setCurrentMessage((currentMessage + 1) % messages.length)
        }
      }, 15)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = undefined
      }
    }
  }, [viewWidth, textWidth, currentMessage])


  return (
    <>
      <ScrollView
        horizontal
        height="100%"
        scrollEnabled={false}
        onLayout={handleViewLayout}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          items: 'center',
        }}
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
