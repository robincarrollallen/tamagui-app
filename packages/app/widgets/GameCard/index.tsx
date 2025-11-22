import { LazyImage } from '@my/ui'
import { IMAGES } from '@my/assets'
import { memo, useMemo } from 'react'
import { StyleSheet } from 'react-native'
import { useSizeTokens } from 'app/store'
import { View, ViewProps } from 'tamagui'

export const GameCard = memo(({ item, gap = 0, p = 0, borderRadius, lazy = false, ...props }: { item: Recordable, gap?: number, p?: number, borderRadius?: number, lazy?: boolean } & ViewProps) => {
  const rem = useSizeTokens()
  const logo = item.logo ? item.logo : `https://game-logo.d-e-7-f.com/pre/style1/en/${item.logoFlag}.jpg`

  const styles = useMemo(() => StyleSheet.create({
    image: {
      overflow: 'hidden',
      padding: p,
    },
    maintain: {
      position: 'absolute',
    },
  }), [rem])

  return (
    <View
      flex={1}
      items="center"
      justify="center"
      aspectRatio={3/4}
      p={gap/2}
      {...props}
    >
      <View width="100%" height="100%">
        <LazyImage style={styles.image} borderRadius={borderRadius || rem[8]} uri={logo} lazy={lazy} />
        {item.platformStatus === 'MAINTAIN' && <LazyImage borderRadius={borderRadius || rem[8]} uri={IMAGES.maintain} style={styles.maintain}/>}
      </View>
    </View>
  )
})