import { useState } from 'react'
import { Segment } from '@my/ui'
import { YStack, isWeb } from 'tamagui'
import { useRem } from 'app/hooks/ResponsiveSize'

const tabs = [
  { label: 'Profile', value: 'tab1' },
  { label: 'Connections', value: 'tab2' },
  { label: 'Notifications', value: 'tab3' },
  // { label: 'Settings', value: 'tab4' },
  // { label: 'Help', value: 'tab5' },
  // { label: 'Logout', value: 'tab6' },
]

export function ProfileScreen() {
  const rem = useRem()
  const [activeTab, setActiveTab] = useState('tab1')

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  return (
    <YStack
      flex={1}
      bg="$blue10"
      {...(isWeb && {
        position: 'unset' as any,
      })} 
    >
      <YStack bg="$green10" height={80}>

      </YStack>
      <Segment
        block
        shrink
        tabs={tabs}
        height={rem(50)}
        active={activeTab}
        borderTopLeftRadius={rem(6)}
        borderTopRightRadius={rem(6)}
        borderBottomLeftRadius={rem(6)}
        borderBottomRightRadius={rem(6)}
        onValueChange={handleTabChange}
      >
      </Segment>
    </YStack>
  )
}