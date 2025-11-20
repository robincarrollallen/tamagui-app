import { ShimmerButton } from '@my/ui'
import { List } from 'app/widgets/List'
import { LanguageType } from 'app/enums'
import { ActivityListData } from './data'
import { YStack, Text, Image } from 'tamagui'
import { useTranslation } from 'react-i18next'
import { useRem, useStyleStore } from 'app/store'
import { ImageBackground, StyleSheet } from 'react-native'
import { useActivityStore } from 'app/store/modules/activity'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import BigList from 'react-native-big-list'

export const ActivityList = () => {
  const activityStore = useActivityStore()
  const listRef = useRef<BigList<any>>(null)
  const tabbarLayout = useStyleStore(state => state.tabbarLayout) // TabBar 布局
  const activityList = useActivityStore(state => state.activityList)
  const [refreshing, setRefreshing] = useState(false)
  const { i18n } = useTranslation()
  const rem = useRem()

  const renderItem = useCallback(({ item, index }) => (
    <RenderItem item={item} index={index} />
  ), [])

  const styles = useMemo(() => StyleSheet.create({
    list: {
      paddingTop: rem(12)
    }
  }), [rem])
  
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
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </YStack>
  )
}

/** 活动列表项 */
const RenderItem = memo<{ item: Recordable; index: number }>(({ item, index }) => {
  const rem = useRem()

  const handleItemPress = useCallback(() => {
    console.log('onPress', item)
  }, [item])

  const styles = useMemo(() => StyleSheet.create({
    imageBackground: {
      width: '100%',
      height: rem(120),
      overflow: 'hidden',
      borderRadius: rem(10),
    },
    shimmerPress: {
      bg: 'transparent',
    } as any,
    shimmerHover: {
      bg: 'transparent',
    } as any,
  }), [rem])

  const imageBackgroundSource = useMemo(() => ({ uri: item.bannerBackground }), [item.bannerBackground])
  const imageSource = useMemo(() => ({ uri: item.bannerLogo }), [item.bannerLogo])

  return (
    <YStack height="100%" justify="flex-end">
      <ImageBackground source={imageBackgroundSource} style={styles.imageBackground}>
        <ShimmerButton onPress={handleItemPress} height={rem(120)} enableShimmer bg="transparent" pressStyle={styles.shimmerPress} hoverStyle={styles.shimmerHover}>
          <Text flex={1} fontSize={rem(12)}>{item.name}</Text>
          <Image source={imageSource} width={rem(154)} height={rem(85)} resizeMode="contain" objectFit='contain' />
        </ShimmerButton>
      </ImageBackground>
    </YStack>
  )
})