import { Image } from 'expo-image'
import { IMAGES } from '@my/assets'
import { useCallback } from 'react'
import { RippleButton } from '@my/ui'
import { useSizeTokens } from 'app/store'
import { useUserInfoState } from '../state'
import { useRouter } from 'solito/navigation'
import { LinearGradient } from 'tamagui/linear-gradient'
import { AlertDialog, Button, YStack, XStack } from 'tamagui'

export const ConfirmDialog = ({ showCancel = false }: { showCancel?: boolean }) => {
  const router = useRouter()
  const size = useSizeTokens()
  const confirmDialogOpen = useUserInfoState(state => state.confirmDialogOpen)
  const setConfirmDialogOpen = useUserInfoState.getState().setConfirmDialogOpen

  const onConfirm = useCallback(async () => {
    setConfirmDialogOpen(false)
    router.push('/withdraw/pin')
  }, [])

  return (
    <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
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
          p={0}
          elevate
          bordered
          scale={1}
          opacity={1}
          key="content"
          borderWidth={0}
          width={size[340]}
          bg="transparent"
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
          <YStack
            pt={size[70]}
          >
            <Image source={IMAGES.bg_dialog_confirm} style={{ width: '100%', height: size[170], position: 'absolute', top: 0, left: 0, zIndex: 1 }} />
            <YStack
              gap={size[32]}
              items="center"
              overflow="hidden"
              bg="$surfaceRaisedL1"
              pb={size[16]}
              borderTopLeftRadius={size[10]}
              borderTopRightRadius={size[10]}
              borderBottomLeftRadius={size[10]}
              borderBottomRightRadius={size[10]}
            >
              <AlertDialog.Title fontSize={size[24]} fontWeight="bold" width="100%">
                <YStack width="100%" height={size[100]} bg="$red10">
                  <LinearGradient
                    width="100%"
                    height="100%"
                    end={[1, 1]}
                    start={[0, 0]}
                    locations={[0, 0.5, 1]}
                    colors={['#74DBFE', '#8BB7FF', '#CB89FE']}
                  >
                  <YStack width="100%" height="100%" bg="rgba(0, 0, 0, .5)"/>
                </LinearGradient>
                </YStack>
              </AlertDialog.Title>
              <AlertDialog.Description fontSize={size[14]} px={size[16]} color="$textWeak" text={"center" as any}>
                For your fund's safety, please set up a fund password first
              </AlertDialog.Description>
              <XStack justify="space-between" gap={size[10]}>
                {showCancel && <AlertDialog.Cancel asChild>
                    <Button
                      flex={1}
                      width={size[150]}
                      height={size[46]}
                      bg="$surfaceRaisedL2"
                      borderTopLeftRadius={size[6]}
                      borderTopRightRadius={size[6]}
                      borderBottomLeftRadius={size[6]}
                      borderBottomRightRadius={size[6]}
                    >
                      Cancel
                    </Button>
                  </AlertDialog.Cancel>
                }
                <RippleButton
                  width={size[150]}
                  height={size[46]}
                  onPress={onConfirm}
                  borderTopLeftRadius={size[6]}
                  borderTopRightRadius={size[6]}
                  borderBottomLeftRadius={size[6]}
                  borderBottomRightRadius={size[6]}
                >
                  Confirm
                </RippleButton>
              </XStack>
            </YStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  )
}