import { ScrollView, View, XStack, YStack, Circle, Image } from 'tamagui'
import { useState, useRef, useCallback, useEffect, useMemo } from 'react'
import { useResponsiveSize } from 'app/hooks/ResponsiveSize'
import { useTenantStore } from 'app/store'
import { Platform } from 'react-native'

interface CarouselProps {
  data?: Array<{ id: string; backgroundColor: string }>
  height?: number
  autoPlay?: boolean
  autoPlayInterval?: number
  showIndicators?: boolean
}

export function ProfileScreen({
  autoPlay = false,
  autoPlayInterval = 3000,
  showIndicators = true,
}: CarouselProps) {
  const [containerWidth, setContainerWidth] = useState(0)
  const [displayIndex, setDisplayIndex] = useState(1) // 显示索引（从1开始）
  const [realIndex, setRealIndex] = useState(0) // 真实数据索引
  const [isScrolling, setIsScrolling] = useState(false) // 滚动状态
  const { bannerList } = useTenantStore()
  const scrollViewRef = useRef<ScrollView>(null)
  const scrollTimeout = useRef<NodeJS.Timeout>(null)
  const { rem } = useResponsiveSize()

  // 配置常量
  const ITEM_WIDTH_PERCENTAGE = 0.8 // 卡片占容器宽度的 80%
  const ITEM_SPACING = rem(12) // 卡片间距

  // 构建循环数据 - 在首尾各添加一个副本
  const buildLoopData = useCallback(() => {
    if (bannerList.length <= 1) return bannerList
    
    const lastItem = {
      ...bannerList[bannerList.length - 1],
      id: `${bannerList[bannerList.length - 1].id + 1}`
    }
    const firstItem = {
      ...bannerList[0],
      id: `${bannerList[0].id - 1}`
    }
    
    return [lastItem, ...bannerList, firstItem]
  }, [bannerList])

  const loopData = buildLoopData()
  const realDataLength = bannerList.length

  // 计算相关尺寸
  const itemWidth = containerWidth * ITEM_WIDTH_PERCENTAGE
  const scrollDistance = itemWidth + ITEM_SPACING
  const padding = (containerWidth - itemWidth) / 2

  // 计算每个位置的精确偏移量
  const snapOffsets = useMemo(() => {
    if (!containerWidth || loopData.length === 0) return []
    
    return loopData.map((_, index) => {
      return padding + index * scrollDistance
    })
  }, [containerWidth, loopData.length, padding, scrollDistance])

  // 跨平台获取容器宽度
  const handleLayout = useCallback((event: any) => {
    const { width } = event.nativeEvent.layout
    setContainerWidth(width)
    
    // 初始化时滚动到真实的第一项（索引1）
    if (width > 0 && scrollViewRef.current) {
      const itemWidth = width * ITEM_WIDTH_PERCENTAGE
      const scrollDistance = itemWidth + ITEM_SPACING
      const padding = (width - itemWidth) / 2
      
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          x: padding + scrollDistance,
          animated: false,
        })
      }, 100)
    }
  }, [ITEM_WIDTH_PERCENTAGE, ITEM_SPACING])

  // 处理滚动事件
  const handleScroll = useCallback((event: any) => {
    if (!containerWidth) return
    
    let scrollX = 0
    
    if (Platform.OS === 'web') {
      scrollX = event.target?.scrollLeft || event.nativeEvent?.contentOffset?.x || 0
    } else {
      scrollX = event.nativeEvent.contentOffset.x
    }
    
    const itemWidth = containerWidth * ITEM_WIDTH_PERCENTAGE
    const scrollDistance = itemWidth + ITEM_SPACING
    const padding = (containerWidth - itemWidth) / 2
    
    // 计算当前索引（考虑左侧 padding）
    const index = Math.round((scrollX - padding) / scrollDistance)
    setDisplayIndex(index)
    
    // 计算对应的真实索引用于指示器显示
    let newRealIndex = 0
    if (index === 0) {
      // 在克隆的最后一项
      newRealIndex = realDataLength - 1
    } else if (index === realDataLength + 1) {
      // 在克隆的第一项
      newRealIndex = 0
    } else {
      // 正常范围内
      newRealIndex = index - 1
    }
    
    setRealIndex(Math.max(0, Math.min(newRealIndex, realDataLength - 1)))
  }, [containerWidth, realDataLength, ITEM_WIDTH_PERCENTAGE, ITEM_SPACING])

  // 处理滚动开始
  const handleScrollBegin = useCallback(() => {
    setIsScrolling(true)
    clearTimeout(scrollTimeout.current as NodeJS.Timeout)
  }, [])

  // 处理滚动结束 - 实现无限循环的关键
  const handleMomentumScrollEnd = useCallback(() => {
    if (!containerWidth || !scrollViewRef.current) return
    
    const itemWidth = containerWidth * ITEM_WIDTH_PERCENTAGE
    const scrollDistance = itemWidth + ITEM_SPACING
    const padding = (containerWidth - itemWidth) / 2
    
    // 延迟处理，确保滚动完全停止
    setTimeout(() => {
      setIsScrolling(false)
      
      // 边界处理 - 只处理跳转，不更新 realIndex
      if (displayIndex === 0) {
        scrollViewRef.current?.scrollTo({
          x: padding + realDataLength * scrollDistance,
          animated: false,
        })
        setDisplayIndex(realDataLength)
        // realIndex 保持不变，因为在 handleScroll 中已经正确设置
      } else if (displayIndex === realDataLength + 1) {
        scrollViewRef.current?.scrollTo({
          x: padding + scrollDistance,
          animated: false,
        })
        setDisplayIndex(1)
        // realIndex 保持不变
      }
    }, 100)
  }, [displayIndex, realDataLength, containerWidth, ITEM_WIDTH_PERCENTAGE, ITEM_SPACING])

  // 程序化滚动
  const scrollToIndex = useCallback((index: number) => {
    if (!containerWidth || !scrollViewRef.current || isScrolling) return
    
    const itemWidth = containerWidth * ITEM_WIDTH_PERCENTAGE
    const scrollDistance = itemWidth + ITEM_SPACING
    const padding = (containerWidth - itemWidth) / 2
    
    scrollViewRef.current.scrollTo({
      x: padding + index * scrollDistance,
      animated: true,
    })
  }, [containerWidth, isScrolling, ITEM_WIDTH_PERCENTAGE, ITEM_SPACING])

  // 自动播放 - 支持无限循环
  useEffect(() => {
    if (!autoPlay || !containerWidth || isScrolling) return

    const interval = setInterval(() => {
      const nextDisplayIndex = displayIndex + 1
      scrollToIndex(nextDisplayIndex)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, displayIndex, containerWidth, isScrolling, scrollToIndex])

  // 清理定时器
  useEffect(() => {
    return () => {
      clearTimeout(scrollTimeout.current as NodeJS.Timeout)
    }
  }, [])

  return (
    <YStack px={rem(12)}>
      <View onLayout={handleLayout}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled={false}
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          onScrollBeginDrag={handleScrollBegin}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          onTouchEnd={handleMomentumScrollEnd}
          scrollEventThrottle={16}
          decelerationRate="fast"
          snapToOffsets={snapOffsets} // 使用精确偏移量替代 snapToInterval
          snapToAlignment="start"
          contentContainerStyle={{
            px: padding,
          }}
          // Web 端额外属性
          {...(Platform.OS === 'web' && {
            style: { scrollSnapType: 'x mandatory' } as any
          })}
        >
          <XStack gap={ITEM_SPACING}>
            {loopData.map((item, index) => (
              <View
                key={item.id}
                width={itemWidth || containerWidth * ITEM_WIDTH_PERCENTAGE}
                justify="center"
                items="center"
                style={{
                  // Web 端滚动对齐
                  ...(Platform.OS === 'web' && { scrollSnapAlign: 'center' })
                }}
              >
                <Image 
                  width="100%" 
                  aspectRatio={61 / 38} 
                  borderRadius={rem(12)} 
                  source={{ uri: item.imageUrl }} 
                />
              </View>
            ))}
          </XStack>
        </ScrollView>

        {/* 指示器 - 基于真实索引 */}
        {showIndicators && (
          <XStack
            justify="center"
            items="center"
            gap="$2"
            my="$3"
          >
            {bannerList.map((_, index) => (
              <Circle
                key={index}
                size={10}
                background={
                  index === realIndex ? '$blue10' : '$gray5'
                }
                borderWidth={1}
                borderColor={index === realIndex ? '$blue10' : '$blue8'}
                pressStyle={{ scale: 0.9 }}
                onPress={() => scrollToIndex(index + 1)} // +1 因为真实数据从索引1开始
                // Web 端鼠标样式
                {...(Platform.OS === 'web' && {
                  cursor: 'pointer'
                })}
              />
            ))}
          </XStack>
        )}
      </View>
    </YStack>
  )
}