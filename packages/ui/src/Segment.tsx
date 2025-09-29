import { useState } from 'react'
import { SizableText, Tabs, YStack, TabsProps, GetThemeValueForKey, ScrollView } from 'tamagui'

interface SegmentProps extends Omit<TabsProps, 'shrink'> {
  block?: boolean
  shrink?: boolean
  tabWidth?: number
  fontSize?: number
  tabs?: Recordable[]
  active?: string | number
  color?: GetThemeValueForKey<"color">
  activeColor?: GetThemeValueForKey<"color">
  underlineWidth?: GetThemeValueForKey<"width">
  activeTextColor?: GetThemeValueForKey<"color">
  activeTextWeight?: GetThemeValueForKey<"fontWeight">
  TabComponent?: ({tab, isActive, onPress}: {tab: Recordable, isActive: boolean, onPress: () => void}) => React.ReactNode
  onValueChange?: (value: string | number) => void
}

export function Segment({
  tabs = [],
  active = 0,
  height = 50,
  fontSize = 12,
  block = false,
  shrink = false,
  tabWidth = 100,
  borderWidth = 2,
  underlineWidth = 1,
  color = '$textWeaker',
  bg = '$topNavSecondary',
  borderTopLeftRadius = 0,
  borderTopRightRadius = 0,
  activeTextWeight = '400',
  borderBottomLeftRadius = 0,
  borderBottomRightRadius = 0,
  activeColor = '$borderSelected',
  activeTextColor = '$borderSelected',
  onValueChange,
  TabComponent,
  ...props
}: SegmentProps) {
  const [activeTab, setActiveTab] = useState(active)

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    onValueChange?.(value)
  }

  return (
    // XStack 中使用宽度内容由撑开, YStack 中使用宽度充满父级
    <Tabs {...props}>
      <ScrollView
        bg={bg}
        horizontal
        height={height}
        showsHorizontalScrollIndicator={false}
        borderTopLeftRadius={block ? borderTopLeftRadius : 0}
        contentContainerStyle={{ flex:  shrink ? 'unset' : 1}}
        borderTopRightRadius={block ? borderTopRightRadius : 0}
        borderBottomLeftRadius={block ? borderBottomLeftRadius : 0}
        borderBottomRightRadius={block ? borderBottomRightRadius : 0}
      >
        {tabs.map((tab) => (
          <YStack
            key={tab.value}
            height={height}
            bg='transparent'
            flex={shrink ? 'unset' : 1}
            p={block ? borderWidth : 0}
          >
            {TabComponent ? <TabComponent tab={tab} isActive={activeTab === tab.value} onPress={() => handleTabChange(tab.value)} /> : (
              <YStack
                height="100%"
                items="flex-end"
                width={block ? tabWidth : '100%'}
                justify={block ? 'center' : 'flex-end'}
                borderTopLeftRadius={block ? borderTopLeftRadius : 0}
                borderTopRightRadius={block ? borderTopRightRadius : 0}
                borderBottomLeftRadius={block ? borderBottomLeftRadius : 0}
                borderBottomRightRadius={block ? borderBottomRightRadius : 0}
                bg={block && activeTab === tab.value ? activeColor : 'transparent'}
                borderBottomWidth={activeTab === tab.value && !block ? underlineWidth : 0}
                borderBottomColor={activeTab === tab.value && !block ? activeColor: 'transparent'}
                onPress={() => handleTabChange(tab.value)}
              >
                <SizableText
                  px={block ? 0 : 10}
                  text="center"
                  width="100%"
                  fontSize={fontSize}
                  color={activeTab === tab.value ? activeTextColor : color}
                  fontWeight={activeTab === tab.value ? activeTextWeight : '400'}
                >
                  {tab.label}
                </SizableText>
              </YStack>
            )}
          </YStack>
        ))}
      </ScrollView>
      {/* <Tabs.List
        bg={bg}
        width={fitContent ? 'unset' : '100%'}
        borderTopLeftRadius={block ? borderTopLeftRadius : 0}
        borderTopRightRadius={block ? borderTopRightRadius : 0}
        borderBottomLeftRadius={block ? borderBottomLeftRadius : 0}
        borderBottomRightRadius={block ? borderBottomRightRadius : 0}
        aria-label="Manage your account"
        disablePassBorderRadius="bottom"
        overflow={shrink ? 'scroll' : 'visible'}
      >
        {tabs.map((tab) => (
          <Tabs.Tab
            p={0}
            key={tab.value}
            height={height}
            bg='transparent'
            value={tab.value}
            flex={shrink ? 'unset' : 1}
            padding={block ? borderWidth : 0}
            focusStyle={{ backgroundColor: 'transparent' }}
            hoverStyle={{ backgroundColor: 'transparent' }}
          >
            {tabComponent ? tabComponent({tab, isActive: activeTab === tab.value}) : (
              <YStack
                height="100%"
                items="flex-end"
                width={block ? tabWidth : '100%'}
                justify={block ? 'center' : 'flex-end'}
                borderTopLeftRadius={block ? borderTopLeftRadius : 0}
                borderTopRightRadius={block ? borderTopRightRadius : 0}
                borderBottomLeftRadius={block ? borderBottomLeftRadius : 0}
                borderBottomRightRadius={block ? borderBottomRightRadius : 0}
                bg={block && activeTab === tab.value ? activeColor : 'transparent'}
                borderBottomWidth={activeTab === tab.value && !block ? underlineWidth : 0}
                borderBottomColor={activeTab === tab.value && !block ? activeColor: 'transparent'}
              >
                <SizableText px={block ? 0 : 10} text="center" width="100%">
                  {tab.label}
                </SizableText>
              </YStack>
            )}
          </Tabs.Tab>
        ))}
      </Tabs.List> */}
      {props.children}
    </Tabs>
  )
}
