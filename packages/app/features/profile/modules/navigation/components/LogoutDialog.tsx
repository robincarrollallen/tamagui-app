import { delay } from 'app/utils/time'
import { LoadingButton } from '@my/ui'
import { NO_AUTH_ROUTES } from 'app/enums'
import { useRouter } from 'app/hooks/router'
import { memo, useCallback, useState } from 'react'
import { useSizeTokens, useUserStore } from 'app/store'
import { AlertDialog, Button, XStack, YStack } from 'tamagui'

export const LogoutDialog = memo(({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) => {
  const [loading, setLoading] = useState(false)
  const size = useSizeTokens()
  const router = useRouter()

  /** 退出登录回调事件 */
  const onLogout = useCallback(async () => {
    setLoading(true)
    await delay(2000)
    setOpen(false)
    setLoading(false)
    router.replace(NO_AUTH_ROUTES.ROOT)
    setTimeout(() => {
      useUserStore.getState().clearToken()
    }, 100)
  }, [])

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          key="overlay"
          opacity={0.5}
          animation="100ms"
          exitStyle={{ opacity: 0 }}
          enterStyle={{ opacity: 0 }}
        />
        <AlertDialog.Content
          x={0}
          y={0}
          elevate
          bordered
          scale={1}
          opacity={1}
          key="content"
          borderWidth={0}
          width={size[366]}
          bg="$surfaceRaisedL1"
          borderColor="transparent"
          borderTopLeftRadius={size[10]}
          borderTopRightRadius={size[10]}
          borderBottomLeftRadius={size[10]}
          borderBottomRightRadius={size[10]}
          animateOnly={['opacity', 'transform']}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          animation={[
            '100ms',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
        >
          <YStack gap={size[32]}>
            <AlertDialog.Title fontSize={size[24]} fontWeight="bold" text={"center" as any}>Log out</AlertDialog.Title>
            <AlertDialog.Description color="$textWeaker" text={"center" as any}>
              Are you sure you want to log out?
            </AlertDialog.Description>
            <XStack gap={size[10]}>
              <AlertDialog.Cancel asChild>
                <Button
                  flex={1}
                  fontWeight="bold"
                  height={size[50]}
                  aspectRatio={3/1}
                  bg="$surfaceRaisedL2"
                  borderTopLeftRadius={size[6]}
                  borderTopRightRadius={size[6]}
                  borderBottomLeftRadius={size[6]}
                  borderBottomRightRadius={size[6]}
                >
                  Cancel
                </Button>
              </AlertDialog.Cancel>
              <LoadingButton
                flex={1}
                fontWeight="bold"
                height={size[50]}
                aspectRatio={3/1}
                loading={loading}
                onPress={onLogout}
                color="$textInverse"
                bg="$gradientsPrimaryB"
              >
                Logout
              </LoadingButton>
            </XStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  )
})