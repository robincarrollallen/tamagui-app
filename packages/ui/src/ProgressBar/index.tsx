import { memo } from 'react'
import { Stack, StackProps } from 'tamagui'

export interface ProgressBarProps extends Omit<StackProps, 'children' | 'bg'> {
  /** 进度值 0-100 */
  value: number
  /** 进度条高度 */
  size?: number
  /** 指示器（圆球）颜色 */
  indicatorColor?: any
  /** 背景轨道颜色 */
  bg?: any
  /** 是否启用动画 */
  animated?: boolean
  /** 动画持续时间（毫秒） */
  duration?: number
  /** 圆形指示器大小 */
  ballSize?: number
  /** 边角圆度 */
  borderRadius?: number
}

export const ProgressBar = memo(
  ({
    value = 0,
    size = 8,
    indicatorColor = '#52C41A',
    bg = '#8B7355',
    animated = true,
    borderRadius = 390,
    ...props
  }: ProgressBarProps) => {
    const normalizedValue = Math.max(0, Math.min(100, value)) // 确保 value 在 0-100 之间

    return (
      <Stack
        width="100%"
        height={size}
        {...props}
      >
        {/* 进度条背景 */}
        <Stack
          inset={0}
          items="center"
          justify="center"
          position="absolute"
          bg={bg}
          borderTopLeftRadius={borderRadius}
          borderTopRightRadius={borderRadius}
          borderBottomLeftRadius={borderRadius}
          borderBottomRightRadius={borderRadius}>
        </Stack>
        {/* 进度填充 */}
        <Stack
          animateOnly={['transform']}
          height="100%"
          items="center"
          justify="center"
          width={`${normalizedValue}%`}
          enterStyle={{ scaleX: 0 }}
          scaleX={1}
          transformOrigin="left"
          animation={animated ? 'bouncy' : undefined}
        >
          {/* 进度填充背景 */}
          <Stack
            width="100%"
            height="100%"
            bg={indicatorColor} 
            borderTopLeftRadius={borderRadius}
            borderTopRightRadius={borderRadius}
            borderBottomLeftRadius={borderRadius}
            borderBottomRightRadius={borderRadius}>
          </Stack>  
          {/* 圆形指示器（球） */}
          {normalizedValue > 0 && <Stack
            position="absolute"
            r={-size}
            width={size * 1.5}
            height={size * 1.5}
            bg={indicatorColor}
            borderBottomRightRadius={size}
            borderBottomLeftRadius={size}
            borderTopRightRadius={size}
            borderTopLeftRadius={size}
            items="center"
            justify="center"
          >

            {/* 圆形指示器阴影 */}
            <Stack
              width={size * 3}
              height={size * 3}
              opacity={0.6}
              bg={indicatorColor}
              borderTopLeftRadius={size * 1.5}
              borderTopRightRadius={size * 1.5}
              borderBottomLeftRadius={size * 1.5}
              borderBottomRightRadius={size * 1.5}
              boxShadow={`0 0 ${size * 3}px ${indicatorColor}`}
            />
          </Stack>}
        </Stack>
      </Stack>
    )
  }
)

ProgressBar.displayName = 'ProgressBar'