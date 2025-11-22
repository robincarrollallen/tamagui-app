import { memo } from 'react'
import { SVG } from '@my/assets'
import { Pressable } from 'react-native'
import { useSizeTokens } from 'app/store'
import { Icon, IconProps } from '../Icon'
import { Spinner, useTheme } from 'tamagui'
import { Field, FieldProps } from '../Field'

const SearchBarIcon = memo(({ loading = false, onPress, ...props }: { loading?: boolean } & IconProps) => {
  const theme = useTheme()
  const rem = useSizeTokens()

  return <>
    { loading
      ? <Spinner size="small" color="$color" />
      : <Pressable onPress={onPress}><Icon uri={SVG.magnifier} width={rem[20]} height={rem[20]} color={theme.$iconWeaker?.get()} /></Pressable>
    }
  </>
})

export const SearchBar = memo(({ loading = false, onPress, ...props }: { loading?: boolean } & FieldProps) => {
  const rem = useSizeTokens()

  return (
    <Field placeholder="Search Games" fontSize={rem[14]} clear={false} suffix={<SearchBarIcon onPress={onPress} loading={loading}/>} {...props} />
  )
})

SearchBar.displayName = 'SearchBar'