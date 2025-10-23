import { Stack } from 'expo-router'
import { useParams} from 'solito/navigation'
import { GameListScreen } from 'app/features/game/list'

export default function GameListPage() {
  const { type, id } = useParams()
  
  return (
    <>
      <Stack.Screen
        name="GameList"
        options={{
          headerShown: false,
        }}
      />
      <GameListScreen />
    </>
  )
}
