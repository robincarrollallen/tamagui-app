import { useState, useCallback } from 'react'
import { 
  YStack, 
  XStack, 
  ScrollView, 
  Text, 
  Button,
  View,
  Card,
  H2,
  Paragraph
} from 'tamagui'
import { Platform, NativeScrollEvent, NativeSyntheticEvent, Dimensions } from 'react-native'
import { useSafeArea } from '../../../app/provider/safe-area/use-safe-area'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

// 修正版本
export const DepositScreen = () => {
  const [scrollY, setScrollY] = useState(0)
  const insets = useSafeArea()
  
  // 大幅增加各个区域的高度，效果更明显
  const HEADER_HEIGHT = 400        // B区域高度
  const STICKY_HEIGHT = 200        // C区域高度 
  const FOOTER_HEIGHT = 800        // E区域高度
  const LIST_ITEM_HEIGHT = 120     // D区域每项高度
  const LIST_ITEMS_COUNT = 12      // D区域项目数量
  
  // 重新计算关键位置
  const STICKY_TRIGGER_POINT = HEADER_HEIGHT // C开始吸顶的位置: 400px
  const FOOTER_START_POINT = HEADER_HEIGHT + STICKY_HEIGHT + (LIST_ITEM_HEIGHT * LIST_ITEMS_COUNT) // E区域实际开始位置
  
  // 关键修正：当E区域的顶部开始进入屏幕底部时，立即开始推出C
  const PUSH_OUT_START_POINT = FOOTER_START_POINT - SCREEN_HEIGHT
  
  // 计算C区域的状态
  const getStickyState = () => {
    if (scrollY < STICKY_TRIGGER_POINT) {
      // 状态1: 正常状态，C跟随滚动
      return {
        isStuck: false,
        translateY: 0,
        showFixed: false
      }
    } else if (scrollY >= STICKY_TRIGGER_POINT && scrollY < PUSH_OUT_START_POINT) {
      // 状态2: 吸顶状态，C固定在顶部
      return {
        isStuck: true,
        translateY: 0,
        showFixed: true
      }
    } else {
      // 状态3: 推出状态，C被E物理推出
      const pushProgress = scrollY - PUSH_OUT_START_POINT
      // 推出距离应该等于C的完整高度 + 安全区域，这样C才能完全消失
      const maxPushDistance = STICKY_HEIGHT + insets.top + 20 // 多加20px确保完全推出
      const pushOffset = Math.min(pushProgress, maxPushDistance)
      
      return {
        isStuck: true,
        translateY: -pushOffset, // 负值表示向上推出
        showFixed: true
      }
    }
  }
  
  const stickyState = getStickyState()
  
  // 处理滚动事件
  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollY = event.nativeEvent.contentOffset.y
    setScrollY(currentScrollY)
  }, [])

  // B区域 - 头部内容
  const HeaderSection = () => (
    <Card 
      height={HEADER_HEIGHT} 
      backgroundColor="$blue3" 
      padding="$6"
      justifyContent="center"
      alignItems="center"
    >
      <H2 color="$blue12" fontSize="$8">头部内容区域 (B)</H2>
      <H2 color="$blue12" fontSize="$7">高度: {HEADER_HEIGHT}px</H2>
      <Paragraph text="center" color="$blue11" fontSize="$5" mt="$4">
        这是页面的头部区域，现在高度为 {HEADER_HEIGHT}px
      </Paragraph>
      <YStack mt="$6" gap="$2" items="center">
        <Text fontSize="$4" color="$blue10" fontWeight="bold">
          滚动位置: {Math.round(scrollY)}px
        </Text>
        <Text fontSize="$3" color="$blue9">
          吸顶触发点: {STICKY_TRIGGER_POINT}px
        </Text>
        <Text fontSize="$3" color="$blue9">
          E区域开始位置: {FOOTER_START_POINT}px
        </Text>
        <Text fontSize="$3" color="$blue9">
          推出开始点: {Math.round(PUSH_OUT_START_POINT)}px
        </Text>
      </YStack>
    </Card>
  )

  // C区域 - 需要吸顶的内容
  const StickySection = () => (
    <XStack
      height={STICKY_HEIGHT}
      bg="$green3"
      borderWidth={4}
      borderColor="$green6"
      px="$6"
      justify="space-between"
      items="center"
    >
      <YStack flex={1} gap="$2">
        <Text fontSize="$8" fontWeight="bold" color="$green12">
          吸顶内容 (C)
        </Text>
        <Text fontSize="$6" color="$green12">
          高度: {STICKY_HEIGHT}px
        </Text>
        <Text fontSize="$5" color="$green11" fontWeight="600">
          {stickyState.isStuck ? '🔒 吸顶中' : '📄 正常状态'}
        </Text>
        <Text fontSize="$4" color="$green10">
          推出偏移: {Math.round(stickyState.translateY)}px
        </Text>
        <Text fontSize="$3" color="$green9">
          观察这个绿色区域被红色区域推出屏幕的过程
        </Text>
      </YStack>
      <YStack gap="$3">
        <Button size="$5" theme="green" fontSize="$4">筛选</Button>
        <Button size="$5" theme="green" variant="outlined" fontSize="$4">排序</Button>
        <Button size="$5" theme="green" variant="outlined" fontSize="$4">更多</Button>
      </YStack>
    </XStack>
  )

  // D区域 - 长列表内容
  const ListSection = () => (
    <YStack bg="$color2" p="$2">
      {Array.from({ length: LIST_ITEMS_COUNT }, (_, index) => (
        <Card 
          key={index} 
          height={LIST_ITEM_HEIGHT}
          margin="$2"
          padding="$4"
          backgroundColor="$background"
          borderWidth={1}
          borderColor="$borderColor"
        >
          <XStack justify="space-between" items="center" height="100%">
            <YStack flex={1} gap="$2">
              <Text fontSize="$5" fontWeight="600">
                列表项 {index + 1}
              </Text>
              <Text fontSize="$4" color="$color10">
                长列表区域 (D) 的第 {index + 1} 项内容，高度 {LIST_ITEM_HEIGHT}px
              </Text>
              <Text fontSize="$3" color="$color9">
                继续滚动，直到红色的E区域出现
              </Text>
            </YStack>
            <Button size="$4" variant="outlined">
              操作
            </Button>
          </XStack>
        </Card>
      ))}
    </YStack>
  )

  // E区域 - 底部内容
  const FooterSection = () => (
    <Card 
      height={FOOTER_HEIGHT}
      backgroundColor="$red3"
      padding="$6"
      justifyContent="flex-start"
      alignItems="center"
    >
      <H2 color="$red12" fontSize="$8" text="center">
        底部内容区域 (E)
      </H2>
      <H2 color="$red12" fontSize="$7" mt="$2">
        高度: {FOOTER_HEIGHT}px
      </H2>
      
      <Paragraph text="center" color="$red11" fontSize="$6" mt="$4">
        🚀 当这个红色区域开始进入视野时
      </Paragraph>
      <Paragraph text="center" color="$red11" fontSize="$6">
        会物理推出上方绿色的吸顶区域
      </Paragraph>
      
      <YStack mt="$8" gap="$4" items="center">
        <Button size="$6" theme="red" fontSize="$5">底部按钮1</Button>
        <Button size="$6" theme="red" variant="outlined" fontSize="$5">底部按钮2</Button>
        <Button size="$6" theme="red" variant="outlined" fontSize="$5">底部按钮3</Button>
      </YStack>
      
      <YStack mt="$8" gap="$3" items="center">
        <Text text="center" color="$red11" fontSize="$5" fontWeight="600">
          ⚠️ 重要提示
        </Text>
        <Text text="center" color="$red11" fontSize="$4">
          注意观察：当这个区域出现时，绿色的C区域会被向上推出屏幕
        </Text>
        <Text text="center" color="$red10" fontSize="$3">
          这就是"推出式吸顶"的效果
        </Text>
      </YStack>
      
      {/* 填充内容让E区域更高 */}
      <YStack mt="$8" gap="$4" width="100%">
        {Array.from({ length: 8 }, (_, i) => (
          <Card key={i} padding="$4" backgroundColor="$red4">
            <Text color="$red12" fontSize="$4" text="center">
              E区域内容 {i + 1} - 让这个区域足够高
            </Text>
          </Card>
        ))}
      </YStack>
    </Card>
  )

  // Web 端实现
  if (Platform.OS === 'web') {
    return (
      <YStack flex={1} bg="$background">
        {/* 滚动容器 */}
        <ScrollView
          flex={1}
          onScroll={handleScroll}
          scrollEventThrottle={8}
          showsVerticalScrollIndicator={true}
        >
          <YStack>
            {/* B区域 - 头部 */}
            <HeaderSection />
            
            {/* C区域在正常文档流中的位置 - 不吸顶时显示 */}
            {!stickyState.isStuck && <StickySection />}
            
            {/* C区域占位 - 当吸顶时保持布局空间 */}
            {stickyState.isStuck && <View height={STICKY_HEIGHT} />}
            
            {/* D区域 - 长列表 */}
            <ListSection />
            
            {/* E区域 - 底部 */}
            <FooterSection />
          </YStack>
        </ScrollView>

        {/* 固定定位的C区域 - 关键修正：直接使用内联样式应用transform */}
        {stickyState.showFixed && (
          <View
            style={{
              position: 'fixed',
              top: insets.top,
              left: 0,
              right: 0,
              zIndex: 1000,
              transform: `translateY(${stickyState.translateY}px)`,
              transition: 'transform 0.02s ease-out'
            } as any}
          >
            <StickySection />
          </View>
        )}
      </YStack>
    )
  }

  // Native 端实现
  return (
    <YStack flex={1} bg="$background">
      <ScrollView
        flex={1}
        onScroll={handleScroll}
        scrollEventThrottle={4}
        showsVerticalScrollIndicator={true}
        stickyHeaderIndices={[1]}
      >
        {/* B区域 - 头部 */}
        <HeaderSection />
        
        {/* C区域 - 吸顶内容 */}
        <View
          style={{
            transform: [{ translateY: stickyState.translateY }]
          }}
        >
          <StickySection />
        </View>
        
        {/* D区域 - 长列表 */}
        <ListSection />
        
        {/* E区域 - 底部 */}
        <FooterSection />
      </ScrollView>
    </YStack>
  )
}