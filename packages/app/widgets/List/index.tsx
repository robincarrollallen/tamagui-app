import { SVG } from '@my/assets'
import { useRem } from 'app/store'
import { SvgXml } from 'react-native-svg'
import { RefreshControl } from 'react-native'
import { Loader2 } from '@tamagui/lucide-icons'
import { YStack, isWeb, Spinner, Text } from 'tamagui'
import { LoadMoreType, LOAD_MORE_STATUS } from 'app/enums'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react'
import BigList, { BigListProps } from 'react-native-big-list'

type ListProps<T> = Omit<BigListProps<T>, 'renderHeader' | 'renderFooter' | 'onRefresh' > & {
  itemHeight?: number
  refreshing?: boolean
  footerHeight?: number
  onEndReached?: () => void
  loadingMore?: LoadMoreType
  onRefresh?: () => Promise<void>
  onScroll?: (event: any) => void
  renderHeader?: BigListProps<T>['renderHeader']
  renderFooter?: BigListProps<T>['renderFooter']
}

export const List = forwardRef<BigList<any>, ListProps<any>>(({
  data = [],
  renderItem,
  itemHeight = 100,
  footerHeight = 0,
  refreshing = false,
  renderHeader = null,
  renderFooter = null,
  loadingMore = undefined,
  onEndReached = () => null,
  onScroll = () => null,
  onRefresh = () => Promise.resolve(),
  ...props
}: ListProps<any>, ref) => {
  const safeArea = useSafeArea() // 安全区域
  const pullToRefreshRef = useRef<WebPullToRefreshRef>(null)
  const [scrollOffset, setScrollOffset] = useState(0)
  const rem = useRem()

  /** 滚动事件 */
  const onScrollHandler = useCallback((event: any) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent // 滚动信息(滚动偏移,内容高度,可视区域高度)
    setScrollOffset(contentOffset.y)
    onScroll?.(event)
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
      ref={ref}
      data={data}
      insetTop={0}
      insetBottom={0}
      headerHeight={0}
      renderItem={renderItem} // 渲染单个列表项
      itemHeight={itemHeight}
      scrollEventThrottle={16} // 滚动事件节流
      onScroll={onScrollHandler} // 滚动事件监听
      renderHeader={renderHeader}
      onEndReachedThreshold={0.1}
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
          titleColor="#facc15" // 自定义文本（仅 iOS）
          title=""
        />
      }
      footerHeight={
        loadingMore
        ? footerHeight - safeArea.bottom + rem(30)
        : footerHeight - safeArea.bottom
      }
      renderFooter={
        loadingMore === LOAD_MORE_STATUS.LOADING
        ? () => <Spinner size="small" color="$color"/>
        : loadingMore === LOAD_MORE_STATUS.NO_MORE
        ? () => <Text py={rem(5)} width="100%" text="center">没有更多了</Text>
        : () => loadingMore === LOAD_MORE_STATUS.MORE && data.length > 0
        ? <Text py={rem(5)} width="100%" text="center">加载更多</Text>
        : <Text />
      }
      {...(data && data.length > 0 && !refreshing && loadingMore === LOAD_MORE_STATUS.MORE ? { onEndReached } : {})}
      {...props}
    />
  )

  /** 空组件 */
  const EmptyComponent = (
    <YStack flex={1} items="center" pb={footerHeight as number || 0} pt={150}>
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
})

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