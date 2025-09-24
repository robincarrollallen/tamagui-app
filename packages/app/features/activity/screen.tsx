import { useState } from 'react'
import type { TabsContentProps } from 'tamagui'
import { H5, SizableText, Tabs, YStack, isWeb } from 'tamagui'

export function ActivityScreen() {
  const [activeTab, setActiveTab] = useState('tab1')

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  return (
    // web only fix for position relative
    <YStack
      flex={1}
      {...(isWeb && {
        position: 'unset' as any,
      })}
    >
      <Tabs
        flex={1}
        defaultValue="tab1"
        orientation="horizontal"
        flexDirection="column"
        overflow="hidden"
        bg="$bodyDefault"
        borderTopLeftRadius={0}
        onValueChange={handleTabChange}
      >
        <Tabs.List
          width="100%"
          disablePassBorderRadius="bottom"
          aria-label="Manage your account"
        >
          <Tabs.Tab
            bg="$bodyDefault"
            value="tab1"
            p={0}
            items="flex-end"
            justify="flex-end"
          >
            <YStack height="100%" px={10} items="flex-end" justify="flex-end" bg="$bodyDefault" borderBottomWidth={activeTab === 'tab1' ? 1 : 0} borderBottomColor="$borderColor">
              <SizableText text="center">
                Profile
              </SizableText>
            </YStack>
          </Tabs.Tab>
          <Tabs.Tab
            bg="$bodyDefault"
            value="tab2"
            p={0}
          >
            <YStack height="100%" px={10} items="flex-end" justify="flex-end" bg="$bodyDefault" borderBottomWidth={activeTab === 'tab2' ? 1 : 0} borderBottomColor="$borderColor">
              <SizableText text="center">
              Connections
              </SizableText>
            </YStack>
          </Tabs.Tab>
          <Tabs.Tab
            bg="$bodyDefault"
            value="tab3"
            p={0}
          >
            <YStack height="100%" px={10} items="flex-end" justify="flex-end" bg="$bodyDefault" borderBottomWidth={activeTab === 'tab3' ? 1 : 0} borderBottomColor="$borderColor">
              <SizableText text="center">
                Notifications
              </SizableText>
            </YStack>
          </Tabs.Tab>
        </Tabs.List>
        <TabsContent value="tab1">
          <H5>Profile</H5>
        </TabsContent>

        <TabsContent value="tab2">
          <H5>Connections</H5>
        </TabsContent>

        <TabsContent value="tab3">
          <H5>Notifications</H5>
        </TabsContent>
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