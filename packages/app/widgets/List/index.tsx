import { SVG } from '@my/assets'
import { SvgXml } from 'react-native-svg'
import { RefreshControl } from 'react-native'
import { Loader2 } from '@tamagui/lucide-icons'
import { YStack, isWeb, Spinner, Text } from 'tamagui'
import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react'
import BigList, { BigListProps } from 'react-native-big-list'

type ListProps<T> = Omit<BigListProps<T>, 'renderHeader' | 'onRefresh' > & {
  itemHeight?: number
  refreshing?: boolean
  onEndReached?: () => void
  onRefresh?: () => Promise<void>
  renderHeader?: BigListProps<T>['renderHeader']
  renderFooter?: BigListProps<T>['renderFooter']
}

export const List = ({
  data = [],
  renderItem,
  itemHeight = 100,
  refreshing = false,
  renderHeader = () => null,
  renderFooter = () => null,
  onEndReached = () => null,
  onRefresh = () => Promise.resolve(),
  ...props
}: ListProps<any>) => {
  const [scrollOffset, setScrollOffset] = useState(0)
  const pullToRefreshRef = useRef<WebPullToRefreshRef>(null)

  /** 滚动事件 */
  const onScroll = useCallback((event: any) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent // 滚动信息(滚动偏移,内容高度,可视区域高度)
    setScrollOffset(contentOffset.y)
  }, [])

  /** 下拉刷新事件回调 */
  const onRefreshHandler = useCallback(async () => {
    try {
      await onRefresh()
    } finally {
      pullToRefreshRef.current?.reset()
    }
  }, [])
  
  /** 长列表组件 */
  const ListComponent = (
    <BigList
      data={data}
      insetTop={0}
      insetBottom={0}
      headerHeight={0}
      footerHeight={0}
      onScroll={onScroll} // 滚动事件监听
      renderItem={renderItem} // 渲染单个列表项
      itemHeight={itemHeight}
      renderHeader={renderHeader}
      renderFooter={renderFooter}
      onEndReached={onEndReached} // 滚动到底部事件
      keyExtractor={(item) => item.id}
      renderEmpty={() => EmptyComponent}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          onRefresh={onRefreshHandler}
          refreshing={refreshing}
          colors={['#facc15', '#ef4444', '#3b82f6']} // Android 多色
          progressBackgroundColor="#1f2937" // 自定义背景（Android）
          tintColor="#facc15" // iOS 单色
          size={100} // 自定义大小（Android）
          // 自定义文本（仅 iOS）
          titleColor="#facc15"
          title=""
        />
      }
      {...props}
    />
  )

  /** 空组件 */
  const EmptyComponent = (
    <YStack flex={1} items="center" pb={props.footerHeight as number || 0} pt={150}>
      <SvgXml xml={SVG.empty} />
      <Text color="$textWeakest">No Record</Text>
    </YStack>
  )

  if (isWeb) {
    return (
      <WebPullToRefresh ref={pullToRefreshRef} onRefresh={onRefreshHandler} refreshing={refreshing} scrollOffset={scrollOffset}>
        {ListComponent}
      </WebPullToRefresh>
    )
  }

  return (
    <YStack flex={1}>
      {ListComponent}
    </YStack>
  )
}

/** Web 端的下拉刷新引用(暴露给父组件属性) */
interface WebPullToRefreshRef {
  setPullDistance: (distance: number) => void
  getPullDistance: () => number
  reset: () => void
}

/** Web 端的下拉刷新属性 */
interface WebPullToRefreshProps {
  children: any
  refreshing: boolean
  scrollOffset: number
  onRefresh: () => void
}

/** Web 端的下拉刷新包装器 */
const WebPullToRefresh = forwardRef<WebPullToRefreshRef, WebPullToRefreshProps>(({ children, onRefresh, refreshing, scrollOffset }, ref) => {
  const [pullDistance, setPullDistance] = useState(0) // 下拉距离
  const [allowPulling, setAllowPulling] = useState(false) // 是否允许下拉
  const containerRef = useRef<HTMLDivElement>(null) // 下拉容器引用
  const startY = useRef(0) // 开始触摸的Y坐标

  const handleTouchStart = (e) => {
    const isScrollTop = scrollOffset === 0 // 判断是否在顶部
    if (isScrollTop && !refreshing) {
      
      startY.current = e.touches[0].clientY
      setAllowPulling(true)
    }
  }

  const handleTouchMove = (e) => {
    if (!allowPulling || refreshing) return
    
    const currentY = e.touches[0].clientY
    const distance = currentY - startY.current
    
    if (distance > 0) {
      setPullDistance(Math.min(distance, 150))
    }
  }

  const handleTouchEnd = () => {
    if (pullDistance > 80) {
      if (onRefresh && !refreshing) {
        onRefresh()
      }
    } else {
      setPullDistance(0)
      setAllowPulling(false)
    }
  }

  /** 暴露方法给父组件 */
  useImperativeHandle(ref, () => ({
    setPullDistance,
    getPullDistance: () => pullDistance,
    reset: () => {
      setPullDistance(0)
      setAllowPulling(false)
    }
  }))

  return (
    <YStack 
      flex={1} 
      position="relative"
      ref={containerRef}
      width="100%"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 下拉指示器 */}
      {pullDistance > 0 && (
        <YStack
          t={0}
          l={0}
          r={0}
          z={999}
          items="center"
          justify="center"
          position="absolute"
          height={pullDistance}
        >
          <YStack
            opacity={Math.min(pullDistance / 80, 1)}
            animation="quick"
          >
            { 
              refreshing
              ? <Spinner size="large" color="$color"/>
              : <Loader2 size={42} transform={[{ rotate: `${pullDistance * 2}deg` }]} />
            }
          </YStack>
        </YStack>
      )}
      {/* 内容区域 */}
      {children}
    </YStack>
  )
})