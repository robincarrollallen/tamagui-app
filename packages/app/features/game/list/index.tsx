'use client'

import { ScrollView, YStack, Text, Button, XStack } from 'tamagui'
import { useParams } from 'solito/navigation'
import { useRef, useState } from 'react'
import { NavigationBar } from '@my/ui'

const tabs = [
  { id: 0, label: '推荐', key: 'recommend' },
  { id: 1, label: '热门', key: 'hot' },
  { id: 2, label: '最新', key: 'latest' },
  { id: 3, label: '关注', key: 'follow' },
  { id: 4, label: '历史', key: 'history' },
]

export const GameListScreen = () => {
  const scrollRef = useRef<ScrollView>(null)
  const [activeTab, setActiveTab] = useState(0)
  const [tabBarHeight, setTabBarHeight] = useState(0)
  
  // 存储每个内容区域的Y位置
  const sectionRefs = useRef<{ [key: number]: number }>({})
  
  // 点击tab跳转
  const handleTabClick = (index: number) => {
    const targetY = sectionRefs.current[index] - tabBarHeight
    scrollRef.current?.scrollTo({
      y: targetY > 0 ? targetY : 0,
      animated: true
    })
    setActiveTab(index)
  }
  
  // 滚动时判断当前位置
  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y
    
    // 加上tab高度的偏移
    const adjustedScrollY = scrollY + tabBarHeight + 10
    
    // 判断当前滚动位置对应哪个section
    const positions = Object.entries(sectionRefs.current)
      .sort(([a], [b]) => Number(a) - Number(b))
    
    let currentSection = 0
    for (let i = positions.length - 1; i >= 0; i--) {
      const [index, position] = positions[i]
      if (adjustedScrollY >= position) {
        currentSection = Number(index)
        break
      }
    }
    
    if (currentSection !== activeTab) {
      setActiveTab(currentSection)
    }
  }
  
  return (
    <>
      <NavigationBar title="Game List" />
      <ScrollView
        ref={scrollRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        stickyHeaderIndices={[1]} // B模块吸顶
      >
        {/* A模块 - 顶部内容 */}
        <YStack p="$4" bg="$blue5" height={200} width="100%">
          <Text fontSize="$8" fontWeight="bold">顶部Banner</Text>
          <Text fontSize="$4" color="$blue11">这是顶部固定内容</Text>
        </YStack>
        
        {/* B模块 - Tab标签（吸顶） */}
        <XStack
          bg="$background"
          z={100}
          onLayout={(e) => {
            setTabBarHeight(e.nativeEvent.layout.height)
          }}
        >
          {tabs.map((tab, index) => (
            <Button
              key={tab.id}
              flex={1}
              borderBottomWidth={2}
              borderTopLeftRadius={0}
              borderTopRightRadius={0}
              borderBottomLeftRadius={0}
              borderBottomRightRadius={0}
              borderBottomColor={activeTab === index ? '$blue10' : 'transparent'}
              hoverStyle={{
                bg: 'transparent',
                borderTopColor: 'transparent',
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: activeTab === index ? '$blue10' : 'transparent'
              }}
              pressStyle={{
                bg: 'transparent',
                borderTopColor: 'transparent',
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: 'transparent'
              }}
              onPress={() => handleTabClick(index)}
            >
              <Text
                color={activeTab === index ? '$blue10' : '$blue11'}
                fontWeight={activeTab === index ? 'bold' : 'normal'}
              >
                {tab.label}
              </Text>
            </Button>
          ))}
        </XStack>
        
        {/* C模块 - 长列表内容 */}
        {tabs.map((tab, index) => (
          <YStack
            key={tab.key}
            p="$4"
            minH={600}
            onLayout={(e) => {
              sectionRefs.current[index] = e.nativeEvent.layout.y
            }}
          >
            <Text fontSize="$6" fontWeight="bold" mb="$4">
              {tab.label}内容区域
            </Text>
            
            {/* 模拟长列表内容 */}
            {Array.from({ length: 20 }).map((_, i) => (
              <YStack
                key={i}
                p="$3"
                mb="$2"
                bg="$blue2"
                style={{
                  borderRadius: 4
                }}
              >
                <Text>{tab.label} - 列表项 {i + 1}</Text>
              </YStack>
            ))}
          </YStack>
        ))}
        
        {/* D模块 - 底部内容 */}
        <YStack p="$4" bg="$blue4" height={500}>
          <Text fontSize="$5" text="center">
            已经到底啦 ~
          </Text>
        </YStack>
        <XStack>
          <Text>Game List</Text>
        </XStack>
      </ScrollView>
    </>
  )
}