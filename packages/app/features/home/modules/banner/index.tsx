import { ScrollView, View, XStack, Circle, Text, useTheme } from 'tamagui'
import { useState, useRef, useCallback, useEffect } from 'react'
import { Platform } from 'react-native'

interface CarouselProps {
  data?: Array<{ id: string; backgroundColor: string }>
  height?: number
  autoPlay?: boolean
  autoPlayInterval?: number
  showIndicators?: boolean
}

export function Banner({
  data = [],
  height = 200,
  autoPlay = false,
  autoPlayInterval = 3000,
  showIndicators = true,
}: CarouselProps) {
  const [containerWidth, setContainerWidth] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollViewRef = useRef<ScrollView>(null)
  const theme = useTheme()

  data = [
    { id: '1', backgroundColor: theme.red10?.get() },
    { id: '2', backgroundColor: theme.blue10?.get() },
    { id: '3', backgroundColor: theme.green10?.get() },
    { id: '4', backgroundColor: theme.blue11?.get() },
  ]

  // 跨平台获取容器宽度
  const handleLayout = useCallback((event: any) => {
    const { width } = event.nativeEvent.layout
    setContainerWidth(width)
  }, [])

  // 处理滚动事件 - 兼容 Web 和 Native
  const handleScroll = useCallback((event: any) => {
    if (!containerWidth) return
    
    let scrollX = 0
    
    if (Platform.OS === 'web') {
      // Web 端处理
      scrollX = event.target?.scrollLeft || event.nativeEvent?.contentOffset?.x || 0
    } else {
      // Native 端处理
      scrollX = event.nativeEvent.contentOffset.x
    }
    
    const index = Math.round(scrollX / containerWidth)
    setCurrentIndex(Math.max(0, Math.min(index, data.length - 1)))
  }, [containerWidth, data.length])

  // 程序化滚动
  const scrollToIndex = useCallback((index: number) => {
    if (!containerWidth || !scrollViewRef.current) return
    
    scrollViewRef.current.scrollTo({
      x: index * containerWidth,
      animated: true,
    })
  }, [containerWidth])

  // 自动播放
  useEffect(() => {
    if (!autoPlay || !containerWidth) return

    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % data.length
      scrollToIndex(nextIndex)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, currentIndex, data.length, scrollToIndex, containerWidth])

  return (
    <View onLayout={handleLayout}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
        // Web 端额外属性
        {...(Platform.OS === 'web' && {
          style: { scrollSnapType: 'x mandatory' } as any
        })}
      >
        <XStack>
          {data.map((item, index) => (
            <View
              key={item.id}
              width={containerWidth || '100%'}
              height={height}
              justify="center"
              items="center"
              style={{ 
                backgroundColor: item.backgroundColor,
              // Web 端滚动对齐
                ...(Platform.OS === 'web' && { scrollSnapAlign: 'start' })
              }}
            >
              <View
                p="$3"
                style={{ borderRadius: '$4', backgroundColor: theme.background?.get() }}
                opacity={0.9}
              >
                <Text fontSize="$6" fontWeight="bold" color="$color">
                  Page {index + 1}
                </Text>
              </View>
            </View>
          ))}
        </XStack>
      </ScrollView>

      {/* 指示器 */}
      {showIndicators && (
        <XStack
          justify="center"
          items="center"
          gap="$2"
          mt="$3"
        >
          {data.map((_, index) => (
            <Circle
              key={index}
              size={10}
              background={
                index === currentIndex ? '$blue10' : '$gray5'
              }
              borderWidth={1}
              borderColor={index === currentIndex ? '$blue10' : '$blue8'}
              pressStyle={{ scale: 0.9 }}
              onPress={() => scrollToIndex(index)}
              // Web 端鼠标样式
              {...(Platform.OS === 'web' && {
                cursor: 'pointer'
              })}
            />
          ))}
        </XStack>
      )}
    </View>
  )
}