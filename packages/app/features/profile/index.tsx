import { useEffect } from 'react'
import { useRem } from 'app/store'
import { ScrollView, Stack } from 'tamagui'
import { UserInfo } from './modules/userInfo'
import { VipWrapper } from 'app/widgets/VipWrapper'
import { NavigationWrapper } from './modules/navigation'
import { useUserStore, useVipStore, useStyleStore } from 'app/store'
import userInfoData from 'app/data/userInfo.json'
import vipInfoData from 'app/data/vipInfo.json'

export function ProfileScreen() {
  const rem = useRem()
  const token = useUserStore(state => state.token)
  const tabbarLayout = useStyleStore(state => state.tabbarLayout) // TabBar 布局

  useEffect(() => {
    if (token) {
      useUserStore.getState().setUserInfo(userInfoData)
      useVipStore.getState().setVipInfo(vipInfoData.data)
    }
  }, [token])

  return <>
    <UserInfo />
    <ScrollView bg="$background">
      <Stack px={rem(12)}>
        <VipWrapper />
      </Stack>
      <NavigationWrapper />
      <Stack height={tabbarLayout.height} />
    </ScrollView>
  </>
}