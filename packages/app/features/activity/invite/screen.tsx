import { useInviteState } from './state'
import { useCallback, useMemo } from 'react'
import { MyReward } from './segments/myReward'
import { useTranslation } from 'react-i18next'
import { InviteReward } from './segments/InviteReward'
import { SizableText, Tabs, YStack, isWeb } from 'tamagui'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import React from 'react'
import { NavigationBar } from '@my/ui'

export function InviteScreen() {
  const { t } = useTranslation()
  const setActiveTab = useInviteState.getState().setActiveTab // 设置活动标签
  const activeTab = useInviteState(state => state.activeTab) // 日期缓存状态
  const safeArea = useSafeArea() // 安全区域

  const activityTabs = useMemo(() => [
    { label: t('tags.myReward'), value: 'tab1', component: MyReward },
    { label: t('tags.inviteReward'), value: 'tab2', component: InviteReward },
  ], [])

  /** 切换回调事件 tab */
  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value)
  }, [])
  
  return (
    <YStack flex={1} width="100%" bg="$background">
      <NavigationBar title={t('tags.invite')} />
      <YStack
        width="100%"
        flex={1}
        {...(isWeb && {
          position: 'unset' as any,
        })}
      >
        <Tabs
          flex={1}
          overflow="hidden"
          defaultValue={activeTab}
          orientation="horizontal"
          flexDirection="column"
          borderTopLeftRadius={0}
          onValueChange={handleTabChange}
        >
          <Tabs.List
            width="100%"
            borderTopLeftRadius={0}
            borderTopRightRadius={0}
            borderBottomLeftRadius={0}
            borderBottomRightRadius={0}
            disablePassBorderRadius="bottom"
            aria-label="Manage your account"
            bg="$surfaceLowered"
          >
            {activityTabs.map((tab) => (
              <Tabs.Tab
                flex={1}
                key={tab.value}
                value={tab.value}
                bg="transparent"
                focusStyle={{
                  bg: '$surfaceLowered',
                }}
                p={0}
              >
                <YStack height="100%" width="100%" px={10} items="center" justify="center" borderBottomWidth={activeTab === tab.value ? 1 : 0} borderBottomColor="$textSelected">
                  <SizableText text="center" color={activeTab === tab.value ? '$textSelected' : '$textWeaker'}>
                    {tab.label}
                  </SizableText>
                </YStack>
              </Tabs.Tab>
            ))}
          </Tabs.List>
          {activityTabs.map((tab) => (
            <Tabs.Content
              key={tab.value}
              value={tab.value}
              items="center"
              justify="center"
              flex={1}
            >
              {React.createElement(tab.component)}
            </Tabs.Content>
          ))}
        </Tabs>
      </YStack>
    </YStack>
  )
}