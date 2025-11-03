import { useEffect, useRef, useState, useCallback, useMemo, memo } from 'react'
import { YStack, YStackProps } from 'tamagui'
import { Platform } from 'react-native'

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
  const isPausedRef = useRef(false)
  const frameRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(0)
  const [translateY, setTranslateY] = useState(0)
  
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
  
  // 动画循环
  useEffect(() => {
    const animate = (currentTime: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = currentTime
      }
      
      // 计算时间差（秒）
      const deltaTime = (currentTime - lastTimeRef.current) / 1000
      lastTimeRef.current = currentTime
      
      if (!isPausedRef.current) {
        setTranslateY(prev => {
          // 计算新位置（向上移动，所以是负值）
          const newY = prev - speed * deltaTime
          
          // 当滚动超过一组数据的高度时，重置到起始位置
          // 这样就实现了无缝循环
          if (Math.abs(newY) >= singleSetHeight) {
            return 0
          }
          
          return newY
        })
      }
      
      // 继续下一帧
      frameRef.current = requestAnimationFrame(animate)
    }
    
    // 启动动画
    frameRef.current = requestAnimationFrame(animate)
    
    // 清理函数
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [speed, singleSetHeight])
  
  // 暂停/恢复控制
  const pause = useCallback(() => {
    isPausedRef.current = true
  }, [])
  
  const resume = useCallback(() => {
    isPausedRef.current = false
    lastTimeRef.current = 0 // 重置时间，避免跳跃
  }, [])
  
  return (
    <YStack 
      height={actualContainerHeight} 
      overflow="hidden"
      {...props}
    >
      <YStack
        style={{
          transform: [{ translateY }],
          // Web 端使用 CSS transform 获得更好的性能
          ...(Platform.OS === 'web' && {
            willChange: 'transform',
          }),
        }}
      >
        {renderedItems}
      </YStack>
    </YStack>
  )
}