import { Dialog, ScrollView, Text, XStack, RadioGroup } from "tamagui"
import { useRem, usePlatformStore } from 'app/store'
import { useState } from "react";
interface SelectionProps {
  value?: string | number
  items?: { label: string; value: string }[]
  onChange?: (value: string | number) => void
  children?: React.ReactNode
  renderItem?: (item: { label: string; value: string }) => React.ReactNode
  maxHeight?: number
}

export const Selection = ({
  value,
  children,
  items = [],
  onChange,
  renderItem,
  maxHeight = 300,
}: SelectionProps) => {
  const isNative = usePlatformStore(state => state.isNative)
  const [open, setOpen] = useState(false)
  const rem = useRem()
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* 触发器 */}
      <Dialog.Trigger>
        {children}
      </Dialog.Trigger>

      {/* 弹出容器 */}
      <Dialog.Portal>
        {/* 遮罩层 */}
        <Dialog.Overlay
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
          animation="100ms"
          key="SelectionOverlay"
          opacity={0.5}
          {...(isNative && { onPress: () => { setOpen(false) } })}
        />
        {/* 弹出内容 */}
        <Dialog.Content
          minH="auto"
          height="auto"
          animation="100ms"
          key="SelectionContent"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        >
          <XStack>
            <ScrollView
              maxH={maxHeight}
              width={rem(360)}
              bg="$surfaceRaisedL1"
              borderTopLeftRadius={rem(10)}
              borderTopRightRadius={rem(10)}
              borderBottomLeftRadius={rem(10)}
              borderBottomRightRadius={rem(10)}
              px={rem(10)}
            >
              <Dialog.Title text="center" fontSize={rem(18)} fontWeight="bold">Choose Language</Dialog.Title>
              <RadioGroup value={`${value}`} onValueChange={onChange}>
                {items.map((item) => (
                  renderItem
                  ? renderItem(item)
                  : <XStack items="center" key={item.value} borderTopColor="$borderDefault" borderTopWidth={1}>
                      <Text
                        flex={1}
                        py={16}
                        fontSize={rem(14)}
                        fontWeight="600"
                      >
                        {item.label}
                      </Text>
                      <Dialog.Close asChild>
                        <RadioGroup.Item size={rem(8)} value={item.value} id={item.label}>
                          <RadioGroup.Indicator />
                        </RadioGroup.Item>
                      </Dialog.Close>
                  </XStack>
                ))}
              </RadioGroup>
            </ScrollView>
          </XStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}