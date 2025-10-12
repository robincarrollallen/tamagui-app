import { config } from '@my/config'

export type Conf = typeof config

declare module '@my/ui' {
  interface TamaguiCustomConfig extends Conf {}
}

declare module '*.json'
declare module '*.jsonc' {
  const value: any
  export default value
}

declare global {
  type Recordable<T = any> = Record<string, T>;
}
