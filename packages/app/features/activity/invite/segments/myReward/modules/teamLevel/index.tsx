import { Image } from 'expo-image'
import { ICONS, SVG } from '@my/assets'
import { Platform } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { ChevronRight } from '@tamagui/lucide-icons'
import { useRem, useTenantStore, useAgentStore } from 'app/store'
import { formatMoneyToLocal, safeNumber } from 'app/utils/format/number'
import { ScrollView, View, XStack, YStack, Circle, Text, Progress } from 'tamagui'
import { useState, useRef, useCallback, useEffect, useMemo } from 'react'
import agencyConfigData from 'app/data/agencyConfig.json'
import agencyInfoData from 'app/data/agencyInfo.json'

interface CarouselProps {
  data?: Array<{ id: string; backgroundColor: string }>
  height?: number
  autoPlay?: boolean
  autoPlayInterval?: number
  showIndicators?: boolean
}

export function TeamLevel({
  autoPlay = false,
  autoPlayInterval = 3000,
  showIndicators = true,
}: CarouselProps) {
  const [totalComm, setTotalComm] = useState(0) // 总佣金
  const [realIndex, setRealIndex] = useState(0) // 真实数据索引
  const [currentLevel, setCurrentLevel] = useState(0) // 当前等级
  const [totalTeamBet, setTotalTeamBet] = useState(0) // 总团队投注额
  const [displayIndex, setDisplayIndex] = useState(1) // 显示索引（从1开始）
  const [isScrolling, setIsScrolling] = useState(false) // 滚动状态
  const [containerWidth, setContainerWidth] = useState(0) // 容器宽度
  const [totalTeamCount, setTotalTeamCount] = useState(0) // 总团队人数
  const [agentLevelConfig, setAgentLevelConfig] = useState<Recordable[]>([]) // 代理等级配置
  const scrollTimeout = useRef<NodeJS.Timeout>(null) // 滚动定时器
  const scrollViewRef = useRef<ScrollView>(null) // 滚动视图引用
  const rem = useRem() // 响应式尺寸

  const agencyConfig = useAgentStore(state => state.agencyConfig)

  useEffect(() => {
    useAgentStore.getState().setAgencyConfig(agencyConfigData)

    const agencyInfo = agencyInfoData.info
    setTotalTeamBet(agencyInfo?.histBet || 0)
    setCurrentLevel(agencyInfo?.agencyLevel || 1)
    setTotalTeamCount((agencyInfo?.histDirectCnt || 0) + (agencyInfo?.histTeamCnt || 0))
  }, [])

  useEffect(() => {
    if (agencyConfig.templateInfo?.config) {
      try {
        const config = JSON.parse(agencyConfig.templateInfo?.config)
          .map((item: Recordable) => {
            const inviteConfig = agencyConfig.inviteConfig?.firstRechargeRebateLevelConfig?.find(
              (config: Recordable) => config.level === item.level && config.subLevel === 1
            )

          return {
            ...item,
            rate: formatMoneyToLocal(inviteConfig?.rate),
          }
        })
        setAgentLevelConfig(config)
      } catch {
        console.warn('Failed to parse agencyConfig.templateInfo.config')
      }
    }

      if (agencyConfig.inviteConfig?.commissionLevelConfig) {
        let comm = 0
        agencyConfig.inviteConfig?.commissionLevelConfig.forEach((item: Recordable) => {
          comm += item.rewardAmount / 100
        })
        setTotalComm(comm)
      }
  }, [agencyConfig])

  const ITEM_WIDTH_PERCENTAGE = 0.9 // 卡片占容器宽度的 80%
  const ITEM_SPACING = rem(0) // 卡片间距

  // 构建循环数据 - 在首尾各添加一个副本
  const buildLoopData = useCallback(() => {
    if (agentLevelConfig.length <= 1) return agentLevelConfig
    
    const lastItem: Recordable = {
      ...agentLevelConfig[agentLevelConfig.length - 1],
      name: `${agentLevelConfig[agentLevelConfig.length - 1].name}suffix`
    }
    const firstItem: Recordable = {
      ...agentLevelConfig[0],
      name: `${agentLevelConfig[0].name}prefix`
    }
    
    return [lastItem, ...agentLevelConfig, firstItem]
  }, [agentLevelConfig])

  const loopData = buildLoopData()
  const realDataLength = agentLevelConfig.length

  const itemWidth = containerWidth * ITEM_WIDTH_PERCENTAGE // 卡片宽度
  const scrollDistance = itemWidth + ITEM_SPACING // 滚动距离
  const padding = (containerWidth - itemWidth) / 2 // 左右内边距

  /** 计算每个位置的精确偏移量 */
  const snapOffsets = useMemo(() => {
    if (!containerWidth || loopData.length === 0) return []
    
    return loopData.map((_, index) => {
      return padding + index * scrollDistance
    })
  }, [containerWidth, loopData.length, padding, scrollDistance])

  /** 跨平台获取容器宽度 */
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

  /** 处理滚动事件 */
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

  /** 处理滚动开始 */
  const handleScrollBegin = useCallback(() => {
    setIsScrolling(true)
    clearTimeout(scrollTimeout.current as NodeJS.Timeout)
  }, [])

  /** 处理滚动结束 - 实现无限循环的关键 */
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
      } else if (displayIndex === realDataLength + 1) {
        scrollViewRef.current?.scrollTo({
          x: padding + scrollDistance,
          animated: false,
        })
        setDisplayIndex(1)
      }
    }, 100)
  }, [displayIndex, realDataLength, containerWidth, ITEM_WIDTH_PERCENTAGE, ITEM_SPACING])

  /** 程序化滚动 */
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
        {...(Platform.OS === 'web' && {
          style: { scrollSnapType: 'x mandatory' } as any // Web 端额外属性
        })}
      >
        <XStack gap={ITEM_SPACING}>
          {loopData.map((item, _index) => (
            <YStack
              key={item.name}
              width={itemWidth || containerWidth * ITEM_WIDTH_PERCENTAGE}
              justify="center"
              items="center"
              pl={rem(10)}
              style={{
                ...(Platform.OS === 'web' && { scrollSnapAlign: 'start' }) // Web 端滚动对齐
              }}
            >
              <YStack height={rem(128)} items="center" width="100%">
                {/* 背景 */}
                <SvgXml xml={SVG[`bg_invite_level_${item.level - 1}`]} width="100%" height="100%" style={{ position: 'absolute', zIndex: -1 }} />
                {/* 标题 */}
                <Text fontSize={rem(14)} lineHeight={rem(24)}>{item.level === currentLevel ? 'My Team' : item.level > currentLevel ? 'Next Level' : 'Previous Level'}</Text>
                {/* 等级信息 */}
                <XStack flex={1} width="100%" items="center" px={rem(12)} gap={rem(12)} pt={rem(10)}>
                  <View width={rem(68)} height={rem(68)} items="center" justify="center">
                    {/* 等级图标背景 */}
                    <SvgXml xml={SVG.bg_invite_level_icon} width="100%" height="100%" style={{ position: 'absolute', zIndex: -1 }} />
                    {/* 等级图标 */}
                    <Image source={ICONS[`invite_level_icon_${item.level - 1}`]} style={{ width: rem(42), height: rem(42) }} />
                  </View>
                  <YStack flex={1} height="100%" pt={rem(10)}>
                    <XStack items="center" justify="space-between" gap={rem(4)} borderBottomWidth={rem(1)} borderBottomColor="#ffffff1A" pb={rem(4)}>
                      <XStack items="center" gap={rem(4)}>
                        <Text fontSize={rem(14)} >Agent Level</Text>
                        <Text fontSize={rem(14)} fontWeight="600" color="$textSuccess">{`Lv.${item.level}`}</Text>
                      </XStack>
                      <XStack items="center" gap={rem(2)}>
                        <Text fontSize={rem(14)} color="$textInfo">{`Details`}</Text>
                        <ChevronRight size={rem(24)} color="$textInfo" />
                      </XStack>
                    </XStack>
                    <XStack flex={1} items="center" justify="space-between">
                      {
                        item.level === 1
                        ? <Text fontSize={rem(10)} color="$textWeaker">{`Already achieved this rebate level`}</Text>
                        : <XStack items="center" width="100%">
                            <YStack width="50%" gap={rem(4)} pr={rem(8)}>
                              <Text fontSize={rem(10)} color="$textWeaker">{`Team Size`}</Text>
                              <Progress minW="100%" size="$2" bg="#ffffff33" value={totalTeamCount >= item.count ? 100 : totalTeamCount / safeNumber(item.count) * 100}>
                                <Progress.Indicator animation="bouncy" bg="$iconBrandPrimary"/>
                              </Progress>
                              <Text fontSize={rem(10)} color="$textWeaker">{`${totalTeamCount}/${safeNumber(item.count)}`}</Text>
                            </YStack>
                            <YStack width="50%" gap={rem(4)} pl={rem(8)}>
                              <Text fontSize={rem(10)} color="$textWeaker">{`Team Size`}</Text>
                              <Progress minW="100%" size="$2" bg="#ffffff33" value={totalTeamBet >= safeNumber(item.totalTeamBet) ? 100 : totalTeamBet / safeNumber((item.totalTeamBet)) * 100}>
                                <Progress.Indicator animation="bouncy" bg="$iconBrandPrimary"/>
                              </Progress>
                              <Text fontSize={rem(10)} color="$textWeaker">{`${formatMoneyToLocal(totalTeamBet)}/${safeNumber(item.totalTeamBet / 100)}`}</Text>
                            </YStack>
                          </XStack>
                      }
                    </XStack>
                  </YStack>
                </XStack>
              </YStack>
              {/* 奖励信息 */}
              <YStack flex={1} width="100%" items="center" px={rem(16)}>
                <XStack bg="$surfaceRaisedL1" width="100%" pt={rem(12)} pb={rem(4)} borderBottomLeftRadius={rem(16)} borderBottomRightRadius={rem(16)}>
                  <YStack items="center" justify="center" px={rem(10)} borderRightWidth={rem(1)} borderRightColor="$borderDefault">
                    <Text fontSize={rem(10)} lineHeight={rem(16)} color="$textSuccess" fontWeight="600">{ `Up to ${(item.rats[0]?.rat || 0) / 100}%` }</Text>
                    <Text fontSize={rem(10)} lineHeight={rem(16)} color="$textWeaker">Bet Rebate</Text>
                  </YStack>
                  <YStack flex={1} items="center" justify="center">
                    <Text fontSize={rem(10)} lineHeight={rem(16)} color="$textSuccess" fontWeight="600">{ `Rebate ${item.rate}%` }</Text>
                    <Text fontSize={rem(10)} lineHeight={rem(16)} color="$textWeaker">First Deposit</Text>
                  </YStack>
                  <YStack items="center" justify="center" px={rem(10)} borderLeftWidth={rem(1)} borderLeftColor="$borderDefault">
                    <Text fontSize={rem(10)} lineHeight={rem(16)} color="$textSuccess" fontWeight="600">{ `Up to ${totalComm}` }</Text>
                    <Text fontSize={rem(10)} lineHeight={rem(16)} color="$textWeaker">Invite Rewards</Text>
                  </YStack>
                </XStack>
              </YStack>
            </YStack>
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
          {agentLevelConfig.map((_, index) => (
            <Circle
              key={index}
              width={index === realIndex ? rem(16) : rem(8)}
              height={rem(4)}
              onPress={() => scrollToIndex(index + 1)} // +1 因为真实数据从索引1开始
              bg={
                index === realIndex ? '$iconSelected' : '$textWeaker'
              }
              {...(Platform.OS === 'web' && {
                cursor: 'pointer' // Web 端鼠标样式
              })}
            />
          ))}
        </XStack>
      )}
    </View>
  )
}