import { Popover, PopoverProps, YStack, Text, ScrollView } from "tamagui"
import { Pressable, useWindowDimensions } from "react-native"
import { useRef, useState } from "react"
import { useRem } from 'app/store'

interface CustomPopoverProps {
  open?: boolean
  value?: string | number
  children: React.ReactNode
  placement?: PopoverProps['placement']
  items: { label: string, value: string | number }[]
  renderContent?: (close: (value: string | number) => void) => React.ReactNode
  onChange: (value: string | number) => void
  onOpenChange?: (open: boolean) => void
}

export function Picker({
  value,
  children,
  onChange,
  items = [],
  renderContent,
  open: controlledOpen,
  placement = 'bottom-start',
  onOpenChange: controlledOnOpenChange,
  ...props
}: CustomPopoverProps) {
  const triggerRef = useRef<any>(null) // 触发器引用
  const rem = useRem()
  const [internalOpen, setInternalOpen] = useState(false) // 内部打开状态
  const { height: screenHeight } = useWindowDimensions() // 屏幕高度
  const [maxHeight, setMaxHeight] = useState(300) // 最大高度
  
  const open = controlledOpen ?? internalOpen // 打开状态

  const setOpen = controlledOnOpenChange ?? setInternalOpen // 设置打开状态
  
  /** 关闭回调事件 */
  const close = (value: string | number) => {
    setOpen(false)
    onChange(value)
  }

  /** 打开状态变更回调事件 */
  const handleOpenChange = (open: boolean) => {
    if (open && triggerRef.current) {
      triggerRef.current.measure((_x: number, _y: number, _width: number, height: number, _pageX: number, pageY: number) => {
        const spaceBelow = screenHeight - pageY - height // 计算触发器下方的可用空间(屏幕高度 - 触发器位置 - 触发器高度)
        const availableSpace = Math.max(spaceBelow, pageY) - 20 // 计算触发器上方的可用空间(触发器位置 - 20px<预留边距>)
        setMaxHeight(Math.min(Math.max(availableSpace, 150), 400)) // 设置最大高度，可以设置一个最小值和最大值(150px - 400px)
      })
    }
    setOpen(open)
  }

  return (
    <Popover open={open} placement={placement} onOpenChange={handleOpenChange}>
      {/* 触发器 */}
      <Popover.Trigger asChild>
        <Pressable ref={triggerRef}>{children}</Pressable>
      </Popover.Trigger>
      {/* 弹出内容 */}
      <Popover.Content
        elevate
        borderWidth={1}
        animation="quick"
        borderColor="$borderColor"
        exitStyle={{ y: 10, opacity: 0 }}
        enterStyle={{ y: 10, opacity: 0 }}
        p={0}
        {...props}
      >
        {/* 箭头(默认高度0) */}
        <Popover.Arrow borderWidth={1} borderColor="$borderColor" />
        {
          renderContent
          ? renderContent(close)
          : <ScrollView maxH={maxHeight}>
              <YStack gap={10}>
                {items.map((item) => (
                  <Text
                    py={8}
                    px={12}
                    key={item.value}
                    fontSize={rem(12)}
                    onPress={() => close(item.value)}
                    fontWeight={value === item.value ? '700' : '600'}
                    color={value === item.value ? '$color' : '$textWeaker'}
                    bg={value === item.value ? '$surfaceRaisedL2' : 'transparent'}
                  >
                    {item.label}
                  </Text>
                ))}
              </YStack>
            </ScrollView>
        }
      </Popover.Content>
    </Popover>
  )
}