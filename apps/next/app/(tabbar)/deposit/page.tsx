'use client'

import { useState } from 'react'
import { AnimatedNumber } from '@my/ui'
import { YStack, H2, Text, Button, XStack } from 'tamagui'

export default function DepositPage() {
  const [targetCount, setTargetCount] = useState(0)
  const [step, setStep] = useState(100) // 每次增减的步长

  // 增加数值
  const handleIncrement = () => {
    setTargetCount(prev => prev + step)
  }

  // 减少数值
  const handleDecrement = () => {
    setTargetCount(prev => Math.max(0, prev - step)) // 防止负数
  }

  // 重置数值
  const handleReset = () => {
    setTargetCount(0)
  }

  // 格式化显示数字
  const formatNumber = (num: number) => {
    return num.toLocaleString('zh-CN')
  }

  return (
    <YStack flex={1} justify="center" items="center" p="$4" space="$4">
      <H2>存款页面</H2>
      
      {/* 显示动画数字 */}
      <YStack items="center" space="$2">
        <AnimatedNumber value={targetCount} duration={1500} />
        <Text fontSize="$3" color="$color10">
          目标金额: ¥ {formatNumber(targetCount)}
        </Text>
      </YStack>

      {/* 步长控制 */}
      <XStack space="$2" items="center">
        <Text>步长:</Text>
        <Button 
          size="$2" 
          variant={step === 10 ? 'outlined' : 'outlined'}
          onPress={() => setStep(10)}
        >
          10
        </Button>
        <Button 
          size="$2" 
          variant={step === 100 ? 'outlined' : 'outlined'}
          onPress={() => setStep(100)}
        >
          100
        </Button>
        <Button 
          size="$2" 
          variant={step === 1000 ? 'outlined' : 'outlined'}
          onPress={() => setStep(1000)}
        >
          1000
        </Button>
      </XStack>

      {/* 操作按钮 */}
      <XStack space="$3">
        <Button 
          size="$4" 
          theme="red" 
          onPress={handleDecrement}
          disabled={targetCount <= 0}
        >
          - {step}
        </Button>
        
        <Button 
          size="$4" 
          variant="outlined" 
          onPress={handleReset}
        >
          重置
        </Button>
        
        <Button 
          size="$4" 
          theme="green" 
          onPress={handleIncrement}
        >
          + {step}
        </Button>
      </XStack>

      {/* 快捷金额按钮 */}
      <YStack space="$2" items="center">
        <Text fontSize="$3" color="$color10">快捷金额</Text>
        <XStack space="$2" flexWrap="wrap" justify="center">
          {[1000, 5000, 10000, 50000, 100000].map(amount => (
            <Button 
              key={amount}
              size="$3"
              variant="outlined"
              onPress={() => setTargetCount(amount)}
            >
              ¥{amount.toLocaleString('zh-CN')}
            </Button>
          ))}
        </XStack>
      </YStack>
    </YStack>
  )
}