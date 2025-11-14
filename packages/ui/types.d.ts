import { config } from '@my/config'

export type Conf = typeof config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}

declare global {
  type Recordable<T = any> = Record<string, T>;
}