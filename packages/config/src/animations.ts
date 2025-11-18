import { createAnimations } from '@tamagui/animations-react-native'
import { Easing } from 'react-native'

export const animations = createAnimations({
  '0': {
    type: 'timing',
    duration: 0,
  },
  '100ms': {
    type: 'timing',
    duration: 100,
  },
  spin: {
    type: 'timing', // 线性动画(默认 spring)
    easing: Easing.ease, // 动画缓动函数
    duration: 2000, // 动画持续时间
    loop: true, // 是否循环
  },
  shimmer: {
    type: 'spring', // 弹簧动画（默认）
    damping: 100, // 阻尼: 控制振荡衰减（越大越慢停止, 50-100无回弹）
    stiffness: 1, // 弹性: 控制振荡的幅度（越大动画越快）
    mass: 0.1, // 质量: 影响弹簧的惯性（越大动画越慢）
    velocity: 0, // 初始速度: 影响弹簧的初始运动速度
  },
  sheet: {
    damping: 25,
    stiffness: 300,
    mass: 0.3,
    velocity: 0,
  },
  bouncy: {
    damping: 9,
    mass: 0.9,
    stiffness: 150,
  },
  lazy: {
    damping: 18,
    stiffness: 50,
  },
  medium: {
    damping: 15,
    stiffness: 120,
    mass: 1,
  },
  slow: {
    damping: 15,
    stiffness: 40,
  },
  quick: {
    damping: 20,
    mass: 1.2,
    stiffness: 250,
  },
  tooltip: {
    damping: 10,
    mass: 0.9,
    stiffness: 100,
  },
})
