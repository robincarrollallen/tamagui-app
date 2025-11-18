import { useRem } from 'app/store'
import { Image } from 'expo-image'
import { IMAGES } from '@my/assets'
import { useUserInfoState } from '../state'
import { AlertDialog, Button, YStack } from 'tamagui'
import { LinearGradient } from 'tamagui/linear-gradient'

export const ConfirmDialog = () => {
  const rem = useRem()
  const confirmDialogOpen = useUserInfoState(state => state.confirmDialogOpen)
  const setConfirmDialogOpen = useUserInfoState.getState().setConfirmDialogOpen

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
          width={rem(340)}
          bg="transparent"
          borderColor="transparent"
          borderTopLeftRadius={rem(10)}
          borderTopRightRadius={rem(10)}
          borderBottomLeftRadius={rem(10)}
          borderBottomRightRadius={rem(10)}
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
            pt={rem(70)}
          >
            <Image source={IMAGES.bg_dialog_confirm} style={{ width: '100%', height: rem(170), position: 'absolute', top: 0, left: 0, zIndex: 1 }} />
            <YStack
              gap={rem(32)}
              items="center"
              overflow="hidden"
              bg="$surfaceRaisedL1"
              pb={rem(16)}
              borderTopLeftRadius={rem(10)}
              borderTopRightRadius={rem(10)}
              borderBottomLeftRadius={rem(10)}
              borderBottomRightRadius={rem(10)}
            >
              <AlertDialog.Title fontSize={rem(24)} fontWeight="bold" width="100%">
                <YStack width="100%" height={rem(100)} bg="$red10">
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
              <AlertDialog.Description fontSize={rem(14)} px={rem(16)} color="$textWeak" text={"center" as any}>
                For your fund's safety, please set up a fund password first
              </AlertDialog.Description>
              <AlertDialog.Cancel asChild>
                <Button
                  minW={rem(150)}
                  height={rem(46)}
                  fontWeight="bold"
                  fontSize={rem(14)}
                  bg="$gradientsPrimaryB"
                  color="$textInverse"
                  borderTopLeftRadius={rem(6)}
                  borderTopRightRadius={rem(6)}
                  borderBottomLeftRadius={rem(6)}
                  borderBottomRightRadius={rem(6)}
                >
                  Confirm
                </Button>
              </AlertDialog.Cancel>
            </YStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  )
}