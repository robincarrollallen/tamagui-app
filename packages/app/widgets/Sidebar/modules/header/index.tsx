import { useRem } from 'app/store'
import { X } from '@tamagui/lucide-icons'
import { useTenantStore } from 'app/store'
import { XStack, Button, Dialog, Image } from "tamagui"
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'

export const SidebarHeader = () => {
  const safeArea = useSafeArea()
  const tenantInfo = useTenantStore(state => state.tenantInfo)
  const rem = useRem()

  return (
    <XStack mt={safeArea.top - rem(10)} items="center" justify="space-between" height={rem(50)} py={rem(10)} px={rem(5)}>
      <Image source={{ uri: tenantInfo.siteLogo }} objectFit='contain' height='100%' width={rem(140)} />
      <Dialog.Close asChild>
        <Button 
          unstyled 
          chromeless
          p={0}
          m={0}
          hoverStyle={{ opacity: 0.7 }}
          pressStyle={{ opacity: 0.5 }}
        >
          <X color="$iconDefault" />
        </Button>
      </Dialog.Close>
    </XStack>
  )
}