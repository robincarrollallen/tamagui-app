import { useState } from 'react'
import { SizableText, Tabs, YStack, TabsProps, GetThemeValueForKey } from 'tamagui'

interface SegmentProps extends Omit<TabsProps, 'shrink'> {
  block?: boolean
  shrink?: boolean
  tabWidth?: number
  tabs?: Recordable[]
  active?: string | number
  activeColor?: GetThemeValueForKey<"borderBottomColor">
  underlineWidth?: GetThemeValueForKey<"borderBottomWidth">
  onValueChange?: (value: string | number) => void
  tabComponent?: ({tab, isActive}: {tab: Recordable, isActive: boolean}) => React.ReactNode
}

export function Segment({
  height,
  tabs = [],
  active = 0,
  block = false,
  shrink = false,
  tabWidth = 100,
  borderWidth = 2,
  underlineWidth = 1,
  bg = '$topNavSecondary',
  borderTopLeftRadius = 0,
  borderTopRightRadius = 0,
  borderBottomLeftRadius = 0,
  borderBottomRightRadius = 0,
  activeColor = '$borderSelected',
  onValueChange,
  tabComponent,
  ...props
}: SegmentProps) {
  const [activeTab, setActiveTab] = useState(active)

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    onValueChange?.(value)
  }

  return (
    <Tabs
      onValueChange={handleTabChange}
      {...props}
    >
      <Tabs.List
        bg={bg}
        width="100%"
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
            height={height}
            bg='transparent'
            value={tab.value}
            padding={block ? borderWidth : 0}
            flex={shrink ? 'unset' : 1}
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
      </Tabs.List>
      {props.children}
    </Tabs>
  )
}
