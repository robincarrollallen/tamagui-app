import { createAnimations } from '@tamagui/animations-react-native'

export const animations = createAnimations({
  '100ms': {
    type: 'timing',
    duration: 100,
  },
  spin: {
    type: 'timing',
    duration: 2000,
    loop: true,
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
    damping: 100,
    stiffness: 120,
    mass: 0.3,
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
