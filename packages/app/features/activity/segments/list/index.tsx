import { ShimmerButton } from '@my/ui'
import { List } from 'app/widgets/List'
import { LanguageType } from 'app/enums'
import { ActivityListData } from './data'
import { useStyleStore } from 'app/store'
import { useEffect, useMemo } from 'react'
import { XStack, YStack, Text, Image } from 'tamagui'
import { useTranslation } from 'react-i18next'
import { useRem } from 'app/hooks/ResponsiveSize'
import { useActivityStore } from 'app/store/modules/activity'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { ImageBackground } from 'react-native'

export const ActivityList = () => {
  const rem = useRem()
  const safeArea = useSafeArea() // 安全区域
  const styleStore = useStyleStore() // 样式存储
  const activityList = useActivityStore(state => state.activityList)
  const activityStore = useActivityStore()
  const { i18n } = useTranslation()
  useEffect(() => {
    activityStore.setActivityList(ActivityListData.activityList, i18n.language as LanguageType)
  }, [i18n.language])

  return (
    <YStack flex={1} width="100%" p={12}>
      <List
        data={activityList}
        itemHeight={rem(130)}
        renderItem={
          ({ item, index }) => <RenderItem item={item} index={index} />
        }
        footerHeight={
          styleStore.tabbarLayout.height + safeArea.bottom} renderFooter={() => <Text />
        } 
      />
    </YStack>
  )
}

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