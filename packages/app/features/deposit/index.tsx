import { IOScrollView } from 'react-native-intersection-observer'
import { useState, useCallback, useMemo } from 'react'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { LazyImage } from '@my/ui'
import { XStack, Text, Button, YStack } from 'tamagui'


export const DepositScreen = () => {
  const [scrollY, setScrollY] = useState(0)
  const insets = useSafeArea()
  
  const HEADER_HEIGHT = 200
  const STICKY_HEIGHT = 60
  const isSticky = scrollY >= HEADER_HEIGHT

  // ✅ 方案1：用 useMemo 缓存组件，减少重复渲染 (空依赖，只创建一次)
  const StickyContent = useMemo(() => (
    <XStack bg="$green3" height={STICKY_HEIGHT} px="$4" items="center">
      <Text fontSize="$6" fontWeight="bold">Tab 或导航栏</Text>
      <Button>筛选</Button>
      <Button>排序</Button>
    </XStack>
  ), [])

  // ✅ 方案2：或者提取成函数组件
  const StickySection = () => (
    <XStack bg="$green3" height={STICKY_HEIGHT} px="$4" items="center">
      <Text fontSize="$6" fontWeight="bold">Tab 或导航栏</Text>
      <Button>筛选</Button>
      <Button>排序</Button>
    </XStack>
  )

  const handleScroll = useCallback((event) => {
    setScrollY(event.nativeEvent.contentOffset.y)
  }, [])

  return (
    <YStack flex={1} className="Scroll-box">
      <IOScrollView 
        onScroll={handleScroll} 
        scrollEventThrottle={16}
      >
        {/* 头部 */}
        <YStack height={HEADER_HEIGHT} bg="$blue5">
          <Text>顶部内容</Text>
        </YStack>
        
        {/* 第一份：未吸顶时显示 */}
        {!isSticky && <StickySection />}
        
        {/* 占位符 */}
        {isSticky && <YStack height={STICKY_HEIGHT} />}
        
        {/* 列表 - 带懒加载 */}
        <YStack>
          {Array.from({ length: 10 }, (_, index) => (
            <LazyImage key={index} width={100} height={100} source={{ uri: 'https://game-logo.d-e-7-f.com/pre/style1/en/FC_PANDADRAGONBOAT.jpg' }} />
          ))}
        </YStack>
      </IOScrollView>
      
      {/* 第二份：吸顶时显示 */}
      {isSticky && (
        <YStack 
          position="absolute" 
          t={insets.top} 
          l={0} 
          r={0} 
          z={999}
        >
          <StickySection />
        </YStack>
      )}
    </YStack>
  )
}