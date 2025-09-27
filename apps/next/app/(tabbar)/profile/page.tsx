'use client'

import { Svg } from '@my/ui'
import { View, Text } from 'tamagui'
import { useRem } from 'app/hooks/ResponsiveSize'

export default function Page() {
  const rem = useRem()

  return (
    <>
      <View flexDirection='row' justify='flex-start'>
        <View position='relative'>
          <Svg.SkewButton position='absolute' z={-1}/>
          <Text px={rem(12)} py={rem(16)} fontSize={rem(16)}>Profile</Text>
        </View>
      </View>
      <View flexDirection='row' justify='flex-start'>
        <View position='relative'>
          <Svg.SkewBorder position='absolute' z={-1}/>
          <Text px={rem(12)} py={rem(16)} fontSize={rem(16)}>ProfileProfile</Text>
        </View>
      </View>
    </>
  )
}