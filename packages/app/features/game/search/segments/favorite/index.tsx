import { List } from 'app/widgets/List'
import { useTheme } from 'tamagui'
import { SVG } from '@my/assets'

export const Favorite = () => {
  const theme = useTheme()

  return (
    <List emptyIcon={SVG.no_game} emptyIconColor={theme.$textWeaker?.get()} emptyText="No Games Available" />
  )
}