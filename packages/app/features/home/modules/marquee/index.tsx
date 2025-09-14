import { useEffect, useRef, useState } from 'react'
import { Platform } from 'react-native'
import { Text, ScrollView } from 'tamagui'

export function Marquee(props) {
  const [textX, setTextX] = useState(0)
  const [viewWidth, setViewWidth] = useState(0)
  const [textWidth, setTextWidth] = useState(0)
  const [currentMessage, setCurrentMessage] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout>(undefined)
  const textXRef = useRef(0)

  const messages = [
    'Hello, world!',
    'This is a test message',
    'This is another test message',
    'This is a third test message',
    'This is a fourth test message',
    'This is a fifth test message',
    'This is a sixth test message',
  ]

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
      console.log('viewWidth', viewWidth)
      console.log('textWidth', textWidth)
      console.log('currentMessage', currentMessage)
      textXRef.current = viewWidth
      setTextX(textXRef.current)

      intervalRef.current = setInterval(() => {
        textXRef.current -= 1
        setTextX(textXRef.current)

        if (textXRef.current <= -textWidth) {
          clearInterval(intervalRef.current)
          intervalRef.current = undefined
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
        showsHorizontalScrollIndicator={false}
        borderColor="$borderColor"
        borderWidth={1}
        bg="$color9"
        height={30}
        scrollEnabled={false}
        style={{
          flexGrow: 0,
        }}
        contentContainerStyle={{
          items: 'center',
        }}
        onLayout={handleViewLayout}
      >
        <Text
          onLayout={handleTextLayout}
          x={textX}
        >
          {messages[currentMessage]}
        </Text>
      </ScrollView>
    </>
  )
}
