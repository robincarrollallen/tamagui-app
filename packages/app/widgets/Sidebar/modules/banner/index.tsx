import { ScrollView, View, XStack, YStack, Circle, Image, Text } from 'tamagui'
import { useState, useRef, useCallback, useEffect } from 'react'
import { LinearGradient } from '@tamagui/linear-gradient';
import { useRem, useTenantStore } from 'app/store';
import { Platform } from 'react-native'
import { ICONS } from "@my/assets";
import { LazyImage } from '@my/ui';

interface CarouselProps {
  data?: Array<{ id: string; backgroundColor: string }>
  height?: number
  autoPlay?: boolean
  autoPlayInterval?: number
  showIndicators?: boolean
}

export function SidebarBanner({
  autoPlay = false,
  autoPlayInterval = 3000,
  showIndicators = true,
}: CarouselProps) {
  const [realIndex, setRealIndex] = useState(0) // 真实数据索引
  const [displayIndex, setDisplayIndex] = useState(1) // 显示索引（从1开始）
  const [isScrolling, setIsScrolling] = useState(false) // 滚动状态
  const [containerWidth, setContainerWidth] = useState(0)
  const bannerList = useTenantStore(state => state.bannerList)
  const scrollTimeout = useRef<NodeJS.Timeout>(null)
  const scrollViewRef = useRef<ScrollView>(null)
  const rem = useRem() // 响应式尺寸

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

  // 跨平台获取容器宽度
  const handleLayout = useCallback((event: any) => {
    const { width } = event.nativeEvent.layout
    setContainerWidth(width)
    
    // 初始化时滚动到真实的第一项（索引1）
    if (width > 0 && scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          x: width,
          animated: false,
        })
      }, 100)
    }
  }, [])

  // 处理滚动事件
  const handleScroll = useCallback((event: any) => {
    if (!containerWidth) return
    
    let scrollX = 0
    
    if (Platform.OS === 'web') {
      scrollX = event.target?.scrollLeft || event.nativeEvent?.contentOffset?.x || 0
    } else {
      scrollX = event.nativeEvent.contentOffset.x
    }
    
    const index = Math.round(scrollX / containerWidth)
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
  }, [containerWidth, realDataLength])

  // 处理滚动开始
  const handleScrollBegin = useCallback(() => {
    setIsScrolling(true)
    clearTimeout(scrollTimeout.current as NodeJS.Timeout)
  }, [])

  // 处理滚动结束 - 实现无限循环的关键
  const handleMomentumScrollEnd = useCallback(() => {
    if (!containerWidth || !scrollViewRef.current) return
    
    // 延迟处理，确保滚动完全停止
    setTimeout(() => {
      setIsScrolling(false)
      
      // 边界处理 - 只处理跳转，不更新 realIndex
      if (displayIndex === 0) {
        scrollViewRef.current?.scrollTo({
          x: realDataLength * containerWidth,
          animated: false,
        })
        setDisplayIndex(realDataLength)
        // realIndex 保持不变，因为在 handleScroll 中已经正确设置
      } else if (displayIndex === realDataLength + 1) {
        scrollViewRef.current?.scrollTo({
          x: containerWidth,
          animated: false,
        })
        setDisplayIndex(1)
        // realIndex 保持不变
      }
    }, 100)
  }, [displayIndex, realDataLength, containerWidth])

  // 程序化滚动
  const scrollToIndex = useCallback((index: number) => {
    if (!containerWidth || !scrollViewRef.current || isScrolling) return
    
    scrollViewRef.current.scrollTo({
      x: index * containerWidth,
      animated: true,
    })
  }, [containerWidth, isScrolling])

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
    <LinearGradient
      p={rem(1)}
      end={[1, 1]}
      width="100%"
      start={[0, 0]}
      borderTopLeftRadius={rem(12)}
      borderTopRightRadius={rem(12)}
      borderBottomLeftRadius={rem(12)}
      borderBottomRightRadius={rem(12)}
      colors={['$glowPrimaryOpacity40', '$surfaceRaisedL2']}
      locations={[0, .3]}
    >
      <YStack
        px={rem(16)}
        pt={rem(10)}
        pb={rem(10)}
        bg="$surfaceRaisedL2"
        borderTopLeftRadius={rem(12)}
        borderTopRightRadius={rem(12)}
        borderBottomLeftRadius={rem(12)}
        borderBottomRightRadius={rem(12)}
      >
        <XStack pb={rem(8)} items="center" justify="space-between">
          <XStack gap={rem(4)} items="center">
            <LazyImage source={ICONS.tabbar_promo_25} width={rem(24)} height={rem(24)} />
            <Text fontSize={rem(16)} fontWeight="bold">Banner</Text>
          </XStack>
          <Text fontSize={rem(12)} color="$textBrandPrimary">All</Text>
        </XStack>
        <View onLayout={handleLayout}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            onScrollBeginDrag={handleScrollBegin}
            onMomentumScrollEnd={handleMomentumScrollEnd}
            onTouchEnd={handleMomentumScrollEnd}
            scrollEventThrottle={16}
            decelerationRate="fast"
            // Web 端额外属性
            {...(Platform.OS === 'web' && {
              style: { scrollSnapType: 'x mandatory' } as any
            })}
          >
            <XStack>
              {loopData.map((item, index) => (
                <View
                  key={item.id}
                  width={containerWidth || '100%'}
                  justify="center"
                  items="center"
                  style={{
                    // Web 端滚动对齐
                    ...(Platform.OS === 'web' && { scrollSnapAlign: 'center' })
                  }}
                >
                  <Image width="100%" aspectRatio={61 / 38} borderTopLeftRadius={rem(12)} borderTopRightRadius={rem(12)} borderBottomLeftRadius={rem(12)} borderBottomRightRadius={rem(12)} source={{ uri: item.imageUrl }} />
                </View>
              ))}
            </XStack>
          </ScrollView>

          {/* 指示器 - 基于真实索引 */}
          {showIndicators && (
            <XStack
              justify="center"
              items="center"
              gap={rem(8)}
              mt={rem(10)}
            >
              {bannerList.map((_, index) => (
                <Circle
                  key={index}
                  width={index === realIndex ? rem(16) : rem(8)}
                  height={rem(4)}
                  background={
                    index === realIndex ? '$iconBrandPrimary' : '$textWeaker'
                  }
                />
              ))}
            </XStack>
          )}
        </View>
      </YStack>
    </LinearGradient>
  )
}