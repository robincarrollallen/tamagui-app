import { useActivityState } from './state'
import { ActivityList } from './segments/list'
import { useTranslation } from 'react-i18next'
import { Unclaimed } from './segments/unclaimed'
import { useCallback, useMemo, useState } from 'react'
import { SizableText, Tabs, YStack, isWeb } from 'tamagui'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import React from 'react'

export function ActivityScreen() {
  const { t } = useTranslation()
  const setActiveTab = useActivityState.getState().setActiveTab // 设置活动标签
  const activeTab = useActivityState(state => state.activeTab) // 日期缓存状态
  const safeArea = useSafeArea() // 安全区域

  const activityTabs = useMemo(() => [
    { label: t('activity.events'), value: 'tab1', component: ActivityList },
    { label: t('activity.unclaimed'), value: 'tab2', component: Unclaimed },
  ], [])

  /** 切换回调事件 tab */
  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value)
  }, [])
  
  return (
    // web only fix for position relative
    <YStack
      flex={1}
      bg="$topNavSecondary"
      pt={safeArea.top}
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
        >
          {activityTabs.map((tab) => (
            <Tabs.Tab
              key={tab.value}
              value={tab.value}
              focusStyle={{
                bg: '$topNavSecondary',
              }}
              p={0}
            >
              <YStack bg="$topNavSecondary" height="100%" px={10} items="flex-end" justify="flex-end" borderBottomWidth={activeTab === tab.value ? 1 : 0} borderBottomColor="$borderDefault">
                <SizableText text="center">
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
  )
}