'use client'

import { SVG } from '@my/assets'
import { Hot } from './segments/hot'
import { useSizeTokens } from 'app/store'
import { Search } from './segments/search'
import { Recent } from './segments/recent'
import { Favorite } from './segments/favorite'
import { useTranslation } from 'react-i18next'
import { Icon, NavigationBar, SearchBar } from '@my/ui'
import { createElement, useMemo, useState } from 'react'
import { SizableText, Tabs, XStack, YStack, isWeb, useTheme } from 'tamagui'


export const GameSearchScreen = ({ type, id }: { type: string, id: string }) => {
  const theme = useTheme()
  const rem = useSizeTokens()
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('tab2')
  const [searchValue, setSearchValue] = useState('')
  const [searchLoading, setSearchLoading] = useState(false)

  /** tabs 列表 */
  const activityTabs = useMemo(() => [
    { label: t('Search'), value: 'tab1', icon: SVG.magnifier, component: Search },
    { label: t('Hot'), value: 'tab2', icon: SVG.popular, component: Hot },
    { label: t('Recent'), value: 'tab3', icon: SVG.recent, component: Recent },
    { label: t('Favorite'), value: 'tab4', icon: SVG.favorite, component: Favorite },
  ], [])

  /** 搜索点击事件 */
  const handleSearch = () => {
    if (!searchValue) return
    setActiveTab('tab1')
    setSearchLoading(true)
    setTimeout(() => {
      setSearchLoading(false)
    }, 2000)
  }

  return (
    <>
      <NavigationBar title="Search" />
      <YStack width="100%" p={rem[8]} bg="$background">
        <SearchBar loading={searchLoading} value={searchValue} onChangeText={setSearchValue} onPress={handleSearch} />
      </YStack>
      <YStack
        width="100%"
        flex={1}
        bg="$background"
        {...(isWeb && {
          position: 'unset' as any,
        })}
      >
        <Tabs
          flex={1}
          overflow="hidden"
          flexDirection="column"
          borderTopLeftRadius={0}
          defaultValue={activeTab}
          orientation="horizontal"
          onValueChange={setActiveTab}
        >
          <Tabs.List
            width="100%"
            px={12}
            borderTopLeftRadius={0}
            borderTopRightRadius={0}
            borderBottomLeftRadius={0}
            borderBottomRightRadius={0}
            disablePassBorderRadius="bottom"
            borderBottomWidth={1}
            borderBottomColor="$borderDefault"
            aria-label="Search Games"
          >
            {activityTabs.map((tab) => (
              <Tabs.Tab
                key={tab.value}
                value={tab.value}
                focusStyle={{
                  bg: '$background',
                }}
                p={0}
              >
                <XStack items="center" gap={rem[8]} bg="$background" height="100%" px={rem[10]} justify="flex-end" borderBottomWidth={activeTab === tab.value ? 2 : 0} borderBottomColor="$textSelected">
                  <Icon uri={tab.icon} width={rem[18]} height={rem[18]} color={activeTab === tab.value ? theme.$textSelected?.get() : theme.$textWeaker?.get()}/>
                  <SizableText text="center" color={activeTab === tab.value ? '$textSelected' : '$textWeaker'}>
                    {tab.label}
                  </SizableText>
                </XStack>
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
              {createElement(tab.component)}
            </Tabs.Content>
          ))}
        </Tabs>
      </YStack>
    </>
  )
}