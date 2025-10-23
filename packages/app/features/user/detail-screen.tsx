import { Button, Paragraph, YStack } from 'tamagui'
import { ChevronLeft } from '@tamagui/lucide-icons'
import { useRouter } from 'solito/navigation'
import { NavigationBar } from '@my/ui'

export function UserDetailScreen({ id }: { id: string }) {
  const router = useRouter()
  if (!id) {
    return null
  }
  return (
    <>
      <NavigationBar title="User" />
      <YStack flex={1} justify="center" items="center" gap="$4">
        <Paragraph text="center" fontWeight="700" color="$blue10">{`User ID: ${id}`}</Paragraph>
        <Button icon={ChevronLeft} onPress={() => router.back()}>
          Go Home
        </Button>
      </YStack>
    </>
  )
}
