import { Stack } from 'expo-router'
import { useSearchParams} from 'solito/navigation'
import { GameSearchScreen } from 'app/features/game/search'

export default function GameListPage() {
  const searchParams = useSearchParams()
  const type = searchParams?.get('type')
  const id = searchParams?.get('id')
  
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <GameSearchScreen type={type as string} id={id as string} />
    </>
  )
}
