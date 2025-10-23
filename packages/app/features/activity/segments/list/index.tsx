import { ShimmerButton } from '@my/ui'
import { List } from 'app/widgets/List'
import { LanguageType } from 'app/enums'
import { ActivityListData } from './data'
import { useStyleStore } from 'app/store'
import { YStack, Text, Image } from 'tamagui'
import { useTranslation } from 'react-i18next'
import { ImageBackground } from 'react-native'
import { useRem } from 'app/hooks/ResponsiveSize'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useActivityStore } from 'app/store/modules/activity'
import BigList from 'react-native-big-list'

export const ActivityList = () => {
  const rem = useRem()
  const activityStore = useActivityStore()
  const tabbarLayout = useStyleStore(state => state.tabbarLayout) // TabBar 布局
  const activityList = useActivityStore(state => state.activityList)
  const [refreshing, setRefreshing] = useState(false)
  const { i18n } = useTranslation()
  const listRef = useRef<BigList<any>>(null)
  
  useEffect(() => {
    activityStore.setActivityList(ActivityListData.activityList, i18n.language as LanguageType) // 设置活动列表
  }, [i18n.language])

  /** 下拉刷新 */
  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    try {
      // 模拟网络请求
      await new Promise(resolve => setTimeout(resolve, 1500))
    } finally {
      console.log('下拉刷新完成')
      setRefreshing(false)
    }
    listRef.current?.scrollToOffset({ offset: 132, animated: true })
  }, [])

  const onScroll = useCallback((event: any) => {
    console.log('onScroll', event.nativeEvent.contentOffset.y)
  }, [])

  return (
    <YStack flex={1} width="100%" px={rem(12)}>
      <List
        ref={listRef}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onScroll={onScroll}
        data={activityList}
        itemHeight={rem(130)}
        footerHeight={tabbarLayout.height}
        renderItem={
          ({ item, index }) => <RenderItem item={item} index={index} />
        }
        contentContainerStyle={{ paddingTop: rem(12) }}
      />
    </YStack>
  )
}

/** 活动列表项 */
const RenderItem = ({ item, index }) => {
  const rem = useRem()

  return (
    <ImageBackground source={{ uri: item.bannerBackground }} style={{ width: '100%', height: rem(120), borderRadius: rem(10), overflow: 'hidden' }}>
      <ShimmerButton onPress={() => { console.log('onPress') }} height={rem(120)} enableShimmer bg="transparent" pressStyle={{ bg: 'transparent' }} hoverStyle={{ bg: 'transparent' }}>
        <Text flex={1}>{item.name}</Text>
        <Image source={{ uri: item.bannerLogo }} style={{ width: rem(154), height: rem(85) }} resizeMode='contain' objectFit='contain' />
      </ShimmerButton>
    </ImageBackground>
  )
}