'use client'

import { useState } from 'react'
import { AnimatedNumber } from '@my/ui'
import { YStack, H2, Text, Button, XStack } from 'tamagui'

// 数字动画 Hook
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
    <YStack flex={1} justifyContent="center" alignItems="center" padding="$4" space="$4">
      <H2>存款页面</H2>
      
      {/* 显示动画数字 */}
      <YStack alignItems="center" space="$2">
        <AnimatedNumber targetValue={targetCount} duration={1500} />
        <Text fontSize="$3" color="$gray10">
          目标金额: ¥ {formatNumber(targetCount)}
        </Text>
      </YStack>

      {/* 步长控制 */}
      <XStack space="$2" alignItems="center">
        <Text>步长:</Text>
        <Button 
          size="$2" 
          variant={step === 10 ? 'outlined' : 'ghost'}
          onPress={() => setStep(10)}
        >
          10
        </Button>
        <Button 
          size="$2" 
          variant={step === 100 ? 'outlined' : 'ghost'}
          onPress={() => setStep(100)}
        >
          100
        </Button>
        <Button 
          size="$2" 
          variant={step === 1000 ? 'outlined' : 'ghost'}
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
      <YStack space="$2" alignItems="center">
        <Text fontSize="$3" color="$gray10">快捷金额</Text>
        <XStack space="$2" flexWrap="wrap" justifyContent="center">
          {[1000, 5000, 10000, 50000, 100000].map(amount => (
            <Button 
              key={amount}
              size="$3"
              variant="ghost"
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