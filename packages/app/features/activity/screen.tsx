import { ActivityList } from './segments/list'
import { useTranslation } from 'react-i18next'
import { Unclaimed } from './segments/unclaimed'
import { useCallback, useMemo, useState } from 'react'
import { H5, SizableText, Tabs, YStack, isWeb } from 'tamagui'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import type { TabsContentProps } from 'tamagui'
import React from 'react'

export function ActivityScreen() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('tab1')
  const safeArea = useSafeArea()

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
      bg="$background"
      pt={safeArea.top}
      {...(isWeb && {
        position: 'unset' as any,
      })}
    >
      <Tabs
        flex={1}
        bg="$background"
        overflow="hidden"
        defaultValue="tab1"
        orientation="horizontal"
        flexDirection="column"
        borderTopLeftRadius={0}
        onValueChange={handleTabChange}
      >
        <Tabs.List
          width="100%"
          bg="$topNavSecondary"
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

const TabsContent = (props: TabsContentProps) => {
  return (
    <Tabs.Content
      key="tab3"
      items="center"
      justify="center"
      flex={1}
      {...props}
    >
      {props.children}
    </Tabs.Content>
  )
}