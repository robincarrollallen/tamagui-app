import { YStack, YStackProps, isWeb } from 'tamagui'
import { Animated, View, Easing } from 'react-native'
import { useEffect, useRef, useCallback, useMemo, memo } from 'react'

interface VerticalInfiniteScrollProps extends YStackProps {
  data: any[]
  itemHeight: number // 单个项目的高度
  speed?: number // 滚动速度（像素/秒）
  renderItem: (item: any, index: number) => React.ReactNode
  containerHeight?: number // 容器高度
  onItemVisible?: (item: any, index: number) => void // 当项目进入可视区域时的回调
}

export function VerticalInfiniteScroll({
  data,
  itemHeight,
  speed = 50, // 默认每秒滚动50像素
  renderItem,
  containerHeight,
  onItemVisible,
  ...props
}: VerticalInfiniteScrollProps) {
  const frameRef = useRef(0)
  const lastTimeRef = useRef(0)
  const isPausedRef = useRef(false)
  const webTranslateYRef = useRef(0)
  const translateYRef = useRef(new Animated.Value(0))
  const containerRefWeb = useRef<HTMLDivElement>(null)
  const animationRef = useRef<Animated.CompositeAnimation | null>(null)
  
  // 至少复制2份数据确保无缝循环
  const repeatedData = useMemo(() => [...data, ...data], [data])
  const singleSetHeight = useMemo(() => data.length * itemHeight, [data, itemHeight])

  // 计算实际容器高度
  const actualContainerHeight = useMemo(() => {
    const height = containerHeight && containerHeight < singleSetHeight ? containerHeight : singleSetHeight
    return height
  }, [containerHeight, data.length, itemHeight])

  const ScrollItem = memo<{
    item: any
    index: number
    itemHeight: number
    renderItem: (item: any, index: number) => React.ReactNode
  }>(({ item, index, itemHeight, renderItem }) => {
    return (
      <YStack height={itemHeight}>
        {renderItem(item, index)}
      </YStack>
    )
  })

  const renderedItems = useMemo(() => {
    return repeatedData.map((item, idx) => (
      <ScrollItem
        key={`${item.userId || item.id || idx}-${Math.floor(idx / data.length)}`}
        item={item}
        index={idx % data.length}
        itemHeight={itemHeight}
        renderItem={renderItem}
      />
    ))
  }, [repeatedData, data, itemHeight, renderItem])
  
  // ========== Native 平台：使用 Animated API ==========
  useEffect(() => {
    if (isWeb) return

    const duration = (singleSetHeight / speed) * 1000 // 计算一个周期需要的时间（毫秒）

    const startAnimation = () => {
      // 停止上一个动画
      if (animationRef.current) {
        animationRef.current.stop()
      }

      // 创建新的动画：从 0 移动到 -singleSetHeight
      animationRef.current = Animated.loop(
        Animated.timing(translateYRef.current, {
          toValue: -singleSetHeight,
          duration: duration,
          useNativeDriver: true, // 使用原生驱动，性能最佳
          easing: Easing.linear, // 线性缓动，保证动画匀速
        })
      )

      // 启动动画
      animationRef.current.start()
    }

    if (!isPausedRef.current) {
      startAnimation()
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.stop()
      }
    }
  }, [speed, singleSetHeight])

  // ========== Web 平台：使用 requestAnimationFrame ==========
  useEffect(() => {
    if (!isWeb) return

    const animate = (currentTime: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = currentTime
      }
      
      const deltaTime = (currentTime - lastTimeRef.current) / 1000
      lastTimeRef.current = currentTime
      
      if (!isPausedRef.current) {
        const newY = webTranslateYRef.current - speed * deltaTime
        
        if (Math.abs(newY) >= singleSetHeight) {
          webTranslateYRef.current = 0
        } else {
          webTranslateYRef.current = newY
        }

        containerRefWeb.current!.style.setProperty('transform', `translateY(${webTranslateYRef.current}px)`) // 直接操作DOM, 不用更新状态<性能最佳>
      }
      
      frameRef.current = requestAnimationFrame(animate)
    }
    
    frameRef.current = requestAnimationFrame(animate)
    
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [speed, singleSetHeight])
  
  // 暂停/恢复控制
  const pause = useCallback(() => {
    isPausedRef.current = true
    
    if (!isWeb && animationRef.current) {
      animationRef.current.stop()
    }
  }, [])
  
  const resume = useCallback(() => {
    isPausedRef.current = false
    lastTimeRef.current = 0

    if (!isWeb) {
      // Native 平台重新启动动画
      const duration = (singleSetHeight / speed) * 1000
      if (animationRef.current) {
        animationRef.current.stop()
      }
      animationRef.current = Animated.loop(
        Animated.timing(translateYRef.current, {
          toValue: -singleSetHeight,
          duration: duration,
          useNativeDriver: true, // 使用原生驱动，性能最佳
          easing: Easing.linear, // 线性缓动，保证动画匀速
        })
      )
      animationRef.current.start()
    }
  }, [singleSetHeight, speed])

  // ========== 条件渲染：Native vs Web ==========
  if (isWeb) {
    return (
      <YStack 
        height={actualContainerHeight} 
        overflow="hidden"
        {...props}
      >
        <YStack
        ref={containerRefWeb}
          style={{
            willChange: 'transform',
          }}
        >
          {renderedItems}
        </YStack>
      </YStack>
    )
  }

  // Native 平台使用 Animated.View
  return (
    <View 
      style={{
        height: actualContainerHeight,
        overflow: 'hidden',
      }}
    >
      <Animated.View
        style={{
          transform: [{ translateY: translateYRef.current }],
        }}
      >
        <YStack>
          {renderedItems}
        </YStack>
      </Animated.View>
    </View>
  )
}