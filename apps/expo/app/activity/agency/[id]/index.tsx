import { Stack } from 'expo-router'
import { useParams } from 'solito/navigation'
import { UserDetailScreen } from 'app/features/user/detail-screen'

export default function Screen() {
  const { id } = useParams()
  
  return (
    <>
      <Stack.Screen
        name="ActivityAgency"
        options={{
          headerShown: false,
        }}
      />
      <UserDetailScreen id={id as string} />
    </>
  )
}
