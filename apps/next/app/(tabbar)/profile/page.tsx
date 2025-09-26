'use client'

import { Svg } from '@my/ui'
import { View, Text } from 'tamagui'
import { useResponsiveStore } from 'app/store'

export default function Page() {
  const rem = useResponsiveStore(state => state.rem)

  return (
    <>
      <View flexDirection='row' justify='flex-start'>
        <View position='relative'>
          <Svg.SkewButton position='absolute' z={-1}/>
          <Text px={rem(12)} py={rem(16)}>Profile</Text>
        </View>
      </View>
      <View flexDirection='row' justify='flex-start'>
        <View position='relative'>
          <Svg.SkewBorder position='absolute' z={-1}/>
          <Text px={rem(12)} py={rem(16)}>ProfileProfile</Text>
        </View>
      </View>
    </>
  )
}