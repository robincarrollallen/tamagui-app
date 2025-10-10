import { Popover, PopoverProps } from "tamagui"
import { Pressable } from "react-native"
import { useState } from "react"

interface CustomPopoverProps {
  placement?: PopoverProps['placement']
  children: React.ReactNode
  renderContent?: (close: () => void) => React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Picker({
  placement = 'bottom-start',
  children,
  renderContent,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: CustomPopoverProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  
  const open = controlledOpen ?? internalOpen
  const setOpen = controlledOnOpenChange ?? setInternalOpen
  
  const close = () => setOpen(false)

  return (
    <Popover open={open} placement={placement} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <Pressable>{children}</Pressable>
      </Popover.Trigger>

      <Popover.Content
        borderWidth={1}
        borderColor="$borderColor"
        enterStyle={{ y: 10, opacity: 0 }}
        exitStyle={{ y: 10, opacity: 0 }}
        elevate
        animation="quick"
      >
        <Popover.Arrow borderWidth={1} borderColor="$borderColor" />
        {renderContent ? renderContent(close) : null}
      </Popover.Content>
    </Popover>
  )
}